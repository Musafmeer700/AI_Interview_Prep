const sizes = {
  sm: 'h-5 w-5 border',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-2',
};

export function LoadingSpinner({
  label,
  size = 'md',
  className = '',
  fullPage = false,
}) {
  const spinner = (
    <div
      className={[
        'flex flex-col items-center justify-center gap-3 text-slate-600',
        fullPage ? 'min-h-[50vh]' : 'min-h-[12rem]',
        className,
      ].join(' ')}
      role="status"
      aria-live="polite"
    >
      <div
        className={[
          'animate-spin rounded-full border-slate-300 border-t-indigo-600',
          sizes[size],
        ].join(' ')}
        aria-hidden="true"
      />
      {label && <p className="text-sm">{label}</p>}
    </div>
  );

  return spinner;
}
