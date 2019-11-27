import React from 'react';
import ReactDOM from 'react-dom';
import UserAccount from './UserAccount';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserAccount />, div);
  ReactDOM.unmountComponentAtNode(div);
});
