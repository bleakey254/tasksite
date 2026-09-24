import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TaskItem } from '../types';

export const FindTasksScreen: React.FC = () => {
  const { tasks, setSelectedTask, setCurrentScreen, setUnlockModalTask } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'reward' | 'newest' | 'time'>('reward');

  const categories = [
    'All',
    'AI Data Labeling',
    'Micro Copy',
    'QA Testing',
    'Survey & Polls',
    'Audio Transcription',
    'Video Annotation'
  ];

  const filteredTasks = tasks.filter(task => {
    const clientName = task.clientName || task.client?.name || '';
    const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = filterDifficulty === 'all' || task.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
    return matchesCategory && matchesSearch && matchesDifficulty;
  }).sort((a, b) => {
    if (sortBy === 'reward') return b.reward - a.reward;
    if (sortBy === 'time') return parseInt(a.estimatedTime) - parseInt(b.estimatedTime);
    return 0;
  });

  const handleTaskAction = (task: TaskItem) => {
    if (task.isUnlocked) {
      setSelectedTask(task);
      setCurrentScreen('task-workspace');
    } else {
      setUnlockModalTask(task);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              142 Live Escrow-Backed Micro-Gigs
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
              Escrow-Secured Micro-Task Directory
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every task posted here has 100% of client payout funds locked in smart escrow contract custody prior to worker intake. Zero wage theft, guaranteed Section 21 milestone settlement upon validation.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-lg">verified_user</span>
                <span>$0.80 Anti-Spam Barrier Protocol</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-400 text-lg">lock_clock</span>
                <span>Instant Auto-Release (12h SLA)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-lg">gavel</span>
                <span>Third-Party Adjudication Court</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                search
              </span>
              <input
                type="text"
                placeholder="Search by keywords, machine learning models, clients, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Difficulty:</span>
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="all">All Levels</option>
                  <option value="easy">Easy / Beginner</option>
                  <option value="medium">Intermediate</option>
                  <option value="hard">Advanced</option>
                </select>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="reward">Highest Payout ($)</option>
                  <option value="time">Shortest Duration</option>
                  <option value="newest">Newest Available</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => {
            return (
              <div
                key={task.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  {/* Card Header: Category & Escrow Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                      {task.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="material-symbols-outlined text-sm text-emerald-600">lock</span>
                      <span>Escrow Locked</span>
                    </div>
                  </div>

                  {/* Title & Client */}
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-2">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-medium text-slate-700">{task.clientName || task.client?.name || 'Verified Client'}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                        ★ {task.clientRating || task.client?.rating || 4.9}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {task.description}
                  </p>

                  {/* Badges and Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="block text-[10px] text-slate-400 font-medium">EST. TIME</span>
                      <span className="text-xs font-bold text-slate-700">{task.estimatedTime}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="block text-[10px] text-slate-400 font-medium">DIFFICULTY</span>
                      <span className={`text-xs font-bold ${
                        task.difficulty === 'Beginner' || task.difficulty === 'Easy' ? 'text-emerald-600' :
                        task.difficulty === 'Intermediate' || task.difficulty === 'Medium' ? 'text-amber-600' : 'text-purple-600'
                      }`}>
                        {task.difficulty}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="block text-[10px] text-slate-400 font-medium">SPOTS LEFT</span>
                      <span className="text-xs font-bold text-slate-700">{task.slotsRemaining ?? ((task.capacity ?? 10) - (task.completedCount ?? 0))}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {task.tags.map((t) => (
                      <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Card */}
                <div className="p-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Milestone Payout</div>
                    <div className="text-xl font-extrabold text-slate-900 flex items-baseline gap-0.5">
                      <span className="text-sm font-semibold text-emerald-600">$</span>
                      {task.reward.toFixed(2)}
                    </div>
                  </div>

                  {task.isUnlocked ? (
                    <button
                      onClick={() => handleTaskAction(task)}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">play_arrow</span>
                      Enter Workspace
                    </button>
                  ) : (
                    <button
                      onClick={() => handleTaskAction(task)}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">key</span>
                      Unlock ($0.80)
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredTasks.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 space-y-4">
            <span className="material-symbols-outlined text-slate-300 text-5xl">folder_off</span>
            <h3 className="text-lg font-bold text-slate-800">No matching micro-tasks found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your category selection, difficulty filter, or search keywords.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setFilterDifficulty('all'); }}
              className="px-4 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-xl hover:bg-blue-100 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
