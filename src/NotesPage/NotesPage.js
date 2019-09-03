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
      selectedNote: null,
      editId: null,
      updatedNote: {},
      folder: "",  
      what: "",
      where: "",
      who: "",
      link: "",
      highlight: "",
      noteNotes: "", 
    }
  }
  // need to update values and pass them to noteform -- 

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
    const { folder, what, where, who, link, highlight, noteNotes } = this.state
    console.log('where', where)
    // validation and fetch patch or post with input values
    // get note by id and update note with new info
    // then resetFields
    // then updateNotes(newNote)
    this.setState({
      editId: null
    })
    const items = new Map([['folder', folder], ['what', what], ['where', where], ['who', who], ['link', link], ['highlight', highlight], ['noteNotes', noteNotes]])
    const updatedNote = Object.fromEntries(items)
    this.setState({ updatedNote })
    console.log('this.state.updatedNote sub', this.state.updatedNote)
    this.updateNotes(this.state.updatedNote)
  }

  handleNoteCancel = id => {
    this.setState({
      editId: null
    })
  }

  handleNoteEdit = note => {
    this.setState({
      selectedNote: note,
      editId: note.id,
      folder: note.folder,  
      what: note.what,
      where: note.where,
      who: note.who,
      link: note.link,
      highlight: note.highlight,
      noteNotes: note.noteNotes, 
    })
  }

  handleChangeFolder = e => {
    this.setState({ folder: e.target.value })
  }
  handleChangeWhat = e => {
    this.setState({ what: e.target.value })
  }
  handleChangeWhere = e => {
    this.setState({ where: e.target.value })
  }
  handleChangeWho = e => {
    this.setState({ who: e.target.value })
  }
  handleChangeLink = e => {
    this.setState({ link: e.target.value })
  }
  handleChangeHighlight = e => {
    this.setState({ highlight: e.target.value })
  }
  handleChangeNotes = e => {
    this.setState({ noteNotes: e.target.value })
  }
  updateNotes = updatedNote => {
    this.setState({
      notes: this.state.notes.map(nt =>
        (nt.id !== updatedNote.id) ? nt : updatedNote)
    })
    console.log('updatedNOte', updatedNote)
    console.log('this.state.notes', this.state.notes)
  }

  handleNoteDelete = id => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    const newNotes = this.state.notes.filter(nt =>
      nt.id !== id)
    this.setState({ notes: newNotes })
  }

  sortResults = results => {
    const { sort } = this.state
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
    const { folder, what, where, who, link, highlight, noteNotes } = this.state
    const results = notes.filter(note => note.folder === selectedFolderId)
    console.log('results', results)
    const noteList = results.length ? this.sortResults(results).map((note, index) => {
      if (note.id === editId) {
        return <NoteForm 
                key={index} 
                note={note}
                folder={folder}
                what={what}
                where={where}
                who={who}
                link={link}
                highlight={highlight}
                noteNotes={noteNotes}
                changeFolder={this.handleChangeFolder}
                changeWhat={this.handleChangeWhat}
                changeWhere={this.handleChangeWhere}
                changeWho={this.handleChangeWho}
                changeLink={this.handleChangeLink}
                changeHighlight={this.handleChangeHighlight}
                changeNotes={this.handleChangeNotes}
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