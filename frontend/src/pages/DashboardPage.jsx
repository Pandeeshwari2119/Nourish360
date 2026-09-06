import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWellness } from '../context/WellnessContext';
import { SafetyBadge } from '../components/common/SafetyBadge';
import { OverviewCards } from '../components/dashboard/OverviewCards';
import { Timeline } from '../components/dashboard/Timeline';
import { MacroProgressBar } from '../components/dashboard/MacroProgressBar';
import { Sparkles, Droplets, CheckCircle2, Circle, RefreshCw, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { plan, progress, habits, toggleHabit, logWater, refreshPlan, loading, profile } = useWellness();
  const [loggingWater, setLoggingWater] = useState(false);

  const handleWaterClick = async (ml) => {
    setLoggingWater(true);
    await logWater(ml);
    setLoggingWater(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = profile?.name || user?.name || 'Friend';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 tracking-tight">
            {getGreeting()}, {displayName} 🌿
          </h1>
          <p className="text-xs md:text-sm text-stone-500 mt-1">
            Here is your explainable wellness routine for today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refreshPlan}
            disabled={loading}
            className="px-4 py-2.5 rounded-2xl bg-white border border-stone-200 hover:border-forest-500 text-stone-700 text-xs font-semibold shadow-sm transition flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-forest-600' : ''}`} />
            <span>Refresh Plan</span>
          </button>
          <Link
            to="/weekly-review"
            className="px-4 py-2.5 rounded-2xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-semibold shadow-soft transition flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Week in Review</span>
          </Link>
        </div>
      </div>

      {/* Safety Status Notification */}
      <SafetyBadge
        status={plan?.safetyStatus || 'INFO'}
        reviewRequired={plan?.professionalReviewRequired || false}
        reasons={plan?.reviewReasons || []}
      />

      {/* Overview Cards */}
      <OverviewCards plan={plan} progress={progress} />

      {/* Main Grid: Timeline + Right Sidebar Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Dynamic Timeline (Col 8) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900">Today’s Schedule</h3>
              <p className="text-xs text-stone-500">Synchronized with your declared wake time, meals, and bedtime.</p>
            </div>
          </div>

          <Timeline items={plan?.dailyTimeline || []} />
        </div>

        {/* Right: Quick Widgets (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Nutrition Snapshot */}
          <div className="p-6 rounded-3xl bg-white/90 border border-stone-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-base text-stone-800">Daily Nutrition Estimates</h4>
              <Link to="/nutrition" className="text-[11px] font-semibold text-forest-700 hover:underline">
                Details →
              </Link>
            </div>

            <div className="space-y-3 pt-1">
              <MacroProgressBar
                label="Estimated Calories"
                current={plan?.nutrition?.calories?.value || 2000}
                target={plan?.nutrition?.calories?.value || 2000}
                unit="kcal"
                color="bg-amber-500"
              />
              <MacroProgressBar
                label="Protein Target"
                current={plan?.nutrition?.protein?.value || 70}
                target={plan?.nutrition?.protein?.value || 70}
                unit="g"
                color="bg-emerald-600"
              />
              <MacroProgressBar
                label="Complex Carbs"
                current={plan?.nutrition?.carbohydrates?.value || 240}
                target={plan?.nutrition?.carbohydrates?.value || 240}
                unit="g"
                color="bg-sky-500"
              />
              <MacroProgressBar
                label="Dietary Fiber"
                current={plan?.nutrition?.fiber?.value || 30}
                target={plan?.nutrition?.fiber?.value || 30}
                unit="g"
                color="bg-teal-600"
              />
            </div>

            <p className="text-[10px] text-stone-400 italic pt-2 border-t border-stone-100">
              *General estimated wellness targets voluntarily generated; not an individualized medical prescription.
            </p>
          </div>

          {/* Quick Hydration Tracker */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-sky-50 to-white border border-sky-100 shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-stone-800">Hydration Logging</h4>
                <div className="text-xs text-sky-800 font-semibold mt-0.5">
                  {progress?.today?.waterLoggedMl || 1750} ml / {(plan?.hydrationPlan?.targetLiters || 2.5) * 1000} ml
                </div>
              </div>
            </div>

            {plan?.hydrationPlan?.professionalReviewRequired ? (
              <div className="p-3 bg-amber-50 rounded-xl text-[11px] text-amber-800">
                {plan.hydrationPlan.guidanceMessage}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  disabled={loggingWater}
                  onClick={() => handleWaterClick(250)}
                  className="py-2.5 px-3 rounded-2xl bg-white border border-sky-200 hover:bg-sky-50 text-xs font-semibold text-sky-800 transition shadow-sm disabled:opacity-50"
                >
                  +250 ml (1 glass)
                </button>
                <button
                  disabled={loggingWater}
                  onClick={() => handleWaterClick(500)}
                  className="py-2.5 px-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-xs font-semibold text-white transition shadow-sm disabled:opacity-50"
                >
                  +500 ml (Bottle)
                </button>
              </div>
            )}
          </div>

          {/* Micro Habits Quick Check */}
          <div className="p-6 rounded-3xl bg-white/90 border border-stone-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-forest-600" />
                <h4 className="font-serif font-bold text-base text-stone-800">Daily Micro-Habits</h4>
              </div>
              <Link to="/habits" className="text-[11px] font-semibold text-forest-700 hover:underline">
                View all →
              </Link>
            </div>

            <div className="space-y-2.5">
              {(habits || []).slice(0, 4).map(habit => (
                <button
                  key={habit.habitId}
                  onClick={() => toggleHabit(habit.habitId)}
                  className={`w-full p-3 rounded-2xl border text-left text-xs transition flex items-center justify-between gap-2 ${
                    habit.completedToday
                      ? 'bg-sage-50/70 border-sage-200 text-stone-500 line-through'
                      : 'bg-white border-stone-200/80 hover:border-forest-500/40 text-stone-800'
                  }`}
                >
                  <span className="font-medium">{habit.title}</span>
                  {habit.completedToday ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-stone-300 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
