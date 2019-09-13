import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Button from '../Button/Button';
import './addnotepage.css'

export default class AddNotePage extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  }
  
  handleCancel = () => {
    this.props.history.push('/dashboard')
  }

  handleSubmit = e => {
    e.preventDefault()
    const { folder, what, how, who, link, favorite, thoughts } = e.target
    const newNote = {
      folder: folder.value,
      what: what.value,
      how: how.value,
      who: who.value,
      link: link.value,
      favorite: favorite.value,
      thoughts: thoughts.value
    }
    this.props.submitNewNote(newNote)
  }
  
  render () {
    const { toDashboard } = this.props
    const { error } = this.props
    if (toDashboard) {
      return <Redirect to="/dashboard" />
    }
    return (
      <section className="add-note">
        <div className="add-note-header">
          <h2>Add New Note</h2>
        </div>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <form className="note edit" onSubmit={e => this.handleSubmit(e)}>
          <div>
            <label htmlFor="folder">Category?</label>
            <select id="folder" name="folder" required>
              <option value="1">Watch</option>
              <option value="2">Read</option>
              <option value="3">Listen</option>
              <option value="4">Eat</option>
              <option value="5">Do</option>
              <option value="6">Go</option>
              <option value="7">Archive</option>
            </select>
          </div>
          <div>
            <label htmlFor="what">What?</label>
            <input id="what" type="text" name="what" required />
          </div>
          <div>
            <label htmlFor="how">Where can I find it?</label>
            <input id="how" type="text" name="how" />
          </div>
          <div>
            <label htmlFor="who">Who recommended it?</label>
            <input id="who" type="text" name="who" />
          </div>
          <div>
            <label htmlFor="link">Link</label>
            <input id="link" type="text" name="link" />
          </div>
          <div>
            <label htmlFor="favorite">Favorite?</label>
            <input id="favorite" type="checkbox" name="favorite" />
          </div>
          <div>
            <label htmlFor="thoughts">Notes</label>
            <textarea id="notes" rows="3" name="thoughts" />
          </div>
          <div className="addnote-buttons">
            <Button btnType="submit" btnText="Save" btnClass="note-btn"/>
            <Button btnType="button" btnText="Cancel" btnClass="note-btn" onClick={e => this.handleCancel(e)} />
          </div>
        </form>
      </section>
    )
  }
}