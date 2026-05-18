export function EmptyState({ icon, title, description, action }) {
  const Wrapper = 'div';
  return (
    <Wrapper className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center">
      {icon && (
        <Wrapper className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          {icon}
        </Wrapper>
      )}
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-slate-600">{description}</p>
      )}
      {action && <Wrapper className="mt-6">{action}</Wrapper>}
    </Wrapper>
  );
}
