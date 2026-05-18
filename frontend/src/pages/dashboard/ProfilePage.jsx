import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks.js';
import { fetchMe } from '@/features/auth/slice/authSlice.js';
import { useAuth } from '@/hooks/useAuth.js';
import { PageHeader } from '@/components/ui/PageHeader.jsx';
import { Card, CardBody, CardHeader } from '@/components/ui/Card.jsx';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner.jsx';
import { Button } from '@/components/ui/Button.jsx';

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  if (isLoading && !user) {
    return <LoadingSpinner label="Loading profile…" />;
  }

  if (!user) {
    return (
      <Card>
        <CardBody>
          <p className="text-sm text-slate-600">Unable to load profile. Try signing in again.</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <>
      <PageHeader
        title="Profile"
        description="Your account information from the platform."
        actions={<Button variant="secondary" size="sm" disabled>Edit profile</Button>}
      />

      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold text-slate-900">Account details</h2>
        </CardHeader>
        <CardBody>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Full name</dt>
              <dd className="mt-1 text-sm text-slate-900">{user.fullName}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Email</dt>
              <dd className="mt-1 text-sm text-slate-900">{user.email}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Role</dt>
              <dd className="mt-1 text-sm capitalize text-slate-900">{user.role}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Member since</dt>
              <dd className="mt-1 text-sm text-slate-900">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : '—'}
              </dd>
            </div>
          </dl>
        </CardBody>
      </Card>
    </>
  );
}
