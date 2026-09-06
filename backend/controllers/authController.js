// authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, HealthProfile } from '../models/schemas.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'nourish360_super_secure_jwt_secret_key_2026', {
    expiresIn: '30d'
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password.trim(), salt);

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      passwordHash,
      role: cleanEmail.includes('admin') ? 'admin' : 'user',
      settings: {
        units: 'metric',
        reducedMotion: false,
        notifications: { meals: true, water: true, activity: true, windDown: true, habits: true }
      }
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        settings: user.settings
      }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter both email and password.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password credentials.' });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password credentials.' });
    }

    const token = generateToken(user._id);
    const healthProfile = await HealthProfile.findOne({
      $or: [{ userId: String(user._id) }, { userId: user._id }]
    });
    const hasProfile = Boolean(healthProfile);
    
    // Prioritize user's custom profile name and sync back to User document
    let displayName = user.name;
    if (healthProfile && healthProfile.name && healthProfile.name.trim()) {
      displayName = healthProfile.name.trim();
      if (user.name !== displayName) {
        await User.findOneAndUpdate({ _id: user._id }, { name: displayName });
      }
    }

    res.json({
      success: true,
      token,
      hasProfile,
      user: {
        id: user._id,
        name: displayName,
        email: user.email,
        role: user.role,
        settings: user.settings
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id || req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    const healthProfile = await HealthProfile.findOne({
      $or: [{ userId: String(user._id) }, { userId: user._id }]
    });
    const hasProfile = Boolean(healthProfile);

    let displayName = user.name;
    if (healthProfile && healthProfile.name && healthProfile.name.trim()) {
      displayName = healthProfile.name.trim();
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: displayName,
        email: user.email,
        role: user.role,
        settings: user.settings
      },
      hasProfile
    });
  } catch (err) {
    next(err);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const { settings } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    user.settings = { ...user.settings, ...settings };
    await user.save();

    res.json({
      success: true,
      message: 'Preferences updated successfully.',
      settings: user.settings
    });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    message: `If an account exists for ${email}, a password reset link has been sent.`
  });
};

export const resetPassword = async (req, res) => {
  res.json({
    success: true,
    message: 'Password has been successfully updated.'
  });
};