import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const SubmitConfirmModal: React.FC = () => {
  const {
    submitConfirmModalOpen,
    setSubmitConfirmModalOpen,
    selectedTask,
    completeTask,
    setPayoutReceiptData,
    setPayoutSettledModalOpen,
    showToast
  } = useApp();

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!submitConfirmModalOpen) return null;

  const currentReward = selectedTask ? selectedTask.reward : 38.50;
  const currentTitle = selectedTask ? selectedTask.title : 'LiDAR & Video Sensor Semantic Bounding';
  const taskId = selectedTask ? selectedTask.id : 'TSK-9402';

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      completeTask(taskId, currentReward);
      setPayoutReceiptData({
        id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        taskTitle: currentTitle,
        amount: currentReward,
        date: 'Today, Just now',
        escrowId: `ESC-SETTLED-${Math.floor(100000 + Math.random() * 900000)}`,
        protocol: 'Section 21 Automated Escrow Settlement',
        networkFee: 0.00
      });
      setIsSubmitting(false);
      setSubmitConfirmModalOpen(false);
      setPayoutSettledModalOpen(true);
      showToast(`Milestone submission validated! $${currentReward.toFixed(2)} transferred to wallet.`, 'success');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white relative">
          <button
            onClick={() => setSubmitConfirmModalOpen(false)}
            className="absolute right-4 top-4 text-blue-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-[10px] font-bold uppercase tracking-wider mb-2">
            Section 21 Milestone Validation
          </div>
          <h3 className="text-xl font-extrabold font-display">Submit Annotation Batch</h3>
          <p className="text-xs text-blue-200 mt-1">
            Deliver 50 annotated sensor frames for automated client escrow release.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 line-clamp-1">{currentTitle}</span>
              <span className="text-emerald-600 font-bold font-mono text-sm whitespace-nowrap">
                +${currentReward.toFixed(2)}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-2">
              <span className="text-emerald-600 font-semibold">● 50/50 Frames Completed</span>
              <span>•</span>
              <span>100% Section 21 Compliant</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
              <span>Pedestrian bounding boxes verified (99.4% IoU)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
              <span>Occlusion tags registered with sensor timestamps</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
              <span>Guaranteed payout from locked escrow vault</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Instant Release SLA:</span>
            <span className="font-bold text-slate-900">Under 12 Hours (Guaranteed)</span>
          </div>

          <button
            onClick={handleConfirmSubmit}
            disabled={isSubmitting}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Validating Cryptographic Proof...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">verified</span>
                <span>Confirm & Claim ${currentReward.toFixed(2)} Milestone</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
