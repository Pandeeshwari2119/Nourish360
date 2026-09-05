import React from 'react';
import { Check } from 'lucide-react';

export const Step6Activity = ({ formData, updateField, toggleArrayItem }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif font-bold text-2xl text-stone-900">Movement & Activity</h2>
        <p className="text-xs text-stone-500 mt-1">We build gradual targets tailored to your baseline.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Average Daily Steps</label>
          <input
            type="number"
            value={formData.averageDailySteps}
            onChange={(e) => updateField('averageDailySteps', Number(e.target.value))}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Fitness Experience</label>
          <select
            value={formData.fitnessExperience}
            onChange={(e) => updateField('fitnessExperience', e.target.value)}
            className="w-full px-3 py-2.5 text-xs rounded-xl border border-stone-200 bg-white"
          >
            <option value="beginner">Beginner (walking & gentle movement)</option>
            <option value="intermediate">Intermediate (regular workouts)</option>
            <option value="advanced">Advanced (athletic conditioning)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 mb-2">Preferred Activities</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {['Walking', 'Stretching', 'Yoga', 'Home workout', 'Strength', 'Cardio'].map(act => {
            const isSel = formData.preferredActivities.includes(act);
            return (
              <button
                key={act}
                type="button"
                onClick={() => toggleArrayItem('preferredActivities', act)}
                className={`p-2.5 rounded-xl border text-xs font-medium transition flex items-center justify-between ${
                  isSel ? 'bg-forest-600 text-white border-forest-600 shadow-soft' : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span>{act}</span>
                {isSel && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
