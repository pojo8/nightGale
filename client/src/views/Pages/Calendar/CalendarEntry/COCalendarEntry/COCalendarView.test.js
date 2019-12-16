import React from 'react';
import ReactDOM from 'react-dom';
import COCalendarEntry from './COCalendarEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<COCalendarEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});
