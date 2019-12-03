import React from 'react';
import ReactDOM from 'react-dom';
import PaymentInformation from './PaymentInformaton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PaymentInformation />, div);
  ReactDOM.unmountComponentAtNode(div);
});
