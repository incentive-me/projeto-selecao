import React from "react";
import { Button, ButtonProps } from "@mui/material";

type ButtonFormProps = {
  value: string;
  disabled?: boolean;
} & ButtonProps;

const ButtonFormComponent = ({ value, ...rest }: ButtonFormProps) => {
  return (
    <Button variant="contained" color="primary" type="submit" {...rest}>
      {value}
    </Button>
  );
};

export default ButtonFormComponent;
