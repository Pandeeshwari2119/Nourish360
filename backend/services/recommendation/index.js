// index.js - Master RecommendationEngine Orchestrator
import { normalizeProfile } from './ProfileNormalizer.js';
import { evaluateSafety } from './SafetyEngine.js';
import { evaluateConditionRules } from './ConditionRuleEngine.js';
import { detectConflicts } from './ConflictDetector.js';
import { calculateNutritionEstimates } from './NutritionEngine.js';
import { generateMealPlan } from './MealGenerator.js';
import { generateActivityPlan } from './ActivityEngine.js';
import { generateSleepPlan } from './SleepEngine.js';
import { generateHydrationPlan } from './HydrationEngine.js';
import { generateHabitPlan } from './HabitEngine.js';
import { generateExplanation } from './ExplanationEngine.js';
import { getUserFeedbackMap } from './FeedbackEngine.js';
import { Recommendation, AuditLog } from '../../models/schemas.js';

export const generatePersonalizedPlan = async (userProfile, userId, dayIndex = 0, usedFoodIdsThisWeek = new Set()) => {
  // 1. Validation & Normalization
  const normalized = normalizeProfile(userProfile);

  // 2. Safety Engine
  const safetyEval = evaluateSafety(normalized);

  // 3. Condition Rule Engine
  const conditionContext = await evaluateConditionRules(normalized.conditions);

  // 4. Conflict Detector
  const conflictEval = detectConflicts(conditionContext, normalized.allergies, normalized.foodPreferences);
  if (conflictEval.professionalReviewRequired) {
    safetyEval.professionalReviewRequired = true;
    safetyEval.safetyStatus = 'PROFESSIONAL_REVIEW';
    safetyEval.reviewReasons.push('Conflicting multi-condition nutrition guidelines detected.');
  }

  // 5. Nutrition Estimator
  const nutritionEstimates = calculateNutritionEstimates(normalized);

  // 6. User Feedback History
  const feedbackMap = userId ? await getUserFeedbackMap(userId) : {};

  // 7. Meal Generator (with day-by-day rotation)
  const meals = await generateMealPlan(normalized, conditionContext, feedbackMap, dayIndex, usedFoodIdsThisWeek);

  // 8. Activity Engine
  const activityPlan = await generateActivityPlan(normalized);

  // 9. Sleep Engine
  const sleepPlan = generateSleepPlan(normalized);

  // 10. Hydration Engine
  const hydrationPlan = generateHydrationPlan(normalized);

  // 11. Habit Engine
  const habits = await generateHabitPlan(normalized);

  // 12. Synthesize Daily Timeline based on actual user schedule
  const dailyTimeline = [
    {
      id: 'time_wake',
      time: normalized.wakeTime || '07:00',
      type: 'routine',
      title: 'Gentle Awakening & Hydration',
      description: 'Wake up naturally, open blinds to let morning daylight in, and drink 1-2 glasses of water.',
      reason: 'Anchors circadian rhythm and jumpstarts metabolism.',
      confidence: 'HIGH',
      completed: false
    }
  ];

  // Insert meals and movement breaks in chronological order
  for (const meal of meals) {
    dailyTimeline.push({
      id: meal.slotId,
      time: meal.suggestedTime,
      type: 'meal',
      title: `${meal.label}: ${meal.foodName}`,
      description: `${meal.servingSize} • ${meal.calories} kcal • ${meal.protein}g protein • ${meal.carbohydrates}g carbs • ${meal.fat}g fat`,
      details: meal,
      reason: `Matches your ${normalized.dietaryPattern} diet and scheduled meal timing.`,
      confidence: meal.confidence,
      completed: false
    });
  }

  // Add Morning / Midday Movement
  dailyTimeline.push({
    id: 'time_act_1',
    time: '11:15',
    type: 'activity',
    title: 'Movement & Posture Break',
    description: activityPlan.movementBreaks[0]?.action || '5-minute stretch and spine release.',
    reason: 'Offsets sitting duration and reduces spinal tension.',
    confidence: 'HIGH',
    completed: false
  });

  // Add Workout or Post-dinner stroll
  dailyTimeline.push({
    id: 'time_act_2',
    time: '18:30',
    type: 'activity',
    title: activityPlan.recommendedWorkout?.name || 'Evening Gentle Walk',
    description: `${activityPlan.activeMinutesGoal} mins • ${activityPlan.recommendedWorkout?.difficulty || 'Beginner'} difficulty`,
    details: activityPlan.recommendedWorkout,
    reason: 'Gradually advances your daily step count towards a sustainable baseline.',
    confidence: 'HIGH',
    completed: false
  });

  // Wind down & Sleep
  dailyTimeline.push({
    id: 'time_winddown',
    time: sleepPlan.windDownStartTime,
    type: 'sleep',
    title: 'Screen Curfew & Evening Wind-Down',
    description: 'Begin dimming lights, turn off digital screens, and practice calm breathing.',
    reason: 'Promotes natural melatonin secretion for deep restorative sleep.',
    confidence: 'HIGH',
    completed: false
  });

  dailyTimeline.push({
    id: 'time_sleep',
    time: sleepPlan.targetBedtime,
    type: 'sleep',
    title: 'Sleep Target',
    description: `Targeting ~${sleepPlan.estimatedDurationHours} hours of uninterrupted restorative sleep.`,
    reason: 'Crucial for cognitive, hormonal, and muscular recovery.',
    confidence: 'HIGH',
    completed: false
  });

  // Sort timeline chronologically
  dailyTimeline.sort((a, b) => a.time.localeCompare(b.time));

  // 13. Transparent Explanations
  const explanations = meals.map(m => generateExplanation(m, normalized, conditionContext));

  // 14. Audit Log
  const auditData = {
    userId: userId || 'anonymous',
    profileInputs: {
      age: normalized.age,
      sex: normalized.sex,
      dietaryPattern: normalized.dietaryPattern,
      allergies: normalized.allergies,
      conditions: normalized.conditions,
      goals: normalized.goals
    },
    rulesTriggered: conditionContext.activeRules.map(r => r.ruleId),
    foodsBlocked: conflictEval.conflicts.map(c => c.item),
    foodsSelected: meals.map(m => m.foodName),
    safetyFlags: safetyEval.safetyFlags,
    engineVersion: '1.2.0',
    ruleVersion: '2026.1'
  };

  if (userId) {
    await AuditLog.create(auditData);
  }

  const result = {
    userId: userId || null,
    generatedAt: new Date().toISOString(),
    engineVersion: '1.2.0',
    profileVersion: '1.0',
    safetyStatus: safetyEval.safetyStatus,
    professionalReviewRequired: safetyEval.professionalReviewRequired,
    reviewReasons: safetyEval.reviewReasons,
    warnings: conflictEval.conflicts.map(c => c.message),
    dailyTimeline,
    nutrition: nutritionEstimates,
    meals,
    activityPlan,
    sleepPlan,
    hydrationPlan,
    habits,
    explanations,
    auditTrail: auditData
  };

  // Upsert to Recommendation store if user exists (always replace outdated plan)
  if (userId) {
    await Recommendation.findOneAndUpdate(
      { userId },
      result,
      { upsert: true, new: true }
    );
  }

  return result;
};

// 7-Day Distinct Weekly Plan Generator (Monday to Sunday)
export const generateWeeklyPlan = async (userProfile, userId) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const weekPlan = [];
  const usedFoodIdsThisWeek = new Set();

  for (let i = 0; i < days.length; i++) {
    const singleDay = await generatePersonalizedPlan(userProfile, null, i, usedFoodIdsThisWeek);
    weekPlan.push({
      dayName: days[i],
      dayIndex: i,
      meals: singleDay.meals,
      activity: singleDay.activityPlan,
      hydration: singleDay.hydrationPlan,
      habits: singleDay.habits,
      sleep: singleDay.sleepPlan
    });
  }

  return weekPlan;
};
