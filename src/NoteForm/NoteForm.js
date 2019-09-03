import React, { Component } from 'react';
import Button from '../Button/Button';
import './noteform.css'

export default class NoteForm extends Component {
  
  render() {
    const { onSubmit, onCancel } = this.props
    const { changeFolder, changeWhat, changeWhere, changeWho, changeLink, changeHighlight, changeNotes } = this.props
    const { folder="", what="", where="", who="", link="", highlight="", noteNotes="" } = this.props
    
    return (
      <form className="note-content" onSubmit={(e) => onSubmit(e)}>
        <div>
          <label htmlFor="folder">Category?</label>
          <select id="folder" value={folder} onChange={changeFolder}>
            <option value="1">Watch</option>
            <option value="2">Read</option>
            <option value="3">Listen</option>
            <option value="4">Do</option>
            <option value="5">Eat</option>
            <option value="6">Go</option>
          </select>
        </div>
        <div>
          <label htmlFor="what">What?</label>
          <input id="what" type="text" name="what" value={what} onChange={changeWhat} />
        </div>
        <div>
          <label htmlFor="where">Where can I find it?</label>
          <input id="where" type="text" name="where" value={where} onChange={changeWhere}/>
        </div>
        <div>
          <label htmlFor="who">Who recommended it?</label>
          <input id="who" type="text" name="who" value={who} onChange={changeWho} />
        </div>
        <div>
          <label htmlFor="link">Link</label>
          <input id="link" type="text" name="link" value={link} onChange={changeLink} />
        </div>
        <div>
          <label htmlFor="highlight">Highlight?</label>
          <input id="highlight" type="checkbox" name="highlight" value={highlight} onChange={changeHighlight} />
        </div>
        <div>
          <label htmlFor="noteNotes">Notes</label>
          <textarea id="notes" rows="2" name="noteNotes" value={noteNotes} onChange={changeNotes} />
        </div>
        <div className="button-container">
          <Button btnType="submit" btnText="Save" btnClass="note-btn"/>
          <Button btnType="button" btnText="Cancel" btnClass="note-btn" onClick={() => onCancel} />
        </div>
      </form>
    )
  }
}