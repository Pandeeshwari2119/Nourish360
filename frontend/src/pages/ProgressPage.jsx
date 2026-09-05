import React from 'react';
import { useWellness } from '../context/WellnessContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid 
} from 'recharts';
import { Sparkles, Heart, Footprints, Droplets, Moon } from 'lucide-react';

export const ProgressPage = () => {
  const { progress } = useWellness();
  const history = progress?.weeklyHistory || [];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">Consistency Tracking</span>
        <h1 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 mt-1">Your Progress</h1>
        <p className="text-xs md:text-sm text-stone-500 mt-1">
          {progress?.encouragement || "You're building consistent, sustainable health habits. Every step counts 🌱"}
        </p>
      </div>

      {/* Encouragement Banner */}
      <div className="p-5 rounded-3xl bg-sage-50 border border-sage-200/60 text-xs text-forest-800 flex items-center gap-3 shadow-soft">
        <Heart className="w-5 h-5 text-forest-600 shrink-0" />
        <span className="font-medium leading-relaxed">
          Nourish360 tracks progression, never perfection. Celebrate your consistency rather than obsessing over rigid numbers.
        </span>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Steps History Bar Chart */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Footprints className="w-4 h-4 text-forest-600" />
              <h3 className="font-serif font-bold text-base text-stone-800">7-Day Step Progression</h3>
            </div>
            <span className="text-xs text-stone-400 font-medium">Daily Steps</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={history}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                />
                <Bar dataKey="steps" fill="#6C8E7B" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hydration History Line Chart */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-600" />
              <h3 className="font-serif font-bold text-base text-stone-800">Water Intake Consistency</h3>
            </div>
            <span className="text-xs text-stone-400 font-medium">Milliliters (ml)</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="waterLoggedMl" stroke="#0284C7" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sleep Duration Trend */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-600" />
              <h3 className="font-serif font-bold text-base text-stone-800">Sleep Duration Tracking</h3>
            </div>
            <span className="text-xs text-stone-400 font-medium">Hours</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={history}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} domain={[0, 10]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                />
                <Bar dataKey="sleepHours" fill="#6366F1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Habit Completion Count */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h3 className="font-serif font-bold text-base text-stone-800">Habit Completion Rhythm</h3>
            </div>
            <span className="text-xs text-stone-400 font-medium">Completed / Day</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} domain={[0, 5]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="habitsCompletedCount" stroke="#D97706" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
