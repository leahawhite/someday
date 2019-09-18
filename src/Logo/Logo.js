import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './logo.css'

const Logo = props => {
  const { location } = props
  if (location.pathname.match('/')) {
    return null
  } else if (location.pathname.match('/login')) {
    return null
  }  
    return (
    <div className='logo'>
      <h1>
        <Link to='/dashboard'>Someday</Link>
      </h1>
    </div>
  )
}

export default withRouter(Logo)