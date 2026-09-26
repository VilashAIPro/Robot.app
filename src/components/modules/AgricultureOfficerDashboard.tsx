import React, { useState } from 'react';
import {
  ClipboardList,
  Users,
  AlertTriangle,
  Send,
  Calendar,
  CheckCircle2,
  MapPin,
  Bot,
  TestTube2,
  Sparkles,
  Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AgricultureOfficerDashboard: React.FC = () => {
  const [broadcastText, setBroadcastText] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState('Warangal Central Cluster');

  const pendingVisits = [
    { farmer: 'Rameshwar Patel', village: 'Dharmasagar', crop: 'Cotton (4.8 Ac)', reason: 'Early Blight Foliar Scan Verification', date: 'Today, 03:00 PM', priority: 'High' },
    { farmer: 'K. Venkataiah', village: 'Geesugonda', crop: 'Paddy (3.2 Ac)', reason: 'Sub-soil Salinity Test Approval', date: 'Tomorrow, 10:30 AM', priority: 'Medium' },
    { farmer: 'M. Srilatha', village: 'Atmakur', crop: 'Chili (2.5 Ac)', reason: 'Whitefly Trap Density Inspection', date: '28 Sep, 02:00 PM', priority: 'High' }
  ];

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    setBroadcastSent(true);
    confetti({ particleCount: 50, spread: 60 });
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastText('');
    }, 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <ClipboardList className="w-3.5 h-3.5" />
                Department of Agriculture • Officer Field Console
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              Agriculture Officer (AO) Portal & Field Operations
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Cluster management for 1,420 registered farmers. Broadcast village-level pest advisories, verify soil test cards, and assign drone & robot field visits.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 text-xs font-mono text-emerald-400">
            Officer ID: AO-TS-WRG-042 (Dr. G. Sudhakar)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Broadcast Mass Advisory to Cluster (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Send className="w-4 h-4 text-emerald-400" />
            Broadcast Urgent Advisory to Village Clusters
          </h2>

          <form onSubmit={handleBroadcast} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Target Village Cluster</label>
              <select
                value={selectedCluster}
                onChange={(e) => setSelectedCluster(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="Warangal Central Cluster">Warangal Central Cluster (480 Farmers)</option>
                <option value="Dharmasagar Gram Panchayat">Dharmasagar Gram Panchayat (310 Farmers)</option>
                <option value="Hanamkonda North Mandals">Hanamkonda North Mandals (630 Farmers)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Advisory Message (SMS + WhatsApp + Voice Push)</label>
              <textarea
                rows={4}
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
                placeholder="E.g., Whitefly pest detected in nearby plots. Install yellow sticky traps and spray Neem oil 10,000 ppm at dawn..."
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={broadcastSent || !broadcastText.trim()}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
            >
              {broadcastSent ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Advisory Dispatched to 480 Farmers!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send WhatsApp & SMS Broadcast</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Scheduled Field Inspections (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              Assigned Field Inspections & Soil Sample Audits
            </h3>
            <span className="text-xs text-slate-400 font-mono">3 Scheduled Today</span>
          </div>

          <div className="space-y-3">
            {pendingVisits.map((v, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-emerald-500/30 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{v.farmer}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {v.village}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        v.priority === 'High'
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {v.priority} Priority
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs">{v.reason}</p>
                  <span className="text-[11px] text-emerald-400 font-mono">{v.crop} • {v.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-white/10">
                    Verify Soil Card
                  </button>
                  <button className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm">
                    Mark Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
