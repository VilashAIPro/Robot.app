import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { RobotToolAttachment } from '../../types';
import {
  Bot,
  Play,
  Pause,
  Home,
  AlertTriangle,
  Zap,
  Sun,
  Compass,
  Gauge,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  RotateCcw
} from 'lucide-react';

export const RobotControlCenter: React.FC = () => {
  const { robot, sendRobotCommand, emergencySosActive } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [selectedTool, setSelectedTool] = useState<RobotToolAttachment>(robot.activeAttachment);

  const tools: { id: RobotToolAttachment; label: string; desc: string; icon: string }[] = [
    { id: 'sprayer', label: 'Precision Sprayer Boom', desc: '1.8m AI pulse spray nozzle (150-250 micron)', icon: '💦' },
    { id: 'weeder', label: 'Laser Weeder Bar', desc: 'Sub-millimeter optical weed ablation without chemicals', icon: '⚡' },
    { id: 'seeder', label: 'Precision Multi-Seed Dispenser', desc: 'Precision depth 3.5cm pneumatic metering', icon: '🌱' },
    { id: 'plough', label: 'Mini Rotary Plough / Tiller', desc: 'Zero-till shallow mulch incorporation (5cm)', icon: '🚜' }
  ];

  // Interactive 3D/2D Canvas Visualizer for ROV-BOT Digital Twin
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw background cyber grid
      ctx.strokeStyle = 'rgba(22, 163, 74, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw LiDAR Scan Beams
      if (robot.missionStatus === 'running') {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, 160);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
        grad.addColorStop(0.8, 'rgba(6, 182, 212, 0.05)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 160, -0.4, 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        angle += 0.04;
      }

      // 4 Wheels / Motors
      const wheelWidth = 24;
      const wheelHeight = 64;
      const xOffset = 90;
      const yOffset = 65;

      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;

      // Front Left Wheel
      ctx.fillRect(cx - xOffset - wheelWidth, cy - yOffset - wheelHeight / 2, wheelWidth, wheelHeight);
      ctx.strokeRect(cx - xOffset - wheelWidth, cy - yOffset - wheelHeight / 2, wheelWidth, wheelHeight);

      // Front Right Wheel
      ctx.fillRect(cx + xOffset, cy - yOffset - wheelHeight / 2, wheelWidth, wheelHeight);
      ctx.strokeRect(cx + xOffset, cy - yOffset - wheelHeight / 2, wheelWidth, wheelHeight);

      // Rear Left Wheel
      ctx.fillRect(cx - xOffset - wheelWidth, cy + yOffset - wheelHeight / 2, wheelWidth, wheelHeight);
      ctx.strokeRect(cx - xOffset - wheelWidth, cy + yOffset - wheelHeight / 2, wheelWidth, wheelHeight);

      // Rear Right Wheel
      ctx.fillRect(cx + xOffset, cy + yOffset - wheelHeight / 2, wheelWidth, wheelHeight);
      ctx.strokeRect(cx + xOffset, cy + yOffset - wheelHeight / 2, wheelWidth, wheelHeight);

      // Wheel Tread animations
      if (robot.missionStatus === 'running') {
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        const offset = (Date.now() / 20) % 12;
        for (let i = -20; i < 20; i += 8) {
          ctx.beginPath();
          ctx.moveTo(cx - xOffset - wheelWidth, cy - yOffset + i + offset);
          ctx.lineTo(cx - xOffset, cy - yOffset + i + offset);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(cx + xOffset, cy - yOffset + i + offset);
          ctx.lineTo(cx + xOffset + wheelWidth, cy - yOffset + i + offset);
          ctx.stroke();
        }
      }

      // Robot Main Chassis Box (Carbon fiber look)
      ctx.fillStyle = '#09131f';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(cx - 75, cy - 85, 150, 170, 16);
      ctx.fill();
      ctx.stroke();

      // Center Solar PV Panel Array
      ctx.fillStyle = '#0369a1';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cx - 60, cy - 65, 120, 110, 8);
      ctx.fill();
      ctx.stroke();

      // Solar grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      for (let i = -40; i <= 40; i += 20) {
        ctx.beginPath();
        ctx.moveTo(cx + i, cy - 65);
        ctx.lineTo(cx + i, cy + 45);
        ctx.stroke();
      }
      for (let j = -45; j <= 30; j += 25) {
        ctx.beginPath();
        ctx.moveTo(cx - 60, cy + j);
        ctx.lineTo(cx + 60, cy + j);
        ctx.stroke();
      }

      // Center High-Tech ROV Core / Status Orb
      ctx.fillStyle = robot.missionStatus === 'running' ? '#10b981' : '#f59e0b';
      ctx.beginPath();
      ctx.arc(cx, cy - 10, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy - 10, 5, 0, Math.PI * 2);
      ctx.fill();

      // Front Tool Attachment Bar (Top of robot)
      ctx.fillStyle = '#16a34a';
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cx - 100, cy - 105, 200, 14, 4);
      ctx.fill();
      ctx.stroke();

      // Spray Nozzle droplets animation if tool is sprayer and running
      if (robot.activeAttachment === 'sprayer' && robot.missionStatus === 'running') {
        ctx.fillStyle = '#38bdf8';
        for (let s = -80; s <= 80; s += 40) {
          const dropY = cy - 110 - ((Date.now() / 5 + s * 10) % 30);
          ctx.beginPath();
          ctx.arc(cx + s, dropY, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Labels on Canvas
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 10px JetBrains Mono';
      ctx.fillText('ROV-BOT ALPHA MARK IV', cx - 65, cy + 72);

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [robot.missionStatus, robot.activeAttachment]);

  const handleToolSwitch = (tool: RobotToolAttachment) => {
    setSelectedTool(tool);
    sendRobotCommand('switch_tool', tool);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5" />
                AgriNet Autonomous Robot Cockpit • Digital Twin
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              ROV-BOT Digital Twin Control Center
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Live telemetry link with RTK GPS (2cm accuracy), 4 independent hub motors, solar PV energy balance, obstacle LiDAR, and quick tool attachment changer.
            </p>
          </div>

          {/* Master Robot Command Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => sendRobotCommand('start')}
              disabled={robot.missionStatus === 'running'}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Mission</span>
            </button>

            <button
              onClick={() => sendRobotCommand('pause')}
              disabled={robot.missionStatus === 'paused'}
              className="px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </button>

            <button
              onClick={() => sendRobotCommand('return_home')}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </button>

            <button
              onClick={() => sendRobotCommand('emergency_stop')}
              className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-950/50 transition-all animate-pulse"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Emergency Stop</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Digital Twin Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Center 3D/2D Canvas Visualizer (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-sm font-bold text-white">Live Chassis & Motor Twin</span>
            </div>

            <span className="text-xs font-mono text-cyan-400 bg-slate-900/80 px-2.5 py-1 rounded-xl border border-white/10">
              Tool: {robot.activeAttachment.toUpperCase()}
            </span>
          </div>

          <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-slate-950 border border-emerald-500/20 overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} width={500} height={380} className="w-full h-full object-contain" />

            {/* Overlay Telemetry HUD Chips */}
            <div className="absolute top-3 left-3 space-y-1.5">
              <div className="px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400">
                FL: {robot.motors.frontLeftRpm} RPM • FR: {robot.motors.frontRightRpm} RPM
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400">
                RL: {robot.motors.rearLeftRpm} RPM • RR: {robot.motors.rearRightRpm} RPM
              </div>
            </div>

            <div className="absolute top-3 right-3 text-right">
              <div className="px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/10 text-[10px] font-mono text-amber-400">
                Motor Temp: {robot.motors.motorTempC}°C
              </div>
            </div>

            <div className="absolute bottom-3 left-3">
              <div className="px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-400">
                LiDAR Proximity: {robot.lidarObstacleDistanceMeters}m (Clear)
              </div>
            </div>

            <div className="absolute bottom-3 right-3">
              <div className="px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                Ground Clearance: {robot.ultrasonicGroundDistanceCm} cm
              </div>
            </div>
          </div>
        </div>

        {/* Right Telemetry & Tool Switcher (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Battery & Solar Gauge Widget */}
          <div className="glass-panel-glow rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              Power & Energy Balance
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5">
                <span className="text-[10px] text-slate-400 block">Battery Level</span>
                <p className="text-2xl font-black text-emerald-400 font-display mt-0.5">
                  {robot.batteryPercent}%
                </p>
                <span className="text-[10px] text-slate-500">{robot.batteryVoltage}V • {robot.batteryTempC}°C</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5">
                <span className="text-[10px] text-slate-400 block">Solar PV Generation</span>
                <p className="text-2xl font-black text-amber-400 font-display mt-0.5">
                  +{robot.solarChargingWatts}W
                </p>
                <span className="text-[10px] text-slate-500">{robot.solarDailyWh} Wh harvested today</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/40 border border-white/5">
                <span className="text-slate-400 text-[10px] block">Field Coverage</span>
                <span className="font-bold text-white font-mono">{robot.fieldCoveragePercent}%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/40 border border-white/5">
                <span className="text-slate-400 text-[10px] block">Speed</span>
                <span className="font-bold text-white font-mono">{robot.speedKmh} km/h</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/40 border border-white/5">
                <span className="text-slate-400 text-[10px] block">RTK Accuracy</span>
                <span className="font-bold text-emerald-400 font-mono">{robot.gps.accuracyCm} cm</span>
              </div>
            </div>
          </div>

          {/* Quick Tool Attachment Changer */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              Swap Active Tool Attachment
            </h3>

            <div className="space-y-2">
              {tools.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleToolSwitch(t.id)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    robot.activeAttachment === t.id
                      ? 'bg-gradient-to-r from-emerald-900/80 to-slate-900 border-emerald-500 shadow-md'
                      : 'bg-slate-900/50 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{t.icon}</span>
                    <div>
                      <span className="text-xs font-bold text-white block">{t.label}</span>
                      <span className="text-[10px] text-slate-400">{t.desc}</span>
                    </div>
                  </div>

                  {robot.activeAttachment === t.id && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Active
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
