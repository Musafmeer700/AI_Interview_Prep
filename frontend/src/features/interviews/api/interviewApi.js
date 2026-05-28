import { axiosClient, endpoints } from '@/services/api/index.js';

function unwrap(response) {
  return response.data?.data;
}

export async function createInterviewSession(payload) {
  const data = unwrap(await axiosClient.post(endpoints.interviews.base, payload));
  return data.session;
}

export async function fetchInterviewSessions() {
  const data = unwrap(await axiosClient.get(endpoints.interviews.base));
  return data.sessions;
}

export async function fetchInterviewSession(id) {
  const data = unwrap(await axiosClient.get(endpoints.interviews.byId(id)));
  return data.session;
}

export async function deleteInterviewSession(id) {
  return unwrap(await axiosClient.delete(endpoints.interviews.byId(id)));
}
