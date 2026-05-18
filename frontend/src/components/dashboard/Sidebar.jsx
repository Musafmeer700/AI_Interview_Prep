import { Link } from 'react-router-dom';
import { dashboardNavItems } from '@/features/dashboard/config/navigation.js';
import { SidebarNavLink } from './SidebarNavLink.jsx';

export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div
        className={[
          'fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity lg:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out lg:static lg:z-auto lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        aria-label="Dashboard navigation"
      >
        <div className="flex h-16 shrink-0 items-center border-b border-slate-200 px-5">
          <Link
            to="/dashboard"
            className="text-lg font-semibold text-slate-900"
            onClick={onClose}
          >
            AI Interview Prep
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {dashboardNavItems.map((item) => (
            <SidebarNavLink key={item.id} item={item} onNavigate={onClose} />
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <Link
            to="/"
            className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            onClick={onClose}
          >
            ← Back to site
          </Link>
        </div>
      </aside>
    </>
  );
}
