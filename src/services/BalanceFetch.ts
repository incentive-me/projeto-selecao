import axios, { AxiosError } from "axios";
const url = "https://tan-wide-eyed-llama.cyclic.app/balance/";

interface BalanceData {
  nome: string;
  descricao: string;
  valor_inicial: number;
}

export const getBalancesPerPerson = async () => {
  if (typeof localStorage !== undefined) {
    const id = localStorage.getItem("id");
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
  }
};

export const createBalance = async (
  nome: string,
  descricao: string,
  valor_inicial: number
): Promise<BalanceData> => {
  if (typeof localStorage !== undefined) {
    const id = localStorage.getItem("id");
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
    }
  }
  throw new Error(`Erro interno no servidor`);
};

export const deleteBalanceByBalanceId = async (balanceId: string) => {
  if (typeof localStorage !== undefined) {
    const id = localStorage.getItem("id");
    try {
      const response = await axios.delete(
        url + "delete/" + id + "/?balanceId=" + balanceId,
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
        throw new Error(`Erro ao deletar saldo: ${error.message}`);
      }
    }
  }
};

export const updateBalanceById = async (
  balanceId: string,
  valor_inicial: number,
  nome: string,
  descricao: string
): Promise<BalanceData> => {
  if (typeof localStorage !== undefined) {
    const id = localStorage.getItem("id");
    try {
      const response = await axios.patch(
        url + "update/" + id + "/?balanceId=" + balanceId,
        {
          valor_inicial,
          nome,
          descricao,
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
        throw new Error(`Erro ao atualizar saldo: ${error.message}`);
      }
    }
  }
  throw new Error(`Erro interno no servidor`);
};
