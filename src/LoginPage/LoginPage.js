import React, { Component } from 'react';
import TopNav from '../TopNav/TopNav';
import './loginpage.css'

export default class LoginPage extends Component {
  render() {
    return (
      <>
      <TopNav />
      <header>
        <a href='#'><h1>Someday</h1></a>
        <p>Bookmark the latest cultural hits so that you too can experience them -- someday.</p>
      </header>
      <div class="form-container">
        <form>
          <h2>Log In</h2>
          <div class="input-container">
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
          <div class="input-container">
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
      </>
    )
  }
}