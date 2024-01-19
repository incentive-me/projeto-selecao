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

    if (!response.data) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Erro ao registrar usúario: ${error.message}`);
    }
  }
};

export const signInUser = async (email: string, senha: string) => {
  try {
    const response = await axios.post(url + "signin", {
      email,
      senha,
    });

    if (!response.data) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Erro ao conectar o usúario: ${error.message}`);
    }
  }
};
