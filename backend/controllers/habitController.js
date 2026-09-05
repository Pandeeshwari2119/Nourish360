// habitController.js
import { Habit, Progress } from '../models/schemas.js';

export const getHabits = async (req, res, next) => {
  try {
    const habits = await Habit.find({});
    const todayStr = new Date().toISOString().split('T')[0];
    const progress = await Progress.findOne({ userId: req.user._id, date: todayStr });

    const completedIds = progress?.habitsCompleted || [];

    const habitsWithStatus = habits.map(h => ({
      ...h,
      completedToday: completedIds.includes(h.habitId)
    }));

    res.json({ success: true, habits: habitsWithStatus });
  } catch (err) {
    next(err);
  }
};

export const toggleHabit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todayStr = new Date().toISOString().split('T')[0];

    let progress = await Progress.findOne({ userId: req.user._id, date: todayStr });
    if (!progress) {
      progress = await Progress.create({
        userId: req.user._id,
        date: todayStr,
        habitsCompleted: []
      });
    }

    const currentCompleted = progress.habitsCompleted || [];
    let updated;
    if (currentCompleted.includes(id)) {
      updated = currentCompleted.filter(hId => hId !== id);
    } else {
      updated = [...currentCompleted, id];
    }

    await Progress.findOneAndUpdate(
      { userId: req.user._id, date: todayStr },
      { $set: { habitsCompleted: updated } }
    );

    res.json({
      success: true,
      habitId: id,
      completed: updated.includes(id),
      habitsCompletedToday: updated
    });
  } catch (err) {
    next(err);
  }
};
