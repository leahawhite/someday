import React, { Component } from 'react';
import Button from '../Button/Button';
import './signuppage.css'

export default class SignupPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }
  state = {
    newUser: {},
    error: null
  }

  handleSignUpSuccess = (newUser) => {
    const { history } = this.props
    history.push('/login')
  }

  handleSubmit = event => {
    event.preventDefault();
    const { name, email, password } = event.target
    const newUser = {
      full_name: name.value,
      email: email.value,
      password: password.value
    }
    this.setState({ 
      error: null,
      newUser: newUser 
    }, () => {this.handleSignUpSuccess(newUser)})
  }

  render() {
    return (
      <div className="signup">
        <div className="form-container">
          <form onSubmit={e => this.handleSubmit(e)}>
            <h2>Sign Up</h2>
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
          <Button btntype="submit" btnText="Sign Up" />
          </form>
        </div>
      </div>
  )
  }
}