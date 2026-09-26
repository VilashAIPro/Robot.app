import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Layers,
  Sparkles,
  Download,
  ShieldCheck,
  Droplets
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export const AdvancedAnalytics: React.FC = () => {
  const { user } = useApp();

  const yieldHistory = [
    { year: '2022', yieldQtl: 10.2, grossIncome: 71000, dieselLiters: 380 },
    { year: '2023', yieldQtl: 11.8, grossIncome: 84000, dieselLiters: 320 },
    { year: '2024', yieldQtl: 13.1, grossIncome: 98000, dieselLiters: 190 },
    { year: '2025', yieldQtl: 14.2, grossIncome: 108000, dieselLiters: 80 },
    { year: '2026 (AI)', yieldQtl: 15.6, grossIncome: 122000, dieselLiters: 0 }
  ];

  const costBreakdown = [
    { name: 'Bio-Fertilizers & Compost', value: 35, color: '#10b981' },
    { name: 'Certified Foundation Seeds', value: 25, color: '#06b6d4' },
    { name: 'Solar Robot Operation (Electricity ₹0)', value: 10, color: '#f59e0b' },
    { name: 'Micro-Drip Maintenance', value: 15, color: '#3b82f6' },
    { name: 'Harvesting & Transport', value: 15, color: '#8b5cf6' }
  ];

  const resilienceRadar = [
    { subject: 'Drought Resilience', value: 92, fullMark: 100 },
    { subject: 'Pest Resistance', value: 88, fullMark: 100 },
    { subject: 'Soil Organic Carbon', value: 82, fullMark: 100 },
    { subject: 'Fertilizer ROI', value: 95, fullMark: 100 },
    { subject: 'Zero Fossil Fuel', value: 100, fullMark: 100 },
    { subject: 'Market Price Security', value: 90, fullMark: 100 }
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" />
                Multi-Season Agronomic Intelligence & BI
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              Advanced Farm Analytics & Multi-Year Trends
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Historical yield trajectory, input cost optimization, groundwater conservation benchmarks, and farm resilience index.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-white/10">
            5-Year AI CAGR: +11.4%
          </div>
        </div>
      </div>

      {/* Yield & Gross Income 5-Year Progression */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              5-Year Yield Trajectory (Quintals/Acre) vs Gross Farm Income (₹)
            </h3>
            <span className="text-xs font-mono text-emerald-400">Solar Robotics Impact</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={10} />
                <YAxis yAxisId="left" stroke="#10b981" fontSize={10} unit=" Q" />
                <YAxis yAxisId="right" orientation="right" stroke="#06b6d4" fontSize={10} unit="₹" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d16', borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar yAxisId="left" dataKey="yieldQtl" name="Yield (Q/Acre)" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="grossIncome" name="Gross Income (₹)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Input Cost Distribution Pie Chart */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-cyan-400" />
            Cost Distribution per Acre
          </h3>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie data={costBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4}>
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d16', borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1 text-[11px]">
            {costBreakdown.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="truncate max-w-[170px]">{c.name}</span>
                </div>
                <span className="font-mono font-bold">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Farm Resilience Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Agro-Climatic Resilience & Risk Shield Radar
          </h3>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={resilienceRadar}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis stroke="rgba(255,255,255,0.05)" domain={[0, 100]} />
                <Radar name="Resilience" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 border border-white/10 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Droplets className="w-4 h-4 text-cyan-400" />
              Groundwater & Diesel Fuel Displacement
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Replacing 380 Liters/year of diesel tractor passes with ROV-BOT solar autonomy has saved <strong className="text-emerald-400">₹36,100 in diesel expenditure</strong> and eliminated <strong className="text-cyan-400">1.02 tons of direct CO₂ exhaust emissions</strong> annually.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5">
              <span className="text-slate-400 text-[10px] block">Diesel Tractor Passes</span>
              <p className="text-2xl font-black text-white font-display mt-1">0 Liters</p>
              <span className="text-[10px] text-emerald-400">100% Solar Displaced</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5">
              <span className="text-slate-400 text-[10px] block">Annual Water Saved</span>
              <p className="text-2xl font-black text-cyan-300 font-display mt-1">4.2 Lakh L</p>
              <span className="text-[10px] text-cyan-400">AWD Drip Protocol</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
