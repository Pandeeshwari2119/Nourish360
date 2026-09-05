// profileRoutes.js
import express from 'express';
import { getProfile, saveProfile, recalculate } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getProfile);
router.post('/', protect, saveProfile);
router.post('/recalculate', protect, recalculate);

export default router;
