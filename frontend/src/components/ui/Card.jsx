export function Card({ children, className = '' }) {
  return (
    <div
      className={[
        'rounded-xl border border-slate-200 bg-white shadow-sm',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={['border-b border-slate-100 px-6 py-4', className].join(' ')}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return <div className={['px-6 py-5', className].join(' ')}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return (
    <div
      className={[
        'rounded-b-xl border-t border-slate-100 bg-slate-50/50 px-6 py-4',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

