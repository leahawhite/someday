import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Folder from '../Folder/Folder';
import './sidenav.css'

class SideNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }
  selectFolder = folder => {
    this.setState({
      selected: folder
    }, () => {
      this.props.onFolderSelect(folder.id)
    })
  }
  render() {
    const { folders } = this.props
    const folderList = folders.map((folder, i) => {
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

export default withRouter(SideNav)