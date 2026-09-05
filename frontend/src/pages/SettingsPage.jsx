import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWellness } from '../context/WellnessContext';
import { Settings as SettingsIcon, Download, Bell, Eye, ShieldCheck, Check } from 'lucide-react';

export const SettingsPage = () => {
  const { user, updateSettings, logout } = useAuth();
  const { plan, progress } = useWellness();

  const [units, setUnits] = useState(user?.settings?.units || 'metric');
  const [reducedMotion, setReducedMotion] = useState(user?.settings?.reducedMotion || false);
  const [notifications, setNotifications] = useState(user?.settings?.notifications || {
    meals: true,
    water: true,
    activity: true,
    windDown: true,
    habits: true
  });
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await updateSettings({
      units,
      reducedMotion,
      notifications
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportData = () => {
    const exportPayload = {
      exportedAt: new Date().toISOString(),
      user: { name: user?.name, email: user?.email, settings: user?.settings },
      currentPlan: plan,
      progressHistory: progress
    };
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nourish360_data_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">Preferences</span>
        <h1 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 mt-1">Platform Settings</h1>
        <p className="text-xs md:text-sm text-stone-500 mt-1">
          Customize unit standards, accessibility, notifications, and export your personal data.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-soft p-6 md:p-8 space-y-6">
        
        {/* Unit Preference */}
        <div>
          <h3 className="font-serif font-bold text-base text-stone-800 mb-2">Preferred Units</h3>
          <div className="flex gap-3 text-xs">
            <button
              onClick={() => setUnits('metric')}
              className={`px-4 py-2.5 rounded-2xl border font-semibold transition ${
                units === 'metric' ? 'bg-forest-600 text-white border-forest-600' : 'border-stone-200 text-stone-600'
              }`}
            >
              Metric (kg, cm, ml)
            </button>
            <button
              onClick={() => setUnits('imperial')}
              className={`px-4 py-2.5 rounded-2xl border font-semibold transition ${
                units === 'imperial' ? 'bg-forest-600 text-white border-forest-600' : 'border-stone-200 text-stone-600'
              }`}
            >
              Imperial (lbs, ft, oz)
            </button>
          </div>
        </div>

        {/* Accessibility: Reduced Motion */}
        <div className="pt-4 border-t border-stone-100">
          <h3 className="font-serif font-bold text-base text-stone-800 mb-2">Accessibility</h3>
          <label className="flex items-center gap-3 cursor-pointer text-xs text-stone-700">
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="rounded text-forest-600"
            />
            <span>Enable Reduced Motion (disables subtle floating background leaves and micro-animations)</span>
          </label>
        </div>

        {/* Notifications */}
        <div className="pt-4 border-t border-stone-100">
          <h3 className="font-serif font-bold text-base text-stone-800 mb-2">Notifications</h3>
          <div className="space-y-2 text-xs text-stone-600">
            {[
              { id: 'meals', label: 'Meal schedule reminders' },
              { id: 'water', label: 'Hydration interval prompts' },
              { id: 'activity', label: 'Midday movement break reminders' },
              { id: 'windDown', label: 'Evening sleep wind-down cues' },
              { id: 'habits', label: 'Daily micro-habit check-ins' }
            ].map(notif => (
              <label key={notif.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(notifications[notif.id])}
                  onChange={(e) => setNotifications(prev => ({ ...prev, [notif.id]: e.target.checked }))}
                  className="rounded text-forest-600"
                />
                <span>{notif.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Data Export */}
        <div className="pt-4 border-t border-stone-100">
          <h3 className="font-serif font-bold text-base text-stone-800 mb-1">Data Portability</h3>
          <p className="text-xs text-stone-500 mb-3">Download a full JSON archive of your profile, daily plans, and progress logs.</p>
          <button
            onClick={handleExportData}
            className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Health & Routine Archive (JSON)</span>
          </button>
        </div>

        <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-2xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-bold shadow-soft transition flex items-center gap-1.5"
          >
            {saved ? <Check className="w-4 h-4" /> : null}
            <span>{saved ? 'Settings Saved' : 'Save Preferences'}</span>
          </button>

          <button
            onClick={logout}
            className="text-xs font-semibold text-rose-600 hover:underline"
          >
            Sign Out of Nourish360
          </button>
        </div>

      </div>
    </div>
  );
};
