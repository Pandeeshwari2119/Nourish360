import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../config/db.js';
import { Food, ConditionRule, Exercise, Habit, User } from '../models/schemas.js';
import { foodsData } from './foodsData.js';
import { conditionsData } from './conditionsData.js';
import { exercisesData } from './exercisesData.js';
import { habitsData } from './habitsData.js';
import bcrypt from 'bcryptjs';

export const seedDatabase = async () => {
  console.log('[Seed] Starting database seed process...');
  await connectDB();

  // 1. Seed Foods
  for (const food of foodsData) {
    await Food.findOneAndUpdate({ foodId: food.foodId }, food, { upsert: true });
  }
  console.log(`[Seed] Seeded ${foodsData.length} verified foods.`);

  // 2. Seed Conditions & Condition Rules
  for (const condition of conditionsData) {
    await ConditionRule.findOneAndUpdate({ ruleId: condition.ruleId }, condition, { upsert: true });
  }
  console.log(`[Seed] Seeded ${conditionsData.length} clinical wellness condition rules.`);

  // 3. Seed Exercises
  for (const exercise of exercisesData) {
    await Exercise.findOneAndUpdate({ exerciseId: exercise.exerciseId }, exercise, { upsert: true });
  }
  console.log(`[Seed] Seeded ${exercisesData.length} structured exercises.`);

  // 4. Seed Habits
  for (const habit of habitsData) {
    await Habit.findOneAndUpdate({ habitId: habit.habitId }, habit, { upsert: true });
  }
  console.log(`[Seed] Seeded ${habitsData.length} evidence-backed micro-habits.`);

  // 5. Seed Admin / Demo User if not exists
  const existingAdmin = await User.findOne({ email: 'admin@nourish360.local' });
  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Admin@12345', salt);
    await User.create({
      name: 'Nourish360 Admin',
      email: 'admin@nourish360.local',
      passwordHash,
      role: 'admin',
      settings: {
        units: 'metric',
        reducedMotion: false,
        notifications: { meals: true, water: true, activity: true, windDown: true, habits: true }
      }
    });
    console.log('[Seed] Created default administrator account (admin@nourish360.local / Admin@12345).');
  }

  // Demo user
  const existingDemo = await User.findOne({ email: 'demo@nourish360.local' });
  if (!existingDemo) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Demo@12345', salt);
    await User.create({
      name: 'Maya Patel',
      email: 'demo@nourish360.local',
      passwordHash,
      role: 'user',
      settings: {
        units: 'metric',
        reducedMotion: false,
        notifications: { meals: true, water: true, activity: true, windDown: true, habits: true }
      }
    });
    console.log('[Seed] Created demo user account (demo@nourish360.local / Demo@12345).');
  }

  console.log('[Seed] Database initialization completed successfully.');
};

// If run directly via `node data/seed.js`
if (process.argv[1]?.endsWith('seed.js')) {
  seedDatabase().then(() => {
    process.exit(0);
  }).catch((err) => {
    console.error('[Seed] Error during seeding:', err);
    process.exit(1);
  });
}
