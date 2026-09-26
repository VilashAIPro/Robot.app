import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  AlertTriangle,
  CloudRain,
  Bot,
  TestTube2,
  DollarSign,
  CheckCircle2,
  Trash2,
  Filter
} from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const { notifications, markNotificationAsRead, clearAllNotifications } = useApp();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredNotifs =
    filterType === 'all'
      ? notifications
      : notifications.filter((n) => n.type === filterType);

  const getIcon = (type: string) => {
    switch (type) {
      case 'weather': return CloudRain;
      case 'pest': return AlertTriangle;
      case 'robot': return Bot;
      case 'soil': return TestTube2;
      case 'scheme': return DollarSign;
      default: return Bell;
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5" />
                Real-Time Push Notification Engine
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              AI Alert & Notification Hub
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Automated warnings for thunderstorms, pest incursions, robot swarm milestones, and direct DBT subsidy credits.
            </p>
          </div>

          <button
            onClick={clearAllNotifications}
            className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span>Clear All Alerts</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {['all', 'weather', 'pest', 'robot', 'soil', 'scheme'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-2xl font-bold uppercase tracking-wider transition-all ${
              filterType === type
                ? 'bg-emerald-600 text-white shadow-md'
                : 'glass-panel border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Timeline Notifications List */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Bell className="w-8 h-8 mx-auto text-slate-600" />
            <p className="text-sm font-bold text-white">No notifications in this category</p>
          </div>
        ) : (
          filteredNotifs.map((n) => {
            const Icon = getIcon(n.type);
            return (
              <div
                key={n.id}
                onClick={() => markNotificationAsRead(n.id)}
                className={`p-4 rounded-2xl border flex items-start justify-between gap-4 cursor-pointer transition-all ${
                  n.read
                    ? 'bg-slate-900/40 border-white/5 opacity-70'
                    : 'bg-emerald-950/20 border-emerald-500/30 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2.5 rounded-xl border mt-0.5 ${
                      n.priority === 'critical'
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                        : n.priority === 'high'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{n.title}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
                  </div>
                </div>

                {!n.read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
