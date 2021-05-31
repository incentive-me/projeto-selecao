import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_GITHUB_API,
});

export { api };
