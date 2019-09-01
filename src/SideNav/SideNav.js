import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { slide as Menu } from 'react-burger-menu';
import store from '../store';
import './sidenav.css'

export default class SideNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }
  showSettings = event => {
    event.preventDefault();
  }
  selectFolder = folder => {
    this.setState({
      selected: folder
    })
  }
  render() {
    const folderList = store.folders.map((folder, i) => {
      const isSelected = folder === this.state.selected
      return (
        <li key={i} className={`menu-item ${isSelected ? 'active' : ''}`}>
          <div className="folder-contents" key={i} onClick={e => {this.selectFolder(e)}}>
            <div className="folder-icon">
              <FontAwesomeIcon icon={folder.icon} size="lg" />
            </div>
            <div className="folder-text">
              <span className="folder-text">{folder.text}</span>
            </div>
          </div>
        </li>
      )
    })

    return (
      <Menu>
        {folderList}
      </Menu>
    )
  }
}