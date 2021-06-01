import axios from 'axios';

const gitHubApi = axios.create({
  baseURL: 'http://api.github.com',
});

export default gitHubApi;
