// GenerationAnimation.jsx
import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const GenerationAnimation = ({ onComplete }) => {
  const steps = [
    'Understanding your routine...',
    'Checking your preferences...',
    'Applying allergen & safety filters...',
    'Finding suitable meals & portions...',
    'Creating your personalized daily timeline...'
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 900);
      return () => clearTimeout(completeTimer);
    }
  }, [currentStep]);

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-forest-600 flex items-center justify-center text-white shadow-soft-lg animate-pulse-subtle">
          <Sparkles className="w-10 h-10 animate-spin" style={{ animationDuration: '4s' }} />
        </div>
        <div className="absolute -inset-4 rounded-full border-2 border-dashed border-forest-300/60 animate-spin" style={{ animationDuration: '14s' }} />
      </div>

      <h2 className="font-serif font-bold text-2xl md:text-3xl text-stone-900 mb-2">
        Building Your Nourish360 Plan
      </h2>
      <p className="text-xs text-stone-500 max-w-sm mb-8">
        Our multi-factor recommendation engine is calculating your personalized wellness routine.
      </p>

      <div className="w-full max-w-md space-y-3 bg-white/70 backdrop-blur-sm p-6 rounded-3xl border border-stone-200/80 shadow-soft">
        {steps.map((text, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-xs transition-all duration-300 ${
                isCurrent 
                  ? 'text-forest-700 font-bold scale-[1.02]' 
                  : isDone 
                  ? 'text-emerald-700 font-medium' 
                  : 'text-stone-400 opacity-60'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : isCurrent ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-forest-600 animate-ping" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-stone-300" />
                )}
              </div>
              <span>{text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
