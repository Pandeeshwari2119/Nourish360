// recommendationController.js
import { Recommendation, Feedback, HealthProfile } from '../models/schemas.js';
import { generatePersonalizedPlan, generateWeeklyPlan } from '../services/recommendation/index.js';

export const generate = async (req, res, next) => {
  try {
    let profile = await HealthProfile.findOne({ userId: req.user._id });
    if (!profile) {
      profile = req.body.profile;
    }
    if (!profile) {
      return res.status(400).json({ success: false, message: 'Profile data is required to generate recommendations.' });
    }

    const plan = await generatePersonalizedPlan(profile, req.user._id);
    res.json({ success: true, plan });
  } catch (err) {
    next(err);
  }
};

export const getToday = async (req, res, next) => {
  try {
    const shouldRefresh = req.query.refresh === 'true';
    let rec = shouldRefresh ? null : await Recommendation.findOne({ userId: req.user._id });
    
    if (!rec) {
      const profile = await HealthProfile.findOne({ userId: req.user._id });
      if (profile) {
        rec = await generatePersonalizedPlan(profile, req.user._id);
      }
    }
    res.json({ success: true, plan: rec || null });
  } catch (err) {
    next(err);
  }
};

export const getWeek = async (req, res, next) => {
  try {
    const profile = await HealthProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(400).json({ success: false, message: 'Please complete your wellness profile first.' });
    }
    const weeklyPlan = await generateWeeklyPlan(profile, req.user._id);
    res.json({ success: true, weeklyPlan });
  } catch (err) {
    next(err);
  }
};

export const submitFeedback = async (req, res, next) => {
  try {
    const { itemId, itemType, rating, comment } = req.body;
    if (!itemId || !itemType || !rating) {
      return res.status(400).json({ success: false, message: 'Item ID, type, and rating are required.' });
    }

    const saved = await Feedback.create({
      userId: req.user._id,
      itemId,
      itemType,
      rating,
      comment
    });

    res.json({
      success: true,
      message: 'Feedback recorded. Future recommendations will dynamically adapt to your preferences.',
      feedback: saved
    });
  } catch (err) {
    next(err);
  }
};
