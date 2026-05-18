import { PageHeader } from '@/components/ui/PageHeader.jsx';
import { EmptyState } from '@/components/ui/EmptyState.jsx';
import { NavIcon } from '@/components/dashboard/icons/NavIcons.jsx';

export function InterviewHistoryPage() {
  return (
    <>
      <PageHeader
        title="Interview History"
        description="Past practice sessions and feedback will be listed here."
      />

      <EmptyState
        icon={<NavIcon name="history" />}
        title="No interviews yet"
        description="When you complete practice interviews, your history, scores, and transcripts will show up here."
      />
    </>
  );
}
