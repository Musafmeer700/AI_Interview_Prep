import { sendSuccess } from '../utils/response.js';
import * as interviewService from '../services/interview.service.js';

export async function createSession(req, res) {
  const session = await interviewService.createSession(req.user.id, req.body);
  return sendSuccess(
    res,
    { data: { session }, message: 'Interview session created' },
    201,
  );
}

export async function getSessions(req, res) {
  const sessions = await interviewService.getUserSessions(req.user.id);
  return sendSuccess(res, { data: { sessions } });
}

export async function getSession(req, res) {
  const session = await interviewService.getSessionById(req.user.id, req.params.id);
  return sendSuccess(res, { data: { session } });
}

export async function deleteSession(req, res) {
  const result = await interviewService.deleteSession(req.user.id, req.params.id);
  return sendSuccess(res, { data: result, message: 'Interview session deleted' });
}
