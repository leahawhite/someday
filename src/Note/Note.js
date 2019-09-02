import React, { Component } from 'react';
import Button from '../Button/Button';
import './note.css';

export default class Note extends Component {
  render() {
    const { note } = this.props
    return (
      <div className="item-content">
        <div className="button-container right">
          <Button btnType="button" btnText="Edit" btnClass="note-btn"/>
          <Button btnType="button" btnText="Delete" btnClass="note-btn"/>
          <Button btnType="button" btnText="Archive" btnClass="note-btn"/>
        </div>
        <div>
          <label>What?</label>
          <span>{note.what}</span>
        </div>
        <div>
          <label>Where can I find it?</label>
          <span>{note.where}</span>
        </div>
        <div>
          <label>Who recommended it?</label>
          <span>{note.who}</span>
        </div>
        <div>
          <label>Link</label>
          <a href={note.link}>{note.link}</a>
        </div>
        <div>
          <label>Notes</label>
          <span>{note.notes}</span>
        </div>
        <div>
          <label>Date created</label>
          {/* <p>{note.date_created}</p> */}
        </div>
      </div>
    )
  }
}