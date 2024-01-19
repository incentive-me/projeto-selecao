import axios, { AxiosError } from "axios";
const url = "https://tan-wide-eyed-llama.cyclic.app/balance/";

interface BalanceData {
  id: string;
  nome: string;
  descricao: string;
  valor_inicial: number;
}

export const getBalancesPerPerson = async (id: string) => {
  try {
    const response = await axios.get(url + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

export const createBalance = async (
  id: string,
  nome: string,
  descricao: string,
  valor_inicial: number
): Promise<BalanceData> => {
  try {
    const response = await axios.post(
      url + id,
      {
        nome,
        descricao,
        valor_inicial,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.data) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Erro ao criar saldo: ${error.message}`);
    }

    throw new Error(`Erro interno no servidor`);
  }
};
