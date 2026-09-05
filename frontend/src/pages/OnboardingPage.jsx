import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWellness } from '../context/WellnessContext';
import { api } from '../services/api';
import { GenerationAnimation } from '../components/onboarding/GenerationAnimation';
import { Step1About } from '../components/onboarding/steps/Step1About';
import { Step2Health } from '../components/onboarding/steps/Step2Health';
import { Step3Allergies } from '../components/onboarding/steps/Step3Allergies';
import { Step4Habits } from '../components/onboarding/steps/Step4Habits';
import { Step5Routine } from '../components/onboarding/steps/Step5Routine';
import { Step6Activity } from '../components/onboarding/steps/Step6Activity';
import { Step7Sleep } from '../components/onboarding/steps/Step7Sleep';
import { Step8Goals } from '../components/onboarding/steps/Step8Goals';
import { Step9Review } from '../components/onboarding/steps/Step9Review';
import { ArrowLeft, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export const OnboardingPage = () => {
  const { user, setHasProfile } = useAuth();
  const { setPlan } = useWellness();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: 28,
    sex: 'female',
    height: 165,
    heightUnit: 'cm',
    weight: 62,
    weightUnit: 'kg',
    region: 'India / Global',
    occupation: 'Working professional',
    dailySchedule: 'Standard office hours',
    conditions: [],
    hasNoConditions: false,
    allergies: [],
    dietaryPattern: 'Vegetarian',
    otherRestrictions: [],
    foodPreferences: { favorites: [], disliked: [], avoids: [] },
    breakfastTime: '08:30',
    lunchTime: '13:00',
    dinnerTime: '20:30',
    snackFrequency: 'moderate',
    numberOfMeals: 3,
    favoriteCuisines: ['South Indian', 'North Indian'],
    cookingAvailability: 'often',
    wakeTime: '07:00',
    bedtime: '23:00',
    sittingHours: 8,
    stressLevel: 'moderate',
    averageDailySteps: 4000,
    walkingFrequency: 'daily',
    exerciseFrequency: '2-3 days/week',
    fitnessExperience: 'beginner',
    preferredActivities: ['Walking', 'Stretching', 'Yoga'],
    sleepDuration: 7.5,
    sleepConsistency: 'moderate',
    screenUseBeforeBed: true,
    nightEating: false,
    goals: ['Balanced eating', 'Improve daily routine', 'Improve activity']
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData(prev => {
      const current = prev[field] || [];
      const updated = current.includes(item)
        ? current.filter(x => x !== item)
        : [...current, item];
      return { ...prev, [field]: updated };
    });
  };

  const handleNext = () => {
    setError(null);
    setStep(prev => Math.min(9, prev + 1));
  };

  const handleBack = () => {
    setError(null);
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await api.saveProfile(formData);
      if (res.success) {
        setHasProfile(true);
        if (res.plan) setPlan(res.plan);
      } else {
        setIsGenerating(false);
        setError(res.message || 'Failed to save profile.');
      }
    } catch (e) {
      setIsGenerating(false);
      setError('Connection error while saving profile.');
    }
  };

  if (isGenerating) {
    return (
      <GenerationAnimation
        onComplete={() => {
          navigate('/dashboard');
        }}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
          <span>{step <= 8 ? `Step ${step} of 8` : 'Profile Summary'}</span>
          <span className="text-forest-700 font-bold">{Math.round((step / 8) * 100)}% Complete</span>
        </div>
        <div className="w-full h-2 rounded-full bg-stone-200/70 overflow-hidden">
          <div
            className="h-full bg-forest-600 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (step / 8) * 100)}%` }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-stone-200/80 p-6 md:p-10 shadow-soft">
        {step === 1 && <Step1About formData={formData} updateField={updateField} />}
        {step === 2 && <Step2Health formData={formData} setFormData={setFormData} toggleArrayItem={toggleArrayItem} />}
        {step === 3 && <Step3Allergies formData={formData} updateField={updateField} toggleArrayItem={toggleArrayItem} />}
        {step === 4 && <Step4Habits formData={formData} updateField={updateField} toggleArrayItem={toggleArrayItem} />}
        {step === 5 && <Step5Routine formData={formData} updateField={updateField} />}
        {step === 6 && <Step6Activity formData={formData} updateField={updateField} toggleArrayItem={toggleArrayItem} />}
        {step === 7 && <Step7Sleep formData={formData} updateField={updateField} />}
        {step === 8 && <Step8Goals formData={formData} toggleArrayItem={toggleArrayItem} />}
        {step === 9 && <Step9Review formData={formData} />}

        <div className="flex items-center justify-between pt-8 border-t border-stone-100 mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 9 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-semibold shadow-soft transition flex items-center gap-1.5 ml-auto"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGeneratePlan}
              className="px-6 py-3 rounded-2xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-bold shadow-soft-lg transition flex items-center gap-2 ml-auto"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate My Personalized Plan</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
