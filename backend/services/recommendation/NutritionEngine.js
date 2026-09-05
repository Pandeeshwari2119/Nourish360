// NutritionEngine.js
export const calculateNutritionEstimates = (profile) => {
  const { tdee, weightKg, goals = [] } = profile;

  let targetCalories = tdee;
  let proteinRatio = 0.20; // 20%
  let fatRatio = 0.25;     // 25%
  let carbRatio = 0.55;    // 55%

  // Goal adjustments
  if (goals.includes('Healthy weight management')) {
    targetCalories = Math.max(1400, Math.round(tdee - 300));
    proteinRatio = 0.25;
    carbRatio = 0.45;
    fatRatio = 0.30;
  } else if (goals.includes('General fitness') || goals.includes('Improve activity')) {
    proteinRatio = 0.22;
    carbRatio = 0.50;
    fatRatio = 0.28;
  }

  const proteinGrams = Math.round((targetCalories * proteinRatio) / 4);
  const fatGrams = Math.round((targetCalories * fatRatio) / 9);
  const carbGrams = Math.round((targetCalories * carbRatio) / 4);
  const fiberGrams = Math.round((targetCalories / 1000) * 14); // 14g per 1000 kcal

  // Hydration in Liters (approx 35ml per kg body weight)
  const hydrationLiters = Number(Math.min(3.5, Math.max(2.0, (weightKg * 0.035))).toFixed(1));

  return {
    calories: {
      value: targetCalories,
      unit: 'kcal',
      type: 'estimated',
      confidence: 'medium',
      basis: 'Mifflin-St Jeor TDEE formula with activity factors',
      limitations: 'General estimated wellness guidance only; not an individualized medical prescription.'
    },
    protein: {
      value: proteinGrams,
      unit: 'g',
      type: 'estimated',
      confidence: 'medium',
      basis: `${Math.round(proteinRatio * 100)}% of daily estimated caloric intake (~${(proteinGrams / weightKg).toFixed(1)}g/kg)`,
      limitations: 'May need adjustment based on individual renal or metabolic health status.'
    },
    carbohydrates: {
      value: carbGrams,
      unit: 'g',
      type: 'estimated',
      confidence: 'medium',
      basis: `${Math.round(carbRatio * 100)}% of daily estimated energy expenditure with emphasis on complex fiber sources`,
      limitations: 'People managing blood sugar should monitor postprandial glycemic response.'
    },
    fat: {
      value: fatGrams,
      unit: 'g',
      type: 'estimated',
      confidence: 'medium',
      basis: `${Math.round(fatRatio * 100)}% of daily energy primarily from unsaturated plant sources`,
      limitations: 'Avoid heavy trans and saturated fats.'
    },
    fiber: {
      value: fiberGrams,
      unit: 'g',
      type: 'estimated',
      confidence: 'high',
      basis: 'Dietary reference intake of 14g per 1,000 daily kcal',
      limitations: 'Increase fluid intake alongside fiber increments.'
    },
    hydration: {
      value: hydrationLiters,
      unit: 'Liters',
      type: 'estimated',
      confidence: 'medium',
      basis: '~35 ml/kg baseline fluid replacement guidance',
      limitations: 'Patients with physician-prescribed fluid restrictions must follow their doctor guidance.'
    }
  };
};
