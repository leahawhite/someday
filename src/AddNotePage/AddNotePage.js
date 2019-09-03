import React, { Component } from 'react';
import SideNav from '../SideNav/SideNav';
import NoteForm from '../NoteForm/NoteForm';
import './addnotepage.css'

export default class AddNotePage extends Component {
  render () {
    return (
      <div className="row">
        <SideNav />
        <div className="add-item-form">
          <h2>Add New Item</h2>
          <NoteForm />
        </div>
      </div>
    )
  }
}