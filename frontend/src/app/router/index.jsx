import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthBootstrap } from '@/app/providers/AuthBootstrap.jsx';
import { MainLayout } from '@/layouts/MainLayout.jsx';
import { AuthLayout } from '@/layouts/AuthLayout.jsx';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute.jsx';
import { GuestRoute } from '@/components/auth/GuestRoute.jsx';
import { HomePage } from '@/pages/HomePage.jsx';
import { LoginPage } from '@/pages/LoginPage.jsx';
import { RegisterPage } from '@/pages/RegisterPage.jsx';
import { DashboardPage } from '@/pages/DashboardPage.jsx';

export const router = createBrowserRouter([
  {
    element: <AuthBootstrap />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          {
            element: <ProtectedRoute />,
            children: [{ path: 'dashboard', element: <DashboardPage /> }],
          },
        ],
      },
      {
        element: <GuestRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { path: 'login', element: <LoginPage /> },
              { path: 'register', element: <RegisterPage /> },
            ],
          },
        ],
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

