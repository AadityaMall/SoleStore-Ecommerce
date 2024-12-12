import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Base URL from environment variable
  withCredentials: true,    
});

export default api;