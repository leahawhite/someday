import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import SignupPage from './SignupPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><SignupPage /></MemoryRouter>, div)
  ReactDOM.unmountComponentAtNode(div);
});