import React from "react";
import { Button } from "@mui/material";

type ButtonFormProps = {
  value: string;
};

const ButtonFormComponent = ({ value }: ButtonFormProps) => {
  return (
    <Button variant="contained" color="primary" type="submit">
      {value}
    </Button>
  );
};

export default ButtonFormComponent;
