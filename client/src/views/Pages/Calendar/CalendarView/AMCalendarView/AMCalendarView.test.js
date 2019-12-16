import React from 'react';
import ReactDOM from 'react-dom';
import AMCalendarView from './AMCalendarView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AMCalendarView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
