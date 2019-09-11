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
    
  }

  handleLogin = () => {
    console.log('handleLogin ran')
    this.setState({ loggedIn: true },
      console.log('loggedin'),
      () => this.setState({ toDashboard: true }))  
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

  render() {
    const {
      loggedIn, 
      selectedFolderId, 
      toDashboard,
      loading,
      error,
      notes,
      folders,
      folder
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
                {...props} />}
            />
            <PrivateRoute path={'/add-note'} component={props =>
              <AddNotePage 
                selectedFolderId={selectedFolderId} 
                onFolderSelect={this.onFolderSelect}
                loading={loading}
                error={error}
                notes={notes}
                folders={folders}
                {...props} />}
            />
          </main>
        </div>
        
      </div>
    )
  }
}