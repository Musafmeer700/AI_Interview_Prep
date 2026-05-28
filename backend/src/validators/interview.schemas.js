import { z } from 'zod';
import {
  DIFFICULTIES,
  INTERVIEW_TYPES,
} from '../constants/interview.constants.js';

const objectIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, 'Invalid session id');

export const createInterviewSchema = z.object({
  role: z.string().trim().min(2).max(120),
  techStack: z
    .array(z.string().trim().min(1).max(50))
    .max(20)
    .default([]),
  difficulty: z.enum(DIFFICULTIES),
  interviewType: z.enum(INTERVIEW_TYPES),
});

export const interviewIdParamSchema = z.object({
  id: objectIdSchema,
});
