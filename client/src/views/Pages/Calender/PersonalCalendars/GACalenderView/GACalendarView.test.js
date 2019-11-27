import React from 'react';
import ReactDOM from 'react-dom';
import GACalendarView from './GACalendarView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GACalendarView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
