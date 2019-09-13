import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
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

class App extends Component {
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
    favorite: "",
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

  handleNoteSubmit = e => {
    e.preventDefault()
    const { noteFolder, what, how, who, link, favorite, thoughts, selectedNote } = this.state
    this.setState({
      editId: null
    })
    const updatedNote = {
      id: selectedNote.id,
      folder: Number(noteFolder),
      what,
      how,
      who,
      link,
      favorite,
      thoughts,
    }
    console.log('updatedNote', updatedNote)
    this.setState(
      { updatedNote },
      () => {this.updateNotes(this.state.updatedNote)}
    )
  }

  addNewNote = newNote => {
    this.setState({
      notes: [ ...this.state.notes, newNote ]
    })
  }

  // basically a page reload, added withRouter to App to do this. necessary?
  handleNoteCancel = id => {
    this.setState({
      editId: null
    }, () => this.props.history.push('/dashboard'))
  }

  handleNoteEdit = note => {
    // populating state with orig values of note
    this.setState({
      selectedNote: note,
      editId: note.id,
      noteFolder: note.folder,  
      what: note.what,
      how: note.how,
      who: note.who,
      link: note.link,
      favorite: note.favorite,
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

  handleChangeInput = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      [e.target.getAttribute('name')]: e.target.value
    })
  }

  // handleChangeInput = e => {
  //   e.preventDefault();
  //   this.setState({
  //     ...this.state,
  //     updatedNote: {
  //       ...this.state.updatedNote,
  //       [e.target.getAttribute('name')]: e.target.value
  //     }
  //   }, () => console.log(this.state))
  // }

  updateNotes = updatedNote => {
    console.log('updatenotes updated note', updatedNote)
    const notes = this.state.notes
    const updatedFullNote = Object.assign(notes[notes.findIndex(nt => nt.id === updatedNote.id)], updatedNote)
    this.setState({
      notes: this.state.notes.map(nt =>
          (nt.id !== updatedFullNote.id) ? nt : updatedFullNote)
    })
    console.log('updated notes', notes)
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
      editId,
      noteFolder,  
      what,
      how,
      who,
      link,
      favorite,
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
            <PrivateRoute key="private" path={'/dashboard'} render={props =>
              <NotesPage
                key="notespage"
                selectedFolderId={selectedFolderId} 
                loading={loading}
                error={error}
                notes={notes}
                folders={folders}
                folder={folder}
                editId={editId}
                noteFolder={noteFolder}
                what={what}
                how={how}
                who={who}
                link={link}
                favorite={favorite}
                thoughts={thoughts}
                handleNoteSubmit={this.handleNoteSubmit}
                handleNoteCancel={this.handleNoteCancel}
                handleNoteEdit={this.handleNoteEdit}
                handleNoteArchive={this.handleNoteArchive}
                handleChangeInput={this.handleChangeInput}
                handleNoteDelete={this.handleNoteDelete}
                {...props} />}
            />
            <PrivateRoute path={'/add-note'} render={props =>
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

export default withRouter(App)