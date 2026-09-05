// SleepEngine.js
export const generateSleepPlan = (profile) => {
  const targetBedtime = profile.bedtime || '23:00';
  const targetWakeTime = profile.wakeTime || '07:00';

  // Compute wind-down start time (approx 45 minutes before bedtime)
  const [bHour, bMin] = targetBedtime.split(':').map(Number);
  let wHour = bHour;
  let wMin = bMin - 45;
  if (wMin < 0) {
    wMin += 60;
    wHour = (wHour - 1 + 24) % 24;
  }
  const windDownTime = `${String(wHour).padStart(2, '0')}:${String(wMin).padStart(2, '0')}`;

  const checklist = [
    { id: 'wind_1', task: 'Dim bright overhead lights & enable warm night mode', time: windDownTime },
    { id: 'wind_2', task: 'Screen curfew: stow phone, laptop & TV away', time: `${String((wHour)).padStart(2, '0')}:${String((wMin + 15) % 60).padStart(2, '0')}` },
    { id: 'wind_3', task: 'Sip a warm herbal infusion or water (avoid caffeine)', time: 'Before bed' },
    { id: 'wind_4', task: '4-7-8 deep diaphragmatic breathing or light reading', time: '15 mins before bed' }
  ];

  return {
    targetBedtime,
    targetWakeTime,
    estimatedDurationHours: profile.sleepDuration || 7.5,
    windDownStartTime: windDownTime,
    checklist,
    safetyNotice: 'This sleep routine supports healthy circadian habits. Nourish360 does not diagnose sleep disorders. If experiencing persistent insomnia or daytime apnea, consult a qualified physician.'
  };
};
