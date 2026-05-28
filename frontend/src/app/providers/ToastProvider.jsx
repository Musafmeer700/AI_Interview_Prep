import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

let toastId = 0;

const typeStyles = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-red-200 bg-red-50 text-red-900',
  info: 'border-slate-200 bg-white text-slate-900',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }
    return id;
  }, [dismiss]);

  const value = useMemo(
    () => ({ showToast, dismiss }),
    [showToast, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <aside
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 px-4"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <output
            key={toast.id}
            className={[
              'pointer-events-auto block rounded-lg border px-4 py-3 text-sm shadow-lg',
              typeStyles[toast.type] || typeStyles.info,
            ].join(' ')}
          >
            <span className="flex items-start justify-between gap-3">
              <span>{toast.message}</span>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="shrink-0 opacity-70 hover:opacity-100"
                aria-label="Dismiss"
              >
                ×
              </button>
            </span>
          </output>
        ))}
      </aside>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}
