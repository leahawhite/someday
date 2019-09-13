import React, { Component } from 'react';
import Button from '../Button/Button';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './note.css';

export default class Note extends Component {
  static defaultProps = {
    note: {}
  }

  renderDate = () => {
    const { note } = this.props
    let noteDate 
    if (note.date_edited) {
      noteDate = note.date_edited 
    } else {
      noteDate = note.date_created
    }
    return noteDate
  }
  
  render() {
    const { note, onEdit, onDelete, onArchive } = this.props
    const fave = note.favorite ? "fave" : "not-fave"
    
    return (
      <div className="note">
        <div className="fave-container">
          <div className="star-container">
            <FontAwesomeIcon className={fave} icon="star" size="lg" />
          </div>
          <div className="note-buttons">
            <Button btnType="button" btnText="Edit" btnClass="note-btn" onClick={() => onEdit(note)}/>
            <Button btnType="button" btnText="Delete" btnClass="note-btn" onClick={() => onDelete(note.id)}/>
            <Button btnType="button" btnText="Archive" btnClass="note-btn" onClick={() => onArchive(note)}/>
          </div>
        </div>
        <div>
          <label>What?</label>
          <span>{note.what}</span>
        </div>
        <div>
          <label>Where can I find it?</label>
          <span>{note.how}</span>
        </div>
        <div>
          <label>Who recommended it?</label>
          <span>{note.who}</span>
        </div>
        <div>
          <label>Link</label>
          <a href={note.link} rel="noopener noreferrer" target="_blank">{note.link}</a>
        </div>
        <div>
          <label>Notes</label>
          <span>{note.thoughts}</span>
        </div>
        <div>
          <label>Last edited</label>
          <Moment format="MM-DD-YYYY">{this.renderDate()}</Moment>
        </div>
      </div>
    )
  }
}