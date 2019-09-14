import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import EmptyFolder from '../EmptyFolder/EmptyFolder';
import Button from '../Button/Button';
import Note from '../Note/Note';
import NoteForm from '../NoteForm/NoteForm';
import NotesApiService from '../services/notes-api-service';
import './notespage.css';

class NotesPage extends Component {
  static defaultProps = {
    notes: []
  }
  
  constructor(props) {
    super(props)
    this.state = {
      sort: "",
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    NotesApiService.getNotes()
      .then(notes => {
        this.setState({
          notes,
          loading: false
        })
      })
      .catch(error => {
        this.setState({ error: error })
      })
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
      return (
        <div className="notelist-header">
          <h2>Get started by <Link to="/add-note">creating a new note.</Link></h2> 
        </div>
      )
    } else if (notes && notes.length && !selectedFolderId) {
      return (
        <div className="notelist-header">
          <h2>Select a category to see your notes.</h2> 
        </div>
      )
    } else if (selectedFolderId) {
      return (
        <div className="notelist-header">
          <h2 className="selectedFolder-title">{selectedFolder.text}</h2>
        </div>
      )
    }
  }

  renderNotes() {
    const { selectedFolderId, notes, folders, loading } = this.props
    const { editId, noteFolder, what, how, who, link, favorite, thoughts } = this.props
    const { handleNoteSubmit, handleNoteCancel, handleNoteEdit } = this.props
    const { handleChangeInput } = this.props
    const { handleNoteDelete, handleNoteArchive } = this.props
    const selectedFolder = folders && folders.length && folders.find(folder => folder.id === selectedFolderId)
    const results = notes && notes.length && notes.filter(note => note.folder === selectedFolderId)
    const noteList = results && results.length ? this.sortResults(results).map(note => {
      if (note.id === editId) {
        return <NoteForm 
                  key={note.id} 
                  note={note}
                  noteFolder={noteFolder}
                  what={what}
                  how={how}
                  who={who}
                  link={link}
                  favorite={favorite}
                  thoughts={thoughts}
                  changeInput={handleChangeInput}
                  onSubmit={handleNoteSubmit} 
                  onCancel={handleNoteCancel} 
                />
      } else {
        return <Note 
                  key={note.id} 
                  note={note} 
                  onEdit={handleNoteEdit} 
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
        {this.renderHeader()}
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