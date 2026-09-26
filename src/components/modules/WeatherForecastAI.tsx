import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CloudSun,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  AlertTriangle,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  Send
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const WeatherForecastAI: React.FC = () => {
  const { weather, user } = useApp();

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                <CloudSun className="w-3.5 h-3.5" />
                IMD High-Resolution Agro-Meteorology (3km Grid)
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              AI Agricultural Weather & Micro-Climate Forecast
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Precision spraying windows, root-zone evapotranspiration rates, heatwave alerts, and 7-day automated farm advisory.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-white/10">
              Station: Warangal Agri-Obs #402
            </span>
          </div>
        </div>
      </div>

      {/* Current Real-time Atmosphere Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4 border border-white/10 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Air Temperature</span>
            <span className="text-xl font-black text-white font-display">{weather.temp}°C</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/10 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Relative Humidity</span>
            <span className="text-xl font-black text-white font-display">{weather.humidity}%</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/10 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Wind Velocity</span>
            <span className="text-xl font-black text-white font-display">{weather.windSpeed} <span className="text-xs font-normal text-slate-400">km/h ({weather.windDirection})</span></span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/10 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">UV Solar Index</span>
            <span className="text-xl font-black text-white font-display">{weather.uvIndex} <span className="text-xs font-normal text-slate-400">/ 10 High</span></span>
          </div>
        </div>
      </div>

      {/* AI Advisory Triad (Spraying, Irrigation, Sowing) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Spraying Window Card */}
        <div className="glass-panel rounded-3xl p-6 border border-emerald-500/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              AI Spraying Window
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {weather.aiAdvisory.spraying.status}
            </span>
          </div>
          <h3 className="text-base font-bold text-white">07:00 AM – 10:30 AM (Today)</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {weather.aiAdvisory.spraying.reason}
          </p>
        </div>

        {/* Irrigation Advisor */}
        <div className="glass-panel rounded-3xl p-6 border border-cyan-500/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5" />
              AI Irrigation Protocol
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              {weather.aiAdvisory.irrigation.status}
            </span>
          </div>
          <h3 className="text-base font-bold text-white">Conserve Groundwater</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {weather.aiAdvisory.irrigation.reason}
          </p>
        </div>

        {/* Sowing Window Card */}
        <div className="glass-panel rounded-3xl p-6 border border-amber-500/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Rabi Sowing Window
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {weather.aiAdvisory.sowingWindow.status}
            </span>
          </div>
          <h3 className="text-base font-bold text-white">{weather.aiAdvisory.sowingWindow.window}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {weather.aiAdvisory.sowingWindow.reason}
          </p>
        </div>
      </div>

      {/* 7-Day Forecast & Precipitation Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 7-Day Cards Grid (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            7-Day Hyperlocal Weather Forecast
          </h3>

          <div className="space-y-2.5">
            {weather.forecast7Day.map((f, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-slate-900/50 border border-white/5 flex items-center justify-between text-xs hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 text-left">
                    <span className="font-bold text-white">{f.day}</span>
                    <span className="text-[10px] text-slate-400 block">{f.date}</span>
                  </div>
                  <CloudRain className="w-5 h-5 text-cyan-400" />
                  <span className="text-slate-300 hidden sm:inline">{f.condition}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-cyan-400 font-bold">{f.rainMm} mm</span>
                  <div className="text-right">
                    <span className="font-bold text-white">{f.tempMax}°</span>
                    <span className="text-slate-500 ml-1">/ {f.tempMin}°</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      f.sprayingCondition === 'Optimal'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : f.sprayingCondition === 'Caution'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {f.sprayingCondition} Spray
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rain Precipitation Bar Chart (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-cyan-400" />
            Predicted Rainfall Volume (mm)
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weather.forecast7Day}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} unit="mm" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d16', borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }}
                />
                <Bar dataKey="rainMm" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>Heavy Thunderstorm Alert (18mm) on Tuesday. Secure farm machinery and clear drainage channels.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
