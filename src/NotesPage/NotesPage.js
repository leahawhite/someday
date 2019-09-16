import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import EmptyFolder from '../EmptyFolder/EmptyFolder';
import Button from '../Button/Button';
import Note from '../Note/Note';
import NoteForm from '../NoteForm/NoteForm';
import './notespage.css';

class NotesPage extends Component {
  static defaultProps = {
    notes: []
  }
  
  constructor(props) {
    super(props)
    this.state = {
      sort: 'date',
    }
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
    const { notes, folders, selectedFolderId } = this.props
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
    const { selectedFolderId, notes, folders, loading, editId, updatedNote } = this.props
    const { handleNoteSubmit, handleNoteCancel, setInitialNote, handleChangeInput } = this.props
    const { handleNoteDelete, handleNoteArchive } = this.props
    const selectedFolder = folders && folders.length && folders.find(folder => folder.id === selectedFolderId)
    const results = notes && notes.length && notes.filter(note => note.folder === selectedFolderId)
    const noteList = results && results.length ? this.sortResults(results).map(note => {
      if (note.id === editId) {
        return <NoteForm 
                  key={note.id} 
                  note={note}
                  updatedNote={updatedNote}
                  changeInput={handleChangeInput}
                  onSubmit={handleNoteSubmit} 
                  onCancel={handleNoteCancel} 
                />
      } else {
        return <Note 
                  key={note.id} 
                  note={note} 
                  onEdit={setInitialNote} 
                  onDelete={handleNoteDelete}
                  onArchive={handleNoteArchive} 
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
    const { error } = this.props
    return (
      <>
        <div className="notelist-header">
          {this.renderHeader()}
        </div>
        <div className="notelist">
          <div role="alert">
            {error && <p className="error">{error}</p>}
          </div>
          {this.renderNotes()}
        </div>
      </>
    )
  }
}

export default withRouter(NotesPage)