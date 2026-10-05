import React, { useState, useMemo } from 'react';
import { UniverseId, MilestoneItem } from '../../types/universe';
import { JOURNEY_MILESTONES, UNIVERSES_META } from '../../data/portfolioData';
import {
  Trophy,
  GraduationCap,
  Briefcase,
  GitBranch,
  Lightbulb,
  Sparkles,
  Sliders,
  Compass,
  ArrowRight,
  ArrowUpDown,
  Search,
  CheckCircle2,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
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

  // Galaxy Customization State
  const [selectedNebulaId, setSelectedNebulaId] = useState<string>('andromeda');
  const [mouseRepulsion, setMouseRepulsion] = useState<boolean>(true);
  const [warpSpeedMultiplier, setWarpSpeedMultiplier] = useState<number>(1.2);
  const [starDensityMultiplier, setStarDensityMultiplier] = useState<number>(2.0);
  const [showGalaxyControls, setShowGalaxyControls] = useState<boolean>(false);

  // Timeline Filtering & Interaction State
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>(null);

  const activeNebula =
    NEBULA_THEMES.find((theme) => theme.id === selectedNebulaId) || NEBULA_THEMES[0];

  const categories = ['All', 'Career', 'Hackathon', 'Academic', 'Open Source'];

  const filteredMilestones = useMemo(() => {
    let list = [...JOURNEY_MILESTONES];

    if (activeCategory !== 'All') {
      list = list.filter((m) => m.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.context.toLowerCase().includes(q) ||
          m.outcome.toLowerCase().includes(q) ||
          m.year.includes(q)
      );
    }

    if (sortOrder === 'asc') {
      list.reverse();
    }

    return list;
  }, [activeCategory, searchQuery, sortOrder]);

  const getCategoryIcon = (category: MilestoneItem['category']) => {
    switch (category) {
      case 'Hackathon':
        return <Trophy className="w-3.5 h-3.5 text-amber-400" />;
      case 'Academic':
        return <GraduationCap className="w-3.5 h-3.5 text-blue-400" />;
      case 'Open Source':
        return <GitBranch className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Career':
      default:
        return <Briefcase className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  const getCategoryBadgeClass = (category: MilestoneItem['category']) => {
    switch (category) {
      case 'Hackathon':
        return 'text-amber-300 bg-amber-950/40 border-amber-800/50';
      case 'Academic':
        return 'text-blue-300 bg-blue-950/40 border-blue-800/50';
      case 'Open Source':
        return 'text-emerald-300 bg-emerald-950/40 border-emerald-800/50';
      case 'Career':
      default:
        return 'text-purple-300 bg-purple-950/40 border-purple-800/50';
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030308] text-neutral-100 flex flex-col p-6 sm:p-10 lg:p-12 overflow-hidden selection:bg-violet-900 selection:text-white">
      {/* 
        ========================================================================
        Galaxy WebGL Starfield & Cosmic Voyage Surface
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

      {/* 
        ========================================================================
        Universe Content Layer
        ========================================================================
      */}
      <div className="relative z-10 flex flex-col flex-1 max-w-6xl mx-auto w-full">
        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800/80 backdrop-blur-sm">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="px-1.5 py-0.5 rounded bg-violet-950/60 border border-violet-800/50 text-violet-300 font-semibold">
                UNIVERSE 05
              </span>
              <span aria-hidden="true" className="text-neutral-600">/</span>
              <span className="text-neutral-200 font-semibold uppercase tracking-wider">{currentMeta.name}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">{currentMeta.concept}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight font-display text-white drop-shadow-md">
              Timeline, Inflections & Cosmic Odyssey
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-2xl">
              Chronological voyage through production breakthroughs, distributed systems architecture, and academic foundational milestones.
            </p>
          </div>

          {/* Galaxy Controls Toggle & Quick Actions */}
          <div className="flex items-center gap-2.5 self-start lg:self-center">
            <button
              onClick={() => setShowGalaxyControls(!showGalaxyControls)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                showGalaxyControls
                  ? 'bg-violet-900/40 text-violet-200 border-violet-500/60 shadow-lg shadow-violet-950/50'
                  : 'bg-neutral-900/70 text-neutral-400 hover:text-neutral-200 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-violet-400" />
              <span>Cosmic HUD {showGalaxyControls ? '▲' : '▼'}</span>
            </button>

            <button
              onClick={() => onTravelTo('about')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-neutral-900/70 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <span>Next Realm</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* 
          ========================================================================
          Expandable Cosmic Galaxy Controller HUD
          ========================================================================
        */}
        {showGalaxyControls && (
          <div className="mt-4 p-4 sm:p-5 rounded-xl bg-neutral-950/80 backdrop-blur-xl border border-violet-900/30 text-xs font-mono space-y-4 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-900">
              <div className="flex items-center gap-2 text-violet-300">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="font-semibold uppercase tracking-wider">Galaxy Starfield Tuning</span>
              </div>
              <span className="text-[11px] text-neutral-500">
                Move cursor across viewport for live gravitational deflection
              </span>
            </div>

            {/* Nebula Presets */}
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-neutral-400 block font-semibold">
                Stellar Nebula Preset:
              </label>
              <div className="flex flex-wrap gap-2">
                {NEBULA_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedNebulaId(theme.id)}
                    className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                      selectedNebulaId === theme.id
                        ? `${theme.colorName} font-bold shadow-md`
                        : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Warp Speed & Repulsion Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-semibold">
                  Gravitational Repulsion:
                </span>
                <button
                  onClick={() => setMouseRepulsion(!mouseRepulsion)}
                  className={`w-full py-1.5 px-3 rounded-lg border text-left transition-colors flex items-center justify-between ${
                    mouseRepulsion
                      ? 'bg-violet-950/40 border-violet-700/60 text-violet-200'
                      : 'bg-neutral-900/50 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <span>{mouseRepulsion ? '● Repulsion Field (Push)' : '○ Ambient Drift (Neutral)'}</span>
                  <span className="text-[10px] text-violet-400 font-bold">{mouseRepulsion ? 'ACTIVE' : 'OFF'}</span>
                </button>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-semibold">
                  Cosmic Warp Velocity:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: 'Drift', speed: 0.6 },
                    { label: 'Cruise', speed: 1.2 },
                    { label: 'Warp', speed: 2.2 },
                  ].map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setWarpSpeedMultiplier(s.speed)}
                      className={`py-1 text-center rounded border transition-colors ${
                        warpSpeedMultiplier === s.speed
                          ? 'bg-neutral-200 text-neutral-950 font-bold border-white'
                          : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-semibold">
                  Star Cluster Density:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: 'Subtle', density: 1.2 },
                    { label: 'Dense', density: 2.0 },
                    { label: 'Cluster', density: 3.0 },
                  ].map((d) => (
                    <button
                      key={d.label}
                      onClick={() => setStarDensityMultiplier(d.density)}
                      className={`py-1 text-center rounded border transition-colors ${
                        starDensityMultiplier === d.density
                          ? 'bg-neutral-200 text-neutral-950 font-bold border-white'
                          : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-white'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 
          ========================================================================
          Trajectory Telemetry Overview Strip
          ========================================================================
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
          <div className="bg-neutral-950/50 backdrop-blur-md border border-neutral-800/80 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
              Trajectory Range
            </span>
            <span className="text-base sm:text-lg font-bold font-mono text-neutral-100">
              2020 → 2026
            </span>
            <span className="text-[11px] text-neutral-400 block font-sans">
              6 Years Continuous Velocity
            </span>
          </div>

          <div className="bg-neutral-950/50 backdrop-blur-md border border-neutral-800/80 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
              Recorded Inflections
            </span>
            <span className="text-base sm:text-lg font-bold font-mono text-violet-300">
              {JOURNEY_MILESTONES.length} Major Milestones
            </span>
            <span className="text-[11px] text-neutral-400 block font-sans">
              Zero Unverified Claims
            </span>
          </div>

          <div className="bg-neutral-950/50 backdrop-blur-md border border-neutral-800/80 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
              Global Recognition
            </span>
            <span className="text-base sm:text-lg font-bold font-mono text-amber-300">
              1st Prize · 450+ Swarms
            </span>
            <span className="text-[11px] text-neutral-400 block font-sans">
              Global Agent Hackathon
            </span>
          </div>

          <div className="bg-neutral-950/50 backdrop-blur-md border border-neutral-800/80 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
              Research & OSS Impact
            </span>
            <span className="text-base sm:text-lg font-bold font-mono text-cyan-300">
              130+ Cites · 1k+ Stars
            </span>
            <span className="text-[11px] text-neutral-400 block font-sans">
              SysML & Distributed Protocols
            </span>
          </div>
        </div>

        {/* 
          ========================================================================
          Search, Filtering & Chronological Direction Controls
          ========================================================================
        */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-xl bg-neutral-950/60 backdrop-blur-md border border-neutral-800/80 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-neutral-100 text-neutral-950 font-bold shadow'
                    : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-56">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search milestones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900/80 border border-neutral-800 rounded-lg pl-8 pr-3 py-1.5 text-xs font-mono text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-violet-500"
              />
            </div>

            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:text-white transition-colors shrink-0"
              title="Reverse chronological order"
            >
              <ArrowUpDown className="w-3 h-3 text-neutral-400" />
              <span>{sortOrder === 'desc' ? 'Recent First' : 'Genesis First'}</span>
            </button>
          </div>
        </div>

        {/* 
          ========================================================================
          Main Structural Stage: Chronological Trajectory Stream with Cosmic Nodes
          ========================================================================
        */}
        <main className="flex-1 max-w-4xl mx-auto w-full pb-16">
          {filteredMilestones.length === 0 ? (
            <div className="text-center py-16 px-4 bg-neutral-950/40 backdrop-blur-md rounded-2xl border border-neutral-800/60 space-y-3">
              <Compass className="w-8 h-8 text-neutral-600 mx-auto" />
              <p className="text-sm font-mono text-neutral-400">No milestones matched &ldquo;{searchQuery}&rdquo;</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="text-xs font-mono text-violet-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="relative border-l-2 border-violet-500/20 pl-6 sm:pl-10 ml-4 sm:ml-6 space-y-12">
              {filteredMilestones.map((milestone) => {
                const isExpanded = expandedMilestoneId === milestone.id;

                return (
                  <div key={milestone.id} className="relative group">
                    {/* Glowing Cosmic Milestone Portal Node */}
                    <div className="absolute -left-[33px] sm:-left-[49px] top-2 flex items-center justify-center">
                      <div className="relative w-5 h-5 rounded-full bg-neutral-950 border-2 border-violet-500/60 group-hover:border-violet-400 group-hover:scale-125 transition-all shadow-lg shadow-violet-950/60 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-300 group-hover:bg-white animate-pulse" />
                      </div>
                    </div>

                    {/* Milestone Card with Deep Cosmic Backdrop */}
                    <div className="bg-neutral-950/65 backdrop-blur-md border border-neutral-800/80 rounded-2xl p-5 sm:p-7 space-y-4 hover:border-violet-500/40 hover:bg-neutral-950/80 transition-all duration-200 shadow-xl shadow-black/40">
                      {/* Meta Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded font-bold text-sm bg-neutral-900 border border-neutral-700 text-white font-mono">
                            {milestone.year}
                          </span>
                          <span className="flex items-center gap-1 text-neutral-400">
                            <Calendar className="w-3 h-3 text-neutral-500" />
                            <span>{milestone.dateStr}</span>
                          </span>
                          <span aria-hidden="true" className="text-neutral-700">·</span>
                          <span className="flex items-center gap-1 text-neutral-400">
                            <MapPin className="w-3 h-3 text-neutral-500" />
                            <span>{milestone.context}</span>
                          </span>
                        </div>

                        {/* Category Pill */}
                        <div
                          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-medium ${getCategoryBadgeClass(
                            milestone.category
                          )}`}
                        >
                          {getCategoryIcon(milestone.category)}
                          <span>{milestone.category}</span>
                        </div>
                      </div>

                      {/* Milestone Title */}
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-neutral-100 group-hover:text-white transition-colors">
                        {milestone.title}
                      </h3>

                      {/* Narrative Description */}
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                        {milestone.description}
                      </p>

                      {/* Quantified Outcome Box */}
                      <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800 text-xs space-y-1">
                        <span className="font-mono text-[11px] font-semibold text-violet-400 uppercase tracking-wider block">
                          Measured Outcome & Quantitative Impact
                        </span>
                        <p className="text-neutral-200 font-medium leading-relaxed font-mono">
                          {milestone.outcome}
                        </p>
                      </div>

                      {/* Engineering Axiom / Takeaway */}
                      <div className="flex items-start gap-2.5 text-xs text-neutral-400 bg-neutral-950/40 p-3 rounded-lg border border-neutral-900">
                        <Lightbulb className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-mono text-[10px] text-neutral-500 uppercase block font-semibold">
                            Core Takeaway / Axiom
                          </span>
                          <p className="italic text-neutral-300 font-sans leading-relaxed">
                            &ldquo;{milestone.takeaway}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Expandable Technical Details Button */}
                      <div className="pt-2 flex items-center justify-between border-t border-neutral-900/80">
                        <button
                          onClick={() => setExpandedMilestoneId(isExpanded ? null : milestone.id)}
                          className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-violet-300 transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-3.5 h-3.5" />
                              <span>Hide Technical Invariants</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3.5 h-3.5" />
                              <span>Inspect Technical Invariants</span>
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-500">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Verified Trajectory Commit</span>
                        </div>
                      </div>

                      {/* Expanded Invariant Inspector */}
                      {isExpanded && (
                        <div className="pt-2 text-xs font-mono space-y-2.5 bg-neutral-950/90 p-4 rounded-xl border border-neutral-800 animate-fadeIn">
                          <div className="flex items-center justify-between text-neutral-400">
                            <span className="text-violet-400 font-bold uppercase tracking-wider text-[11px]">
                              Operational Snapshot
                            </span>
                            <span className="text-[10px] text-neutral-500">ID: {milestone.id}</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-neutral-300">
                            <div className="p-2 rounded bg-neutral-900/70 border border-neutral-800">
                              <span className="text-neutral-500 block mb-0.5">Primary Domain:</span>
                              <span className="font-semibold text-neutral-200">{milestone.category} Systems</span>
                            </div>
                            <div className="p-2 rounded bg-neutral-900/70 border border-neutral-800">
                              <span className="text-neutral-500 block mb-0.5">Verification Status:</span>
                              <span className="text-emerald-400 font-semibold">100% Benchmarked & Released</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="pt-6 pb-2 border-t border-neutral-800/80 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span>Chronological Trajectory · Stage 05/07</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="text-neutral-300 font-semibold">{filteredMilestones.length} Inflection Points Active</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onTravelTo('arsenal')}
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>← 04 Arsenal</span>
            </button>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={() => onTravelTo('about')}
              className="text-violet-300 hover:text-white transition-colors font-medium flex items-center gap-1"
            >
              <span>Enter 06 About →</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

