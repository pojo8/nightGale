import React from 'react';
import ReactDOM from 'react-dom';
import CCCalendarView from './CCCalendarView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CCCalendarView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
