import React from 'react';
import { Check } from 'lucide-react';

export const Step8Goals = ({ formData, toggleArrayItem }) => {
  const goalsList = [
    'Balanced eating',
    'Improve daily routine',
    'Improve activity',
    'Improve sleep consistency',
    'Improve hydration',
    'General fitness',
    'Healthy weight management',
    'Build healthy habits'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif font-bold text-2xl text-stone-900">Your Wellness Goals</h2>
        <p className="text-xs text-stone-500 mt-1">Select all areas you want to prioritize.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {goalsList.map(goal => {
          const isSel = formData.goals.includes(goal);
          return (
            <button
              key={goal}
              type="button"
              onClick={() => toggleArrayItem('goals', goal)}
              className={`p-3.5 rounded-2xl border text-xs font-semibold transition text-left flex items-center justify-between ${
                isSel
                  ? 'bg-forest-600 text-white border-forest-600 shadow-soft'
                  : 'border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span>{goal}</span>
              {isSel && <Check className="w-4 h-4 text-white" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
