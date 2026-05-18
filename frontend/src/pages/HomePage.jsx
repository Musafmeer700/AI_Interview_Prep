import { useAuth } from '@/hooks/useAuth.js';
import { Button } from '@/components/ui/Button.jsx';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-12 text-center lg:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        AI Interview Preparation Platform
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-slate-600">
        Practice interviews with AI-powered feedback. Your dashboard foundation is ready for
        upcoming interview modules.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        {isAuthenticated ? (
          <Button to="/dashboard" size="lg">
            Open dashboard
          </Button>
        ) : (
          <>
            <Button to="/register" size="lg">
              Get started
            </Button>
            <Button to="/login" variant="secondary" size="lg">
              Sign in
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
