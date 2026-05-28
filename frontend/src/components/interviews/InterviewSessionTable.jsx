import { Link } from 'react-router-dom';
import { SessionStatusBadge } from './SessionStatusBadge.jsx';
import { DifficultyBadge } from './DifficultyBadge.jsx';
import { INTERVIEW_TYPE_OPTIONS } from '@/features/interviews/constants.js';

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function InterviewSessionTable({ sessions }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-slate-600">Role</th>
            <th className="hidden px-4 py-3 text-left font-medium text-slate-600 sm:table-cell">
              Type
            </th>
            <th className="px-4 py-3 text-left font-medium text-slate-600">Difficulty</th>
            <th className="hidden px-4 py-3 text-left font-medium text-slate-600 md:table-cell">
              Status
            </th>
            <th className="hidden px-4 py-3 text-left font-medium text-slate-600 lg:table-cell">
              Created
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {sessions.map((session) => {
            const typeLabel =
              INTERVIEW_TYPE_OPTIONS.find((o) => o.value === session.interviewType)?.label
              || session.interviewType;

            return (
              <tr key={session.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3">
                  <Link
                    to={`/dashboard/interviews/${session.id}`}
                    className="font-medium text-slate-900 hover:text-indigo-600"
                  >
                    {session.role}
                  </Link>
                  <p className="mt-0.5 text-xs text-slate-500 sm:hidden">{typeLabel}</p>
                </td>
                <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">{typeLabel}</td>
                <td className="px-4 py-3">
                  <DifficultyBadge difficulty={session.difficulty} />
                </td>
                <td className="hidden px-4 py-3 md:table-cell">
                  <SessionStatusBadge status={session.status} />
                </td>
                <td className="hidden px-4 py-3 text-slate-500 lg:table-cell">
                  {formatDate(session.createdAt)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
