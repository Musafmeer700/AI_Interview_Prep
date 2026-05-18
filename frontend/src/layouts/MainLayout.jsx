import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.js';
import { Button } from '@/components/ui/Button.jsx';

export function MainLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
          <Link to="/" className="text-lg font-semibold text-slate-900">
            AI Interview Prep
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            {isAuthenticated ? (
              <Button to="/dashboard" variant="primary" size="sm">
                Dashboard
              </Button>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-slate-900">
                  Login
                </Link>
                <Button to="/register" variant="primary" size="sm">
                  Get started
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
