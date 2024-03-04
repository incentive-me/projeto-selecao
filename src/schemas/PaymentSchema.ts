import * as Yup from "yup";

export const createPaymentSchema = Yup.object({
  nome: Yup.string().max(30).required("Nome obrigatório"),
  descricao: Yup.string().max(255).notRequired(),
  valor: Yup.number().positive().required("Valor obrigatório"),
  saldo_id: Yup.string().required("Saldo obrigatório"),
});

export const updatePaymentSchema = Yup.object({
  nome: Yup.string().max(30).notRequired(),
  descricao: Yup.string().max(255).notRequired(),
  valor: Yup.number().positive().notRequired(),
});
