import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

const HeaderTransactionComponent = ({ title }: { title: string }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ marginLeft: "180px" }}
        >
          {title}
        </Typography>
        <Button color="inherit">Criar</Button>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderTransactionComponent;
