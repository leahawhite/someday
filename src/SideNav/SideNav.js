import React, { Component } from 'react';
import Folder from '../Folder/Folder';
import store from '../store';
import './sidenav.css'

export default class SideNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }
  selectFolder = folder => {
    console.log('folder selected', folder)
    this.setState({
      selected: folder
    }, () => {
      this.props.onFolderSelect(folder.id)
    })
  }
  render() {
    const folderList = store.folders.map((folder, i) => {
      const isSelected = folder === this.state.selected
      return (
        <Folder
          key={folder.id}
          index={i}
          folder={folder}
          className={`folder ${isSelected ? 'active' : ''}`}
          text={folder.text}
          icon={folder.icon}
          selectFolder={this.selectFolder}
        />
      )
    })

    return (
      <nav className="folder-list-nav">
        <ul className="folder-list">
          {folderList}
        </ul>
      </nav>
    )
  }
}