import React, { Component } from 'react';
import './topnav.css'

export default class TopNav extends Component {

  // links on right-hand side: Add New Item, Log In, Log Out, Sign Up
  // links on left-hand side: Someday
  render() {
    return (
      <header role="banner">
        <h1>
          <a href="#">Someday</a>
        </h1>
        <nav role="navigation">
          <div>
            <a href="#">
              ADD NEW ITEM
            </a>
            <a href="#">
              LOG OUT
            </a>
          </div>
        </nav>
      </header>
    )
  }
}