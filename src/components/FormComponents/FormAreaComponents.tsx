import { Box } from "@mui/material";
import React from "react";

type FormAreaComponentsProps = {
  children: React.ReactNode;
};

const FormAreaComponents = ({ children }: FormAreaComponentsProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      gap={2}
    >
      {children}
    </Box>
  );
};

export default FormAreaComponents;
