import config from '../config';
import TokenService from './token-service'

const NotesApiService = {
  getFolders() {
    console.log('folders fetch ran')
    return fetch(`${config.API_ENDPOINT}/folders`, {
    method: 'GET',
    headers: {
      'authorization': `bearer ${TokenService.getAuthToken()}`,
    }})
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  getNotes() {
    console.log('notes fetch ran')
    return fetch(`${config.API_ENDPOINT}/notes`, {
    headers: {
      'authorization': `bearer ${TokenService.getAuthToken()}`,
    }})
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  insertNote(newNote) {
    return fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newNote),
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  }

}

export default NotesApiService