import React from 'react';
import { Sparkles } from 'lucide-react';

export const Step9Review = ({ formData }) => {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">Profile Review</span>
        <h2 className="font-serif font-bold text-2xl text-stone-900 mt-0.5">Your Nourish360 Profile</h2>
        <p className="text-xs text-stone-500">Review your voluntarily submitted health and lifestyle profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-1">
          <span className="text-stone-400 font-bold uppercase text-[10px]">About You</span>
          <div className="font-semibold text-stone-800">{formData.name || 'User'}, {formData.age} yrs • {formData.sex}</div>
          <div className="text-stone-500">{formData.height} {formData.heightUnit} • {formData.weight} {formData.weightUnit}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-1">
          <span className="text-stone-400 font-bold uppercase text-[10px]">Health & Allergies</span>
          <div className="font-semibold text-stone-800">
            {formData.hasNoConditions ? 'No diagnosed conditions' : formData.conditions.join(', ') || 'None reported'}
          </div>
          <div className="text-stone-500">
            Allergies: {formData.allergies.length > 0 ? formData.allergies.join(', ') : 'None'}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-1">
          <span className="text-stone-400 font-bold uppercase text-[10px]">Diet & Schedule</span>
          <div className="font-semibold text-stone-800">{formData.dietaryPattern} • {formData.favoriteCuisines.join(', ')}</div>
          <div className="text-stone-500">Breakfast: {formData.breakfastTime} | Lunch: {formData.lunchTime} | Dinner: {formData.dinnerTime}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-1">
          <span className="text-stone-400 font-bold uppercase text-[10px]">Activity & Sleep</span>
          <div className="font-semibold text-stone-800">{formData.averageDailySteps} baseline steps • {formData.fitnessExperience}</div>
          <div className="text-stone-500">Sleep: {formData.wakeTime} – {formData.bedtime} ({formData.sleepDuration} hrs)</div>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-sage-50 border border-sage-200/50 text-[11px] text-stone-600 flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
        <span>
          Our explainable recommendation engine will analyze each recipe against your safety boundary, schedule, and preferences.
        </span>
      </div>
    </div>
  );
};
