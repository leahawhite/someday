import React, { Component } from 'react';
import Button from '../Button/Button';
import Moment from 'react-moment';
import './note.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Note extends Component {
  
  render() {
    const { note, index, onEdit, onDelete, onArchive } = this.props
    const fave = note.favorite ? "fave-star" : "hidden"
    // let noteDate 
    // if (note.date_edited) {
    //   noteDate = note.date_edited 
    // } else {
    //   noteDate = note.date_created
    // }
    return (
      <div className="note">
        {/* <div className="note-favorite"> */}
          <FontAwesomeIcon className={fave} icon="star" size="lg" />
          <div className="note-buttons">
            <Button btnType="button" btnText="Edit" btnClass="note-btn" onClick={() => onEdit(note)}/>
            <Button btnType="button" btnText="Delete" btnClass="note-btn" onClick={() => onDelete(note.id)}/>
            <Button btnType="button" btnText="Archive" btnClass="note-btn" /*onClick={() => onArchive(note.id)}*//>
          </div>
        {/* </div> */}
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
          <Moment format="MM-DD-YYYY">{note.date_edited}</Moment>
        </div>
      </div>
    )
  }
}