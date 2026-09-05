// foodController.js
import { Food } from '../models/schemas.js';

export const searchFoods = async (req, res, next) => {
  try {
    const { q, cuisine, mealType, vegetarian, vegan, allergenFree } = req.query;
    const allFoods = await Food.find({});

    let results = allFoods.filter(food => {
      if (q) {
        const query = q.toLowerCase();
        const matchesName = food.name.toLowerCase().includes(query);
        const matchesIngredient = (food.ingredients || []).some(i => i.toLowerCase().includes(query));
        const matchesTags = (food.tags || []).some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesIngredient && !matchesTags) return false;
      }

      if (cuisine && cuisine !== 'All') {
        if (!food.cuisine.toLowerCase().includes(cuisine.toLowerCase())) return false;
      }

      if (mealType && mealType !== 'All') {
        if (!food.mealTypes.includes(mealType.toLowerCase())) return false;
      }

      if (vegetarian === 'true' && !food.vegetarian) return false;
      if (vegan === 'true' && !food.vegan) return false;

      if (allergenFree) {
        const excludedAllergens = allergenFree.split(',').map(a => a.toLowerCase().trim());
        const hasAllergen = (food.allergens || []).some(fa => excludedAllergens.includes(fa.toLowerCase()));
        if (hasAllergen) return false;
      }

      return true;
    });

    res.json({ success: true, count: results.length, foods: results });
  } catch (err) {
    next(err);
  }
};

export const getFoodById = async (req, res, next) => {
  try {
    const food = await Food.findOne({ foodId: req.params.id });
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food item not found.' });
    }
    res.json({ success: true, food });
  } catch (err) {
    next(err);
  }
};
