import React from 'react';
import ReactDOM from 'react-dom';
import GPCalendarView from './GPCalendarView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GPCalendarView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
