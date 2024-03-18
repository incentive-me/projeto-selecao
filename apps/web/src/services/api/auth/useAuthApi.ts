import instance from '../instance';
import type { LoginResponse, LoginRequest } from './types';

export function useAuthApi() {
  const endpoint = 'auth';

  const login = async (data: LoginRequest): Promise<LoginResponse> =>
    (await instance.post(`${endpoint}/login`, data)).data;

  return { login };
}
