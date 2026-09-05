import React from 'react';
import { useWellness } from '../context/WellnessContext';
import { Sparkles, CheckCircle2, Circle, Flame, HeartHandshake } from 'lucide-react';

export const HabitsPage = () => {
  const { habits, toggleHabit } = useWellness();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">Sustainable Micro-Habits</span>
        <h1 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 mt-1">Daily Micro-Habits</h1>
        <p className="text-xs md:text-sm text-stone-500 mt-1">
          Small, focused actions selected specifically for your routine without overwhelming you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(habits || []).map((habit, idx) => (
          <div
            key={habit.habitId || idx}
            onClick={() => toggleHabit(habit.habitId)}
            className={`p-6 rounded-3xl border transition cursor-pointer flex items-start justify-between gap-4 ${
              habit.completedToday
                ? 'bg-sage-50/70 border-sage-200'
                : 'bg-white border-stone-200 shadow-soft hover:shadow-soft-lg hover:border-forest-500/40'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded-lg">
                  {habit.category}
                </span>
                <span className="text-xs text-amber-600 font-semibold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  Daily streak
                </span>
              </div>

              <h3 className={`font-serif font-bold text-lg ${habit.completedToday ? 'line-through text-stone-400' : 'text-stone-800'}`}>
                {habit.title}
              </h3>

              <p className="text-xs text-stone-500 leading-relaxed max-w-sm">
                {habit.description}
              </p>
            </div>

            <button className="mt-1 shrink-0">
              {habit.completedToday ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              ) : (
                <Circle className="w-6 h-6 text-stone-300 hover:text-forest-400 transition" />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-3xl bg-cream-50 border border-stone-200/70 text-xs text-stone-600 flex items-center gap-3">
        <HeartHandshake className="w-6 h-6 text-forest-600 shrink-0" />
        <div>
          <span className="font-bold text-stone-800">Behavioral Science Principle: </span>
          <span>We limit active habits to 3–5 to prevent decision fatigue and ensure high long-term adherence.</span>
        </div>
      </div>
    </div>
  );
};
