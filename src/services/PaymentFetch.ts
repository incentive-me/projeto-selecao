import axios, { AxiosError } from "axios";
const url = "https://tan-wide-eyed-llama.cyclic.app/payment/";

interface PaymentData {
  nome: string;
  descricao: string;
  valor: number;
}

export const getPaymentPerPerson = async () => {
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
        return Error(`Erro ao buscar saldos: ${error.message}`);
      }
    }
  }
};

export const createPayment = async (
  balanceId: string,
  nome: string,
  descricao: string,
  valor: number
): Promise<PaymentData> => {
  if (typeof localStorage !== undefined) {
    try {
      const id = localStorage.getItem("id");
      const response = await axios.post(
        url + id + "/?balanceId=" + balanceId,
        {
          nome,
          descricao,
          valor,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data && response.data.error) {
        throw new Error(`Erro na requisição: ${response.data.error}`);
      }

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao realizar pagamento:", error.message);
        throw error;
      }
    }
  }
  throw new Error(`Erro interno no servidor`);
};

export const deletePaymentByBalanceId = async (balanceId: string) => {
  if (typeof localStorage !== undefined) {
    const id = localStorage.getItem("id");
    try {
      const response = await axios.delete(
        url + id + "/?balanceId=" + balanceId,
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

export const updatePaymentById = async (
  balanceId: string,
  nome: string,
  descricao: string,
  valor: number
) => {
  if (typeof localStorage !== undefined) {
    const id = localStorage.getItem("id");
    try {
      const response = await axios.patch(
        url + id + "/?balanceId=" + balanceId,
        {
          nome,
          descricao,
          valor,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Erro ao atualizar pagamento: ${error.message}`);
      }
    }
  }
};
