import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthBootstrap } from '@/app/providers/AuthBootstrap.jsx';
import { MainLayout } from '@/layouts/MainLayout.jsx';
import { AuthLayout } from '@/layouts/AuthLayout.jsx';
import { DashboardLayout } from '@/layouts/DashboardLayout.jsx';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute.jsx';
import { GuestRoute } from '@/components/auth/GuestRoute.jsx';
import { HomePage } from '@/pages/HomePage.jsx';
import { LoginPage } from '@/pages/LoginPage.jsx';
import { RegisterPage } from '@/pages/RegisterPage.jsx';
import { OverviewPage } from '@/pages/dashboard/OverviewPage.jsx';
import { ProfilePage } from '@/pages/dashboard/ProfilePage.jsx';
import { InterviewHistoryPage } from '@/pages/dashboard/InterviewHistoryPage.jsx';
import { SettingsPage } from '@/pages/dashboard/SettingsPage.jsx';

export const router = createBrowserRouter([
  {
    element: <AuthBootstrap />,
    children: [
      {
        element: <MainLayout />,
        children: [{ index: true, element: <HomePage /> }],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <OverviewPage />,
                handle: { title: 'Overview' },
              },
              {
                path: 'profile',
                element: <ProfilePage />,
                handle: { title: 'Profile' },
              },
              {
                path: 'history',
                element: <InterviewHistoryPage />,
                handle: { title: 'Interview History' },
              },
              {
                path: 'settings',
                element: <SettingsPage />,
                handle: { title: 'Settings' },
              },
            ],
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
