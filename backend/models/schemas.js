import mongoose from 'mongoose';
import { isMongoConnected, getJsonStore } from '../config/db.js';

// Generic Model Adapter that abstracts Mongoose vs JsonStore
class ModelAdapter {
  constructor(name, mongooseModel) {
    this.name = name;
    this.mongooseModel = mongooseModel;
  }

  get store() {
    return getJsonStore(this.name);
  }

  async find(query = {}) {
    if (isMongoConnected && this.mongooseModel) {
      return this.mongooseModel.find(query);
    }
    return this.store.find(query);
  }

  async findOne(query = {}) {
    if (isMongoConnected && this.mongooseModel) {
      return this.mongooseModel.findOne(query);
    }
    return this.store.findOne(query);
  }

  async findById(id) {
    if (isMongoConnected && this.mongooseModel) {
      return this.mongooseModel.findById(id);
    }
    return this.store.findById(id);
  }

  async create(doc) {
    if (isMongoConnected && this.mongooseModel) {
      return this.mongooseModel.create(doc);
    }
    return this.store.create(doc);
  }

  async insertMany(docs) {
    if (isMongoConnected && this.mongooseModel) {
      return this.mongooseModel.insertMany(docs);
    }
    return this.store.insertMany(docs);
  }

  async findOneAndUpdate(query, update, options = {}) {
    if (isMongoConnected && this.mongooseModel) {
      return this.mongooseModel.findOneAndUpdate(query, update, options);
    }
    return this.store.findOneAndUpdate(query, update, options);
  }

  async deleteOne(query) {
    if (isMongoConnected && this.mongooseModel) {
      return this.mongooseModel.deleteOne(query);
    }
    return this.store.deleteOne(query);
  }

  async countDocuments(query = {}) {
    if (isMongoConnected && this.mongooseModel) {
      return this.mongooseModel.countDocuments(query);
    }
    return this.store.countDocuments(query);
  }
}

// Mongoose Schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  settings: {
    units: { type: String, default: 'metric', enum: ['metric', 'imperial'] },
    reducedMotion: { type: Boolean, default: false },
    notifications: {
      meals: { type: Boolean, default: true },
      water: { type: Boolean, default: true },
      activity: { type: Boolean, default: true },
      windDown: { type: Boolean, default: true },
      habits: { type: Boolean, default: true }
    }
  },
  resetToken: String,
  resetTokenExpiry: Date
}, { timestamps: true });

const healthProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true, enum: ['female', 'male', 'other'] },
  height: { type: Number, required: true }, // in cm or converted
  weight: { type: Number, required: true }, // in kg or converted
  heightUnit: { type: String, default: 'cm' },
  weightUnit: { type: String, default: 'kg' },
  region: { type: String, default: 'Global' },
  occupation: { type: String, default: 'Working' },
  dailySchedule: { type: String, default: 'standard' },
  
  // Known health conditions only
  conditions: [{ type: String }],
  hasNoConditions: { type: Boolean, default: false },
  
  // Allergies and food restrictions
  allergies: [{ type: String }],
  dietaryPattern: { type: String, default: 'Vegetarian', enum: ['Vegetarian', 'Vegan', 'Eggetarian', 'Non-vegetarian'] },
  otherRestrictions: [{ type: String }],
  foodPreferences: {
    favorites: [{ type: String }],
    disliked: [{ type: String }],
    avoids: [{ type: String }]
  },

  // Food Habits
  breakfastTime: { type: String, default: '08:30' },
  lunchTime: { type: String, default: '13:00' },
  dinnerTime: { type: String, default: '20:30' },
  snackFrequency: { type: String, default: 'moderate' },
  numberOfMeals: { type: Number, default: 3 },
  typicalFoods: { type: String, default: '' },
  waterIntakeGoalLiters: { type: Number, default: 2.5 },
  cookingAvailability: { type: String, default: 'often' },
  foodBudget: { type: String, default: 'medium' },
  outsideEatingFrequency: { type: String, default: 'occasionally' },
  favoriteCuisines: [{ type: String }],

  // Daily Routine
  wakeTime: { type: String, default: '07:00' },
  bedtime: { type: String, default: '23:00' },
  sittingHours: { type: Number, default: 8 },
  stressLevel: { type: String, default: 'moderate', enum: ['low', 'moderate', 'high'] },

  // Movement & Activity
  averageDailySteps: { type: Number, default: 4000 },
  walkingFrequency: { type: String, default: 'daily' },
  exerciseFrequency: { type: String, default: '2-3 days/week' },
  fitnessExperience: { type: String, default: 'beginner', enum: ['beginner', 'intermediate', 'advanced'] },
  gymAvailability: { type: Boolean, default: false },
  homeWorkoutAvailability: { type: Boolean, default: true },
  availableWorkoutMinutes: { type: Number, default: 25 },
  preferredActivities: [{ type: String }],

  // Sleep
  sleepDuration: { type: Number, default: 7 },
  sleepConsistency: { type: String, default: 'moderate', enum: ['consistent', 'moderate', 'variable'] },
  screenUseBeforeBed: { type: Boolean, default: true },
  nightEating: { type: Boolean, default: false },

  // Goals
  goals: [{ type: String }],
  customGoal: { type: String, default: '' }
}, { timestamps: true });

