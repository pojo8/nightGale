import React from 'react';
import ReactDOM from 'react-dom';
import CompanyForm from './CompanyForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CompnayForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
