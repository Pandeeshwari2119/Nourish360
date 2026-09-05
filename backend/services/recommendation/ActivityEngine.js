// ActivityEngine.js
import { Exercise } from '../../models/schemas.js';

export const generateActivityPlan = async (profile) => {
  const currentSteps = profile.averageDailySteps || 4000;
  
  // Progressive step goal (approx +1,000 to +1,500 steps above baseline, max realistic progression)
  let targetSteps;
  if (currentSteps < 3000) {
    targetSteps = 4500;
  } else if (currentSteps < 6000) {
    targetSteps = currentSteps + 1200;
  } else if (currentSteps < 9000) {
    targetSteps = currentSteps + 1000;
  } else {
    targetSteps = Math.min(12000, currentSteps + 800);
  }

  const allExercises = await Exercise.find({});
  const conditions = profile.conditions || [];

  // Filter out any exercise with contraindications matching user conditions
  const safeExercises = allExercises.filter(ex => {
    const contra = (ex.contraindications || []).map(c => c.toLowerCase());
    for (const cond of conditions) {
      if (contra.some(c => c.includes(cond.toLowerCase()))) return false;
    }
    return true;
  });

  // Pick suitable workout based on user experience
  const targetCategory = profile.fitnessExperience === 'beginner' ? ['Walking', 'Stretching', 'Yoga', 'Home workout'] : ['Strength', 'Cardio', 'Home workout'];
  const matchedWorkout = safeExercises.find(ex => targetCategory.includes(ex.category)) || safeExercises[0];

  return {
    targetDailySteps: targetSteps,
    baselineSteps: currentSteps,
    progressionNote: `Targeting a gradual, sustainable +${targetSteps - currentSteps} steps increase without extreme jumps.`,
    activeMinutesGoal: profile.availableWorkoutMinutes || 25,
    recommendedWorkout: matchedWorkout,
    movementBreaks: [
      {
        time: '11:00',
        title: 'Mid-Morning Spine & Shoulder Release',
        durationMinutes: 5,
        action: 'Stand up, roll shoulders, and stretch chest.'
      },
      {
        time: '15:30',
        title: 'Afternoon Circulation Walk',
        durationMinutes: 10,
        action: 'Short stroll to refresh mental focus and leg circulation.'
      }
    ]
  };
};
