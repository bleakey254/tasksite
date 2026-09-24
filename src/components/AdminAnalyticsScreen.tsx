import React, { useState } from 'react';

export const AdminAnalyticsScreen: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d' | 'all'>('7d');

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title with Analytics Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold mb-2">
              <span className="material-symbols-outlined text-sm text-purple-600">monitoring</span>
              <span>Protocol Fee & Unlock Analytics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              $0.80 Worker Unlock Economics & Sybil Shield
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Real-time telemetry on anti-spam intake deposits, escrow turnover, and platform throughput.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
            {(['24h', '7d', '30d', 'all'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition cursor-pointer ${
                  timeframe === t ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Stat Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>TOTAL UNLOCK VOLUME</span>
              <span className="material-symbols-outlined text-blue-600">key</span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-display">$12,480.00</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +14.2% vs previous period (15,600 unlocks)
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>ESCROW SETTLED</span>
              <span className="material-symbols-outlined text-emerald-600">payments</span>
            </div>
            <div className="text-3xl font-extrabold text-emerald-600 font-display">$284,500</div>
            <div className="text-[11px] text-slate-500 mt-2">100% On-Time Milestone Payouts</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>ANTI-SYBIL BOT SHIELD</span>
              <span className="material-symbols-outlined text-purple-600">security</span>
            </div>
            <div className="text-3xl font-extrabold text-purple-600 font-display">99.7%</div>
            <div className="text-[11px] text-purple-700 font-medium mt-2">Zero AI scraper bot pollution</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>AVG WORKER RETURN</span>
              <span className="material-symbols-outlined text-amber-600">savings</span>
            </div>
            <div className="text-3xl font-extrabold text-amber-600 font-display">42.8x</div>
            <div className="text-[11px] text-slate-500 mt-2">$34.20 earned per $0.80 unlock</div>
          </div>
        </div>

        {/* Deep Dive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Unlock Conversion & Sybil Deterrence */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                The $0.80 Micro-Staking Mechanism
              </h2>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-semibold">
                High-Trust Signal
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Requiring workers to contribute $0.80 to unlock high-payout tasks completely eliminates automated script spam and sybil farms. Once a task is completed, workers earn an average of 42.8× their stake.
            </p>

            {/* Metrics Breakdown Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Task Completion Rate After Unlock</span>
                  <span className="text-emerald-600 font-bold">96.4%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '96.4%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Section 21 First-Pass Acceptance</span>
                  <span className="text-blue-600 font-bold">92.1%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '92.1%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Dispute Initiation Rate</span>
                  <span className="text-amber-600 font-bold">1.2%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '1.2%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Distribution & Treasury Flow */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                Treasury & Protocol Revenue Flow
              </h2>
              <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-semibold">
                Self-Sustaining Escrow
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Worker Payout Share</span>
                <div className="text-2xl font-extrabold text-emerald-600 font-display mt-1">92.5%</div>
                <p className="text-[11px] text-slate-500 mt-1">Directly disbursed to workers</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Section 21 Audit Pool</span>
                <div className="text-2xl font-extrabold text-blue-600 font-display mt-1">5.0%</div>
                <p className="text-[11px] text-slate-500 mt-1">Funds neutral arbitrators</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Unlock Staking Treasury</span>
                <div className="text-2xl font-extrabold text-purple-600 font-display mt-1">2.5%</div>
                <p className="text-[11px] text-slate-500 mt-1">Maintains anti-sybil proof</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">SLA Auto-Release Time</span>
                <div className="text-2xl font-extrabold text-slate-900 font-display mt-1">12 Hours</div>
                <p className="text-[11px] text-slate-500 mt-1">Zero worker payment lockup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
