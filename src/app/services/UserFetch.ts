import axios, { AxiosError } from "axios";

type createUserType = {
  nome: string;
  email: string;
  senha: string;
};

export const RegisterUser = async (formData: createUserType) => {
  try {
    const response = await axios.post("/api/users", {
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
    });

    if (!response.data) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(`Erro ao registrar usuário: ${error.message}`);
      throw error;
    }
  }
};
