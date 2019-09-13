import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service';
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
    const email = event.target.email.value
    const password = event.target.password.value
    const token = TokenService.makeBasicAuthToken(email, password)
    TokenService.saveAuthToken(token)
    this.props.onLogin()
    const { history } = this.props
    history.push('/dashboard')
  }
  
  render() {
    // const { toDashboard } = this.props
    const { error } = this.state
    // if (toDashboard) {
    //   return <Redirect to="/dashboard" />
    // }
    return (
      <div className="login">
        <header className="login-header">
          <Link to='/'><h1>Someday</h1></Link>
          <p>Bookmark the latest cultural hits so that you too can experience them -- someday.</p>
        </header>
        <div className="form-container">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <h2>User Login</h2>
            <div role='alert'>
              {error && <p className='red'>{error}</p>}
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
