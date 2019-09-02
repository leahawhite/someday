import React, { Component } from 'react';
import SideNav from '../SideNav/SideNav';
import './addnotepage.css'

export default class AddNotePage extends Component {
  render () {
    return (
      <>
      <div className="row">
        <SideNav />
        <div className="add-item-form">
          <h2>Add New Item</h2>
          <form>
            <div>
              <label>Category?</label>
              <select>
                <option>Watch</option>
                <option>Read</option>
                <option>Listen</option>
                <option>Do</option>
                <option>Eat</option>
                <option>Go</option>
              </select>
            </div>
            <div>
              <label>What?</label>
              <input/>
            </div>
            <div>
              <label>Where can I find it?</label>
              <input/>
            </div>
            <div>
              <label>Who recommended it?</label>
              <input/>
            </div>
            <div>
              <label>Link</label>
              <input/>
            </div>
            <div>
              <label>Highlight?</label>
              <input type="checkbox" value="highlight"/>
            </div>
            <div>
              <label>Notes</label>
              <input type="textbox"/>
            </div>
            <div className="button-container">
              <button type="button">Submit</button>
              <button type="button">Cancel</button>
            </div>
          </form>
        </div>
        </div>
      </>
    )
  }
}