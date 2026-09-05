// MobileNav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Search, Footprints, User } from 'lucide-react';

export const MobileNav = () => {
  const items = [
    { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { to: '/plan', label: 'Plan', icon: CalendarDays },
    { to: '/explorer', label: 'Food', icon: Search },
    { to: '/movement', label: 'Move', icon: Footprints },
    { to: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-2 py-2 flex items-center justify-around shadow-soft-lg">
      {items.map(item => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-[10px] font-medium transition
              ${isActive ? 'text-forest-700 font-bold' : 'text-stone-400 hover:text-stone-700'}
            `}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
