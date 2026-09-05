// SafetyBadge.jsx
import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';

export const SafetyBadge = ({ status = 'INFO', reviewRequired = false, reasons = [] }) => {
  const [expanded, setExpanded] = useState(false);

  const configs = {
    INFO: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      icon: ShieldCheck,
      title: 'General Wellness Guidance',
      summary: 'Personalized based voluntarily on your self-reported profile, allergies, and daily routine.'
    },
    CAUTION: {
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      badgeBg: 'bg-amber-100 text-amber-900',
      icon: AlertTriangle,
      title: 'Special Health Considerations',
      summary: 'Recommendations take into account your reported metabolic / digestive health profile.'
    },
    PROFESSIONAL_REVIEW: {
      bg: 'bg-rose-50 border-rose-200 text-rose-900',
      badgeBg: 'bg-rose-100 text-rose-900',
      icon: AlertCircle,
      title: 'Professional Healthcare Review Advised',
      summary: 'Your profile includes conditions (e.g. cardiac, renal) requiring individualized medical supervision.'
    }
  };

  const current = configs[status] || configs.INFO;
  const Icon = current.icon;

  return (
    <div className={`rounded-2xl border p-4 mb-6 transition-all ${current.bg}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-white/80 shadow-sm mt-0.5">
            <Icon className="w-5 h-5 text-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm">{current.title}</h4>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${current.badgeBg}`}>
                {status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs mt-1 text-stone-600 max-w-2xl leading-relaxed">
              {current.summary}
            </p>
          </div>
        </div>

        {(reviewRequired || reasons.length > 0) && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs flex items-center gap-1 font-medium underline opacity-80 hover:opacity-100 transition whitespace-nowrap"
          >
            {expanded ? 'Less info' : 'View safety notes'}
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-current/10 text-xs space-y-2">
          {reasons.map((r, i) => (
            <p key={i} className="flex items-start gap-1.5">
              <span className="font-bold">•</span>
              <span>{r}</span>
            </p>
          ))}
          <p className="italic text-stone-500 pt-1">
            Product boundary notice: Nourish360 does not diagnose disease or replace qualified medical practitioners.
          </p>
        </div>
      )}
    </div>
  );
};
