import React, { useState } from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import {
  LayoutDashboard,
  Sparkles,
  Satellite,
  CloudSun,
  TestTube2,
  ScanEye,
  Bot,
  Route,
  Activity,
  Mic,
  Leaf,
  ShoppingBag,
  Building2,
  ClipboardList,
  Cpu,
  FileText,
  BarChart3,
  Plane,
  Users,
  QrCode,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, user } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navGroups: {
    category: string;
    items: { id: ActiveTab; label: string; icon: any; badge?: string }[];
  }[] = [
    {
      category: 'Farmer Operations',
      items: [
        { id: 'dashboard', label: 'Farmer Dashboard', icon: LayoutDashboard },
        { id: 'crop_recommendation', label: 'AI Crop Advisor', icon: Sparkles, badge: 'AI' },
        { id: 'disease_diagnosis', label: 'Disease Scanner', icon: ScanEye, badge: 'Vision' },
        { id: 'weather_forecast', label: 'Weather AI', icon: CloudSun },
        { id: 'soil_health', label: 'Soil Intelligence', icon: TestTube2 }
      ]
    },
    {
      category: 'Autonomous Robotics & IoT',
      items: [
        { id: 'robot_cockpit', label: 'ROV-BOT Digital Twin', icon: Bot, badge: 'Live' },
        { id: 'mission_planner', label: 'Autonomous Mission Planner', icon: Route },
        { id: 'iot_telemetry', label: 'Live IoT Telemetry', icon: Activity },
        { id: 'drone_fleet', label: 'Drone & Fleet Swarm', icon: Plane }
      ]
    },
    {
      category: 'Earth & Satellite Intelligence',
      items: [
        { id: 'satellite_intelligence', label: 'Satellite NDVI & Maps', icon: Satellite },
        { id: 'analytics', label: 'Advanced Analytics', icon: BarChart3 }
      ]
    },
    {
      category: 'Digital Public Infrastructure',
      items: [
        { id: 'voice_assistant', label: 'Kisan Vani AI Voice', icon: Mic, badge: '7 Lang' },
        { id: 'regenerative_advisor', label: 'Regenerative & Carbon', icon: Leaf },
        { id: 'marketplace', label: 'Agri Marketplace & KVK', icon: ShoppingBag },
        { id: 'dpi_registry', label: 'DPI State AI Registry', icon: Cpu, badge: 'DPI' }
      ]
    },
    {
      category: 'Governance & Identity',
      items: [
        { id: 'government_dashboard', label: 'Government GIS Dashboard', icon: Building2 },
        { id: 'officer_dashboard', label: 'Agri Officer Portal', icon: ClipboardList },
        { id: 'community_forum', label: 'Krishi Community Forum', icon: Users },
        { id: 'agristack_qr', label: 'AgriStack QR & ID', icon: QrCode },
        { id: 'reports', label: 'Downloadable Reports', icon: FileText }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-2xl shadow-emerald-600/50 flex items-center justify-center border border-emerald-400/40"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-72 glass-panel border-r border-white/10 z-40 flex flex-col transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Navigation Item Scrollable List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                {group.category}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-600/90 to-emerald-700 text-white font-bold shadow-md shadow-emerald-950/50 border border-emerald-500/40'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-1.5 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-800/80 text-emerald-400 group-hover:bg-emerald-500/10'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="truncate">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide ${
                              isActive
                                ? 'bg-emerald-950 text-emerald-300'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            isActive
                              ? 'text-white translate-x-0.5'
                              : 'text-slate-600 group-hover:text-slate-400'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Status Card */}
        <div className="p-3 border-t border-white/10 bg-slate-900/50">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-slate-400 text-[11px]">AgriStack Mesh</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-400 font-bold">2.4 Gbps / 4ms</span>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </>
  );
};
