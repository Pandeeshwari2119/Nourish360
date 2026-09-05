// activityRoutes.js
import express from 'express';
import { getActivityPlan, getWorkouts } from '../controllers/activityController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/plan', protect, getActivityPlan);
router.get('/workouts', getWorkouts);

export default router;
