import React, { Component } from 'react';
import Button from '../Button/Button';
import './noteform.css'

export default class NoteForm extends Component {

  render() {
    const { onSubmit, onCancel, changeInput } = this.props
    const { noteFolder="", what="", how="", who="", link="", favorite="", thoughts="" } = this.props
    
    return (
      <form className="note edit" onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="folder">Category?</label>
        <select id="folder" name="noteFolder" value={noteFolder} onChange={(e) => changeInput(e)}>
          <option value="1">Watch</option>
          <option value="2">Read</option>
          <option value="3">Listen</option>
          <option value="4">Eat</option>
          <option value="5">Do</option>
          <option value="6">Go</option>
          <option value="7">Archive</option>
        </select>
        <label htmlFor="what">What?</label>
        <input id="what" type="text" name="what" value={what} onChange={(e) => changeInput(e)} />
        <label htmlFor="how">Where can I find it?</label>
        <input id="how" type="text" name="how" value={how} onChange={(e) => changeInput(e)}/>
        <label htmlFor="who">Who recommended it?</label>
        <input id="who" type="text" name="who" value={who} onChange={e => changeInput(e)} />
        <label htmlFor="link">Link</label>
        <input id="link" type="text" name="link" value={link} onChange={e => changeInput(e)} />
        <p>Favorite?</p>   
        <label className="switch" htmlFor="favorite">
          <input 
            id="favorite" 
            type="checkbox" 
            name="favorite" 
            value={favorite}
            checked={favorite}
            onChange={e => changeInput(e)} 
            />
          <span className="slider round"></span>
        </label>
        <div>
        <label htmlFor="thoughts">Notes</label>
        <textarea id="notes" rows="3" name="thoughts" value={thoughts} onChange={e => changeInput(e)} />
        </div>
        <div className="noteform-buttons">
          <Button btnType="submit" btnText="Save" btnClass="note-btn" />
          <Button btnType="button" btnText="Cancel" btnClass="note-btn" onClick={e => onCancel(e)} />
        </div>
      </form>
    )
  }
}