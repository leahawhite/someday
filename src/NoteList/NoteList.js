import React, { Component } from 'react';
import Button from '../Button/Button';
import NoteForm from '../NoteForm/NoteForm';
const newNoteTemplate = {
  id: -1,
  what: "",
  where: "",
  who: "",
  link: "",
  highlight: "",
  thoughts: "",
  favorite: "",
  author: "",
  date_created: "",
  date_edited: "",
  folder: ""
}

export default class NoteList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editModeIndex: null,
      newNote: null
    }
  }
  toggleEditModeIndex = index => {
    const { editModeIndex } = this.state
    this.setState({
      newNote: null,
      editModeIndex: editModeIndex === index ? -1 : index
    })
  }
  addNote = () => {
    const newNote = { ...newNoteTemplate }
    newNote.folder = this.state.selectedFolderId
    this.setState({
      newNote,
      editModeIndex: 0
    })
  }
  deleteNote = id => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    const newNotes = this.props.notes.filter(nt =>
      nt.id !== id)
    this.setState({ notes: newNotes })
  }
  archiveNote = id => {
    console.log(`archiving note with id ${id}`)
  }
  onNoteSubmit = e => {
    e.preventDefault()
    // fetch post and then get
    this.setState({
      editModeIndex: null,
      newNote: null
    })
  }
  onNoteCancel = () => {
    this.setState({
      // index null?
      editModeIndex: false,
      newNote: null
    })
  }
  
  render() {
    const { notes } = this.props
    if (this.state.newNote) {
      notes.unshift(this.state.newNote)
    }
    const noteCard = notes.map((note, index) => {
      const isEditing = this.state.editModeIndex === index
      const editingModeClassName = isEditing ? "hide" : ""
      const card = (
        <div key={index} className="noteCard">
          {!this.state.newNote ? (
            <div className="button-container right">
              <Button btnType="button" btnText="Edit" btnClass={editingModeClassName} onClick={() => this.toggleEditModeIndex(index)}/>
              <Button btnType="button" btnText="Delete" btnClass={editingModeClassName} onClick={() => this.deleteNote(note.id)}/>
              <Button btnType="button" btnText="Archive" btnClass="note-btn" onClick={() => this.archiveNote(note.id)}/>
            </div>
          ) : null}
          <div className="cardContent">
            <NoteForm
              key={note.id}
              note={note}
              editMode={isEditing}
              onNoteSubmit={this.onNoteSubmit}
              onNoteCancel={this.onNoteCancel}
            />
          </div>
        </div>
      )
      return card;
    })
    return (
      <div className="noteList">
        {noteCard}
      </div>
    )
  }
}

