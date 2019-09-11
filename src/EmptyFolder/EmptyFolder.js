import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button/Button';
import './emptyfolder.css';

export default class EmptyFolder extends Component {
  render() {
    const { selectedFolder } = this.props
    return (
      <div className="no-notes">
        <div className="folder-icon">
          <FontAwesomeIcon icon={selectedFolder.icon} size="5x" />
        </div>
        <p className="no-notes-content">No {selectedFolder.text} notes yet</p>
        <Link to='/add-note'>
          <Button btnType="button" btnText="Add a Note" />
        </Link>
      </div>
    )
  }
}