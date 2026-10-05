import React, { useState } from 'react';
import { UniverseId, ArsenalRing } from '../../types/universe';
import { ARSENAL_RINGS, UNIVERSES_META } from '../../data/portfolioData';
import { Cpu, Terminal, Shield, Wrench, CheckCircle, Grid, Sparkles } from 'lucide-react';
import PixelBlast, { PixelBlastVariant } from '../../components/react-bits/PixelBlast';

interface ArsenalUniverseProps {
  onTravelTo: (universeId: UniverseId) => void;
}

interface PixelTheme {
  id: string;
  label: string;
  color: string;
}

const PIXEL_THEMES: PixelTheme[] = [
  { id: 'phosphor', label: 'Phosphor Green', color: '#10B981' },
  { id: 'cyan', label: 'Matrix Cyan', color: '#06B6D4' },
  { id: 'amber', label: 'Silicon Amber', color: '#F59E0B' },
  { id: 'violet', label: 'Compacted Violet', color: '#A855F7' },
];

export const ArsenalUniverse: React.FC<ArsenalUniverseProps> = ({ onTravelTo }) => {
  const currentMeta = UNIVERSES_META.find((u) => u.id === 'arsenal')!;
  const [activeRingId, setActiveRingId] = useState<string>(ARSENAL_RINGS[0].id);

  // PixelBlast Interactive Controls
  const [pixelVariant, setPixelVariant] = useState<PixelBlastVariant>('diamond');
  const [themeId, setThemeId] = useState<string>('phosphor');

  const activeTheme = PIXEL_THEMES.find((t) => t.id === themeId) || PIXEL_THEMES[0];
  const activeRing: ArsenalRing =
    ARSENAL_RINGS.find((r) => r.id === activeRingId) || ARSENAL_RINGS[0];

  const variants: { id: PixelBlastVariant; label: string }[] = [
    { id: 'diamond', label: 'Diamond' },
    { id: 'square', label: 'Square' },
    { id: 'circle', label: 'Circle' },
    { id: 'triangle', label: 'Triangle' },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-neutral-100 flex flex-col p-6 sm:p-10 lg:p-12 overflow-hidden selection:bg-neutral-800">
      {/* 
        ========================================================================
        PixelBlast WebGL Dithered Matrix Surface
        Spans the entire Arsenal universe with interactive click shockwaves & liquid touch
        ========================================================================
      */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <PixelBlast
          variant={pixelVariant}
          pixelSize={5}
          color={activeTheme.color}
          patternScale={2.5}
          patternDensity={1.1}
          pixelSizeJitter={0.25}
          enableRipples={true}
          rippleSpeed={0.35}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={true}
          liquidStrength={0.08}
          liquidRadius={1.1}
          liquidWobbleSpeed={4.0}
          speed={0.45}
          edgeFade={0.2}
          transparent={true}
        />
        {/* Subtle radial scrim to preserve typography contrast while keeping dither matrix visible everywhere */}
        <div className="absolute inset-0 bg-radial-[at_50%_35%] from-transparent via-[#050505]/40 to-[#050505]/85 pointer-events-none" />
      </div>

      {/* Structural Stage Border Frame */}
      <div className="absolute inset-4 sm:inset-6 pointer-events-none border border-neutral-800/60 rounded-lg z-10" />

      {/* Header */}
      <header className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80 backdrop-blur-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>UNIVERSE 04</span>
            <span aria-hidden="true" className="text-neutral-700">/</span>
            <span className="text-neutral-300 font-semibold uppercase">{currentMeta.name}</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="text-neutral-400">{currentMeta.concept}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-display text-neutral-100">
            Capabilities, Tooling & Systems Topology
          </h1>
        </div>

        {/* PixelBlast Controls: Shape & Color */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Shape Selector */}
          <div className="flex items-center gap-1 bg-neutral-900/80 border border-neutral-800 p-0.5 rounded-md backdrop-blur-md">
            <span className="text-[11px] font-mono text-neutral-400 px-2 flex items-center gap-1">
              <Grid className="w-3 h-3 text-neutral-400" />
              <span className="hidden sm:inline">Pixel:</span>
            </span>
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setPixelVariant(v.id)}
                className={`px-2 py-1 text-xs font-mono rounded transition-colors ${
                  pixelVariant === v.id
                    ? 'bg-neutral-100 text-neutral-950 font-bold shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Theme Selector */}
          <div className="flex items-center gap-1 bg-neutral-900/80 border border-neutral-800 p-0.5 rounded-md backdrop-blur-md">
            {PIXEL_THEMES.map((th) => (
              <button
                key={th.id}
                onClick={() => setThemeId(th.id)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  themeId === th.id
                    ? 'bg-neutral-800 text-neutral-100 font-semibold border border-neutral-700'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
                }`}
              >
                <span className="w-2 h-2 rounded-full inline-block mr-1.5" style={{ backgroundColor: th.color }} />
                <span>{th.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Structural Stage: Systems Capability Matrix */}
      <main className="relative z-10 flex-1 py-8 space-y-8">
        {/* Ring Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ARSENAL_RINGS.map((ring, idx) => {
            const isActive = ring.id === activeRing.id;
            return (
              <button
                key={ring.id}
                onClick={() => setActiveRingId(ring.id)}
                className={`text-left p-4 rounded-lg border backdrop-blur-md transition-all ${
                  isActive
                    ? 'bg-neutral-900/90 border-neutral-500 text-neutral-100 shadow-md ring-1 ring-neutral-500/30'
                    : 'bg-neutral-950/70 border-neutral-800/80 text-neutral-400 hover:border-neutral-700 hover:bg-neutral-900/60'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1">
                  <span>RING 0{idx + 1}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-neutral-100" />}
                </div>
                <div className="text-sm font-semibold text-neutral-200">
                  {ring.title}
                </div>
                <div className="text-xs text-neutral-400 mt-1 line-clamp-1">
                  {ring.capabilities.length} Key Competencies
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Ring Blueprint Matrix */}
        <div className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800/80 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-neutral-800/80 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1">
              <span>ACTIVE ARCHITECTURAL TOPOLOGY</span>
              <span aria-hidden="true" className="text-neutral-700">/</span>
              <span className="text-neutral-300 font-semibold">{activeRing.id}</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-neutral-50">
              {activeRing.title}
            </h2>
            <p className="text-neutral-300 text-sm mt-1">
              {activeRing.subtitle}
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeRing.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="bg-neutral-900/60 border border-neutral-800/80 rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>CAPABILITY 0{idx + 1}</span>
                    <span className="text-neutral-200 font-semibold">{cap.depth}</span>
                  </div>

                  <h3 className="text-base font-semibold text-neutral-100 leading-snug">
                    {cap.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                {/* Primary Tools List (Unboxed metadata with separators) */}
                <div className="pt-3 border-t border-neutral-800/80 text-xs">
                  <span className="font-mono text-neutral-500 uppercase block mb-1.5">
                    Primary Toolchain:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5 text-neutral-300 font-mono text-xs">
                    {cap.primaryTools.map((tool) => (
                      <span key={tool} className="bg-neutral-950/80 border border-neutral-800 px-2 py-0.5 rounded text-neutral-200">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Engineering Tenet for Current Ring */}
          <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Standard Invariant: Zero unchecked allocations in critical loops</span>
            </div>
            <span>Click canvas for shockwave ripples</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400 backdrop-blur-xs">
        <div>
          <span>Arsenal Registry · Stage 04/07</span>
          <span aria-hidden="true" className="text-neutral-700"> · </span>
          <span>Surface: Interactive Pixel Blast Dither Matrix (Three.js)</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onTravelTo('research')}
            className="text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            ← 03 Research
          </button>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <button
            onClick={() => onTravelTo('journey')}
            className="text-neutral-200 hover:text-white transition-colors font-medium"
          >
            Enter 05 Journey →
          </button>
        </div>
      </footer>
    </div>
  );
};

