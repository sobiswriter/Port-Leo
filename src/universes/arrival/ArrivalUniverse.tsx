import React, { useState } from 'react';
import { UniverseId } from '../../types/universe';
import { UNIVERSES_META, ABOUT_DOSSIER } from '../../data/portfolioData';
import { Compass, ArrowRight, Globe, Terminal, Waves, Sliders } from 'lucide-react';
import PatternWaves, { PatternWavePreset } from '../../components/react-bits/PatternWaves';

interface ArrivalUniverseProps {
  onTravelTo: (universeId: UniverseId) => void;
}

export const ArrivalUniverse: React.FC<ArrivalUniverseProps> = ({ onTravelTo }) => {
  const currentMeta = UNIVERSES_META.find((u) => u.id === 'arrival')!;
  const otherUniverses = UNIVERSES_META.filter((u) => u.id !== 'arrival');

  // Interactive Wave Preset state
  const [activePreset, setActivePreset] = useState<PatternWavePreset>('silk');
  const [waveSpeed, setWaveSpeed] = useState<number>(0.35);

  const presets: { id: PatternWavePreset; label: string }[] = [
    { id: 'silk', label: 'Silk' },
    { id: 'lines', label: 'Contour Lines' },
    { id: 'terminal', label: 'Terminal Glyphs' },
    { id: 'mesh', label: 'Matrix Mesh' },
    { id: 'ocean', label: 'Swell' },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-neutral-100 flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-hidden selection:bg-neutral-800">
      {/* 
        ========================================================================
        PatternWaves WebGL Interactive Surface
        Spans the entire Arrival universe viewport with interactive cursor ripple
        ========================================================================
      */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <PatternWaves
          preset={activePreset}
          color="#d4d4d4"
          backgroundColor="#050505"
          speed={waveSpeed}
          fade="none"
          opacity={0.65}
          interactive={true}
          cursorSize={70}
          cursorStrength={0.7}
          intro={true}
        />
        {/* Subtle radial scrim to preserve text legibility while keeping waves vivid everywhere */}
        <div className="absolute inset-0 bg-radial-[at_50%_40%] from-transparent via-[#050505]/40 to-[#050505]/80 pointer-events-none" />
      </div>

      {/* Structural Stage Border Frame */}
      <div className="absolute inset-4 sm:inset-6 pointer-events-none border border-neutral-800/60 rounded-lg z-10" />

      {/* Top Station Readout / Architectural Header */}
      <header className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs tracking-wider text-neutral-300 uppercase">
            Multiverse Arrival Gateway · Stage 00
          </span>
        </div>

        {/* Ambient PatternWaves Mode Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 mr-1">
            <Waves className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline">Wave Surface:</span>
          </div>
          <div className="flex items-center gap-1 bg-neutral-900/80 border border-neutral-800 p-0.5 rounded-md backdrop-blur-md">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePreset(p.id)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  activePreset === p.id
                    ? 'bg-neutral-100 text-neutral-950 font-bold shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* System Coordinates */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-neutral-400" />
            <span>{ABOUT_DOSSIER.coordinates}</span>
          </span>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span>{ABOUT_DOSSIER.timezone}</span>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span className="text-neutral-200">8 Standalone Realities</span>
        </div>
      </header>

      {/* Center Stage: Monolith & Core Presence */}
      <main className="relative z-10 my-auto py-12 max-w-5xl">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-neutral-400 text-xs sm:text-sm font-mono tracking-widest uppercase">
            <span>Identity Dossier</span>
            <span aria-hidden="true" className="text-neutral-600">/</span>
            <span className="text-neutral-300">{ABOUT_DOSSIER.role}</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight font-display text-neutral-50 text-balance drop-shadow-md">
            Sobi
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl text-neutral-300 font-light max-w-3xl leading-relaxed text-balance">
            Architecting high-throughput distributed engines, autonomous multi-agent consensus, and low-latency cognitive infrastructure.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-400">
            <span className="text-neutral-200 font-semibold font-mono uppercase text-xs">Core Focus:</span>
            <span>Distributed Systems</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>Foundation Model Inference</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>Kernel Telemetry</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>Spatial Interfaces</span>
          </div>

          {/* Quick Manifesto Quote */}
          <div className="pt-6 border-l-2 border-neutral-700/80 pl-4 sm:pl-6 max-w-2xl bg-neutral-950/40 backdrop-blur-xs py-2 rounded-r-md">
            <p className="text-sm sm:text-base italic text-neutral-300 leading-relaxed">
              &ldquo;{ABOUT_DOSSIER.axioms[0].statement}&rdquo;
            </p>
            <span className="text-xs font-mono text-neutral-400 mt-1 block">
              — Axiom 01 · Engineering Philosophy
            </span>
          </div>
        </div>

        {/* Portal Gateway Directory / Structural Navigation */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-mono tracking-widest uppercase text-neutral-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-neutral-300" />
              Multiverse Portal Nodes (Select to Enter)
            </h2>
            <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
              Independent World Containers
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {otherUniverses.map((uni) => (
              <button
                key={uni.id}
                onClick={() => onTravelTo(uni.id)}
                className="group text-left p-4 rounded-lg bg-neutral-950/70 hover:bg-neutral-900/90 border border-neutral-800 hover:border-neutral-600 backdrop-blur-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-neutral-200 mb-1">
                  <span>UNIVERSE {uni.indexStr}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-base font-semibold text-neutral-200 group-hover:text-neutral-50">
                  {uni.name}
                </div>
                <div className="text-xs text-neutral-400 mt-1 line-clamp-1">
                  {uni.tagline}
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Stage Footer & Status Readout */}
      <footer className="relative z-10 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-neutral-400" />
          <span>Stage 00/07: Arrival Monolith</span>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span>Surface: Interactive Dynamic Waves (WebGL)</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onTravelTo('builder')}
            className="text-neutral-200 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
          >
            <span>Proceed to Universe 01 (Builder)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </div>
  );
};

