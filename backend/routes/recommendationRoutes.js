// recommendationRoutes.js
import express from 'express';
import { generate, getToday, getWeek, submitFeedback } from '../controllers/recommendationController.js';
import { getSwapCandidates, swapMeal } from '../controllers/mealSwapController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, generate);
router.get('/today', protect, getToday);
router.get('/week', protect, getWeek);
router.post('/feedback', protect, submitFeedback);

// Meal Swap Endpoints
router.get('/swap-candidates', protect, getSwapCandidates);
router.post('/swap', protect, swapMeal);

export default router;
