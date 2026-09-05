// foodRoutes.js
import express from 'express';
import { searchFoods, getFoodById } from '../controllers/foodController.js';

const router = express.Router();

router.get('/search', searchFoods);
router.get('/:id', getFoodById);

export default router;
