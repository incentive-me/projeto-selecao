import React from 'react';
import TextField from '@mui/material/TextField';

const Input = ({ label, type, value, onChange }) => {
  return (
    <TextField
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
