import React from 'react';
import ReactDOM from 'react-dom';
import AECalendarEntry from './AECalendarEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AECalendarEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});
