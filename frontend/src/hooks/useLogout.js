import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth.js';

export function useLogout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return useCallback(() => {
    logout();
    navigate('/login', { replace: true });
  }, [logout, navigate]);
}
