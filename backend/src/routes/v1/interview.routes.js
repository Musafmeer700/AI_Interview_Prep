import { Router } from 'express';
import * as interviewController from '../../controllers/interview.controller.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { validateBody, validateParams } from '../../middleware/validate.middleware.js';
import {
  createInterviewSchema,
  interviewIdParamSchema,
} from '../../validators/interview.schemas.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = Router();

router.use(protect);

router.post(
  '/',
  validateBody(createInterviewSchema),
  asyncHandler(interviewController.createSession),
);
router.get('/', asyncHandler(interviewController.getSessions));
router.get(
  '/:id',
  validateParams(interviewIdParamSchema),
  asyncHandler(interviewController.getSession),
);
router.delete(
  '/:id',
  validateParams(interviewIdParamSchema),
  asyncHandler(interviewController.deleteSession),
);

export default router;
