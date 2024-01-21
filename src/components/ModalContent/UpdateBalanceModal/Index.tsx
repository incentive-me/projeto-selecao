import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateBalanceSchema } from "@/schemas/BalanceSchema";
import { Button } from "@mui/material";
import InputFormField from "@/components/Forms/Index";

type BalanceFormProps = {
  onSubmit: SubmitHandler<any>;
};
const BalanceUpdateComponent = ({ onSubmit }: BalanceFormProps) => {
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(updateBalanceSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputFormField name="nome" label="Nome" control={control} />
      <InputFormField name="descricao" label="Descriçao" control={control} />
      <InputFormField
        name="valor_inicial"
        label="Valor inicial"
        control={control}
      />
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

export default BalanceUpdateComponent;
