import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RobotToolAttachment } from '../../types';
import {
  Route,
  Play,
  RotateCcw,
  Sparkles,
  MapPin,
  Clock,
  Zap,
  Sliders,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MissionPlanner: React.FC = () => {
  const { missionPlan, sendRobotCommand, setActiveTab } = useApp();

  const [tool, setTool] = useState<RobotToolAttachment>('sprayer');
  const [rowSpacing, setRowSpacing] = useState(0.9);
  const [speed, setSpeed] = useState(3.5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSimulatingPath, setIsSimulatingPath] = useState(false);
  const [currentWaypoint, setCurrentWaypoint] = useState(4);

  const waypoints = [
    { id: 1, lat: 17.9785, lng: 79.5945, action: 'Turn & Deploy Nozzle' },
    { id: 2, lat: 17.9810, lng: 79.5948, action: 'Row 1 Straight Pass (250m)' },
    { id: 3, lat: 17.9811, lng: 79.5956, action: 'Headland 180° Turn' },
    { id: 4, lat: 17.9786, lng: 79.5954, action: 'Row 2 Return Pass (250m)' },
    { id: 5, lat: 17.9787, lng: 79.5962, action: 'Headland 180° Turn' },
    { id: 6, lat: 17.9812, lng: 79.5965, action: 'Row 3 Straight Pass' }
  ];

  const handleGeneratePath = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsSimulatingPath(true);
      confetti({ particleCount: 60, spread: 70 });
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <Route className="w-3.5 h-3.5" />
                Boustrophedon Serpentine Coverage Optimization
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              Autonomous Robot Mission & Swath Planner
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Geofenced boundary pathing with headland turn calculation, obstacle exclusion zones, and optimal battery discharge curve optimization.
            </p>
          </div>

          <button
            onClick={() => {
              sendRobotCommand('start');
              setActiveTab('robot_cockpit');
            }}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Upload Mission to ROV-BOT</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mission Configuration (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            Mission Parameters
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Target Attachment Tool</label>
              <select
                value={tool}
                onChange={(e) => setTool(e.target.value as any)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="sprayer">Precision Bio-Sprayer Boom (1.8m)</option>
                <option value="weeder">Sub-mm Optical Laser Weeder</option>
                <option value="seeder">Pneumatic Precision Seeder</option>
                <option value="plough">Zero-Till Shallow Mulch Plough</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 font-semibold mb-1">
                <span>Crop Row Spacing</span>
                <span className="text-emerald-400 font-mono font-bold">{rowSpacing} meters</span>
              </div>
              <input
                type="range"
                min="0.4"
                max="1.8"
                step="0.1"
                value={rowSpacing}
                onChange={(e) => setRowSpacing(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 font-semibold mb-1">
                <span>Autonomous Cruising Speed</span>
                <span className="text-cyan-400 font-mono font-bold">{speed} km/h</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="6.0"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Estimated Metrics Box */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2.5">
              <span className="font-bold text-slate-300 block">AI Mission Forecast</span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-[10px] text-slate-400 block">Duration</span>
                  <span className="font-black text-white font-display text-sm">45 mins</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-[10px] text-slate-400 block">Battery Est</span>
                  <span className="font-black text-amber-400 font-display text-sm">-28%</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-[10px] text-slate-400 block">Waypoints</span>
                  <span className="font-black text-cyan-400 font-display text-sm">36 nodes</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleGeneratePath}
              disabled={isGenerating}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all mt-3"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Calculating Swath Lines...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Optimized Zig-Zag Swath</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Map & Path Visualization (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Field Polygon & Autonomous Path (4.8 Acres)
              </span>
              <span className="text-xs font-mono text-emerald-400">RTK Swath Spacing: {rowSpacing}m</span>
            </div>

            {/* Simulated Map Viewport with Zig-zag Path */}
            <div className="relative w-full h-80 rounded-2xl bg-slate-950 border border-emerald-500/30 overflow-hidden">
              <svg className="w-full h-full">
                {/* Field boundary */}
                <polygon
                  points="40,30 420,45 400,280 60,260"
                  fill="rgba(22, 163, 74, 0.15)"
                  stroke="#16a34a"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Serpentine Zig-Zag Path Lines */}
                <polyline
                  points="
                    70,50 390,60 
                    390,95 70,85 
                    70,130 390,140 
                    390,175 70,165 
                    70,210 390,220 
                    390,255 70,245
                  "
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                />

                {/* Waypoint circles */}
                {[
                  [70, 50],
                  [390, 60],
                  [390, 95],
                  [70, 85],
                  [70, 130],
                  [390, 140]
                ].map(([x, y], idx) => (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r="5"
                    fill={idx < currentWaypoint ? '#10b981' : '#38bdf8'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                ))}

                {/* Moving Robot Icon on Path */}
                <circle
                  cx="70"
                  cy="130"
                  r="9"
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              </svg>

              <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-emerald-400">
                Robot Current Pos: Waypoint 4 / 36 (64% Progress)
              </div>
            </div>

            {/* Waypoints List */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Waypoint Coordinates
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {waypoints.slice(0, 4).map((w) => (
                  <div key={w.id} className="p-2.5 rounded-xl bg-slate-900/40 border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">WP #{w.id}: {w.action}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{w.lat}° N, {w.lng}° E</span>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
