import React from 'react';
import ReactDOM from 'react-dom';
import GACalendarEntry from './GACalendarEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GACalendarEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});
