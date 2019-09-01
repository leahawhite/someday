import React from 'react';
import './button.css';

export default function Button(props) {
  return (
    <button type={props.btnType} className={props.btnClass}>
      <span>{props.btnText}</span>
    </button>
  )
}