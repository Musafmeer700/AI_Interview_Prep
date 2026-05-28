import { DIFFICULTY_STYLES } from '@/features/interviews/constants.js';

export function DifficultyBadge({ difficulty }) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset',
        DIFFICULTY_STYLES[difficulty] || DIFFICULTY_STYLES.medium,
      ].join(' ')}
    >
      {difficulty}
    </span>
  );
}
