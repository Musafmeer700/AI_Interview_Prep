/**
 * Consistent JSON success shape for API responses.
 */
export function sendSuccess(res, { data, meta, message } = {}, statusCode = 200) {
  const body = {
    success: true,
    ...(message !== undefined && { message }),
    ...(data !== undefined && { data }),
    ...(meta !== undefined && { meta }),
  };
  return res.status(statusCode).json(body);
}

/**
 * Consistent JSON error shape (used by error middleware; exported for tests/tools).
 */
export function buildErrorPayload({ message, statusCode, stack, requestId }) {
  return {
    success: false,
    error: {
      message,
      statusCode,
      ...(requestId && { requestId }),
      ...(stack && { stack }),
    },
  };
}
