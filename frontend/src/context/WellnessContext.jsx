// WellnessContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const WellnessContext = createContext(null);

export const WellnessProvider = ({ children }) => {
  const { token, hasProfile } = useAuth();
  const [plan, setPlan] = useState(null);
  const [progress, setProgress] = useState(null);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWellnessData = async () => {
    if (!token || !hasProfile) return;
    setLoading(true);
    try {
      const [planRes, progRes, habRes] = await Promise.all([
        api.getTodayPlan(),
        api.getProgress(),
        api.getHabits()
      ]);

      if (planRes.success && planRes.plan) {
        setPlan(planRes.plan);
      }
      if (progRes.success) {
        setProgress(progRes);
      }
      if (habRes.success) {
        setHabits(habRes.habits);
      }
    } catch (e) {
      console.error('Error fetching wellness data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWellnessData();
  }, [token, hasProfile]);

  const swapMeal = async (slotId, newFoodId) => {
    try {
      const res = await api.swapMeal(slotId, newFoodId);
      if (res.success) {
        // Refresh plan
        const updated = await api.getTodayPlan();
        if (updated.success) setPlan(updated.plan);
        return { success: true, message: res.message };
      }
      return { success: false, message: res.message };
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  const toggleHabit = async (habitId) => {
    try {
      const res = await api.toggleHabit(habitId);
      if (res.success) {
        setHabits(prev => prev.map(h => 
          h.habitId === habitId ? { ...h, completedToday: res.completed } : h
        ));
        // Refresh progress
        const prog = await api.getProgress();
        if (prog.success) setProgress(prog);
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const logWater = async (amountMl) => {
    try {
      const res = await api.logProgress('water', amountMl);
      if (res.success) {
        const prog = await api.getProgress();
        if (prog.success) setProgress(prog);
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const submitFeedback = async (itemId, itemType, rating, comment = '') => {
    try {
      return await api.submitFeedback({ itemId, itemType, rating, comment });
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  return (
    <WellnessContext.Provider value={{
      plan,
      setPlan,
      progress,
      habits,
      loading,
      refreshPlan: fetchWellnessData,
      swapMeal,
      toggleHabit,
      logWater,
      submitFeedback
    }}>
      {children}
    </WellnessContext.Provider>
  );
};

export const useWellness = () => useContext(WellnessContext);
