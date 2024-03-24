import { useCookies } from 'react-cookie';
import { createInstance } from '../createInstance';
import type {
  CreatePaymentRequest,
  UpdatePaymentRequest,
  PaymentResponse,
} from './types';

export function usePaymentApi() {
  const [cookies] = useCookies();
  const instance = createInstance(cookies.token);
  const endpoint = 'payment';

  const create = async (data: CreatePaymentRequest): Promise<PaymentResponse> =>
    (await instance.post(endpoint, data)).data;

  const update = async (
    id: string,
    data: UpdatePaymentRequest,
  ): Promise<PaymentResponse> =>
    (await instance.patch(`${endpoint}/${id}`, data)).data;

  const findOne = async (id: string): Promise<PaymentResponse> =>
    (await instance.get(`${endpoint}/${id}`)).data;

  const findAll = async (): Promise<PaymentResponse[]> =>
    (await instance.get(endpoint)).data;

  const deleteById = async (id: string): Promise<void> =>
    (await instance.delete(`${endpoint}/${id}`)).data;

  return { create, update, findOne, findAll, deleteById };
}
