import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import TopNav from './TopNav/TopNav';
import SideNav from './SideNav/SideNav';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';
import AddNotePage from './AddNotePage/AddNotePage';
import NotesPage from './NotesPage/NotesPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import TokenService from './services/token-service';
import NotesApiService from './services/notes-api-service';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      loggedIn: TokenService.getAuthToken(),
      redirect: false,
      folders: [],
      selectedFolderId: null,
    }
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
    NotesApiService.getFolders()
    .then(folders => {
      this.setState({ folders })
    })
    .catch(error => {
      this.setState({ error: error })
    })
  }

  handleFolderSelect = folderId => {
    this.setState({
      selectedFolderId: folderId
    })
  }
  
  handleLogin = () => {
    this.setState({ loggedIn: true }, () => {
      this.props.history.push('/dashboard')
    })
  }

  handleLogout = () => {
    TokenService.clearAuthToken()
    this.setState({ loggedIn: false })
  }

  render() {
    const {
      loggedIn, 
      redirect,
      loading,
      folders,
      selectedFolderId
    } = this.state
    
    return (
      <div className='App'>
        <TopNav loggedIn={this.state.loggedIn} onLogout={this.handleLogout} />
        <div className="container">
          <Route path={["/dashboard", "/add-note"]} render={props => 
            <SideNav 
              {...props} 
              folders={folders} 
              selectedFolderId={selectedFolderId} 
              onFolderSelect={this.handleFolderSelect} 
            />}
          />
          <main className="main-content" role="main">
            {this.state.hasError && <p className='error'>There was an error! Oh no!</p>}
            <Switch>
              <Route exact path={'/'} render={props =>
                <LoginPage loggedIn={loggedIn} onLogin={this.handleLogin} redirect={redirect} {...props}/>} 
              />
              <Route exact path={'/login'} render={props =>
                <LoginPage loggedIn={loggedIn} onLogin={this.handleLogin} redirect={redirect} {...props}/>} 
              />
              <Route path={'/signup'} render={props =>
                <SignupPage onLogin={this.handleLogin} redirect={redirect} {...props}/>} 
              />
              <PrivateRoute key="private" path={'/dashboard'} render={props =>
                <NotesPage
                  key="notespage"
                  loading={loading}
                  folders={folders}
                  selectedFolderId={selectedFolderId}
                  {...props} />}
              />
              <PrivateRoute path={'/add-note'} render={props =>
                <AddNotePage 
                  loading={loading}
                  redirect={redirect}
                  {...props} />}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(App)