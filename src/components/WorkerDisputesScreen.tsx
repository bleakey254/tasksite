import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HOTLINKED_IMAGES } from '../data/mockData';

export const WorkerDisputesScreen: React.FC = () => {
  const { dispute, setFileDisputeModalOpen, showToast } = useApp();
  const [evidenceTab, setEvidenceTab] = useState<'dossier' | 'telemetry' | 'guidelines'>('dossier');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      author: 'Apex Mobility AI (Client)',
      time: 'Yesterday at 14:22',
      text: 'Frame 14 pedestrian foot boundary does not meet strict 98% polygon intersection threshold.',
      role: 'client'
    },
    {
      author: 'Sarah Jenkins (You)',
      time: 'Yesterday at 15:45',
      text: 'Heavy rainy street occlusion verified by sensor metadata. Standard Section 21 permits 5% margin when ground plane reflection exceeds 80 Lux.',
      role: 'worker'
    },
    {
      author: 'Arbitrator #04 (Neutral Escrow Custodian)',
      time: 'Today at 09:12',
      text: 'Case DSP-8492 under technical peer review. Ground plane sensor logs received. Ruling scheduled within 12 hours.',
      role: 'arbitrator'
    }
  ]);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        author: 'Sarah Jenkins (You)',
        time: 'Just now',
        text: newComment,
        role: 'worker'
      }
    ]);
    setNewComment('');
    showToast('Additional response submitted to Adjudication Record.', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-2">
              <span className="material-symbols-outlined text-sm text-amber-600">gavel</span>
              <span>Third-Party Neutral Adjudication Court</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Dispute Resolution & Evidence Dossier
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Zero wage theft guarantee: 100% of dispute funds remain frozen in smart escrow until verified arbitration ruling.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('Dispute Dossier PDF generated with cryptographic hash.', 'info')}
              className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-slate-500">print</span>
              Export Case Docket
            </button>
            <button
              onClick={() => setFileDisputeModalOpen(true)}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 transition flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add_alert</span>
              File New Dispute
            </button>
          </div>
        </div>

        {/* Active Case Card (DSP-8492) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          {/* Case Header */}
          <div className="p-6 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-sm font-bold text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-lg border border-amber-500/40">
                  {dispute.id}
                </span>
                <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-semibold">
                  Section 21 Protocol Audit
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                {dispute.taskTitle}
              </h2>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>Client: <strong className="text-slate-200">{dispute.clientName || dispute.client?.name || 'Apex Mobility AI'}</strong></span>
                <span>•</span>
                <span>Worker: <strong className="text-slate-200">{dispute.workerName || dispute.worker?.name || 'Sarah Jenkins'}</strong></span>
                <span>•</span>
                <span>Opened: {dispute.dateOpened || 'Yesterday'}</span>
              </div>
            </div>

            <div className="flex flex-row md:flex-col items-start md:items-end justify-between gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Disputed Escrow Fund</span>
              <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                ${(dispute.amount ?? dispute.escrowAmount ?? 42.00).toFixed(2)}
              </span>
              <span className="text-[11px] text-amber-300 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Held In Custody
              </span>
            </div>
          </div>

          {/* Dispute Progression Stepper */}
          <div className="p-6 bg-slate-50 border-b border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
              <div className="p-3 bg-white rounded-xl border border-emerald-300 shadow-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">1. Rejection Claim</div>
                  <div className="text-[11px] text-slate-500">Client rejected frame</div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-emerald-300 shadow-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">2. Dispute Lodged</div>
                  <div className="text-[11px] text-slate-500">Worker logged rebuttal</div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-blue-400 shadow-xs flex items-center gap-3 ring-2 ring-blue-500/20">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-700">3. Neutral Review</div>
                  <div className="text-[11px] text-slate-500">Adjudicator inspection</div>
                </div>
              </div>

              <div className="p-3 bg-white/70 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3 opacity-60">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-700">4. Binding Settlement</div>
                  <div className="text-[11px] text-slate-400">Release or refund</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dossier & Evidence Details */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Evidence image & Technical Claims (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Evidence tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
                <button
                  onClick={() => setEvidenceTab('dossier')}
                  className={`pb-2 font-bold cursor-pointer transition ${
                    evidenceTab === 'dossier' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Visual Evidence Diff
                </button>
                <button
                  onClick={() => setEvidenceTab('telemetry')}
                  className={`pb-2 font-bold cursor-pointer transition ${
                    evidenceTab === 'telemetry' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Section 21 Telemetry Logs
                </button>
                <button
                  onClick={() => setEvidenceTab('guidelines')}
                  className={`pb-2 font-bold cursor-pointer transition ${
                    evidenceTab === 'guidelines' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Standard 4.2 Rules
                </button>
              </div>

              {evidenceTab === 'dossier' && (
                <div className="space-y-4">
                  <div className="rounded-2xl border-2 border-slate-200 overflow-hidden relative shadow-md bg-black">
                    <img
                      src={HOTLINKED_IMAGES.dispute_dossier}
                      alt="Dispute evidence annotation frame comparison"
                      className="w-full h-auto object-cover max-h-80"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/85 text-white px-2.5 py-1 rounded-md text-[11px] font-mono border border-slate-700">
                      EXEMPLAR FRAME 014: Visual Polygon Inspection
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-red-50/70 border border-red-200">
                      <div className="font-bold text-red-800 mb-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">cancel</span>
                        Client Rejection Argument
                      </div>
                      <p className="text-slate-700 text-[11px] leading-relaxed">
                        "Bounding polygon at X:418 Y:602 clipped lower knee joint. Model inference tests require unbroken containment."
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                      <div className="font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Worker Rebuttal Defense
                      </div>
                      <p className="text-slate-700 text-[11px] leading-relaxed">
                        "Lidar point cloud confirms pedestrian occlusion by traffic pole. Followed Appendix C Exception rule for wet road reflection."
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {evidenceTab === 'telemetry' && (
                <div className="bg-slate-950 rounded-2xl p-4 font-mono text-xs text-emerald-400 space-y-2 max-h-80 overflow-y-auto">
                  <div className="text-slate-400 text-[11px] border-b border-slate-800 pb-2">
                    // RAW AUDIT LOG: AUTONOMOUS PROTOCOL SENSOR DATA
                  </div>
                  <div>[2026-09-23 18:41:02.104] HASH: 0x8a92ff14c810a9e290</div>
                  <div>[2026-09-23 18:41:02.105] WORKER_ID: US-9281-SARAH</div>
                  <div>[2026-09-23 18:41:02.107] TASK_ID: TSK-9402 | ESCROW: $42.00</div>
                  <div>[2026-09-23 18:41:02.110] BOUNDING_COORDINATES: (32.4, 42.1) to (46.8, 80.5)</div>
                  <div>[2026-09-23 18:41:02.112] CONFIDENCE_SCORE: 99.41%</div>
                  <div>[2026-09-23 18:41:02.115] OCCLUSION_FLAG: TRUE [VEHICLE_OBSTACLE: 34.2%]</div>
                  <div>[2026-09-23 18:41:02.118] SECTION_21_COMPLIANCE: VERIFIED_PASS</div>
                  <div className="text-amber-400">[2026-09-23 19:10:04.882] CLIENT_REJECT_PAYOUT: REASON_CODE_41 (CONTAINMENT)</div>
                </div>
              )}

              {evidenceTab === 'guidelines' && (
                <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white p-4 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Autonomous Bounding Guidelines Standard 4.2</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under TaskFlow Section 21 Arbitration rules, when environmental occlusion exceeds 30%, workers are protected against arbitrary milestone rejections if polygon accuracy maintains 95%+ fidelity.
                  </p>
                  <img
                    src={HOTLINKED_IMAGES.guidelines_rule}
                    alt="Section 21 Guideline screenshot"
                    className="w-full h-auto rounded-xl border border-slate-200"
                  />
                </div>
              )}
            </div>

            {/* Right: Adjudication Hearing Discussion / Log (5 cols) */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-blue-600 text-base">forum</span>
                    Case Deliberation Hearing
                  </h3>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                    3 Statements
                  </span>
                </div>

                {/* Comment thread */}
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {comments.map((c, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl text-xs space-y-1 ${
                        c.role === 'worker'
                          ? 'bg-blue-50 border border-blue-200 ml-3'
                          : c.role === 'client'
                          ? 'bg-amber-50 border border-amber-200 mr-3'
                          : 'bg-white border border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span className={c.role === 'arbitrator' ? 'text-purple-700 font-bold' : 'text-slate-800'}>
                          {c.author}
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">{c.time}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed text-[11px]">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add statement input */}
              <form onSubmit={handleSendComment} className="space-y-2 pt-3 border-t border-slate-200">
                <textarea
                  rows={2}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Submit statement or rebuttal to Arbitrator #04..."
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  Submit to Adjudication Record
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
