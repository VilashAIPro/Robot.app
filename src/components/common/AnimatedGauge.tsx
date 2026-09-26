import React from 'react';

interface AnimatedGaugeProps {
  value: number; // 0 to 100
  max?: number;
  label: string;
  unit?: string;
  size?: number;
  color?: string;
  subtext?: string;
}

export const AnimatedGauge: React.FC<AnimatedGaugeProps> = ({
  value,
  max = 100,
  label,
  unit = '%',
  size = 140,
  color = '#16a34a',
  subtext
}) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min(Math.max(value / max, 0), 1);
  const strokeDashoffset = circumference - percentage * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div style={{ width: size, height: size }} className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-black font-display text-white tracking-tight">
            {value}
            <span className="text-xs font-normal text-slate-400 ml-0.5">{unit}</span>
          </span>
          <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-400">
            {label}
          </span>
        </div>
      </div>
      {subtext && <p className="text-xs text-slate-400 mt-1 text-center">{subtext}</p>}
    </div>
  );
};
