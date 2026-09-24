import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const WithdrawModal: React.FC = () => {
  const {
    withdrawModalOpen,
    setWithdrawModalOpen,
    walletBalance,
    setWalletBalance,
    addTransaction,
    setPayoutReceiptData,
    setPayoutSettledModalOpen,
    showToast
  } = useApp();

  const [amount, setAmount] = useState<string>(walletBalance.toFixed(2));
  const [method, setMethod] = useState<'bank' | 'paypal' | 'crypto'>('bank');
  const [destination, setDestination] = useState<string>('Chase Checking (•••• 4821)');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!withdrawModalOpen) return null;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      showToast('Please enter a valid withdrawal amount.', 'error');
      return;
    }
    if (withdrawAmount > walletBalance) {
      showToast('Withdrawal amount exceeds available wallet balance.', 'error');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setWalletBalance(prev => prev - withdrawAmount);
      const newTxId = `TX-${Math.floor(100000 + Math.random() * 900000)}`;
      addTransaction({
        id: newTxId,
        type: 'withdrawal',
        description: `Instant Payout via ${method.toUpperCase()} (${destination})`,
        amount: -withdrawAmount,
        date: 'Today, Just now',
        status: 'completed',
        escrowId: `WD-${Math.floor(100000 + Math.random() * 900000)}`
      });

      setPayoutReceiptData({
        id: newTxId,
        taskTitle: `Direct Instant Payout (${destination})`,
        amount: withdrawAmount,
        date: 'Today, Just now',
        escrowId: `SETTLEMENT-ACH-${Math.floor(100000 + Math.random() * 900000)}`,
        protocol: 'Section 21 Instant Settlement Rail',
        networkFee: 0.00
      });

      setIsProcessing(false);
      setWithdrawModalOpen(false);
      setPayoutSettledModalOpen(true);
      showToast(`$${withdrawAmount.toFixed(2)} disbursed to your account. Zero fees deducted.`, 'success');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white relative">
          <button
            onClick={() => setWithdrawModalOpen(false)}
            className="absolute right-4 top-4 text-emerald-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-bold uppercase tracking-wider mb-2">
            Instant Liquidity Rail
          </div>
          <h3 className="text-xl font-extrabold font-display">Instant Escrow Payout</h3>
          <p className="text-xs text-emerald-200 mt-1">
            Zero fees. Instant disbursement of your validated milestone earnings.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleWithdraw} className="p-6 space-y-5">
          {/* Balance card */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold block uppercase">Available Balance</span>
              <span className="text-2xl font-extrabold text-slate-900 font-display">${walletBalance.toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={() => setAmount(walletBalance.toFixed(2))}
              className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-blue-600 cursor-pointer"
            >
              Withdraw All
            </button>
          </div>

          {/* Amount input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Withdrawal Amount ($ USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
              <input
                type="number"
                step="0.01"
                max={walletBalance}
                min="1.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                required
              />
            </div>
          </div>

          {/* Destination options */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Transfer Destination
            </span>
            <div className="space-y-2">
              <label
                onClick={() => { setMethod('bank'); setDestination('Chase Checking (•••• 4821)'); }}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${
                  method === 'bank' ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-lg text-emerald-700">account_balance</span>
                  <div>
                    <div className="font-bold text-slate-900">Direct Bank (ACH Instant)</div>
                    <div className="text-[11px] text-slate-500">Chase Checking (•••• 4821)</div>
                  </div>
                </div>
                <span className="text-[11px] text-emerald-700 font-bold">Free</span>
              </label>

              <label
                onClick={() => { setMethod('paypal'); setDestination('sarah.jenkins@workmail.com'); }}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${
                  method === 'paypal' ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-lg text-blue-600">send</span>
                  <div>
                    <div className="font-bold text-slate-900">PayPal Instant</div>
                    <div className="text-[11px] text-slate-500">sarah.jenkins@workmail.com</div>
                  </div>
                </div>
                <span className="text-[11px] text-emerald-700 font-bold">Free</span>
              </label>

              <label
                onClick={() => { setMethod('crypto'); setDestination('Solana USDC (4jK9...8L2p)'); }}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${
                  method === 'crypto' ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-lg text-purple-600">currency_bitcoin</span>
                  <div>
                    <div className="font-bold text-slate-900">USDC Solana Settlement</div>
                    <div className="text-[11px] text-slate-500">Instant On-Chain Release</div>
                  </div>
                </div>
                <span className="text-[11px] text-emerald-700 font-bold">Free</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isProcessing || walletBalance <= 0}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {isProcessing ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authorizing Instant Release...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>Disburse ${parseFloat(amount || '0').toFixed(2)} to {method.toUpperCase()}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
