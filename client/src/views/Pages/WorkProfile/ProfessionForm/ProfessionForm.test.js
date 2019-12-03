import React from 'react';
import ReactDOM from 'react-dom';
import ProfessionForm from './ProfessionForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProessionForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
