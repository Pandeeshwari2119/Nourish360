// HabitEngine.js
import { Habit } from '../../models/schemas.js';

export const generateHabitPlan = async (profile) => {
  const allHabits = await Habit.find({});
  const goals = profile.goals || [];

  const selected = [];

  // Goal-driven habit selection
  if (goals.includes('Improve hydration')) {
    const h = allHabits.find(hab => hab.habitId === 'habit_water_morning');
    if (h) selected.push(h);
  }

  if (goals.includes('Improve sleep consistency') || profile.screenUseBeforeBed) {
    const h = allHabits.find(hab => hab.habitId === 'habit_screen_winddown');
    if (h) selected.push(h);
  }

  if (goals.includes('Improve activity') || profile.averageDailySteps < 5000) {
    const h = allHabits.find(hab => hab.habitId === 'habit_post_meal_walk');
    if (h) selected.push(h);
  }

  if (goals.includes('Balanced eating')) {
    const h = allHabits.find(hab => hab.habitId === 'habit_veggie_portion');
    if (h) selected.push(h);
  }

  // Fallback / fill up to 3-4 habits
  for (const hab of allHabits) {
    if (selected.length >= 4) break;
    if (!selected.some(s => s.habitId === hab.habitId)) {
      selected.push(hab);
    }
  }

  return selected.map(h => ({
    ...h,
    completedToday: false
  }));
};
