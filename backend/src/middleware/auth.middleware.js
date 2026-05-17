import { AppError } from '../utils/AppError.js';
import { verifyAccessToken } from '../utils/jwt.js';
import { User } from '../models/User.model.js';

function getBearerToken(req) {
  const header = req.headers.authorization;
  if (!header) return null;
  const [type, value] = header.split(' ');
  if (type?.toLowerCase() !== 'bearer' || !value) return null;
  return value;
}

export async function protect(req, _res, next) {
  try {
    const token = getBearerToken(req);
    if (!token) {
      throw new AppError('Not authorized, missing token', 401);
    }

    const decoded = verifyAccessToken(token);
    const userId = decoded?.sub;
    if (!userId) {
      throw new AppError('Not authorized, invalid token', 401);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('Not authorized, user not found', 401);
    }

    req.user = {
      id: String(user._id),
      role: user.role,
    };

    return next();
  } catch (err) {
    return next(err);
  }
}

export function authorize(...roles) {
  return (req, _res, next) => {
    if (!req.user) {
      return next(new AppError('Not authorized', 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Forbidden', 403));
    }
    return next();
  };
}

