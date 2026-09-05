import React, { useState } from 'react';
import { useWellness } from '../context/WellnessContext';
import { MacroProgressBar } from '../components/dashboard/MacroProgressBar';
import { WhyThisModal } from '../components/common/WhyThisModal';
import { MealSwapModal } from '../components/common/MealSwapModal';
import { Utensils, ShieldAlert, Sparkles, RefreshCw, HelpCircle, CheckCircle2 } from 'lucide-react';

export const NutritionPage = () => {
  const { plan } = useWellness();
  const [selectedWhy, setSelectedWhy] = useState(null);
  const [selectedSwap, setSelectedSwap] = useState(null);

  const nutrition = plan?.nutrition || {};
  const meals = plan?.meals || [];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">Nutrition Intelligence</span>
        <h1 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 mt-1">
          Estimated Daily Nutrition
        </h1>
        <p className="text-xs md:text-sm text-stone-500 mt-1 max-w-2xl leading-relaxed">
          Calculated using standard metabolic equations (Mifflin-St Jeor) and adapted to your voluntary goals and dietary pattern.
        </p>
      </div>

      {/* Prominent Medical Notice */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">General Estimated Wellness Guidance: </span>
          <span>
            These nutritional targets are lifestyle estimates, NOT clinical prescriptions. Individuals with diabetes, renal conditions, or specific medical requirements should coordinate condition-specific targets with a licensed healthcare provider.
          </span>
        </div>
      </div>

      {/* Nutrition Macro Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Calories', val: nutrition.calories?.value || 2000, unit: 'kcal', color: 'bg-amber-500', basis: nutrition.calories?.basis },
          { label: 'Protein', val: nutrition.protein?.value || 75, unit: 'g', color: 'bg-emerald-600', basis: nutrition.protein?.basis },
          { label: 'Carbohydrates', val: nutrition.carbohydrates?.value || 250, unit: 'g', color: 'bg-sky-500', basis: nutrition.carbohydrates?.basis },
          { label: 'Fat', val: nutrition.fat?.value || 60, unit: 'g', color: 'bg-indigo-500', basis: nutrition.fat?.basis },
          { label: 'Fiber', val: nutrition.fiber?.value || 30, unit: 'g', color: 'bg-teal-600', basis: nutrition.fiber?.basis },
        ].map((item, i) => (
          <div key={i} className="p-5 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-3">
            <div className="text-xs font-semibold text-stone-500">{item.label}</div>
            <div className="text-2xl font-bold font-serif text-stone-800">
              {item.val} <span className="text-xs font-sans font-medium text-stone-400">{item.unit}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden">
              <div className={`h-full ${item.color} rounded-full`} style={{ width: '100%' }} />
            </div>
            <p className="text-[10px] text-stone-400 leading-snug line-clamp-2">
              {item.basis || 'General wellness estimation'}
            </p>
          </div>
        ))}
      </div>

      {/* Today's Meal Plan (Section 14) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-200">
          <div>
            <h2 className="font-serif font-bold text-2xl text-stone-900">Today’s Meal Plan</h2>
            <p className="text-xs text-stone-500">Filtered for allergies and aligned with your schedule.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meals.map((meal) => (
            <div
              key={meal.slotId}
              className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft hover:shadow-soft-lg transition space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-forest-700 bg-sage-100 px-3 py-1 rounded-xl">
                    {meal.label} • {meal.suggestedTime}
                  </span>
                  <span className="text-xs font-semibold text-stone-500">{meal.cuisine}</span>
                </div>

                <h3 className="font-serif font-bold text-lg text-stone-800 mt-1">{meal.foodName}</h3>
                <div className="text-xs text-stone-500 mt-0.5">{meal.servingSize}</div>

                <div className="grid grid-cols-4 gap-2 py-3 border-y border-stone-100 my-3 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 block">Calories</span>
                    <span className="font-bold text-stone-700">{meal.calories} kcal</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">Protein</span>
                    <span className="font-bold text-stone-700">{meal.protein}g</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">Carbs</span>
                    <span className="font-bold text-stone-700">{meal.carbohydrates}g</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">Fiber</span>
                    <span className="font-bold text-stone-700">{meal.fiber}g</span>
                  </div>
                </div>

                {meal.ingredients && (
                  <div className="text-[11px] text-stone-500">
                    <span className="font-semibold text-stone-600">Key ingredients: </span>
                    {meal.ingredients.slice(0, 5).join(', ')}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setSelectedWhy({
                    title: `${meal.label}: ${meal.foodName}`,
                    reasons: [
                      `Matches your dietary preference (${meal.cuisine} cuisine)`,
                      `Verified free of your listed allergens`,
                      `Supports your target meal schedule (${meal.suggestedTime})`
                    ],
                    confidence: meal.confidence
                  })}
                  className="text-xs font-semibold text-stone-500 hover:text-forest-700 transition flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Why this meal?</span>
                </button>

                <button
                  onClick={() => setSelectedSwap(meal)}
                  className="px-3.5 py-1.5 rounded-xl bg-sage-100 hover:bg-forest-600 hover:text-white text-forest-800 text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Swap</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Micronutrient Awareness (Section 33) */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-4">
        <div className="flex items-center gap-2 text-forest-700">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-serif font-bold text-xl text-stone-900">Micronutrient Awareness</h3>
        </div>
        <p className="text-xs text-stone-500 leading-relaxed">
          Whole-food sources of essential micronutrients are prioritized across your recommendations.
          Nourish360 does not prescribe synthetic supplements. For documented deficiencies, always consult your physician.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
          {[
            { name: 'Iron', benefit: 'Supports oxygen transport', sources: 'Spinach, Lentils, Pomegranate' },
            { name: 'Calcium', benefit: 'Bone & muscle function', sources: 'Ragi, Yogurt, Sesame' },
            { name: 'Vitamin D', benefit: 'Immunity & calcium uptake', sources: 'Sunlight daylight walk, Salmon' },
            { name: 'Vitamin B12', benefit: 'Nerve & cellular health', sources: 'Dairy, Fermented foods' },
            { name: 'Potassium', benefit: 'Electrolyte & blood pressure balance', sources: 'Bananas, Coconut, Sweet potato' }
          ].map((micro, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/60 text-xs space-y-1">
              <span className="font-bold text-stone-800">{micro.name}</span>
              <p className="text-[11px] text-stone-500 leading-snug">{micro.benefit}</p>
              <div className="text-[10px] text-forest-700 font-medium pt-1">Foods: {micro.sources}</div>
            </div>
          ))}
        </div>
      </div>

      <WhyThisModal
        isOpen={Boolean(selectedWhy)}
        onClose={() => setSelectedWhy(null)}
        explanation={selectedWhy}
      />

      <MealSwapModal
        isOpen={Boolean(selectedSwap)}
        onClose={() => setSelectedSwap(null)}
        currentMeal={selectedSwap}
      />
    </div>
  );
};
