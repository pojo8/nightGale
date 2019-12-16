import React from 'react';
import ReactDOM from 'react-dom';
import CCCalendarEntry from './CCCalendarEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CCCalendarEntry/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
