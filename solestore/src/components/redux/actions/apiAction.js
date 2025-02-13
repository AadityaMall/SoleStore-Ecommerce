import axios from 'axios';

const api = axios.create({
  baseURL: "https://solestore-backend.vercel.app/", // Base URL from environment variable
  withCredentials: true,    
});

export default api;