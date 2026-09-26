import React, { useState } from 'react';
import { GOVERNMENT_STATE_DATA } from '../../data/mockData';
import {
  Building2,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Bot,
  Users,
  Sprout,
  Download,
  Filter,
  Layers,
  Sparkles,
  Search
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  AreaChart,
  Area
} from 'recharts';

export const GovernmentDashboard: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData =
    selectedState === 'All States'
      ? GOVERNMENT_STATE_DATA
      : GOVERNMENT_STATE_DATA.filter((s) => s.state === selectedState);

  const totalFarmers = GOVERNMENT_STATE_DATA.reduce((acc, s) => acc + s.totalFarmers, 0);
  const totalRobots = GOVERNMENT_STATE_DATA.reduce((acc, s) => acc + s.activeRobots, 0);
  const totalAcreage = GOVERNMENT_STATE_DATA.reduce((acc, s) => acc + s.cropAcreageHectares, 0);
  const totalPestAlerts = GOVERNMENT_STATE_DATA.reduce((acc, s) => acc + s.pestAlertCount, 0);

  const exportCSV = () => {
    const headers = 'State,TotalFarmers,ActiveRobots,AcreageHa,SoilHealthIndex,DroughtVulnerability,PestAlerts\n';
    const rows = GOVERNMENT_STATE_DATA.map(
      (s) =>
        `${s.state},${s.totalFarmers},${s.activeRobots},${s.cropAcreageHectares},${s.avgSoilHealthIndex},${s.droughtVulnerability},${s.pestAlertCount}`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Agrinet_Government_Analytics_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                Ministry of Agriculture & Farmers Welfare • National DPI Dashboard
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              Government GIS Analytics & State Macro Registry
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Real-time monitoring across 8 federated states: crop acreage distributions, pest outbreak hotspots, drought indices, and autonomous robot fleet deployments.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export National CSV Report</span>
          </button>
        </div>
      </div>

      {/* Macro National KPI Quad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Registered Farmers</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-white font-display mt-2">
            {(totalFarmers / 100000).toFixed(2)} Lakh
          </p>
          <span className="text-[11px] text-emerald-400 font-semibold">AgriStack e-KYC Verified</span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Autonomous Swarm Robots</span>
            <Bot className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-3xl font-black text-cyan-300 font-display mt-2">
            {totalRobots.toLocaleString()}
          </p>
          <span className="text-[11px] text-cyan-400 font-semibold">Across 8 State FPOs</span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Cultivated Acreage</span>
            <Sprout className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-emerald-400 font-display mt-2">
            {(totalAcreage / 100000).toFixed(2)} Lakh <span className="text-xs font-normal text-slate-400">Ha</span>
          </p>
          <span className="text-[11px] text-emerald-400 font-semibold">ISRO RISAT Mapped</span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active Pest Hotspots</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-black text-amber-400 font-display mt-2">
            {totalPestAlerts}
          </p>
          <span className="text-[11px] text-amber-400 font-semibold">Containment Protocols Dispatched</span>
        </div>
      </div>

      {/* State-by-State Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* State Farmer & Robot Distribution Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              State Deployment: Farmers (in '000s) vs Active Robots
            </h3>
            <span className="text-xs text-slate-400 font-mono">DPI Mesh Feed</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={GOVERNMENT_STATE_DATA.map((s) => ({
                  state: s.state,
                  farmersK: Math.round(s.totalFarmers / 1000),
                  robots: s.activeRobots
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="state" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d16', borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="farmersK" name="Farmers (x1,000)" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="robots" name="Active Robots" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expected Crop Yield Tons (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sprout className="w-4 h-4 text-cyan-400" />
            Macro Yield Forecast by State (Metric Tons)
          </h3>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={GOVERNMENT_STATE_DATA.map((s) => ({
                  state: s.state,
                  yieldTons: Math.round(s.expectedYieldTons / 1000)
                }))}
              >
                <defs>
                  <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stop-color="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stop-color="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="state" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} unit="k T" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d16', borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }}
                />
                <Area type="monotone" dataKey="yieldTons" stroke="#06b6d4" strokeWidth={2.5} fill="url(#yieldGrad)" name="Yield (x1000 Tons)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* State Master Table */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-white">Federated State Agriculture Nodes</h3>
          <div className="flex items-center gap-2">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
            >
              <option value="All States">All States ({GOVERNMENT_STATE_DATA.length})</option>
              {GOVERNMENT_STATE_DATA.map((s) => (
                <option key={s.state} value={s.state}>{s.state}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-semibold">State</th>
                <th className="pb-3 font-semibold">Farmers</th>
                <th className="pb-3 font-semibold">Robots Active</th>
                <th className="pb-3 font-semibold">Acreage (Ha)</th>
                <th className="pb-3 font-semibold">Soil Health Score</th>
                <th className="pb-3 font-semibold">Drought Risk</th>
                <th className="pb-3 font-semibold">Pest Alerts</th>
                <th className="pb-3 font-semibold">Major Crops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredData.map((s, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 font-bold text-white">{s.state}</td>
                  <td className="py-3.5 text-slate-300 font-mono">{s.totalFarmers.toLocaleString()}</td>
                  <td className="py-3.5 text-cyan-400 font-mono font-bold">{s.activeRobots}</td>
                  <td className="py-3.5 text-slate-300 font-mono">{s.cropAcreageHectares.toLocaleString()}</td>
                  <td className="py-3.5">
                    <span className="font-bold text-emerald-400">{s.avgSoilHealthIndex}/100</span>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.droughtVulnerability === 'Low'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : s.droughtVulnerability === 'Moderate'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {s.droughtVulnerability}
                    </span>
                  </td>
                  <td className="py-3.5 text-amber-400 font-mono font-bold">{s.pestAlertCount}</td>
                  <td className="py-3.5 text-slate-400">{s.majorCrops.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
