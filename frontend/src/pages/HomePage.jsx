import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.js';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-900">AI Interview Preparation Platform</h1>
      <p className="mt-2 text-slate-600">
        Practice interviews with AI-powered feedback. Architecture foundation is ready.
      </p>
      <p className="mt-6">
        {isAuthenticated ? (
          <Link to="/dashboard" className="text-slate-900 underline">
            Go to dashboard
          </Link>
        ) : (
          <Link to="/login" className="text-slate-900 underline">
            Sign in to get started
          </Link>
        )}
      </p>
    </section>
  );
}

