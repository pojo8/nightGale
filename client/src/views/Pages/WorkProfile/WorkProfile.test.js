import React from 'react';
import ReactDOM from 'react-dom';
import WorkProfile from './WorkProfile';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WorkProfile />, div);
  ReactDOM.unmountComponentAtNode(div);
});
