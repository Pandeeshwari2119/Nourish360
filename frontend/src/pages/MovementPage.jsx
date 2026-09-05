import React, { useState, useEffect } from 'react';
import { useWellness } from '../context/WellnessContext';
import { api } from '../services/api';
import { Footprints, Dumbbell, Clock, ShieldAlert, Check, Plus } from 'lucide-react';

export const MovementPage = () => {
  const { plan, progress, logWater } = useWellness();
  const [workouts, setWorkouts] = useState([]);
  const [category, setCategory] = useState('All');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [loggedSteps, setLoggedSteps] = useState(progress?.today?.steps || 4500);
  const [stepSaved, setStepSaved] = useState(false);

  const actPlan = plan?.activityPlan || {};

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await api.getWorkouts(category === 'All' ? null : category);
      if (res.success) {
        setWorkouts(res.workouts || []);
      }
    };
    fetchWorkouts();
  }, [category]);

  const handleSaveSteps = async () => {
    await api.logProgress('steps', loggedSteps);
    setStepSaved(true);
    setTimeout(() => setStepSaved(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">Physical Activity</span>
        <h1 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 mt-1">Daily Movement & Workouts</h1>
        <p className="text-xs md:text-sm text-stone-500 mt-1">
          Progressive movement routines designed to build sustainable stamina without burnout.
        </p>
      </div>

      {/* Today's Movement Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-2">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Today's Target Steps</span>
          <div className="text-3xl font-bold font-serif text-forest-700">
            {actPlan.targetDailySteps || 5000}
          </div>
          <p className="text-xs text-stone-500 leading-snug">
            {actPlan.progressionNote || 'Gradual, realistic daily step target.'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-2">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Active Minutes Goal</span>
          <div className="text-3xl font-bold font-serif text-forest-700">
            {actPlan.activeMinutesGoal || 25} <span className="text-sm font-sans font-medium text-stone-400">mins</span>
          </div>
          <p className="text-xs text-stone-500 leading-snug">
            Walking sessions and low-impact mobility intervals.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-3">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Log Today’s Steps</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={loggedSteps}
              onChange={(e) => setLoggedSteps(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-forest-500"
            />
            <button
              onClick={handleSaveSteps}
              className="px-4 py-2 rounded-xl bg-forest-600 text-white text-xs font-semibold transition shrink-0"
            >
              {stepSaved ? 'Saved ✓' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* Workout Library (Section 18) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
          <div>
            <h2 className="font-serif font-bold text-2xl text-stone-900">Workout Library</h2>
            <p className="text-xs text-stone-500">Filter-safe routines with clear contraindication metadata.</p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {['All', 'Walking', 'Stretching', 'Mobility', 'Yoga', 'Home workout', 'Strength', 'Cardio'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium transition ${
                  category === cat ? 'bg-forest-600 text-white shadow-sm' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workouts.map(workout => (
            <div
              key={workout.exerciseId}
              onClick={() => setSelectedWorkout(workout)}
              className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft hover:shadow-soft-lg hover:border-forest-500/40 transition cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase bg-sage-100 text-forest-700 px-2.5 py-0.5 rounded-md">
                    {workout.category}
                  </span>
                  <span className="text-xs text-stone-400 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {workout.durationMinutes} mins
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-stone-800">{workout.name}</h3>

                <div className="text-xs text-stone-500">
                  <span className="font-semibold text-stone-600">Equipment: </span>
                  {workout.equipment}
                </div>

                <div className="text-xs text-stone-500">
                  <span className="font-semibold text-stone-600">Level: </span>
                  {workout.difficulty}
                </div>
              </div>

              {workout.contraindications && workout.contraindications.length > 0 && (
                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-amber-700 flex items-center gap-1.5 font-medium">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                  <span>Caution: {workout.contraindications[0]}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Workout Detail Modal */}
      {selectedWorkout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-6 relative border border-stone-100 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-bold uppercase text-forest-700">{selectedWorkout.category}</span>
                <h3 className="font-serif font-bold text-xl text-stone-900">{selectedWorkout.name}</h3>
              </div>
              <button
                onClick={() => setSelectedWorkout(null)}
                className="text-xs font-semibold px-3 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 transition"
              >
                Close
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold text-stone-700 mb-2">Instructions</h4>
              <div className="space-y-2 text-xs text-stone-600">
                {(selectedWorkout.instructions || []).map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-sage-100 text-forest-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {sIdx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedWorkout.safetyNotes && (
              <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> Safety Notes:
                </span>
                <p className="text-[11px] leading-relaxed">{selectedWorkout.safetyNotes.join(' ')}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
