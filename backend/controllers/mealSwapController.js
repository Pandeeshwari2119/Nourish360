// mealSwapController.js
import { HealthProfile, Recommendation, Food } from '../models/schemas.js';
import { getMealSwapAlternatives } from '../services/recommendation/SmartMealSwap.js';
import { evaluateConditionRules } from '../services/recommendation/ConditionRuleEngine.js';
import { getUserFeedbackMap } from '../services/recommendation/FeedbackEngine.js';

export const getSwapCandidates = async (req, res, next) => {
  try {
    const { foodId, mealType } = req.query;
    if (!foodId) {
      return res.status(400).json({ success: false, message: 'foodId parameter is required.' });
    }

    const profile = await HealthProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(400).json({ success: false, message: 'Profile not found.' });
    }

    const conditionContext = await evaluateConditionRules(profile.conditions);
    const feedbackMap = await getUserFeedbackMap(req.user._id);

    const swapData = await getMealSwapAlternatives(
      foodId,
      mealType || 'lunch',
      profile,
      conditionContext,
      feedbackMap
    );

    res.json({ success: true, ...swapData });
  } catch (err) {
    next(err);
  }
};

export const swapMeal = async (req, res, next) => {
  try {
    const { slotId, newFoodId } = req.body;
    if (!slotId || !newFoodId) {
      return res.status(400).json({ success: false, message: 'slotId and newFoodId are required.' });
    }

    const newFood = await Food.findOne({ foodId: newFoodId });
    if (!newFood) {
      return res.status(404).json({ success: false, message: 'Replacement food not found.' });
    }

    const rec = await Recommendation.findOne({ userId: req.user._id });
    if (!rec) {
      return res.status(404).json({ success: false, message: 'No active recommendation plan found.' });
    }

    // Update the meal in the recommendation
    const updatedMeals = rec.meals.map(m => {
      if (m.slotId === slotId) {
        return {
          ...m,
          foodId: newFood.foodId,
          foodName: newFood.name,
          cuisine: newFood.cuisine,
          servingSize: newFood.servingSize,
          calories: newFood.calories,
          protein: newFood.protein,
          carbohydrates: newFood.carbohydrates,
          fat: newFood.fat,
          fiber: newFood.fiber,
          allergens: newFood.allergens,
          ingredients: newFood.ingredients,
          tags: newFood.tags,
          swappedAt: new Date().toISOString()
        };
      }
      return m;
    });

    // Update in timeline
    const updatedTimeline = rec.dailyTimeline.map(t => {
      if (t.id === slotId) {
        return {
          ...t,
          title: `${t.title.split(':')[0]}: ${newFood.name}`,
          description: `${newFood.servingSize} • ${newFood.calories} kcal • ${newFood.protein}g protein • ${newFood.carbohydrates}g carbs • ${newFood.fat}g fat`
        };
      }
      return t;
    });

    await Recommendation.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { meals: updatedMeals, dailyTimeline: updatedTimeline } }
    );

    res.json({
      success: true,
      message: `Meal successfully replaced with ${newFood.name}.`,
      updatedMeal: updatedMeals.find(m => m.slotId === slotId)
    });
  } catch (err) {
    next(err);
  }
};
