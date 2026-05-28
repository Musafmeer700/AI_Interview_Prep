import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.js';
import { fetchSessions, selectInterviewListStatus, selectInterviewSessions } from '@/features/interviews/slice/interviewSlice.js';
import { PageHeader } from '@/components/ui/PageHeader.jsx';
import { Card, CardBody } from '@/components/ui/Card.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner.jsx';
import { useAuth } from '@/hooks/useAuth.js';

export function OverviewPage() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const sessions = useAppSelector(selectInterviewSessions);
  const listStatus = useAppSelector(selectInterviewListStatus);

  useEffect(() => {
    if (listStatus === 'idle') {
      dispatch(fetchSessions());
    }
  }, [dispatch, listStatus]);

  const completedCount = sessions.filter((s) => s.status === 'completed').length;
  const draftCount = sessions.filter((s) => s.status === 'draft').length;

  const stats = [
    { label: 'Total sessions', value: listStatus === 'loading' ? '…' : sessions.length },
    { label: 'Completed', value: listStatus === 'loading' ? '…' : completedCount },
    { label: 'Drafts', value: listStatus === 'loading' ? '…' : draftCount },
    { label: 'Average score', value: '—' },
  ];

  if (listStatus === 'loading' && sessions.length === 0) {
    return <LoadingSpinner label="Loading overview…" />;
  }

  return (
    <>
      <PageHeader
        title="Overview"
        description={`Welcome back, ${user?.fullName ?? 'there'}. Track your interview preparation progress.`}
        actions={<Button to="/dashboard/interviews/new" size="sm">New session</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardBody>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{stat.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardBody>
          <p className="text-sm text-slate-600">
            Create a new interview session to configure role, tech stack, and difficulty. AI
            questions and scoring will be connected in a future release.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button to="/dashboard/interviews/new">Create session</Button>
            <Button to="/dashboard/history" variant="secondary">
              View history
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
