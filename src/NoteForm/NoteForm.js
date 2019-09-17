import React, { Component } from 'react';
import Button from '../Button/Button';
import NotesContext from '../context/NotesContext';
import NotesApiService from '../services/notes-api-service';
import './noteform.css'

export default class NoteForm extends Component {
  static defaultProps = {
    onSubmit: () => {},
    cancelEdit: () => {},
    changeInput: () => {},
    updatedNote: {}
  }

  static contextType = NotesContext

  handleSubmit = e => {
    e.preventDefault()
    this.context.clearError()
    this.context.cancelEdit()
    const { updatedNote } = this.context
    console.log('updatedNote', updatedNote)
    NotesApiService.updateNote(updatedNote)
      .then(this.context.setUpdatedNote(updatedNote))
      .then(this.context.updateNotes(updatedNote))
      .catch(this.context.setError)
  }

  render() {
    const { cancelEdit, changeInput, updatedNote } = this.context
    
    return (
      <form className="note edit" onSubmit={(e) => this.handleSubmit(e)}>
        <label htmlFor="folder">Category?</label>
        <select id="folder" name="folder" value={updatedNote.folder} onChange={(e) => changeInput(e)}>
          <option value="1">Watch</option>
          <option value="2">Read</option>
          <option value="3">Listen</option>
          <option value="4">Eat</option>
          <option value="5">Do</option>
          <option value="6">Go</option>
          <option value="7">Archive</option>
        </select>
        <label htmlFor="what">What?</label>
        <input id="what" type="text" name="what" value={updatedNote.what} onChange={(e) => changeInput(e)} />
        <label htmlFor="how">Where can I find it?</label>
        <input id="how" type="text" name="how" value={updatedNote.how} onChange={(e) => changeInput(e)}/>
        <label htmlFor="who">Who recommended it?</label>
        <input id="who" type="text" name="who" value={updatedNote.who} onChange={e => changeInput(e)} />
        <label htmlFor="link">Link</label>
        <input id="link" type="text" name="link" value={updatedNote.link} onChange={e => changeInput(e)} />
        <p>Favorite?</p>   
        <label className="switch" htmlFor="favorite">
          <input 
            id="favorite" 
            type="checkbox" 
            name="favorite" 
            value={updatedNote.favorite}
            checked={updatedNote.favorite}
            onChange={e => changeInput(e)} 
            />
          <span className="slider round"></span>
        </label>
        <div>
        <label htmlFor="thoughts">Notes</label>
        <textarea id="notes" rows="3" name="thoughts" value={updatedNote.thoughts} onChange={e => changeInput(e)} />
        </div>
        <div className="noteform-buttons">
          <Button btnType="submit" btnText="Save" btnClass="note-btn" />
          <Button btnType="button" btnText="Cancel" btnClass="note-btn" onClick={e => cancelEdit(e)} />
        </div>
      </form>
    )
  }
}