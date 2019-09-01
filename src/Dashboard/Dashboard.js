import React, { Component } from 'react';
import TopNav from '../TopNav/TopNav';
import SideNav from '../SideNav/SideNav';
import Note from '../Note/Note';
import './dashboard.css';

export default class Dashboard extends Component {
  render() {
    return (
      <>
      <TopNav />
      <SideNav />
      <section class="item-list">
        <div>
          <form class="sort-results-form">
            <label class="sort-results" htmlFor="sort-results">Sort by:</label>
            <select 
              class="sort-select" 
              type="text" 
              id="sort-results"
              name="sort" 
            >
              <option name="sort">Most recent</option>
              <option name="sort">Highlighted</option>
            </select>
          </form>
          <Note />
        </div>
      </section>
      </>
    )
  }
}