import React, { Component } from 'react';
import Button from '../Button/Button';
import './note.css';

export default class Note extends Component {
  render() {
    return (
      <div className="item-content">
        <div className="button-container right">
          <Button btnType="button" btnText="Edit" btnClass="note-btn"/>
          <Button btnType="button" btnText="Delete" btnClass="note-btn"/>
          <Button btnType="button" btnText="Archive" btnClass="note-btn"/>
        </div>
        <div>
          <label>What?</label>
          <span>Los Espookys</span>
        </div>
        <div>
          <label>Where can I find it?</label>
          <span>HBO</span>
        </div>
        <div>
          <label>Who recommended it?</label>
          <span>Me!</span>
        </div>
        <div>
          <label>Link</label>
          <a href="https://www.hbo.com/los-espookys">https://www.hbo.com/los-espookys</a>
        </div>
        <div>
          <label>Notes</label>
          <span>Julio Torres! Looks promising, but the subtitles were quick!</span>
        </div>
        <div>
          <p>Edited Aug 25 2019</p>
        </div>
      </div>
    )
  }
}