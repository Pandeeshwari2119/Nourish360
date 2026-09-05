// ConflictDetector.js
export const detectConflicts = (conditionContext, userAllergies = [], userPreferences = {}) => {
  const conflicts = [];
  let professionalReviewRequired = false;

  const { encouragedFoods, avoidFoods, nutrientGuidelines } = conditionContext;

  // Conflict 1: A food encouraged by a condition but blocked by an allergy
  for (const enc of encouragedFoods) {
    for (const allergy of userAllergies) {
      if (enc.toLowerCase().includes(allergy.toLowerCase()) || allergy.toLowerCase().includes(enc.toLowerCase())) {
        conflicts.push({
          type: 'CONDITION_VS_ALLERGY',
          item: enc,
          resolution: 'HARD_BLOCK',
          message: `Food "${enc}" is beneficial for your condition but strictly blocked due to your reported "${allergy}" allergy. Safety takes absolute precedence.`
        });
      }
    }
  }

  // Conflict 2: Mutually conflicting nutrient directives (e.g., condition A encourages potassium, condition B restricts potassium)
  const encNutrients = nutrientGuidelines.encourage || [];
  const limNutrients = nutrientGuidelines.limit || [];
  for (const nut of encNutrients) {
    if (limNutrients.includes(nut)) {
      conflicts.push({
        type: 'NUTRIENT_CONTRADICTION',
        nutrient: nut,
        resolution: 'CONSERVATIVE_SAFETY_AND_REVIEW',
        message: `Contradictory clinical guidelines detected for nutrient "${nut}". Reverting to standard baseline and requiring professional clinical review.`
      });
      professionalReviewRequired = true;
    }
  }

  return {
    hasConflicts: conflicts.length > 0,
    conflicts,
    professionalReviewRequired
  };
};
