import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import NotesPage from './NotesPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><NotesPage /></MemoryRouter>, div)
  ReactDOM.unmountComponentAtNode(div);
});