import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { FindTasksScreen } from './components/FindTasksScreen';
import { TaskWorkspaceScreen } from './components/TaskWorkspaceScreen';
import { EarningsScreen } from './components/EarningsScreen';
import { WorkerDisputesScreen } from './components/WorkerDisputesScreen';
import { AdminApprovalScreen } from './components/AdminApprovalScreen';
import { AdminAnalyticsScreen } from './components/AdminAnalyticsScreen';
import { AdminDisputeCenterScreen } from './components/AdminDisputeCenterScreen';
import { UnlockModal } from './components/modals/UnlockModal';
import { WithdrawModal } from './components/modals/WithdrawModal';
import { PayoutSettledModal } from './components/modals/PayoutSettledModal';
import { SubmitConfirmModal } from './components/modals/SubmitConfirmModal';
import { FileDisputeModal } from './components/modals/FileDisputeModal';

const AppContent: React.FC = () => {
  const { currentScreen, toast } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Universal Header (hidden only inside immersion task-workspace if preferred, but keeping accessible for navigation) */}
      <Header />

      {/* Screen Router */}
      <main className="flex-1">
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'find-tasks' && <FindTasksScreen />}
        {currentScreen === 'task-workspace' && <TaskWorkspaceScreen />}
        {currentScreen === 'earnings' && <EarningsScreen />}
        {currentScreen === 'worker-disputes' && <WorkerDisputesScreen />}
        {currentScreen === 'admin-approval' && <AdminApprovalScreen />}
        {currentScreen === 'admin-analytics' && <AdminAnalyticsScreen />}
        {currentScreen === 'admin-disputes' && <AdminDisputeCenterScreen />}
      </main>

      {/* Modals Layer */}
      <UnlockModal />
      <WithdrawModal />
      <PayoutSettledModal />
      <SubmitConfirmModal />
      <FileDisputeModal />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-semibold ${
            toast.type === 'success'
              ? 'bg-emerald-900 text-white border-emerald-700 shadow-emerald-950/20'
              : toast.type === 'error'
              ? 'bg-red-900 text-white border-red-700 shadow-red-950/20'
              : 'bg-slate-900 text-white border-slate-800 shadow-slate-950/20'
          }`}>
            <span className="material-symbols-outlined text-base">
              {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
            </span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
