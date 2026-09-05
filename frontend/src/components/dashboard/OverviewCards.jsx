// OverviewCards.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Footprints, Droplets, Moon, Sparkles, ArrowUpRight } from 'lucide-react';

export const OverviewCards = ({ plan, progress }) => {
  const cards = [
    {
      title: 'Meals',
      subtitle: `${plan?.meals?.length || 4} scheduled today`,
      stat: `${plan?.nutrition?.calories?.value || 2000} kcal`,
      subStat: 'Target energy',
      icon: Utensils,
      color: 'bg-amber-50 text-amber-800 border-amber-200/60',
      iconBg: 'bg-amber-100/80',
      link: '/plan'
    },
    {
      title: 'Movement',
      subtitle: `${plan?.activityPlan?.activeMinutesGoal || 25} active mins target`,
      stat: `${plan?.activityPlan?.targetDailySteps || 5000} steps`,
      subStat: 'Gradual goal',
      icon: Footprints,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
      iconBg: 'bg-emerald-100/80',
      link: '/movement'
    },
    {
      title: 'Hydration',
      subtitle: `${progress?.today?.waterLoggedMl || 1750} ml logged`,
      stat: `${plan?.hydrationPlan?.targetLiters || 2.5} L`,
      subStat: 'Daily guidance',
      icon: Droplets,
      color: 'bg-sky-50 text-sky-800 border-sky-200/60',
      iconBg: 'bg-sky-100/80',
      link: '/hydration'
    },
    {
      title: 'Sleep',
      subtitle: `Target bedtime: ${plan?.sleepPlan?.targetBedtime || '23:00'}`,
      stat: `${plan?.sleepPlan?.estimatedDurationHours || 7.5} hrs`,
      subStat: 'Target rest',
      icon: Moon,
      color: 'bg-indigo-50 text-indigo-800 border-indigo-200/60',
      iconBg: 'bg-indigo-100/80',
      link: '/sleep'
    },
    {
      title: 'Habits',
      subtitle: `${plan?.habits?.length || 4} micro-routines`,
      stat: `${progress?.today?.habitsCompleted?.length || 0}/${plan?.habits?.length || 4}`,
      subStat: 'Completed today',
      icon: Sparkles,
      color: 'bg-sage-50 text-forest-800 border-sage-200/60',
      iconBg: 'bg-sage-100',
      link: '/habits',
      fullWidthMobile: true
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <Link
            key={i}
            to={c.link}
            className={`p-4 rounded-3xl border ${c.color} ${c.fullWidthMobile ? 'col-span-2 sm:col-span-1' : ''} transition hover:-translate-y-1 hover:shadow-soft flex flex-col justify-between group relative overflow-hidden`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-2xl ${c.iconBg} shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{c.title}</div>
              <div className="text-xl font-bold font-serif mt-0.5">{c.stat}</div>
              <div className="text-[11px] opacity-75 mt-1 font-medium">{c.subtitle}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};