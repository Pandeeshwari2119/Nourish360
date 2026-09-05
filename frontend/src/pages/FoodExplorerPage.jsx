import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Search, Filter, X, Sparkles, Tag, ShieldCheck } from 'lucide-react';

export const FoodExplorerPage = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('All');
  const [mealType, setMealType] = useState('All');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [veganOnly, setVeganOnly] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.q = search;
      if (cuisine !== 'All') params.cuisine = cuisine;
      if (mealType !== 'All') params.mealType = mealType;
      if (vegetarianOnly) params.vegetarian = 'true';
      if (veganOnly) params.vegan = 'true';

      const res = await api.searchFoods(params);
      if (res.success) {
        setFoods(res.foods || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFoods();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, cuisine, mealType, vegetarianOnly, veganOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">Database Explorer</span>
        <h1 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 mt-1">Food Explorer</h1>
        <p className="text-xs md:text-sm text-stone-500 mt-1">
          Explore our database of verified dishes, complete nutritional profiles, and ingredient trees.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white/90 p-4 md:p-6 rounded-3xl border border-stone-200 shadow-soft space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dishes, ingredients, or keywords..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl border border-stone-200 focus:outline-none focus:border-forest-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="px-3 py-2.5 text-xs rounded-2xl border border-stone-200 bg-white"
            >
              <option value="All">All Cuisines</option>
              <option value="South Indian">South Indian</option>
              <option value="North Indian">North Indian</option>
              <option value="Asian">Asian</option>
              <option value="Western">Western</option>
              <option value="Mediterranean">Mediterranean</option>
            </select>

            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="px-3 py-2.5 text-xs rounded-2xl border border-stone-200 bg-white"
            >
              <option value="All">All Slots</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snacks</option>
            </select>

            <button
              onClick={() => setVegetarianOnly(!vegetarianOnly)}
              className={`px-3 py-2 rounded-2xl text-xs font-semibold border transition ${
                vegetarianOnly ? 'bg-forest-600 text-white border-forest-600 shadow-sm' : 'border-stone-200 text-stone-600'
              }`}
            >
              🌱 Veg Only
            </button>

            <button
              onClick={() => setVeganOnly(!veganOnly)}
              className={`px-3 py-2 rounded-2xl text-xs font-semibold border transition ${
                veganOnly ? 'bg-forest-600 text-white border-forest-600 shadow-sm' : 'border-stone-200 text-stone-600'
              }`}
            >
              🌿 Vegan
            </button>
          </div>
        </div>
      </div>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full py-16 text-center text-xs text-stone-400">Loading food database...</div>
        ) : foods.length === 0 ? (
          <div className="col-span-full py-16 text-center text-xs text-stone-400">No matching dishes found.</div>
        ) : (
          foods.map((food) => (
            <div
              key={food.foodId}
              onClick={() => setSelectedFood(food)}
              className="p-5 rounded-3xl bg-white border border-stone-200 shadow-soft hover:shadow-soft-lg hover:border-forest-500/40 transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-forest-700 bg-sage-100 px-2.5 py-0.5 rounded-lg">
                    {food.cuisine}
                  </span>
                  <span className="text-[11px] text-stone-400">{food.category}</span>
                </div>

                <h3 className="font-serif font-bold text-base text-stone-800 group-hover:text-forest-700 transition">
                  {food.name}
                </h3>
                <div className="text-[11px] text-stone-500 mt-0.5">{food.servingSize}</div>

                <div className="grid grid-cols-4 gap-1 py-2.5 my-2 border-y border-stone-100 text-center text-[11px]">
                  <div>
                    <span className="text-[9px] text-stone-400 block">Kcal</span>
                    <span className="font-bold text-stone-700">{food.calories}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-400 block">Protein</span>
                    <span className="font-bold text-stone-700">{food.protein}g</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-400 block">Carbs</span>
                    <span className="font-bold text-stone-700">{food.carbohydrates}g</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-400 block">Fiber</span>
                    <span className="font-bold text-stone-700">{food.fiber}g</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {(food.tags || []).slice(0, 3).map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] bg-stone-50 text-stone-500 px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Food Detail Modal */}
      {selectedFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-6 relative border border-stone-100 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-bold text-forest-700 uppercase">{selectedFood.cuisine}</span>
                <h3 className="font-serif font-bold text-xl text-stone-900">{selectedFood.name}</h3>
              </div>
              <button
                onClick={() => setSelectedFood(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center p-3 rounded-2xl bg-stone-50 text-xs">
              <div><span className="text-[10px] text-stone-400 block">Calories</span><span className="font-bold">{selectedFood.calories} kcal</span></div>
              <div><span className="text-[10px] text-stone-400 block">Protein</span><span className="font-bold">{selectedFood.protein}g</span></div>
              <div><span className="text-[10px] text-stone-400 block">Carbs</span><span className="font-bold">{selectedFood.carbohydrates}g</span></div>
              <div><span className="text-[10px] text-stone-400 block">Fat</span><span className="font-bold">{selectedFood.fat}g</span></div>
            </div>

            {selectedFood.ingredients && (
              <div>
                <h4 className="text-xs font-bold text-stone-700 mb-1.5">Ingredients</h4>
                <div className="flex flex-wrap gap-1.5 text-xs text-stone-600">
                  {selectedFood.ingredients.map((ing, i) => (
                    <span key={i} className="px-2.5 py-1 bg-stone-100 rounded-lg">{ing}</span>
                  ))}
                </div>
              </div>
            )}

            {selectedFood.allergens && selectedFood.allergens.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-rose-700 mb-1">Declared Allergens</h4>
                <div className="flex flex-wrap gap-1.5 text-xs text-rose-700">
                  {selectedFood.allergens.map((alg, i) => (
                    <span key={i} className="px-2.5 py-1 bg-rose-50 border border-rose-200 rounded-lg">{alg}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-400 flex items-center justify-between">
              <span>Source: {selectedFood.source}</span>
              <span>v{selectedFood.sourceVersion}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
