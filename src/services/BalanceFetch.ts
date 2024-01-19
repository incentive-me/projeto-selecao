import axios, { AxiosError } from "axios";
const url = "https://tan-wide-eyed-llama.cyclic.app/balance/";

export const getBalancesPerPerson = async (id: string, token: string) => {
  try {
    const response = await axios.get(url + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Erro ao buscar saldos: ${error.message}`);
    }
  }
};

export const createBalance = async (id: string) => {
  try {
    const response = await axios.post(url + id);

    if (!response.data) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Erro ao criar saldo: ${error.message}`);
    }
  }
};
