import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.js';
import {
  clearAuthError,
  login,
  logout,
  register,
  selectAuth,
  selectAuthError,
  selectAuthInitialized,
  selectAuthLoading,
  selectIsAuthenticated,
} from '@/features/auth/slice/authSlice.js';

export function useAuth() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const isInitialized = useAppSelector(selectAuthInitialized);
  const error = useAppSelector(selectAuthError);

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated,
    isLoading,
    isInitialized,
    error,
    login: useCallback((credentials) => dispatch(login(credentials)), [dispatch]),
    register: useCallback((credentials) => dispatch(register(credentials)), [dispatch]),
    logout: useCallback(() => dispatch(logout()), [dispatch]),
    clearError: useCallback(() => dispatch(clearAuthError()), [dispatch]),
  };
}

