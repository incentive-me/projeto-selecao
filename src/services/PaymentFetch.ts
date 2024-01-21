import axios, { AxiosError } from "axios";
const url = "https://tan-wide-eyed-llama.cyclic.app/payment/";

interface PaymentData {
  nome: string;
  descricao: string;
  valor: number;
}

const id = localStorage.getItem("id");

export const getPaymentPerPerson = async () => {
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

export const createPayment = async (
  balanceId: string,
  nome: string,
  descricao: string,
  valor: number
): Promise<PaymentData> => {
  try {
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

export const deletePaymentByBalanceId = async (balanceId: string) => {
  try {
    const response = await axios.delete(
      url + "payment/" + id + "/?balanceId=" + balanceId,
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
};
