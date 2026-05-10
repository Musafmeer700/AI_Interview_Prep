import mongoose from 'mongoose';
import { env } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';
import app from './app.js';

async function bootstrap() {
  await connectDB();

  const server = app.listen(env.PORT, () => {
    console.log(`API listening on port ${env.PORT} (${env.NODE_ENV})`);
  });

  async function shutdown(signal) {
    console.log(`${signal} received, closing server…`);
    await new Promise((resolve) => {
      server.close(resolve);
    });
    try {
      await disconnectDB();
    } catch (err) {
      console.error('Error during DB disconnect', err);
    }
    process.exit(0);
  }

  process.on('SIGTERM', () => {
    void shutdown('SIGTERM');
  });
  process.on('SIGINT', () => {
    void shutdown('SIGINT');
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
