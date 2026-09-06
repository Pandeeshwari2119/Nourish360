// WellnessContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const WellnessContext = createContext(null);

export const WellnessProvider = ({ children }) => {
  const { user, token, hasProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState(null);
  const [progress, setProgress] = useState(null);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load saved completed items for today from local storage
  const getTodayStorageKey = () => {
    const todayStr = new Date().toISOString().slice(0, 10);
    return `nourish360_completed_tasks_${user?._id || user?.id || 'guest'}_${todayStr}`;
  };

  const fetchWellnessData = async (forceRefresh = false) => {
    if (!token) return;
    setLoading(true);
    try {
      const [planRes, progRes, habRes, profRes] = await Promise.all([
        forceRefresh ? api.generatePlan() : api.getTodayPlan(),
        api.getProgress(),
        api.getHabits(),
        api.getProfile()
      ]);

      if (profRes && profRes.success && profRes.profile) {
        setProfile(profRes.profile);
      }

      if (planRes.success && planRes.plan) {
        let currentPlan = planRes.plan;
        
        // Merge with local storage completed tasks
        try {
          const savedCompleted = JSON.parse(localStorage.getItem(getTodayStorageKey()) || '[]');
          if (Array.isArray(savedCompleted) && currentPlan.dailyTimeline) {
            currentPlan.dailyTimeline = currentPlan.dailyTimeline.map(item => ({
              ...item,
              completed: savedCompleted.includes(item.id) || item.completed
            }));
          }
        } catch (e) {
          console.error(e);
        }

        setPlan(currentPlan);
      }
      if (progRes.success) {
        setProgress(progRes);
      }
      if (habRes.success && habRes.habits) {
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
  }, [token]);

  const swapMeal = async (slotId, newFoodId) => {
    try {
      const res = await api.swapMeal(slotId, newFoodId);
      if (res.success) {
        const updated = await api.getTodayPlan();
        if (updated.success) setPlan(updated.plan);
        return { success: true, message: res.message };
      }
      return { success: false, message: res.message };
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  const toggleTimelineItem = (itemId) => {
    setPlan(prev => {
      if (!prev || !prev.dailyTimeline) return prev;
      const updated = prev.dailyTimeline.map(item => {
        if (item.id === itemId) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });

      // Persist completed task IDs to localStorage
      try {
        const completedIds = updated.filter(item => item.completed).map(item => item.id);
        localStorage.setItem(getTodayStorageKey(), JSON.stringify(completedIds));
      } catch (e) {
        console.error(e);
      }

      return { ...prev, dailyTimeline: updated };
    });
  };

  const toggleHabit = async (habitId) => {
    // Optimistic UI update
    setHabits(prev => prev.map(h => 
      h.habitId === habitId ? { ...h, completedToday: !h.completedToday } : h
    ));

    try {
      const res = await api.toggleHabit(habitId);
      if (res.success) {
        const prog = await api.getProgress();
        if (prog.success) setProgress(prog);
        return true;
      }
    } catch (e) {
      console.error('Error toggling habit:', e);
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
      profile,
      setProfile,
      plan,
      setPlan,
      progress,
      habits,
      loading,
      refreshPlan: () => fetchWellnessData(true),
      swapMeal,
      toggleTimelineItem,
      toggleHabit,
      logWater,
      submitFeedback
    }}>
      {children}
    </WellnessContext.Provider>
  );
};

export const useWellness = () => useContext(WellnessContext);