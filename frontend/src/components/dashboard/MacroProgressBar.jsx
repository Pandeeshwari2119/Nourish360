// MacroProgressBar.jsx
import React from 'react';

export const MacroProgressBar = ({ label, current = 0, target = 100, unit = 'g', color = 'bg-forest-600' }) => {
  const percentage = Math.min(100, Math.round((current / (target || 1)) * 100));

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-medium text-stone-600">
        <span>{label}</span>
        <span className="font-semibold text-stone-800">
          {target} {unit}
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percentage > 0 ? percentage : 100}%` }}
        />
      </div>
    </div>
  );
};
