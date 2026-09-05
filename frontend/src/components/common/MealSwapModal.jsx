// MealSwapModal.jsx
import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';
import { useWellness } from '../../context/WellnessContext';

export const MealSwapModal = ({ isOpen, onClose, currentMeal }) => {
  const { swapMeal } = useWellness();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [swapping, setSwapping] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && currentMeal) {
      loadCandidates();
    }
  }, [isOpen, currentMeal]);

  const loadCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getSwapCandidates(currentMeal.foodId, currentMeal.mealType);
      if (res.success) {
        setCandidates(res.alternatives || []);
      } else {
        setError(res.message || 'Could not fetch alternatives.');
      }
    } catch (e) {
      setError('Failed to connect to recommendation engine.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSwap = async (newFoodId) => {
    setSwapping(true);
    try {
      const res = await swapMeal(currentMeal.slotId, newFoodId);
      if (res.success) {
        onClose();
      } else {
        setError(res.message);
      }
    } catch (e) {
      setError('Failed to apply swap.');
    } finally {
      setSwapping(false);
    }
  };

  if (!isOpen || !currentMeal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-6 relative border border-stone-100 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sage-100 text-forest-600">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">Smart Meal Swap</h3>
              <p className="text-xs text-stone-500">Filter-safe, calorie-matched alternatives</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current meal info */}
        <div className="my-3 p-3 bg-stone-50 rounded-2xl border border-stone-200/60 flex items-center justify-between text-xs">
          <div>
            <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider">Current Selection</span>
            <div className="font-semibold text-stone-800 text-sm mt-0.5">{currentMeal.foodName}</div>
            <div className="text-stone-500 text-[11px] mt-0.5">
              {currentMeal.calories} kcal • {currentMeal.protein}g protein • {currentMeal.carbohydrates}g carbs
            </div>
          </div>
          <span className="px-2 py-1 rounded-lg bg-stone-200/80 text-stone-600 text-[11px] font-medium">
            {currentMeal.label}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-forest-700 font-medium pb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-forest-600" />
          <span>All candidates verified against your allergen & health profile</span>
        </div>

        {/* Candidates List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 my-1">
          {loading ? (
            <div className="py-12 text-center text-xs text-stone-500 flex flex-col items-center gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-forest-500" />
              <span>Checking candidate meals passing safety rules...</span>
            </div>
          ) : error ? (
            <div className="py-8 text-center text-xs text-rose-600">{error}</div>
          ) : candidates.length === 0 ? (
            <div className="py-8 text-center text-xs text-stone-500">
              No additional alternatives found matching all your strict criteria.
            </div>
          ) : (
            candidates.map(alt => (
              <div
                key={alt.foodId}
                className="p-3.5 rounded-2xl border border-stone-200/80 hover:border-forest-500/50 hover:bg-sage-50/40 transition group flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="font-semibold text-xs text-stone-800 group-hover:text-forest-700 transition">
                    {alt.name}
                  </div>
                  <div className="text-[11px] text-stone-500 flex items-center gap-2">
                    <span>{alt.calories} kcal</span>
                    <span>•</span>
                    <span>{alt.protein}g protein</span>
                    <span>•</span>
                    <span className="text-forest-600">{alt.cuisine}</span>
                  </div>
                  {alt.calorieDiff !== 0 && (
                    <div className="text-[10px] font-medium text-stone-400">
                      {alt.calorieDiff > 0 ? `+${alt.calorieDiff}` : alt.calorieDiff} kcal vs current
                    </div>
                  )}
                </div>

                <button
                  disabled={swapping}
                  onClick={() => handleSelectSwap(alt.foodId)}
                  className="px-3 py-1.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-medium transition flex items-center gap-1 shrink-0 shadow-sm disabled:opacity-50"
                >
                  <span>Select</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
