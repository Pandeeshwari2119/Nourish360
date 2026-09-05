import React from 'react';

export const Step7Sleep = ({ formData, updateField }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif font-bold text-2xl text-stone-900">Sleep Routine</h2>
        <p className="text-xs text-stone-500 mt-1">Restorative sleep is the cornerstone of recovery.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Average Sleep Duration (Hours)</label>
          <input
            type="number"
            step="0.5"
            value={formData.sleepDuration}
            onChange={(e) => updateField('sleepDuration', Number(e.target.value))}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Sleep Consistency</label>
          <select
            value={formData.sleepConsistency}
            onChange={(e) => updateField('sleepConsistency', e.target.value)}
            className="w-full px-3 py-2.5 text-xs rounded-xl border border-stone-200 bg-white"
          >
            <option value="consistent">Consistent schedule</option>
            <option value="moderate">Moderate variance</option>
            <option value="variable">Variable schedule</option>
          </select>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <label className="flex items-center gap-3 p-3 rounded-2xl border border-stone-200 cursor-pointer hover:bg-stone-50 transition">
          <input
            type="checkbox"
            checked={formData.screenUseBeforeBed}
            onChange={(e) => updateField('screenUseBeforeBed', e.target.checked)}
            className="rounded text-forest-600"
          />
          <span className="text-xs text-stone-700">I regularly use digital screens within 45 mins of bedtime</span>
        </label>

        <label className="flex items-center gap-3 p-3 rounded-2xl border border-stone-200 cursor-pointer hover:bg-stone-50 transition">
          <input
            type="checkbox"
            checked={formData.nightEating}
            onChange={(e) => updateField('nightEating', e.target.checked)}
            className="rounded text-forest-600"
          />
          <span className="text-xs text-stone-700">I often eat snacks right before sleeping</span>
        </label>
      </div>
    </div>
  );
};
