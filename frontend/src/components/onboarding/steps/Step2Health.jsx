import React from 'react';
import { HeartPulse, ShieldCheck, Check } from 'lucide-react';

export const Step2Health = ({ formData, setFormData, toggleArrayItem }) => {
  const groups = [
    {
      category: 'Blood & Nutrition',
      items: [
        { id: 'anemia', label: 'Low hemoglobin / Iron Deficiency' },
        { id: 'nutrient_deficiency', label: 'Known nutrient deficiency' }
      ]
    },
    {
      category: 'Metabolic',
      items: [
        { id: 'diabetes', label: 'Diabetes / Pre-diabetes' },
        { id: 'thyroid', label: 'Thyroid-related condition' },
        { id: 'cholesterol', label: 'High cholesterol' }
      ]
    },
    {
      category: 'Digestive',
      items: [
        { id: 'gerd', label: 'GERD / Gastritis / Acid reflux' },
        { id: 'ibs', label: 'IBS / Digestive sensitivity' }
      ]
    },
    {
      category: 'Cardiovascular & Respiratory',
      items: [
        { id: 'hypertension', label: 'High blood pressure / Hypertension' },
        { id: 'heart_condition', label: 'Known heart condition (triggers review)' },
        { id: 'asthma', label: 'Asthma / Reactive airway' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-forest-700 text-xs font-bold uppercase tracking-wider mb-1">
          <HeartPulse className="w-4 h-4" />
          <span>Known Conditions Only</span>
        </div>
        <h2 className="font-serif font-bold text-2xl text-stone-900">Your Health Profile</h2>
        <p className="text-xs text-stone-500 mt-1">
          Select diagnosed conditions you already manage. Nourish360 uses this solely for safe wellness adaptation.
        </p>
      </div>

      <div className="p-3 bg-sage-50 rounded-2xl border border-sage-200/50 text-[11px] text-stone-600 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
        <span>
          Safety boundary: We never infer or diagnose medical conditions from symptoms.
        </span>
      </div>

      <div
        onClick={() => {
          const nextVal = !formData.hasNoConditions;
          setFormData(prev => ({
            ...prev,
            hasNoConditions: nextVal,
            conditions: nextVal ? [] : prev.conditions
          }));
        }}
        className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
          formData.hasNoConditions ? 'bg-forest-600 text-white border-forest-600 shadow-soft' : 'border-stone-200 hover:border-stone-300'
        }`}
      >
        <span className="text-xs font-semibold">I have no known diagnosed conditions</span>
        {formData.hasNoConditions && <Check className="w-4 h-4" />}
      </div>

      {!formData.hasNoConditions && (
        <div className="space-y-4">
          {groups.map((group, gIdx) => (
            <div key={gIdx}>
              <h4 className="text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">{group.category}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {group.items.map(item => {
                  const isSelected = formData.conditions.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleArrayItem('conditions', item.id)}
                      className={`p-3 rounded-2xl text-left border text-xs font-medium transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-sage-100/90 border-forest-600 text-forest-800 font-semibold'
                          : 'border-stone-200/80 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-forest-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
