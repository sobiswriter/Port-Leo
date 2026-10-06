import React, { useState } from 'react';
import { UniverseId } from '../../types/universe';
import { UNIVERSES_META, ABOUT_DOSSIER } from '../../data/portfolioData';
import { Compass, ArrowUpRight, Waves, Radio, Terminal } from 'lucide-react';
import PatternWaves, { PatternWavePreset } from '../../components/react-bits/PatternWaves';

interface ArrivalUniverseProps {
  onTravelTo: (universeId: UniverseId) => void;
}

export const ArrivalUniverse: React.FC<ArrivalUniverseProps> = ({ onTravelTo }) => {
  // Interactive Wave Preset state (ORIGINAL BEHAVIOR RESTORED)
  const [activePreset, setActivePreset] = useState<PatternWavePreset>('silk');
  const [waveSpeed, setWaveSpeed] = useState<number>(0.35);
  const [hoveredUniverse, setHoveredUniverse] = useState<UniverseId | null>(null);

  const presets: { id: PatternWavePreset; label: string }[] = [
    { id: 'silk', label: 'Silk' },
    { id: 'lines', label: 'Contour Lines' },
    { id: 'terminal', label: 'Terminal Glyphs' },
    { id: 'mesh', label: 'Matrix Mesh' },
    { id: 'ocean', label: 'Swell' },
  ];

  const destinationWorlds = UNIVERSES_META.filter((u) => u.id !== 'arrival');

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-neutral-100 flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden select-none">
      {/* 
        ========================================================================
        PatternWaves WebGL Interactive Surface (ORIGINAL BEHAVIOR RESTORED)
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

      {/* Atmospheric Perimeter Coordinate Frame */}
      <div className="absolute inset-4 sm:inset-6 pointer-events-none border border-neutral-800/40 rounded-lg z-10" />

      {/* TOP BAR: Subtle Environmental Coordinates & Wave Controls */}
      <header className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Telemetry */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-neutral-200 animate-ping opacity-75" />
          <span className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase">
            CHAMBER 00 // DIMENSIONAL COORDINATES
          </span>
          <span className="text-neutral-700 font-mono hidden sm:inline">|</span>
          <span className="font-mono text-[11px] tracking-wider text-neutral-400 hidden sm:inline">
            MULTIVERSE ARRIVAL
          </span>
        </div>

        {/* Right Telemetry & Ambient Controls */}
        <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-400">
          <div className="hidden md:flex items-center gap-2 text-neutral-400">
            <Radio className="w-3.5 h-3.5 text-neutral-400" />
            <span>{ABOUT_DOSSIER.coordinates}</span>
            <span className="text-neutral-700">·</span>
            <span>{ABOUT_DOSSIER.timezone}</span>
          </div>

          {/* Minimal Surface Switcher */}
          <div className="flex items-center gap-1 bg-neutral-950/60 border border-neutral-800/60 p-0.5 rounded backdrop-blur-xs">
            <Waves className="w-3 h-3 text-neutral-400 ml-1 mr-0.5" />
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePreset(p.id)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
                  activePreset === p.id
                    ? 'bg-neutral-100 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* CENTER / DOMINANT IDENTITY MONOLITH (Maximum Negative Space) */}
      <main className="relative z-20 my-auto py-12 max-w-4xl">
        <div className="space-y-6 sm:space-y-8">
          {/* Identity Tag */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-neutral-800/80 bg-neutral-950/40 backdrop-blur-xs text-[11px] font-mono text-neutral-400 tracking-widest uppercase">
            <span>SOBI // AI & ML SYSTEMS</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-300">STAGE 00</span>
          </div>

          {/* Dominant Name Monolith */}
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight font-display text-white drop-shadow-sm">
            Sobi
          </h1>

          {/* Real Professional Positioning */}
          <div className="space-y-3">
            <div className="text-base sm:text-xl lg:text-2xl font-light text-neutral-300 tracking-wide font-sans flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-white font-medium">Applied AI</span>
              <span className="text-neutral-600">·</span>
              <span className="text-white font-medium">Document Intelligence</span>
              <span className="text-neutral-600">·</span>
              <span className="text-white font-medium">Creative Tooling</span>
            </div>

            <p className="text-sm sm:text-base text-neutral-400 max-w-xl font-light leading-relaxed">
              {ABOUT_DOSSIER.manifestoStatement}
            </p>
          </div>
        </div>
      </main>

      {/* BOTTOM / PERIMETER DIMENSIONAL DIRECTORY */}
      <footer className="relative z-20 pt-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 tracking-wider uppercase border-b border-neutral-800/60 pb-2">
            <span className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-neutral-400" />
              DIMENSIONAL WORLDS DIRECTORY (SELECT TO ENTER)
            </span>
            <span className="hidden sm:inline text-neutral-400">
              {hoveredUniverse
                ? `TARGET: ${hoveredUniverse.toUpperCase()} · READY FOR JUMP`
                : 'HOVER OR SELECT COORDINATES'}
            </span>
          </div>

          {/* Minimalist World Strip (Not an ordinary card grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {destinationWorlds.map((world) => {
              const isHovered = hoveredUniverse === world.id;
              return (
                <button
                  key={world.id}
                  onClick={() => onTravelTo(world.id)}
                  onMouseEnter={() => setHoveredUniverse(world.id)}
                  onMouseLeave={() => setHoveredUniverse(null)}
                  className={`group relative text-left p-3 rounded border transition-all duration-200 backdrop-blur-xs flex flex-col justify-between h-22 sm:h-24 ${
                    isHovered
                      ? 'border-neutral-400 bg-neutral-900/80 shadow-lg translate-y-[-2px]'
                      : 'border-neutral-800/60 bg-neutral-950/40 hover:border-neutral-700 hover:bg-neutral-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full font-mono text-[10px] text-neutral-400 group-hover:text-neutral-200">
                    <span>{world.indexStr}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <div>
                    <div className="font-sans font-semibold text-xs sm:text-sm text-neutral-200 group-hover:text-white">
                      {world.name}
                    </div>
                    <div className="font-mono text-[9px] text-neutral-400 tracking-tight truncate mt-0.5">
                      {world.concept}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* System Terminal Status line */}
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-2">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-neutral-400" />
              ENVIRONMENT: SPATIAL VECTOR FIELD · CURSOR ACTIVE
            </span>
            <span>PRESS 1-7 OR SELECT WORLD TO ENGAGE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
