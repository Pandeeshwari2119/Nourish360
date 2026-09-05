// FoodRankingEngine.js
import { checkAllergies } from './AllergyEngine.js';
import { checkDietaryPattern } from './DietaryFilter.js';
import { checkFoodConditionFit } from './ConditionRuleEngine.js';

export const scoreFoodCandidate = (food, context) => {
  const { profile, conditionContext, targetMealType, userFeedbackMap = {} } = context;

  // 1. HARD SAFETY CHECK: Allergies
  const allergyCheck = checkAllergies(food, profile.allergies);
  if (!allergyCheck.passed) {
    return { candidateScore: -999, eligible: false, blockedReason: allergyCheck.blockedReason };
  }

  // 2. HARD SAFETY CHECK: Dietary pattern
  const dietaryCheck = checkDietaryPattern(food, profile.dietaryPattern, profile.otherRestrictions);
  if (!dietaryCheck.passed) {
    return { candidateScore: -999, eligible: false, blockedReason: dietaryCheck.blockedReason };
  }

  // 3. HARD SAFETY CHECK: Condition rules avoid list
  const conditionCheck = checkFoodConditionFit(food, conditionContext);
  if (!conditionCheck.suitable) {
    return { candidateScore: -999, eligible: false, blockedReason: conditionCheck.reason };
  }

  // Scoring weights
  let nutritionFit = 20;
  let goalFit = 15;
  let preferenceFit = 10;
  let scheduleFit = 10;
  let cuisineFit = 10;
  let budgetFit = 5;
  let varietyScore = 10;
  let convenienceScore = 10;

  // Cuisines fit
  const userCuisines = (profile.favoriteCuisines || []).map(c => c.toLowerCase());
  if (userCuisines.length > 0 && userCuisines.some(c => food.cuisine.toLowerCase().includes(c))) {
    cuisineFit += 15;
  }

  // Preferences: favorites add bonus, dislikes subtract
  const favorites = (profile.foodPreferences?.favorites || []).map(f => f.toLowerCase());
  const disliked = (profile.foodPreferences?.disliked || []).map(d => d.toLowerCase());
  const foodName = food.name.toLowerCase();

  if (favorites.some(fav => foodName.includes(fav))) {
    preferenceFit += 25;
  }
  if (disliked.some(dis => foodName.includes(dis))) {
    preferenceFit -= 30;
  }

  // Meal Type Alignment
  if (food.mealTypes && food.mealTypes.includes(targetMealType)) {
    scheduleFit += 20;
  } else {
    scheduleFit -= 15;
  }

  // Condition encourage bonus
  nutritionFit += conditionCheck.scoreMod;

  // Feedback history
  let feedbackScore = 0;
  if (userFeedbackMap[food.foodId] === 'loved') {
    feedbackScore += 20;
  } else if (userFeedbackMap[food.foodId] === 'disliked') {
    feedbackScore -= 40;
  }

  const candidateScore = nutritionFit + goalFit + preferenceFit + scheduleFit + cuisineFit + budgetFit + varietyScore + convenienceScore + feedbackScore;

  return {
    candidateScore,
    eligible: true,
    blockedReason: null,
    scoreBreakdown: {
      nutritionFit,
      goalFit,
      preferenceFit,
      scheduleFit,
      cuisineFit,
      budgetFit,
      varietyScore,
      convenienceScore,
      feedbackScore
    }
  };
};
