import { useCookies } from 'react-cookie';
import { createInstance } from '../createInstance';
import type { CreateUserRequest, UserResponse } from './types';

export function useUserApi() {
  const [cookies] = useCookies();
  const instance = createInstance(cookies.token);
  const endpoint = 'user';

  const create = async (data: CreateUserRequest): Promise<UserResponse> =>
    (await instance.post(endpoint, data)).data;

  return { create };
}
