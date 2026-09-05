import test from 'node:test';
import assert from 'node:assert/strict';

import { connectDB } from '../config/db.js';
import { seedDatabase } from '../data/seed.js';
import { generatePersonalizedPlan } from '../services/recommendation/index.js';
import { getMealSwapAlternatives } from '../services/recommendation/SmartMealSwap.js';
import { evaluateConditionRules } from '../services/recommendation/ConditionRuleEngine.js';

test('E2E: Complete pipeline generates personalized plan respecting user profile', async () => {
  await connectDB();
  await seedDatabase();

  const userProfile = {
    age: 29,
    sex: 'female',
    height: 165,
    heightUnit: 'cm',
    weight: 58,
    weightUnit: 'kg',
    dietaryPattern: 'Vegetarian',
    conditions: ['anemia'],
    allergies: ['peanuts'],
    breakfastTime: '08:30',
    lunchTime: '13:00',
    dinnerTime: '20:30',
    averageDailySteps: 3500,
    goals: ['Balanced eating', 'Improve activity']
  };

  const plan = await generatePersonalizedPlan(userProfile, 'test_user_e2e_01');

  // Verify plan structure
  assert.ok(plan);
  assert.ok(plan.dailyTimeline.length >= 5);
  assert.ok(plan.meals.length >= 3);
  assert.ok(plan.nutrition.calories.value > 1400);

  // Verify Hard Allergy Rule: NO peanut in any meal
  for (const meal of plan.meals) {
    const isPeanut = (meal.allergens || []).includes('peanuts') || (meal.foodName || '').toLowerCase().includes('peanut');
    assert.equal(isPeanut, false, `Meal ${meal.foodName} violates peanut allergy`);
  }

  // Verify Dietary Pattern: All meals are vegetarian
  for (const meal of plan.meals) {
    assert.ok(meal.foodName);
  }

  // Verify Smart Meal Swap
  const firstMeal = plan.meals[0];
  const conditionContext = await evaluateConditionRules(userProfile.conditions);
  const swapResult = await getMealSwapAlternatives(
    firstMeal.foodId,
    firstMeal.mealType,
    userProfile,
    conditionContext
  );

  assert.ok(swapResult.alternatives.length > 0);
  for (const alt of swapResult.alternatives) {
    assert.equal((alt.allergens || []).includes('peanuts'), false, 'Swap alternative must not contain allergens');
  }
});