import React, { useState } from "react";
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
  const [errorPayment, setErrorPayment] = useState(false);

  const onSubmit = (data: paymentValuesDefault) => {
    const [id, valor_restante] = data.saldo_id.split(":");

    try {
      if (parseInt(valor_restante) > data.valor) {
        createPayment(
          id,
          data.nome,
          data.descricao ? data.descricao : "",
          data.valor
        );
        setAtualizeTable(false);
        setErrorPayment(false);
      } else {
        setErrorPayment(true);
        setTimeout(() => setErrorPayment(false), 2000);
      }
    } catch (error) {
      setErrorPayment(true);
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
          {errorPayment && (
            <Typography>
              <StarIcon />
              Saldo insuficiente
            </Typography>
          )}
          {!atualizeTable && (
            <Typography>
              <StarIcon />
              Pedido criado com sucesso
            </Typography>
          )}
          {atualizeTable && !errorPayment && (
            <PaymentFormComponent onSubmit={onSubmit} />
          )}
        </ButtonComponentModal>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderPaymentComponent;
