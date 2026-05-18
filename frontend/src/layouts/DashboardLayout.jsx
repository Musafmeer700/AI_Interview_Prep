import { Outlet, useMatches } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/Sidebar.jsx';
import { TopNavbar } from '@/components/dashboard/TopNavbar.jsx';
import { useSidebar } from '@/hooks/useSidebar.js';

function getPageTitle(matches) {
  const match = [...matches].reverse().find((m) => m.handle?.title);
  return match?.handle?.title ?? 'Dashboard';
}

export function DashboardLayout() {
  const { isOpen, toggle, close } = useSidebar();
  const matches = useMatches();
  const title = getPageTitle(matches);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={isOpen} onClose={close} />

      <div className="flex min-w-0 flex-1 flex-col lg:pl-0">
        <TopNavbar onMenuClick={toggle} title={title} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
