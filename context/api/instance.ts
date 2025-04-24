import axios from 'axios';
import { API_HOST } from '../endpoint';

export const fetchApi = (port: string) => {
  const fetchApiInstance = axios.create({
    baseURL: `${API_HOST}:${port}`,
    headers: {
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'self'; frame-ancestors 'none';",
    },
  });

  return fetchApiInstance;
};

export const fetchPrivateApi = (token: string | null, port: string) => {
  const fetchPrivateApiInstance = axios.create({
    baseURL: `${API_HOST}:${port}`,
    headers: {
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'self'; frame-ancestors 'none';",
    },
  });

  fetchPrivateApiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

  return fetchPrivateApiInstance;
};
