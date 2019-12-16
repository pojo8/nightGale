import React from 'react';
import ReactDOM from 'react-dom';
import GPCalendarEntry from './GPCalendarEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GPCalendarEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});
