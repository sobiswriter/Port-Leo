import React, { useState } from 'react';
import { UniverseId, ProjectItem } from '../../types/universe';
import { PROJECTS_DATA, UNIVERSES_META } from '../../data/portfolioData';
import { Layers, ExternalLink, Github, CheckCircle2, ChevronRight, Activity, Sliders, Waves } from 'lucide-react';
import MicroSlats, { MicroSlatsPreset } from '../../components/react-bits/MicroSlats';

interface BuilderUniverseProps {
  onTravelTo: (universeId: UniverseId) => void;
}

export const BuilderUniverse: React.FC<BuilderUniverseProps> = ({ onTravelTo }) => {
  const currentMeta = UNIVERSES_META.find((u) => u.id === 'builder')!;
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS_DATA[0].id);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Interactive MicroSlats State
  const [slatPreset, setSlatPreset] = useState<MicroSlatsPreset>('swell');

  const slatPresets: { id: MicroSlatsPreset; label: string }[] = [
    { id: 'swell', label: 'Swell' },
    { id: 'signal', label: 'Signal Wall' },
    { id: 'tide', label: 'Tide' },
    { id: 'storm', label: 'Storm' },
  ];

  const categories = ['All', 'AI & Agents', 'Systems', 'DevTools', 'Distributed', 'Interface'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const activeProject: ProjectItem =
    PROJECTS_DATA.find((p) => p.id === selectedProjectId) || filteredProjects[0] || PROJECTS_DATA[0];

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-neutral-100 flex flex-col p-6 sm:p-10 lg:p-12 overflow-hidden selection:bg-neutral-800">
      {/* 
        ========================================================================
        MicroSlats WebGL Interactive Sea Surface
        Spans the entire Builder universe with fluid stirring and dynamic glints
        ========================================================================
      */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <MicroSlats
          preset={slatPreset}
          color="#6366f1"
          glintColor="#ffffff"
          backgroundColor="#050505"
          slatWidth={11}
          slatHeight={24}
          gap={3}
          roundness={0.7}
          interactive={true}
          cursorStrength={1.1}
          cursorSize={45}
          swirl={0.8}
          trail={1.6}
          lean={0.25}
          intro={true}
        />
        {/* Subtle radial scrim to preserve blueprint text contrast while keeping slats visible everywhere */}
        <div className="absolute inset-0 bg-radial-[at_50%_35%] from-transparent via-[#050505]/40 to-[#050505]/85 pointer-events-none" />
      </div>

      {/* Structural Stage Border Frame */}
      <div className="absolute inset-4 sm:inset-6 pointer-events-none border border-neutral-800/60 rounded-lg z-10" />

      {/* Universe 01 Top Contract Header */}
      <header className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80 backdrop-blur-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>UNIVERSE 01</span>
            <span aria-hidden="true" className="text-neutral-700">/</span>
            <span className="text-neutral-300 font-semibold uppercase">{currentMeta.name}</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="text-neutral-400">{currentMeta.concept}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-display text-neutral-100">
            Engineered Artifacts & Systems
          </h1>
        </div>

        {/* Header Controls: Slat Preset & Category Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* MicroSlats Preset Selector */}
          <div className="flex items-center gap-1 bg-neutral-900/80 border border-neutral-800 p-0.5 rounded-md backdrop-blur-md">
            <span className="text-[11px] font-mono text-neutral-400 px-2 flex items-center gap-1">
              <Layers className="w-3 h-3 text-neutral-400" />
              <span className="hidden sm:inline">Slats:</span>
            </span>
            {slatPresets.map((p) => (
              <button
                key={p.id}
                onClick={() => setSlatPreset(p.id)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  slatPreset === p.id
                    ? 'bg-neutral-100 text-neutral-950 font-bold shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Project Category Filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  const matching = cat === 'All' ? PROJECTS_DATA : PROJECTS_DATA.filter((p) => p.category === cat);
                  if (matching.length > 0 && !matching.some((m) => m.id === selectedProjectId)) {
                    setSelectedProjectId(matching[0].id);
                  }
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 font-semibold'
                    : 'bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border border-neutral-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Structural Stage: Split Master-Detail Blueprint Workbench */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 items-start">
        {/* Left Column: Project Catalog Index (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono tracking-wider text-neutral-400 uppercase flex items-center justify-between px-1 mb-2">
            <span>Production Systems Index ({filteredProjects.length})</span>
            <span className="text-neutral-400">Select to inspect</span>
          </div>

          <div className="space-y-2.5">
            {filteredProjects.map((project) => {
              const isSelected = project.id === activeProject.id;
              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`w-full text-left p-4 rounded-lg border backdrop-blur-md transition-all text-neutral-200 ${
                    isSelected
                      ? 'bg-neutral-900/90 border-neutral-500 shadow-md ring-1 ring-neutral-500/30'
                      : 'bg-neutral-950/70 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1">
                    <span>{project.category} · {project.year}</span>
                    <span className="text-neutral-300 font-semibold">{project.status}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-100">{project.title}</h3>
                    {isSelected && <ChevronRight className="w-4 h-4 text-neutral-300" />}
                  </div>

                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Blueprint Inspector Stage (7 Cols) */}
        <div className="lg:col-span-7 bg-neutral-950/80 backdrop-blur-md border border-neutral-800/80 rounded-xl p-6 sm:p-8 space-y-6">
          {/* Blueprint Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-neutral-800/80 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                <span>SYSTEM ARCHITECTURE BLUEPRINT</span>
                <span aria-hidden="true" className="text-neutral-700">/</span>
                <span className="text-neutral-300">{activeProject.role}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-50">
                {activeProject.title}
              </h2>
              <p className="text-neutral-300 text-sm mt-1 leading-relaxed">
                {activeProject.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-200 bg-neutral-800/90 hover:bg-neutral-700 rounded border border-neutral-700 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Repository</span>
                </a>
              )}
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-950 bg-neutral-100 hover:bg-white rounded transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Deployment</span>
                </a>
              )}
            </div>
          </div>

          {/* Problem Statement */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              The Engineering Problem
            </h4>
            <p className="text-sm text-neutral-300 leading-relaxed bg-neutral-900/60 p-4 rounded-lg border border-neutral-800/80">
              {activeProject.problem}
            </p>
          </div>

          {/* Architecture Mechanics */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Architectural Invariants & Implementation
            </h4>
            <ul className="space-y-2">
              {activeProject.architecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Measured Benchmark Outcomes */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-neutral-400" />
              Measured System Benchmarks
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeProject.metrics.map((m, idx) => (
                <div key={idx} className="bg-neutral-900/70 p-3.5 rounded-lg border border-neutral-800/80">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-neutral-100">
                    {m.value}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1 leading-snug">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack Tokens (Unboxed text with separators) */}
          <div className="pt-4 border-t border-neutral-800/80 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
            <span className="font-mono text-neutral-500 uppercase">Stack:</span>
            {activeProject.stack.map((tech, idx) => (
              <React.Fragment key={tech}>
                <span className="text-neutral-300 font-medium">{tech}</span>
                {idx < activeProject.stack.length - 1 && <span aria-hidden="true" className="text-neutral-700">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>

      {/* Universe 01 Footer Local Nav */}
      <footer className="relative z-10 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400 backdrop-blur-xs">
        <div>
          <span>Builder Workspace · Stage 01/07</span>
          <span aria-hidden="true" className="text-neutral-700"> · </span>
          <span>Surface: Interactive MicroSlats Wave Field (WebGL)</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onTravelTo('arrival')}
            className="text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            ← 00 Arrival
          </button>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <button
            onClick={() => onTravelTo('ai-lab')}
            className="text-neutral-200 hover:text-white transition-colors font-medium"
          >
            Enter 02 AI Lab →
          </button>
        </div>
      </footer>
    </div>
  );
};

