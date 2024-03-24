import { useCookies } from 'react-cookie';
import { createInstance } from '../createInstance';
import type { LoginRequest, LoginResponse } from './types';

export function useAuthApi() {
  const [cookies] = useCookies();
  const instance = createInstance(cookies.token);

  const endpoint = 'auth';

  const login = async (data: LoginRequest): Promise<LoginResponse> =>
    (await instance.post(`${endpoint}/login`, data)).data;

  return { login };
}
