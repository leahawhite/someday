import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';
import './loginpage.css'

export default class LoginPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    }
  }
  state = {
    error: null
  }
  
  handleSubmit = event => {
    event.preventDefault()
    this.setState({ error: null })
    const { email, password } = event.target
    AuthApiService.loginUser({
      email: email.value,
      password: password.value,
    })
      .then(res => {
        email.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.props.onLogin()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }
  
  render() {
    const { error } = this.state
    return (
      <div className="login">
        <header className="login-header">
          <Link to='/'><h1>Someday</h1></Link>
          <p>Bookmark the latest cultural hits so that you too can experience them... someday.</p>
        </header>
        <div className="form-container">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <h2>User Login</h2>
            <div role='alert'>
              {error && <p className="auth">{error}</p>}
            </div>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                aria-label="email address"
                aria-required="true"
                required
                id="email" 
                autoComplete="off"
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                aria-label="password"
                aria-required="true"
                required
                id="password" 
                autoComplete="off"
              />
            </div>
            <button className="login-btn" type="submit">Log In</button>
              <p>Demo email: demo@demo.com</p>
              <p>Demo password: demo123</p>
          </form>
        </div>
      </div>
    )
  }
}
