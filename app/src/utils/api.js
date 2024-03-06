import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

api.interceptors.request.use(config => {
    const csrfToken = document.head.querySelector('meta[name="csrf-token"]');
    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken.content;
    }
    return config;
});

export default api;