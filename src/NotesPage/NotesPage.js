import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import EmptyFolder from '../EmptyFolder/EmptyFolder';
import Button from '../Button/Button';
import Note from '../Note/Note';
import NoteForm from '../NoteForm/NoteForm';
import './notespage.css';

export default class NotesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sort: ""
    }
  }
    
  sortResults = results => {
    const { sort } = this.state
    if (sort) {
      if (sort === 'date') {
        results = results.sort((a,b) => (a.date_created < b.date_created) ? 1 : ((b.date_created < a.date_created) ? -1 : 0));
      } else if (sort === 'highlighted') {
        // TODO: this boolean sort doesn't work
        results = results.sort((a,b) => (a.highlighted === b.highlighted) ? 0 : a.highlighted ? -1 : 1);
      }
    }
    return results
  }

  handleUpdateSort = sort => {
    this.setState({
      sort: sort
    }, () => console.log(this.state.sort))
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
          <h2>Choose a folder to see your notes.</h2> 
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
    const { selectedFolderId, onFolderSelect, notes, folders, loading } = this.props
    const { editId, noteFolder, what, how, who, link, highlight, thoughts } = this.props
    const { selectedNote, updatedNote, handleUpdateSort, handleNoteSelect, handleNoteSubmit, handleNoteCancel, handleNoteEdit } = this.props
    const { handleChangeInput } = this.props
    const { handleChangeNotes, updateNotes, handleNoteDelete, handleNoteArchive } = this.props
    const selectedFolder = folders && folders.length && folders.find(folder => folder.id === selectedFolderId)
    const results = notes && notes.length && notes.filter(note => note.folder === selectedFolderId)
    const noteList = results && results.length ? this.sortResults(results).map((note, index) => {
      if (note.id === editId) {
        return <NoteForm 
                  key={index} 
                  note={note}
                  noteFolder={noteFolder}
                  what={what}
                  how={how}
                  who={who}
                  link={link}
                  highlight={highlight}
                  thoughts={thoughts}
                  changeInput={handleChangeInput}
                  onSubmit={handleNoteSubmit} 
                  onCancel={handleNoteCancel} 
                />
      } else {
        return <Note 
                  key={index} 
                  index={index} 
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
                btnText="Highlighted" 
                btnType="button" 
                id="highlighted"
                onClick={() => this.handleUpdateSort("highlighted")} 
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
        <section className="notes-header">
          {this.renderHeader()}
        </section>
        <section className="notes-content">
          <div className="notelist">
            <div role="alert">
              {error && <p className="error">{error}</p>}
            </div>
            {this.renderNotes()}
          </div>
        </section>
      </>
    )
  }
}