const foodSchema = new mongoose.Schema({
  foodId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  cuisine: { type: String, required: true },
  servingSize: { type: String, default: '1 serving' },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbohydrates: { type: Number, required: true },
  fat: { type: Number, required: true },
  fiber: { type: Number, required: true },
  sodium: { type: Number, default: 0 },
  sugar: { type: Number, default: 0 },
  micronutrients: {
    iron: { type: Number, default: 0 },
    calcium: { type: Number, default: 0 },
    vitaminD: { type: Number, default: 0 },
    vitaminB12: { type: Number, default: 0 },
    potassium: { type: Number, default: 0 },
    magnesium: { type: Number, default: 0 }
  },
  allergens: [{ type: String }],
  ingredients: [{ type: String }],
  vegetarian: { type: Boolean, default: true },
  vegan: { type: Boolean, default: false },
  containsEgg: { type: Boolean, default: false },
  containsDairy: { type: Boolean, default: false },
  mealTypes: [{ type: String }], // 'breakfast', 'lunch', 'dinner', 'snack'
  tags: [{ type: String }],
  source: { type: String, default: 'USDA / Standard Nutrition Reference' },
  sourceVersion: { type: String, default: '2026.1' },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

const conditionRuleSchema = new mongoose.Schema({
  ruleId: { type: String, required: true, unique: true },
  conditionId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  safetyLevel: { type: String, default: 'INFO', enum: ['INFO', 'CAUTION', 'PROFESSIONAL_REVIEW', 'URGENT'] },
  nutritionConsiderations: [{ type: String }],
  foodRules: {
    encourage: [{ type: String }],
    limit: [{ type: String }],
    avoid: [{ type: String }]
  },
  nutrientRules: {
    encourageNutrients: [{ type: String }],
    limitNutrients: [{ type: String }]
  },
  activityConsiderations: [{ type: String }],
  sleepConsiderations: [{ type: String }],
  hydrationConsiderations: [{ type: String }],
  professionalReviewRequired: { type: Boolean, default: false },
  sources: [{ type: String }],
  version: { type: String, default: '1.0' },
  lastReviewed: { type: String, default: '2026-01-15' }
}, { timestamps: true });

const exerciseSchema = new mongoose.Schema({
  exerciseId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true }, // 'Beginner', 'Walking', 'Stretching', 'Mobility', 'Yoga', 'Home workout', 'Strength', 'Cardio'
  durationMinutes: { type: Number, default: 15 },
  difficulty: { type: String, default: 'Beginner' },
  equipment: { type: String, default: 'None / Bodyweight' },
  instructions: [{ type: String }],
  safetyNotes: [{ type: String }],
  contraindications: [{ type: String }],
  targetAreas: [{ type: String }]
}, { timestamps: true });

const habitSchema = new mongoose.Schema({
  habitId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  frequency: { type: String, default: 'daily' },
  icon: { type: String, default: 'Sparkles' }
}, { timestamps: true });

const recommendationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  generatedAt: { type: Date, default: Date.now },
  engineVersion: { type: String, default: '1.2.0' },
  profileVersion: { type: String, default: '1.0' },
  safetyStatus: { type: String, default: 'INFO', enum: ['INFO', 'CAUTION', 'PROFESSIONAL_REVIEW', 'URGENT'] },
  professionalReviewRequired: { type: Boolean, default: false },
  reviewReasons: [{ type: String }],
  dailyTimeline: [{
    id: String,
    time: String,
    type: String, // 'meal', 'activity', 'sleep', 'habit', 'hydration'
    title: String,
    description: String,
    details: mongoose.Schema.Types.Mixed,
    reason: String,
    confidence: String,
    completed: { type: Boolean, default: false }
  }],
  nutrition: {
    calories: Object,
    protein: Object,
    carbohydrates: Object,
    fat: Object,
    fiber: Object,
    hydration: Object
  },
  meals: [mongoose.Schema.Types.Mixed],
  activities: [mongoose.Schema.Types.Mixed],
  sleepPlan: Object,
  hydrationPlan: Object,
  habits: [mongoose.Schema.Types.Mixed],
  warnings: [String],
  explanations: [mongoose.Schema.Types.Mixed],
  auditLog: Object
}, { timestamps: true });

