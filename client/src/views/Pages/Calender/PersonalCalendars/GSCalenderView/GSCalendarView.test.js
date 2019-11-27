import React from 'react';
import ReactDOM from 'react-dom';
import GSCalendarView from './GSCalendarView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GSCalendarView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
