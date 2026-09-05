import React, { useState } from 'react';
import { useWellness } from '../context/WellnessContext';
import { Droplets, Plus, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const HydrationPage = () => {
  const { plan, progress, logWater } = useWellness();
  const [customMl, setCustomMl] = useState(250);
  const [logging, setLogging] = useState(false);

  const hydration = plan?.hydrationPlan || {};
  const currentLogged = progress?.today?.waterLoggedMl || 1750;
  const targetMl = (hydration.targetLiters || 2.5) * 1000;
  const percentage = Math.min(100, Math.round((currentLogged / (targetMl || 1)) * 100));

  const handleAddWater = async (amount) => {
    setLogging(true);
    await logWater(amount);
    setLogging(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">Hydration Guidance</span>
        <h1 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 mt-1">Smart Hydration</h1>
        <p className="text-xs md:text-sm text-stone-500 mt-1">
          Evenly distributed fluid intake supporting renal filtration and metabolic energy.
        </p>
      </div>

      {/* High-Risk Clinical Review Warning if applicable */}
      {hydration.professionalReviewRequired ? (
        <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-rose-700" />
            <span>Individualized Clinical Fluid Restriction Notice</span>
          </div>
          <p className="text-xs leading-relaxed">
            {hydration.guidanceMessage}
          </p>
          <div className="text-[11px] text-rose-700 italic pt-1">
            Standard automated fluid volume goals are intentionally suppressed for your safety.
          </div>
        </div>
      ) : (
        <>
          {/* Main Hydration Progress Hero */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-sky-50 via-white to-sky-50/40 border border-sky-100 shadow-soft">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100/80 px-3 py-1 rounded-xl">
                  Today’s Intake
                </span>
                <div className="text-4xl sm:text-5xl font-bold font-serif text-stone-900">
                  {currentLogged} <span className="text-lg font-sans font-medium text-stone-400">/ {targetMl} ml</span>
                </div>
                <p className="text-xs text-stone-600 max-w-md leading-relaxed">
                  {hydration.guidanceMessage || `Targeting approximately ${hydration.targetLiters} Liters (${hydration.targetGlasses} glasses) spaced evenly across the day.`}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                  <button
                    disabled={logging}
                    onClick={() => handleAddWater(250)}
                    className="px-4 py-2.5 rounded-2xl bg-white border border-sky-200 hover:bg-sky-50 text-sky-800 text-xs font-semibold shadow-sm transition disabled:opacity-50"
                  >
                    +250 ml (1 Glass)
                  </button>
                  <button
                    disabled={logging}
                    onClick={() => handleAddWater(500)}
                    className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-soft transition disabled:opacity-50"
                  >
                    +500 ml (Bottle)
                  </button>
                </div>
              </div>

              {/* Circular Gauge */}
              <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="transparent" stroke="#E2E8F0" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="transparent"
                    stroke="#0284C7"
                    strokeWidth="8"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * percentage) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold font-serif text-stone-800">{percentage}%</span>
                  <span className="text-[10px] text-stone-400 uppercase font-semibold">Reached</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hydration Reminders Schedule */}
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-4">
            <h3 className="font-serif font-bold text-xl text-stone-800">Hydration Reminders & Pacing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {(hydration.reminders || []).map((rem, rIdx) => (
                <div key={rIdx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/60 space-y-1.5">
                  <span className="text-xs font-bold text-sky-800 bg-white px-2 py-0.5 rounded-md shadow-sm">
                    {rem.time}
                  </span>
                  <p className="text-xs text-stone-600 leading-snug">{rem.note}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
