import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './addnotepage.css'

export default class AddNotePage extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }
  state = {
    error: null
  }
  
  handleCancel = () => {
    this.props.history.push('/dashboard')
  }
  
  handleSubmit = e => {
    e.preventDefault()
    const { folder, what, how, who, link, highlight, thoughts } = e.target
    const newNote = {
      folder: folder.value,
      what: what.value,
      how: how.value,
      who: who.value,
      link: link.value,
      highlight: highlight.value,
      thoughts: thoughts.value
    }
    this.setState({ error: null })
    // post to API
    // update notes in state (how to do this without notes and methods in Context?)
    this.props.history.push('/dashboard')
  }
  // do I need a "Are you sure you want to navigate away?" prompt when sidenav is clicked here?
  render () {
    
    return (
      <section className="item-list">
        <h2>Add New Note</h2>
        <form className="note-content" onSubmit={e => this.handleSubmit(e)}>
          <div>
            <label htmlFor="folder">Category?</label>
            <select id="folder">
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
            <input id="what" type="text" name="what" />
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
            <label htmlFor="highlight">Highlight?</label>
            <input id="highlight" type="checkbox" name="highlight" />
          </div>
          <div>
            <label htmlFor="thoughts">Notes</label>
            <textarea id="notes" rows="2" name="thoughts" />
          </div>
          <div className="button-container">
            <Button btnType="submit" btnText="Save" btnClass="note-btn"/>
            <Button btnType="button" btnText="Cancel" btnClass="note-btn" onClick={e => this.handleCancel(e)} />
          </div>
        </form>
      </section>
    )
  }
}