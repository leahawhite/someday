import config from '../config';
import TokenService from './token-service'

const NotesApiService = {
  getFolders() {
    return fetch(`${config.API_ENDPOINT}/folders`)
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  getNotes() {
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
  },
  updateNote(updatedNote) {
    return fetch(`${config.API_ENDPOINT}/notes/${updatedNote.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(updatedNote),
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  deleteNote(noteId) {
    return fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      }
    })
  }
}

export default NotesApiService