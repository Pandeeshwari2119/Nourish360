// foodController.js
import { Food } from '../models/schemas.js';
import { foodsData } from '../data/foodsData.js';

export const searchFoods = async (req, res, next) => {
  try {
    const { q, query, cuisine, mealType, vegetarian, vegan, allergenFree } = req.query;
    const searchTerm = (q || query || '').toLowerCase().trim();
    const allFoods = await Food.find({});

    let results = allFoods.filter(food => {
      if (searchTerm) {
        const matchesName = food.name.toLowerCase().includes(searchTerm);
        const matchesIngredient = (food.ingredients || []).some(i => i.toLowerCase().includes(searchTerm));
        const matchesTags = (food.tags || []).some(t => t.toLowerCase().includes(searchTerm));
        const matchesCategory = (food.category || '').toLowerCase().includes(searchTerm);
        if (!matchesName && !matchesIngredient && !matchesTags && !matchesCategory) return false;
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

export const seedLiveFoods = async (req, res, next) => {
  try {
    for (const food of foodsData) {
      await Food.findOneAndUpdate({ foodId: food.foodId }, food, { upsert: true });
    }
    const count = await Food.countDocuments({});
    res.json({ success: true, message: `Successfully seeded ${foodsData.length} verified foods! Total in database: ${count}` });
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
