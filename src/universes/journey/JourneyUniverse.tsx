import React, { useState } from 'react';
import { UniverseId, CosmicMilestone } from '../../types/universe';
import { COSMIC_MILESTONES, UNIVERSES_META } from '../../data/portfolioData';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Award,
  Globe,
  Radio,
  ExternalLink,
} from 'lucide-react';
import Galaxy from '../../components/react-bits/Galaxy';

interface JourneyUniverseProps {
  onTravelTo: (universeId: UniverseId) => void;
}

interface NebulaTheme {
  id: string;
  label: string;
  hueShift: number;
  density: number;
  glowIntensity: number;
  speed: number;
  starSpeed: number;
  saturation: number;
  colorName: string;
}

const NEBULA_THEMES: NebulaTheme[] = [
  {
    id: 'andromeda',
    label: 'Andromeda Core',
    hueShift: 260,
    density: 2.1,
    glowIntensity: 0.5,
    speed: 1.2,
    starSpeed: 0.6,
    saturation: 0.65,
    colorName: 'text-violet-400 border-violet-500/40 bg-violet-950/30',
  },
  {
    id: 'cygnus',
    label: 'Cygnus Rift',
    hueShift: 180,
    density: 2.3,
    glowIntensity: 0.55,
    speed: 1.4,
    starSpeed: 0.7,
    saturation: 0.75,
    colorName: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30',
  },
  {
    id: 'supernova',
    label: 'Supernova Amber',
    hueShift: 38,
    density: 1.8,
    glowIntensity: 0.6,
    speed: 1.1,
    starSpeed: 0.5,
    saturation: 0.6,
    colorName: 'text-amber-400 border-amber-500/40 bg-amber-950/30',
  },
  {
    id: 'pulsar',
    label: 'Pulsar Monochrome',
    hueShift: 210,
    density: 1.5,
    glowIntensity: 0.4,
    speed: 0.9,
    starSpeed: 0.4,
    saturation: 0.05,
    colorName: 'text-neutral-300 border-neutral-600/40 bg-neutral-900/40',
  },
];

const GALAXY_FOCAL: [number, number] = [0.5, 0.5];
const GALAXY_ROTATION: [number, number] = [1.0, 0.0];

