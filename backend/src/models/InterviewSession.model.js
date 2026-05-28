import mongoose from 'mongoose';
import {
  DIFFICULTIES,
  INTERVIEW_TYPES,
  SESSION_STATUSES,
} from '../constants/interview.constants.js';

const { Schema } = mongoose;

const interviewSessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    role: {
      type: String,
      required: [true, 'Target role is required'],
      trim: true,
      minlength: [2, 'Role must be at least 2 characters'],
      maxlength: [120, 'Role must be at most 120 characters'],
    },
    techStack: {
      type: [String],
      default: [],
      validate: {
        validator(arr) {
          return arr.length <= 20;
        },
        message: 'Tech stack cannot exceed 20 items',
      },
    },
    difficulty: {
      type: String,
      enum: {
        values: DIFFICULTIES,
        message: `Difficulty must be one of: ${DIFFICULTIES.join(', ')}`,
      },
      required: [true, 'Difficulty is required'],
    },
    interviewType: {
      type: String,
      enum: {
        values: INTERVIEW_TYPES,
        message: `Interview type must be one of: ${INTERVIEW_TYPES.join(', ')}`,
      },
      required: [true, 'Interview type is required'],
    },
    status: {
      type: String,
      enum: {
        values: SESSION_STATUSES,
        message: `Status must be one of: ${SESSION_STATUSES.join(', ')}`,
      },
      default: 'draft',
    },
    score: {
      type: Number,
      min: [0, 'Score cannot be negative'],
      max: [100, 'Score cannot exceed 100'],
      default: null,
    },
    feedback: {
      type: String,
      trim: true,
      maxlength: [5000, 'Feedback is too long'],
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

interviewSessionSchema.index({ user: 1, createdAt: -1 });

export const InterviewSession = mongoose.model('InterviewSession', interviewSessionSchema);
