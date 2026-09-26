import React from 'react';
import { useApp } from '../../context/AppContext';
import { AnimatedGauge } from '../common/AnimatedGauge';
import {
  TestTube2,
  Sparkles,
  Sprout,
  Droplets,
  Layers,
  Award,
  ArrowUpRight,
  TrendingUp,
  Download,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export const SoilHealthAnalytics: React.FC = () => {
  const { soilHealth, user, setActiveTab } = useApp();

  const nutrientData = [
    { name: 'Nitrogen (N)', current: soilHealth.nitrogenKgHa, optimal: 280, unit: 'kg/ha', status: 'Moderate' },
    { name: 'Phosphorus (P)', current: soilHealth.phosphorusKgHa, optimal: 35, unit: 'kg/ha', status: 'Slight Deficit' },
    { name: 'Potassium (K)', current: soilHealth.potassiumKgHa, optimal: 280, unit: 'kg/ha', status: 'Sufficient' },
    { name: 'Org Carbon', current: soilHealth.organicCarbonPercent * 100, optimal: 100, unit: '% (x100)', status: 'Moderate' }
  ];

  const radarData = [
    { subject: 'Nitrogen', value: 85, fullMark: 100 },
    { subject: 'Phosphorus', value: 72, fullMark: 100 },
    { subject: 'Potassium', value: 95, fullMark: 100 },
    { subject: 'Org Carbon', value: 75, fullMark: 100 },
    { subject: 'pH Balance', value: 92, fullMark: 100 },
    { subject: 'Moisture Hold', value: 88, fullMark: 100 }
  ];

  const micronutrients = [
    { name: 'Zinc (Zn)', val: `${soilHealth.zincPpm} ppm`, status: 'Optimal (> 0.6 ppm)', ok: true },
    { name: 'Iron (Fe)', val: `${soilHealth.ironPpm} ppm`, status: 'Optimal (> 4.5 ppm)', ok: true },
    { name: 'Boron (B)', val: `${soilHealth.boronPpm} ppm`, status: 'Optimal (> 0.5 ppm)', ok: true },
    { name: 'Sulphur (S)', val: `${soilHealth.sulphurPpm} ppm`, status: 'Optimal (> 10.0 ppm)', ok: true }
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <TestTube2 className="w-3.5 h-3.5" />
                Digital Soil Health Card (SHC) • ICAR Certified
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              Soil Health & Rhizosphere Intelligence
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Real-time laboratory & LoRa sensor analytics. Measuring primary macronutrients (NPK), micronutrients, pH balance, and organic microbial carbon.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('reports')}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Official Soil Card</span>
          </button>
        </div>
      </div>

      {/* Main Gauges Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col items-center text-center">
          <AnimatedGauge
            value={soilHealth.fertilityScore}
            label="Fertility Score"
            color="#10b981"
            subtext="Comprehensive Index"
          />
          <span className="mt-2 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            High Productivity Grade
          </span>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col items-center text-center">
          <AnimatedGauge
            value={soilHealth.moisture}
            label="Root Moisture"
            color="#06b6d4"
            subtext="15cm & 30cm Sensor Average"
          />
          <span className="mt-2 text-xs text-cyan-400 font-bold bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
            Optimal Field Capacity
          </span>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col items-center text-center">
          <AnimatedGauge
            value={Math.round(soilHealth.ph * 10)}
            max={140}
            unit=" pH"
            label={`pH ${soilHealth.ph}`}
            color="#f59e0b"
            subtext="Neutral Rhizosphere"
          />
          <span className="mt-2 text-xs text-amber-400 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
            Ideal for Nutrient Uptake
          </span>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col items-center text-center">
          <AnimatedGauge
            value={Math.round(soilHealth.organicCarbonPercent * 100)}
            max={150}
            unit="%"
            label={`OC ${soilHealth.organicCarbonPercent}%`}
            color="#8b5cf6"
            subtext="Target 1.0% Target"
          />
          <span className="mt-2 text-xs text-purple-400 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
            Medium Carbon Stock
          </span>
        </div>
      </div>

      {/* Analytics Charts (NPK Bar + Radar Balance) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* NPK Comparison Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-400" />
              Macronutrient Balance (Current vs Optimal Target)
            </h3>
            <span className="text-xs text-slate-400 font-mono">kg/ha standard</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nutrientData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d16', borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }}
                />
                <Bar dataKey="current" fill="#10b981" name="Current Level" radius={[4, 4, 0, 0]} />
                <Bar dataKey="optimal" fill="#334155" name="Optimal Target" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Balance Map (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Soil Chemical Equilibrium Radar
          </h3>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis stroke="rgba(255,255,255,0.05)" domain={[0, 100]} />
                <Radar name="Soil Equilibrium" dataKey="value" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Micronutrients & AI Dosage Suggestion Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Micronutrients Strip (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-white/10 space-y-3">
          <h3 className="text-sm font-bold text-white">Essential Micronutrients Status</h3>
          <div className="space-y-2.5 text-xs">
            {micronutrients.map((m, i) => (
              <div key={i} className="p-3 rounded-2xl bg-slate-900/50 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">{m.name}</span>
                  <span className="text-[10px] text-slate-400">{m.status}</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold">{m.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Bio-Fertilizer Dosage & Action Plan (7 Cols) */}
        <div className="lg:col-span-7 glass-panel-glow rounded-3xl p-6 border border-emerald-500/30 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">AI Nutrient & Compost Dosage Calculation</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5">
              <span className="text-slate-400 text-[10px] block">Organic Compost</span>
              <p className="font-black text-emerald-300 text-base mt-1 font-display">
                {soilHealth.aiRecommendations.organicCompostKgPerAcre} kg
              </p>
              <span className="text-[9px] text-slate-500">Per Acre</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5">
              <span className="text-slate-400 text-[10px] block">DAP Dosage</span>
              <p className="font-black text-cyan-300 text-base mt-1 font-display">
                {soilHealth.aiRecommendations.dapDoseKg} kg
              </p>
              <span className="text-[9px] text-slate-500">Basal Application</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5">
              <span className="text-slate-400 text-[10px] block">Neem Urea</span>
              <p className="font-black text-white text-base mt-1 font-display">
                {soilHealth.aiRecommendations.ureaDoseKg} kg
              </p>
              <span className="text-[9px] text-slate-500">Split 1</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5">
              <span className="text-slate-400 text-[10px] block">Water Target</span>
              <p className="font-black text-blue-300 text-base mt-1 font-display">
                {soilHealth.aiRecommendations.waterRequirementLiters} L
              </p>
              <span className="text-[9px] text-slate-500">Per Irrigation</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
            {soilHealth.aiRecommendations.actionableTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <p className="leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
