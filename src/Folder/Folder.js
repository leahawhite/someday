import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './folder.css';

export default function Folder(props) {
  const { className, text, icon, folder, selectFolder } = props
  return (
    <li key={folder.id} className={className} onClick={() => {selectFolder(folder)}}>
      <div className="folder-icon">
        <FontAwesomeIcon icon={icon} size="lg" />
      </div>
      <span className="folder-text">{text}</span>
    </li>
  )
}