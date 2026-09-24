import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TransactionItem } from '../types';

export const EarningsScreen: React.FC = () => {
  const {
    walletBalance,
    transactions,
    setWithdrawModalOpen,
    setPayoutSettledModalOpen,
    setPayoutReceiptData,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'earnings' | 'unlock' | 'withdrawal'>('all');

  const inEscrowBalance = 92.50;
  const lifetimeEarned = 1842.00;
  const unlockCredits = 14.40; // 18 unlocks @ $0.80

  const filteredTransactions = transactions.filter(t => {
    if (activeTab === 'all') return true;
    return t.type === activeTab;
  });

  const handleViewReceipt = (t: TransactionItem) => {
    setPayoutReceiptData({
      id: t.id,
      taskTitle: t.taskTitle || 'Protocol Operation',
      amount: Math.abs(t.amount),
      date: t.date,
      escrowId: t.escrowId || `ESC-${Math.floor(100000 + Math.random() * 900000)}`,
      protocol: 'TaskFlow Section 21 Smart Settlement',
      networkFee: 0.00,
    });
    setPayoutSettledModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Smart Escrow Custody: Operational</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Worker Financial Ledger & Escrow Wallet
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Guaranteed milestone payments held in programmatic custody. Automatic 12h SLA auto-settlement.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('2026 Q1/Q2 1099-K & W-8BEN tax report exported to PDF', 'success')}
              className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-slate-500">description</span>
              Export Tax Statement
            </button>
            <button
              onClick={() => setWithdrawModalOpen(true)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">payments</span>
              Instant Withdrawal
            </button>
          </div>
        </div>

        {/* 4 Key Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Available Balance */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between text-blue-200 text-xs font-medium mb-3">
              <span>AVAILABLE BALANCE</span>
              <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
            </div>
            <div className="text-3xl font-extrabold font-display tracking-tight text-white mb-2">
              ${walletBalance.toFixed(2)}
            </div>
            <div className="flex items-center justify-between text-[11px] text-blue-300 pt-3 border-t border-blue-800/60">
              <span>Instant Payout Ready</span>
              <span className="text-emerald-400 font-semibold">0% Payout Fee</span>
            </div>
          </div>

          {/* Card 2: In Escrow Pipeline */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
              <span className="font-semibold text-slate-500">ESCROW IN TRANSIT</span>
              <span className="material-symbols-outlined text-lg text-amber-500">lock_clock</span>
            </div>
            <div className="text-3xl font-extrabold font-display tracking-tight text-slate-900 mb-2">
              ${inEscrowBalance.toFixed(2)}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
              <span>2 Tasks Under Review</span>
              <span className="text-amber-600 font-semibold">Auto-Releases in ~4h</span>
            </div>
          </div>

          {/* Card 3: Lifetime Earned */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
              <span className="font-semibold text-slate-500">LIFETIME EARNINGS</span>
              <span className="material-symbols-outlined text-lg text-emerald-500">trending_up</span>
            </div>
            <div className="text-3xl font-extrabold font-display tracking-tight text-slate-900 mb-2">
              ${lifetimeEarned.toFixed(2)}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
              <span>100% Guaranteed</span>
              <span className="text-emerald-600 font-semibold">48 Milestones</span>
            </div>
          </div>

          {/* Card 4: Unlock Stash */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
              <span className="font-semibold text-slate-500">UNLOCK STASH ($0.80)</span>
              <span className="material-symbols-outlined text-lg text-blue-500">key</span>
            </div>
            <div className="text-3xl font-extrabold font-display tracking-tight text-slate-900 mb-2">
              ${unlockCredits.toFixed(2)}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
              <span>18 Gigs Unlockable</span>
              <span className="text-blue-600 font-semibold">Anti-Sybil Tier 1</span>
            </div>
          </div>
        </div>

        {/* Live Escrow Pipeline Tracker */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-xl">verified</span>
              <h2 className="text-base font-bold text-slate-900">Active Escrow Milestones</h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">Protected by Section 21 SLA</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  LiDAR & Video Sensor Semantic Bounding
                </span>
                <span className="text-xs font-mono font-bold text-emerald-600">$38.50</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Client: Wayve Mobility AI</span>
                <span className="text-amber-600 font-medium">Auto-release in 03:42:15</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '75%' }} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Section 21 Verification Passed (99.4%)</span>
                <span className="text-blue-600 font-semibold">Escrow In Custody</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  Medical CT Scan Lesion Tagging
                </span>
                <span className="text-xs font-mono font-bold text-emerald-600">$54.00</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Client: BioScan Health</span>
                <span className="text-blue-600 font-medium">Under Secondary Review</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '45%' }} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Radiology Audit Batch #09</span>
                <span className="text-slate-600 font-medium">SLA: 12h remaining</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History & Filter Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Ledger & Transaction History</h2>
              <p className="text-xs text-slate-500">Immutable log of worker unlocks, escrow releases, and bank withdrawals.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Records
              </button>
              <button
                onClick={() => setActiveTab('earnings')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'earnings' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Milestone Payouts
              </button>
              <button
                onClick={() => setActiveTab('unlock')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'unlock' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Unlocks ($0.80)
              </button>
              <button
                onClick={() => setActiveTab('withdrawal')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'withdrawal' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Withdrawals
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-3 px-6">Transaction ID</th>
                  <th className="py-3 px-6">Type & Description</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Amount</th>
                  <th className="py-3 px-6 text-center">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6 font-mono text-[11px] text-slate-500 font-medium">
                      {tx.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">{tx.description}</div>
                      {tx.taskTitle && (
                        <div className="text-[11px] text-slate-400 truncate max-w-xs">{tx.taskTitle}</div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-slate-500 whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        tx.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        tx.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {tx.status === 'completed' ? 'Settled' : tx.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-mono font-bold whitespace-nowrap">
                      <span className={tx.amount > 0 ? 'text-emerald-600' : 'text-slate-800'}>
                        {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleViewReceipt(tx)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                        title="View Settlement Receipt"
                      >
                        <span className="material-symbols-outlined text-base">receipt_long</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
