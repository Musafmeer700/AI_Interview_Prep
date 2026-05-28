import { STATUS_LABELS } from '@/features/interviews/constants.js';

const statusStyles = {
  draft: 'bg-slate-100 text-slate-700 ring-slate-500/20',
  scheduled: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  'in-progress': 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  completed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
};

export function SessionStatusBadge({ status }) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        statusStyles[status] || statusStyles.draft,
      ].join(' ')}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}
