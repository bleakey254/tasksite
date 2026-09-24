import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { APP_LOGOS } from '../data/mockData';
import { ScreenId } from '../types';

export const Header: React.FC = () => {
  const { currentScreen, setCurrentScreen, walletBalance, setWithdrawModalOpen } = useApp();
  const [screenSwitcherOpen, setScreenSwitcherOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const navScreens: { id: ScreenId; label: string }[] = [
    { id: 'find-tasks', label: 'Find Tasks' },
    { id: 'home', label: 'How It Works' },
    { id: 'task-workspace', label: 'For Clients' },
    { id: 'earnings', label: 'For Workers' },
    { id: 'worker-disputes', label: 'Pricing' },
  ];

  const allScreens: { id: ScreenId; label: string; group: string; icon: string }[] = [
    { id: 'home', label: '1. Landing Page (How It Works)', group: 'Public Flow', icon: 'home' },
    { id: 'find-tasks', label: '2. Explore Marketplace Tasks', group: 'Worker Flow', icon: 'travel_explore' },
    { id: 'task-workspace', label: '3. Task Workspace (TASK-10482)', group: 'Worker Flow', icon: 'terminal' },
    { id: 'worker-disputes', label: '4. Dispute Case #DSP-8492', group: 'Worker Flow', icon: 'gavel' },
    { id: 'earnings', label: '5. Earnings & Worker Wallet', group: 'Worker Flow', icon: 'account_balance_wallet' },
    { id: 'admin-approval', label: '6. Admin: Task Approval Center', group: 'Admin Console', icon: 'verified' },
    { id: 'admin-analytics', label: '7. Admin: $0.80 Unlock Analytics', group: 'Admin Console', icon: 'monitoring' },
    { id: 'admin-disputes', label: '8. Admin: Dispute Center & Escrow', group: 'Admin Console', icon: 'balance' },
  ];

  const isAdminScreen = currentScreen.startsWith('admin-');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/90 backdrop-blur-xl border-b border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Brand & Main Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-98"
          >
            <img
              src={APP_LOGOS.main}
              alt="TaskFlow Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="font-bold text-xl tracking-tight text-[#131b2e]">TaskFlow</span>
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {navScreens.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`text-sm font-semibold transition-colors ${
                    isActive ? 'text-[#004ac6]' : 'text-[#434655] hover:text-[#131b2e]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Screen Navigator Quick Jumper, Wallet Pill, Notifications, User */}
        <div className="flex items-center gap-3">
          {/* Quick Screen Navigator Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setScreenSwitcherOpen(!screenSwitcherOpen)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#004ac6] text-xs font-bold transition-all border border-[#dbe1ff]"
              title="Jump between prototype screens"
            >
              <span className="material-symbols-outlined text-[16px]">layers</span>
              <span>All Screens ({allScreens.length})</span>
              <span className="material-symbols-outlined text-[14px]">
                {screenSwitcherOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {screenSwitcherOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-[#dae2fd] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 border-b border-[#eaedff] flex items-center justify-between text-xs text-[#737686]">
                  <span className="font-bold uppercase tracking-wider">Prototype Screen Switcher</span>
                  <span className="text-[10px] bg-[#f2f3ff] px-1.5 py-0.5 rounded text-[#004ac6]">8 Views</span>
                </div>
                <div className="max-h-[360px] overflow-y-auto divide-y divide-[#f2f3ff] p-1">
                  {allScreens.map((screen) => (
                    <button
                      key={screen.id}
                      onClick={() => {
                        setCurrentScreen(screen.id);
                        setScreenSwitcherOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left rounded-lg flex items-center justify-between text-xs font-semibold transition-colors ${
                        currentScreen === screen.id
                          ? 'bg-[#dbe1ff] text-[#004ac6]'
                          : 'text-[#131b2e] hover:bg-[#f2f3ff]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#004ac6]">
                          {screen.icon}
                        </span>
                        <span>{screen.label}</span>
                      </div>
                      <span className="text-[10px] text-[#737686] font-normal">{screen.group}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Admin Switcher Pill */}
          <button
            onClick={() => setCurrentScreen(isAdminScreen ? 'home' : 'admin-approval')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              isAdminScreen
                ? 'bg-[#004ac6] text-white'
                : 'bg-[#eaedff] hover:bg-[#dae2fd] text-[#004ac6]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {isAdminScreen ? 'arrow_back' : 'admin_panel_settings'}
            </span>
            <span>{isAdminScreen ? 'Exit Admin' : 'Admin Console'}</span>
          </button>

          {/* Wallet Balance Pill */}
          <button
            onClick={() => setCurrentScreen('earnings')}
            className="flex items-center gap-1.5 bg-[#e2e7ff] hover:bg-[#dae2fd] px-3.5 py-1.5 rounded-full transition-all text-xs font-semibold cursor-pointer shadow-sm group"
            title="Open Worker Wallet"
          >
            <span className="text-[#434655] uppercase tracking-wider font-semibold">Wallet</span>
            <span className="text-[#006c49] font-bold text-sm tracking-tight group-hover:scale-105 transition-transform">
              ${walletBalance.toFixed(2)}
            </span>
          </button>

          {/* Notification Button with Popup */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              aria-label="Notifications"
              className="p-2 rounded-lg text-[#434655] hover:bg-[#eaedff] hover:text-[#131b2e] transition-colors relative flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#dae2fd] p-3 z-50 text-left">
                <div className="flex items-center justify-between pb-2 border-b border-[#eaedff] text-xs font-bold text-[#131b2e]">
                  <span>Recent Notifications</span>
                  <span className="text-[10px] text-[#006c49] font-semibold">1 New</span>
                </div>
                <div className="space-y-2 pt-2 text-xs">
                  <div
                    onClick={() => {
                      setCurrentScreen('earnings');
                      setNotificationOpen(false);
                    }}
                    className="p-2 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-[#006c49] font-bold">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      <span>M-Pesa Payout Instant</span>
                    </div>
                    <p className="text-[#434655] text-[11px] mt-0.5">
                      $100.00 USD (13,150 KES) settled to +254 712 345 678.
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      setCurrentScreen('worker-disputes');
                      setNotificationOpen(false);
                    }}
                    className="p-2 rounded-lg hover:bg-[#f2f3ff] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-[#784b00] font-bold">
                      <span className="material-symbols-outlined text-[14px]">gavel</span>
                      <span>Case DSP-8492 Active</span>
                    </div>
                    <p className="text-[#434655] text-[11px] mt-0.5">
                      Lead Arbitrator Sarah Jenkins reviewing 91.4% IoU proof.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <button
            onClick={() => setCurrentScreen('earnings')}
            className="w-8 h-8 rounded-full bg-[#004ac6] hover:bg-[#2563eb] transition-colors flex items-center justify-center text-white shadow-sm"
            title="Elena Rostova (Worker Profile)"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  const { setCurrentScreen } = useApp();

  return (
    <footer className="w-full bg-[#f2f3ff] shadow-[0_-1px_4px_rgba(0,0,0,0.02)] mt-16 border-t border-[#eaedff]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img
                src={APP_LOGOS.main}
                alt="TaskFlow Logo"
                className="h-7 w-auto object-contain"
              />
              <span className="font-bold text-lg text-[#131b2e]">TaskFlow</span>
            </div>
            <p className="text-sm text-[#434655] leading-relaxed">
              The high-trust micro-task network. Instant escrow mechanics, verified worker unlocks, and guaranteed milestone payouts.
            </p>
          </div>

          {/* Marketplace Links */}
          <div>
            <h4 className="font-bold text-sm text-[#131b2e] mb-4 uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-2 text-sm text-[#434655]">
              <li onClick={() => setCurrentScreen('find-tasks')} className="hover:text-[#004ac6] cursor-pointer transition-colors">Available Bounties</li>
              <li onClick={() => setCurrentScreen('find-tasks')} className="hover:text-[#004ac6] cursor-pointer transition-colors">$0.80 Unlock Model</li>
              <li onClick={() => setCurrentScreen('task-workspace')} className="hover:text-[#004ac6] cursor-pointer transition-colors">Skill Verification</li>
              <li onClick={() => setCurrentScreen('home')} className="hover:text-[#004ac6] cursor-pointer transition-colors">Leaderboards</li>
            </ul>
          </div>

          {/* Enterprise Clients */}
          <div>
            <h4 className="font-bold text-sm text-[#131b2e] mb-4 uppercase tracking-wider">Enterprise Clients</h4>
            <ul className="space-y-2 text-sm text-[#434655]">
              <li onClick={() => setCurrentScreen('find-tasks')} className="hover:text-[#004ac6] cursor-pointer transition-colors">Post Micro-Task</li>
              <li onClick={() => setCurrentScreen('home')} className="hover:text-[#004ac6] cursor-pointer transition-colors">Escrow Protection</li>
              <li onClick={() => setCurrentScreen('admin-approval')} className="hover:text-[#004ac6] cursor-pointer transition-colors">Batch Processing</li>
              <li onClick={() => setCurrentScreen('home')} className="hover:text-[#004ac6] cursor-pointer transition-colors">API Integrations</li>
            </ul>
          </div>

          {/* Security & Legal */}
          <div>
            <h4 className="font-bold text-sm text-[#131b2e] mb-4 uppercase tracking-wider">Security &amp; Legal</h4>
            <ul className="space-y-2 text-sm text-[#434655]">
              <li onClick={() => setCurrentScreen('home')} className="hover:text-[#004ac6] cursor-pointer transition-colors">Escrow Compliance</li>
              <li onClick={() => setCurrentScreen('find-tasks')} className="hover:text-[#004ac6] cursor-pointer transition-colors">Fee Transparency</li>
              <li onClick={() => setCurrentScreen('home')} className="hover:text-[#004ac6] cursor-pointer transition-colors">Terms of Service</li>
              <li onClick={() => setCurrentScreen('home')} className="hover:text-[#004ac6] cursor-pointer transition-colors">Privacy Policy</li>
            </ul>
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="pt-6 border-t border-[#dae2fd] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737686]">
          <span>© 2025 TaskFlow Technologies Inc. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 hover:text-[#131b2e] cursor-pointer">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
              Status: Operational
            </span>
            <span className="flex items-center gap-1 hover:text-[#131b2e] cursor-pointer">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
              Instant Payouts Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
