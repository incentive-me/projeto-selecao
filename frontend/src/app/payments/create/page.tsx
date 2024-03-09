"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { z } from "zod";
import Select from "@/components/Select";
import { Input } from "@mui/material";

const createPaymentSchema = z.object({
  nome: z.string().min(1, "Nome is required"),
  descricao: z.string().min(1, "Descriçao is required"),
  valor: z.string().min(1, "Valor is required"),
  saldo: z.string().min(1, "Saldo is required"),
});

type PaymentFormProps = {
  onSubmit: SubmitHandler<any>;
};

const Create: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(createPaymentSchema),
  });
  return (
    <div>
      <div className="text-2xl pt-4">Criar Pedido de Pagamento</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="nome" title="Nome" />
        <Input name="descricao" title="Descriçao" />
        <Input name="valor" title="Valor" />
        <Select
          name="saldo"
          label="Selecione o saldo"
          control={control}
          defaultValue={"Selecione o saldo"}
          options={[]}
        />

        <div className="flex justify-between">
          <Button>Cancelar</Button>
          <Button>Salvar</Button>
        </div>
      </form>
    </div>
  );
};

export default Create;
