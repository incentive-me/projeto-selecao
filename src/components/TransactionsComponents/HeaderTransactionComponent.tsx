import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ButtonComponentModal from "../ButtonComponentModal/ButtonComponentModal";
import BalanceFormComponent from "./CreateTransactionForm/CreateBalance";
import { createBalanceValues } from "@/@types/BalanceType";

const HeaderTransactionComponent = ({ title }: { title: string }) => {
  const onSubmit = (data:createBalanceValues) => {
    console.log(data);
  };
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
        <ButtonComponentModal>
          <BalanceFormComponent onSubmit={onSubmit} />
        </ButtonComponentModal>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderTransactionComponent;
