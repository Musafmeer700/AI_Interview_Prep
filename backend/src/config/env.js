import dotenv from 'dotenv';

dotenv.config();

function required(name) {
  const value = process.env[name];
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Centralized, validated configuration. Fails fast at boot if critical vars are missing.
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number.parseInt(process.env.PORT || '5000', 10),
  MONGODB_URI: required('MONGODB_URI'),
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  RATE_LIMIT_MAX: Number.parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  isProduction: (process.env.NODE_ENV || 'development') === 'production',
};
