import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import v1Router from './routes/v1/index.js';
import { notFound } from './middleware/notFound.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

if (env.isProduction) {
  app.set('trust proxy', 1);
}

app.use(helmet());

const corsOrigin =
  env.CORS_ORIGIN === '*'
    ? true
    : env.CORS_ORIGIN.split(',').map((o) => o.trim());

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  }),
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { message: 'Too many requests', statusCode: 429 } },
});

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use(morgan(env.isProduction ? 'combined' : 'dev'));

app.use('/api/v1', apiLimiter, v1Router);

app.use(notFound);
app.use(errorHandler);

export default app;
