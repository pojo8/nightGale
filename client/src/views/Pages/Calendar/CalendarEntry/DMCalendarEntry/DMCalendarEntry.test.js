import React from 'react';
import ReactDOM from 'react-dom';
import DMCalendarEntry from './DMCalendarEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DMCalendarEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});
