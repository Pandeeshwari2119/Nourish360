// activityController.js
import { Exercise, HealthProfile, Recommendation } from '../models/schemas.js';
import { generateActivityPlan } from '../services/recommendation/ActivityEngine.js';

export const getActivityPlan = async (req, res, next) => {
  try {
    const profile = await HealthProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(400).json({ success: false, message: 'Please complete wellness profile.' });
    }
    const plan = await generateActivityPlan(profile);
    res.json({ success: true, activityPlan: plan });
  } catch (err) {
    next(err);
  }
};

export const getWorkouts = async (req, res, next) => {
  try {
    const { category, difficulty } = req.query;
    let workouts = await Exercise.find({});
    if (category && category !== 'All') {
      workouts = workouts.filter(w => w.category.toLowerCase() === category.toLowerCase());
    }
    if (difficulty && difficulty !== 'All') {
      workouts = workouts.filter(w => w.difficulty.toLowerCase() === difficulty.toLowerCase());
    }
    res.json({ success: true, workouts });
  } catch (err) {
    next(err);
  }
};
