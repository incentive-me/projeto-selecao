"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; // Import Zod
import Button from "@/components/Button";
import Select from "@/components/Select";
import { Input } from "@mui/material";

const updateBalanceSchema = z.object({
  nome: z.string().min(1, "Nome is required"),
  descricao: z.string().min(1, "Descrição is required"),
  valor: z.string().min(1, "Valor is required"),
  saldo: z.string().min(1, "Saldo is required"),
});

const UpdateFunction = ({ onSubmit }: any) => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(updateBalanceSchema),
  });

  return (
    <div className="p-4">
      <div className="text-2xl mb-4">Atualizar Informações</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="nome" title="Nome" />
        <Input name="descricao" title="Descrição" />
        <Input name="valor" title="Valor" />

        <Select
          name="saldo"
          label="Selecione o saldo"
          control={control}
          defaultValue="Selecione o saldo"
          options={[]}
        />

        <div className="flex justify-between mt-4">
          <Button>Cancelar</Button>
          <Button>Enviar</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFunction;
