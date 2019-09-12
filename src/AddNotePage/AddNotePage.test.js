import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import AddNotePage from './AddNotePage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><AddNotePage /></MemoryRouter>, div)
  ReactDOM.unmountComponentAtNode(div);
});