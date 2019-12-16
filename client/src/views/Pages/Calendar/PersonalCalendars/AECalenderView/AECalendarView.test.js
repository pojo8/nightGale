import React from 'react';
import ReactDOM from 'react-dom';
import CalendarView from './AECalendarView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AECalendarView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
