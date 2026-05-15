import { axiosClient, endpoints } from '@/services/api/index.js';

function unwrap(response) {
  return response.data?.data;
}

export async function registerUser(payload) {
  const data = unwrap(await axiosClient.post(endpoints.auth.register, payload));
  return data;
}

export async function loginUser(payload) {
  const data = unwrap(await axiosClient.post(endpoints.auth.login, payload));
  return data;
}

export async function fetchCurrentUser() {
  const data = unwrap(await axiosClient.get(endpoints.auth.me));
  return data;
}

