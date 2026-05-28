import { useState } from 'react';
export function TechStackInput({ value = [], onChange, maxTags = 20 }) {
  const [input, setInput] = useState('');

  function addTag(raw) {
    const tag = raw.trim();
    if (!tag) return;
    if (value.length >= maxTags) return;
    if (value.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      setInput('');
      return;
    }
    onChange([...value, tag]);
    setInput('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    }
    if (e.key === 'Backspace' && !input && value.length) {
      onChange(value.slice(0, -1));
    }
  }

  function removeTag(tag) {
    onChange(value.filter((t) => t !== tag));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">Tech stack</label>
      <p className="mt-0.5 text-xs text-slate-500">Press Enter or comma to add a tag</p>
      <div className="mt-2 flex flex-wrap gap-2 rounded-lg border border-slate-300 bg-white p-2 focus-within:ring-2 focus-within:ring-indigo-500/20">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-800"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-indigo-600 hover:text-indigo-900"
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(input)}
          placeholder={value.length ? '' : 'e.g. React, Node.js'}
          className="min-w-[8rem] flex-1 border-0 bg-transparent px-1 py-1 text-sm outline-none"
          disabled={value.length >= maxTags}
        />
      </div>
      <p className="mt-1 text-xs text-slate-400">{value.length}/{maxTags} tags</p>
    </div>
  );
}
