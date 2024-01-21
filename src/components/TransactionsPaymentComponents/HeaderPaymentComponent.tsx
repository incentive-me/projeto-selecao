import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ButtonComponentModal from "../ButtonComponentModal/ButtonComponentModal";

import StarIcon from "../IconsComponents/StartIcon";
import { paymentValuesDefault } from "@/@types/PaymentType";
import { createPayment } from "@/services/PaymentFetch";
import PaymentFormComponent from "./CreatePaymentForm/CreatePayment";

type headerPaymentProps = {
  title: string;
  setAtualizeTable: React.Dispatch<React.SetStateAction<boolean>>;
  atualizeTable: boolean;
};

const HeaderPaymentComponent: React.FC<headerPaymentProps> = ({
  title,
  setAtualizeTable,
  atualizeTable,
}: headerPaymentProps) => {
  const onSubmit = (data: paymentValuesDefault) => {
    console.log(data);
    if (data && data.valor) {
      createPayment(
        data.saldo_id,
        data.nome,
        data.descricao ? data.descricao : "",
        data.valor
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
          {atualizeTable && <PaymentFormComponent onSubmit={onSubmit} />}
        </ButtonComponentModal>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderPaymentComponent;
