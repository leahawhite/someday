import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TokenService from '../services/token-service';
import './loginpage.css'

export default class LoginPage extends Component {
  state = {
    redirect: false
  }
  
  handleSubmit = event => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const token = TokenService.makeBasicAuthToken(email, password)
    TokenService.saveAuthToken(token)
    this.props.onLogin()
    this.setState({
      redirect: true
    })
  }
  
  render() {
    return (
      <>
        <div className="login-container">
          <header className="login-header">
            <Link to='/'><h1>Someday</h1></Link>
            <p>Bookmark the latest cultural hits so that you too can experience them -- someday.</p>
          </header>
          <div className="form-container">
            <form className="login-form" onSubmit={this.handleSubmit}>
              <h2>Log In</h2>
              <div className="input-container">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  aria-label="email address"
                  aria-required="true"
                  required
                  id="email" 
                />
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  aria-label="password"
                  aria-required="true"
                  required
                  id="password" 
                />
              </div>
              <button type="submit">Log In</button>
                <p>Demo email: demo@demo.com</p>
                <p>Demo password: demo123</p>
            </form>
          </div>
        </div>
        {this.state.redirect && 
          <Redirect to={'/dashboard'} />
        }
      </>
    )
  }
}