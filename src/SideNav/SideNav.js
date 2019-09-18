import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import classnames from 'classnames';
import Folder from '../Folder/Folder';
import PropTypes from 'prop-types';
import './sidenav.css'

class SideNav extends Component {
  static defaultProps = {
    folders: [],
    onFolderSelect: () => {},
    location: {
      pathname: '',
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      selected: null,
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
    const { folders=[] } = this.props
    const folderList = folders.map((folder) => {
    const isSelected = folder === this.state.selected
    const folderClassName = classnames('folder', {
      active: isSelected
    })
    if (this.props.location.pathname === '/add-note') {
      return (
        <Link key={folder.id} to="/dashboard">
          <Folder
            key={folder.id}
            folder={folder}
            className={folderClassName}
            text={folder.text}
            icon={folder.icon}
            selectFolder={this.selectFolder}
          />
        </Link>
      )
    }
      return (
        <Folder
          key={folder.id}
          folder={folder}
          className={folderClassName}
          text={folder.text}
          icon={folder.icon}
          selectFolder={this.selectFolder}
        />
      )
    })

    return (
      <>
      <nav className="folder-list-nav">
        <ul className="folder-list">
          {folderList}
        </ul>
      </nav>
      </>
    )
  }
}

export default withRouter(SideNav)

SideNav.propTypes = {
  folders: PropTypes.array.isRequired,
  onFolderSelect: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired
}