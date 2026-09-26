import React from 'react';
import { useApp } from '../../context/AppContext';
import { MetricCard } from '../common/MetricCard';
import { AnimatedGauge } from '../common/AnimatedGauge';
import { MULTILINGUAL_VOCAB } from '../../data/mockData';
import {
  Sun,
  CloudRain,
  Sprout,
  Bot,
  Activity,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Play,
  ScanEye,
  Mic,
  FileSpreadsheet
} from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const {
    user,
    weather,
    soilHealth,
    satelliteData,
    robot,
    language,
    setActiveTab,
    sendRobotCommand
  } = useApp();

  const greeting = MULTILINGUAL_VOCAB.welcome[language] || MULTILINGUAL_VOCAB.welcome.en;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Hero Welcome Header with Glassmorphic Gradient */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        {/* Background futuristic glow aura */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                AgriStack Verified Farm
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {user.state}, {user.district}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white tracking-tight">
              {greeting}, <span className="text-emerald-400">{user.name}</span>
            </h1>

            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Managing <span className="text-white font-semibold">{user.farmSizeAcres} Acres</span> of{' '}
              <span className="text-emerald-300 font-semibold">{user.primaryCrop}</span> at{' '}
              <span className="text-white font-semibold">{user.farmName}</span>. All autonomous systems operational.
            </p>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('disease_diagnosis')}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/40 transition-all transform hover:-translate-y-0.5"
            >
              <ScanEye className="w-4 h-4" />
              <span>Scan Leaf AI</span>
            </button>

            <button
              onClick={() => setActiveTab('robot_cockpit')}
              className="px-4 py-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-emerald-500/40 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Control ROV-BOT</span>
            </button>

            <button
              onClick={() => setActiveTab('voice_assistant')}
              className="p-2.5 rounded-2xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 font-bold text-xs flex items-center justify-center transition-all"
              title="Speak with Kisan Vani AI"
            >
              <Mic className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Today's Weather"
          value={`${weather.temp}°C`}
          unit={weather.condition}
          icon={Sun}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
          subtext={`Humidity ${weather.humidity}% • Rain ${weather.rainChance}%`}
          change="Optimal for Spraying"
          isPositive={true}
          glowColor="amber"
          onClick={() => setActiveTab('weather_forecast')}
        />

        <MetricCard
          title="Soil Health Index"
          value={`${soilHealth.fertilityScore}/100`}
          unit="Optimal"
          icon={Sprout}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
          subtext={`pH ${soilHealth.ph} • Moisture ${soilHealth.moisture}%`}
          change="+4 pts vs Last Month"
          isPositive={true}
          glowColor="green"
          onClick={() => setActiveTab('soil_health')}
        />

        <MetricCard
          title="Satellite NDVI Vigor"
          value={satelliteData.ndviAverage.toFixed(2)}
          unit="Dense Canopy"
          icon={Activity}
          iconColor="text-cyan-400"
          iconBg="bg-cyan-500/10"
          subtext="ISRO RISAT Composite"
          change="92% Canopy Health"
          isPositive={true}
          glowColor="cyan"
          onClick={() => setActiveTab('satellite_intelligence')}
        />

        <MetricCard
          title="ROV-BOT Swarm State"
          value={`${robot.batteryPercent}%`}
          unit={robot.missionStatus.toUpperCase()}
          icon={Bot}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10"
          subtext={`Solar +${robot.solarChargingWatts}W • ${robot.speedKmh} km/h`}
          change={`${robot.fieldCoveragePercent}% Covered`}
          isPositive={true}
          glowColor="blue"
          onClick={() => setActiveTab('robot_cockpit')}
        />
      </div>

      {/* Main Analytics & Actionable Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: AI Recommendation & Field Health Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's AI Recommendation Banner */}
          <div className="glass-panel rounded-3xl p-6 border border-emerald-500/30 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Daily AI Advisory • Precision Action
                  </span>
                  <h3 className="text-lg font-black font-display text-white mt-0.5">
                    Execute Bio-Fertilizer Spraying in Quadrant B
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-white/10">
                07:00 – 10:30 AM
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              Wind speed is currently calm at <span className="text-emerald-400 font-semibold">{weather.windSpeed} km/h</span> with 0% rain probability. Micro-drip root moisture is optimal at {soilHealth.moisture}%. ROV-BOT Alpha is ready with 88% solar charge to execute 1.8m spray boom.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() => sendRobotCommand('start')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch ROV-BOT Mission</span>
              </button>
              <button
                onClick={() => setActiveTab('crop_recommendation')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
              >
                <span>View Crop Advisory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Gauges & Health Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel rounded-2xl p-5 border border-white/10 flex flex-col items-center text-center">
              <AnimatedGauge
                value={soilHealth.fertilityScore}
                label="Soil Health"
                color="#10b981"
                subtext="NPK Balance & Carbon"
              />
              <span className="mt-3 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Healthy Grade A
              </span>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-white/10 flex flex-col items-center text-center">
              <AnimatedGauge
                value={Math.round(satelliteData.ndviAverage * 100)}
                label="Crop Health"
                color="#06b6d4"
                subtext="NDVI Canopy Vigor"
              />
              <span className="mt-3 text-xs text-cyan-400 font-semibold bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                Optimal Chlorophyll
              </span>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-white/10 flex flex-col items-center text-center">
              <AnimatedGauge
                value={robot.batteryPercent}
                label="Robot Charge"
                color="#3b82f6"
                subtext="Solar PV Active (+142W)"
              />
              <span className="mt-3 text-xs text-blue-400 font-semibold bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                4.8 Hours Remaining
              </span>
            </div>
          </div>

          {/* Today's Farm Tasks */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Today's Precision Tasks</h3>
              </div>
              <span className="text-xs text-slate-400">3 of 4 Completed</span>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Morning Soil Moisture Probe Check (15cm & 30cm)', time: '06:30 AM', done: true, tag: 'IoT Telemetry' },
                { title: 'Autonomous ROV-BOT Laser Weeding in North Plot', time: '07:45 AM', done: true, tag: 'Robotics' },
                { title: 'ISRO RISAT Satellite NDVI Sync & Water Stress Audit', time: '09:00 AM', done: true, tag: 'Satellite' },
                { title: 'Foliar Bio-NPK Spraying in Quadrant B', time: '10:30 AM', done: false, tag: 'Advisory' }
              ].map((task, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                    task.done
                      ? 'bg-slate-900/40 border-white/5 opacity-80'
                      : 'bg-emerald-950/20 border-emerald-500/30 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        task.done
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'border border-slate-600'
                      }`}
                    >
                      {task.done && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className={`text-xs font-semibold ${task.done ? 'line-through text-slate-400' : 'text-white'}`}>
                        {task.title}
                      </p>
                      <span className="text-[10px] text-slate-500">{task.time}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-white/10">
                    {task.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Robot Live Radar Preview & Quick Telemetry */}
        <div className="space-y-6">
          {/* ROV-BOT Live Radar Preview */}
          <div className="glass-panel-glow rounded-3xl p-6 border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Live Field Radar</h3>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                ACTIVE
              </span>
            </div>

            {/* Simulated Radar Visual */}
            <div className="relative w-full h-56 rounded-2xl bg-slate-950 border border-emerald-500/20 flex items-center justify-center overflow-hidden">
              {/* Concentric radar rings */}
              <div className="absolute w-44 h-44 rounded-full border border-emerald-500/20"></div>
              <div className="absolute w-32 h-32 rounded-full border border-emerald-500/30"></div>
              <div className="absolute w-20 h-20 rounded-full border border-emerald-500/40"></div>
              <div className="absolute inset-0 bg-[radial-gradient(#16a34a_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

              {/* Radar Sweep Line */}
              <div className="radar-sweep-effect"></div>

              {/* Robot Position Dot */}
              <div className="absolute z-10 flex flex-col items-center">
                <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-glow-green animate-pulse"></div>
                <span className="text-[9px] font-mono font-bold text-emerald-300 bg-slate-900/90 px-1.5 py-0.5 rounded border border-emerald-500/40 mt-1">
                  ROV-01
                </span>
              </div>

              {/* Obstacle / Waypoint nodes */}
              <div className="absolute top-10 left-12 w-2.5 h-2.5 bg-blue-400 rounded-full border border-white"></div>
              <div className="absolute bottom-12 right-14 w-2.5 h-2.5 bg-amber-400 rounded-full border border-white"></div>
            </div>

            {/* Robot Quick Stats */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400 text-[10px]">Speed</span>
                <p className="font-bold text-white font-mono">{robot.speedKmh} km/h</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400 text-[10px]">Coverage</span>
                <p className="font-bold text-emerald-400 font-mono">{robot.fieldCoveragePercent}%</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400 text-[10px]">Tool Attached</span>
                <p className="font-bold text-white capitalize">{robot.activeAttachment}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400 text-[10px]">Solar PV</span>
                <p className="font-bold text-amber-400 font-mono">+{robot.solarChargingWatts} W</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('robot_cockpit')}
              className="mt-4 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 hover:border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Open Digital Twin Cockpit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Weather Forecast Strip */}
          <div className="glass-panel rounded-3xl p-5 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white">7-Day Rain Outlook</span>
              <span className="text-[10px] text-emerald-400 font-mono">IMD Radar</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              {weather.forecast7Day.slice(0, 4).map((f, i) => (
                <div key={i} className="p-2 rounded-xl bg-slate-900/50 border border-white/5">
                  <span className="text-[10px] text-slate-400">{f.day}</span>
                  <div className="my-1 flex justify-center">
                    <CloudRain className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-xs font-bold text-white">{f.tempMax}°</span>
                  <p className="text-[9px] text-cyan-300">{f.rainMm}mm</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
