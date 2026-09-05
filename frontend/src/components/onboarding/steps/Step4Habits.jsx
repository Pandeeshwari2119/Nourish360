import React from 'react';
import { Check } from 'lucide-react';

export const Step4Habits = ({ formData, updateField, toggleArrayItem }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif font-bold text-2xl text-stone-900">Food Habits & Schedule</h2>
        <p className="text-xs text-stone-500 mt-1">We align meals with your actual routine hours.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Breakfast Time</label>
          <input
            type="time"
            value={formData.breakfastTime}
            onChange={(e) => updateField('breakfastTime', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Lunch Time</label>
          <input
            type="time"
            value={formData.lunchTime}
            onChange={(e) => updateField('lunchTime', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Dinner Time</label>
          <input
            type="time"
            value={formData.dinnerTime}
            onChange={(e) => updateField('dinnerTime', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 mb-2">Favorite Regional Cuisines</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {['South Indian', 'North Indian', 'Asian', 'Western', 'Mediterranean'].map(cuisine => {
            const isSel = formData.favoriteCuisines.includes(cuisine);
            return (
              <button
                key={cuisine}
                type="button"
                onClick={() => toggleArrayItem('favoriteCuisines', cuisine)}
                className={`p-2.5 rounded-xl border text-xs font-medium transition flex items-center justify-between ${
                  isSel ? 'bg-forest-600 text-white border-forest-600 shadow-soft' : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span>{cuisine}</span>
                {isSel && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Meals Per Day</label>
          <select
            value={formData.numberOfMeals}
            onChange={(e) => updateField('numberOfMeals', Number(e.target.value))}
            className="w-full px-3 py-2.5 text-xs rounded-xl border border-stone-200 bg-white"
          >
            <option value={3}>3 Main Meals (Breakfast, Lunch, Dinner)</option>
            <option value={4}>4 Meals (With Refreshment)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">Cooking Frequency</label>
          <select
            value={formData.cookingAvailability}
            onChange={(e) => updateField('cookingAvailability', e.target.value)}
            className="w-full px-3 py-2.5 text-xs rounded-xl border border-stone-200 bg-white"
          >
            <option value="often">Cook fresh daily</option>
            <option value="moderate">Cook 2-3 times per week / batch prep</option>
            <option value="limited">Quick 15-minute meals only</option>
          </select>
        </div>
      </div>
    </div>
  );
};
