import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';
import Spinner from '../Spinner/Spinner';
import NoteList from '../NoteList/NoteList';
import store from '../store';
import './notespage.css';

export default class NotesPage extends Component {
  state = {
    notes: [],
    loading: false,
    selectedFolderId: null,
    sort: null,
  }

  componentDidMount() {
    this.setState({
      notes: store.notes
    })
  }
  onFolderSelect = folderId => {
    this.setState({
      selectedFolderId: folderId
    })
  }
  handleUpdateSort = e => {
    this.setState({
      sort: e.target.value
    })
  }
  sortResults = results => {
    const { sort } = this.state
    if (sort) {
      if (sort === 'date') {
        results = results.sort((a,b) => (a.date_created < b.date_created) ? 1 : ((b.date_created < a.date_created) ? -1 : 0));
      } else if (sort === 'highlighted') {
        // this code doesn't work
        results = results.sort((a,b) => (a.highlighted === b.highlighted) ? 0 : a.highlighted ? -1 : 1);
      }
    }
    return results
  }

  renderNoteList() {
    const { notes, loading, selectedFolderId } = this.state
    const results = notes.filter(note => note.folder === selectedFolderId)
    const noteList = results && results.length ? this.sortResults(results): null 
    if (loading) {
      return <Spinner />
    } else if (noteList && noteList.length) {
        return (
          <>  
            <form className="sort-results-form">
              <label className="sort-results" htmlFor="sort-results">Sort by:</label>
              <select 
                className="sort-select" 
                type="text" 
                id="sort-results"
                name="sort"
                value={this.state.value}
                onChange={e => this.handleUpdateSort(e)} 
              >
                <option name="sort" value="date">Most recent</option>
                <option name="sort" value="highlighted">Highlighted</option>
              </select>
            </form>
            <NoteList notes={noteList} />
          </>
        )
      } else {
        // return null? or else this pops on the screen first thing
          return (
            <section className="item-list">
              <p>Navigate the folders to see your items or <Link to="/add-note">Create a New Item.</Link></p> 
            </section>
          )
        }
  }

  render() {
    const { error } = this.state
    return (
      <div className="row">
        <SideNav onFolderSelect={this.onFolderSelect}/>
        <section className="item-list">
          <div role="alert">
            {error && <p className="error">{error}</p>}
          </div>
          {this.renderNoteList()}
        </section>
      </div>
    )
  }
}