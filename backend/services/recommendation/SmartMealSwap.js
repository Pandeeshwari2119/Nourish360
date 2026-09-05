// SmartMealSwap.js
import { Food } from '../../models/schemas.js';
import { scoreFoodCandidate } from './FoodRankingEngine.js';

export const getMealSwapAlternatives = async (currentFoodId, mealType, profile, conditionContext, userFeedbackMap = {}) => {
  const allFoods = await Food.find({});
  const currentFood = await Food.findOne({ foodId: currentFoodId });

  const eligibleAlternatives = [];

  for (const food of allFoods) {
    if (food.foodId === currentFoodId) continue;

    const evalResult = scoreFoodCandidate(food, {
      profile,
      conditionContext,
      targetMealType: mealType,
      userFeedbackMap
    });

    if (evalResult.eligible) {
      eligibleAlternatives.push({
        food,
        score: evalResult.candidateScore,
        scoreBreakdown: evalResult.scoreBreakdown
      });
    }
  }

  eligibleAlternatives.sort((a, b) => b.score - a.score);

  return {
    currentFood,
    alternatives: eligibleAlternatives.slice(0, 6).map(alt => ({
      foodId: alt.food.foodId,
      name: alt.food.name,
      cuisine: alt.food.cuisine,
      servingSize: alt.food.servingSize,
      calories: alt.food.calories,
      protein: alt.food.protein,
      carbohydrates: alt.food.carbohydrates,
      fat: alt.food.fat,
      fiber: alt.food.fiber,
      allergens: alt.food.allergens,
      ingredients: alt.food.ingredients,
      tags: alt.food.tags,
      calorieDiff: currentFood ? alt.food.calories - currentFood.calories : 0,
      proteinDiff: currentFood ? alt.food.protein - currentFood.protein : 0,
      confidence: alt.score > 50 ? 'HIGH' : 'MEDIUM'
    }))
  };
};
