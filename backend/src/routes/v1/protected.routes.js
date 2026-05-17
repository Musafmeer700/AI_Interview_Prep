import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { protect, authorize } from '../../middleware/auth.middleware.js';
import { sendSuccess } from '../../utils/response.js';

const router = Router();

router.get(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    return sendSuccess(res, { data: { message: `Hello, user ${req.user.id}` } });
  }),
);

router.get(
  '/admin',
  protect,
  authorize('admin'),
  asyncHandler(async (_req, res) => {
    return sendSuccess(res, { data: { message: 'Hello, admin!' } });
  }),
);

export default router;

