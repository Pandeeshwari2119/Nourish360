// foodRoutes.js
import express from 'express';
import { searchFoods, getFoodById, seedLiveFoods } from '../controllers/foodController.js';

const router = express.Router();

router.get('/search', searchFoods);
router.get('/seed', seedLiveFoods);
router.post('/seed', seedLiveFoods);
router.get('/:id', getFoodById);

export default router;
