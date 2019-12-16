import React from 'react';
import ReactDOM from 'react-dom';
import CMCalendarEntry from './CMCalendarEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CMCalendarEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});
