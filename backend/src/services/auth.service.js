import { AppError } from '../utils/AppError.js';
import { User } from '../models/User.model.js';
import { signAccessToken } from '../utils/jwt.js';

export async function register({ fullName, email, password, avatar }) {
  const existing = await User.findOne({ email }).lean();
  if (existing) {
    throw new AppError('Email already in use', 409);
  }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: avatar ?? null,
  });

  const token = signAccessToken({ userId: user._id, role: user.role });
  return { user: user.toJSON(), token };
}

export async function login({ email, password }) {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const ok = await user.comparePassword(password);
  if (!ok) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = signAccessToken({ userId: user._id, role: user.role });
  return { user: user.toJSON(), token };
}

export async function getMe(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user.toJSON();
}

