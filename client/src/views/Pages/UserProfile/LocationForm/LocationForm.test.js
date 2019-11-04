import React from 'react';
import ReactDOM from 'react-dom';
import CertificationForm from './CertificationForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CertificationForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
