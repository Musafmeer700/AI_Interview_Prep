import mongoose from 'mongoose';
import { AppError } from '../utils/AppError.js';
import { env } from '../config/env.js';
import { buildErrorPayload } from '../utils/response.js';

function isJwtError(err) {
  return err?.name === 'JsonWebTokenError' || err?.name === 'TokenExpiredError';
}

function isMongooseCastError(err) {
  return err instanceof mongoose.Error.CastError;
}

function isMongooseValidationError(err) {
  return err instanceof mongoose.Error.ValidationError;
}

function isMongooseDuplicateKeyError(err) {
  return err.code === 11000;
}

/**
 * Central error handler: maps known errors to HTTP responses; avoids leaking internals in production.
 * Express requires four arguments to recognize this as an error-handling middleware.
 */
export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (isJwtError(err)) {
    statusCode = 401;
    message = 'Not authorized, invalid token';
  } else if (isMongooseCastError(err)) {
    statusCode = 400;
    message = 'Invalid resource identifier';
  } else if (isMongooseValidationError(err)) {
    statusCode = 422;
    const values = Object.values(err.errors || {}).map((e) => e.message);
    message = values.length ? values.join(', ') : 'Validation failed';
  } else if (isMongooseDuplicateKeyError(err)) {
    statusCode = 409;
    message = 'Duplicate field value';
  } else if (!(err instanceof AppError) && statusCode === 500) {
    message = 'Internal Server Error';
  }

  const stack = env.isProduction ? undefined : err.stack;
  const payload = buildErrorPayload({
    message,
    statusCode,
    stack,
  });

  if (statusCode >= 500) {
    console.error(err);
  }

  return res.status(statusCode).json(payload);
}
