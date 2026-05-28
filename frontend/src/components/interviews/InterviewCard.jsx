import { Link } from 'react-router-dom';
import { Card, CardBody } from '@/components/ui/Card.jsx';
import { SessionStatusBadge } from './SessionStatusBadge.jsx';
import { DifficultyBadge } from './DifficultyBadge.jsx';
import { INTERVIEW_TYPE_OPTIONS } from '@/features/interviews/constants.js';

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function InterviewCard({ session }) {
  const typeLabel =
    INTERVIEW_TYPE_OPTIONS.find((o) => o.value === session.interviewType)?.label
    || session.interviewType;

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              to={`/dashboard/interviews/${session.id}`}
              className="text-base font-semibold text-slate-900 hover:text-indigo-600"
            >
              {session.role}
            </Link>
            <p className="mt-1 text-sm text-slate-500">{typeLabel}</p>
          </div>
          <SessionStatusBadge status={session.status} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={session.difficulty} />
          <span className="text-xs text-slate-500">Created {formatDate(session.createdAt)}</span>
        </div>

        {session.techStack?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {session.techStack.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
              >
                {tag}
              </span>
            ))}
            {session.techStack.length > 6 && (
              <span className="text-xs text-slate-400">+{session.techStack.length - 6}</span>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
