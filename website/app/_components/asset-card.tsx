// website/app/_components/asset-card.tsx
"use client"
import React from "react";

interface AssetCardProps {
  metric: {
    value: string;
    label: string;
  };
  title: string;
  description: string;
  actionText: string;
  gridSpanClass?: string;
  accentColor?: string;
}

export function AssetCard({
  metric,
  title,
  description,
  actionText,
  gridSpanClass,
  accentColor = "var(--primary)",
}: AssetCardProps) {
  return (
    <div className={`group relative rounded-3xl p-6 bg-[var(--card)] border border-[var(--outline)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between min-h-[380px] hover:border-[var(--primary)]/30 hover:-translate-y-1 ${gridSpanClass}`}>
      {/* Background Interactive Hover Token State */}
      <div className="absolute inset-0 bg-[var(--state-hover)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

      {/* Metric at Top Left */}
      <div className="relative z-10 flex flex-col">
        <span className="text-5xl font-black tracking-tighter text-[var(--on-bg-high)]">
          {metric.value}
        </span>
        <span className="mt-1 text-xs font-mono uppercase tracking-wider" style={{ color: accentColor }}>
          {metric.label}
        </span>
      </div>

      {/* Main Content */}
      <div className="mt-12 relative z-10 flex-1">
        <h3 className="text-2xl font-semibold text-[var(--on-bg-high)] mb-2">
          {title}
        </h3>
        <p className="text-sm text-[var(--on-bg-medium)] font-light leading-relaxed max-w-md">
          {description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-8 pt-4 border-t border-[var(--outline)] flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity duration-500 relative z-10">
        <span className="text-xs uppercase font-mono tracking-wider text-[var(--on-bg-high)]">
          {actionText}
        </span>
        <span className="text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          ↗
        </span>
      </div>
    </div>
  );
}