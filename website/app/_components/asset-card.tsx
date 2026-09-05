"use client"
import React from "react";

interface AssetCardProps {
  indexLabel: string;
  badgeContent?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  actionText: string;
  gridSpanClass: string;
  sideControl?: React.ReactNode;
}

export function AssetCard({
  indexLabel,
  badgeContent,
  title,
  description,
  actionText,
  gridSpanClass,
  sideControl
}: AssetCardProps) {
  return (
    <div className={`group relative rounded-3xl p-6 bg-[var(--card)] border border-[var(--outline)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between min-h-[380px] hover:border-[var(--primary)]/30 hover:-translate-y-1 ${gridSpanClass}`}>
      {/* Background Interactive Hover Token State */}
      <div className="absolute inset-0 bg-[var(--state-hover)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
      {/* Index Label + Direction Indicator */}
      <div className="flex items-center justify-between relative z-10">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--on-bg-low)]">
          {indexLabel}
        </span>
        <span className="text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          ↗
        </span>
      </div>
      {/* Main Structural Context Block Layout */}
      <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10 flex-1">
        <div className="max-w-xl">
          {badgeContent && <div className="mb-3">{badgeContent}</div>}
          <h3 className="text-2xl font-semibold text-[var(--on-bg-high)] mb-2">
            {title}
          </h3>
          <p className="text-sm text-[var(--on-bg-medium)] font-light leading-relaxed">
            {description}
          </p>
        </div>
        {/* Separated Custom Right Side Controls Area */}
        {sideControl && (
          <div className="flex md:flex-col justify-between items-end md:h-32 shrink-0 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 border-[var(--outline)]">
            {sideControl}
          </div>
        )}
      </div>
      {/* Action Footer Indicator Row */}
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
