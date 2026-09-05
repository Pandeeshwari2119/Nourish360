import React from 'react';

export const Step1About = ({ formData, updateField }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif font-bold text-2xl text-stone-900">About You</h2>
        <p className="text-xs text-stone-500 mt-1">Let’s begin with your essential baseline details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Your Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-forest-500"
            placeholder="e.g. Maya"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Age (Years)</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => updateField('age', Number(e.target.value))}
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-forest-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Sex Assigned at Birth</label>
          <select
            value={formData.sex}
            onChange={(e) => updateField('sex', e.target.value)}
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-forest-500 bg-white"
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other / Prefer not to specify</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Region / Country</label>
          <input
            type="text"
            value={formData.region}
            onChange={(e) => updateField('region', e.target.value)}
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-stone-700">Height</label>
            <div className="flex text-[10px] bg-stone-100 rounded-lg p-0.5 font-medium">
              <button
                type="button"
                onClick={() => updateField('heightUnit', 'cm')}
                className={`px-2 py-0.5 rounded-md ${formData.heightUnit === 'cm' ? 'bg-white shadow-sm text-forest-700 font-bold' : 'text-stone-500'}`}
              >
                cm
              </button>
              <button
                type="button"
                onClick={() => updateField('heightUnit', 'ft')}
                className={`px-2 py-0.5 rounded-md ${formData.heightUnit === 'ft' ? 'bg-white shadow-sm text-forest-700 font-bold' : 'text-stone-500'}`}
              >
                ft
              </button>
            </div>
          </div>
          <input
            type="number"
            step="0.1"
            value={formData.height}
            onChange={(e) => updateField('height', Number(e.target.value))}
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-stone-700">Weight</label>
            <div className="flex text-[10px] bg-stone-100 rounded-lg p-0.5 font-medium">
              <button
                type="button"
                onClick={() => updateField('weightUnit', 'kg')}
                className={`px-2 py-0.5 rounded-md ${formData.weightUnit === 'kg' ? 'bg-white shadow-sm text-forest-700 font-bold' : 'text-stone-500'}`}
              >
                kg
              </button>
              <button
                type="button"
                onClick={() => updateField('weightUnit', 'lbs')}
                className={`px-2 py-0.5 rounded-md ${formData.weightUnit === 'lbs' ? 'bg-white shadow-sm text-forest-700 font-bold' : 'text-stone-500'}`}
              >
                lbs
              </button>
            </div>
          </div>
          <input
            type="number"
            step="0.1"
            value={formData.weight}
            onChange={(e) => updateField('weight', Number(e.target.value))}
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200"
          />
        </div>
      </div>
    </div>
  );
};
