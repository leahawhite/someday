import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button/Button';
import './emptyfolder.css';

export default class EmptyFolder extends Component {
  static defaultProps = {
    selectedFolder: {}
  }
  
  render() {
    const { selectedFolder } = this.props
    return (
      <div className="no-notes">
        <div className="no-notes-icon">
          <FontAwesomeIcon icon={selectedFolder.icon} size="3x" />
        </div>
        <p className="no-notes-content">No notes yet</p>
        <Link to='/add-note'>
          <Button btnType="button" btnText="Add a Note" />
        </Link>
      </div>
    )
  }
}