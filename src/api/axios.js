import axios from 'axios';

// 1. Create the instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Auto-attach Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;