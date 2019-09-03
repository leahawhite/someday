import React, { Component } from 'react';
import './signuppage.css'

export default class SignupPage extends Component {
  render() {
    return (
      <div className="signup-container">
        <div className="form-container">
          <form>
          <h2>Sign Up</h2>
          <div className="input-container">
          <label>Full name</label>
          <input
            name="name"
            type="text"
            aria-label="name"
            aria-required="true"
            required
            id="name" 
          />
          </div>
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
          <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
  )
  }
}