import React from 'react';
import ReactDOM from 'react-dom';
import GSCalendarEntry from './GSCalendarEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GSCalendarEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});
