import * as yup from "yup";

export const createBalanceSchema = yup.object({
  nome: yup.string().min(3, "Nome muito curto").required("Nome é obrigatório"),
  descricao: yup.string().max(255),
  valor_inicial: yup
    .number()
    .positive()
    .required("Valor inicial é obrigatório"),
  valor_restante: yup.string().nullable(),
  valor_utilizado: yup.string().nullable(),
});

export const updateBalanceSchema = yup.object({
  nome: yup.string().min(3, "Nome muito curto"),
  descricao: yup.string().max(255),
  valor_inicial: yup.number().positive(),
});
