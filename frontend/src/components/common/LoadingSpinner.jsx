export function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="flex min-h-[12rem] flex-col items-center justify-center gap-3 text-slate-600">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700"
        aria-hidden="true"
      />
      <p className="text-sm">{label}</p>
    </div>
  );
}

