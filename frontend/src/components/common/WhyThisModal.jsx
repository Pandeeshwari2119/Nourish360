// WhyThisModal.jsx
import React from 'react';
import { X, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

export const WhyThisModal = ({ isOpen, onClose, explanation }) => {
  if (!isOpen || !explanation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-6 relative border border-stone-100 overflow-hidden">
        {/* Soft decor glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-sage-100/50 rounded-full blur-2xl -z-10" />

        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sage-100 text-forest-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">Why we recommended this</h3>
              <p className="text-xs text-stone-500">Transparent recommendation reasoning</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-3">
          <h4 className="font-medium text-sm text-forest-700">{explanation.title}</h4>

          <div className="space-y-2.5">
            {(explanation.reasons || []).map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-forest-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{reason}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-500">Recommendation confidence:</span>
            <span className={`px-2 py-0.5 rounded-full font-semibold ${
              explanation.confidence === 'HIGH' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {explanation.confidence || 'MEDIUM'}
            </span>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-[11px] text-stone-500 leading-relaxed flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
            <span>{explanation.disclaimer || 'This is general lifestyle wellness guidance voluntarily generated from your profile. Not a clinical prescription.'}</span>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-semibold tracking-wide transition shadow-sm"
          >
            Got it, thank you
          </button>
        </div>
      </div>
    </div>
  );
};
