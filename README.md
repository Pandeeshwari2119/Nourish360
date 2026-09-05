# 🌿 Nourish360 — Personalized Health & Wellness Platform

> **"Your health. Your routine. Your personalized plan."**

Nourish360 is a complete, production-quality full-stack web platform that generates transparent, personalized lifestyle wellness plans (meals, movement, hydration, sleep hygiene, micro-habits, and weekly routines) tailored to voluntarily submitted user health profiles, known conditions, dietary restrictions, and daily schedules.

---

## 🛡️ 1. Important Product Safety Boundary

Nourish360 is a **wellness and lifestyle personalization platform**, NOT a medical diagnosis or treatment engine:
- **Never Diagnoses**: We never infer disease from symptoms.
- **Never Prescribes**: General nutrition estimates are educational, not clinical prescriptions.
- **Hard Allergen Filtering**: Allergies and ingredient-level derivatives are strictly blocked unconditionally.
- **Clinical Review Triggers**: Potential high-risk cardiovascular or renal conditions automatically restrict standard automated volume/sodium plans and present a professional-review notice.

**Safety Priority Hierarchy:**
```text
SAFETY > PROFESSIONAL REVIEW > ALLERGIES > HEALTH RESTRICTIONS > DIETARY RESTRICTIONS > INTOLERANCES > NUTRITIONAL FIT > GOALS > PREFERENCES > CONVENIENCE
```

---

## 💻 2. Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React icons, Framer Motion, Recharts.
- **Visual Design**: "Nature + Wellness + Modern Technology" with soft sage (`#6C8E7B`), muted forest (`#2D4A3E`), warm cream (`#FAF8F5`), Playfair Display serif headings, and subtle floating organic animations.
- **Backend**: Node.js v20+, Express.js REST APIs, JWT authentication, bcrypt password hashing, Helmet, rate-limiting, and Morgan logging.
- **Database**: Dual-engine architecture (connects to live MongoDB via Mongoose, with an automatic persistent embedded JSON store fallback ensuring 100% immediate out-of-the-box local execution on any Windows, macOS, or Linux machine without requiring external services).
- **Recommendation Pipeline**: Modular architecture featuring `ProfileNormalizer`, `SafetyEngine`, `AllergyEngine`, `DietaryFilter`, `ConditionRuleEngine`, `ConflictDetector`, `NutritionEngine`, `FoodRankingEngine`, `MealGenerator`, `SmartMealSwap`, `ActivityEngine`, `SleepEngine`, `HydrationEngine`, `HabitEngine`, `ExplanationEngine`, and `FeedbackEngine`.

---

## 🚀 3. Quick Start & Local Execution

### Prerequisites
- Node.js v18+ and npm installed.

### One-Command Quick Launch
To run both the Backend API server and the Frontend Vite development server concurrently:

```bash
# 1. From the project root (C:\Users\MP\.gemini\antigravity\scratch\nourish360)
node run-app.js
```

The unified launcher will boot:
- **Frontend Web Application**: [http://localhost:5173](http://localhost:5173)
- **Backend REST API**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🔑 4. Seed User Accounts

The database comes pre-seeded with rich authentic foods, condition rules, exercises, and demo accounts:

| Role | Email | Password | Purpose |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@nourish360.local` | `Admin@12345` | Access to Admin Panel, rule browser & audit logs |
| **Demo User** | `demo@nourish360.local` | `Demo@12345` | Pre-configured user profile for immediate testing |

You can also register a new account through the `/signup` screen at any time.

---

## 🧭 5. User Journey & Feature Highlights

1. **Landing Page**: Modern hero section with floating cards, "How It Works" 4-step walkthrough, and feature breakdowns.
2. **Authentication**: Secure Signup with real-time password strength meter, login with session persistence, and forgot/reset password flow.
3. **8-Step Onboarding Wizard**:
   - Step 1: About You (name, age, sex, height/weight with cm/ft and kg/lb unit conversion).
   - Step 2: Health Profile (known diagnosed conditions organized by category).
   - Step 3: Allergies & Dietary Pattern (Vegetarian, Vegan, Eggetarian, Non-vegetarian, hard allergen blocks).
   - Step 4: Food Habits (breakfast, lunch, dinner schedule, favorite regional cuisines).
   - Step 5: Daily Routine (wake time, bedtime, sitting hours, stress level).
   - Step 6: Movement & Activity (baseline steps, experience, preferred workouts).
   - Step 7: Sleep (sleep duration, consistency, screen use before bed).
   - Step 8: Goals (balanced eating, activity, hydration, sleep consistency).
4. **Profile Review & Generation Animation**: Shows real-time staged calculation feedback (*"Understanding routine...", "Checking preferences...", "Finding suitable meals..."*).
5. **Main Dashboard**: Time-of-day greeting, SafetyBadge, Overview Cards, and Dynamic Schedule Timeline.
6. **"Why This?" Modal**: Provides transparent justifications explaining dietary pattern matches, allergen clearance, and confidence levels.
7. **Smart Meal Swap**: Lets users browse alternative meals that pass safety and allergen filters with instant macro diffs.
8. **Nutrition Dashboard**: Macro distribution, dietary fiber targets, and whole-food micronutrient awareness (Iron, Calcium, Vitamin D, B12, Potassium).
9. **Food Explorer**: Searchable database of 25+ verified authentic dishes with ingredients, allergens, and nutritional profiles.
10. **Movement & Workout Library**: Step tracker, active minutes, and progressive workouts across Beginner, Walking, Stretching, Mobility, Yoga, Home Workout, Strength, and Cardio.
11. **Sleep Routine**: Target sleep/wake timing and interactive wind-down checklist.
12. **Smart Hydration**: Daily fluid volume with 1-click quick loggers (+250ml, +500ml) and medical fluid restriction alerts.
13. **Daily Micro-Habits**: 3–5 targeted daily habits with streak counters.
14. **Progress & Weekly Review**: Recharts data visualizations (7-day step bar chart, water line chart, sleep duration, habit completion) with positive reinforcement.
15. **Settings & Data Portability**: Unit preference toggle, reduced-motion accessibility switch, notification preferences, and 1-click JSON data archive export.
16. **Admin Panel**: Full governance panel inspecting registered users, verified foods, condition rules, and transparent recommendation audit logs.

---

## 🧪 6. Automated Testing

To run the automated unit and end-to-end integration test suite:

```bash
cd backend
npm test
```

Verifies:
- Hard allergy safety blocking (peanut allergic profiles receive zero peanut-containing foods).
- Strict dietary filtering (vegan profiles receive zero dairy, eggs, or animal products).
- Multi-condition conflict resolution and clinical review triggers.
- Dynamic timeline generation matching user wake/meal hours.
- Smart meal swap candidate allergen compliance.
- BMR and TDEE Mifflin-St Jeor calculation with metric/imperial unit conversions.

---

## 📄 7. License

MIT License © 2026 Nourish360 Team.