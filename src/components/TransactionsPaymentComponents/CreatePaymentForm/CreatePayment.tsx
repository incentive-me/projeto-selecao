import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import InputFormField from "@/components/Forms/Index";
import { createPaymentSchema } from "@/schemas/PaymentSchema";
import SelectFormField from "../SelectInput";

type PaymentFormProps = {
  onSubmit: SubmitHandler<any>;
};

const PaymentFormComponent: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(createPaymentSchema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputFormField name="nome" label="Nome" control={control} />
      <InputFormField name="descricao" label="Descriçao" control={control} />
      <InputFormField name="valor" label="Valor" control={control} />
      <SelectFormField name="saldo_id" label="Saldo" control={control} />

      <Button
        type="submit"
        disabled={formState.isSubmitting}
        variant="contained"
        color="primary"
      >
        Enviar
      </Button>
    </form>
  );
};

export default PaymentFormComponent;
