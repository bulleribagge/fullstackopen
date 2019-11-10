import React from 'react';

const Input = ({ type, value, onChange }) => {
  return (
    <input type={type} value={value} onChange={(e) => onChange(e)}></input>
  );
};

export default Input;