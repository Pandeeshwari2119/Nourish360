export const exercisesData = [
  // --- Walking ---
  {
    exerciseId: 'ex_walk_01',
    name: 'Gentle Morning Sunshine Walk',
    category: 'Walking',
    durationMinutes: 20,
    difficulty: 'Beginner',
    equipment: 'Comfortable walking shoes',
    instructions: [
      'Step outdoors within 1 hour of waking to receive natural morning daylight.',
      'Maintain an easy, conversational pace with natural arm swing.',
      'Breathe smoothly through your nose.'
    ],
    safetyNotes: ['Stay hydrated; wear sun protection if walking in bright sunlight.'],
    contraindications: ['Acute ankle sprain', 'Severe unmanaged foot pain'],
    targetAreas: ['Cardiovascular', 'Lower body', 'Circadian rhythm']
  },
  {
    exerciseId: 'ex_walk_02',
    name: 'Brisk Post-Meal Digestion Stroll',
    category: 'Walking',
    durationMinutes: 15,
    difficulty: 'Beginner',
    equipment: 'Flat walking shoes or sneakers',
    instructions: [
      'Begin walking 15-20 minutes after lunch or dinner.',
      'Keep an upright posture to ease abdominal pressure.',
      'Maintain a relaxed moderate pace without rushing.'
    ],
    safetyNotes: ['Do not jog or run immediately after a heavy meal.'],
    contraindications: ['Severe dizziness', 'Acute gastrointestinal distress'],
    targetAreas: ['Blood sugar regulation', 'Digestion', 'Calorie expenditure']
  },

  // --- Stretching & Mobility ---
  {
    exerciseId: 'ex_stretch_01',
    name: 'Desk Break Upper Body & Neck Release',
    category: 'Stretching',
    durationMinutes: 10,
    difficulty: 'Beginner',
    equipment: 'None / Desk chair',
    instructions: [
      'Gently roll shoulders backward 10 times, then forward 10 times.',
      'Perform slow neck tilts to the left and right, holding for 15 seconds.',
      'Interlock fingers behind your back and open your chest outward.'
    ],
    safetyNotes: ['Never force the neck through sharp pain; stop immediately if dizzy.'],
    contraindications: ['Acute cervical disc herniation with numbness'],
    targetAreas: ['Neck', 'Shoulders', 'Upper back', 'Posture']
  },
  {
    exerciseId: 'ex_mob_01',
    name: 'Full Body Joint Mobility & Hip Openers',
    category: 'Mobility',
    durationMinutes: 15,
    difficulty: 'Beginner',
    equipment: 'Yoga mat or carpet',
    instructions: [
      'Cat-Cow spinal flexions on hands and knees (10 repetitions).',
      'Low runner lunge hip flexor stretch with gentle pulse.',
      'Seated butterfly stretch for groin and inner thigh mobility.'
    ],
    safetyNotes: ['Place a soft towel under knees if sensitive to hard flooring.'],
    contraindications: ['Acute knee inflammation', 'Severe hip impingement'],
    targetAreas: ['Spine', 'Hips', 'Hamstrings']
  },

  // --- Yoga ---
  {
    exerciseId: 'ex_yoga_01',
    name: 'Evening Wind-Down Restorative Yoga',
    category: 'Yoga',
    durationMinutes: 20,
    difficulty: 'Beginner',
    equipment: 'Yoga mat, 1-2 cushions/pillows',
    instructions: [
      'Child pose with knees wide and torso resting between legs (3 minutes).',
      'Supported bridge pose with cushion beneath sacrum (3 minutes).',
      'Legs-up-the-wall pose (Viparita Karani) with deep belly breathing (5 minutes).'
    ],
    safetyNotes: ['Focus on slow, prolonged exhalations to stimulate the parasympathetic nervous system.'],
    contraindications: ['Uncontrolled high eye pressure / glaucoma (for inverted postures)'],
    targetAreas: ['Nervous system relaxation', 'Hamstrings', 'Lower back']
  },
  {
    exerciseId: 'ex_yoga_02',
    name: 'Sun Salutations (Surya Namaskar) Gentle Flow',
    category: 'Yoga',
    durationMinutes: 15,
    difficulty: 'Beginner to Intermediate',
    equipment: 'Yoga mat',
    instructions: [
      'Synchronize breath with each of the 12 classic postures.',
      'Start with 4 slow cycles, focusing on alignment rather than speed.',
      'Finish in Mountain Pose (Tadasana) with 5 deep centering breaths.'
    ],
    safetyNotes: ['Modify lunges if knees or wrists feel strained.'],
    contraindications: ['Acute wrist tendonitis', 'Third trimester pregnancy (unmodified)'],
    targetAreas: ['Full body flexibility', 'Circulation', 'Core engagement']
  },

  // --- Home Workout & Bodyweight ---
  {
    exerciseId: 'ex_home_01',
    name: 'Beginner Low-Impact Full Body Circuit',
    category: 'Home workout',
    durationMinutes: 20,
    difficulty: 'Beginner',
    equipment: 'Sturdy chair, wall, mat',
    instructions: [
      'Chair squats (sit down gently and stand up tall) — 10 reps.',
      'Wall push-ups or counter push-ups — 10 reps.',
      'Standing calf raises holding chair back — 15 reps.',
      'Glute bridges lying on back — 12 reps.',
      'Rest 60 seconds and repeat 2-3 rounds.'
    ],
    safetyNotes: ['Keep knees tracking in line with toes; avoid breath holding.'],
    contraindications: ['Severe acute joint swelling'],
    targetAreas: ['Quadriceps', 'Glutes', 'Chest', 'Core']
  },
  {
    exerciseId: 'ex_home_02',
    name: 'Core Stability & Lumbar Support Routine',
    category: 'Home workout',
    durationMinutes: 15,
    difficulty: 'Beginner',
    equipment: 'Yoga mat',
    instructions: [
      'Bird-Dog extensions (opposite arm/leg reach from quadruped) — 8 per side.',
      'Dead-bug on back with neutral spine — 8 per side.',
      'Forearm plank hold with knees on floor — 3 sets of 20 seconds.'
    ],
    safetyNotes: ['Keep lower back in neutral alignment without excessive arching.'],
    contraindications: ['Severe lumbar disc herniation without medical clearance'],
    targetAreas: ['Deep transverse abdominis', 'Multifidus', 'Glutes']
  },

  // --- Strength & Cardio ---
  {
    exerciseId: 'ex_str_01',
    name: 'Functional Strength & Balance Circuit',
    category: 'Strength',
    durationMinutes: 25,
    difficulty: 'Beginner to Intermediate',
    equipment: 'Light dumbbells or water bottles (optional)',
    instructions: [
      'Step-ups onto a stable bottom stair or low platform — 10 each leg.',
      'Overhead light shoulder press while seated tall — 12 reps.',
      'Bent-over dumbbell or water-bottle rows for back — 12 reps.',
      'Single leg balance stand near wall — 30 seconds each side.'
    ],
    safetyNotes: ['Maintain strict form over lifting heavier weights.'],
    contraindications: ['Uncontrolled hypertension (avoid overhead strain)'],
    targetAreas: ['Leg strength', 'Upper back', 'Balance']
  },
  {
    exerciseId: 'ex_car_01',
    name: 'Low-Impact Cardio & Step Rhythm',
    category: 'Cardio',
    durationMinutes: 20,
    difficulty: 'Beginner',
    equipment: 'None',
    instructions: [
      'Step-touch side to side with arm swings — 2 minutes.',
      'High knee march in place — 1 minute.',
      'Shadow boxing with light jabs and crosses — 2 minutes.',
      'Repeat circuit 3 times with 1-minute easy march intervals.'
    ],
    safetyNotes: ['Keep impact gentle on floor; wear supportive athletic shoes.'],
    contraindications: ['Recent chest pain or physician-ordered cardio restriction'],
    targetAreas: ['Heart health', 'Stamina', 'Endorphins']
  }
];
