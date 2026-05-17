/**
 * Normalizes backend error shape: { success: false, error: { message, statusCode } }
 */
export function getErrorMessage(error, fallback = 'Something went wrong') {
  if (!error) return fallback;

  const apiMessage = error.response?.data?.error?.message;
  if (apiMessage) return apiMessage;

  if (error.message) return error.message;

  return fallback;
}

