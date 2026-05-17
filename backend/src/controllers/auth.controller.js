import { sendSuccess } from '../utils/response.js';
import * as authService from '../services/auth.service.js';

export async function register(req, res) {
  const { user, token } = await authService.register(req.body);
  return sendSuccess(
    res,
    {
      data: { user, token },
      message: 'Registration successful',
    },
    201,
  );
}

export async function login(req, res) {
  const { user, token } = await authService.login(req.body);
  return sendSuccess(res, { data: { user, token }, message: 'Login successful' });
}

export async function me(req, res) {
  const user = await authService.getMe(req.user.id);
  return sendSuccess(res, { data: { user } });
}

