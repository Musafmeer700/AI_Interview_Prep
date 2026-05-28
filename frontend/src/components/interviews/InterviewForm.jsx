import { useState } from 'react';
import { Button } from '@/components/ui/Button.jsx';
import { ErrorMessage } from '@/components/common/ErrorMessage.jsx';
import { TechStackInput } from './TechStackInput.jsx';
import {
  DIFFICULTY_OPTIONS,
  INTERVIEW_TYPE_OPTIONS,
} from '@/features/interviews/constants.js';

const initialForm = {
  role: '',
  techStack: [],
  difficulty: 'medium',
  interviewType: 'technical',
};

export function InterviewForm({ onSubmit, isLoading, error, onClearError }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    onClearError?.();
    await onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ErrorMessage message={error} onDismiss={onClearError} />

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-slate-700">
          Target role
        </label>
        <input
          id="role"
          type="text"
          required
          minLength={2}
          maxLength={120}
          value={form.role}
          onChange={handleChange('role')}
          placeholder="e.g. Senior Frontend Engineer"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <TechStackInput
        value={form.techStack}
        onChange={(techStack) => setForm((prev) => ({ ...prev, techStack }))}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-slate-700">
            Difficulty
          </label>
          <select
            id="difficulty"
            value={form.difficulty}
            onChange={handleChange('difficulty')}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            {DIFFICULTY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="interviewType" className="block text-sm font-medium text-slate-700">
            Interview type
          </label>
          <select
            id="interviewType"
            value={form.interviewType}
            onChange={handleChange('interviewType')}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            {INTERVIEW_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
        <Button type="submit" isLoading={isLoading}>
          Create session
        </Button>
      </div>
    </form>
  );
}
