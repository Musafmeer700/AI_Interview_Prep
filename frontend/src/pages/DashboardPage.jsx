import { useAuth } from '@/hooks/useAuth.js';

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
      <p className="mt-2 text-slate-600">
        Welcome, {user?.fullName}. Protected route is working.
      </p>
      <dl className="mt-6 space-y-2 text-sm">
        <div>
          <dt className="font-medium text-slate-500">Email</dt>
          <dd>{user?.email}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">Role</dt>
          <dd>{user?.role}</dd>
        </div>
      </dl>
    </section>
  );
}

