import React, { useEffect } from 'react';
import { ArrowLeft, Compass, Layers, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { DestinationConfig } from './types';

interface DestinationViewProps {
  destination: DestinationConfig;
  onReturnHome: () => void;
}

export const DestinationView: React.FC<DestinationViewProps> = ({
  destination,
  onReturnHome,
}) => {
  // Listen for Escape key to return to galaxy
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onReturnHome();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onReturnHome]);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-12 pointer-events-none animate-fadeIn">
      {/* Subtle backdrop gradient to enhance readability while keeping the 3D cluster visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-auto" />

      {/* Main Glassmorphic Container */}
      <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto pointer-events-auto bg-black/60 backdrop-blur-xl border border-white/15 rounded-2xl p-6 md:p-10 shadow-2xl custom-scrollbar">
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          {/* Return Button */}
          <button
            onClick={onReturnHome}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-xs font-mono tracking-wider text-slate-200 transition-all duration-300 shadow-md hover:shadow-cyan-500/10 active:scale-95 cursor-pointer"
            aria-label="Return to Galaxy"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>RETURN TO GALAXY</span>
            <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[9px] bg-white/10 rounded border border-white/20 text-slate-400">
              ESC
            </kbd>
          </button>

          {/* Architectural Multiverse Hierarchy Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono tracking-widest text-slate-400">
            <Compass className="w-3.5 h-3.5 text-slate-500" />
            <span>GALAXY</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300 font-medium">REGION: {destination.name}</span>
            <span className="text-slate-600">/</span>
            <span
              className="px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase border"
              style={{
                color: destination.color,
                borderColor: `${destination.color}44`,
                backgroundColor: `${destination.color}11`,
              }}
            >
              {destination.sectorCode}
            </span>
          </div>
        </div>

        {/* Section Identity & Title */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-slate-400">
            <Sparkles className="w-4 h-4" style={{ color: destination.color }} />
            <span>SECTOR DESTINATION DESTINED ORBIT</span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold tracking-tight font-sans text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.2)]"
          >
            {destination.name}
          </h1>

          <p className="text-base md:text-lg text-slate-300 font-sans font-light max-w-2xl">
            {destination.subtitle}
          </p>

          <p className="text-xs md:text-sm text-slate-400 font-sans leading-relaxed max-w-3xl pt-2">
            {destination.description}
          </p>
        </div>

        {/* Live Metrics Row */}
        {destination.stats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
            {destination.stats.map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-1"
              >
                <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                  {stat.label}
                </span>
                <span
                  className="text-lg md:text-xl font-bold font-mono tracking-tight"
                  style={{ color: destination.color }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Sub-node Architecture Showcase (Expandable Multiverse Skeleton) */}
        <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-300">
              <Layers className="w-3.5 h-3.5" style={{ color: destination.color }} />
              <span>SPATIAL SUB-SYSTEMS & EXPANSION SLOTS</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              ARCHITECTURAL SKELETON
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {destination.children && destination.children.length > 0 ? (
              destination.children.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 transition-all flex items-center justify-between group cursor-default"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors">
                      {sub.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      TYPE: {sub.type.toUpperCase()} • {sub.route}
                    </span>
                  </div>
                  {sub.previewTag && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 border border-white/10">
                      {sub.previewTag}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-2 p-4 text-center text-xs font-mono text-slate-500 border border-dashed border-white/10 rounded-xl">
                Pending star systems to be mapped in future expansion
              </div>
            )}
          </div>
        </div>

        {/* Sector Tags & Status Footnote */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>ROUTE: {destination.route}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>PERMANENT GALAXY ANCHOR VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
