import { AppError } from '../utils/AppError.js';
import { InterviewSession } from '../models/InterviewSession.model.js';

function normalizeTechStack(techStack = []) {
  const seen = new Set();
  return techStack
    .map((tag) => tag.trim())
    .filter((tag) => {
      if (!tag || seen.has(tag.toLowerCase())) return false;
      seen.add(tag.toLowerCase());
      return true;
    });
}

export async function createSession(userId, payload) {
  const session = await InterviewSession.create({
    user: userId,
    role: payload.role,
    techStack: normalizeTechStack(payload.techStack),
    difficulty: payload.difficulty,
    interviewType: payload.interviewType,
    status: 'draft',
  });
  return session.toJSON();
}

export async function getUserSessions(userId) {
  const sessions = await InterviewSession.find({ user: userId }).sort({ createdAt: -1 });
  return sessions.map((session) => session.toJSON());
}

export async function getSessionById(userId, sessionId) {
  const session = await InterviewSession.findOne({
    _id: sessionId,
    user: userId,
  });

  if (!session) {
    throw new AppError('Interview session not found', 404);
  }

  return session.toJSON();
}

export async function deleteSession(userId, sessionId) {
  const session = await InterviewSession.findOneAndDelete({
    _id: sessionId,
    user: userId,
  });

  if (!session) {
    throw new AppError('Interview session not found', 404);
  }

  return { id: session._id.toString() };
}
