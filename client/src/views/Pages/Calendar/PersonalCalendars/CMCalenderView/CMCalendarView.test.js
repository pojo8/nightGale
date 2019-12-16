import React from 'react';
import ReactDOM from 'react-dom';
import CMCalendarView from './CMCalendarView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CMCalendarView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
