import React from 'react';
import { Check } from 'lucide-react';

export const Step3Allergies = ({ formData, updateField, toggleArrayItem }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif font-bold text-2xl text-stone-900">Allergies & Dietary Pattern</h2>
        <p className="text-xs text-stone-500 mt-1">
          Allergies are enforced as strict, hard blocks in our recommendation engine.
        </p>
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 mb-2">Dietary Pattern</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {['Vegetarian', 'Vegan', 'Eggetarian', 'Non-vegetarian'].map(pattern => (
            <button
              key={pattern}
              type="button"
              onClick={() => updateField('dietaryPattern', pattern)}
              className={`p-3 rounded-2xl border text-xs font-semibold transition ${
                formData.dietaryPattern === pattern
                  ? 'bg-forest-600 text-white border-forest-600 shadow-soft'
                  : 'border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {pattern}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 mb-2">Reported Allergies (Hard Filter)</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {['Peanuts', 'Tree nuts', 'Milk', 'Eggs', 'Soy', 'Wheat', 'Seafood', 'Sesame', 'Coconut'].map(allergy => {
            const isSel = formData.allergies.includes(allergy.toLowerCase());
            return (
              <button
                key={allergy}
                type="button"
                onClick={() => toggleArrayItem('allergies', allergy.toLowerCase())}
                className={`p-2.5 rounded-xl border text-xs font-medium transition flex items-center justify-between ${
                  isSel ? 'bg-rose-50 border-rose-400 text-rose-800 font-semibold' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span>{allergy}</span>
                {isSel && <Check className="w-3.5 h-3.5 text-rose-600" />}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 mb-2">Other Restrictions</label>
        <div className="grid grid-cols-2 gap-2">
          {['Dairy-free', 'Gluten-free'].map(res => {
            const isSel = formData.otherRestrictions.includes(res.toLowerCase());
            return (
              <button
                key={res}
                type="button"
                onClick={() => toggleArrayItem('otherRestrictions', res.toLowerCase())}
                className={`p-2.5 rounded-xl border text-xs font-medium transition flex items-center justify-between ${
                  isSel ? 'bg-sage-100 border-forest-600 text-forest-800 font-semibold' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span>{res}</span>
                {isSel && <Check className="w-3.5 h-3.5 text-forest-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
