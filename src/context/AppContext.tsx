import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ScreenId, TaskItem, TransactionItem, DisputeCase, PayoutReceiptData } from '../types';
import { INITIAL_TASKS, INITIAL_TRANSACTIONS, MOCK_DISPUTE } from '../data/mockData';

interface AppContextType {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
  tasks: TaskItem[];
  selectedTask: TaskItem | null;
  setSelectedTask: (task: TaskItem | null) => void;
  completeTask: (taskId: string, reward: number) => void;
  unlockTask: (taskId: string, method?: string) => Promise<void>;
  transactions: TransactionItem[];
  addTransaction: (item: TransactionItem) => void;
  dispute: DisputeCase;
  setDispute: React.Dispatch<React.SetStateAction<DisputeCase>>;
  resolveDispute: (ruling: 'worker' | 'client' | 'split' | 'revision') => void;
  // Modals
  unlockModalTask: TaskItem | null;
  setUnlockModalTask: (task: TaskItem | null) => void;
  withdrawModalOpen: boolean;
  setWithdrawModalOpen: (open: boolean) => void;
  payoutSettledModalOpen: boolean;
  setPayoutSettledModalOpen: (open: boolean) => void;
  payoutReceiptData: PayoutReceiptData | null;
  setPayoutReceiptData: (data: PayoutReceiptData | null) => void;
  fileDisputeModalOpen: boolean;
  setFileDisputeModalOpen: (open: boolean) => void;
  submitConfirmModalOpen: boolean;
  setSubmitConfirmModalOpen: (open: boolean) => void;
  dossierModalOpen: boolean;
  setDossierModalOpen: (open: boolean) => void;
  toast: { message: string; subMessage?: string; icon?: string; type?: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, subMessage?: string | 'success' | 'error' | 'info', icon?: string) => void;
  executeWithdrawal: (amountUSD: number, phone?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [walletBalance, setWalletBalance] = useState<number>(245.50);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(INITIAL_TASKS[0] || null);
  const [transactions, setTransactions] = useState<TransactionItem[]>(INITIAL_TRANSACTIONS);
  const [dispute, setDispute] = useState<DisputeCase>(MOCK_DISPUTE);

  // Modals
  const [unlockModalTask, setUnlockModalTask] = useState<TaskItem | null>(null);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState<boolean>(false);
  const [payoutSettledModalOpen, setPayoutSettledModalOpen] = useState<boolean>(false);
  const [payoutReceiptData, setPayoutReceiptData] = useState<PayoutReceiptData | null>(null);
  const [fileDisputeModalOpen, setFileDisputeModalOpen] = useState<boolean>(false);
  const [submitConfirmModalOpen, setSubmitConfirmModalOpen] = useState<boolean>(false);
  const [dossierModalOpen, setDossierModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; subMessage?: string; icon?: string; type?: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, subMessage?: string | 'success' | 'error' | 'info', icon = 'check_circle') => {
    let type: 'success' | 'error' | 'info' = 'info';
    let sub: string | undefined = undefined;
    if (subMessage === 'success' || subMessage === 'error' || subMessage === 'info') {
      type = subMessage;
    } else {
      sub = subMessage;
    }
    setToast({ message, subMessage: sub, icon, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  const completeTask = (taskId: string, reward: number) => {
    setWalletBalance((prev) => +(prev + reward).toFixed(2));
    const task = tasks.find((t) => t.id === taskId);
    addTransaction({
      id: `TXN-${Math.floor(8000000 + Math.random() * 999999)}`,
      timestamp: 'Just now',
      dateStr: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      date: 'Today, Just now',
      description: `${taskId}: Milestone Escrow Released`,
      subDescription: `${task?.title || 'Micro-Task'} · Section 21 Automated Approval`,
      taskTitle: task?.title || 'Sensor Bounding Milestone',
      type: 'Task Bounty',
      rail: 'TaskFlow Smart Escrow',
      amount: reward,
      isCredit: true,
      status: 'Settled',
      category: 'earnings',
    });
  };

  const addTransaction = (item: TransactionItem) => {
    setTransactions((prev) => [item, ...prev]);
  };

  const unlockTask = async (taskId: string, method = 'wallet') => {
    const fee = 0.80;
    if (method === 'wallet') {
      setWalletBalance((prev) => Math.max(0, +(prev - fee).toFixed(2)));
    }

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              isUnlocked: true,
              slotsRemaining: Math.max(0, (t.slotsRemaining ?? 50) - 1),
              slotsUnlocked: (t.slotsUnlocked ?? 0) + 1,
            }
          : t
      )
    );

    const task = tasks.find((t) => t.id === taskId);
    addTransaction({
      id: `TXN-${Math.floor(8000000 + Math.random() * 999999)}`,
      timestamp: 'Just now',
      dateStr: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: `${taskId}: Task Access Unlock Fee`,
      subDescription: `${task?.title || 'Micro-Task'} · Protocol Verification`,
      type: 'Micro-Unlock',
      rail: method === 'mpesa' ? 'M-Pesa Express' : 'TaskFlow Wallet',
      amount: fee,
      isCredit: false,
      status: 'Processed',
      category: 'unlocks',
    });

    showToast('Task Brief Unlocked!', `Full instructions and dataset links are now active in your workspace.`);
  };

  const executeWithdrawal = (amountUSD: number, phone = '+254 712 345 678') => {
    const fxRate = 131.50;
    const amountKES = +(amountUSD * fxRate).toFixed(2);
    const receiptCode = 'QJH' + Math.floor(1000 + Math.random() * 9000) + 'XLP';

    setWalletBalance((prev) => Math.max(0, +(prev - amountUSD).toFixed(2)));

    const newTx: TransactionItem = {
      id: `TXN-DISB-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: 'Just now, 16:22',
      dateStr: 'Today',
      description: 'Disbursement to Mobile Wallet',
      subDescription: `Ref: ${receiptCode} · Safaricom M-Pesa (${phone})`,
      type: 'Payout Rail',
      rail: 'M-Pesa Express',
      amount: amountUSD,
      isCredit: false,
      status: 'Disbursed',
      auditRef: receiptCode,
      category: 'withdrawals',
    };
    addTransaction(newTx);

    setPayoutReceiptData({
      amountUSD,
      amountKES,
      phone,
      receiptCode,
      timestamp: new Date().toLocaleString(),
    });

    setWithdrawModalOpen(false);
    setPayoutSettledModalOpen(true);
    showToast('Payout Settled!', `$${amountUSD.toFixed(2)} (${amountKES.toLocaleString()} KES) sent to M-Pesa ${phone}.`);
  };

  const resolveDispute = (ruling: 'worker' | 'client' | 'split' | 'revision') => {
    if (ruling === 'worker') {
      setDispute((prev) => ({
        ...prev,
        status: 'Settled',
        auditTrailNotes: 'Arbitration Complete: Ruled in favor of worker Elena Rostova. Full escrow $50.00 disbursed + $0.80 unlock protection reimbursed.',
      }));
      setWalletBalance((prev) => +(prev + 50.80).toFixed(2));
      addTransaction({
        id: `TXN-ARB-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: 'Just now',
        dateStr: 'Today',
        description: 'Dispute Settlement Award (Case DSP-8492)',
        subDescription: 'Full $50.00 Escrow + $0.80 Fee Refund credited to wallet',
        type: 'Task Bounty',
        rail: 'TaskFlow Wallet',
        amount: 50.80,
        isCredit: true,
        status: 'Settled',
        category: 'earnings',
      });
      showToast('Arbitration Resolved in Worker Favor', '$50.80 total credited to worker balance.');
    } else if (ruling === 'client') {
      setDispute((prev) => ({
        ...prev,
        status: 'Resolved',
        auditTrailNotes: 'Arbitration Complete: Ruled in favor of client TechSolutions Global. $50.00 escrow returned to client vault.',
      }));
      showToast('Arbitration Resolved', 'Escrow returned to client vault.');
    } else if (ruling === 'split') {
      setDispute((prev) => ({
        ...prev,
        status: 'Settled',
        auditTrailNotes: 'Arbitration Complete: 50/50 compromise partition. $25.00 disbursed to worker + $0.80 fee refund.',
      }));
      setWalletBalance((prev) => +(prev + 25.80).toFixed(2));
      showToast('Arbitration Split Ruling', '50/50 escrow split executed.');
    } else {
      setDispute((prev) => ({
        ...prev,
        status: 'Under Review',
        auditTrailNotes: 'Mandatory 24-hour revision order issued to worker. Escrow frozen in vault.',
      }));
      showToast('Revision Order Dispatched', 'Worker granted 24 hours to revise annotations.');
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        walletBalance,
        setWalletBalance,
        tasks,
        selectedTask,
        setSelectedTask,
        completeTask,
        unlockTask,
        transactions,
        addTransaction,
        dispute,
        setDispute,
        resolveDispute,
        unlockModalTask,
        setUnlockModalTask,
        withdrawModalOpen,
        setWithdrawModalOpen,
        payoutSettledModalOpen,
        setPayoutSettledModalOpen,
        payoutReceiptData,
        setPayoutReceiptData,
        fileDisputeModalOpen,
        setFileDisputeModalOpen,
        submitConfirmModalOpen,
        setSubmitConfirmModalOpen,
        dossierModalOpen,
        setDossierModalOpen,
        toast,
        showToast,
        executeWithdrawal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
