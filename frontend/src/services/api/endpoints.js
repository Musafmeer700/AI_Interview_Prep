export const endpoints = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    me: '/auth/me',
  },
  interviews: {
    base: '/interviews',
    byId: (id) => `/interviews/${id}`,
  },
  health: '/health',
};

