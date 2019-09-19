import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './spinner.css';

export default () => 
  <div className="spinner">
    <FontAwesomeIcon icon="spinner" size="5x" spin/>
  </div>