import React from 'react';
import { useApp } from '../../context/AppContext';

export const PayoutSettledModal: React.FC = () => {
  const {
    payoutSettledModalOpen,
    setPayoutSettledModalOpen,
    payoutReceiptData,
    setCurrentScreen
  } = useApp();

  if (!payoutSettledModalOpen || !payoutReceiptData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden text-center">
        {/* Celebration Header */}
        <div className="p-8 bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-white space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm ring-8 ring-emerald-50">
            <span className="material-symbols-outlined text-3xl">verified</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-emerald-700 tracking-wider uppercase bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Escrow Settlement Confirmed
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 font-display">
              Funds Disbursed
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Smart contract custody successfully transferred funds without dispute or delay.
            </p>
          </div>

          {/* Amount Callout */}
          <div className="text-4xl font-extrabold text-emerald-600 font-mono tracking-tight pt-2">
            ${(payoutReceiptData.amount ?? payoutReceiptData.amountUSD ?? 0).toFixed(2)}
          </div>
        </div>

        {/* Receipt Details Card */}
        <div className="p-6 bg-slate-50 border-t border-b border-slate-100 space-y-3 text-left text-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span>Reference ID:</span>
            <span className="font-mono text-slate-800 font-semibold">{payoutReceiptData.id}</span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>Protocol Custody ID:</span>
            <span className="font-mono text-slate-800 font-semibold">{payoutReceiptData.escrowId}</span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>Settlement Target:</span>
            <span className="text-slate-800 font-medium truncate max-w-[200px]">{payoutReceiptData.taskTitle}</span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>Execution Protocol:</span>
            <span className="text-slate-800 font-medium">{payoutReceiptData.protocol}</span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>Network / Platform Fee:</span>
            <span className="text-emerald-600 font-bold">$0.00 (100% Retained)</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-6 space-y-2.5">
          <button
            onClick={() => {
              setPayoutSettledModalOpen(false);
              setCurrentScreen('earnings');
            }}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">account_balance_wallet</span>
            View in Wallet Ledger
          </button>

          <button
            onClick={() => setPayoutSettledModalOpen(false)}
            className="w-full py-2.5 text-slate-500 hover:text-slate-800 text-xs font-semibold transition cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
