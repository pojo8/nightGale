import React from 'react';
import ReactDOM from 'react-dom';
import COCalendarView from './COCalendarView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<COCalendarView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
