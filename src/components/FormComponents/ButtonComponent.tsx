import React from "react";
import { Button } from "@mui/material";

type ButtonFormProps = {
  onSubmit: () => void;
  value: string;
};

const ButtonFormComponent = ({ onSubmit, value }: ButtonFormProps) => {
  return (
    <Button variant="contained" color="primary" onClick={onSubmit}>
      {value}
    </Button>
  );
};

export default ButtonFormComponent;
