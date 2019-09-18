import React from 'react';
import PropTypes from 'prop-types';
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


Button.defaultProps = {
  btnType: '',
  btnClass: '',
  btnonClick: () => {},
  btnonSubmit: () => {},
  btnId: '',
  btnText: '',
}

Button.propTypes = {
  btnType: PropTypes.string,
  btnClass: PropTypes.string,
  btnonClick: PropTypes.func,
  btnonSubmit: PropTypes.func,
  btnId: PropTypes.string,
  btnText: PropTypes.string,
}

