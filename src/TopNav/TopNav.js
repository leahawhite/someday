import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './topnav.css'

export default class TopNav extends Component {

  renderLogoutLink() {
    const { onLogout } = this.props
    return (
      <nav className="TopNav_logged-in" role="navigation">
        {/* <Link
          className="topnavlink left" 
          to='/dashboard'>
          DASHBOARD
        </Link> */}
        <Link
          className="topnavlink" 
          to='/add-note'>
          ADD NOTE
        </Link>
        <Link
          className="topnavlink right" 
          onClick={onLogout}
          to='/'>
          LOGOUT
        </Link>
      </nav>
    )
  }
  
  renderLoginLink() {
    return (
      <nav className="TopNav_not-logged-in" role="navigation">
        <div className="TopNav_not-logged-in links">
          {/* <NavLink className="navlink-left" to="/login" isActive={this.loginMenu} activeClassName="hidden">
            LOG IN
          </NavLink> */}
          <NavLink className="navlink-right" to="/signup" isActive={this.loginMenu} activeClassName="hidden">
            SIGN UP
          </NavLink>
        </div>
      </nav>
    )
  }
  
  render() {
    const { loggedIn } = this.props
    return (
      <header className="Topnav" role="banner">
        {/* don't want it to appear on '/', '/login' or '/signup' */}
        <h1>
          <Link to='/dashboard'>Someday</Link>
        </h1>
        {loggedIn
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    )
  }
}

