import React from 'react';
import './button.css';

export default function Button(props) {
  return (
    <button 
      type={props.btnType} 
      className={props.btnClass} 
      onClick={props.onClick} 
      onSubmit={props.onSubmit}
      id={props.btnId}
    >
      <span>{props.btnText}</span>
    </button>
  )
}