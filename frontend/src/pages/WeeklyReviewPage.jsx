import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Sparkles, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

export const WeeklyReviewPage = () => {
  const [weekPlan, setWeekPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeek = async () => {
      try {
        const res = await api.getWeeklyPlan();
        if (res.success) {
          setWeekPlan(res.weeklyPlan || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchWeek();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">7-Day Horizon</span>
        <h1 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 mt-1">Your Week in Review & Ahead</h1>
        <p className="text-xs md:text-sm text-stone-500 mt-1">
          Intelligently varied daily meal rotations and pacing across the full week.
        </p>
      </div>

      {/* Weekly Insights (Section 23) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-sage-50 border border-sage-200/60 space-y-2">
          <span className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">Movement Insight</span>
          <p className="text-xs text-stone-700 leading-relaxed">
            "You were most consistent with your post-meal evening walks. Your cadence naturally peaks on weekdays."
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200/60 space-y-2">
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Nutrition Insight</span>
          <p className="text-xs text-stone-700 leading-relaxed">
            "Your meal distribution achieved optimal dietary fiber intake with diverse lentils and whole grains."
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-200/60 space-y-2">
          <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider">Sleep Rhythm</span>
          <p className="text-xs text-stone-700 leading-relaxed">
            "Maintaining your 22:15 wind-down start on weekends will further stabilize morning wakefulness."
          </p>
        </div>
      </div>

      {/* 7-Day Day-by-Day Cards */}
      <div className="space-y-4">
        <h2 className="font-serif font-bold text-2xl text-stone-800">Weekly Meal & Activity Schedule</h2>

        {loading ? (
          <div className="py-12 text-center text-xs text-stone-400">Loading weekly rotation...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {weekPlan.map((day, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <h3 className="font-serif font-bold text-lg text-stone-900">{day.dayName}</h3>
                  <span className="text-[11px] font-semibold text-forest-700 bg-sage-100 px-2 py-0.5 rounded-lg">
                    Day {i + 1}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {(day.meals || []).map((m, mIdx) => (
                    <div key={mIdx} className="flex items-start justify-between gap-2">
                      <span className="font-medium text-stone-500 shrink-0">{m.label}:</span>
                      <span className="text-stone-800 font-semibold text-right">{m.foodName}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between">
                  <span>Target: {day.activity?.targetDailySteps || 5000} steps</span>
                  <span>{day.hydration?.targetLiters || 2.5}L water</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
