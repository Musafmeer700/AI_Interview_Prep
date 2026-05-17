export function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
    >
      <div className="flex items-start justify-between gap-2">
        <p>{message}</p>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 text-red-600 hover:text-red-800"
            aria-label="Dismiss error"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

