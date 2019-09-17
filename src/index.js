import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { NotesProvider } from './context/NotesContext'
import App from './App';
import './index.css';
import {
  faBook,
  faFilm,
  faFolder,
  faHiking,
  faRoad,
  faSpinner,
  faStar,
  faUtensils,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faBook,
  faFilm,
  faFolder,
  faHiking,
  faRoad,
  faSpinner,
  faStar,
  faUtensils,
  faVolumeUp
)

ReactDOM.render(
  <BrowserRouter>
    <NotesProvider>
      <App />
    </NotesProvider>
  </BrowserRouter>, 
  document.getElementById('root')
);