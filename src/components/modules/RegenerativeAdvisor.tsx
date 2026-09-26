import React from 'react';
import { useApp } from '../../context/AppContext';
import { AnimatedGauge } from '../common/AnimatedGauge';
import {
  Leaf,
  Sparkles,
  Award,
  DollarSign,
  Droplets,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RegenerativeAdvisor: React.FC = () => {
  const { regenerativeMetrics, toggleRegenerativePractice, user } = useApp();

  const handleToggle = (index: number) => {
    toggleRegenerativePractice(index);
    confetti({ particleCount: 35, spread: 50 });
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5" />
                AgriStack Carbon Offset & Regenerative Protocol
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              Regenerative Farming & Carbon Sink Advisor
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Track carbon sequestration, organic soil building, biological nitrogen fixation, and earn verified carbon credit rewards (₹2,200 per credit).
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2">
            <Award className="w-6 h-6" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Status</span>
              <span className="text-xs font-bold text-white">Certified Eco-Farmer</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col items-center text-center">
          <AnimatedGauge
            value={regenerativeMetrics.sustainabilityScore}
            label="Sustainability"
            color="#10b981"
            subtext="Comprehensive Index"
          />
          <span className="mt-2 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            Top 5% in District
          </span>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>Carbon Sequestered</span>
          </div>
          <div>
            <p className="text-3xl font-black text-emerald-300 font-display">
              {regenerativeMetrics.carbonSequesteredKgPerYear.toLocaleString()}
            </p>
            <span className="text-xs text-slate-400">kg CO₂e / year</span>
          </div>
          <p className="text-[11px] text-emerald-400">+18% higher than conventional tillage</p>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <DollarSign className="w-4 h-4 text-cyan-400" />
            <span>Carbon Credits Earned</span>
          </div>
          <div>
            <p className="text-3xl font-black text-cyan-300 font-display">
              {regenerativeMetrics.carbonCreditsEarned} <span className="text-xs font-normal text-slate-400">Credits</span>
            </p>
            <span className="text-xs text-slate-400">Value: ₹{(regenerativeMetrics.carbonCreditsEarned * 2200).toFixed(0)}</span>
          </div>
          <p className="text-[11px] text-cyan-400">Directly redeemable to Bank Account</p>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Droplets className="w-4 h-4 text-blue-400" />
            <span>Groundwater Saved</span>
          </div>
          <div>
            <p className="text-3xl font-black text-white font-display">
              {(regenerativeMetrics.waterSavedLitersYear / 1000).toFixed(0)}k <span className="text-xs font-normal text-slate-400">Liters</span>
            </p>
            <span className="text-xs text-slate-400">42% savings via micro-drip</span>
          </div>
          <p className="text-[11px] text-blue-400">AWD Smart Protocol Verified</p>
        </div>
      </div>

      {/* Recommended Practices Checklist */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Regenerative Practice Adoptions (Toggle to update Score & Carbon Credits)
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {regenerativeMetrics.recommendedPractices.filter((p) => p.adopted).length} of{' '}
            {regenerativeMetrics.recommendedPractices.length} Active
          </span>
        </div>

        <div className="space-y-3">
          {regenerativeMetrics.recommendedPractices.map((practice, idx) => (
            <div
              key={idx}
              onClick={() => handleToggle(idx)}
              className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                practice.adopted
                  ? 'bg-gradient-to-r from-emerald-950/40 to-slate-900 border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900/40 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    practice.adopted
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'border border-slate-600'
                  }`}
                >
                  {practice.adopted && <CheckCircle2 className="w-4 h-4" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{practice.title}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-white/10">
                      {practice.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{practice.benefit}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-emerald-400 block">
                  +{practice.carbonReward} tCO₂e
                </span>
                <span className="text-[10px] text-slate-500">Carbon Reward</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
