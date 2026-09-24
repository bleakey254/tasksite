import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HOTLINKED_IMAGES } from '../data/mockData';

export const HomeScreen: React.FC = () => {
  const { setCurrentScreen, setUnlockModalTask, tasks } = useApp();
  const [unlockedMockTasks, setUnlockedMockTasks] = useState<{ [key: string]: boolean }>({});
  const [mockToast, setMockToast] = useState<string | null>(null);

  const handleSimulateUnlock = (key: string, title: string) => {
    setUnlockedMockTasks((prev) => ({ ...prev, [key]: true }));
    setMockToast(`Workspace Unlocked: ${title} ($0.80 paid from balance). Full brief & datasets loaded!`);
    setTimeout(() => setMockToast(null), 5000);
  };

  const categories = [
    { title: 'Data Entry', tasks: '180+ tasks available', icon: 'database', highlight: false },
    { title: 'AI Data & Annotation', tasks: '420+ tasks available', icon: 'smart_toy', highlight: true },
    { title: 'Writing & Copywriting', tasks: '95+ tasks available', icon: 'edit_note', highlight: false },
    { title: 'Translation & Local.', tasks: '64+ tasks available', icon: 'translate', highlight: false },
    { title: 'Graphic Design', tasks: '110+ tasks available', icon: 'palette', highlight: false },
    { title: 'Web Development', tasks: '85+ tasks available', icon: 'terminal', highlight: false },
    { title: 'Software QA & Testing', tasks: '72+ tasks available', icon: 'bug_report', highlight: false },
    { title: 'Market Research', tasks: '54+ tasks available', icon: 'insights', highlight: false },
    { title: 'Virtual Assistance', tasks: '130+ tasks available', icon: 'support_agent', highlight: false },
    { title: 'Audio/Video Transcr.', tasks: '88+ tasks available', icon: 'graphic_eq', highlight: false },
  ];

  return (
    <div className="w-full">
      {/* Dynamic Ambient Glow Overlays */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-[#004ac6]/10 via-[#6cf8bb]/20 to-transparent blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute top-[45%] -right-40 w-[550px] h-[550px] bg-[#dae2fd]/60 blur-3xl pointer-events-none rounded-full"></div>

        {/* HERO SECTION */}
        <section className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text & CTAs Left Column */}
            <div className="lg:col-span-6 flex flex-col items-start space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#e2e7ff] px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
                <span className="text-xs text-[#131b2e] font-semibold tracking-wide uppercase">
                  Next-Gen Micro-Task Protocol
                </span>
                <span className="text-[#737686] text-xs">/</span>
                <span className="text-xs text-[#006c49] font-bold">142 Gigs Available Now</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-[#131b2e] tracking-tight leading-[1.1]">
                Complete Tasks.<br />
                <span className="text-[#2563eb]">Build Your Skills.</span><br />
                Get Paid.
              </h1>

              <p className="text-base sm:text-lg text-[#434655] max-w-xl leading-relaxed">
                Discover online tasks from clients around the world, unlock the work you qualify for, complete it, and receive payment securely through our escrow guarantee.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                <button
                  onClick={() => setCurrentScreen('find-tasks')}
                  className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#004ac6] text-white font-bold text-sm px-7 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>Find Tasks</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>

                <button
                  onClick={() => {
                    const sample = tasks[0];
                    if (sample) setUnlockModalTask(sample);
                  }}
                  className="w-full sm:w-auto bg-white hover:bg-[#f2f3ff] text-[#131b2e] font-bold text-sm px-7 py-3.5 rounded-lg border border-[#dae2fd] shadow-sm transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#004ac6]">add_circle</span>
                  <span>Post a Task</span>
                </button>
              </div>

              {/* Micro Proof Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-[#434655]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006c49] text-[20px]">verified</span>
                  <span className="text-xs font-semibold">Instant Escrow Release</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#996100] text-[20px]">lock_open</span>
                  <span className="text-xs font-semibold">$0.80 Anti-Spam Barrier</span>
                </div>
              </div>
            </div>

            {/* Interactive Live Dashboard Preview Mockup Right Column */}
            <div className="lg:col-span-6 relative mt-6 lg:mt-0">
              <div className="relative bg-white rounded-2xl p-5 md:p-6 shadow-2xl border border-[#dae2fd]">
                {/* Mock Header Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ba1a1a]/70"></span>
                    <span className="w-3 h-3 rounded-full bg-[#ffb95f]/70"></span>
                    <span className="w-3 h-3 rounded-full bg-[#4edea3]/70"></span>
                    <span className="ml-2 text-xs text-[#434655] uppercase tracking-wider font-bold">
                      Live Task Marketplace Engine
                    </span>
                  </div>
                  <span className="bg-[#006c49]/10 text-[#006c49] text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span> 99.8% Sync
                  </span>
                </div>

                {/* Task List Interactive Container */}
                <div className="space-y-4 pt-4">
                  {/* Card 1: AI Data Annotation Task */}
                  <div className="group bg-[#f2f3ff] hover:bg-[#e2e7ff] transition-all p-4 rounded-xl shadow-sm border border-[#dbe1ff]">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#004ac6]/10 text-[#004ac6] text-xs px-2 py-0.5 rounded-md font-semibold">
                          AI &amp; Machine Learning
                        </span>
                        <span className="bg-[#006c49]/15 text-[#006c49] text-xs px-2 py-0.5 rounded-md font-semibold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px]">star</span> 4.9
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-[#131b2e] leading-none">$5.00</span>
                        <span className="block text-[11px] text-[#737686]">Escrow Guaranteed</span>
                      </div>
                    </div>

                    <h2
                      onClick={() => setCurrentScreen('task-workspace')}
                      className="text-base font-bold text-[#131b2e] group-hover:text-[#004ac6] transition-colors cursor-pointer"
                    >
                      AI Data Annotation: Bounding Box Vehicle Tags
                    </h2>
                    <p className="text-xs text-[#434655] line-clamp-2 mt-1">
                      Label 40 street photography scenes with multi-class vehicle segmentation polygons according to standard taxonomy.
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-[#dae2fd] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-4 text-[#434655]">
                        <div className="flex items-center gap-1 text-xs">
                          <span className="material-symbols-outlined text-[16px]">group</span>
                          <span>42 Slots Left</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#006c49] font-bold">
                          <span className="material-symbols-outlined text-[16px]">verified_user</span>
                          <span>73 Unlocked</span>
                        </div>
                      </div>

                      {unlockedMockTasks['ai-data'] ? (
                        <button
                          onClick={() => setCurrentScreen('task-workspace')}
                          className="bg-[#006c49] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[15px]">check_circle</span>
                          <span>Workspace Open</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSimulateUnlock('ai-data', 'AI Data Annotation')}
                          className="bg-[#ffddb8] text-[#2a1700] hover:bg-[#ffb95f] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[15px]">lock</span>
                          <span>Unlock Task ($0.80)</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Card 2: E-commerce Product Tagging */}
                  <div className="group bg-[#f2f3ff] hover:bg-[#e2e7ff] transition-all p-4 rounded-xl shadow-sm border border-[#dbe1ff]">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#dae2fd] text-[#434655] text-xs px-2 py-0.5 rounded-md font-semibold">
                          Catalog Taxonomy
                        </span>
                        <span className="bg-[#006c49]/15 text-[#006c49] text-xs px-2 py-0.5 rounded-md font-semibold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px]">star</span> 4.8
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-[#131b2e] leading-none">$3.80</span>
                        <span className="block text-[11px] text-[#737686]">Escrow Funded</span>
                      </div>
                    </div>

                    <h2
                      onClick={() => setCurrentScreen('find-tasks')}
                      className="text-base font-bold text-[#131b2e] group-hover:text-[#004ac6] transition-colors cursor-pointer"
                    >
                      E-commerce Product Tagging &amp; Attribute Validation
                    </h2>
                    <p className="text-xs text-[#434655] line-clamp-2 mt-1">
                      Verify 25 retail apparel specs including fabric blends, SKU variations, and standard sleeve lengths.
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-[#dae2fd] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-4 text-[#434655]">
                        <div className="flex items-center gap-1 text-xs">
                          <span className="material-symbols-outlined text-[16px]">group</span>
                          <span>18 Slots Left</span>
                        </div>
                        <span className="bg-[#006c49]/10 text-[#006c49] text-xs px-2 py-0.5 rounded font-semibold">
                          Verified Client
                        </span>
                      </div>

                      {unlockedMockTasks['product-tagging'] ? (
                        <button
                          onClick={() => setCurrentScreen('task-workspace')}
                          className="bg-[#006c49] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[15px]">check_circle</span>
                          <span>Workspace Open</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSimulateUnlock('product-tagging', 'Product Tagging')}
                          className="bg-[#ffddb8] text-[#2a1700] hover:bg-[#ffb95f] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[15px]">lock</span>
                          <span>Unlock Task ($0.80)</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Floating Active Real-time Toast */}
                {mockToast && (
                  <div className="mt-4 p-3 bg-[#6ffbbe] text-[#002113] rounded-lg text-xs font-bold flex items-center justify-between shadow-md transition-all">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">lock_open</span>
                      <span>{mockToast}</span>
                    </div>
                    <span
                      onClick={() => setMockToast(null)}
                      className="material-symbols-outlined cursor-pointer text-[16px]"
                    >
                      close
                    </span>
                  </div>
                )}
              </div>

              {/* Accent Image Card Behind Dashboard */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 w-48 h-32 rounded-xl overflow-hidden shadow-lg border-2 border-white -z-10">
                <img
                  src={HOTLINKED_IMAGES.techWorkspace}
                  alt="High tech analytical workspace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* STATS METRIC STRIP */}
      <section className="w-full bg-[#f2f3ff] py-10 border-y border-[#eaedff]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#eaedff]">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#004ac6] mb-1">
                <span className="material-symbols-outlined text-[26px]">task_alt</span>
                <span className="text-2xl font-extrabold text-[#131b2e]">25,000+</span>
              </div>
              <p className="text-sm font-bold text-[#131b2e]">Tasks Completed</p>
              <p className="text-xs text-[#737686] mt-0.5">100% Milestone validated</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#eaedff]">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#006c49] mb-1">
                <span className="material-symbols-outlined text-[26px]">engineering</span>
                <span className="text-2xl font-extrabold text-[#131b2e]">8,500+</span>
              </div>
              <p className="text-sm font-bold text-[#131b2e]">Active Workers</p>
              <p className="text-xs text-[#737686] mt-0.5">Across 85+ countries</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#eaedff]">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#784b00] mb-1">
                <span className="material-symbols-outlined text-[26px]">domain_verification</span>
                <span className="text-2xl font-extrabold text-[#131b2e]">3,200+</span>
              </div>
              <p className="text-sm font-bold text-[#131b2e]">Verified Clients</p>
              <p className="text-xs text-[#737686] mt-0.5">Funded escrow accounts</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#eaedff]">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#2563eb] mb-1">
                <span className="material-symbols-outlined text-[26px]">payments</span>
                <span className="text-2xl font-extrabold text-[#131b2e]">$1.2M+</span>
              </div>
              <p className="text-sm font-bold text-[#131b2e]">Paid to Workers</p>
              <p className="text-xs text-[#737686] mt-0.5">Zero payout processing delays</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (4 STEPS) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#004ac6] mb-1">
              <span className="material-symbols-outlined text-[18px]">alt_route</span>
              <span className="text-xs uppercase tracking-wider font-bold">Transparent Lifecycle</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#131b2e]">How TaskFlow Works</h2>
          </div>
          <p className="text-sm text-[#434655] max-w-md">
            Designed to protect both talent and employers through micro-commitment mechanisms and frictionless instant settlement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden border border-[#eaedff] group">
            <div className="absolute -right-3 -bottom-3 text-[6rem] font-black text-[#f2f3ff] select-none pointer-events-none group-hover:text-[#dbe1ff]/60 transition-colors">
              01
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] mb-4">
                <span className="material-symbols-outlined text-[24px]">person_add</span>
              </div>
              <span className="text-xs text-[#004ac6] font-bold uppercase tracking-wider">Step One</span>
              <h3 className="text-lg font-bold text-[#131b2e] mt-1 mb-2">Create an Account</h3>
              <p className="text-xs text-[#434655] leading-relaxed">
                Sign up free as a verified worker or client in minutes. Complete our one-time identity verification to unlock tier permissions.
              </p>
            </div>
            <div className="pt-6 relative z-10">
              <span className="inline-flex items-center text-[#004ac6] text-xs font-bold gap-1 cursor-pointer hover:underline">
                Free onboarding <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden border border-[#eaedff] group">
            <div className="absolute -right-3 -bottom-3 text-[6rem] font-black text-[#f2f3ff] select-none pointer-events-none group-hover:text-[#dbe1ff]/60 transition-colors">
              02
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#e2e7ff] flex items-center justify-center text-[#131b2e] mb-4">
                <span className="material-symbols-outlined text-[24px]">travel_explore</span>
              </div>
              <span className="text-xs text-[#434655] font-bold uppercase tracking-wider">Step Two</span>
              <h3 className="text-lg font-bold text-[#131b2e] mt-1 mb-2">Find a Task</h3>
              <p className="text-xs text-[#434655] leading-relaxed">
                Browse high-demand gigs with transparent rewards and client ratings. Filter by duration, payout density, or skill sets.
              </p>
            </div>
            <div className="pt-6 relative z-10">
              <span
                onClick={() => setCurrentScreen('find-tasks')}
                className="inline-flex items-center text-[#131b2e] text-xs font-bold gap-1 cursor-pointer hover:underline"
              >
                Instant filtering <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </span>
            </div>
          </div>

          {/* Step 3 (Highlighted) */}
          <div className="bg-[#eaedff] p-6 rounded-2xl shadow-md transition-all flex flex-col justify-between relative overflow-hidden border border-[#dbe1ff] group">
            <div className="absolute -right-3 -bottom-3 text-[6rem] font-black text-[#dbe1ff] select-none pointer-events-none group-hover:text-[#ffddb8]/60 transition-colors">
              03
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#ffddb8] flex items-center justify-center text-[#784b00] mb-4">
                <span className="material-symbols-outlined text-[24px]">key</span>
              </div>
              <span className="text-xs text-[#784b00] font-bold uppercase tracking-wider">Commitment Mechanism</span>
              <h3 className="text-lg font-bold text-[#131b2e] mt-1 mb-2">Pay $0.80 to Unlock</h3>
              <p className="text-xs text-[#434655] leading-relaxed">
                A nominal $0.80 access fee guarantees high worker commitment, unlocks full proprietary client guidelines, confidential datasets, and submission workspace.
              </p>
            </div>
            <div className="pt-6 relative z-10">
              <span className="inline-flex items-center text-[#784b00] text-xs font-bold gap-1">
                Prevents spam bots <span className="material-symbols-outlined text-[16px]">shield</span>
              </span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden border border-[#eaedff] group">
            <div className="absolute -right-3 -bottom-3 text-[6rem] font-black text-[#f2f3ff] select-none pointer-events-none group-hover:text-[#6ffbbe]/40 transition-colors">
              04
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#6ffbbe]/50 flex items-center justify-center text-[#006c49] mb-4">
                <span className="material-symbols-outlined text-[24px]">savings</span>
              </div>
              <span className="text-xs text-[#006c49] font-bold uppercase tracking-wider">Step Four</span>
              <h3 className="text-lg font-bold text-[#131b2e] mt-1 mb-2">Complete &amp; Submit</h3>
              <p className="text-xs text-[#434655] leading-relaxed">
                Finish the task, upload deliverables into the verification sandbox, and receive immediate automated payouts upon client sign-off.
              </p>
            </div>
            <div className="pt-6 relative z-10">
              <span
                onClick={() => setCurrentScreen('earnings')}
                className="inline-flex items-center text-[#006c49] text-xs font-bold gap-1 cursor-pointer hover:underline"
              >
                Instant withdrawal <span className="material-symbols-outlined text-[16px]">bolt</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TASK CATEGORIES */}
      <section className="w-full bg-[#f2f3ff] py-16 border-y border-[#eaedff]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs text-[#004ac6] uppercase font-bold tracking-widest">Global Taxonomy</span>
              <h2 className="text-3xl font-extrabold text-[#131b2e] mt-1">Featured Task Categories</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#434655]">Showing active open tasks</span>
              <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentScreen('find-tasks')}
                className="group bg-white hover:bg-[#004ac6] text-left p-4 rounded-xl shadow-sm transition-all duration-200 flex flex-col justify-between border border-[#eaedff] relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-lg bg-[#e2e7ff] group-hover:bg-white/20 flex items-center justify-center text-[#004ac6] group-hover:text-white transition-colors mb-4">
                  <span className="material-symbols-outlined text-[22px]">{cat.icon}</span>
                </div>
                <div>
                  {cat.highlight && (
                    <div className="inline-block bg-[#ffddb8] text-[#2a1700] group-hover:bg-white group-hover:text-[#004ac6] text-[10px] px-1.5 py-0.5 rounded uppercase font-bold mb-1">
                      High Demand
                    </div>
                  )}
                  <h3 className="font-bold text-sm text-[#131b2e] group-hover:text-white transition-colors mb-1">
                    {cat.title}
                  </h3>
                  <span className="text-xs text-[#737686] group-hover:text-white/80 transition-colors">
                    {cat.tasks}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & SECURITY SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Media visual column */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] relative border border-[#eaedff]">
              <img
                src={HOTLINKED_IMAGES.nomadCollateral}
                alt="Digital nomad verifying task completions"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#283044]/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white p-4 bg-[#283044]/80 backdrop-blur-md rounded-xl border border-white/10">
                <div className="flex items-center gap-1.5 text-[#6ffbbe] mb-1">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span className="text-xs font-bold">100% Escrow Collateralized</span>
                </div>
                <p className="text-xs text-[#eef0ff]/90">
                  Client funds are pre-locked in smart escrow prior to task distribution.
                </p>
              </div>
            </div>
          </div>

          {/* Security Matrix List */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs text-[#006c49] font-bold uppercase tracking-wider">Enterprise Reliability</span>
              <h2 className="text-3xl font-extrabold text-[#131b2e] mt-1">
                Built on Rigorous Trust &amp; Financial Security
              </h2>
              <p className="text-sm text-[#434655] mt-2">
                We eliminate speculative labor risk. Every gig is pre-funded, milestones are strictly monitored, and verified IDs prevent bad actors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#eaedff] rounded-xl border border-[#dbe1ff]">
                <div className="w-9 h-9 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] mb-2">
                  <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                </div>
                <h3 className="font-bold text-sm text-[#131b2e]">Secure Escrow &amp; Payouts</h3>
                <p className="text-xs text-[#434655] mt-1">
                  Instant payouts via M-Pesa, PayPal, or Direct Bank Wire as soon as task submissions pass automated validation.
                </p>
              </div>

              <div className="p-4 bg-[#eaedff] rounded-xl border border-[#dbe1ff]">
                <div className="w-9 h-9 rounded-lg bg-[#6ffbbe]/50 flex items-center justify-center text-[#006c49] mb-2">
                  <span className="material-symbols-outlined text-[20px]">policy</span>
                </div>
                <h3 className="font-bold text-sm text-[#131b2e]">Multi-Layer Task Audit</h3>
                <p className="text-xs text-[#434655] mt-1">
                  Round-the-clock admin moderation and automated plagiarism checks protect both client briefs and worker deliverables.
                </p>
              </div>

              <div className="p-4 bg-[#eaedff] rounded-xl border border-[#dbe1ff]">
                <div className="w-9 h-9 rounded-lg bg-[#ffddb8] flex items-center justify-center text-[#784b00] mb-2">
                  <span className="material-symbols-outlined text-[20px]">gavel</span>
                </div>
                <h3 className="font-bold text-sm text-[#131b2e]">Fair Dispute Resolution</h3>
                <p className="text-xs text-[#434655] mt-1">
                  Worker Protection Guarantee ensures fair arbitrated reviews if a client arbitrarily rejects work that fits prompt criteria.
                </p>
              </div>

              <div className="p-4 bg-[#eaedff] rounded-xl border border-[#dbe1ff]">
                <div className="w-9 h-9 rounded-lg bg-[#dae2fd] flex items-center justify-center text-[#131b2e] mb-2">
                  <span className="material-symbols-outlined text-[20px]">badge</span>
                </div>
                <h3 className="font-bold text-sm text-[#131b2e]">Verified Badges</h3>
                <p className="text-xs text-[#434655] mt-1">
                  Tier-ranked profiles highlight dependable talent and verified corporate employers with spotless payment history.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER AT BOTTOM */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-16 w-full">
        <div className="bg-gradient-to-r from-[#004ac6] to-[#2563eb] text-white rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Decorative SVG circuit */}
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <svg fill="currentColor" height="340" viewBox="0 0 200 200" width="340">
              <circle cx="100" cy="100" fill="none" r="80" stroke="currentColor" strokeWidth="4"></circle>
              <circle cx="100" cy="100" fill="none" r="40" stroke="currentColor" strokeWidth="4"></circle>
              <path d="M100 0 L100 200 M0 100 L200 100" stroke="currentColor" strokeWidth="2"></path>
            </svg>
          </div>

          <div className="space-y-2 max-w-xl z-10 text-center md:text-left">
            <span className="bg-white/15 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold inline-block mb-1">
              Join the Fast-Growing Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to start earning or hiring top talent today?
            </h2>
            <p className="text-sm text-white/80">
              Join 8,500+ workers and enterprises unlocking frictionless micro-task settlements worldwide.
            </p>
          </div>

          <div className="z-10 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setCurrentScreen('find-tasks')}
              className="w-full sm:w-auto bg-white text-[#004ac6] hover:bg-[#f2f3ff] text-sm font-bold px-7 py-3.5 rounded-xl shadow-lg transition-all active:scale-95 text-center"
            >
              Get Started Free
            </button>
            <button
              onClick={() => setCurrentScreen('find-tasks')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-6 py-3.5 rounded-xl transition-all text-center border border-white/20"
            >
              Browse Marketplace
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
