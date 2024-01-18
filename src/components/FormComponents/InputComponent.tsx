import React from "react";
import { TextField } from "@mui/material";

type FormProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
};

const InputFormComponent = ({ value, onChange, name, label }: FormProps) => {
  return (
    <TextField
      variant="standard"
      label={label}
      value={value}
      onChange={onChange}
      name={name}
      fullWidth={true}
    />
  );
};

export default InputFormComponent;
