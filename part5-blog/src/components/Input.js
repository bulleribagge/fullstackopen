import React from 'react';
import { TextField } from '@material-ui/core';

const Input = ({ type, value, onChange, label }) => {
  return (
    <TextField label={label} type={type} value={value} onChange={(e) => onChange(e)}></TextField>
  );
};

export default Input;