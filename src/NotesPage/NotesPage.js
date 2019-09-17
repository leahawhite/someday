import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import NotesContext from '../context/NotesContext';
import Spinner from '../Spinner/Spinner';
import EmptyFolder from '../EmptyFolder/EmptyFolder';
import Button from '../Button/Button';
import Note from '../Note/Note';
import NoteForm from '../NoteForm/NoteForm';
import NotesApiService from '../services/notes-api-service';
import './notespage.css';

class NotesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sort: 'date',
    }
  }

  static contextType = NotesContext

  componentDidMount() {
    this.context.clearError()
    NotesApiService.getNotes()
      .then(this.context.setNotes)
      .catch(this.context.setError)
  }

  handleDelete = id => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    NotesApiService.deleteNote(id)
      .then(this.context.deleteNote(id))
      .catch(this.context.setError)
  }

  handleArchive = async note => {
    await this.context.archiveNote(note)
    const { updatedNote } = this.context
    await NotesApiService.updateNote(updatedNote)
      .then(this.context.setUpdatedNote(updatedNote))
      .then(this.context.updateNotes(updatedNote))
      .catch(this.context.setError)
  }

  sortResults = results => {
    const { sort } = this.state
    if (sort) {
      if (sort === 'date') {
        results = results.sort((a,b) => (a.date_created < b.date_created) ? 1 : ((b.date_created < a.date_created) ? -1 : 0));
      } else if (sort === 'favorite') {
        results = results.sort((a,b) => b.favorite - a.favorite);
      }
    }
    return results
  }

  handleUpdateSort = sort => {
    this.setState({ sort })
  }

  renderHeader() {
    const { notes = [] } = this.context
    const { folders = [], selectedFolderId } = this.props
     const selectedFolder = folders && folders.length && folders.find(folder => folder.id === selectedFolderId)
    if (!notes.length) {
      return <h2>Get started by <Link to="/add-note">creating a new note.</Link></h2> 
    } else if (notes && notes.length && !selectedFolderId) {
        return <h2>Select a category to see your notes.</h2> 
      } else if (selectedFolderId) {
          return <h2 className="selectedFolder-title">{selectedFolder.text}</h2>
        }
  }

  renderNotes() {
    const { notes, editId } = this.context
    const { selectedFolderId, folders } = this.props
    const { loading } = this.props
    const selectedFolder = folders && folders.length && folders.find(folder => folder.id === selectedFolderId)
    const results = notes && notes.length && notes.filter(note => note.folder === selectedFolderId)
    const noteList = results && results.length ? this.sortResults(results).map(note => {
      if (note.id === editId) {
        return <NoteForm 
                  key={note.id} 
                  note={note}
                />
      } else {
        return <Note 
                  key={note.id} 
                  note={note}
                  onEdit={this.context.handleEdit}
                  onDelete={this.handleDelete}
                  onArchive={this.handleArchive} 
               />
      }
    }) : null 

    if (loading) {
      return <Spinner />
    } else if (selectedFolder && !noteList) {
      return <EmptyFolder selectedFolder={selectedFolder} />
    }
      else if (noteList && noteList.length) {
        return (
          <>  
            <form className="sort-results-form">
              <Button 
                btnClass="sort-results" 
                btnText="Most recent" 
                btnType="button" 
                btnId="date"
                onClick={() => this.handleUpdateSort("date")} 
              />
              <Button 
                btnClass="sort-results" 
                btnText="Favorites" 
                btnType="button" 
                id="favorite"
                onClick={() => this.handleUpdateSort("favorite")} 
              />
            </form>
            {noteList}
          </>
        )
      } 
  }

  render() {
    // const { error } = this.context
    return (
      <>
        <div className="notelist-header">
          {this.renderHeader()}
        </div>
        <div className="notelist">
          <div role="alert">
            {/* {error && <p className="error">{error}</p>} */}
          </div>
          {this.renderNotes()}
        </div>
      </>
    )
  }
}

export default withRouter(NotesPage)