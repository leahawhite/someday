import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import NotesContext from '../context/NotesContext';
import Button from '../Button/Button';
import NotesApiService from '../services/notes-api-service';
import './addnotepage.css'

class AddNotePage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  static contextType = NotesContext
  
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
    this.setState({ loading: true })
    NotesApiService.insertNote(newNote)
      .then(this.context.addNewNote)
      .then(() => {
        folder.value = ''
        what.value = ''
        how.value = ''
        who.value = ''
        link.value = ''
        favorite.value = ''
        thoughts.value = ''
      })
      .then(() => {
        this.setState({
          loading: false,
        }, () => {
          this.props.history.push('/dashboard')
        })
      })
      .catch(this.context.setError)
      
  }

  render () {
    const { loading } = this.props
    const { error } = this.context
    console.log('AddNotePage error', error)
    if (loading) {
      return <Spinner />
    }
    return (
      <section className="add-note">
        <div className="add-note-header">
          <h2>Add New Note</h2>
        </div>
        <div role='alert'>
          {/* {error && <p className='error'>{error}</p>} */}
        </div>
        <form className="note edit" onSubmit={this.handleSubmit}>
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
            <label htmlFor="what">What?</label>
            <input id="what" type="text" name="what" required />
            <label htmlFor="how">Where can I find it?</label>
            <input id="how" type="text" name="how" />
            <label htmlFor="who">Who recommended it?</label>
            <input id="who" type="text" name="who" />
            <label htmlFor="link">Link</label>
            <input id="link" type="text" name="link" />
            <p>Favorite?</p>   
            <label className="switch" htmlFor="favorite">
              <input id="favorite" type="checkbox" name="favorite" />
              <span className="slider round"></span>
            </label>
          <div>
            <label htmlFor="thoughts">Notes</label>
            <textarea id="notes" rows="3" name="thoughts" />
          </div>
          <div className="addnote-buttons">
            <Button btnType="submit" btnText="Save" btnClass="note-btn"/>
            <Button btnType="button" btnText="Cancel" btnClass="note-btn" onClick={this.handleCancel} />
          </div>
        </form>
      </section>
    )
  }
}

export default withRouter(AddNotePage)