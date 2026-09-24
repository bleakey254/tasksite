import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { HOTLINKED_IMAGES } from '../data/mockData';

interface BoundingBox {
  id: string;
  label: 'Pedestrian' | 'Cyclist' | 'Vehicle' | 'Traffic Sign';
  confidence: number;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  occluded: boolean;
}

export const TaskWorkspaceScreen: React.FC = () => {
  const {
    selectedTask,
    setCurrentScreen,
    setSubmitConfirmModalOpen,
    setFileDisputeModalOpen,
    showToast
  } = useApp();

  // Active tool state
  const [activeTool, setActiveTool] = useState<'select' | 'box' | 'polygon' | 'pan'>('box');
  const [selectedLabel, setSelectedLabel] = useState<'Pedestrian' | 'Cyclist' | 'Vehicle' | 'Traffic Sign'>('Pedestrian');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showCrosshairs, setShowCrosshairs] = useState<boolean>(true);
  const [activeFrame, setActiveFrame] = useState<number>(14);
  const totalFrames = 50;

  // Countdown timer in seconds (44m 18s)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(2658);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Pre-configured and interactive bounding boxes
  const [boxes, setBoxes] = useState<BoundingBox[]>([
    {
      id: 'box-01',
      label: 'Pedestrian',
      confidence: 99.4,
      color: '#10b981', // emerald
      x: 32,
      y: 42,
      width: 14,
      height: 38,
      occluded: false,
    },
    {
      id: 'box-02',
      label: 'Pedestrian',
      confidence: 97.8,
      color: '#3b82f6', // blue
      x: 58,
      y: 38,
      width: 16,
      height: 44,
      occluded: true,
    },
    {
      id: 'box-03',
      label: 'Cyclist',
      confidence: 96.2,
      color: '#f59e0b', // amber
      x: 78,
      y: 46,
      width: 15,
      height: 32,
      occluded: false,
    },
  ]);

  const [selectedBoxId, setSelectedBoxId] = useState<string>('box-01');

  // QA checklist checkboxes
  const [qaChecks, setQaChecks] = useState({
    occlusion: true,
    groundPlane: true,
    headBoundary: true,
    noClipping: false,
  });

  const toggleQaCheck = (key: keyof typeof qaChecks) => {
    setQaChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const currentTask = selectedTask || {
    id: 'TSK-9402',
    title: 'LiDAR & Video Sensor Semantic Bounding - Autonomous Pedestrian Protocol v4.2',
    clientName: 'Wayve Mobility AI',
    clientRating: 4.98,
    reward: 38.50,
    estimatedTime: '45 mins',
    category: 'AI Data Labeling',
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool !== 'box') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const newId = `box-0${boxes.length + 1}`;
    const newBox: BoundingBox = {
      id: newId,
      label: selectedLabel,
      confidence: 99.1,
      color: selectedLabel === 'Pedestrian' ? '#10b981' : selectedLabel === 'Cyclist' ? '#f59e0b' : '#3b82f6',
      x: Math.max(0, Math.min(85, clickX - 6)),
      y: Math.max(0, Math.min(75, clickY - 15)),
      width: 12,
      height: 30,
      occluded: false,
    };

    setBoxes([...boxes, newBox]);
    setSelectedBoxId(newId);
    showToast(`Added annotation ${newBox.id} (${selectedLabel})`, 'info');
  };

  const removeBox = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBoxes(boxes.filter(b => b.id !== id));
    if (selectedBoxId === id) setSelectedBoxId(boxes[0]?.id || '');
    showToast(`Removed annotation ${id}`, 'info');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Workspace Header Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 py-3 sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentScreen('find-tasks')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer flex items-center gap-1 text-xs"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span className="hidden sm:inline">Tasks</span>
          </button>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-white line-clamp-1 max-w-md">
                {currentTask.title}
              </h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-medium">
                TASK-{currentTask.id}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span>Client: <strong className="text-slate-300 font-semibold">{currentTask.clientName}</strong></span>
              <span>•</span>
              <span className="text-amber-400 font-medium">★ {currentTask.clientRating}</span>
              <span>•</span>
              <span>Frame {activeFrame} / {totalFrames}</span>
            </div>
          </div>
        </div>

        {/* Status Indicators & Escrow Badge */}
        <div className="flex items-center gap-3">
          {/* Live Countdown Timer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="material-symbols-outlined text-amber-400 text-sm animate-pulse">timer</span>
            <span className="text-slate-400 font-mono text-[11px]">SLA Time:</span>
            <span className="font-mono font-bold text-amber-400">{formatTime(secondsRemaining)}</span>
          </div>

          {/* Locked Escrow Amount */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs">
            <span className="material-symbols-outlined text-emerald-400 text-sm">lock</span>
            <span className="text-emerald-300">Escrow Locked:</span>
            <span className="font-bold text-emerald-400 font-mono text-sm">${currentTask.reward.toFixed(2)}</span>
          </div>

          {/* Dispute escalation */}
          <button
            onClick={() => setFileDisputeModalOpen(true)}
            title="Escalate issue to Section 21 Adjudication"
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-500/40 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">flag</span>
            <span className="hidden md:inline">Dispute</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-full lg:w-16 bg-slate-950/80 border-b lg:border-b-0 lg:border-r border-slate-800 p-2 flex lg:flex-col items-center justify-between lg:justify-start gap-2">
          <div className="flex lg:flex-col gap-1.5 w-full">
            <button
              onClick={() => setActiveTool('select')}
              title="Select Tool (V)"
              className={`p-2.5 rounded-xl flex items-center justify-center transition cursor-pointer w-full ${
                activeTool === 'select' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-xl">near_me</span>
            </button>
            <button
              onClick={() => setActiveTool('box')}
              title="Bounding Box (B)"
              className={`p-2.5 rounded-xl flex items-center justify-center transition cursor-pointer w-full ${
                activeTool === 'box' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-xl">crop_square</span>
            </button>
            <button
              onClick={() => setActiveTool('polygon')}
              title="Polygon Lasso (P)"
              className={`p-2.5 rounded-xl flex items-center justify-center transition cursor-pointer w-full ${
                activeTool === 'polygon' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-xl">polyline</span>
            </button>
            <button
              onClick={() => setActiveTool('pan')}
              title="Pan Tool (H)"
              className={`p-2.5 rounded-xl flex items-center justify-center transition cursor-pointer w-full ${
                activeTool === 'pan' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-xl">pan_tool</span>
            </button>
          </div>

          <div className="hidden lg:block w-8 h-px bg-slate-800 my-2" />

          {/* Zoom controls */}
          <div className="flex lg:flex-col gap-1">
            <button
              onClick={() => setZoomLevel(prev => Math.min(200, prev + 10))}
              title="Zoom In"
              className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">zoom_in</span>
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
              title="Zoom Out"
              className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">zoom_out</span>
            </button>
            <button
              onClick={() => setShowCrosshairs(!showCrosshairs)}
              title="Toggle Crosshairs"
              className={`p-2 rounded-lg transition cursor-pointer ${showCrosshairs ? 'text-blue-400' : 'text-slate-500 hover:bg-slate-800'}`}
            >
              <span className="material-symbols-outlined text-lg">filter_center_focus</span>
            </button>
          </div>
        </div>

        {/* Center: Canvas Area */}
        <div className="flex-1 bg-slate-900/60 p-4 flex flex-col justify-between overflow-auto relative">
          {/* Floating Action Ribbon (Label picker & Instructions) */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 z-10">
            <div className="flex items-center gap-2 bg-slate-950/90 border border-slate-800 p-1.5 rounded-xl">
              <span className="text-[11px] font-semibold text-slate-400 px-2 uppercase tracking-wide">Classify:</span>
              {(['Pedestrian', 'Cyclist', 'Vehicle', 'Traffic Sign'] as const).map((label) => (
                <button
                  key={label}
                  onClick={() => setSelectedLabel(label)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    selectedLabel === label
                      ? label === 'Pedestrian' ? 'bg-emerald-600 text-white' :
                        label === 'Cyclist' ? 'bg-amber-600 text-white' : 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="bg-slate-800/80 px-2.5 py-1 rounded-lg font-mono text-[11px]">
                Click canvas to place bounding box
              </span>
              <span className="bg-slate-800/80 px-2.5 py-1 rounded-lg font-mono text-[11px]">
                Zoom: {zoomLevel}%
              </span>
            </div>
          </div>

          {/* Interactive Image Viewport */}
          <div className="flex-1 min-h-[440px] flex items-center justify-center p-2">
            <div
              onClick={handleCanvasClick}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-black cursor-crosshair group select-none transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
            >
              {/* Hotlinked Autonomous Sensor Frame */}
              <img
                src={HOTLINKED_IMAGES.sensor_frame}
                alt="LiDAR Autonomous Sensor Stream Frame"
                className="w-full h-auto object-cover pointer-events-none filter brightness-95 contrast-105"
                onError={(e) => {
                  // Fallback to high-contrast visual if remote fails
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />

              {/* Crosshair Overlay lines when hovering */}
              {showCrosshairs && (
                <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                  <div className="w-full h-full border border-dashed border-emerald-400/40 grid grid-cols-4 grid-rows-4" />
                </div>
              )}

              {/* Bounding Boxes Layer */}
              {boxes.map((box) => {
                const isSelected = selectedBoxId === box.id;
                return (
                  <div
                    key={box.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBoxId(box.id);
                    }}
                    style={{
                      left: `${box.x}%`,
                      top: `${box.y}%`,
                      width: `${box.width}%`,
                      height: `${box.height}%`,
                      borderColor: box.color,
                    }}
                    className={`absolute border-2 rounded-sm transition-all duration-150 ${
                      isSelected
                        ? 'ring-2 ring-white/80 shadow-lg bg-emerald-500/15'
                        : 'hover:border-white/90 bg-black/10'
                    }`}
                  >
                    {/* Corner Handles */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-slate-900" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-slate-900" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-slate-900" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-slate-900" />

                    {/* Box Header Label */}
                    <div
                      style={{ backgroundColor: box.color }}
                      className="absolute -top-5 left-0 px-1.5 py-0.5 text-[10px] font-bold text-white rounded-t flex items-center gap-1 shadow-md whitespace-nowrap"
                    >
                      <span>{box.label}</span>
                      <span className="text-[9px] opacity-80">{(box.confidence).toFixed(1)}%</span>
                      <button
                        onClick={(e) => removeBox(box.id, e)}
                        className="ml-1 hover:text-red-200 transition"
                        title="Delete box"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Frame Sequence Control */}
          <div className="mt-3 flex items-center justify-between gap-4 bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 text-xs">
            <div className="flex items-center gap-2">
              <button
                disabled={activeFrame <= 1}
                onClick={() => setActiveFrame(prev => Math.max(1, prev - 1))}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">skip_previous</span>
                Prev Frame
              </button>
              <button
                disabled={activeFrame >= totalFrames}
                onClick={() => setActiveFrame(prev => Math.min(totalFrames, prev + 1))}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1"
              >
                Next Frame
                <span className="material-symbols-outlined text-sm">skip_next</span>
              </button>
              <span className="text-slate-400 font-mono text-[11px] ml-2">
                Frame {activeFrame} / {totalFrames}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1 flex-1 max-w-md mx-4">
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(activeFrame / totalFrames) * 100}%` }}
                />
              </div>
            </div>

            <span className="text-slate-400 text-[11px]">Autonomous Sensor Stream • 60 FPS HD</span>
          </div>
        </div>

        {/* Right Sidebar: Inspection, Annotations & Section 21 QA */}
        <div className="w-full lg:w-80 bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between p-5 space-y-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Section 21 Protocol Compliance Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>Section 21 Verification</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  Standard 4.2
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Autonomous driving safety mandates minimum 98% bounding polygon tightness and occlusion flags on crossing walkers.
              </p>

              {/* Checklist */}
              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2.5 text-xs cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={qaChecks.occlusion}
                    onChange={() => toggleQaCheck('occlusion')}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-0"
                  />
                  <span className={qaChecks.occlusion ? 'text-slate-200' : 'text-slate-400'}>
                    Flag partial obstruction &gt;30%
                  </span>
                </label>
                <label className="flex items-center gap-2.5 text-xs cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={qaChecks.groundPlane}
                    onChange={() => toggleQaCheck('groundPlane')}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-0"
                  />
                  <span className={qaChecks.groundPlane ? 'text-slate-200' : 'text-slate-400'}>
                    Foot polygon touches tarmac plane
                  </span>
                </label>
                <label className="flex items-center gap-2.5 text-xs cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={qaChecks.headBoundary}
                    onChange={() => toggleQaCheck('headBoundary')}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-0"
                  />
                  <span className={qaChecks.headBoundary ? 'text-slate-200' : 'text-slate-400'}>
                    No helmet or umbrella cutoff
                  </span>
                </label>
                <label className="flex items-center gap-2.5 text-xs cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={qaChecks.noClipping}
                    onChange={() => toggleQaCheck('noClipping')}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-0"
                  />
                  <span className={qaChecks.noClipping ? 'text-slate-200' : 'text-slate-400'}>
                    Adjacent vehicle bumper clear
                  </span>
                </label>
              </div>
            </div>

            {/* Active Annotations in this frame */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 uppercase tracking-wide text-[11px]">
                  Frame Annotations ({boxes.length})
                </span>
                <button
                  onClick={() => setBoxes([])}
                  className="text-slate-500 hover:text-red-400 text-[10px] transition cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-2">
                {boxes.map((box) => (
                  <div
                    key={box.id}
                    onClick={() => setSelectedBoxId(box.id)}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between transition cursor-pointer ${
                      selectedBoxId === box.id
                        ? 'bg-blue-950/40 border-blue-500/60 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: box.color }}
                      />
                      <div>
                        <div className="font-semibold text-slate-200">{box.label}</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          X:{Math.round(box.x)} Y:{Math.round(box.y)} • W:{Math.round(box.width)} H:{Math.round(box.height)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                        {box.confidence}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submission and Payout triggers */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Escrow Guarantee</span>
                <span className="text-sm font-bold text-emerald-400">${currentTask.reward.toFixed(2)} USD</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Auto-Release</span>
                <span className="text-xs font-mono text-slate-300">12h SLA</span>
              </div>
            </div>

            <button
              onClick={() => setSubmitConfirmModalOpen(true)}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">task_alt</span>
              Submit for Milestone Payout (${currentTask.reward.toFixed(2)})
            </button>

            <button
              onClick={() => {
                showToast('Progress saved locally. You can resume anytime before SLA expires.', 'info');
                setCurrentScreen('find-tasks');
              }}
              className="w-full py-2.5 text-slate-400 hover:text-white text-xs font-semibold text-center transition cursor-pointer"
            >
              Save & Exit to Task Directory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
