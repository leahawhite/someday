import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './topnav.css'

class TopNav extends Component {
  static defaultProps = {
    onLogout: () => {},
    loggedIn: Boolean
  }

  renderLogoutLink() {
    const { onLogout } = this.props
    return (
      <nav aria-label="Topnav logged-in" role="navigation">
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
      <nav aria-label="Topnav not-logged-in"  role="navigation">
        <div>
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

TopNav.propTypes = {
  onLogout: PropTypes.func.isRequired,
  loggedIn: PropTypes.func
}