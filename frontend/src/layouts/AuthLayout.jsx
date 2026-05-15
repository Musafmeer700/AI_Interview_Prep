import { Link, Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <Link to="/" className="text-xl font-semibold text-slate-900">
          AI Interview Prep
        </Link>
        <p className="mt-1 text-sm text-slate-500">Sign in to continue</p>
      </div>
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <Outlet />
      </div>
    </div>
  );
}



