import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import TopNav from './TopNav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><TopNav /></MemoryRouter>, div)
  ReactDOM.unmountComponentAtNode(div);
});