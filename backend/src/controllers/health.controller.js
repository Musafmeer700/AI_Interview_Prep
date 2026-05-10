import { env } from '../config/env.js';
import { sendSuccess } from '../utils/response.js';

/**
 * Liveness/readiness style check. Extend later with DB ping if you need strict readiness probes.
 */
export function getHealth(_req, res) {
  return sendSuccess(res, {
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: env.NODE_ENV,
    },
  });
}
