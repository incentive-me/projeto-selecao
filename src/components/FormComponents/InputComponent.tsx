import React from "react";
import { TextField } from "@mui/material";

type FormProps = {
  name: string;
  label: string;
  register: any;
};

const InputFormComponent = React.forwardRef<HTMLInputElement, FormProps>(
  ({ name, label, register, ...rest }, ref) => {
    return (
      <TextField
        variant="standard"
        label={label}
        name={name}
        fullWidth={true}
        inputRef={ref}
        type={label === "Senha" ? "password" : "text"}
        {...rest}
      />
    );
  }
);

export default InputFormComponent;
