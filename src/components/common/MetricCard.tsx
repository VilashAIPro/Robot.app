import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  subtext?: string;
  glowColor?: 'green' | 'blue' | 'cyan' | 'amber';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  change,
  isPositive,
  icon: Icon,
  iconColor = 'text-emerald-400',
  iconBg = 'bg-emerald-500/10',
  subtext,
  glowColor = 'green',
  onClick
}) => {
  const glowClasses = {
    green: 'hover:border-emerald-500/40 hover:shadow-glow-green',
    blue: 'hover:border-blue-500/40 hover:shadow-glow-blue',
    cyan: 'hover:border-cyan-500/40 hover:shadow-glow-cyan',
    amber: 'hover:border-amber-500/40 hover:shadow-amber-500/20'
  };

  return (
    <div
      onClick={onClick}
      className={`glass-panel rounded-2xl p-5 border border-white/10 transition-all duration-300 ${
        onClick ? 'cursor-pointer' : ''
      } ${glowClasses[glowColor]} relative overflow-hidden group`}
    >
      {/* Subtle background ambient light */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all duration-500"></div>

      <div className="flex items-start justify-between relative z-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className="flex items-baseline gap-1 mt-1.5">
            <span className="text-2xl lg:text-3xl font-black font-display text-white tracking-tight">
              {value}
            </span>
            {unit && <span className="text-sm font-medium text-slate-400">{unit}</span>}
          </div>
        </div>

        <div className={`p-3 rounded-xl border border-white/10 ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5 relative z-10">
        <span>{subtext}</span>
        {change && (
          <span
            className={`font-semibold px-2 py-0.5 rounded-full text-[11px] ${
              isPositive
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
};
