import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.js';
import { LoadingSpinner } from '@/components/common/LoadingSpinner.jsx';

/**
 * Redirects authenticated users away from login/register.
 */
export function GuestRoute() {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return <LoadingSpinner label="Loading…" />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

