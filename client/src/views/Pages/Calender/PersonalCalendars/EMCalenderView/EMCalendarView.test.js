import React from 'react';
import ReactDOM from 'react-dom';
import EMCalendarView from './EMCalendarView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EMCalendarView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
