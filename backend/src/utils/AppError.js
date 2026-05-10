/**
 * Operational errors: safe to expose message/status to clients when handled explicitly.
 */
export class AppError extends Error {
  constructor(message, statusCode = 500, { isOperational = true, cause } = {}) {
    super(message, { cause });
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace?.(this, this.constructor);
  }
}
