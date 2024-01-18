import * as yup from "yup";

export const UserRegisterSchema = yup
  .object({
    nome: yup.string().required("Nome obrigatório").min(3, "Nome muito curto"),
    email: yup.string().email("Email inválido").required("Email obrigatório"),
    senha: yup
      .string()
      .required("Senha obrigatória")
      .min(3, "Senha muito curta"),
  })
  .required();
