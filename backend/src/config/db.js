import mongoose from 'mongoose';
import { env } from './env.js';

mongoose.set('strictQuery', true);

export async function connectDB() {
  await mongoose.connect(env.MONGODB_URI);
}

export async function disconnectDB() {
  await mongoose.connection.close();
}
