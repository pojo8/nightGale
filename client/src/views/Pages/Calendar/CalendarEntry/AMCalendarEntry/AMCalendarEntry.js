import React, { Component } from 'react';
import { Alert, Button, ButtonToggle, Card, CardBody, CardHeader, Col } from 'reactstrap';
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

class AMCalendarEntry extends Component {

  constructor(props) {
    super(props);

    this.state ={
      userId: '',
      events: [],
      hourlyRate:'',
      uploadSuccess: null,
      removeEvent: false,
      visible: true,
      
    }

    this.onSyncCalendar =this.onSyncCalendar.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onDeleteEvent = this.onDeleteEvent.bind(this);

  }

  onDismiss() {
    this.setState({ 
      visible: false,
      uploadSuccess: false 
    });
  }

  componentDidMount(){

      fetch('http://localhost:8080/endpoint/AM-calendarEvents', {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json'
        },
    }).then( response => response.json())
    .then(json => {
      console.log(json)
      if(json.success === true) {

        let eventList = json.calendarEvent;

        // console.log(eventList[0])

        for( let i = 0; i< eventList.length; i++){

          eventList[i].start = moment.utc(eventList[i].start).toDate();
          eventList[i].end = moment.utc(eventList[i].end).toDate();

          // console.log( eventList[i])
        }

        this.setState({
                  events: eventList
                })        

        
        console.log('Calendar event synced')

      } else {
       
        console.log('No existing workprofile found ')
      }
    });

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
            hourlyRate: hourlyRate,
            title: `${eventDuration} hr shift @ £${hourlyRate}`,
            booked:false,
            userBooked: this.state.userId,
            createdById: 'test',
            synced: false,
            swapPending: false,
            open: true,
            field: 'AM',
            shiftEarnings: eventDuration * this.state.hourlyRate,
          }, 
        ],
      })
  }

  editEvent = event => {

    if (this.state.removeEvent == true){
      const newHourlyRate = window.prompt('delete mode')
      return
    }

    const newHourlyRate = window.prompt('Edit hourly rate')
    // const eventDuration = (end - start) /3600000;

    console.log(event)
    let altEvent = event;

    console.log('pre addition')
    console.log(this.state.events)

    if (newHourlyRate)
        altEvent.hourlyRate = newHourlyRate;
        altEvent.eventId = event._id;
        altEvent.shiftEarnings= event.eventDuration * newHourlyRate;
        altEvent.title =`${event.eventDuration} hr shift @ £${newHourlyRate}`

        console.log('changed')
        console.log(altEvent)

      console.log('post addition')
      console.log(this.state.events)

  }

  onDeleteEvent() {
    this.setState({removeEvent: true});
    console.log('delete mode')
  }

  onSyncCalendar(){
    console.log(this.state.events);


    const {
      userId,
      events,
      uploadSuccess,
      removeEvent,
      } = this.state;

     events.forEach(function(event){
        
        if(event.eventId == null && event.synced == false){
          event.eventId = mongoose.Types.ObjectId();
        } else if( event.eventId ) {
          event._id = event.eventId
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
            hourlyRate: event.hourlyRate,
            // synced: event.synced,
            synced: true,
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
            
            // this.setState({
            //   uploadSuccess: true,
            //   // professionUpdateError: false,
            // });
            console.log('profession update successful')

          } else {
            // this.setState({
            //   professionUpdateError: true,
            // });
            console.log('Event exists')
          }
        });  
      });

  }

  render() {

    const {
      events,
      uploadSuccess,
    } =  this.state


    return (
      <div className="animated">
        <Card>
          <CardHeader>
            
            <i className="icon-calendar"></i>Academic Medicine Calendar{' '}
            <div className="card-header-actions">
            <Button  type="submit" size="sm" color="success" onClick={this.onSyncCalendar}><i className="fa fa-dot-circle-o"></i> Import</Button>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <ButtonToggle  type="submit" size="sm" color="danger" onClick={this.onDeleteEvent}><i className="fa fa-dot-circle-o"></i> Delete</ButtonToggle> 
             &nbsp; &nbsp; &nbsp; &nbsp;
            <Button  type="submit" size="sm" color="primary" onClick={this.onSyncCalendar}><i className="fa fa-dot-circle-o"></i> Sync</Button>
            </div>
          </CardHeader>
          <CardBody style={{ height: '40em' }}>
          { this.state.uploadSuccess ?
                      <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                        Synchronisation was successful
                      </Alert> : null
                    }
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
                         onSelectEvent={this.editEvent}
                         onDoubleClickEvent = {this.deleteEvent}
                        //  onSelectEvent={event => alert(event.hourlyRate)}

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

export default AMCalendarEntry;
