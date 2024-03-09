import { incentiveMeApiProtected } from "./apis";
import { PaymentValues, PaymentData } from "@/types/all";

const BASE_PAYMENT_URL = "/payment";

export const fetchPayments = async (): Promise<PaymentValues[]> => {
  try {
    const { data } =
      await incentiveMeApiProtected.get<PaymentValues[]>(BASE_PAYMENT_URL);
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro!!");
  }
};

export const createPayment = async (
  nome: string,
  descricao: string,
  valor: number
): Promise<PaymentData | undefined> => {
  try {
    const { data } = await incentiveMeApiProtected.post<PaymentData>(
      `${BASE_PAYMENT_URL}/{id}/`,
      { nome, descricao, valor }
    );
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro!!");
  }
};

export const deletePaymentById = async (id: string): Promise<void> => {
  try {
    await incentiveMeApiProtected.delete(`${BASE_PAYMENT_URL}/${id}/`);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro!!");
  }
};

export const updatePaymentById = async (
  nome: string,
  descricao: string,
  valor: number
): Promise<PaymentData | undefined> => {
  try {
    const { data } = await incentiveMeApiProtected.patch<PaymentData>(
      `${BASE_PAYMENT_URL}/{id}/`,
      { nome, descricao, valor }
    );
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro!!");
  }
};
