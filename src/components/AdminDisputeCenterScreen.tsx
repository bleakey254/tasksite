import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HOTLINKED_IMAGES } from '../data/mockData';

export const AdminDisputeCenterScreen: React.FC = () => {
  const { showToast, setDispute, dispute } = useApp();
  const [selectedCaseId, setSelectedCaseId] = useState<string>('DSP-8492');
  const [arbitratorFindings, setArbitratorFindings] = useState<string>(
    'Review of sensor telemetry confirms 34% occlusion from roadside light pole in rainy conditions. Under Section 21 Appendix C, the worker followed acceptable polygon tolerance.'
  );

  const cases = [
    {
      id: 'DSP-8492',
      taskTitle: 'Autonomous Vehicle Sensor Framing - Protocol v4.2',
      client: 'Apex Mobility AI',
      worker: 'Sarah Jenkins',
      amount: 42.00,
      slaRemaining: '11h 20m',
      severity: 'High',
      status: dispute.status || 'Adjudication Review',
    },
    {
      id: 'DSP-8493',
      taskTitle: 'Financial OCR Table Extraction - Invoice Batch #12',
      client: 'FinTech Capital Labs',
      worker: 'Alexandre Dubois',
      amount: 65.00,
      slaRemaining: '18h 40m',
      severity: 'Medium',
      status: 'Evidence Submitted',
    },
    {
      id: 'DSP-8488',
      taskTitle: 'Medical Audio Speech Pathology Transcription',
      client: 'HealthVoice Systems',
      worker: 'Maya Lin',
      amount: 32.50,
      slaRemaining: '4h 15m',
      severity: 'Urgent',
      status: 'Adjudication Review',
    }
  ];

  const activeAmount = dispute.amount ?? dispute.escrowAmount ?? 42.00;
  const activeWorkerName = dispute.workerName || dispute.worker?.name || 'Elena Rostova';
  const activeClientName = dispute.clientName || dispute.client?.name || 'TechSolutions Global';

  const handleRuleFavorWorker = () => {
    setDispute(prev => ({ ...prev, status: 'Resolved - Favored Worker' }));
    showToast(`Binding Ruling Enacted: Full escrow of $${activeAmount.toFixed(2)} released to worker ${activeWorkerName}.`, 'success');
  };

  const handleRuleFavorClient = () => {
    setDispute(prev => ({ ...prev, status: 'Resolved - Favored Client' }));
    showToast(`Binding Ruling Enacted: Escrow of $${activeAmount.toFixed(2)} refunded to client ${activeClientName}.`, 'info');
  };

  const handleRuleSplit = () => {
    const half = (activeAmount / 2).toFixed(2);
    setDispute(prev => ({ ...prev, status: 'Resolved - 50/50 Split' }));
    showToast(`Binding Ruling Enacted: Escrow split $${half} to worker and $${half} to client.`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold mb-2">
              <span className="material-symbols-outlined text-sm text-red-600">gavel</span>
              <span>Neutral Arbitration Court • Escrow Custody Workbench</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Dispute Adjudication & Binding Rulings
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Escrow funds remain mathematically locked in custody until arbitrator signs digital ruling.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Escrow Vault: 100% Solvent
            </span>
          </div>
        </div>

        {/* Main Grid: Cases List vs Case Adjudication Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Active Docket (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Court Docket ({cases.length})
              </h2>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                Section 21
              </span>
            </div>

            <div className="space-y-3">
              {cases.map((c) => {
                const isSelected = c.id === selectedCaseId;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`p-4 rounded-xl border text-xs transition cursor-pointer space-y-2 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50 shadow-sm ring-1 ring-blue-500/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                        {c.id}
                      </span>
                      <span className="font-mono font-bold text-emerald-600">
                        ${c.amount.toFixed(2)}
                      </span>
                    </div>

                    <div className="font-bold text-slate-900 line-clamp-1">{c.taskTitle}</div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Worker: <strong className="text-slate-700">{c.worker}</strong></span>
                      <span className="text-amber-600 font-semibold">{c.slaRemaining} SLA</span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Client: {c.client}</span>
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {c.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Adjudication Workbench (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded">
                    {dispute.id}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{dispute.taskTitle}</h3>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Worker: <strong className="text-slate-800">{activeWorkerName}</strong> vs Client: <strong className="text-slate-800">{activeClientName}</strong>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Frozen In Escrow</span>
                <span className="text-2xl font-extrabold text-emerald-600 font-mono">${activeAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Visual Inspection Frame & Claims */}
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-black relative max-h-72">
                <img
                  src={HOTLINKED_IMAGES.dispute_dossier}
                  alt="Dispute Frame Inspection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/80 text-white text-[10px] font-mono px-2 py-1 rounded">
                  EVIDENCE FRAME 014 • SENSOR FIDELITY INSPECTION
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="font-bold text-amber-900 mb-1">Client Rejection Grounds:</div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    Client claims pedestrian bounding polygon has 3.2% boundary clipping at foot joint on frame 14.
                  </p>
                </div>

                <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="font-bold text-blue-900 mb-1">Worker Section 21 Rebuttal:</div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    Worker documented severe reflection and 34% light pole occlusion. Section 21 rules protect valid exceptions.
                  </p>
                </div>
              </div>
            </div>

            {/* Arbitrator Findings Form */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">
                Arbitrator Technical Finding & Justification:
              </label>
              <textarea
                rows={3}
                value={arbitratorFindings}
                onChange={(e) => setArbitratorFindings(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none font-sans leading-relaxed"
              />
            </div>

            {/* Binding Actions */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Render Binding Escrow Ruling:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={handleRuleFavorWorker}
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  Favor Worker (100% Release)
                </button>

                <button
                  onClick={handleRuleSplit}
                  className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">pie_chart</span>
                  Split Escrow (50 / 50)
                </button>

                <button
                  onClick={handleRuleFavorClient}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">undo</span>
                  Favor Client (Refund)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
