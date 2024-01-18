import axios, { AxiosError } from "axios";
const url = "https://tan-wide-eyed-llama.cyclic.app/";

export const RegisterUser = async (
  nome: string,
  email: string,
  senha: string
) => {
  try {
    const response = await axios.post(url, {
      nome,
      email,
      senha,
    });

    console.log(response);
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
