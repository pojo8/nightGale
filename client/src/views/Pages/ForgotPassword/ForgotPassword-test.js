import React from 'react';
import ReactDOM from 'react-dom';
import Register from './ForgotPasword';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ForgotPassword />, div);
  ReactDOM.unmountComponentAtNode(div);
});
