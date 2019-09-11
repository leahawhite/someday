import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TopNav from './TopNav/TopNav';
import SideNav from './SideNav/SideNav';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';
import AddNotePage from './AddNotePage/AddNotePage';
import NotesPage from './NotesPage/NotesPage';
import TokenService from './services/token-service';
import store from './store';
import './app.css';

export default class App extends Component {
  state = {
    loggedIn: TokenService.getAuthToken(),
    selectedFolderId: null,
    toDashboard: false,
    loading: false,
    notes: store.notes,
    folders: store.folders,
    error: null,
    sort: 'date',
    selectedNote: null,
    editId: null,
    updatedNote: {},
    noteFolder: "",  
    what: "",
    how: "",
    who: "",
    link: "",
    highlight: "",
    thoughts: "",
  }

  handleLogin = () => {
    this.setState({ 
      loggedIn: true,
      toDashboard: true
    })
  }

  handleLogout = () => {
    TokenService.clearAuthToken()
    this.setState({ loggedIn: false })
  }

  getData = () => {
    this.setState({
      notes: store.notes,
      folders: store.folders
    })
  }

  onFolderSelect = folderId => {
    this.setState({
      selectedFolderId: folderId
    })
  }

  handleNoteSelect = note => {
    this.setState({
      selectedNote: note
    })
  }

  handleNoteSubmit = e => {
    e.preventDefault()
    const { noteFolder, what, how, who, link, highlight, thoughts, selectedNote } = this.state
    this.setState({
      editId: null
    })
    this.updateNotes()
  }

  addNewNote = newNote => {
    this.setState({
      notes: [ ...this.state.notes, newNote ]
    })
  }

  handleNoteCancel = id => {
    this.setState({
      editId: null
    })
  }

  handleNoteEdit = note => {
    console.log('handleNoteEdit ran')
    console.log('note', note)
    this.setState({
      selectedNote: note,
      editId: note.id,
      noteFolder: note.folder,  
      what: note.what,
      how: note.how,
      who: note.who,
      link: note.link,
      highlight: note.highlight,
      thoughts: note.thoughts, 
    }, () => console.log('this.state', this.state))
  }

  handleNoteDelete = id => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    const newNotes = this.state.notes.filter(nt =>
      nt.id !== id)
    this.setState({ notes: newNotes })
  }

  handleNoteArchive = note => {
    this.setState({
      selectedNote: note,
      noteFolder: 7,  
    }, () => {
      const updatedNote = {
        "id": this.state.selectedNote.id,
        "folder": this.state.noteFolder,
      }
      this.setState(
        { updatedNote },
        () => {this.updateNotes(this.state.updatedNote)}
      )
    }) 
  }

  handleChangeFolder = e => {
    this.setState({ noteFolder: e.target.value })
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

  render() {
    const {
      loggedIn, 
      selectedFolderId, 
      toDashboard,
      loading,
      error,
      notes,
      folders,
      folder,
      selectedNote,
      editId,
      updatedNote,
      noteFolder,  
      what,
      how,
      who,
      link,
      highlight,
      thoughts
    } = this.state
    
    return (
      <div className='App'>
        <TopNav loggedIn={this.state.loggedIn} onLogout={this.handleLogout} />
        <div className="main-container">
          <Route path={["/dashboard", "/add-note"]} component={props =>
            <SideNav onFolderSelect={this.onFolderSelect} folders={this.state.folders} {...props}/>} 
          />
          <main className="main-content" role="main">
            <Route exact path={'/'} render={props =>
              <LoginPage loggedIn={loggedIn} onLogin={this.handleLogin} toDashboard={toDashboard} {...props}/>} 
            />
            <Route exact path={'/login'} render={props =>
              <LoginPage loggedIn={loggedIn} onLogin={this.handleLogin} {...props}/>} 
            />
            <Route path={'/signup'} component={SignupPage} />
            <PrivateRoute path={'/dashboard'} component={props =>
              <NotesPage
                selectedFolderId={selectedFolderId} 
                onFolderSelect={this.onFolderSelect}
                loading={loading}
                error={error}
                notes={notes}
                folders={folders}
                folder={folder}
                selectedNote={selectedNote}
                editId={editId}
                updatedNote={updatedNote}
                noteFolder={noteFolder}
                what={what}
                how={how}
                who={who}
                link={link}
                highlight={highlight}
                thoughts={thoughts}
                handleNoteSelect={this.handleNoteSelect}
                handleNoteSubmit={this.handleNoteSubmit}
                handleNoteCancel={this.handleNoteCancel}
                handleNoteEdit={this.handleNoteEdit}
                handleNoteArchive={this.handleNoteArchive}
                handleChangeFolder={this.handleChangeFolder}
                handleChangeWhat={this.handleChangeWhat}
                handleChangeHow={this.handleChangeHow}
                handleChangeWho={this.handleChangeWho}
                handleChangeLink={this.handleChangeLink}
                handleChangeHighlight={this.handleChangeHighlight}
                handleChangeNotes={this.handleChangeNotes}
                updateNotes={this.updateNotes}
                handleNoteDelete={this.handleNoteDelete}
                {...props} />}
            />
            <PrivateRoute path={'/add-note'} component={props =>
              <AddNotePage 
                loading={loading}
                error={error}
                addNewNote={this.addNewNote}
                {...props} />}
            />
          </main>
        </div>
        
      </div>
    )
  }
}