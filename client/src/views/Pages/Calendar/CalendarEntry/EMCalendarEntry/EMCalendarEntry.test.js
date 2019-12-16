import React from 'react';
import ReactDOM from 'react-dom';
import EMCalendarEntry from './EMCalendarEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EMCalendarEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});
