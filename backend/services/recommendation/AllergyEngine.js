// AllergyEngine.js
const ALLERGEN_KEYWORD_MAP = {
  peanuts: ['peanut', 'peanuts', 'groundnut', 'groundnuts', 'peanut butter', 'arachis oil'],
  'tree nuts': ['cashew', 'cashews', 'almond', 'almonds', 'walnut', 'walnuts', 'pistachio', 'pistachios', 'hazelnut', 'pecan'],
  milk: ['milk', 'dairy', 'curd', 'yogurt', 'paneer', 'cheese', 'ghee', 'butter', 'cream', 'casein', 'whey'],
  eggs: ['egg', 'eggs', 'albumen', 'egg yolk'],
  soy: ['soy', 'soya', 'tofu', 'edamame', 'tamari', 'miso', 'soy sauce'],
  wheat: ['wheat', 'gluten', 'maida', 'semolina', 'suji', 'roti', 'bread', 'pasta', 'atta', 'soba'],
  seafood: ['fish', 'salmon', 'tuna', 'cod', 'shrimp', 'prawn', 'crab', 'lobster', 'seafood'],
  sesame: ['sesame', 'tahini', 'til', 'gingelly'],
  coconut: ['coconut', 'coconut milk', 'coconut oil', 'coconut chutney']
};

export const checkAllergies = (food, userAllergies = []) => {
  if (!userAllergies || userAllergies.length === 0) {
    return { passed: true, blockedReason: null };
  }

  const normalizedUserAllergies = userAllergies.map(a => a.toLowerCase().trim());
  const foodAllergens = (food.allergens || []).map(a => a.toLowerCase().trim());
  const foodIngredients = (food.ingredients || []).map(i => i.toLowerCase().trim());
  const foodName = (food.name || '').toLowerCase();

  for (const allergy of normalizedUserAllergies) {
    // 1. Direct allergen tag check
    if (foodAllergens.includes(allergy)) {
      return {
        passed: false,
        blockedReason: `Contains declared allergen: "${allergy}".`
      };
    }

    // 2. Keyword tree search in ingredients and name
    const keywords = ALLERGEN_KEYWORD_MAP[allergy] || [allergy];
    for (const keyword of keywords) {
      if (foodName.includes(keyword)) {
        return {
          passed: false,
          blockedReason: `Food title includes "${keyword}", which conflicts with your reported "${allergy}" allergy.`
        };
      }
      for (const ingredient of foodIngredients) {
        if (ingredient.includes(keyword)) {
          return {
            passed: false,
            blockedReason: `Ingredient "${ingredient}" contains "${keyword}", triggering a hard safety block for "${allergy}".`
          };
        }
      }
    }
  }

  return { passed: true, blockedReason: null };
};
