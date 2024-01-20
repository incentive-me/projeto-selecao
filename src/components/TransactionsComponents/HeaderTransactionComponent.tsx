import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ButtonComponentModal from "../ButtonComponentModal/ButtonComponentModal";
import { balanceValuesDefault } from "@/@types/BalanceType";
import { createBalance } from "@/services/BalanceFetch";
import StarIcon from "../IconsComponents/StartIcon";
import BalanceFormComponent from "./CreateBalanceForm/CreateBalance";

type headerTransactionProps = {
  title: string;
  setAtualizeTable: React.Dispatch<React.SetStateAction<boolean>>;
  atualizeTable: boolean;
};

const HeaderTransactionComponent = ({
  title,
  setAtualizeTable,
  atualizeTable,
}: headerTransactionProps) => {
  const onSubmit = (data: balanceValuesDefault) => {
    if (data && data.valor_inicial) {
      createBalance(
        data.nome,
        data.descricao ? data.descricao : "",
        data.valor_inicial
      );
      setAtualizeTable(false);
    }
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
        <ButtonComponentModal name="Criar" variantColor="contained">
          {!atualizeTable && (
            <Typography>
              <StarIcon />
              Pedido criado com sucesso
            </Typography>
          )}
          {atualizeTable && <BalanceFormComponent onSubmit={onSubmit} />}
        </ButtonComponentModal>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderTransactionComponent;
