// profileController.js
import { HealthProfile, User } from '../models/schemas.js';
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
    const { name, ...restProfile } = req.body;

    let updatedUser = req.user;
    if (name && name.trim()) {
      updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { name: name.trim() },
        { new: true }
      );
    }

    const profileData = {
      name: name ? name.trim() : (updatedUser?.name || req.user.name),
      ...restProfile,
      userId: req.user._id
    };

    const saved = await HealthProfile.findOneAndUpdate(
      { userId: req.user._id },
      profileData,
      { upsert: true, new: true }
    );

    // Automatically generate recommendation plan upon profile submission
    const plan = await generatePersonalizedPlan(saved, req.user._id);

    const safeUser = {
      id: updatedUser?._id || req.user._id,
      name: updatedUser?.name || req.user.name,
      email: updatedUser?.email || req.user.email,
      role: updatedUser?.role || req.user.role,
      settings: updatedUser?.settings || req.user.settings
    };

    res.status(200).json({
      success: true,
      message: 'Health profile saved and personalized plan generated successfully.',
      profile: saved,
      user: safeUser,
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
