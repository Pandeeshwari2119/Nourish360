// DietaryFilter.js
export const checkDietaryPattern = (food, dietaryPattern = 'Vegetarian', otherRestrictions = []) => {
  const pattern = (dietaryPattern || 'Vegetarian').toLowerCase().trim();
  const restrictions = (otherRestrictions || []).map(r => r.toLowerCase().trim());

  // Strict pattern checks
  if (pattern === 'vegan') {
    if (!food.vegan || food.containsDairy || food.containsEgg || !food.vegetarian) {
      return { passed: false, blockedReason: 'Does not meet strict Vegan requirements (contains dairy, egg, or animal derivatives).' };
    }
  } else if (pattern === 'vegetarian') {
    if (!food.vegetarian || food.containsEgg) {
      return { passed: false, blockedReason: 'Does not meet Vegetarian requirements (contains egg, meat, or fish).' };
    }
  } else if (pattern === 'eggetarian') {
    // Allows vegetarian dishes and egg dishes, blocks meat, poultry, and fish
    const isMeatOrFish = (food.tags || []).some(t => ['lean-poultry', 'lean-fish', 'omega-3', 'lean-meat'].includes(t)) ||
      (food.allergens || []).includes('fish') ||
      (!food.vegetarian && !food.containsEgg);

    if (isMeatOrFish) {
      return { passed: false, blockedReason: 'Contains meat or fish unsuitable for Eggetarian dietary pattern.' };
    }
  }

  // Other explicit restrictions
  if (restrictions.includes('dairy-free') || restrictions.includes('dairy free')) {
    if (food.containsDairy || (food.allergens && food.allergens.includes('milk'))) {
      return { passed: false, blockedReason: 'Blocked due to selected Dairy-Free restriction.' };
    }
  }

  if (restrictions.includes('gluten-free') || restrictions.includes('gluten free')) {
    if (food.allergens && food.allergens.includes('wheat')) {
      return { passed: false, blockedReason: 'Blocked due to selected Gluten-Free restriction.' };
    }
    const ingredients = (food.ingredients || []).map(i => i.toLowerCase());
    if (ingredients.some(i => i.includes('wheat') || i.includes('maida') || i.includes('semolina'))) {
      return { passed: false, blockedReason: 'Blocked: ingredient contains gluten source.' };
    }
  }

  return { passed: true, blockedReason: null };
};