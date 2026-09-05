// ConditionRuleEngine.js
import { ConditionRule } from '../../models/schemas.js';

export const evaluateConditionRules = async (conditions = []) => {
  if (!conditions || conditions.length === 0) {
    return {
      activeRules: [],
      encouragedFoods: [],
      limitedFoods: [],
      avoidFoods: [],
      lifestyleTips: [],
      nutrientGuidelines: { encourage: [], limit: [] }
    };
  }

  const allRules = await ConditionRule.find({});
  const activeRules = allRules.filter(r => 
    conditions.some(c => c.toLowerCase().includes(r.conditionId) || r.conditionId.includes(c.toLowerCase()))
  );

  const encouragedFoods = [];
  const limitedFoods = [];
  const avoidFoods = [];
  const lifestyleTips = [];
  const encourageNutrients = [];
  const limitNutrients = [];

  for (const rule of activeRules) {
    if (rule.foodRules?.encourage) encouragedFoods.push(...rule.foodRules.encourage);
    if (rule.foodRules?.limit) limitedFoods.push(...rule.foodRules.limit);
    if (rule.foodRules?.avoid) avoidFoods.push(...rule.foodRules.avoid);

    if (rule.nutrientRules?.encourageNutrients) encourageNutrients.push(...rule.nutrientRules.encourageNutrients);
    if (rule.nutrientRules?.limitNutrients) limitNutrients.push(...rule.nutrientRules.limitNutrients);

    if (rule.nutritionConsiderations) lifestyleTips.push(...rule.nutritionConsiderations);
  }

  return {
    activeRules,
    encouragedFoods: [...new Set(encouragedFoods)],
    limitedFoods: [...new Set(limitedFoods)],
    avoidFoods: [...new Set(avoidFoods)],
    lifestyleTips: [...new Set(lifestyleTips)],
    nutrientGuidelines: {
      encourage: [...new Set(encourageNutrients)],
      limit: [...new Set(limitNutrients)]
    }
  };
};

export const checkFoodConditionFit = (food, conditionContext) => {
  const { avoidFoods, limitedFoods, encouragedFoods } = conditionContext;
  const foodName = food.name.toLowerCase();
  const ingredients = (food.ingredients || []).map(i => i.toLowerCase());

  // 1. Check Avoid
  for (const avoidItem of avoidFoods) {
    if (foodName.includes(avoidItem) || ingredients.some(i => i.includes(avoidItem))) {
      return { suitable: false, scoreMod: -50, reason: `Condition guideline advises avoiding "${avoidItem}".` };
    }
  }

  // 2. Check Encourage
  let matchCount = 0;
  for (const enc of encouragedFoods) {
    if (foodName.includes(enc) || ingredients.some(i => i.includes(enc))) {
      matchCount++;
    }
  }

  if (matchCount > 0) {
    return { suitable: true, scoreMod: 15 * matchCount, reason: `Contains foods aligned with condition support (${encouragedFoods.slice(0, 3).join(', ')}).` };
  }

  return { suitable: true, scoreMod: 0, reason: 'Compatible with reported health conditions.' };
};