export const JourneyUniverse: React.FC<JourneyUniverseProps> = ({ onTravelTo }) => {
  const currentMeta = UNIVERSES_META.find((u) => u.id === 'journey')!;
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('openxai-2025');

  // Galaxy Customization State (ORIGINAL STATE RESTORED)
  const [selectedNebulaId, setSelectedNebulaId] = useState<string>('andromeda');
  const [mouseRepulsion, setMouseRepulsion] = useState<boolean>(true);
  const [warpSpeedMultiplier, setWarpSpeedMultiplier] = useState<number>(1.2);
  const [starDensityMultiplier, setStarDensityMultiplier] = useState<number>(2.0);

  const activeNebula =
    NEBULA_THEMES.find((theme) => theme.id === selectedNebulaId) || NEBULA_THEMES[0];

  const currentIndex = COSMIC_MILESTONES.findIndex((m) => m.id === selectedMilestoneId);
  const activeMilestone: CosmicMilestone =
    COSMIC_MILESTONES[currentIndex] || COSMIC_MILESTONES[0];

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + COSMIC_MILESTONES.length) % COSMIC_MILESTONES.length;
    setSelectedMilestoneId(COSMIC_MILESTONES[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % COSMIC_MILESTONES.length;
    setSelectedMilestoneId(COSMIC_MILESTONES[nextIdx].id);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030308] text-neutral-100 flex flex-col justify-between p-4 sm:p-8 lg:p-10 overflow-x-hidden selection:bg-purple-900/60 selection:text-white">
      {/* 
        ========================================================================
        Galaxy WebGL Starfield & Cosmic Voyage Surface (ORIGINAL BEHAVIOR RESTORED)
        Spans the entire Journey universe with interactive mouse deflection & starlight
        ========================================================================
      */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Galaxy
          focal={GALAXY_FOCAL}
          rotation={GALAXY_ROTATION}
          hueShift={activeNebula.hueShift}
          density={starDensityMultiplier}
          starSpeed={activeNebula.starSpeed}
          speed={warpSpeedMultiplier}
          glowIntensity={activeNebula.glowIntensity}
          saturation={activeNebula.saturation}
          twinkleIntensity={0.65}
          rotationSpeed={0.08}
          mouseInteraction={true}
          mouseRepulsion={mouseRepulsion}
          repulsionStrength={mouseRepulsion ? 6.5 : 1.5}
          autoCenterRepulsion={0}
          transparent={true}
          lightMode={false}
          className="w-full h-full"
        />
        {/* Soft atmospheric gradient to maintain sublime contrast and legibility */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030308]/40 to-[#030308]/85 pointer-events-none" />
      </div>

      {/* Structural Stage Border Frame */}
      <div className="absolute inset-2 sm:inset-4 pointer-events-none border border-purple-950/40 rounded-lg z-10" />

      {/* CELESTIAL TIMELINE TOP BAR */}
      <header className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-purple-900/30 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span className="font-mono text-xs font-semibold tracking-wider text-purple-300 uppercase">
              COSMIC MAP 05 // {currentMeta.name.toUpperCase()} TIMELINE
            </span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">|</span>
          <span className="font-mono text-xs text-neutral-400 hidden sm:inline">
            ASTRONOMICAL MILESTONE TRAJECTORY
          </span>
        </div>

        {/* Orbit Steppers & Next Jump */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-neutral-950/70 border border-purple-950/80 p-0.5 rounded text-[11px] font-mono">
            <button
              onClick={handlePrev}
              title="Previous Milestone"
              className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-purple-300 px-2 font-semibold">
              STAR {currentIndex + 1}/{COSMIC_MILESTONES.length}
            </span>
            <button
              onClick={handleNext}
              title="Next Milestone"
              className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => onTravelTo('about')}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-purple-300 transition-colors"
          >
            <span>Next: 06 About</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* CELESTIAL CONSTELLATION PATHWAY (Interactive Orbital Nodes) */}
      <section className="relative z-20 my-auto py-6 max-w-6xl mx-auto w-full space-y-6">
        {/* Orbital Route Track */}
        <div className="bg-neutral-950/50 backdrop-blur-md border border-purple-950/60 rounded-xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-purple-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              CELESTIAL CONSTELLATION NODES (SELECT TO OBSERVE)
            </span>
            <span className="text-neutral-500 hidden sm:inline">
              SECTOR: {activeMilestone.celestialCoordinates.sector}
            </span>
          </div>

          {/* Orbital Nodes Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {COSMIC_MILESTONES.map((m, idx) => {
              const isSelected = m.id === activeMilestone.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMilestoneId(m.id)}
                  className={`group text-left p-2.5 rounded-lg border transition-all duration-200 flex flex-col justify-between h-24 ${
                    isSelected
                      ? 'bg-purple-950/80 border-purple-400 text-white shadow-lg ring-1 ring-purple-400/50 scale-[1.03]'
                      : 'bg-neutral-950/40 border-purple-950/40 text-neutral-400 hover:bg-neutral-900/60 hover:text-neutral-200 hover:border-purple-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-purple-300 font-semibold">
                      0{idx + 1}
                    </span>
                    {m.year && (
                      <span className="text-purple-400 bg-purple-950/80 px-1 py-0.2 rounded border border-purple-800/40">
                        {m.year}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="font-sans font-medium text-xs text-neutral-100 group-hover:text-white line-clamp-2 leading-snug">
                      {m.title}
                    </div>
                    <div className="text-[9px] font-mono text-neutral-500 truncate mt-1">
                      {m.category}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE MILESTONE TELESCOPIC DOSSIER (Floating Glass Observatory) */}
        <div className="bg-neutral-950/75 backdrop-blur-md border border-purple-950/70 rounded-xl p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="border-b border-purple-950/60 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-purple-400 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-600/40 text-purple-200 font-semibold">
                  {activeMilestone.category.toUpperCase()}
                </span>
                <span className="text-neutral-600">/</span>
                <span className="text-neutral-300">{activeMilestone.context}</span>
              </div>
              <div className="text-neutral-400">
                MAGNITUDE: {activeMilestone.celestialCoordinates.magnitude}
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
              {activeMilestone.title}
            </h2>

            <div className="mt-2 text-xs font-mono text-purple-300">
              EPOCH: {activeMilestone.epoch} {activeMilestone.year ? `(${activeMilestone.year})` : ''}
            </div>
          </div>

          {/* Summary & Significance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-neutral-900/50 border border-purple-950/60 rounded-lg p-4 space-y-1.5">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-purple-400">
                HISTORICAL CONTEXT & SUMMARY
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {activeMilestone.summary}
              </p>
            </div>

            <div className="bg-purple-950/30 border border-purple-700/40 rounded-lg p-4 space-y-1.5">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-purple-300">
                ARCHITECTURAL SIGNIFICANCE
              </h4>
              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                {activeMilestone.significance}
              </p>
            </div>
          </div>

          {/* Verified Evidence & Details */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-purple-400">
              VERIFIED SIGNALS ON RECORD
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {activeMilestone.verifiedDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded bg-neutral-900/40 border border-purple-950/40 text-xs text-neutral-300 flex items-center gap-2"
                >
                  <Award className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="leading-snug">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER: Celestial Navigation Readout */}
      <footer className="relative z-20 pt-4 border-t border-purple-950/50 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Radio className="w-3 h-3 text-purple-400" />
          ASTRONOMICAL TRAJECTORY ENGINE · GALAXY SURFACE ACTIVE
        </span>
        <span>VERIFIED MILESTONES · SOBI.CODES</span>
      </footer>
    </div>
  );
};
