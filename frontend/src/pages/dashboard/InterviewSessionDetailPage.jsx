import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.js';
import {
  clearCurrentSession,
  deleteSession,
  fetchSessionById,
  selectCurrentSession,
  selectInterviewDetailStatus,
  selectInterviewError,
  selectInterviewMutationStatus,
} from '@/features/interviews/slice/interviewSlice.js';
import { useToast } from '@/app/providers/ToastProvider.jsx';
import { PageHeader } from '@/components/ui/PageHeader.jsx';
import { Card, CardBody, CardHeader } from '@/components/ui/Card.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner.jsx';
import { ErrorMessage } from '@/components/common/ErrorMessage.jsx';
import { SessionStatusBadge } from '@/components/interviews/SessionStatusBadge.jsx';
import { DifficultyBadge } from '@/components/interviews/DifficultyBadge.jsx';
import { INTERVIEW_TYPE_OPTIONS } from '@/features/interviews/constants.js';

function formatDateTime(value) {
  if (!value) return '—';
  return new Date(value).toLocaleString();
}

export function InterviewSessionDetailPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const session = useAppSelector(selectCurrentSession);
  const detailStatus = useAppSelector(selectInterviewDetailStatus);
  const mutationStatus = useAppSelector(selectInterviewMutationStatus);
  const error = useAppSelector(selectInterviewError);
  const isLoading = detailStatus === 'loading';
  const isDeleting = mutationStatus === 'loading';

  useEffect(() => {
    dispatch(fetchSessionById(sessionId)).then((result) => {
      if (fetchSessionById.rejected.match(result)) {
        showToast(result.payload || 'Session not found', 'error');
      }
    });
    return () => {
      dispatch(clearCurrentSession());
    };
  }, [dispatch, sessionId, showToast]);

  async function handleDelete() {
    const confirmed = window.confirm('Delete this interview session? This cannot be undone.');
    if (!confirmed) return;

    const result = await dispatch(deleteSession(sessionId));
    if (deleteSession.fulfilled.match(result)) {
      showToast('Session deleted', 'success');
      navigate('/dashboard/history', { replace: true });
    } else {
      showToast(result.payload || 'Failed to delete session', 'error');
    }
  }

  if (isLoading) {
    return <LoadingSpinner label="Loading session…" />;
  }

  if (detailStatus === 'failed' || !session) {
    return (
      <Card>
        <CardBody>
          <ErrorMessage message={error || 'Interview session not found'} />
          <Link to="/dashboard/history" className="mt-4 inline-block text-sm text-indigo-600 hover:underline">
            ← Back to history
          </Link>
        </CardBody>
      </Card>
    );
  }

  const typeLabel =
    INTERVIEW_TYPE_OPTIONS.find((o) => o.value === session.interviewType)?.label
    || session.interviewType;

  return (
    <>
      <PageHeader
        title={session.role}
        description={`${typeLabel} · Created ${formatDateTime(session.createdAt)}`}
        actions={
          <>
            <Button variant="secondary" size="sm" to="/dashboard/history">
              Back
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              Delete
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="text-base font-semibold text-slate-900">Session details</h2>
          </CardHeader>
          <CardBody>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Difficulty
                </dt>
                <dd className="mt-2">
                  <DifficultyBadge difficulty={session.difficulty} />
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Status
                </dt>
                <dd className="mt-2">
                  <SessionStatusBadge status={session.status} />
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Interview type
                </dt>
                <dd className="mt-1 text-sm text-slate-900">{typeLabel}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Score
                </dt>
                <dd className="mt-1 text-sm text-slate-900">
                  {session.score != null ? `${session.score}%` : 'Not scored yet'}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Tech stack
              </dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {session.techStack?.length ? (
                  session.techStack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">No technologies specified</span>
                )}
              </dd>
            </div>

            {session.feedback && (
              <div className="mt-6">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Feedback
                </dt>
                <dd className="mt-2 text-sm text-slate-700">{session.feedback}</dd>
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold text-slate-900">Next steps</h2>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-slate-600">
              AI-generated questions and live interview flow will be added here. This session is
              saved and ready for future features.
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

