import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HOTLINKED_IMAGES } from '../data/mockData';

export const AdminApprovalScreen: React.FC = () => {
  const { showToast } = useApp();
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string>('SUB-981');
  const [filter, setFilter] = useState<'pending' | 'flagged' | 'approved'>('pending');

  const submissions = [
    {
      id: 'SUB-981',
      taskTitle: 'Autonomous Pedestrian Bounding Protocol v4.2',
      workerName: 'Sarah Jenkins',
      workerTrustScore: 99.4,
      clientName: 'Wayve Mobility AI',
      escrowAmount: 38.50,
      submittedAt: '18 minutes ago',
      slaRemaining: '11h 42m',
      complianceScore: 98.8,
      status: 'pending',
      checks: {
        resolution: 'Pass (4K Lidar)',
        boundingAccuracy: '98.8% IoU',
        occlusionMarked: 'Verified (34%)',
      }
    },
    {
      id: 'SUB-982',
      taskTitle: 'Medical CT Scan Lesion Tagging',
      workerName: 'Dr. Marcus Vance',
      workerTrustScore: 99.8,
      clientName: 'BioScan Health',
      escrowAmount: 54.00,
      submittedAt: '42 minutes ago',
      slaRemaining: '11h 18m',
      complianceScore: 99.6,
      status: 'pending',
      checks: {
        resolution: 'Pass (DICOM 16-bit)',
        boundingAccuracy: '99.6% IoU',
        occlusionMarked: 'N/A',
      }
    },
    {
      id: 'SUB-980',
      taskTitle: 'E-Commerce Semantic Copywriting (Tech Catalog)',
      workerName: 'Elena Rostova',
      workerTrustScore: 96.2,
      clientName: 'ShopStream Global',
      escrowAmount: 18.00,
      submittedAt: '2 hours ago',
      slaRemaining: '10h 00m',
      complianceScore: 94.0,
      status: 'flagged',
      checks: {
        resolution: 'Pass',
        boundingAccuracy: 'Keyword density high',
        occlusionMarked: 'Possible AI generation flag',
      }
    }
  ];

  const currentSub = submissions.find(s => s.id === selectedSubmissionId) || submissions[0];

  const handleApprove = (subId: string, amount: number) => {
    showToast(`Escrow $${amount.toFixed(2)} released to worker instantly. Section 21 signature generated.`, 'success');
  };

  const handleFlag = (subId: string) => {
    showToast(`Submission ${subId} escalated to Neutral Adjudication Queue.`, 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title with Super Admin Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-2">
              <span className="material-symbols-outlined text-sm text-blue-600">admin_panel_settings</span>
              <span>Platform Governance • Section 21 Audit Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Task Approval & Escrow Custody Queue
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Verify submitted deliverables against Section 21 cryptographic schemas and authorize milestone fund releases.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Smart Escrow Core v3.8 Active</span>
            </span>
          </div>
        </div>

        {/* 4 Stat Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>PENDING AUDITS</span>
              <span className="material-symbols-outlined text-blue-600">pending_actions</span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-display">18</div>
            <div className="text-[11px] text-slate-400 mt-2">Average SLA turnaround: 42 mins</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>ESCROW IN REVIEW</span>
              <span className="material-symbols-outlined text-emerald-600">lock</span>
            </div>
            <div className="text-3xl font-extrabold text-emerald-600 font-display">$3,420.00</div>
            <div className="text-[11px] text-slate-400 mt-2">Zero unauthorized chargebacks</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>FLAGGED REVIEWS</span>
              <span className="material-symbols-outlined text-amber-600">flag</span>
            </div>
            <div className="text-3xl font-extrabold text-amber-600 font-display">4</div>
            <div className="text-[11px] text-slate-400 mt-2">Under secondary peer review</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>COMPLIANCE INDEX</span>
              <span className="material-symbols-outlined text-purple-600">verified</span>
            </div>
            <div className="text-3xl font-extrabold text-purple-600 font-display">99.2%</div>
            <div className="text-[11px] text-slate-400 mt-2">Section 21 schema fidelity</div>
          </div>
        </div>

        {/* Two-Column Review Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Submissions Queue (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Active Verification Queue ({submissions.length})
              </h2>
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    filter === 'pending' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter('flagged')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    filter === 'flagged' ? 'bg-amber-600 text-white' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  Flagged
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {submissions.map((s) => {
                const isSelected = s.id === selectedSubmissionId;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSubmissionId(s.id)}
                    className={`p-4 rounded-xl border text-xs transition cursor-pointer space-y-2.5 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50 shadow-sm ring-1 ring-blue-500/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded">
                        {s.id}
                      </span>
                      <span className="font-mono font-bold text-emerald-600 text-sm">
                        ${s.escrowAmount.toFixed(2)}
                      </span>
                    </div>

                    <div className="font-bold text-slate-900 line-clamp-1">{s.taskTitle}</div>

                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span>By: <strong className="text-slate-700">{s.workerName}</strong></span>
                      <span className="text-amber-600 font-medium">SLA: {s.slaRemaining}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                        <span className="material-symbols-outlined text-sm">verified</span>
                        {s.complianceScore}% Match
                      </span>
                      <span className="text-slate-400">{s.submittedAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Diff & Section 21 Verification (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                  {currentSub.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">{currentSub.taskTitle}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>Client: <strong>{currentSub.clientName}</strong></span>
                  <span>•</span>
                  <span>Worker: <strong>{currentSub.workerName}</strong></span>
                  <span>•</span>
                  <span className="text-emerald-600 font-semibold">Trust Tier: {currentSub.workerTrustScore}%</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Escrow Payout</span>
                <span className="text-2xl font-extrabold text-emerald-600 font-mono">
                  ${currentSub.escrowAmount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Inspection Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Inspection Artifact: Semantic Sensor Frame 014</span>
                <span className="text-blue-600">Section 21 Automated Lidar Check</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-black relative max-h-64">
                <img
                  src={HOTLINKED_IMAGES.sensor_frame}
                  alt="Submission Inspection Frame"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-xs text-emerald-400 text-[10px] font-mono px-2 py-1 rounded border border-emerald-500/30">
                  IoU OVERLAP: {currentSub.complianceScore}% (THRESHOLD &gt; 95%)
                </div>
              </div>
            </div>

            {/* Automated Validation Criteria Checklist */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Protocol Automated Validation Matrix
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Resolution</div>
                  <div className="font-bold text-slate-800 mt-0.5">{currentSub.checks.resolution}</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Bounding IoU</div>
                  <div className="font-bold text-emerald-600 mt-0.5">{currentSub.checks.boundingAccuracy}</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Occlusion Tag</div>
                  <div className="font-bold text-slate-800 mt-0.5">{currentSub.checks.occlusionMarked}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleApprove(currentSub.id, currentSub.escrowAmount)}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">verified</span>
                Approve & Release Escrow (${currentSub.escrowAmount.toFixed(2)})
              </button>

              <button
                onClick={() => handleFlag(currentSub.id)}
                className="py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">flag</span>
                Flag for Adjudication
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
