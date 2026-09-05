import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Utensils, 
  Footprints, 
  Droplets, 
  Moon, 
  LineChart,
  HelpCircle,
  Award,
  ChevronRight
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="relative overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100 text-forest-700 text-xs font-semibold shadow-sm">
              <Sparkles className="w-4 h-4 text-forest-600" />
              <span>Personalized Wellness & Nutrition Engine</span>
            </div>

            <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-stone-900 leading-[1.15] tracking-tight">
              Your health is personal. <br />
              <span className="text-forest-600 italic">Your plan should be too.</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 max-w-xl leading-relaxed">
              Nourish360 creates an explainable, allergy-safe wellness routine around your food preferences, lifestyle, activity, sleep, and goals.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/signup"
                className="px-7 py-3.5 rounded-2xl bg-forest-600 hover:bg-forest-700 text-white font-bold text-sm shadow-soft-lg transition flex items-center gap-2 group"
              >
                <span>Create My Plan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>

              <a
                href="#how-it-works"
                className="px-6 py-3.5 rounded-2xl border border-stone-300/80 bg-white/70 hover:bg-white text-stone-700 font-semibold text-sm transition"
              >
                Explore How It Works
              </a>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Allergy-first filtering</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Transparent reasoning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-forest-600" />
                <span>Non-medical safety boundary</span>
              </div>
            </div>
          </div>

          {/* Hero Visual: Floating Wellness Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-square max-w-[440px] mx-auto flex items-center justify-center">
              {/* Central Illustration Circle */}
              <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-sage-200 to-cream-300 flex items-center justify-center p-6 shadow-soft-lg">
                <div className="w-full h-full rounded-full bg-white/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-forest-600 mb-2">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="font-serif font-bold text-stone-800 text-lg">Nourish360</span>
                  <span className="text-[11px] text-stone-500 mt-0.5">Explainable AI Routine</span>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute top-2 -left-2 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200 shadow-soft-lg animate-float-slow text-xs flex items-center gap-3">
                <span className="text-xl">🥗</span>
                <div>
                  <div className="font-bold text-stone-800">Personalized Meals</div>
                  <div className="text-[10px] text-stone-500">Allergen & condition cleared</div>
                </div>
              </div>

              <div className="absolute top-10 -right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200 shadow-soft-lg animate-float-reverse text-xs flex items-center gap-3">
                <span className="text-xl">🚶</span>
                <div>
                  <div className="font-bold text-stone-800">Daily Movement</div>
                  <div className="text-[10px] text-stone-500">Progressive step pacing</div>
                </div>
              </div>

              <div className="absolute -bottom-2 left-2 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200 shadow-soft-lg animate-float-reverse text-xs flex items-center gap-3">
                <span className="text-xl">💧</span>
                <div>
                  <div className="font-bold text-stone-800">Hydration</div>
                  <div className="text-[10px] text-stone-500">Target volume & reminders</div>
                </div>
              </div>

              <div className="absolute bottom-16 -right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200 shadow-soft-lg animate-float-slow text-xs flex items-center gap-3">
                <span className="text-xl">😴</span>
                <div>
                  <div className="font-bold text-stone-800">Sleep Routine</div>
                  <div className="text-[10px] text-stone-500">Curfew & wind-down guide</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-stone-200/60">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-forest-700">Simple 4-Step Process</span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 mt-2">How Nourish360 Works</h2>
          <p className="text-xs text-stone-500 mt-2">No rigid templates. We adapt to your voluntary inputs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Tell us about yourself',
              desc: 'Share your baseline profile, schedule, and food preferences with easy unit toggles.'
            },
            {
              step: '02',
              title: 'Build your wellness profile',
              desc: 'Declare known conditions, allergies, and dietary patterns with zero diagnostic guesswork.'
            },
            {
              step: '03',
              title: 'Get your personalized plan',
              desc: 'Our engine applies allergy hard-blocks, condition rules, and calorie matching to build your timeline.'
            },
            {
              step: '04',
              title: 'Track and improve',
              desc: 'Swap meals freely, log hydration, and rate dishes so future recommendations adapt intelligently.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white/80 border border-stone-200/80 shadow-soft hover:shadow-soft-lg transition">
              <span className="font-serif font-bold text-3xl text-forest-500/40">{item.step}</span>
              <h3 className="font-serif font-bold text-lg text-stone-800 mt-3 mb-2">{item.title}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT NOURISH360 PERSONALIZES */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto bg-sage-50/50 rounded-3xl my-8 border border-sage-200/40">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-forest-700">Holistic Coverage</span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 mt-2">What We Personalize</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Utensils, title: 'Personalized Meals', desc: 'Portions, macros & verified allergen clearance for all dishes.' },
            { icon: Footprints, title: 'Physical Movement', desc: 'Progressive steps, mobility stretches, and home workout routines.' },
            { icon: Droplets, title: 'Smart Hydration', desc: 'Fluid pacing with automatic medical restriction safeguards.' },
            { icon: Moon, title: 'Sleep Wind-Down', desc: 'Circadian sync, screen curfews, and relaxation breathwork.' },
            { icon: Sparkles, title: 'Micro-Habits', desc: '3-5 sustainable daily rituals that stick without friction.' },
            { icon: LineChart, title: 'Progress Trends', desc: 'Positive, non-shaming consistency tracking and weekly reviews.' },
            { icon: HelpCircle, title: 'Why This? Explanations', desc: 'Transparent match criteria on every single recommendation.' },
            { icon: Award, title: 'Smart Swaps', desc: 'One-click filter-safe alternatives that keep your macros intact.' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sage-100 text-forest-700 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-stone-800 mb-1">{item.title}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY NOURISH360 */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-forest-700">Safety & Transparency</span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 leading-tight">
              Safety First. <br />Explainable Always.
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              Unlike generic fitness apps that force a rigid 10,000-step rule or prescribe unvetted diets, Nourish360 puts clinical safety boundaries first. Allergies are hard blocked. Conflicting conditions trigger professional review.
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                'Strict allergy and ingredient tree hard-blocks',
                'Multi-condition conflict detector with conservative fallbacks',
                'No symptom-based diagnoses or prescription claims',
                'Every recommendation includes transparent confidence scoring'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-stone-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-forest-600 hover:bg-forest-700 text-white font-bold text-xs shadow-soft transition"
              >
                <span>Get Started Free</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-soft-lg space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <ShieldCheck className="w-8 h-8 text-forest-600" />
              <div>
                <h4 className="font-serif font-bold text-base text-stone-800">Our Clinical Safety Promise</h4>
                <span className="text-[11px] text-stone-500">Evidence-informed lifestyle personalization</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Nourish360 is built as a healthy habit partner, not a doctor. We never claim to cure diseases, alter medications, or provide diagnostic pronouncements. High-risk situations immediately display a recommendation for qualified clinical consultation.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-200/80 bg-cream-50/80 py-12 px-4 md:px-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-forest-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-stone-800 text-base">Nourish360</span>
            <span className="ml-2 text-[10px] text-stone-400">© 2026 Nourish360 Platform</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-forest-700 transition">Log In</Link>
            <Link to="/signup" className="hover:text-forest-700 transition">Create Account</Link>
            <Link to="/explorer" className="hover:text-forest-700 transition">Food Explorer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
