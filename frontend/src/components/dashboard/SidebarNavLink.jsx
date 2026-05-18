import { NavLink } from 'react-router-dom';
import { NavIcon } from './icons/NavIcons.jsx';

export function SidebarNavLink({ item, onNavigate }) {
  return (
    <NavLink
      to={item.href}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
          isActive
            ? 'bg-indigo-50 text-indigo-700'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        ].join(' ')
      }
    >
      <NavIcon name={item.icon} />
      {item.label}
    </NavLink>
  );
}
