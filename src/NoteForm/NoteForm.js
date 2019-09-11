import React, { Component } from 'react';
import Button from '../Button/Button';
import './noteform.css'

export default class NoteForm extends Component {
  
  render() {
    const { onSubmit, onCancel } = this.props
    const { changeFolder, changeWhat, changeHow, changeWho, changeLink, changeHighlight, changeNotes } = this.props
    const { noteFolder="", what="", how="", who="", link="", highlight="", thoughts="" } = this.props
    
    return (
      <form className="note edit" onSubmit={(e) => onSubmit(e)}>
        <div>
          <label htmlFor="folder">Category?</label>
          <select id="folder" value={noteFolder} onChange={changeFolder}>
            <option value="1">Watch</option>
            <option value="2">Read</option>
            <option value="3">Listen</option>
            <option value="4">Do</option>
            <option value="5">Eat</option>
            <option value="6">Go</option>
            <option value="7">Archive</option>
          </select>
        </div>
        <div>
          <label htmlFor="what">What?</label>
          <input id="what" type="text" name="what" value={what} onChange={changeWhat} />
        </div>
        <div>
          <label htmlFor="how">Where can I find it?</label>
          <input id="how" type="text" name="how" value={how} onChange={changeHow}/>
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
          <label className="highlight" htmlFor="highlight">Highlight?
            <input id="highlight" type="checkbox" name="highlight" value={highlight} onChange={changeHighlight} />
          </label>
        </div>
        <div>
          <label htmlFor="thoughts">Notes</label>
          <textarea id="notes" rows="3" name="thoughts" value={thoughts} onChange={changeNotes} />
        </div>
        <div className="noteform-buttons">
          <Button btnType="submit" btnText="Save" btnClass="note-btn" />
          <Button btnType="button" btnText="Cancel" btnClass="note-btn" onClick={() => onCancel} />
        </div>
      </form>
    )
  }
}