import React, { Component } from 'react'

const NotesContext = React.createContext({
  notes: [],
  folders: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setNotes: () => {},
  onFolderSelect: () => {},
  addNewNote: () => {},
  changeInput: () => {},
  cancelEdit: () => {},
  handleEdit: () => {},
  handleDelete: () => {},
  handleArchive: () => {},
  setUpdatedNote: () => {},
  updateNotes: () => {},
  updatedNote: {
    id: null,
    folder: "",  
    what: "",
    how: "",
    who: "",
    link: "",
    favorite: "",
    thoughts: "",
  },
  editId: null,
})

export default NotesContext

export class NotesProvider extends Component {
  state = {
    notes: [],
    error: null,
    editId: null,
    updatedNote: {
      id: null,
      folder: "",  
      what: "",
      how: "",
      who: "",
      link: "",
      favorite: "",
      thoughts: "",
    },
  }

  setNotes = notes => {
    this.setState({ notes })
  }

  setError = error => {
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  addNewNote = newNote => {
    this.setState({
      notes: [ ...this.state.notes, newNote ]
    })
  }

  handleEdit = note => {
    const updatedNote = {...this.state.updatedNote}
    // eslint-disable-next-line
    for (let key in updatedNote) {
      updatedNote[key] = note[key]
    } 
    this.setState({
      updatedNote,
      editId: note.id
    })
  }

  changeInput = e => {
    e.preventDefault();
    const target = e.target
    const name = target.name
    let value
    if (target.type === 'checkbox') {
      value = target.checked
    } else if (name === 'folder') {
      value = Number(target.value)
    } else {
      value = target.value
    }
    this.setState({
      ...this.state,
      updatedNote: {
        ...this.state.updatedNote,
        [name]: value
      }
    })
  }

  setUpdatedNote = updatedNote => {
    this.setState({ updatedNote })
  }

  updateNotes = updatedNote => {
    const notes = this.state.notes
    console.log('update Notes updatedNote', updatedNote)
    const updatedFullNote = Object.assign(notes[notes.findIndex(nt => nt.id === updatedNote.id)], updatedNote)
    this.setState({
      notes: this.state.notes.map(nt =>
          (nt.id !== updatedFullNote.id) ? nt : updatedFullNote)
    })
  }

  cancelEdit = id => {
    this.setState({ editId: null })
  }
    
  deleteNote = id => {
    const newNotes = this.state.notes.filter(nt =>
      nt.id !== id)
    this.setState({ notes: newNotes })
  }

  archiveNote = note => {
    const archivedNote = {...this.state.updatedNote}
    // eslint-disable-next-line
    for (let key in archivedNote) {
      archivedNote[key] = note[key]
    }
    archivedNote.folder = 7
    console.log('archivedNote', archivedNote)
    this.setState({
      updatedNote: archivedNote,
    }, () => {console.log('end of archive note updatednote', this.state.updatedNote)}) 
  }
  
  render() {
    const value = {
      notes: this.state.notes,
      error: this.state.error,
      editId: this.state.editId,
      updatedNote: this.state.updatedNote,
      setError: this.setError,
      clearError: this.clearError,
      setNotes: this.setNotes,
      addNewNote: this.addNewNote,
      handleEdit: this.handleEdit,
      changeInput: this.changeInput,
      setUpdatedNote: this.setUpdatedNote,
      updateNotes: this.updateNotes,
      cancelEdit: this.cancelEdit,
      deleteNote: this.deleteNote,
      archiveNote: this.archiveNote,
    }

    return (
      <NotesContext.Provider value={value}>
        {this.props.children}
      </NotesContext.Provider>
    )
  }
}
