import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import App from './App';
import './index.css';
import {
  faBook,
  faFilm,
  faFolder,
  faHiking,
  faRoad,
  faSpinner,
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
  faUtensils,
  faVolumeUp
)

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, 
  document.getElementById('root')
);