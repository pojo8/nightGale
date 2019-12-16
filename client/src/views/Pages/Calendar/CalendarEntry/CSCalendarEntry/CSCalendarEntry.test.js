import React from 'react';
import ReactDOM from 'react-dom';
import CSCalendarEntry from './CSCalendarEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CSCalendarEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});
