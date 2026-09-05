// habitRoutes.js
import express from 'express';
import { getHabits, toggleHabit } from '../controllers/habitController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getHabits);
router.post('/:id/toggle', protect, toggleHabit);

export default router;
