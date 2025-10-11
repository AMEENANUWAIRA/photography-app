import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for auth tokens if needed
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers['Authorization'] = `Bearer ${token}`;
//   return config;
// });

export default api;
