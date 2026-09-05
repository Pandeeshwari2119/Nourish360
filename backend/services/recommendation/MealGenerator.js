// MealGenerator.js
import { Food } from '../../models/schemas.js';
import { scoreFoodCandidate } from './FoodRankingEngine.js';

export const generateMealPlan = async (profile, conditionContext, userFeedbackMap = {}) => {
  const allFoods = await Food.find({});

  const mealSlots = [
    { type: 'breakfast', label: 'Breakfast', time: profile.breakfastTime || '08:30' },
    { type: 'lunch', label: 'Lunch', time: profile.lunchTime || '13:00' },
    { type: 'snack', label: 'Evening Refreshment', time: '17:00' },
    { type: 'dinner', label: 'Dinner', time: profile.dinnerTime || '20:30' }
  ];

  // If user requested snacks or has 4+ meals
  if (profile.numberOfMeals >= 4 || profile.snackFrequency === 'often') {
    mealSlots.splice(1, 0, { type: 'snack', label: 'Morning Snack', time: '10:45' });
  }

  const selectedMeals = [];
  const chosenFoodIds = new Set();

  for (const slot of mealSlots) {
    const scoredCandidates = [];

    for (const food of allFoods) {
      if (chosenFoodIds.has(food.foodId)) continue; // avoid exact duplicate in same day

      const result = scoreFoodCandidate(food, {
        profile,
        conditionContext,
        targetMealType: slot.type,
        userFeedbackMap
      });

      if (result.eligible) {
        scoredCandidates.push({
          food,
          score: result.candidateScore,
          scoreBreakdown: result.scoreBreakdown
        });
      }
    }

    scoredCandidates.sort((a, b) => b.score - a.score);

    if (scoredCandidates.length > 0) {
      const best = scoredCandidates[0];
      chosenFoodIds.add(best.food.foodId);

      selectedMeals.push({
        slotId: `slot_${slot.type}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        mealType: slot.type,
        label: slot.label,
        suggestedTime: slot.time,
        foodId: best.food.foodId,
        foodName: best.food.name,
        cuisine: best.food.cuisine,
        servingSize: best.food.servingSize,
        calories: best.food.calories,
        protein: best.food.protein,
        carbohydrates: best.food.carbohydrates,
        fat: best.food.fat,
        fiber: best.food.fiber,
        allergens: best.food.allergens,
        ingredients: best.food.ingredients,
        tags: best.food.tags,
        confidence: best.score > 60 ? 'HIGH' : 'MEDIUM',
        scoreBreakdown: best.scoreBreakdown,
        completed: false
      });
    }
  }

  return selectedMeals;
};
