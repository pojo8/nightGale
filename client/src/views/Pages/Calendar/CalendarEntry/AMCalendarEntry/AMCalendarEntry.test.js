import React from 'react';
import ReactDOM from 'react-dom';
import AMCalendarEntry from './AMCalendarEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AMCalendarEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});
