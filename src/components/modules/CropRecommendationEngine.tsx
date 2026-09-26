import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CropRecommendationRequest } from '../../types';
import {
  Sparkles,
  Sprout,
  Calendar,
  Droplets,
  DollarSign,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  Award,
  ChevronRight,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CropRecommendationEngine: React.FC = () => {
  const { user, runCropRecommendation, lastRecommendation } = useApp();

  const [formData, setFormData] = useState<CropRecommendationRequest>({
    state: user.state,
    district: user.district,
    village: user.village,
    soilType: 'Black Clay Loam (Regur)',
    ph: 6.8,
    nitrogen: 242,
    phosphorus: 28,
    potassium: 310,
    organicCarbon: 0.72,
    moisture: 68,
    temperature: 29.4,
    rainfall: 850,
    previousCrop: 'Cotton'
  });

  const [isLoading, setIsLoading] = useState(false);

  const indianStates = [
    'Telangana',
    'Punjab',
    'Tamil Nadu',
    'Maharashtra',
    'Karnataka',
    'Uttar Pradesh',
    'Gujarat',
    'Assam',
    'Madhya Pradesh',
    'Haryana',
    'Andhra Pradesh',
    'Rajasthan'
  ];

  const soilTypes = [
    'Black Clay Loam (Regur Soil)',
    'Red Sandy Loam (Chalka)',
    'Alluvial Silt Loam',
    'Laterite / Red Clay',
    'Desert Sandy Soil',
    'Coastal Saline Clay'
  ];

  const previousCrops = [
    'Cotton (Bt Hybrid)',
    'Paddy (Rice)',
    'Maize (Corn)',
    'Wheat',
    'Soybean',
    'Redgram (Pigeonpea)',
    'Bengal Gram (Chickpea)',
    'Sugarcane',
    'Chili / Turmeric'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await runCropRecommendation(formData);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                ICAR + PAU Federated ML Model
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              AI Crop & Yield Recommendation Engine
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Precision agro-climatic intelligence computing optimal crop selection, seed varieties, split fertilizer schedules, and market gross yield forecasts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-white/10">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-400" />
            Input Farm & Soil Parameters
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Geo Location */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">State (రాష్ట్రం)</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                >
                  {indianStates.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">District</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Soil Type & Previous Crop */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Soil Type</label>
                <select
                  value={formData.soilType}
                  onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                >
                  {soilTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Previous Season Crop</label>
                <select
                  value={formData.previousCrop}
                  onChange={(e) => setFormData({ ...formData, previousCrop: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                >
                  {previousCrops.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Chemical Properties: pH & Organic Carbon */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between text-slate-400 font-semibold mb-1">
                  <span>Soil pH ({formData.ph})</span>
                  <span className="text-emerald-400">Neutral</span>
                </div>
                <input
                  type="range"
                  min="4.5"
                  max="9.0"
                  step="0.1"
                  value={formData.ph}
                  onChange={(e) => setFormData({ ...formData, ph: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 font-semibold mb-1">
                  <span>Org Carbon ({formData.organicCarbon}%)</span>
                  <span className="text-emerald-400">Medium</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1.5"
                  step="0.05"
                  value={formData.organicCarbon}
                  onChange={(e) => setFormData({ ...formData, organicCarbon: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* NPK Nutrients Sliders */}
            <div className="space-y-2 p-3 rounded-2xl bg-slate-900/60 border border-white/5">
              <span className="font-bold text-slate-300 block mb-2">NPK Macronutrients (kg/ha)</span>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Nitrogen (N): {formData.nitrogen} kg/ha</span>
                  <input
                    type="range"
                    min="50"
                    max="450"
                    value={formData.nitrogen}
                    onChange={(e) => setFormData({ ...formData, nitrogen: parseInt(e.target.value) })}
                    className="w-36 accent-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Phosphorus (P): {formData.phosphorus} kg/ha</span>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={formData.phosphorus}
                    onChange={(e) => setFormData({ ...formData, phosphorus: parseInt(e.target.value) })}
                    className="w-36 accent-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Potassium (K): {formData.potassium} kg/ha</span>
                  <input
                    type="range"
                    min="80"
                    max="500"
                    value={formData.potassium}
                    onChange={(e) => setFormData({ ...formData, potassium: parseInt(e.target.value) })}
                    className="w-36 accent-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Moisture & Rainfall */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Moisture (%)</label>
                <input
                  type="number"
                  value={formData.moisture}
                  onChange={(e) => setFormData({ ...formData, moisture: parseFloat(e.target.value) })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Avg Rainfall (mm)</label>
                <input
                  type="number"
                  value={formData.rainfall}
                  onChange={(e) => setFormData({ ...formData, rainfall: parseFloat(e.target.value) })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-2 text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all mt-4"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Running AI Agronomic Model...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Optimal Crop Recommendation</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* AI Recommendation Output Card (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {lastRecommendation ? (
            <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 border border-emerald-500/40 relative space-y-6 animate-fadeIn">
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {lastRecommendation.cropCategory}
                  </span>
                  <h3 className="text-2xl font-black font-display text-white mt-1">
                    {lastRecommendation.recommendedCrop}
                  </h3>
                  <p className="text-xs text-slate-300 font-mono mt-0.5">
                    Recommended Seed: <span className="text-emerald-400 font-bold">{lastRecommendation.seedVariety}</span>
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-slate-400">Confidence Match</div>
                  <span className="text-2xl font-black text-emerald-400 font-display">
                    {lastRecommendation.confidenceScore}%
                  </span>
                </div>
              </div>

              {/* KPI Triplet */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Expected Yield</span>
                  </div>
                  <p className="text-lg font-black text-white font-display">
                    {lastRecommendation.expectedYieldQuintalsPerAcre} <span className="text-xs font-normal text-slate-400">Qtl / Acre</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Market MSP Price</span>
                  </div>
                  <p className="text-lg font-black text-cyan-300 font-display">
                    {lastRecommendation.marketPriceRangePerQuintal}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Duration & Sowing</span>
                  </div>
                  <p className="text-lg font-black text-white font-display">
                    {lastRecommendation.growthDurationDays} <span className="text-xs font-normal text-slate-400">Days</span>
                  </p>
                </div>
              </div>

              {/* Fertilizer Schedule */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-emerald-400" />
                  Recommended Fertilizer & Nutrient Application Timeline
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {lastRecommendation.fertilizerSchedule.map((f, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-slate-900/40 border border-white/5 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-300">{f.stage}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{f.dayRange}</span>
                      </div>
                      <p className="text-slate-200 text-[11px]">{f.fertilizer}</p>
                      <span className="text-[10px] text-slate-400 font-semibold">{f.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart Irrigation Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  Smart Irrigation Schedule (AWD Drip Protocol)
                </h4>
                <div className="space-y-2 text-xs">
                  {lastRecommendation.irrigationSchedule.map((ir, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-900/40 border border-white/5 flex items-center justify-between">
                      <span className="text-slate-300 font-medium">{ir.stage}</span>
                      <div className="flex items-center gap-3 font-mono text-[11px]">
                        <span className="text-cyan-400">{ir.frequency}</span>
                        <span className="text-slate-400">{ir.waterDepthCm} cm depth</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regenerative Advice */}
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Regenerative Farming & Direct Benefit Transfer (DBT) Action
                </span>
                <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                  {lastRecommendation.regenerativeAdvice.map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-12 border border-white/10 flex flex-col items-center justify-center text-center text-slate-400 space-y-3">
              <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-400">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-white">No Recommendation Generated Yet</h3>
              <p className="text-xs max-w-md">
                Configure your farm's state, soil profile, and previous crop on the left, then click <strong>"Generate Optimal Crop Recommendation"</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
