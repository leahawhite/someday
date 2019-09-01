import React, { Component } from 'react';
import './sidenav.css'

export default class SideNav extends Component {
  render() {
    return (
      <nav className="folder-list-nav">
        <ul className="folder-list">
          <a href="#"><li className="folder" id="first">Watch</li></a>
          <a href="#"><li className="folder">Read</li></a>
          <a href="#"><li className="folder">Listen</li></a>
          <a href="#"><li className="folder">Eat</li></a>
          <a href="#"><li className="folder">Do</li></a>
          <a href="#"><li className="folder">Go</li></a>
          <a href="#"><li className="folder">Archives</li></a>
        </ul>
      </nav>
    )
  }
}