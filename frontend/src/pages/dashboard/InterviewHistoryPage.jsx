import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.js';
import {
  fetchSessions,
  selectInterviewError,
  selectInterviewListStatus,
  selectInterviewSessions,
} from '@/features/interviews/slice/interviewSlice.js';
import { useToast } from '@/app/providers/ToastProvider.jsx';
import { PageHeader } from '@/components/ui/PageHeader.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner.jsx';
import { EmptyState } from '@/components/ui/EmptyState.jsx';
import { ErrorMessage } from '@/components/common/ErrorMessage.jsx';
import { InterviewCard } from '@/components/interviews/InterviewCard.jsx';
import { InterviewSessionTable } from '@/components/interviews/InterviewSessionTable.jsx';
import { NavIcon } from '@/components/dashboard/icons/NavIcons.jsx';

export function InterviewHistoryPage() {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const sessions = useAppSelector(selectInterviewSessions);
  const listStatus = useAppSelector(selectInterviewListStatus);
  const error = useAppSelector(selectInterviewError);
  const [view, setView] = useState('grid');

  useEffect(() => {
    dispatch(fetchSessions()).then((result) => {
      if (fetchSessions.rejected.match(result)) {
        showToast(result.payload || 'Failed to load sessions', 'error');
      }
    });
  }, [dispatch, showToast]);

  const isLoading = listStatus === 'loading';
  const isEmpty = listStatus === 'succeeded' && sessions.length === 0;

  return (
    <>
      <PageHeader
        title="Interview History"
        description="View and manage your practice interview sessions."
        actions={
          <>
            <div className="hidden items-center rounded-lg border border-slate-200 p-0.5 sm:flex">
              <button
                type="button"
                onClick={() => setView('grid')}
                className={[
                  'rounded-md px-3 py-1.5 text-xs font-medium',
                  view === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50',
                ].join(' ')}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setView('table')}
                className={[
                  'rounded-md px-3 py-1.5 text-xs font-medium',
                  view === 'table' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50',
                ].join(' ')}
              >
                Table
              </button>
            </div>
            <Button to="/dashboard/interviews/new" size="sm">
              New session
            </Button>
          </>
        }
      />

      {error && listStatus === 'failed' && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {isLoading && <LoadingSpinner label="Loading sessions…" />}

      {isEmpty && (
        <EmptyState
          icon={<NavIcon name="history" />}
          title="No interview sessions yet"
          description="Create your first practice session to start preparing for interviews."
          action={<Button to="/dashboard/interviews/new">Create session</Button>}
        />
      )}

      {!isLoading && sessions.length > 0 && (
        view === 'grid' ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sessions.map((session) => (
              <InterviewCard key={session.id} session={session} />
            ))}
          </div>
        ) : (
          <InterviewSessionTable sessions={sessions} />
        )
      )}
    </>
  );
}
