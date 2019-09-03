import React, { Component } from 'react';
import Button from '../Button/Button';
import './noteform.css'

export default class NoteForm extends Component {
  state = {
    category: this.props.note.folder || "", 
    what: this.props.note.what || "",
    where: this.props.note.where || "",
    who: this.props.note.who || "",
    link: this.props.note.link || "",
    highlight: this.props.note.highlight || "",
    notes: this.props.note.notes | "", 
  }
  handleChangeCategory = e => {
    this.setState({ category: e.target.value })
  }
  handleChangeWhat = e => {
    this.setState({ what: e.target.value })
  }
  handleChangeWhere = e => {
    this.setState({ where: e.target.value })
  }
  handleChangeWho = e => {
    this.setState({ who: e.target.value })
  }
  handleChangeLink = e => {
    this.setState({ link: e.target.value })
  }
  handleChangeHighlight = e => {
    this.setState({ highlight: e.target.value })
  }
  handleChangeNotes = e => {
    this.setState({ notes: e.target.value })
  }
  render() {
    const { note, index, onSubmit, onCancel } = this.props
    const { what, where, who, link, highlight, notes } = this.state
    
    return (
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label htmlFor="category">Category?</label>
          <select id="category">
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
          <input id="what" type="text" name="what" value={what} onChange={this.handleChangeWhat} />
        </div>
        <div>
          <label htmlFor="where">Where can I find it?</label>
          <input id="where" type="text" name="where" value={where} onChange={this.handleChangeWhere}/>
        </div>
        <div>
          <label htmlFor="who">Who recommended it?</label>
          <input id="who" type="text" name="who" value={who} onChange={this.handleChangeWho} />
        </div>
        <div>
          <label htmlFor="link">Link</label>
          <input id="link" type="text" name="link" value={link} onChange={this.handleChangeLink} />
        </div>
        <div>
          <label htmlFor="highlight">Highlight?</label>
          <input id="highlight" type="checkbox" name="highlight" value={highlight} onChange={this.handleChangeHighlight} />
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <textbox id="notes" rows="2" name="notes" value={notes} onChange={this.handleChangeNotes} />
        </div>
        <div className="button-container">
          <Button btnType="submit" btnText="Save" btnClass="note-btn"/>
          <Button btnType="button" btnText="Cancel" btnClass="note-btn" onClick={() => onCancel} />
        </div>
      </form>
    )
  }
}