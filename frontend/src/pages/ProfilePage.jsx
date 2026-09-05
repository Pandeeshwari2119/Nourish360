import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useWellness } from '../context/WellnessContext';
import { UserCheck, Sparkles, RefreshCw, AlertCircle, Edit3 } from 'lucide-react';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { setPlan } = useWellness();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recalculating, setRecalculating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.getProfile();
        if (res.success) {
          setProfile(res.profile);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleRecalculate = async () => {
    setRecalculating(true);
    setMessage('');
    try {
      const res = await api.recalculatePlan();
      if (res.success) {
        setPlan(res.plan);
        setMessage('Personalized plan successfully refreshed with your latest profile!');
      }
    } catch (e) {
      setMessage('Failed to regenerate plan.');
    } finally {
      setRecalculating(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-xs text-stone-400">Loading your profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">Account Overview</span>
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 mt-1">Your Wellness Profile</h1>
          <p className="text-xs md:text-sm text-stone-500 mt-1">
            Voluntarily submitted parameters used by the recommendation engine.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/onboarding')}
            className="px-4 py-2.5 rounded-2xl bg-white border border-stone-200 hover:border-forest-500 text-stone-700 text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
          <button
            disabled={recalculating}
            onClick={handleRecalculate}
            className="px-5 py-2.5 rounded-2xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-semibold shadow-soft transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${recalculating ? 'animate-spin' : ''}`} />
            <span>Regenerate Plan</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          {message}
        </div>
      )}

      {profile ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-base text-stone-800 border-b pb-2">About You</h3>
            <div className="text-xs space-y-2 text-stone-600">
              <div className="flex justify-between"><span className="text-stone-400">Age:</span><span className="font-medium">{profile.age} yrs</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Sex:</span><span className="font-medium capitalize">{profile.sex}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Height:</span><span className="font-medium">{profile.height} {profile.heightUnit || 'cm'}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Weight:</span><span className="font-medium">{profile.weight} {profile.weightUnit || 'kg'}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Region:</span><span className="font-medium">{profile.region || 'Global'}</span></div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-base text-stone-800 border-b pb-2">Health & Allergies</h3>
            <div className="text-xs space-y-2 text-stone-600">
              <div>
                <span className="text-stone-400 block mb-1">Reported Conditions:</span>
                <span className="font-semibold text-stone-800">
                  {profile.hasNoConditions ? 'No diagnosed condition reported' : (profile.conditions || []).join(', ') || 'None'}
                </span>
              </div>
              <div className="pt-2">
                <span className="text-stone-400 block mb-1">Hard Allergen Blocks:</span>
                <span className="font-semibold text-rose-700">
                  {(profile.allergies || []).length > 0 ? profile.allergies.join(', ') : 'None'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-base text-stone-800 border-b pb-2">Diet & Routine Hours</h3>
            <div className="text-xs space-y-2 text-stone-600">
              <div className="flex justify-between"><span className="text-stone-400">Dietary Pattern:</span><span className="font-semibold">{profile.dietaryPattern}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Cuisines:</span><span className="font-medium">{(profile.favoriteCuisines || []).join(', ')}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Breakfast:</span><span className="font-medium">{profile.breakfastTime}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Lunch:</span><span className="font-medium">{profile.lunchTime}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Dinner:</span><span className="font-medium">{profile.dinnerTime}</span></div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-base text-stone-800 border-b pb-2">Movement & Sleep</h3>
            <div className="text-xs space-y-2 text-stone-600">
              <div className="flex justify-between"><span className="text-stone-400">Baseline Steps:</span><span className="font-medium">{profile.averageDailySteps}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Experience:</span><span className="font-medium capitalize">{profile.fitnessExperience}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Wake / Bed:</span><span className="font-medium">{profile.wakeTime} – {profile.bedtime}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Target Sleep:</span><span className="font-medium">{profile.sleepDuration} hrs</span></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-3xl border border-stone-200">
          <p className="text-xs text-stone-500 mb-4">No wellness profile found yet.</p>
          <button
            onClick={() => navigate('/onboarding')}
            className="px-5 py-2.5 rounded-2xl bg-forest-600 text-white text-xs font-bold shadow-soft"
          >
            Complete Onboarding Now
          </button>
        </div>
      )}
    </div>
  );
};
