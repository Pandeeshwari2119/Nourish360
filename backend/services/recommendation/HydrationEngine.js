// HydrationEngine.js
export const generateHydrationPlan = (profile) => {
  const conditions = (profile.conditions || []).map(c => c.toLowerCase());
  
  // High risk fluid restriction check
  const requiresFluidReview = conditions.some(c => 
    c.includes('heart_condition') || c.includes('kidney') || c.includes('cardiac')
  );

  if (requiresFluidReview) {
    return {
      targetLiters: null,
      targetGlasses: null,
      professionalReviewRequired: true,
      guidanceMessage: 'Based on your reported cardiovascular/renal health profile, standard automated fluid targets are paused. Please strictly adhere to the specific daily fluid volume prescribed by your treating physician.',
      safetyNotice: 'Heart and kidney conditions require individualized medical fluid management.'
    };
  }

  const weightKg = profile.weightKg || 65;
  const baseMl = weightKg * 35; // ~35ml/kg
  const targetLiters = Number(Math.min(3.5, Math.max(2.0, baseMl / 1000)).toFixed(1));
  const targetGlasses = Math.round((targetLiters * 1000) / 250);

  return {
    targetLiters,
    targetGlasses,
    glassVolumeMl: 250,
    professionalReviewRequired: false,
    guidanceMessage: `Targeting approximately ${targetLiters} Liters (${targetGlasses} glasses) spaced evenly across your day.`,
    reminders: [
      { time: '07:30', note: 'Morning awakening glass (room temperature)' },
      { time: '11:00', note: 'Mid-morning hydration check' },
      { time: '14:30', note: 'Afternoon hydration recharge' },
      { time: '18:00', note: 'Early evening water' }
    ]
  };
};
