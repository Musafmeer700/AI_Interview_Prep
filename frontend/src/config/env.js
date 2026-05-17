/**
 * Vite exposes only VITE_* variables to the client bundle.
 */
export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  isDev: import.meta.env.DEV,
};

