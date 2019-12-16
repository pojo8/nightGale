import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col } from 'reactstrap';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

var mongoose = require('mongoose');


// gmail acc for generic calendar test:
// nightgalecalendar@gmail.com


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment),
);

const currDate = new Date();
const currYear = currDate.getFullYear();
const currMonth = currDate.getMonth();



// let allViews = Object.keys(Views).map(k => Views[k])


// todo: reactive custom calendar toolbar component

class AMCalendarView extends Component {

  constructor(props) {
    super(props);

    this.state ={
      userId: '',
      events: [],
      hourlyRate:'',
      
    }

    this.onSyncCalendar =this.onSyncCalendar.bind(this);

  }

  handleSelect = ({ start, end, }) => {
    const hourlyRate = window.prompt('Enter shifts hourly rate')
    const eventDuration = (end - start) /3600000;

    if (hourlyRate)

      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            eventDuration: eventDuration,
            // hourlyRate: this.state.hourlyRate,
            hourlyRate,
            title: `${eventDuration} hr shift`,
            booked:false,
            userBooked: this.state.userId,
            createdById: 'test',
            swapPending: false,
            open: true,
            field: 'AM',
            shiftEarnings: eventDuration * this.state.hourlyRate,
          }, 
        ],
      })
  }

  onSyncCalendar(){
    console.log(this.state.events);


    const {
      userId,
      events,
      } = this.state;

     events.forEach(function(event){
        
        if(event.eventId == null){
          event.eventId = mongoose.Types.ObjectId();
        }

        fetch('http://localhost:8080/endpoint/calendarEvent/update', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            eventId: event.eventId,
            start: event.start,
            end: event.end,
            eventDuration: event.eventDuration,
            shiftEarnings: event.shiftEarnings,
            title: event.title,
            booked: event.booked,
            createdById: event.createdById,
            swapPending: event.swapPending,
            open: event.open,
            field: event.field,
          }),
        }).then( response => response.json())
        .then(json => {
          console.log('profession json: ', json);
          if(json.success === true) {
            
            this.setState({
              uploadSuccess: true,
              professionUpdateError: false,
            });
            console.log('profession update successful')

          } else {
            this.setState({
              professionUpdateError: true,
            });
            console.log('Error found in login process')
          }
        });  
      });

  }

  render() {

    const {
      events,
    } =  this.state


    return (
      <div className="animated">
        <Card>
          <CardHeader>
            
            <i className="icon-calendar"></i>Academic Medicine Calendar{' '}
            <div className="card-header-actions">
            <Button  type="submit" size="sm" color="success" onClick={this.onSyncCalendar}><i className="fa fa-dot-circle-o"></i> Import</Button>
              &nbsp; &nbsp; &nbsp; &nbsp;
            <Button  type="submit" size="sm" color="primary" onClick={this.onSyncCalendar}><i className="fa fa-dot-circle-o"></i> Sync</Button>
            </div>
          </CardHeader>
          <CardBody style={{ height: '40em' }}>
          <BigCalendar className="d-sm-down-none"
                         selectable
                         {...this.props}
                         events={events}
                         views={{week: true, day:true}}
                         step={30}
                         defaultDate={new Date(currYear, currMonth, 1)}
                         defaultView='week'
                         toolbar={true}
                         onSelectSlot={this.handleSelect }
            />
            {/* <BigCalendar className="d-md-none"
                         {...this.props}
                         events={events}
                         views={['day']}
                         step={30}
                         defaultDate={new Date(currYear, currMonth, 1)}
                         defaultView='day'
                         toolbar={true}
            /> */}
          </CardBody>
        </Card>
 
      </div>
    );
  }
}

export default AMCalendarView;
