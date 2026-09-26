import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, IndianLanguage } from '../../types';
import {
  Bell,
  AlertTriangle,
  Globe,
  Radio,
  ShoppingBag,
  Shield,
  Activity,
  CheckCircle2,
  X,
  Volume2
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    user,
    setUserRole,
    language,
    setLanguage,
    isSimulating,
    setIsSimulating,
    emergencySosActive,
    triggerEmergencySos,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    cart,
    setActiveTab
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const languages: { code: IndianLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' }
  ];

  const roles: { role: UserRole; label: string; icon: string }[] = [
    { role: 'farmer', label: 'Farmer', icon: '🌾' },
    { role: 'officer', label: 'Agri Officer', icon: '📋' },
    { role: 'government', label: 'Govt GIS', icon: '🏛️' },
    { role: 'admin', label: 'DPI Admin', icon: '⚡' }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 lg:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <img
                src="/logo.svg"
                alt="AgriNet Logo"
                className="w-10 h-10 transform group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl lg:text-2xl text-white tracking-tight">
                  ROV-BOT <span className="text-emerald-400 font-extrabold">AgriNet</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  DPI 2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden md:block">
                Digital Public Infrastructure for India's Small & Marginal Farmers
              </p>
            </div>
          </div>
        </div>

        {/* Center: Role Switcher Chips */}
        <div className="hidden xl:flex items-center bg-slate-900/80 p-1 rounded-xl border border-white/10">
          {roles.map((r) => (
            <button
              key={r.role}
              onClick={() => setUserRole(r.role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                user.role === r.role
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{r.icon}</span>
              <span>{r.label}</span>
            </button>
          ))}
        </div>

        {/* Right: Actions & Tools */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Live Simulator Toggle */}
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isSimulating
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Toggle real-time robot & sensor simulation"
          >
            <Activity className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin-slow' : ''}`} />
            <span>{isSimulating ? 'Live Telemetry' : 'Simulator Paused'}</span>
          </button>

          {/* Emergency SOS Button */}
          <button
            onClick={triggerEmergencySos}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              emergencySosActive
                ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/50'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-600 hover:text-white'
            }`}
            title="Emergency Stop / Broadcast SOS to KVK & Police"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="hidden md:inline">Emergency SOS</span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/40 text-xs font-medium text-slate-200 transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="uppercase font-bold">{language}</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-48 glass-panel-glow rounded-xl p-2 border border-white/10 shadow-2xl z-50">
                <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">
                  Select Language (భాష)
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      language === l.code
                        ? 'bg-emerald-600 text-white font-semibold'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[11px] opacity-75">{l.native}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Marketplace Cart Button */}
          <button
            onClick={() => setActiveTab('marketplace')}
            className="relative p-2 rounded-xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/40 text-slate-300 transition-all"
            title="View Agri-Marketplace Cart"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            {cartTotalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center">
                {cartTotalItems}
              </span>
            )}
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/40 text-slate-300 transition-all"
            >
              <Bell className="w-4 h-4 text-emerald-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white font-black text-[10px] rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel-glow rounded-2xl p-4 border border-white/10 shadow-2xl z-50">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-sm text-white">AI Alerts & Notifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearAllNotifications}
                      className="text-[11px] text-slate-400 hover:text-white"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">No new notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationAsRead(n.id)}
                        className={`p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                          n.read
                            ? 'bg-slate-900/40 border-white/5 opacity-70'
                            : 'bg-emerald-950/30 border-emerald-500/30 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            {n.priority === 'critical' ? '🚨' : n.priority === 'high' ? '⚠️' : '📢'}
                            {n.title}
                          </span>
                          <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      setActiveTab('notification_center' as any);
                    }}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    View Full Notification Center →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Chip */}
          <div
            onClick={() => setActiveTab('agristack_qr')}
            className="flex items-center gap-2.5 pl-2 cursor-pointer group"
            title="View AgriStack ID & Farmer Profile"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-xl object-cover border border-emerald-500/40 group-hover:border-emerald-400"
            />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                {user.name}
              </p>
              <p className="text-[10px] font-mono text-emerald-400">
                {user.agriStackId.slice(0, 14)}...
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
