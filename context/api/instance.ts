import axios from 'axios';
import { API_HOST } from '../endpoint';

export const fetchApi = (port: string) => {
  const fetchApiInstance = axios.create({
    baseURL: `${API_HOST}:197${port}`,
    headers: {
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'self'; frame-ancestors 'none';",
    },
  });

  return fetchApiInstance;
};

export const fetchApiPrivate = (port: string, token: string) => {
  const privateInstance = axios.create({
    baseURL: `${API_HOST}:197${port}`,
    headers: {
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'self'; frame-ancestors 'none';",
      Authorization: `Bearer ${token}`,
    },
  });

  privateInstance.interceptors.request.use((res) => {
    return res;
  });

  return privateInstance;
};

// export const fetchPrivateApi = (token: string, port: string) => {
//   // const fetchPrivateApiInstance = axios.create({
//   //   baseURL: `${API_HOST}:${port}`,
//   //   headers: {
//   //     'X-Frame-Options': 'DENY',
//   //     'Content-Security-Policy': "default-src 'self'; frame-ancestors 'none';",
//   //   },
//   // });

//   // fetchPrivateInstance(port).defaults.headers.common.Authorization =
//   //   `Bearer ${token}`;

//   // fetchPrivateInstance(port).interceptors.response.use((res) => {
//   //   return res;
//   // });

//   return fetchPrivateInstance;
// };
