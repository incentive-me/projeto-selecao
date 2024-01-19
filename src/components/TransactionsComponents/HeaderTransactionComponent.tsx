import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

const HeaderTransactionComponent = ({ title }: { title: string }) => {
  return (
    <AppBar position="static" style={{ backgroundColor: "white" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          color={"black"}
        >
          {title}
        </Typography>
        <Button color="primary" variant="contained">
          Criar
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderTransactionComponent;
