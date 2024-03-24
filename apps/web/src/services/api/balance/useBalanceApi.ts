import { useCookies } from 'react-cookie';

import { createInstance } from '../createInstance';
import type {
  BalanceResponse,
  CreateBalanceRequest,
  UpdateBalanceRequest,
} from './types';

export function useBalanceApi() {
  const [cookies] = useCookies();
  const instance = createInstance(cookies.token);
  const endpoint = 'balance';

  const create = async (data: CreateBalanceRequest): Promise<BalanceResponse> =>
    (await instance.post(endpoint, data)).data;

  const update = async (
    id: string,
    data: UpdateBalanceRequest,
  ): Promise<BalanceResponse> =>
    (await instance.patch(`${endpoint}/${id}`, data)).data;

  const findOne = async (id: string): Promise<BalanceResponse> =>
    (await instance.get(`${endpoint}/${id}`)).data;

  const findAll = async (): Promise<BalanceResponse[]> =>
    (await instance.get(endpoint)).data;

  const deleteById = async (id: string): Promise<void> =>
    (await instance.delete(`${endpoint}/${id}`)).data;

  return { create, update, findOne, findAll, deleteById };
}
