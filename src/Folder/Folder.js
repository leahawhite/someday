import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
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

Folder.defaultProps = {
  folder: {},
  icon: '',
  className: '',
  text: '',
  selectFolder: () => {}
}

Folder.propTypes = {
  folder: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  selectFolder: PropTypes.func.isRequired
}