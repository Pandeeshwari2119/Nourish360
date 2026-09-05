// progressRoutes.js
import express from 'express';
import { getProgress, logMetric } from '../controllers/progressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getProgress);
router.post('/log', protect, logMetric);

export default router;
