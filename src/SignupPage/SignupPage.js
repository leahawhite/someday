import React, { Component } from 'react';
import Button from '../Button/Button';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';
import './signuppage.css'

export default class SignupPage extends Component {
  state = {
    error: null
  }

  handleSubmit = event => {
    event.preventDefault();
    const { name, email, password } = event.target
    const newUser = {
      full_name: name.value,
      email: email.value,
      password: password.value
    }
    this.setState({ error: null })
    AuthApiService.signupUser(newUser)
      .then(user => AuthApiService.loginUser({
        email: email.value,
        password: password.value
      }))
      .then(res => {
        name.value = ''
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
      <div className="signup">
        <div className="form-container">
          <form onSubmit={e => this.handleSubmit(e)}>
            <h2>Sign Up</h2>
            <div role='alert'>
              {error && <p className='error'>{error}</p>}
            </div>
            <div className="input-container">
              <label htmlFor="name">Full name -- between 3 and 36 characters</label>
              <input
                name="name"
                type="text"
                aria-label="name"
                aria-required="true"
                required
                id="name"
                minLength="3"
                maxLength="36"
                autoComplete="off" 
              />
            </div>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                aria-label="email address"
                aria-required="true"
                required
                id="email"
                autoComplete="off" 
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password -- at least 6 characters, one number</label>
              <input
                name="password"
                type="password"
                aria-label="password"
                aria-required="true"
                required
                id="password" 
                minLength="6"
                maxLength="36"
                pattern=".*[0-9].*"
                autoComplete="off" 
              />
            </div>
          <Button btntype="submit" btnText="Register" />
          </form>
        </div>
      </div>
  )
  }
}