import React from 'react';
import ReactDOM from 'react-dom';
import DMCalendarView from './DMCalendarView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DMCalendarView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
