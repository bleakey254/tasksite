import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const UnlockModal: React.FC = () => {
  const {
    unlockModalTask,
    setUnlockModalTask,
    unlockTask,
    walletBalance,
    setSelectedTask,
    setCurrentScreen,
    showToast
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'balance' | 'card' | 'apple_pay'>('balance');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!unlockModalTask) return null;

  const handleConfirmUnlock = () => {
    setIsProcessing(true);
    setTimeout(() => {
      unlockTask(unlockModalTask.id);
      setSelectedTask(unlockModalTask);
      setIsProcessing(false);
      setUnlockModalTask(null);
      setCurrentScreen('task-workspace');
      showToast(`Task unlocked! $0.80 micro-deposit confirmed. Escrow secured.`, 'success');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white relative">
          <button
            onClick={() => setUnlockModalTask(null)}
            className="absolute right-4 top-4 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-[10px] font-bold uppercase tracking-wider mb-2">
            Section 21 Anti-Spam Protocol
          </div>
          <h3 className="text-xl font-extrabold font-display">Worker Unlock Protocol</h3>
          <p className="text-xs text-blue-200 mt-1">
            Deposit $0.80 to reserve this high-yield task slot and enter the production workspace.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Target Task Summary */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 line-clamp-1 flex-1 pr-2">
                {unlockModalTask.title}
              </span>
              <span className="text-emerald-600 font-bold font-mono text-sm whitespace-nowrap">
                +${unlockModalTask.reward.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Client: {unlockModalTask.clientName}</span>
              <span className="text-blue-600 font-medium">Est. {unlockModalTask.estimatedTime}</span>
            </div>
          </div>

          {/* Why $0.80 Explanation */}
          <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-200 text-xs text-slate-700 space-y-1.5">
            <div className="font-bold text-blue-900 flex items-center gap-1.5 text-xs">
              <span className="material-symbols-outlined text-sm text-blue-600">shield</span>
              Why does TaskFlow require $0.80 to unlock?
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              The $0.80 micro-deposit eliminates automated bots and AI scrapers from hogging valuable tasks. You recoup this immediately upon milestone delivery (${unlockModalTask.reward.toFixed(2)} return).
            </p>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Select Unlock Source
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('balance')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  paymentMethod === 'balance'
                    ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-slate-900">Wallet Balance</div>
                <div className="text-[11px] text-slate-500">${walletBalance.toFixed(2)} available</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-slate-900">Card / Apple Pay</div>
                <div className="text-[11px] text-slate-500">Instant $0.80 charge</div>
              </button>
            </div>
          </div>

          {/* Deposit Breakdown */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-600">
            <span>Unlock Fee:</span>
            <span className="font-bold font-mono text-slate-900">$0.80 USD</span>
          </div>

          {/* Action Button */}
          <button
            onClick={handleConfirmUnlock}
            disabled={isProcessing}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {isProcessing ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying Staking Protocol...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">lock_open</span>
                <span>Confirm $0.80 & Enter Workspace</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
