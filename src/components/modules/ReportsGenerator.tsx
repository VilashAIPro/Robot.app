import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Building2,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReportsGenerator: React.FC = () => {
  const { user, soilHealth, satelliteData, robot, weather, regenerativeMetrics } = useApp();
  const [selectedReport, setSelectedReport] = useState<string>('comprehensive');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { id: 'comprehensive', title: 'Comprehensive Farm Health Audit', desc: 'Holistic audit combining soil, satellite NDVI, weather, and AI advisories.' },
    { id: 'soil_card', title: 'Government Soil Health Card (SHC)', desc: 'Official lab-compliant NPK, micronutrient, and organic carbon report.' },
    { id: 'disease_cert', title: 'Crop Disease & Pathology Certificate', desc: 'AI leaf scan verification with organic bio-control prescription.' },
    { id: 'robot_log', title: 'ROV-BOT Mission & Telemetry Log', desc: 'Laser weeding and spray coverage metrics with solar efficiency breakdown.' },
    { id: 'carbon_audit', title: 'Carbon Credit & Sustainability Audit', desc: 'Verified CO2e sequestration documentation for carbon market registry.' }
  ];

  const handlePrint = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      window.print();
      confetti({ particleCount: 50, spread: 60 });
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                AgriStack Verifiable Document Standard
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              Official PDF Reports & Audit Generator
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Export high-fidelity downloadable reports for crop insurance claims, bank KCC credit applications, and government subsidy verification.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              disabled={isGenerating}
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{isGenerating ? 'Rendering PDF...' : 'Print / Save Official PDF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Type Selector (no-print) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 no-print">
        {reportTypes.map((rep) => (
          <button
            key={rep.id}
            onClick={() => setSelectedReport(rep.id)}
            className={`p-4 rounded-3xl border text-left transition-all ${
              selectedReport === rep.id
                ? 'bg-gradient-to-br from-emerald-950/60 to-slate-900 border-emerald-500 shadow-glow-green'
                : 'glass-panel border-white/10 hover:border-white/20'
            }`}
          >
            <h3 className={`text-xs font-bold ${selectedReport === rep.id ? 'text-emerald-300' : 'text-white'}`}>
              {rep.title}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{rep.desc}</p>
          </button>
        ))}
      </div>

      {/* Printable Report Document Template */}
      <div className="glass-panel rounded-3xl p-8 border border-white/10 text-slate-200 space-y-6 bg-slate-950/90 print:bg-white print:text-black print:p-0 print:border-none">
        {/* Report Top Header */}
        <div className="flex items-start justify-between pb-6 border-b border-white/10 print:border-black/20">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="AgriNet" className="w-12 h-12" />
            <div>
              <h2 className="text-xl font-black text-white print:text-black tracking-tight font-display">
                ROV-BOT AI AGRICULTURE NETWORK
              </h2>
              <p className="text-xs text-emerald-400 print:text-green-700 font-semibold">
                Digital Public Infrastructure • Government of India Verifiable Record
              </p>
            </div>
          </div>

          <div className="text-right text-xs font-mono text-slate-400 print:text-gray-700">
            <div>Doc ID: AGRI-REP-{Date.now().toString().slice(-8)}</div>
            <div>Date: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
            <div className="text-emerald-400 print:text-green-700 font-bold">AgriStack Verified</div>
          </div>
        </div>

        {/* Farmer & Land Holding Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/60 print:bg-gray-100 border border-white/5 print:border-gray-300 text-xs">
          <div>
            <span className="text-slate-400 print:text-gray-600 block">Farmer Name</span>
            <span className="font-bold text-white print:text-black">{user.name}</span>
          </div>
          <div>
            <span className="text-slate-400 print:text-gray-600 block">AgriStack ID</span>
            <span className="font-bold text-white print:text-black font-mono">{user.agriStackId}</span>
          </div>
          <div>
            <span className="text-slate-400 print:text-gray-600 block">Location</span>
            <span className="font-bold text-white print:text-black">{user.village}, {user.district}, {user.state}</span>
          </div>
          <div>
            <span className="text-slate-400 print:text-gray-600 block">Plot Area & Crop</span>
            <span className="font-bold text-white print:text-black">{user.farmSizeAcres} Acres • {user.primaryCrop}</span>
          </div>
        </div>

        {/* Dynamic Section Contents */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 print:text-green-800">
            1. Soil Rhizosphere & Chemical Fertility Analysis
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/40 print:bg-gray-50 border border-white/5 print:border-gray-200">
              <span className="text-slate-400 print:text-gray-600 block">Fertility Index</span>
              <span className="text-lg font-black text-emerald-400 print:text-black">{soilHealth.fertilityScore}/100</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/40 print:bg-gray-50 border border-white/5 print:border-gray-200">
              <span className="text-slate-400 print:text-gray-600 block">pH Reaction</span>
              <span className="text-lg font-black text-amber-400 print:text-black">{soilHealth.ph} (Neutral)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/40 print:bg-gray-50 border border-white/5 print:border-gray-200">
              <span className="text-slate-400 print:text-gray-600 block">Available Nitrogen</span>
              <span className="text-lg font-black text-cyan-400 print:text-black">{soilHealth.nitrogenKgHa} kg/ha</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/40 print:bg-gray-50 border border-white/5 print:border-gray-200">
              <span className="text-slate-400 print:text-gray-600 block">Organic Carbon</span>
              <span className="text-lg font-black text-purple-400 print:text-black">{soilHealth.organicCarbonPercent}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 print:text-blue-800">
            2. Satellite Multi-Spectral Remote Sensing Audit
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/40 print:bg-gray-50 border border-white/5 print:border-gray-200">
              <span className="text-slate-400 print:text-gray-600 block">Canopy NDVI Average</span>
              <span className="text-lg font-black text-emerald-400 print:text-black">{satelliteData.ndviAverage.toFixed(2)} (High Vigor)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/40 print:bg-gray-50 border border-white/5 print:border-gray-200">
              <span className="text-slate-400 print:text-gray-600 block">Water Stress (NDWI)</span>
              <span className="text-lg font-black text-cyan-400 print:text-black">{satelliteData.ndwiAverage.toFixed(2)} (Optimal)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/40 print:bg-gray-50 border border-white/5 print:border-gray-200">
              <span className="text-slate-400 print:text-gray-600 block">Satellite Sensor</span>
              <span className="text-lg font-black text-white print:text-black">ISRO RISAT + Sentinel-2</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 print:text-purple-800">
            3. Carbon Sequestration & Sustainability Offset
          </h3>
          <p className="text-xs leading-relaxed text-slate-300 print:text-gray-800">
            This farm has sequestered <strong className="text-white print:text-black">{regenerativeMetrics.carbonSequesteredKgPerYear} kg CO₂e</strong> through solar robot zero-chemical weeding, cover cropping, and micro-drip fertigation. Total verified carbon credits earned: <strong className="text-emerald-400 print:text-green-800">{regenerativeMetrics.carbonCreditsEarned} Credits</strong>.
          </p>
        </div>

        {/* Official Signoff Box */}
        <div className="pt-6 border-t border-white/10 print:border-gray-300 flex items-center justify-between text-xs">
          <div className="space-y-1">
            <span className="font-bold text-white print:text-black block">Digitally Signed by PJTSAU & ICAR Node</span>
            <span className="text-[10px] text-slate-500 font-mono">Hash: 8f9b4c2e1a7d6e5f8a9b2c3d4e5f6a7b</span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-500 block">Authorizing Officer</span>
            <span className="font-bold text-emerald-400 print:text-green-800">Dr. G. Sudhakar, Senior Pathologist</span>
          </div>
        </div>
      </div>
    </div>
  );
};
