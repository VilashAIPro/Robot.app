import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Satellite,
  Layers,
  Calendar,
  Eye,
  Sliders,
  TrendingUp,
  AlertCircle,
  MapPin,
  Maximize2,
  Download,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';

export const SatelliteIntelligence: React.FC = () => {
  const { satelliteData, user } = useApp();

  const [activeLayer, setActiveLayer] = useState<'ndvi' | 'ndwi' | 'thermal' | 'vigor'>('ndvi');
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(4); // Last date (26 Sep)
  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  const layers = [
    {
      id: 'ndvi',
      name: 'NDVI (Vegetation Index)',
      desc: 'Measures chlorophyll absorption & photosynthetic green canopy density.',
      range: '0.0 – 1.0 (Optimal > 0.70)',
      palette: ['#ef4444', '#f59e0b', '#84cc16', '#16a34a', '#065f46']
    },
    {
      id: 'ndwi',
      name: 'NDWI (Water Stress)',
      desc: 'Detects leaf canopy moisture content and drought stress vulnerability.',
      range: '-0.2 – +0.6 (Optimal > 0.25)',
      palette: ['#f97316', '#eab308', '#38bdf8', '#0284c7', '#1e3a8a']
    },
    {
      id: 'thermal',
      name: 'Surface Thermal Map',
      desc: 'Land surface temperature derived from Landsat-9 Thermal Infrared Sensor.',
      range: '20°C – 42°C',
      palette: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
    },
    {
      id: 'vigor',
      name: 'Composite Crop Health Vigor',
      desc: 'Multi-spectral AI fusion detecting early pest chlorosis & nutrient deficiency.',
      range: '0 – 100 Score',
      palette: ['#dc2626', '#d97706', '#65a30d', '#15803d']
    }
  ];

  const timeSteps = ['15 Aug', '25 Aug', '05 Sep', '15 Sep', '26 Sep'];

  const zones = [
    { id: 1, name: 'Zone A - North Canopy', status: 'Healthy', ndvi: 0.78, moisture: 'Optimal', notes: 'Vigorous leaf growth, zero pest stress' },
    { id: 2, name: 'Zone B - East Boundary', status: 'Slight Stress', ndvi: 0.58, moisture: 'Mild Deficit', notes: 'Slight yellowing detected; check drip nozzle 4' },
    { id: 3, name: 'Zone C - South Central', status: 'Healthy', ndvi: 0.76, moisture: 'Optimal', notes: 'Full canopy closure' },
    { id: 4, name: 'Zone D - West Ridge', status: 'Healthy', ndvi: 0.72, moisture: 'Optimal', notes: 'Balanced NPK uptake' }
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
                <Satellite className="w-3.5 h-3.5" />
                ISRO RISAT-1A + Sentinel-2 MSI Multi-Spectral
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              Satellite Intelligence & Earth Engine GIS
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Real-time multi-band multispectral remote sensing at 10m resolution. Audit NDVI vegetative vigor, water stress index, and thermal anomalies over time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-white/10">
              {satelliteData.lastUpdated}
            </span>
          </div>
        </div>
      </div>

      {/* Layer Switcher Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {layers.map((l) => {
          const isActive = activeLayer === l.id;
          return (
            <button
              key={l.id}
              onClick={() => setActiveLayer(l.id as any)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-gradient-to-br from-emerald-900/60 to-slate-900 border-emerald-500 shadow-glow-green'
                  : 'glass-panel border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-bold ${isActive ? 'text-emerald-300' : 'text-slate-300'}`}>
                  {l.name}
                </span>
                <Layers className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">{l.desc}</p>
              <div className="mt-3 flex items-center gap-1">
                {l.palette.map((color, i) => (
                  <div key={i} className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Satellite Viewer and Zone Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Satellite Canvas & Polygon Map (8 Cols) */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-white">
                {satelliteData.fieldName} ({satelliteData.areaAcres} Acres)
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Layer:</span>
              <span className="font-bold text-emerald-400 uppercase">{activeLayer}</span>
            </div>
          </div>

          {/* Simulated Satellite GIS Viewport */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-slate-950 border border-emerald-500/30 overflow-hidden group">
            {/* Satellite high-res farm texture */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
                activeLayer === 'ndvi'
                  ? 'brightness-110 saturate-150 hue-rotate-15'
                  : activeLayer === 'ndwi'
                  ? 'brightness-95 saturate-125 hue-rotate-[160deg]'
                  : activeLayer === 'thermal'
                  ? 'brightness-125 saturate-200 hue-rotate-[320deg]'
                  : 'brightness-100 saturate-100'
              }`}
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80')`
              }}
            />

            {/* Futuristic GIS Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#16a34a_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>

            {/* Field Polygon Visual SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-auto">
              <polygon
                points="80,40 380,60 460,260 140,290"
                fill={
                  activeLayer === 'ndvi'
                    ? 'rgba(22, 163, 74, 0.4)'
                    : activeLayer === 'ndwi'
                    ? 'rgba(6, 182, 212, 0.4)'
                    : activeLayer === 'thermal'
                    ? 'rgba(245, 158, 11, 0.4)'
                    : 'rgba(16, 185, 129, 0.4)'
                }
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="6 3"
                className="transition-all duration-500 hover:fill-opacity-60 cursor-pointer"
              />

              {/* Stress Zone Highlight */}
              <circle
                cx="340"
                cy="90"
                r="24"
                fill="rgba(239, 68, 68, 0.5)"
                stroke="#ef4444"
                strokeWidth="2"
                className="animate-pulse cursor-pointer"
                onClick={() => setSelectedZone(2)}
              />
              <text x="370" y="95" fill="#fca5a5" fontSize="11" fontWeight="bold">
                Zone B (Stress)
              </text>
            </svg>

            {/* Floating Top Controls */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-xs font-mono text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Lat: 17.9792° N, Lng: 79.5964° E
              </span>
            </div>

            {/* Legend bar inside viewport */}
            <div className="absolute bottom-4 left-4 right-4 glass-panel rounded-xl p-3 border border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Scale Index:</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400">Low</span>
                <div className="w-32 h-2 rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500" />
                <span className="text-[10px] text-emerald-400 font-bold">High (0.90)</span>
              </div>
            </div>
          </div>

          {/* Timeline Slider */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-400" />
                Temporal Satellite Pass Timeline
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                Pass: {timeSteps[selectedTimeIndex]} 2026
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 pt-2">
              {timeSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTimeIndex(idx)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedTimeIndex === idx
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {step}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Historical NDVI Trend & Zone Analytics */}
        <div className="lg:col-span-4 space-y-6">
          {/* NDVI Historical Chart */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Canopy NDVI Progression
              </h3>
              <span className="text-xs font-bold text-emerald-400 font-mono">+76% Growth</span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={satelliteData.timelineHistory}>
                  <defs>
                    <linearGradient id="ndviGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stop-color="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stop-color="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={10} domain={[0, 1]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#090d16', borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }}
                  />
                  <Area type="monotone" dataKey="ndvi" stroke="#10b981" strokeWidth={2.5} fill="url(#ndviGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Zone-by-Zone Breakdown */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Field Zone Health Diagnostics
            </h3>

            <div className="space-y-2.5 text-xs">
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZone(zone.id)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    zone.status === 'Healthy'
                      ? 'bg-slate-900/40 border-white/5 hover:border-emerald-500/30'
                      : 'bg-rose-950/20 border-rose-500/30 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">{zone.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        zone.status === 'Healthy'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {zone.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>NDVI: <strong className="text-white">{zone.ndvi}</strong></span>
                    <span>Moisture: <strong className="text-slate-300">{zone.moisture}</strong></span>
                  </div>
                  <p className="mt-1.5 text-[10px] text-slate-400 italic">{zone.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
