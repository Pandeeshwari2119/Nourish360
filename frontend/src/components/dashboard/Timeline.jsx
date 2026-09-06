// Timeline.jsx
import React, { useState } from 'react';
import { useWellness } from '../../context/WellnessContext';
import { WhyThisModal } from '../common/WhyThisModal';
import { MealSwapModal } from '../common/MealSwapModal';
import { 
  Utensils, 
  Footprints, 
  Droplets, 
  Moon, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  HelpCircle, 
  RefreshCw 
} from 'lucide-react';

export const Timeline = ({ items = [] }) => {
  const { toggleTimelineItem } = useWellness();
  const [selectedWhy, setSelectedWhy] = useState(null);
  const [selectedSwap, setSelectedSwap] = useState(null);

  const getIcon = (type) => {
    switch (type) {
      case 'meal': return Utensils;
      case 'activity': return Footprints;
      case 'hydration': return Droplets;
      case 'sleep': return Moon;
      default: return Sparkles;
    }
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case 'meal': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'activity': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'hydration': return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'sleep': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-sage-100 text-forest-800 border-sage-200';
    }
  };

  return (
    <div className="relative pl-6 md:pl-8 space-y-6 before:absolute before:left-3 md:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-200/80">
      {items.map((item, index) => {
        const Icon = getIcon(item.type);
        const style = getTypeStyle(item.type);

        return (
          <div key={item.id || index} className="relative group">
            {/* Timeline Node Point (Clickable) */}
            <button
              onClick={() => toggleTimelineItem(item.id)}
              className={`absolute -left-6 md:-left-8 top-3.5 w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${style} transition transform group-hover:scale-110 cursor-pointer`}
              title="Click to toggle complete"
            >
              {item.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              ) : (
                <Icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
              )}
            </button>

            {/* Timeline Card */}
            <div className={`p-4 md:p-5 rounded-3xl border transition-all ${
              item.completed 
                ? 'bg-stone-50/80 border-stone-200/60 opacity-60' 
                : 'bg-white/95 border-stone-200/80 shadow-soft hover:shadow-soft-lg hover:border-forest-500/40'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-forest-700 bg-sage-50 px-2.5 py-0.5 rounded-lg border border-sage-200/60">
                    {item.time}
                  </span>
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md ${style}`}>
                    {item.label || item.type}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  {item.explanation && (
                    <button
                      onClick={() => setSelectedWhy(item.explanation)}
                      className="text-[11px] text-stone-500 hover:text-forest-700 font-medium px-2 py-1 rounded-lg hover:bg-stone-100 transition flex items-center gap-1 cursor-pointer"
                      title="Why was this recommended?"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span className="hidden xs:inline">Why this?</span>
                    </button>
                  )}

                  {item.type === 'meal' && item.foodDetails && (
                    <button
                      onClick={() => setSelectedSwap({
                        slotId: item.id,
                        label: item.label,
                        foodId: item.foodDetails.foodId,
                        foodName: item.foodDetails.name,
                        mealType: item.foodDetails.mealType || item.label.toLowerCase()
                      })}
                      className="text-[11px] text-stone-600 hover:text-forest-800 font-medium px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 transition flex items-center gap-1 cursor-pointer"
                      title="Swap this meal"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Swap</span>
                    </button>
                  )}

                  {/* Large Checkbox Touch Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTimelineItem(item.id);
                    }}
                    className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-forest-600 transition cursor-pointer flex items-center justify-center"
                    title={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    aria-label="Toggle task completion"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-400 hover:text-stone-600" />
                    )}
                  </button>
                </div>
              </div>

              <div 
                onClick={() => toggleTimelineItem(item.id)}
                className="cursor-pointer select-none"
              >
                <h4 className={`text-sm md:text-base font-semibold ${item.completed ? 'line-through text-stone-400' : 'text-stone-800'}`}>
                  {item.title}
                </h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.foodDetails && (
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-3 pt-2.5 border-t border-stone-100 text-[11px] text-stone-600">
                  <span className="font-semibold text-stone-700">{item.foodDetails.calories} kcal</span>
                  <span>•</span>
                  <span>{item.foodDetails.protein}g protein</span>
                  <span>•</span>
                  <span>{item.foodDetails.carbohydrates}g carbs</span>
                  <span>•</span>
                  <span>{item.foodDetails.fiber}g fiber</span>
                </div>
              )}
            </div>
          </div>
        );
      })}

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