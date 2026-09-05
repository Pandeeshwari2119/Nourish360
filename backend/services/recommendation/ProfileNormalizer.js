// ProfileNormalizer.js
export const normalizeProfile = (profile) => {
  let heightCm = profile.height;
  if (profile.heightUnit === 'ft') {
    // ft to cm
    heightCm = Math.round(profile.height * 30.48);
  }

  let weightKg = profile.weight;
  if (profile.weightUnit === 'lbs' || profile.weightUnit === 'lb') {
    // lbs to kg
    weightKg = Math.round(profile.weight * 0.453592);
  }

  // Calculate BMR via Mifflin-St Jeor
  let bmr;
  if (profile.sex === 'female') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * profile.age - 161;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * profile.age + 5;
  }

  // Activity multiplier
  let activityMultiplier = 1.2; // sedentary baseline
  if (profile.averageDailySteps > 8000 || profile.exerciseFrequency === '4-5 days/week') {
    activityMultiplier = 1.55;
  } else if (profile.averageDailySteps > 5000 || profile.exerciseFrequency === '2-3 days/week') {
    activityMultiplier = 1.375;
  } else if (profile.averageDailySteps > 10000 || profile.exerciseFrequency === 'daily') {
    activityMultiplier = 1.725;
  }

  const tdee = Math.round(bmr * activityMultiplier);

  // Normalize arrays
  const allergies = (profile.allergies || []).map(a => a.toLowerCase().trim());
  const conditions = (profile.conditions || []).map(c => c.toLowerCase().trim());
  const favoriteCuisines = (profile.favoriteCuisines || ['South Indian', 'North Indian', 'Western']).map(c => c.trim());
  const goals = profile.goals || ['Balanced eating', 'Improve daily routine'];

  return {
    ...profile,
    heightCm,
    weightKg,
    bmr: Math.round(bmr),
    tdee,
    allergies,
    conditions,
    favoriteCuisines,
    goals
  };
};
