import React from 'react';

export const Step5Routine = ({ formData, updateField }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif font-bold text-2xl text-stone-900">Daily Routine & Rhythm</h2>
        <p className="text-xs text-stone-500 mt-1">Circadian timing and daily schedule parameters.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Typical Wake Time</label>
          <input
            type="time"
            value={formData.wakeTime}
            onChange={(e) => updateField('wakeTime', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Typical Bedtime</label>
          <input
            type="time"
            value={formData.bedtime}
            onChange={(e) => updateField('bedtime', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Sitting Hours per Day</label>
          <input
            type="number"
            value={formData.sittingHours}
            onChange={(e) => updateField('sittingHours', Number(e.target.value))}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Stress Level</label>
          <select
            value={formData.stressLevel}
            onChange={(e) => updateField('stressLevel', e.target.value)}
            className="w-full px-3 py-2.5 text-xs rounded-xl border border-stone-200 bg-white"
          >
            <option value="low">Low / Relaxed</option>
            <option value="moderate">Moderate / Standard</option>
            <option value="high">High / Demanding</option>
          </select>
        </div>
      </div>
    </div>
  );
};
