import React from 'react';
import './alert.css';

const Alert = ({ alert }) => {
  return (
    <div className={`${alert.error ? 'red-gradient' : ''}`}>{alert.msg}</div>
  );
};

export default Alert;
