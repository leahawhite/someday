import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import TopNav from './TopNav/TopNav';
import SideNav from './SideNav/SideNav';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';
import AddNotePage from './AddNotePage/AddNotePage';
import NotesPage from './NotesPage/NotesPage';
import NotesApiService from './services/notes-api-service';
import TokenService from './services/token-service';
import './app.css';

class App extends Component {
  state = {
    loggedIn: TokenService.getAuthToken(),
    selectedFolderId: null,
    redirect: false,
    loading: false,
    notes: [],
    folders: [],
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

  componentDidMount() {
    this.getFolders()
    if (this.state.loggedIn) {
      this.getNotes()
    }
  }

  handleLogin = () => {
    this.setState({ loggedIn: true })
    this.props.history.push('dashboard')
  }

  handleLogout = () => {
    TokenService.clearAuthToken()
    this.setState({ loggedIn: false })
  }

  getFolders = () => {
    this.setState({ loading: true })
    NotesApiService.getFolders()
      .then(folders => {
        this.setState({
          folders,
          loading: false
        })
      })
      .catch(error => {
        this.setState({ error: error })
      })
  }
  
  getNotes = () => {
    this.setState({ loading: true })
    NotesApiService.getNotes()
      .then(notes => {
        this.setState({
          notes,
          loading: false
        })
      })
      .catch(error => {
        this.setState({ error: error })
      })
  }

  onFolderSelect = folderId => {
    this.setState({
      selectedFolderId: folderId
    })
  }

  handleNewNoteSubmit = newNote => {
    NotesApiService.insertNote(newNote)
      .then(newNote => {
        this.addNewNote(newNote)
      })
      .then(() => {
        this.setState({ redirect: true })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  } 

  addNewNote = newNote => {
    this.setState({
      notes: [ ...this.state.notes, newNote ]
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

  handleUpdatedNoteSubmit = (e, cb) => {
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
    NotesApiService.updateNote(updatedNote)
      .then(response => {
        this.setState(
          { updatedNote: response },
          () => {this.updateNotes(this.state.updatedNote)})
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  updateNotes = updatedNote => {
    const notes = this.state.notes
    const updatedFullNote = Object.assign(notes[notes.findIndex(nt => nt.id === updatedNote.id)], updatedNote)
    this.setState({
      notes: this.state.notes.map(nt =>
          (nt.id !== updatedFullNote.id) ? nt : updatedFullNote)
    }, () => console.log('updatedFullNote', updatedFullNote))
  }

  handleNoteEditCancel = id => {
    this.setState({ editId: null })
  }
  
  handleNoteDelete = (id, cb) => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    NotesApiService.deleteNote(id)
      .then(data => {
        cb(data)
      }, () => {this.removeDeletedNote(id)})
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  removeDeletedNote(id) {
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
      NotesApiService.updateNote(updatedNote)
        .then(response => {
          this.setState(
            { updatedNote: response },
            () => {this.updateNotes(this.state.updatedNote)})
        })
        .catch(res => {
          this.setState({ error: res.error })
        })
    }) 
  }
  
  render() {
    const {
      loggedIn, 
      selectedFolderId, 
      redirect,
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
            <SideNav onFolderSelect={this.onFolderSelect} getFolders={this.getFolders} loading={loading} folders={this.state.folders} {...props}/>} 
          />
          <main className="main-content" role="main">
            <Route exact path={'/'} render={props =>
              <LoginPage loggedIn={loggedIn} onLogin={this.handleLogin} redirect={redirect} {...props}/>} 
            />
            <Route exact path={'/login'} render={props =>
              <LoginPage loggedIn={loggedIn} onLogin={this.handleLogin} {...props}/>} 
            />
            <Route path={'/signup'} render={props =>
              <SignupPage onLogin={this.handleLogin} redirect={redirect} {...props}/>} 
            />
            <PrivateRoute key="private" path={'/dashboard'} render={props =>
              <NotesPage
                key="notespage"
                selectedFolderId={selectedFolderId} 
                loading={loading}
                error={error}
                getNotes={this.getNotes}
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
                handleNoteSubmit={this.handleUpdatedNoteSubmit}
                handleNoteCancel={this.handleNoteEditCancel}
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
                redirect={redirect}
                submitNewNote={this.handleNewNoteSubmit}
                {...props} />}
            />
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(App)