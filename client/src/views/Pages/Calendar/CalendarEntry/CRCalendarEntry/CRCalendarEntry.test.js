import React from 'react';
import ReactDOM from 'react-dom';
import CRCalendarEntry from './CRCalendarEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CRCalendarEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});
