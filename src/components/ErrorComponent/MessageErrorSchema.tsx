import React from "react";
import { Alert, AlertTitle } from "@mui/material";

const ErrorMessage = ({ message }: { message: string | undefined }) => {
  return (
    <Alert severity="error" style={{ marginTop: "5px" }}>
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
};

export default ErrorMessage;
