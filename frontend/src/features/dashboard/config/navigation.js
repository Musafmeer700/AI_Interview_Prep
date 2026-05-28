/**
 * Central dashboard navigation — add new modules here as the product grows.
 */
export const dashboardNavItems = [
  {
    id: 'overview',
    label: 'Overview',
    href: '/dashboard',
    end: true,
    icon: 'overview',
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/dashboard/profile',
    icon: 'profile',
  },
  {
    id: 'create-interview',
    label: 'New Interview',
    href: '/dashboard/interviews/new',
    icon: 'create',
  },
  {
    id: 'history',
    label: 'Interview History',
    href: '/dashboard/history',
    icon: 'history',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/dashboard/settings',
    icon: 'settings',
  },
];
