import React, { Component } from 'react';
import { Button, ButtonToggle, Card, CardBody, CardHeader, Col } from 'reactstrap';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  getFromStorage, 
} from '../../../../../containers/DefaultLayout/utils/Storage';

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
      swapEvent: true,
      
    }

    this.onSyncCalendar =this.onSyncCalendar.bind(this);

  }

  // Only events that are not booked are available
  componentDidMount(){

    const obj = getFromStorage('app_ng');

    if( obj && obj.token) {
          this.setState({
            userId: obj.userId,
          });
        }

    fetch('http://localhost:8080/endpoint/view-AM-events', {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json'
      },
  }).then( response => response.json())
  .then(json => {
    console.log(json)
    if(json.success === true) {

      let eventList = json.calendarEvent;

      for( let i = 0; i< eventList.length; i++){
        eventList[i].start = moment.utc(eventList[i].start).toDate();
        eventList[i].end = moment.utc(eventList[i].end).toDate();
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

// Change this to mimic the change in procedure in booking
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

  editEvent = event => {

    let altEvent = event;

      console.warn(event)

      const acceptEvent = window.confirm('Would you like to accept the shift?')
      // this.setState({ acceptEvent: false});

      if( acceptEvent){
        altEvent.userBooked = this.state.userId;
        altEvent.title = `Accepted: ` + event.title;
        altEvent.booked = true;
        console.log('after')
        console.warn(altEvent)
        console.warn(this.state.events)
        // this.onSyncCalendar();
        
    //   fetch('http://localhost:8080/endpoint/calendarEvent/delete/'+event._id, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type' : 'application/json'
    //     },
    // }).then( response => response.json())
    // .then(json => {
    //   console.log(json)
    //   // if(json.success === true) {

    //   //   // Boorish but works
    //   //   window.location.reload();  
    //   //   console.log('Event deleted')
    //   // } else {
    //   //   console.log('Error in deleting event ')
    //   // }
    // });
      }
      // return
    
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
        
      // may be able to remove
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
            // Id already exists
            eventId: event._id,
            start: event.start,
            end: event.end,
            eventDuration: event.eventDuration,
            shiftEarnings: event.shiftEarnings,
            hourlyRate: event.hourlyRate,
            // synced: event.synced,
            approvedBy: event.approvedBy,
            userBooked: event.userBooked,
            synced: event.synced,
            title: event.title,
            booked: event.booked,
            createdById: event.createdById,
            swapPending: event.swapPending,
            open: event.open,
            field: event.field,
          }),
        }).then( response => response.json())
        .then(json => {
          if(json.success === true) {
            
            // this.setState({
            //   uploadSuccess: true,
            //   // professionUpdateError: false,
            // });
            console.log('Event synced')

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
    } =  this.state


    return (
      <div className="animated">
        <Card>
          <CardHeader>
            
            <i className="icon-calendar"></i>Academic Medicine Calendar{' '}
            <div className="card-header-actions">
            <Button  type="submit" size="sm" color="success" onClick={this.onExportCalendar}><i className="fa fa-dot-circle-o"></i> Export</Button>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <ButtonToggle  type="submit" size="sm" color="warning" onClick={this.onSwapEvent}><i className="fa fa-dot-circle-o"></i> Swap</ButtonToggle> 
             &nbsp; &nbsp; &nbsp; &nbsp;
            <Button  type="submit" size="sm" color="primary" onClick={this.onSyncCalendar}><i className="fa fa-dot-circle-o"></i> Sync</Button>
            </div>
          </CardHeader>
          <CardBody style={{ height: '40em' }}>
          <BigCalendar className="d-sm-down-none"
                         // selectable
                         {...this.props}
                         events={events}
                         views={{week: true, day:true}}
                         step={30}
                         defaultDate={new Date(currYear, currMonth, 1)}
                         defaultView='week'
                         toolbar={true}
                        //  onSelectSlot={this.handleSelect }
                         onSelectEvent={this.editEvent}
                        //  onSelectEvent={event => alert(event.hourlyRate)}

                        eventPropGetter ={ (event) => {
                          let newStyle = {
                          };
                          // Need to authorise
                          if (event.swapPending==true && event.open == true && event.userBooked == this.state.userId){
                            newStyle.backgroundColor = "yellow"
                            newStyle.color = 'black'
                          }

                          // On the way to accepting if go down that route
                          // if (event.swapPending==false && event.booked == false && event.userBooked == this.state.userId){
                          //   newStyle.backgroundColor = "grey"
                          // }

                          // Case Item that cant be viewed by user
                          if( event.booked == false && event.open == false && !event.userBooked == this.state.userId ){
                            newStyle.visibility = "hidden"
                          }

                          // Case of booked and swap not wanted 
                          if(event.booked ==  true && event.userBooked == this.state.userId){
                            newStyle.backgroundColor = "darkgreen"
                          }

                          return {
                            className: "",
                            style: newStyle
                          };
                        } 
                      }

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
