// adminRoutes.js
import express from 'express';
import { getDashboardStats, getAdminFoods, createFood, getAdminRules, getAuditTrail } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly);

router.get('/stats', getDashboardStats);
router.get('/foods', getAdminFoods);
router.post('/foods', createFood);
router.get('/rules', getAdminRules);
router.get('/audit-logs', getAuditTrail);

export default router;
