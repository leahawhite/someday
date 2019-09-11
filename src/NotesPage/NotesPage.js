import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';
import Spinner from '../Spinner/Spinner';
import EmptyFolder from '../EmptyFolder/EmptyFolder';
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
      folders: [],
      sort: 'date',
      error: null,
      selectedNote: null,
      editId: null,
      updatedNote: {},
      folder: "",  
      what: "",
      how: "",
      who: "",
      link: "",
      highlight: "",
      thoughts: "", 
    }
  }
  // need to update values and pass them to noteform -- 

  componentDidMount() {
    this.setState({
      notes: store.notes,
      folders: store.folders
    })
  }

  handleUpdateSort = e => {
    this.setState({
      sort: e.target.value
    })
  }

  handleNoteSelect = note => {
    this.setState({
      selectedNote: note
    })
  }

  handleNoteSubmit = e => {
    e.preventDefault()
    const { folder, what, how, who, link, highlight, thoughts, selectedNote } = this.state
    this.setState({
      editId: null
    })
    const updatedNote = {
      "id": selectedNote.id,
      "folder": folder,
      "what": what,
      "how": how,
      "who": who,
      "link": link,
      "highlight": highlight,
      "thoughts": thoughts
    }
    this.setState(
      { updatedNote },
      () => {this.updateNotes(this.state.updatedNote)}
    )
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
      how: note.how,
      who: note.who,
      link: note.link,
      highlight: note.highlight,
      thoughts: note.thoughts, 
    })
  }

  handleChangeFolder = e => {
    this.setState({ folder: e.target.value })
  }
  handleChangeWhat = e => {
    this.setState({ what: e.target.value })
  }
  handleChangeHow = e => {
    this.setState({ how: e.target.value })
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
    this.setState({ thoughts: e.target.value })
  }
  updateNotes = updatedNote => {
    const notes = this.state.notes
    const updatedFullNote = Object.assign(notes[notes.findIndex(nt => nt.id === updatedNote.id)], updatedNote)
    this.setState({
      notes: this.state.notes.map(nt =>
          (nt.id !== updatedFullNote.id) ? nt : updatedFullNote)
    })
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

  renderHeader() {
    const { notes, folders } = this.state
    const { selectedFolderId } = this.props
    console.log('selectedFolderId', selectedFolderId)
    const selectedFolder = folders && folders.length && folders.find(folder => folder.id === selectedFolderId)
    console.log('selectedFolder', selectedFolder)
    if (!notes.length) {
      return (
        <div className="notelist-header">
          <h2>Get started by <Link to="/add-note">creating a new note.</Link></h2> 
        </div>
      )
    } else if (notes && notes.length && !selectedFolderId) {
      return (
        <div className="notelist-header">
          <h2>Choose a folder to see your notes.</h2> 
        </div>
      )
    } else if (selectedFolderId) {
      return <h2 className="selectedFolder-title">{selectedFolder.text}</h2>
    }
  }

  renderNotes() {
    const { selectedFolderId } = this.props
    const { notes, loading, editId, folders } = this.state
    const { folder, what, how, who, link, highlight, thoughts } = this.state
    const selectedFolder = folders && folders.length && folders.find(folder => folder.id === selectedFolderId)
    const results = notes && notes.length && notes.filter(note => note.folder === selectedFolderId)
    const noteList = results && results.length ? this.sortResults(results).map((note, index) => {
      if (note.id === editId) {
        return <NoteForm 
                  key={index} 
                  note={note}
                  folder={folder}
                  what={what}
                  how={how}
                  who={who}
                  link={link}
                  highlight={highlight}
                  thoughts={thoughts}
                  changeFolder={this.handleChangeFolder}
                  changeWhat={this.handleChangeWhat}
                  changeHow={this.handleChangeHow}
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

    // MAIN NOTES SECTION:
    // if loading, show loader centered
    // if no notes, show Empty Folder component centered
    // if notes, show notes
    // at bottom of list of notes, another Add Notes button

    if (loading) {
      return <Spinner />
    } else if (selectedFolder && !noteList) {
      return <EmptyFolder selectedFolder={selectedFolder} />
    }
      else if (noteList && noteList.length) {
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
      } 
  }

  render() {
    const { error } = this.state
    return (
      <div className="row">
        <SideNav onFolderSelect={this.props.onFolderSelect}/>
        <section className="notelist">
          <div className="header">
            {this.renderHeader()}
          </div>
          <div className="items">
            <div role="alert">
              {error && <p className="error">{error}</p>}
            </div>
            {this.renderNotes()}
          </div>
        </section>
      </div>
    )
  }
}