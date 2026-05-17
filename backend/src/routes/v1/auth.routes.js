import { Router } from 'express';
import * as authController from '../../controllers/auth.controller.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { validateBody } from '../../middleware/validate.middleware.js';
import { loginSchema, registerSchema } from '../../validators/auth.schemas.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = Router();

router.post('/register', validateBody(registerSchema), asyncHandler(authController.register));
router.post('/login', validateBody(loginSchema), asyncHandler(authController.login));
router.get('/me', protect, asyncHandler(authController.me));

export default router;

