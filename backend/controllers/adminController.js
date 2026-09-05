// adminController.js
import { Food, ConditionRule, Exercise, User, AuditLog } from '../models/schemas.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    const foodCount = await Food.countDocuments();
    const ruleCount = await ConditionRule.countDocuments();
    const exerciseCount = await Exercise.countDocuments();
    const auditLogs = await AuditLog.find({});

    res.json({
      success: true,
      stats: {
        users: userCount,
        foods: foodCount,
        conditionRules: ruleCount,
        exercises: exerciseCount,
        recentAudits: auditLogs.slice(-10).reverse()
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getAdminFoods = async (req, res, next) => {
  try {
    const foods = await Food.find({});
    res.json({ success: true, foods });
  } catch (err) {
    next(err);
  }
};

export const createFood = async (req, res, next) => {
  try {
    const foodData = {
      ...req.body,
      foodId: 'food_custom_' + Date.now()
    };
    const created = await Food.create(foodData);
    res.status(201).json({ success: true, food: created });
  } catch (err) {
    next(err);
  }
};

export const getAdminRules = async (req, res, next) => {
  try {
    const rules = await ConditionRule.find({});
    res.json({ success: true, rules });
  } catch (err) {
    next(err);
  }
};

export const getAuditTrail = async (req, res, next) => {
  try {
    const logs = await AuditLog.find({});
    res.json({ success: true, count: logs.length, logs: logs.reverse() });
  } catch (err) {
    next(err);
  }
};
