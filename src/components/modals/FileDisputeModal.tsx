import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const FileDisputeModal: React.FC = () => {
  const {
    fileDisputeModalOpen,
    setFileDisputeModalOpen,
    setCurrentScreen,
    showToast
  } = useApp();

  const [reason, setReason] = useState<string>('rejection');
  const [statement, setStatement] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!fileDisputeModalOpen) return null;

  const handleSubmitDispute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statement.trim()) {
      showToast('Please describe your dispute justification.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFileDisputeModalOpen(false);
      setCurrentScreen('worker-disputes');
      showToast('Dispute docket lodged with Section 21 Arbitration Court. Escrow frozen in custody.', 'success');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-red-900 to-amber-950 text-white relative">
          <button
            onClick={() => setFileDisputeModalOpen(false)}
            className="absolute right-4 top-4 text-red-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/30 text-red-200 text-[10px] font-bold uppercase tracking-wider mb-2">
            Section 21 Neutral Arbitration
          </div>
          <h3 className="text-xl font-extrabold font-display">Lodge Escrow Dispute</h3>
          <p className="text-xs text-red-200 mt-1">
            Freeze funds in custody and initiate third-party arbitrator review.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmitDispute} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Dispute Ground
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="rejection">Unjust Milestone Rejection / Ambiguous Guidelines</option>
              <option value="sla">Client Review SLA Expired (&gt;12 hours)</option>
              <option value="specification">Task Scope Creep Beyond Original Contract</option>
              <option value="technical">Platform Sensor Data Feed Discrepancy</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Worker Evidence Statement & Citations
            </label>
            <textarea
              rows={4}
              required
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              placeholder="Cite the Section 21 protocol rules or attach frame timestamps that prove your deliverable conforms to standards..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none font-sans"
            />
          </div>

          <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-[11px] text-red-800 space-y-1">
            <div className="font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">lock</span>
              Escrow Protection Activated
            </div>
            <p>
              Once lodged, client cannot claw back the deposit. An independent arbitrator will evaluate telemetry logs within 24 hours.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/25 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Submitting to Arbitration Court...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">gavel</span>
                <span>Freeze Escrow & Lodge Dispute</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
