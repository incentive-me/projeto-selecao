import * as yup from "yup";

export const UserRegisterSchema = yup
  .object({
    nome: yup.string().min(3, "Nome muito curto").required("Nome obrigatório"),
    email: yup.string().email("Email inválido").required("Email obrigatório"),
    senha: yup
      .string()
      .min(3, "Senha muito curta")
      .required("Senha obrigatória"),
  })
  .required();
