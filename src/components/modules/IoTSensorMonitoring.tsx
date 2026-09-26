import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  Droplets,
  Thermometer,
  Sun,
  Zap,
  Gauge,
  Compass,
  Radio,
  AlertTriangle,
  RefreshCw,
  Layers
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export const IoTSensorMonitoring: React.FC = () => {
  const { iotLogs, robot, isSimulating, setIsSimulating } = useApp();

  const latest = iotLogs[iotLogs.length - 1] || {
    soilMoisture15cm: 68.2,
    soilMoisture30cm: 72.1,
    soilTemperature: 24.5,
    ambientTemperature: 29.4,
    ambientHumidity: 62,
    solarIrradianceLux: 76500,
    batteryVoltage: 48.6,
    batteryCurrentDraw: 4.3,
    chassisVibration: 0.12
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                LoRaWAN Mesh + MQTT 5.0 Edge Telemetry Stream
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              Live IoT Multi-Depth Sensor Dashboard
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Streaming telemetry from multi-depth capacitive soil moisture probes, solar irradiance pyranometers, 3-axis IMU, and robot battery thermistors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all ${
                isSimulating
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-glow-green'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <Radio className={`w-4 h-4 ${isSimulating ? 'animate-pulse text-emerald-400' : ''}`} />
              <span>{isSimulating ? 'MQTT Stream Active' : 'Stream Paused'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sensor Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="glass-panel rounded-2xl p-4 border border-white/10">
          <span className="text-slate-400 text-[10px] block">Moisture (15cm)</span>
          <p className="text-xl font-black text-cyan-400 font-display mt-0.5">{latest.soilMoisture15cm}%</p>
          <span className="text-[10px] text-slate-500">Root Zone 1</span>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/10">
          <span className="text-slate-400 text-[10px] block">Moisture (30cm)</span>
          <p className="text-xl font-black text-blue-400 font-display mt-0.5">{latest.soilMoisture30cm}%</p>
          <span className="text-[10px] text-slate-500">Subsoil Reserve</span>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/10">
          <span className="text-slate-400 text-[10px] block">Soil Temp</span>
          <p className="text-xl font-black text-amber-400 font-display mt-0.5">{latest.soilTemperature}°C</p>
          <span className="text-[10px] text-slate-500">Rhizosphere</span>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/10">
          <span className="text-slate-400 text-[10px] block">Ambient Temp</span>
          <p className="text-xl font-black text-white font-display mt-0.5">{latest.ambientTemperature}°C</p>
          <span className="text-[10px] text-slate-500">Canopy Level</span>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/10">
          <span className="text-slate-400 text-[10px] block">Solar Irradiance</span>
          <p className="text-xl font-black text-emerald-400 font-display mt-0.5">{latest.solarIrradianceLux} <span className="text-[10px] font-normal">Lux</span></p>
          <span className="text-[10px] text-slate-500">Peak Sun</span>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/10">
          <span className="text-slate-400 text-[10px] block">Bus Voltage</span>
          <p className="text-xl font-black text-purple-400 font-display mt-0.5">{latest.batteryVoltage}V</p>
          <span className="text-[10px] text-slate-500">{latest.batteryCurrentDraw}A Draw</span>
        </div>
      </div>

      {/* Real-time Streaming Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Soil Moisture Dual Depth Stream (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-cyan-400" />
              Soil Moisture Dual-Depth Stream (%)
            </h3>
            <span className="text-xs font-mono text-emerald-400">2 sec sampling</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={iotLogs}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} domain={[60, 80]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d16', borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line type="monotone" dataKey="soilMoisture15cm" stroke="#06b6d4" strokeWidth={2} name="Moisture 15cm" dot={false} />
                <Line type="monotone" dataKey="soilMoisture30cm" stroke="#3b82f6" strokeWidth={2} name="Moisture 30cm" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature & Solar Irradiance Stream (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-amber-400" />
              Thermal Dynamics (°C)
            </h3>
            <span className="text-xs font-mono text-amber-400">Canopy vs Soil</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={iotLogs}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} domain={[20, 35]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d16', borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line type="monotone" dataKey="ambientTemperature" stroke="#f59e0b" strokeWidth={2} name="Ambient Temp" dot={false} />
                <Line type="monotone" dataKey="soilTemperature" stroke="#10b981" strokeWidth={2} name="Soil Temp" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
