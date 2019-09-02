import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './folder.css';

export default function Folder(props) {
  const { index, className, text, icon, folder, selectFolder } = props
  return (
    <li key={index} className={className} onClick={e => {selectFolder(folder)}}>
      <div className="folder-contents" key={index} >
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