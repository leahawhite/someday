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
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: TokenService.getAuthToken(),
      selectedFolderId: null,
      redirect: false,
      loading: false,
      error: null,
      notes: [],
      folders: [],
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
      }
    }
  }
  
  componentDidMount() {
    // this.populateStateWithLocalStorage()
    // window.addEventListener('beforeunload', this.saveStateToLocalStorage.bind(this))
    this.getFolders()
  }

  // componentWillUnmount() {
  //   window.removeEventListener('beforeunload', this.saveStateToLocalStorage.bind(this))
  //   this.saveStateToLocalStorage()
  // }

  // save state to local storage in case of window refresh
  saveStateToLocalStorage = () => {
    // eslint-disable-next-line
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  // load local storage into state
  populateStateWithLocalStorage = () => {
    // eslint-disable-next-line
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  handleLogin = () => {
    this.setState({ loggedIn: true }, () => {
      this.getNotes()
    })
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
      // .then(notes => {
      //   localStorage.setItem("notes", JSON.stringify(notes))
      // })
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
    this.setState({ loading: true })
    NotesApiService.insertNote(newNote)
      .then(newNote => {
        this.addNewNote(newNote)
      })
      .then(() => {
        this.setState({ 
          loading: false,
          redirect: true })
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

  setInitialNote = note => {
    const updatedNote = {...this.state.updatedNote}
    // eslint-disable-next-line
    for (let key in updatedNote) {
      updatedNote[key] = note[key]
    } 
      this.setState({
        updatedNote,
        editId: note.id
      }, () => {console.log('this.state', this.state)})
  }

  handleUpdatedNoteSubmit = (e, cb) => {
    e.preventDefault()
    const { updatedNote } = this.state
    this.setState({
      editId: null,
      loading: true
    })
    NotesApiService.updateNote(updatedNote)
      .then(response => {
        this.setState({
          updatedNote: response,
          loading: false
        },
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
    }, () => console.log('updated this.state',this.state))
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

  handleArchivedNote = note => {
    const archivedNote = {...this.state.updatedNote}
    // eslint-disable-next-line
    for (let key in archivedNote) {
      archivedNote[key] = note[key]
    }
    archivedNote.folder = 7
    this.setState({
      updatedNote: archivedNote,
    }, () => {
      NotesApiService.updateNote(this.state.updatedNote)
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
      updatedNote
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
                updatedNote={updatedNote}
                handleNoteSubmit={this.handleUpdatedNoteSubmit}
                handleNoteCancel={this.handleNoteEditCancel}
                setInitialNote={this.setInitialNote}
                handleNoteArchive={this.handleArchivedNote}
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