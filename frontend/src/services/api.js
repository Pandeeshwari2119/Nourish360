// api.js
const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';

const getHeaders = () => {
  const token = localStorage.getItem('nourish360_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth
  async register(data) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async login(data) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders()
    });
    return res.json();
  },

  async updateSettings(settings) {
    const res = await fetch(`${API_BASE}/auth/settings`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ settings })
    });
    return res.json();
  },

  async forgotPassword(email) {
    const res = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email })
    });
    return res.json();
  },

  async resetPassword(token, newPassword) {
    const res = await fetch(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ token, newPassword })
    });
    return res.json();
  },

  // Health Profile
  async getProfile() {
    const res = await fetch(`${API_BASE}/profile`, { headers: getHeaders() });
    return res.json();
  },

  async saveProfile(profileData) {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(profileData)
    });
    return res.json();
  },

  async recalculatePlan() {
    const res = await fetch(`${API_BASE}/profile/recalculate`, {
      method: 'POST',
      headers: getHeaders()
    });
    return res.json();
  },

  // Recommendations & Plan
  async getTodayPlan() {
    const res = await fetch(`${API_BASE}/recommendations/today`, { headers: getHeaders() });
    return res.json();
  },

  async getWeeklyPlan() {
    const res = await fetch(`${API_BASE}/recommendations/week`, { headers: getHeaders() });
    return res.json();
  },

  async submitFeedback(data) {
    const res = await fetch(`${API_BASE}/recommendations/feedback`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Meal Swap
  async getSwapCandidates(foodId, mealType) {
    const res = await fetch(`${API_BASE}/recommendations/swap-candidates?foodId=${foodId}&mealType=${mealType}`, {
      headers: getHeaders()
    });
    return res.json();
  },

  async swapMeal(slotId, newFoodId) {
    const res = await fetch(`${API_BASE}/recommendations/swap`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ slotId, newFoodId })
    });
    return res.json();
  },

  // Foods Explorer
  async searchFoods(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/foods/search?${query}`, { headers: getHeaders() });
    return res.json();
  },

  async getFoodById(id) {
    const res = await fetch(`${API_BASE}/foods/${id}`, { headers: getHeaders() });
    return res.json();
  },

  // Activity & Workouts
  async getActivityPlan() {
    const res = await fetch(`${API_BASE}/activity/plan`, { headers: getHeaders() });
    return res.json();
  },

  async getWorkouts(category) {
    const q = category ? `?category=${category}` : '';
    const res = await fetch(`${API_BASE}/activity/workouts${q}`, { headers: getHeaders() });
    return res.json();
  },

  // Habits
  async getHabits() {
    const res = await fetch(`${API_BASE}/habits`, { headers: getHeaders() });
    return res.json();
  },

  async toggleHabit(habitId) {
    const res = await fetch(`${API_BASE}/habits/${habitId}/toggle`, {
      method: 'POST',
      headers: getHeaders()
    });
    return res.json();
  },

  // Progress
  async getProgress() {
    const res = await fetch(`${API_BASE}/progress`, { headers: getHeaders() });
    return res.json();
  },

  async logProgress(type, amount) {
    const res = await fetch(`${API_BASE}/progress/log`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ type, amount })
    });
    return res.json();
  },

  // Admin
  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`, { headers: getHeaders() });
    return res.json();
  },

  async getAdminFoods() {
    const res = await fetch(`${API_BASE}/admin/foods`, { headers: getHeaders() });
    return res.json();
  },

  async getAdminRules() {
    const res = await fetch(`${API_BASE}/admin/rules`, { headers: getHeaders() });
    return res.json();
  },

  async getAdminAuditLogs() {
    const res = await fetch(`${API_BASE}/admin/audit-logs`, { headers: getHeaders() });
    return res.json();
  }
};