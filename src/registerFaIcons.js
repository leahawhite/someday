import { library } from '@fortawesome/fontawesome-svg-core';

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

export default function registerIcons() {

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
	);
}