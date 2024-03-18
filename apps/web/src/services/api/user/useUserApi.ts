import instance from '../instance';
import type { CreateUserRequest, UserResponse } from './types';

export function useUserApi() {
  const endpoint = 'user';

  const create = async (data: CreateUserRequest): Promise<UserResponse> =>
    (await instance.post(endpoint, data)).data;

  return { create };
}
