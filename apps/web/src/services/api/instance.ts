import axios from 'axios';
import { Cookies } from 'react-cookie';

const token: string | undefined = new Cookies().get('token');

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : undefined,
    'Content-Type': 'application/json',
  },
});

export default instance;
