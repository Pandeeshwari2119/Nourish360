// SafetyEngine.js
export const evaluateSafety = (profile) => {
  const flags = [];
  const reviewReasons = [];
  let safetyStatus = 'INFO';
  let professionalReviewRequired = false;

  const conditions = profile.conditions || [];

  // High-Risk Condition Checks
  if (conditions.includes('heart_condition') || conditions.includes('known heart condition')) {
    safetyStatus = 'PROFESSIONAL_REVIEW';
    professionalReviewRequired = true;
    reviewReasons.push(
      'You reported a known heart condition. Cardiovascular routines and strict sodium/fluid guidelines must be managed directly with your physician.'
    );
    flags.push('HIGH_RISK_CARDIOVASCULAR');
  }

  if (conditions.includes('kidney_disease') || conditions.includes('chronic kidney condition')) {
    safetyStatus = 'PROFESSIONAL_REVIEW';
    professionalReviewRequired = true;
    reviewReasons.push(
      'Renal health conditions require individualized medical management of protein, potassium, and fluid levels.'
    );
    flags.push('HIGH_RISK_RENAL');
  }

  // Metabolic conditions check
  if (conditions.includes('diabetes') || conditions.includes('hypertension')) {
    if (safetyStatus !== 'PROFESSIONAL_REVIEW') {
      safetyStatus = 'CAUTION';
    }
    flags.push('METABOLIC_CONSIDERATION');
  }

  return {
    safetyStatus,
    professionalReviewRequired,
    reviewReasons,
    safetyFlags: flags,
    disclaimer: 'Nourish360 provides general lifestyle and wellness suggestions voluntarily requested by you. This is NOT medical advice, diagnosis, or prescription. Always consult a qualified healthcare provider for clinical medical conditions.'
  };
};
