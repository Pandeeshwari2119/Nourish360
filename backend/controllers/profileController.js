// profileController.js
import { HealthProfile } from '../models/schemas.js';
import { generatePersonalizedPlan } from '../services/recommendation/index.js';

export const getProfile = async (req, res, next) => {
  try {
    const profile = await HealthProfile.findOne({ userId: req.user._id });
    res.json({ success: true, profile: profile || null });
  } catch (err) {
    next(err);
  }
};

export const saveProfile = async (req, res, next) => {
  try {
    const profileData = {
      ...req.body,
      userId: req.user._id
    };

    const saved = await HealthProfile.findOneAndUpdate(
      { userId: req.user._id },
      profileData,
      { upsert: true, new: true }
    );

    // Automatically generate recommendation plan upon profile submission
    const plan = await generatePersonalizedPlan(saved, req.user._id);

    res.status(200).json({
      success: true,
      message: 'Health profile saved and personalized plan generated successfully.',
      profile: saved,
      plan
    });
  } catch (err) {
    next(err);
  }
};

export const recalculate = async (req, res, next) => {
  try {
    const profile = await HealthProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(400).json({ success: false, message: 'Please complete onboarding profile first.' });
    }
    const plan = await generatePersonalizedPlan(profile, req.user._id);
    res.json({ success: true, message: 'Personalized wellness plan recalculated.', plan });
  } catch (err) {
    next(err);
  }
};
