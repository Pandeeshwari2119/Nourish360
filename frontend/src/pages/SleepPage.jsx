import React, { useState } from 'react';
import { useWellness } from '../context/WellnessContext';
import { Moon, Sparkles, CheckCircle2, Circle, ShieldCheck, Clock } from 'lucide-react';

export const SleepPage = () => {
  const { plan } = useWellness();
  const sleep = plan?.sleepPlan || {};

  const [completedItems, setCompletedItems] = useState({});

  const toggleTask = (id) => {
    setCompletedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">Rest & Recovery</span>
        <h1 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 mt-1">Circadian Sleep Routine</h1>
        <p className="text-xs md:text-sm text-stone-500 mt-1">
          Anchor your natural melatonin cycles with evidence-informed evening wind-down rituals.
        </p>
      </div>

      {/* Target Timing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-2">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Target Bedtime</span>
          <div className="text-3xl font-bold font-serif text-forest-700">
            {sleep.targetBedtime || '23:00'}
          </div>
          <p className="text-xs text-stone-500">Consistent timing improves natural sleep architecture.</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-2">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Target Wake Time</span>
          <div className="text-3xl font-bold font-serif text-forest-700">
            {sleep.targetWakeTime || '07:00'}
          </div>
          <p className="text-xs text-stone-500">Open curtains to daylight within 30 minutes of waking.</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-2">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Target Duration</span>
          <div className="text-3xl font-bold font-serif text-forest-700">
            {sleep.estimatedDurationHours || 7.5} <span className="text-sm font-sans font-medium text-stone-400">hours</span>
          </div>
          <p className="text-xs text-stone-500">Optimal restorative cycle for cellular repair.</p>
        </div>
      </div>

      {/* Wind-Down Checklist (Section 19) */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-700">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-stone-800">Evening Wind-Down Checklist</h2>
              <span className="text-xs text-stone-500">Starts at {sleep.windDownStartTime || '22:15'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {(sleep.checklist || []).map(item => {
            const isDone = completedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleTask(item.id)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                  isDone 
                    ? 'bg-sage-50/70 border-sage-200 text-stone-400 line-through' 
                    : 'bg-stone-50/50 border-stone-200/80 hover:border-forest-500/40 text-stone-800'
                }`}
              >
                <div className="flex items-center gap-3 text-xs font-medium">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-stone-300 shrink-0" />
                  )}
                  <span>{item.task}</span>
                </div>

                <span className="text-[11px] font-semibold text-forest-700 bg-white px-2.5 py-1 rounded-xl shadow-sm">
                  {item.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Non-Diagnostic Safety Disclaimer */}
      <div className="p-4 rounded-2xl bg-stone-100 text-stone-600 text-xs flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          Product safety note: Nourish360 supports daily circadian sleep hygiene. It does NOT diagnose or treat sleep apnea, chronic insomnia, or restless leg syndrome. Consult a medical sleep specialist if symptoms persist.
        </span>
      </div>
    </div>
  );
};
