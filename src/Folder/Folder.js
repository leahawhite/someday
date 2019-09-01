import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './folder.css';

export default function Folder(props) {
  const { index, className, text, icon, selectFolder } = props
  return (
    <li key={index} className={className}>
      <div className="folder-contents" key={index} onClick={e => {selectFolder(e)}}>
        <div className="folder-icon">
          <FontAwesomeIcon icon={icon} size="lg" />
        </div>
        <div className="folder-text">
          <span className="folder-text">{text}</span>
        </div>
      </div>
    </li>
  )
}