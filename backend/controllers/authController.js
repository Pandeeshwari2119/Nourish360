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

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
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

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password credentials.' });
    }

    const token = generateToken(user._id);
    const hasProfile = Boolean(await HealthProfile.findOne({ userId: user._id }));

    res.json({
      success: true,
      token,
      hasProfile,
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

export const getMe = async (req, res, next) => {
  try {
    const profile = await HealthProfile.findOne({ userId: req.user._id });
    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        settings: req.user.settings
      },
      hasProfile: Boolean(profile),
      profile
    });
  } catch (err) {
    next(err);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const { settings } = req.body;
    const updated = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { settings } },
      { new: true }
    );
    res.json({ success: true, settings: updated.settings });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user) {
      return res.json({ success: true, message: 'If an account matches that email, a password reset link has been dispatched.' });
    }
    // Simulation token for local demo
    const resetToken = 'reset_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    await User.findOneAndUpdate({ _id: user._id }, { $set: { resetToken, resetTokenExpiry: new Date(Date.now() + 3600000) } });

    res.json({
      success: true,
      message: 'Password reset link generated.',
      demoToken: resetToken // Provided so user can directly complete the reset flow
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: 'Token and new password are required.' });
    }
    const user = await User.findOne({ resetToken: token });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);
    await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { passwordHash }, $unset: { resetToken: 1, resetTokenExpiry: 1 } }
    );

    res.json({ success: true, message: 'Password has been successfully reset. You may now log in.' });
  } catch (err) {
    next(err);
  }
};
