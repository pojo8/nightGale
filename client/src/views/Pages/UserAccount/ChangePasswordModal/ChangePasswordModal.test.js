import React from 'react';
import ReactDOM from 'react-dom';
import ChangePasswordModal from './ChangePasswordModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChangePasswordModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