const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true }, // 'YYYY-MM-DD'
  steps: { type: Number, default: 0 },
  activeMinutes: { type: Number, default: 0 },
  waterLoggedMl: { type: Number, default: 0 },
  sleepHours: { type: Number, default: 0 },
  sleepConsistency: { type: String, default: 'good' },
  habitsCompleted: [{ type: String }],
  mealsCompleted: [{ type: String }],
  notes: String
}, { timestamps: true });

const feedbackSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  itemId: { type: String, required: true },
  itemType: { type: String, required: true }, // 'meal', 'activity', 'sleep', 'habit'
  rating: { type: String, required: true }, // 'loved', 'fine', 'disliked'
  comment: String,
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const auditLogSchema = new mongoose.Schema({
  userId: String,
  timestamp: { type: Date, default: Date.now },
  profileInputs: Object,
  rulesTriggered: [String],
  foodsBlocked: [String],
  foodsConsideredCount: Number,
  foodsSelected: [String],
  safetyFlags: [String],
  engineVersion: String,
  ruleVersion: String
}, { timestamps: true });

// Exports
export const User = new ModelAdapter('users', mongoose.models.User || mongoose.model('User', userSchema));
export const HealthProfile = new ModelAdapter('healthProfiles', mongoose.models.HealthProfile || mongoose.model('HealthProfile', healthProfileSchema));
export const Food = new ModelAdapter('foods', mongoose.models.Food || mongoose.model('Food', foodSchema));
export const ConditionRule = new ModelAdapter('conditionRules', mongoose.models.ConditionRule || mongoose.model('ConditionRule', conditionRuleSchema));
export const Exercise = new ModelAdapter('exercises', mongoose.models.Exercise || mongoose.model('Exercise', exerciseSchema));
export const Habit = new ModelAdapter('habits', mongoose.models.Habit || mongoose.model('Habit', habitSchema));
export const Recommendation = new ModelAdapter('recommendations', mongoose.models.Recommendation || mongoose.model('Recommendation', recommendationSchema));
export const Progress = new ModelAdapter('progress', mongoose.models.Progress || mongoose.model('Progress', progressSchema));
export const Feedback = new ModelAdapter('feedback', mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema));
export const AuditLog = new ModelAdapter('auditLogs', mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema));
