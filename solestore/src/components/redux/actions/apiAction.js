import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Base URL from environment variable
  withCredentials: true,    
});

export default api;