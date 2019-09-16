import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import './topnav.css'

class TopNav extends Component {
  static defaultProps = {
    onLogout: () => {},
    loggedIn: Boolean
  }

  renderLogoutLink() {
    const { onLogout } = this.props
    return (
      <nav className="TopNav_logged-in" role="navigation">
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

export default withRouter(TopNav)