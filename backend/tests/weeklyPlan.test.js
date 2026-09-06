import { test } from 'node:test';
import assert from 'node:assert';
import { generateWeeklyPlan } from '../services/recommendation/index.js';

test('WeeklyPlan: 7-day distinct meal rotation for Non-vegetarian user', async () => {
  const profile = {
    age: 26,
    sex: 'female',
    height: 165,
    weight: 58,
    dietaryPattern: 'Non-vegetarian',
    allergies: [],
    conditions: [],
    favoriteCuisines: ['South Indian', 'North Indian', 'Western', 'Asian']
  };

  const weekPlan = await generateWeeklyPlan(profile, null);
  assert.strictEqual(weekPlan.length, 7, 'Should generate 7 days');

  const lunchDishes = weekPlan.map(d => d.meals.find(m => m.mealType === 'lunch')?.foodName);
  console.log('7-Day Lunches (Non-veg):', lunchDishes);

  // Verify that meals vary across days (not identical)
  const uniqueLunches = new Set(lunchDishes);
  assert.ok(uniqueLunches.size >= 4, 'Should have diverse rotating lunches across the week');
});
