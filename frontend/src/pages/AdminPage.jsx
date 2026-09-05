import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ShieldCheck, Database, History, CheckCircle2, ShieldAlert } from 'lucide-react';

export const AdminPage = () => {
  const [stats, setStats] = useState(null);
  const [rules, setRules] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [statsRes, rulesRes, auditRes] = await Promise.all([
          api.getAdminStats(),
          api.getAdminRules(),
          api.getAdminAuditLogs()
        ]);
        if (statsRes.success) setStats(statsRes.stats);
        if (rulesRes.success) setRules(rulesRes.rules || []);
        if (auditRes.success) setAuditLogs(auditRes.logs || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">Clinical & Platform Governance</span>
        <h1 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 mt-1">Admin Dashboard</h1>
        <p className="text-xs md:text-sm text-stone-500 mt-1">
          Manage clinical wellness rules, review rule versions, and inspect auditable recommendation traces.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-stone-200 pb-2 text-xs font-semibold">
        {['overview', 'rules', 'audit'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl capitalize transition ${
              tab === t ? 'bg-forest-600 text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft">
            <span className="text-xs font-semibold text-stone-400 uppercase">Registered Users</span>
            <div className="text-3xl font-bold font-serif text-stone-800 mt-1">{stats?.users || 2}</div>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft">
            <span className="text-xs font-semibold text-stone-400 uppercase">Verified Foods</span>
            <div className="text-3xl font-bold font-serif text-forest-700 mt-1">{stats?.foods || 25}</div>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft">
            <span className="text-xs font-semibold text-stone-400 uppercase">Condition Rules</span>
            <div className="text-3xl font-bold font-serif text-emerald-700 mt-1">{stats?.conditionRules || 7}</div>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft">
            <span className="text-xs font-semibold text-stone-400 uppercase">Structured Exercises</span>
            <div className="text-3xl font-bold font-serif text-sky-700 mt-1">{stats?.exercises || 10}</div>
          </div>
        </div>
      )}

      {tab === 'rules' && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-xl text-stone-800">Condition Rules & Safety Standards (Section 26)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map(rule => (
              <div key={rule.ruleId} className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-base text-stone-800">{rule.name}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    rule.safetyLevel === 'PROFESSIONAL_REVIEW' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {rule.safetyLevel}
                  </span>
                </div>
                <div className="text-xs text-stone-500">
                  <span className="font-semibold text-stone-600">Category: </span>{rule.category}
                </div>
                <div className="text-xs text-stone-600 space-y-1">
                  <span className="font-semibold block">Nutrition Considerations:</span>
                  {(rule.nutritionConsiderations || []).map((nc, idx) => (
                    <div key={idx} className="text-[11px] text-stone-500">• {nc}</div>
                  ))}
                </div>
                <div className="pt-2 border-t text-[10px] text-stone-400 flex justify-between">
                  <span>Version: {rule.version}</span>
                  <span>Last Reviewed: {rule.lastReviewed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'audit' && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-xl text-stone-800">Recommendation Audit Trail (Section 48)</h3>
          <div className="space-y-3">
            {auditLogs.map((log, lIdx) => (
              <div key={lIdx} className="p-5 rounded-2xl bg-white border border-stone-200 text-xs space-y-2">
                <div className="flex items-center justify-between font-semibold text-stone-700">
                  <span>User: {log.userId}</span>
                  <span className="text-[11px] text-stone-400">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-xl">
                  <div><span className="font-bold block text-stone-700">Rules Triggered:</span>{log.rulesTriggered?.join(', ') || 'None'}</div>
                  <div><span className="font-bold block text-stone-700">Allergen Blocks:</span>{log.foodsBlocked?.join(', ') || 'None'}</div>
                  <div><span className="font-bold block text-stone-700">Foods Selected:</span>{log.foodsSelected?.length || 0} items</div>
                  <div><span className="font-bold block text-stone-700">Safety Flags:</span>{log.safetyFlags?.join(', ') || 'None'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
