import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import TopNav from './TopNav/TopNav';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';
import AddNotePage from './AddNotePage/AddNotePage';
import NotesPage from './NotesPage/NotesPage';
import TokenService from './services/TokenService';
import './app.css';

export default class App extends Component {
  state = {
    loggedIn: TokenService.getAuthToken(),
  }

  handleLogin = () => {
    this.setState({ loggedIn: true })
  }

  handleLogout = () => {
    TokenService.clearAuthToken()
    this.setState({ loggedIn: false })
  }

  render() {
    return (
      <div className='App'>
        <TopNav loggedIn={this.state.loggedIn} onLogout={this.handleLogout} />
        <Switch>
          <Route exact path={'/'} render={props =>
            <LoginPage loggedIn={this.state.loggedIn} onLogin={this.handleLogin} {...props}/>} 
          />
          <Route exact path={'/login'} render={props =>
            <LoginPage loggedIn={this.state.loggedIn} onLogin={this.handleLogin} {...props}/>} 
          />
          <Route path={'/signup'} component={SignupPage} />
          <PrivateRoute path={'/dashboard'} component={NotesPage} />
          <Route path={'/add-note'} component={AddNotePage} />
        </Switch>
      </div>
    )
  }
}