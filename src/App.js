import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import TopNav from './TopNav/TopNav';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';
import AddNotePage from './AddNotePage/AddNotePage';
import NotesPage from './NotesPage/NotesPage';
import TokenService from './services/token-service';
import './app.css';

export default class App extends Component {
  state = {
    loggedIn: TokenService.getAuthToken(),
    selectedFolderId: null,
    toDashboard: false
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

  onFolderSelect = folderId => {
    this.setState({
      selectedFolderId: folderId
    })
  }

  render() {
    const { selectedFolderId, toDashboard } = this.state
    return (
      <div className='App'>
        <TopNav loggedIn={this.state.loggedIn} onLogout={this.handleLogout} />
        <main className="main-content" role="main">
          <Switch>
            <Route exact path={'/'} render={props =>
              <LoginPage loggedIn={this.state.loggedIn} onLogin={this.handleLogin} toDashboard={toDashboard} {...props}/>} 
            />
            <Route exact path={'/login'} render={props =>
              <LoginPage loggedIn={this.state.loggedIn} onLogin={this.handleLogin} {...props}/>} 
            />
            <Route path={'/signup'} component={SignupPage} />
            <PrivateRoute path={'/dashboard'} component={props =>
              <NotesPage selectedFolderId={selectedFolderId} onFolderSelect={this.onFolderSelect} {...props} />}
            />
            <PrivateRoute path={'/add-note'} component={props =>
              <AddNotePage selectedFolderId={selectedFolderId} onFolderSelect={this.onFolderSelect} {...props} />}
            />
          </Switch>
        </main>
      </div>
    )
  }
}