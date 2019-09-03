import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';
import Spinner from '../Spinner/Spinner';
import Note from '../Note/Note';
import NoteForm from '../NoteForm/NoteForm';
import store from '../store';
import './notespage.css';

export default class NotesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      notes: [],
      sort: 'date',
      error: null,
      selectedFolderId: null,
      editId: null,
      updatedNote: {}
    }
  }

  componentDidMount() {
    this.setState({
      notes: store.notes
    })
  }

  onFolderSelect = folderId => {
    this.setState({
      selectedFolderId: folderId
    })
  }

  handleUpdateSort = e => {
    this.setState({
      sort: e.target.value
    })
  }

  handleNoteSubmit = e => {
    e.preventDefault()
    // validation and fetch patch or post with input values
    // get note by id and update note with new info
    // then resetFields
    // then updateNotes(newNote)
    this.setState({
      editId: null
    })
  }

  handleNoteCancel = id => {
    this.setState({
      editId: null
    })
  }

  handleNoteEdit = id => {
    this.setState({
      editId: id
    })
  }

  updateNote = e => {
    const field = e.target.name
    const note = this.state.noteEdited
    note[field] = e.target.value
    return this.setState({ 
      category: this.props.note.folder || "", 
      what: this.props.note.what || "",
      where: this.props.note.where || "",
      who: this.props.note.who || "",
      link: this.props.note.link || "",
      highlight: this.props.note.highlight || "",
      notes: this.props.note.notes | "", 
    })
  }

  updateNotes = updatedNote => {
    this.setState({
      notes: this.state.notes.map(nt =>
        (nt.id !== updatedNote.id) ? nt : updatedNote)
    })
  }

  handleNoteDelete = noteId => {
    if (!window.confirm('Are you sure?')) {
      return
    }
      const newNotes = this.state.notes.filter(nt =>
        nt.id !== noteId)
      this.setState({ notes: newNotes })
   }

  sortResults = results => {
    const { sort } = this.state
    console.log('sort', sort)
    if (sort) {
      if (sort === 'date') {
        results = results.sort((a,b) => (a.date_created < b.date_created) ? 1 : ((b.date_created < a.date_created) ? -1 : 0));
      } else if (sort === 'highlighted') {
        // this code doesn't work
        results = results.sort((a,b) => (a.highlighted === b.highlighted) ? 0 : a.highlighted ? -1 : 1);
      }
    }
    return results
  }

  renderNotes() {
    const { notes, loading, selectedFolderId, editId } = this.state
    const results = notes.filter(note => note.folder === selectedFolderId)
    console.log('results', results)
    const noteList = results.length ? this.sortResults(results).map((note, index) => {
      if (editId) {
        return <NoteForm 
                key={index} 
                note={note} 
                onSubmit={this.handleNoteSubmit} 
                onCancel={this.handleNoteCancel} 
                />
      } else {
        return <Note 
                key={index} 
                index={index} 
                note={note} 
                onEdit={this.handleNoteEdit} 
                onDelete={this.handleNoteDelete}
                onArchive={this.handleNoteArchive} 
               />
      }
    }) : null 
    
    if (loading) {
      return <Spinner />
    } else if (notes.length) {
        return (
          <>  
            <form className="sort-results-form">
              <label className="sort-results" htmlFor="sort-results">Sort by:</label>
              <select 
                className="sort-select" 
                type="text" 
                id="sort-results"
                name="sort"
                value={this.state.value}
                onChange={e => this.handleUpdateSort(e)} 
              >
                <option name="sort" value="date">Most recent</option>
                <option name="sort" value="highlighted">Highlighted</option>
              </select>
            </form>
            {noteList}
          </>
        )
      } else {
        // return null? or else this pops on the screen first thing
          return (
            <section className="item-list">
              <p>Navigate the folders to see your items or <Link to="/add-note">Create a New Item.</Link></p> 
            </section>
          )
        }
  }

  render() {
    const { error } = this.state
    return (
      <div className="row">
        <SideNav onFolderSelect={this.onFolderSelect}/>
        <section className="item-list">
          <div role="alert">
            {error && <p className="error">{error}</p>}
          </div>
          {this.renderNotes()}
        </section>
      </div>
    )
  }
}