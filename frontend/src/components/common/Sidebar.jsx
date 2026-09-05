// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Utensils, 
  Search, 
  Footprints, 
  Moon, 
  Droplets, 
  Sparkles, 
  LineChart, 
  History, 
  UserCheck, 
  Settings as SettingsIcon,
  ShieldAlert
} from 'lucide-react';

export const Sidebar = () => {
  const { user } = useAuth();

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/plan', label: 'Today’s Plan', icon: CalendarDays },
    { to: '/nutrition', label: 'Nutrition', icon: Utensils },
    { to: '/explorer', label: 'Food Explorer', icon: Search },
    { to: '/movement', label: 'Movement', icon: Footprints },
    { to: '/sleep', label: 'Sleep Routine', icon: Moon },
    { to: '/hydration', label: 'Hydration', icon: Droplets },
    { to: '/habits', label: 'Habits', icon: Sparkles },
    { to: '/progress', label: 'Progress', icon: LineChart },
    { to: '/weekly-review', label: 'Weekly Review', icon: History },
    { to: '/profile', label: 'Profile', icon: UserCheck },
    { to: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  if (user?.role === 'admin') {
    links.push({ to: '/admin', label: 'Admin Panel', icon: ShieldAlert });
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-stone-200/60 bg-cream-50/50 backdrop-blur-sm min-h-[calc(100vh-61px)] p-4 shrink-0">
      <div className="space-y-1">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all
                ${isActive 
                  ? 'bg-forest-600 text-white shadow-soft font-semibold' 
                  : 'text-stone-600 hover:text-forest-700 hover:bg-sage-100/50'
                }
              `}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="mt-auto pt-6 px-3">
        <div className="p-3.5 rounded-2xl bg-sage-50 border border-sage-200/50 text-[11px] text-stone-600">
          <div className="font-semibold text-forest-700 flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Nourish360 Engine v1.2
          </div>
          <p className="text-stone-500 leading-snug">
            Safety-bound wellness recommendations. Not medical advice.
          </p>
        </div>
      </div>
    </aside>
  );
};
