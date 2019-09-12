import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import EmptyFolder from './EmptyFolder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><EmptyFolder /></MemoryRouter>, div)
  ReactDOM.unmountComponentAtNode(div);
});