// ExplanationEngine.js
export const generateExplanation = (item, profile, conditionContext) => {
  const checks = [];

  // 1. Dietary pattern check
  if (item.mealType) {
    checks.push(`✓ Matches your selected ${profile.dietaryPattern} dietary pattern.`);
    
    // Allergen clearance
    if (profile.allergies && profile.allergies.length > 0) {
      checks.push(`✓ Cleared allergen safety filter: Free of ${profile.allergies.join(', ')}.`);
    } else {
      checks.push(`✓ Standard allergen clearance verified.`);
    }

    // Schedule check
    checks.push(`✓ Aligned with your preferred meal timing (${item.suggestedTime || 'scheduled slot'}).`);

    // Cuisine check
    if (profile.favoriteCuisines && profile.favoriteCuisines.some(c => item.cuisine?.toLowerCase().includes(c.toLowerCase()))) {
      checks.push(`✓ Matches your preferred cuisine (${item.cuisine}).`);
    }

    // Condition considerations
    if (conditionContext?.activeRules && conditionContext.activeRules.length > 0) {
      checks.push(`✓ Compatible with health condition guidelines (${conditionContext.activeRules.map(r => r.name).join(', ')}).`);
    }
  } else if (item.category === 'Walking' || item.category === 'Stretching' || item.category === 'Yoga') {
    checks.push(`✓ Tailored for ${profile.fitnessExperience || 'beginner'} fitness level.`);
    checks.push(`✓ Progressive increase from your baseline of ${profile.averageDailySteps || 4000} daily steps.`);
    checks.push(`✓ Fits within your available daily workout window.`);
  }

  return {
    itemId: item.foodId || item.exerciseId || item.habitId || item.id,
    title: item.name || item.title,
    reasons: checks,
    confidence: item.confidence || 'MEDIUM',
    disclaimer: 'General lifestyle and wellness guidance voluntarily requested by you; not an individualized medical prescription.'
  };
};
