import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment),
);

const currDate = new Date();
const currYear = currDate.getFullYear();
const currMonth = currDate.getMonth();

const events = [
]

// let allViews = Object.keys(Views).map(k => Views[k])


// todo: reactive custom calendar toolbar component

class CSCalendarEntry extends Component {

  constructor(props) {
    super(props);

    this.state ={
      userId: '',
      events: [],
      hourlyRate:'',
      

    }
  }

  render() {

    return (
      <div className="animated">
        <Card>
          <CardHeader>
            <i className="icon-calendar"></i>Calendar{' '}
            <a href="https://coreui.io/pro/react/" className="badge badge-danger">CoreUI Pro Component</a>
            <div className="card-header-actions">
              <a href="https://github.com/intljusticemission/react-big-calendar" rel="noopener noreferrer" target="_blank" className="card-header-action">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody style={{ height: '40em' }}>
          <BigCalendar className="d-sm-down-none"
                         {...this.props}
                         events={events}
                         views={['month', 'week', 'day']}
                         step={30}
                         defaultDate={new Date(currYear, currMonth, 1)}
                         defaultView='month'
                         toolbar={true}
            />
            <BigCalendar className="d-md-none"
                         {...this.props}
                         events={events}
                         views={['day']}
                         step={30}
                         defaultDate={new Date(currYear, currMonth, 1)}
                         defaultView='day'
                         toolbar={true}
            />
          </CardBody>
        </Card>
 
      </div>
    );
  }
}

export default CSCalendarEntry;
