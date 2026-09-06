// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('nourish360_token') || null);
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const data = await api.getMe();
      if (data.success) {
        setUser(data.user);
        setHasProfile(data.hasProfile);
      } else {
        logout();
      }
    } catch (e) {
      console.error('Failed to verify token:', e);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    const data = await api.login({ email, password });
    if (data.success) {
      localStorage.setItem('nourish360_token', data.token);
      setToken(data.token);
      setUser(data.user);
      setHasProfile(data.hasProfile);
      return { success: true, hasProfile: data.hasProfile };
    }
    return { success: false, message: data.message };
  };

  const register = async (name, email, password) => {
    const data = await api.register({ name, email, password });
    if (data.success) {
      localStorage.setItem('nourish360_token', data.token);
      setToken(data.token);
      setUser(data.user);
      setHasProfile(false);
      return { success: true };
    }
    return { success: false, message: data.message };
  };

  const updateUserSession = (userData, profileExists = true) => {
    if (userData) setUser(userData);
    setHasProfile(profileExists);
  };

  const logout = () => {
    localStorage.removeItem('nourish360_token');
    setToken(null);
    setUser(null);
    setHasProfile(false);
  };

  const updateSettings = async (newSettings) => {
    try {
      const data = await api.updateSettings(newSettings);
      if (data.success && user) {
        setUser({ ...user, settings: data.settings });
      }
      return data;
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      hasProfile,
      loading,
      login,
      register,
      logout,
      updateSettings,
      setHasProfile,
      updateUserSession,
      refreshAuth: checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
