import React from 'react';
import ReactDOM from 'react-dom';
import Note from './Note';

it.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Note /> , div)
  ReactDOM.unmountComponentAtNode(div);
});