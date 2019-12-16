import React from 'react';
import ReactDOM from 'react-dom';
import CRCalendarView from './CRCalendarView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CRCalendarView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
