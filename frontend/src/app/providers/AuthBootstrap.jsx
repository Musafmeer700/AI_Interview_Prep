import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks.js';
import { bootstrapAuth, logout } from '@/features/auth/slice/authSlice.js';
import { setUnauthorizedHandler } from '@/services/api/index.js';
import { LoadingSpinner } from '@/components/common/LoadingSpinner.jsx';
import { useAuth } from '@/hooks/useAuth.js';

export function AuthBootstrap() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isInitialized } = useAuth();

  useEffect(() => {
    setUnauthorizedHandler(() => {
      dispatch(logout());
      navigate('/login', { replace: true });
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  if (!isInitialized) {
    return <LoadingSpinner label="Starting app…" />;
  }

  return <Outlet />;
}

