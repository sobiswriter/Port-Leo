import React, { useState, useMemo } from 'react';
import { UniverseId, ProjectItem } from '../../types/universe';
import { PROJECTS_DATA, UNIVERSES_META } from '../../data/portfolioData';
import {
  FolderGit2,
  Terminal,
  ExternalLink,
  Github,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Layers,
  Search,
  Code2,
  Cpu,
  Sparkles,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import MicroSlats, { MicroSlatsPreset } from '../../components/react-bits/MicroSlats';

interface BuilderUniverseProps {
  onTravelTo: (universeId: UniverseId) => void;
}

export const BuilderUniverse: React.FC<BuilderUniverseProps> = ({ onTravelTo }) => {
  const currentMeta = UNIVERSES_META.find((u) => u.id === 'builder')!;
  
  // Active Project Selection (defaults to LegalLM)
  const [selectedProjectId, setSelectedProjectId] = useState<string>('legallm');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFullArchive, setShowFullArchive] = useState<boolean>(false);
  
  // Interactive MicroSlats State
  const [slatPreset, setSlatPreset] = useState<MicroSlatsPreset>('swell');
  
  // Workbench Active Tab
  const [activeTab, setActiveTab] = useState<'blueprint' | 'console'>('blueprint');

  const slatPresets: { id: MicroSlatsPreset; label: string }[] = [
    { id: 'swell', label: 'Swell' },
    { id: 'signal', label: 'Signal' },
    { id: 'tide', label: 'Tide' },
    { id: 'storm', label: 'Storm' },
  ];

  // Featured vs Archive separation
  const featuredProjects = useMemo(() => PROJECTS_DATA.filter((p) => p.featured), []);
  const archiveProjects = useMemo(() => PROJECTS_DATA.filter((p) => !p.featured), []);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return PROJECTS_DATA;
    const q = searchQuery.toLowerCase();
    return PROJECTS_DATA.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const activeProject: ProjectItem =
    PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-neutral-100 flex flex-col p-4 sm:p-8 lg:p-10 overflow-x-hidden selection:bg-indigo-900/60 selection:text-white">
      {/* 
        ========================================================================
        MicroSlats WebGL Interactive Sea Surface (ORIGINAL BEHAVIOR RESTORED)
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
      <div className="absolute inset-2 sm:inset-4 pointer-events-none border border-indigo-950/40 rounded-lg z-10" />

      {/* WORKBENCH TOP CONSOLE STATUS BAR */}
      <header className="relative z-20 flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 mb-4 border-b border-indigo-900/30 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-indigo-300 uppercase">
              WORKBENCH 01 // {currentMeta.name.toUpperCase()} CONSOLE
            </span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">|</span>
          <span className="font-mono text-xs text-neutral-400 hidden sm:inline">
            ACTIVE WORKSPACE: [{activeProject.title.toUpperCase()}]
          </span>
        </div>

        {/* Console Controls: Surface Slat Preset + Quick Travel */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-neutral-950/70 border border-indigo-950/80 p-0.5 rounded text-[11px] font-mono">
            <span className="text-neutral-400 px-1.5 flex items-center gap-1">
              <Layers className="w-3 h-3 text-indigo-400" />
              <span className="hidden sm:inline">Grid:</span>
            </span>
            {slatPresets.map((p) => (
              <button
                key={p.id}
                onClick={() => setSlatPreset(p.id)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  slatPreset === p.id
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => onTravelTo('ai-lab')}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-indigo-300 transition-colors"
          >
            <span>Next: 02 AI Lab</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* ASYMMETRIC ENGINEERING WORKBENCH COMPOSITION */}
      <main className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ====================================================================
            LEFT: COMPACT PROJECT EXPLORER (Tree / Hierarchical Catalog)
            ==================================================================== */}
        <aside className="lg:col-span-3 bg-neutral-950/65 backdrop-blur-md border border-indigo-950/60 rounded-lg p-3.5 flex flex-col gap-3">
          {/* Explorer Header & Search */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 tracking-wider uppercase">
              <span className="flex items-center gap-1.5 text-neutral-300 font-semibold">
                <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
                WORKSPACE EXPLORER
              </span>
              <span>{PROJECTS_DATA.length} SYSTEMS</span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by name, stack, domain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900/80 border border-neutral-800 rounded px-2.5 py-1.5 pl-8 text-xs font-mono text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Project List */}
          <div className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {searchQuery.trim() ? (
              // Filtered Results
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-neutral-500 uppercase px-1">
                  MATCHING SEARCH ({filteredProjects.length})
                </div>
                {filteredProjects.map((p) => {
                  const isSelected = p.id === activeProject.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProjectId(p.id)}
                      className={`w-full text-left px-2.5 py-2 rounded text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-950/70 border border-indigo-500/50 text-white font-medium shadow-xs'
                          : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
                      }`}
                    >
                      <div className="truncate">
                        <div className="truncate font-sans font-medium text-neutral-200">
                          {p.title}
                        </div>
                        <div className="text-[10px] font-mono text-neutral-500 truncate">
                          {p.category}
                        </div>
                      </div>
                      {isSelected && <ChevronRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            ) : (
              <>
                {/* 1. Featured Workspaces */}
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-indigo-400 font-semibold tracking-wider uppercase px-1 mb-1">
                    FEATURED WORKSPACES ({featuredProjects.length})
                  </div>
                  {featuredProjects.map((p) => {
                    const isSelected = p.id === activeProject.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedProjectId(p.id)}
                        className={`w-full text-left px-2.5 py-2 rounded text-xs transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-indigo-950/80 border border-indigo-500/60 text-white font-medium shadow-sm'
                            : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50 border border-transparent'
                        }`}
                      >
                        <div className="truncate">
                          <div className="truncate font-sans font-medium text-neutral-100 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            {p.title}
                          </div>
                          <div className="text-[10px] font-mono text-neutral-400 truncate pl-3">
                            {p.category}
                          </div>
                        </div>
                        {isSelected && <ChevronRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* 2. Expandable Systems Archive */}
                <div className="pt-2 border-t border-indigo-950/40">
                  <button
                    onClick={() => setShowFullArchive((prev) => !prev)}
                    className="w-full flex items-center justify-between px-1 py-1 text-[10px] font-mono text-neutral-400 hover:text-neutral-200 uppercase"
                  >
                    <span>EXTENDED CATALOG ({archiveProjects.length})</span>
                    {showFullArchive ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronRight className="w-3 h-3" />
                    )}
                  </button>

                  {showFullArchive && (
                    <div className="space-y-1 mt-1 pl-1">
                      {archiveProjects.map((p) => {
                        const isSelected = p.id === activeProject.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setSelectedProjectId(p.id)}
                            className={`w-full text-left px-2 py-1.5 rounded text-xs transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-indigo-950/80 border border-indigo-500/60 text-white font-medium'
                                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40'
                            }`}
                          >
                            <span className="truncate">{p.title}</span>
                            {isSelected && <ChevronRight className="w-3 h-3 text-indigo-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </aside>

        {/* ====================================================================
            CENTER: ACTIVE WORKSPACE / FEATURED PROJECT WORKBENCH
            ==================================================================== */}
        <section className="lg:col-span-6 bg-neutral-950/75 backdrop-blur-md border border-indigo-950/70 rounded-lg p-5 sm:p-7 space-y-6">
          {/* Workbench Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-indigo-950/60 pb-5">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-indigo-400 mb-1">
                <span>SYSTEM BLUEPRINT</span>
                <span className="text-neutral-700">/</span>
                <span className="text-neutral-300">{activeProject.category}</span>
                <span className="text-neutral-700">·</span>
                <span className="text-emerald-400 font-semibold">{activeProject.status}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {activeProject.title}
              </h2>
              <p className="text-sm text-neutral-300 mt-1 leading-relaxed">
                {activeProject.tagline}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 shrink-0">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-neutral-300 bg-neutral-900/90 hover:bg-neutral-800 rounded border border-neutral-700/80 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
              )}
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded transition-colors shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live App</span>
                </a>
              )}
            </div>
          </div>

          {/* Tab Selector: Architecture vs Live Simulation */}
          <div className="flex items-center gap-2 border-b border-neutral-800/60 pb-2">
            <button
              onClick={() => setActiveTab('blueprint')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-colors ${
                activeTab === 'blueprint'
                  ? 'bg-indigo-950/80 border border-indigo-500/50 text-indigo-200 font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Architectural Invariants</span>
            </button>
            <button
              onClick={() => setActiveTab('console')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-colors ${
                activeTab === 'console'
                  ? 'bg-indigo-950/80 border border-indigo-500/50 text-indigo-200 font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Runtime Output Stream</span>
            </button>
          </div>

          {activeTab === 'blueprint' ? (
            <div className="space-y-5">
              {/* The Engineering Problem */}
              <div className="space-y-1.5">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  The Engineering Problem
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-neutral-900/50 p-3.5 rounded border border-indigo-950/50">
                  {activeProject.problem}
                </p>
              </div>

              {/* Architecture & Implementation Invariants */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  Architecture & Implementation Mechanics
                </h4>
                <ul className="space-y-2">
                  {activeProject.architecture.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 bg-neutral-950/40 p-2.5 rounded border border-neutral-800/40"
                    >
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Features & Deliverables */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  Core Functional Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProject.keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-neutral-300 bg-neutral-900/40 p-2.5 rounded border border-neutral-800/40 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Terminal / Runtime output stream
            <div className="space-y-3 font-mono text-xs">
              <div className="bg-black/80 rounded border border-indigo-950/80 p-4 text-neutral-300 space-y-2">
                <div className="text-neutral-500 text-[11px]">
                  # SYSTEM EXECUTION HOOK · {activeProject.title.toUpperCase()}
                </div>
                <div className="text-indigo-400">$ node ./runtime/{activeProject.id}.spec.js</div>
                <div className="text-neutral-400">
                  [SYSTEM INITIALIZED] Environment: {activeProject.executionEnvironment || 'Production'}
                </div>
                <div className="text-neutral-300">
                  [VERIFIED SUBSYSTEMS]: {activeProject.stack.slice(0, 4).join(' | ')}
                </div>
                <div className="text-emerald-400">
                  ✓ Core architecture invariants passed verification (4/4 tests).
                </div>
                <div className="text-neutral-400 pt-2 border-t border-neutral-800/60">
                  STATUS: {activeProject.status} · LIVE APPLICATION ACCESSIBLE AT SOBI.CODES
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ====================================================================
            RIGHT: METADATA & TELEMETRY RAIL (Specifications & Stack)
            ==================================================================== */}
        <aside className="lg:col-span-3 space-y-4">
          {/* System Metadata Panel */}
          <div className="bg-neutral-950/65 backdrop-blur-md border border-indigo-950/60 rounded-lg p-4 space-y-3">
            <h3 className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              SYSTEM SPECIFICATIONS
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between pb-1.5 border-b border-indigo-950/40">
                <span className="text-neutral-500">AUTHOR ROLE:</span>
                <span className="text-neutral-200 font-sans font-medium">{activeProject.role}</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-indigo-950/40">
                <span className="text-neutral-500">CATEGORY:</span>
                <span className="text-indigo-300 font-medium">{activeProject.category}</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-indigo-950/40">
                <span className="text-neutral-500">RUNTIME:</span>
                <span className="text-neutral-300 truncate max-w-[150px]">
                  {activeProject.executionEnvironment || 'Production Web'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">STATUS:</span>
                <span className="text-emerald-400 font-bold">{activeProject.status}</span>
              </div>
            </div>
          </div>

          {/* Technology Stack Badges */}
          <div className="bg-neutral-950/65 backdrop-blur-md border border-indigo-950/60 rounded-lg p-4 space-y-2.5">
            <h3 className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              TECHNOLOGY STACK
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {activeProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded bg-indigo-950/40 border border-indigo-500/30 text-[11px] font-mono text-indigo-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Cross-Workspace Jump */}
          <div className="bg-neutral-950/65 backdrop-blur-md border border-indigo-950/60 rounded-lg p-4 space-y-2">
            <h3 className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              PARALLEL WORKSPACES
            </h3>
            <div className="space-y-1.5 text-xs font-mono">
              {featuredProjects
                .filter((p) => p.id !== activeProject.id)
                .slice(0, 3)
                .map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProjectId(p.id)}
                    className="w-full text-left p-1.5 rounded hover:bg-neutral-900/60 text-neutral-400 hover:text-indigo-200 transition-colors flex items-center justify-between"
                  >
                    <span className="truncate">{p.title}</span>
                    <ChevronRight className="w-3 h-3 text-neutral-600" />
                  </button>
                ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};
