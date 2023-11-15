import axios from 'axios';

const url = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

const support = () => {
  const apiUrl = {
    login: '/login',
    register: '/register',
    refreshToken: '/refresh_token',
    logout: '/logout',

    episode: '/episode',
    category: '/category',

    subscription: '/subscription',

    self: '/self',
  };

  return { apiUrl };
};

export type APIType = typeof api;

export {
  api, 
  support
};