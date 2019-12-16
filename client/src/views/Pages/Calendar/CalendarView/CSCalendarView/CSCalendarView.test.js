import React from 'react';
import ReactDOM from 'react-dom';
import CSCalendarView from './CSCalendarView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CSCalendarView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
