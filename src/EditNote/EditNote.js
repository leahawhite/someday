import React, { Component } from 'react';
import Button from '../Button/Button';
import './editnote.css';

export default class EditNote extends Component {
  render() {
    return (
      <div class="item-content editable">
        <form>
          <div>
            <label>What?</label>
            <input placeholder="On Becoming a God in Central Florida"/>
          </div>
          <div>
            <label>Where can I find it?</label>
            <input placeholder="Showtime"/>
          </div>
          <div>
            <label>Who recommended it?</label>
            <input placeholder="Me"/>
          </div>
          <div>
            <label>Link</label>
            <input/>
          </div>
          <div>
            <label>Highlight?</label>
            <input type="checkbox" value="highlight" checked/>
          </div>
          <div>
            <label>Notes</label>
            <input type="textbox" placeholder="Kirsten Dunst pyramid scheme series"/>
          </div>
          <div class="button-container left">
            <Button btnType="button" btnText="Save" btnClass="edit-note-btn"/>
            <Button btnType="button" btnText="Cancel" btnClass="edit-note-btn"/>
          </div>
        </form>
      </div>
    )
  }
}