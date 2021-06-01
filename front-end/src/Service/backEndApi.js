import axios from 'axios';

const backApi = axios.create({
  baseURL: 'http://localhost:3001',
});

export default backApi;