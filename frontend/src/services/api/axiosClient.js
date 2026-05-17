import axios from 'axios';
import { env } from '@/config/env.js';
import { getStoredToken, clearStoredToken } from '@/utils/storage.js';

export const axiosClient = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

let onUnauthorized = null;

export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler;
}

axiosClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const isAuthRoute = error.config?.url?.includes('/auth/login')
      || error.config?.url?.includes('/auth/register');

    if (status === 401 && !isAuthRoute) {
      clearStoredToken();
      onUnauthorized?.();
    }

    return Promise.reject(error);
  },
);

