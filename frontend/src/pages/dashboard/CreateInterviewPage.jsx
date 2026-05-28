import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.js';
import {
  clearInterviewError,
  createSession,
  selectInterviewError,
  selectInterviewMutationStatus,
} from '@/features/interviews/slice/interviewSlice.js';
import { useToast } from '@/app/providers/ToastProvider.jsx';
import { PageHeader } from '@/components/ui/PageHeader.jsx';
import { Card, CardBody } from '@/components/ui/Card.jsx';
import { InterviewForm } from '@/components/interviews/InterviewForm.jsx';

export function CreateInterviewPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const error = useAppSelector(selectInterviewError);
  const mutationStatus = useAppSelector(selectInterviewMutationStatus);
  const isLoading = mutationStatus === 'loading';

  async function handleSubmit(payload) {
    const result = await dispatch(createSession(payload));
    if (createSession.fulfilled.match(result)) {
      showToast('Interview session created', 'success');
      navigate(`/dashboard/interviews/${result.payload.id}`, { replace: true });
    } else {
      showToast(result.payload || 'Failed to create session', 'error');
    }
  }

  return (
    <>
      <PageHeader
        title="New interview session"
        description="Configure your practice session. Questions and AI feedback will be added in a later phase."
      />

      <Card className="max-w-2xl">
        <CardBody>
          <InterviewForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
            onClearError={() => dispatch(clearInterviewError())}
          />
        </CardBody>
      </Card>
    </>
  );
}
