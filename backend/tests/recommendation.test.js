import test from 'node:test';
import assert from 'node:assert/strict';

import { checkAllergies } from '../services/recommendation/AllergyEngine.js';
import { checkDietaryPattern } from '../services/recommendation/DietaryFilter.js';
import { evaluateSafety } from '../services/recommendation/SafetyEngine.js';
import { normalizeProfile } from '../services/recommendation/ProfileNormalizer.js';
import { foodsData } from '../data/foodsData.js';

test('AllergyEngine: Hard blocks peanut containing foods for peanut allergic user', () => {
  const peanutFood = {
    name: 'Peanut Butter Toast',
    allergens: ['peanuts'],
    ingredients: ['whole wheat bread', 'roasted peanuts']
  };
  const result = checkAllergies(peanutFood, ['peanuts']);
  assert.equal(result.passed, false);
  assert.match(result.blockedReason, /allergen/i);
});

test('AllergyEngine: Permits non-allergic safe foods', () => {
  const safeFood = {
    name: 'Steamed Idli with Sambar',
    allergens: ['coconut'],
    ingredients: ['rice', 'urad dal', 'drumstick']
  };
  const result = checkAllergies(safeFood, ['peanuts']);
  assert.equal(result.passed, true);
  assert.equal(result.blockedReason, null);
});

test('DietaryFilter: Vegan filter blocks dairy and egg items', () => {
  const paneerDish = {
    name: 'Paneer Bhurji',
    vegetarian: true,
    vegan: false,
    containsDairy: true,
    containsEgg: false
  };
  const result = checkDietaryPattern(paneerDish, 'Vegan');
  assert.equal(result.passed, false);
  assert.match(result.blockedReason, /vegan/i);
});

test('DietaryFilter: Vegan filter permits 100% plant-based food', () => {
  const plantDish = {
    name: 'Sprouted Green Moong Salad',
    vegetarian: true,
    vegan: true,
    containsDairy: false,
    containsEgg: false
  };
  const result = checkDietaryPattern(plantDish, 'Vegan');
  assert.equal(result.passed, true);
});

test('SafetyEngine: Flags known heart condition for professional review', () => {
  const profile = {
    conditions: ['heart_condition']
  };
  const safety = evaluateSafety(profile);
  assert.equal(safety.professionalReviewRequired, true);
  assert.equal(safety.safetyStatus, 'PROFESSIONAL_REVIEW');
});

test('ProfileNormalizer: Correctly converts imperial units and computes BMR', () => {
  const rawProfile = {
    age: 30,
    sex: 'female',
    height: 5.5, // ft
    heightUnit: 'ft',
    weight: 140, // lbs
    weightUnit: 'lbs',
    averageDailySteps: 4000
  };
  const normalized = normalizeProfile(rawProfile);
  assert.ok(normalized.heightCm > 160 && normalized.heightCm < 175);
  assert.ok(normalized.weightKg > 60 && normalized.weightKg < 66);
  assert.ok(normalized.bmr > 1200);
  assert.ok(normalized.tdee > 1400);
});
