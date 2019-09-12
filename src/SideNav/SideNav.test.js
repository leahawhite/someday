import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import SideNav from './SideNav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><SideNav /></MemoryRouter>, div)
  ReactDOM.unmountComponentAtNode(div);
});