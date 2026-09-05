// Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Sparkles, 
  LogOut, 
  Settings as SettingsIcon, 
  Menu, 
  X,
  LayoutDashboard, 
  CalendarDays, 
  Utensils, 
  Search, 
  Footprints, 
  Moon, 
  Droplets, 
  LineChart, 
  History, 
  UserCheck, 
  ShieldAlert
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const navLinks = [
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
    navLinks.push({ to: '/admin', label: 'Admin Panel', icon: ShieldAlert });
  }

  return (
    <>
      <header className="sticky top-0 z-30 bg-cream-100/90 backdrop-blur-md border-b border-stone-200/60 px-4 md:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand & Mobile Hamburger Toggle */}
          <div className="flex items-center gap-3">
            {user && (
              <button
                onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
                className="lg:hidden p-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition shadow-sm"
                aria-label="Open navigation menu"
              >
                {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-2xl bg-forest-500 flex items-center justify-center text-white shadow-soft group-hover:bg-forest-600 transition">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-forest-700 tracking-tight">Nourish360</span>
                <span className="hidden sm:inline-block ml-2 text-[11px] font-sans font-medium text-sage-600 bg-sage-100/70 px-2 py-0.5 rounded-full">
                  Wellness Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Right Actions */}
          {user ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:block text-right">
                <div className="text-xs text-stone-500 font-medium">{getGreeting()},</div>
                <div className="text-sm font-semibold text-stone-800">{user.name} 🌿</div>
              </div>

              <div className="flex items-center gap-1.5">
                <Link
                  to="/settings"
                  className="p-2 rounded-xl text-stone-500 hover:text-forest-700 hover:bg-stone-100 transition"
                  title="Settings"
                >
                  <SettingsIcon className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="p-2 rounded-xl text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-xs md:text-sm font-semibold text-forest-700 hover:text-forest-600 px-3 py-1.5 transition"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="text-xs md:text-sm font-semibold bg-forest-600 hover:bg-forest-700 text-white px-4 py-2 rounded-xl shadow-soft transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* MOBILE SLIDE-OUT DRAWER MENU (For phones & tablets) */}
      {user && mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-xs bg-cream-50 h-full shadow-2xl p-5 flex flex-col justify-between overflow-y-auto z-10 border-r border-stone-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-forest-600 text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-stone-800">Nourish360</h3>
                    <p className="text-[10px] text-stone-500">{user.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-stone-200 text-stone-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* All Navigation Links */}
              <div className="space-y-1">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all
                        ${isActive 
                          ? 'bg-forest-600 text-white font-bold shadow-sm' 
                          : 'text-stone-700 hover:text-forest-700 hover:bg-sage-100/60'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* Bottom Signout in Drawer */}
            <div className="pt-4 border-t border-stone-200 mt-6">
              <button
                onClick={() => {
                  setMobileDrawerOpen(false);
                  logout();
                  navigate('/');
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};