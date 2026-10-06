import React, { useState } from 'react';
import { UniverseId, TopologyNode } from '../../types/universe';
import { TOPOLOGY_NODES, UNIVERSES_META, PROJECTS_DATA } from '../../data/portfolioData';
import {
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  Workflow,
  Radio,
  Terminal,
  ExternalLink,
  ChevronRight,
  Code2,
} from 'lucide-react';
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
  
  // Selected Topology Node (defaults to Python)
  const [selectedNodeId, setSelectedNodeId] = useState<string>('lang-python');
  const [activeClusterFilter, setActiveClusterFilter] = useState<string>('ALL');

  // PixelBlast Interactive Controls (ORIGINAL STATE RESTORED)
  const [pixelVariant, setPixelVariant] = useState<PixelBlastVariant>('diamond');
  const [themeId, setThemeId] = useState<string>('phosphor');

  const activeTheme = PIXEL_THEMES.find((t) => t.id === themeId) || PIXEL_THEMES[0];

  const variants: { id: PixelBlastVariant; label: string }[] = [
    { id: 'diamond', label: 'Diamond' },
    { id: 'square', label: 'Square' },
    { id: 'circle', label: 'Circle' },
    { id: 'triangle', label: 'Triangle' },
  ];

  const clusters: Array<TopologyNode['cluster']> = [
    'LANGUAGES',
    'AI / ML',
    'APPLICATION DEVELOPMENT',
    'SYSTEMS & TOOLING',
  ];

  const activeNode: TopologyNode =
    TOPOLOGY_NODES.find((n) => n.id === selectedNodeId) || TOPOLOGY_NODES[0];

  // Connected nodes set for illumination
  const illuminatedNodeIds = new Set<string>([
    activeNode.id,
    ...activeNode.connectedNodes,
  ]);

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-neutral-100 flex flex-col p-4 sm:p-8 lg:p-10 overflow-x-hidden selection:bg-emerald-900/60 selection:text-white">
      {/* 
        ========================================================================
        PixelBlast WebGL Dithered Matrix Surface (ORIGINAL BEHAVIOR RESTORED)
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
      <div className="absolute inset-2 sm:inset-4 pointer-events-none border border-emerald-950/40 rounded-lg z-10" />

      {/* TOP TOPOLOGY HUD */}
      <header className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-emerald-950/50 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-emerald-300 uppercase">
              TOPOLOGY 04 // {currentMeta.name.toUpperCase()} SYSTEM MAP
            </span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">|</span>
          <span className="font-mono text-xs text-neutral-400 hidden sm:inline">
            INTERACTIVE CAPABILITY NETWORK
          </span>
        </div>

        {/* Theme & Jump Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-neutral-950/70 border border-emerald-950/80 p-0.5 rounded text-[11px] font-mono">
            <span className="text-neutral-400 px-1.5 flex items-center gap-1">
              <Layers className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">Phosphor:</span>
            </span>
            {PIXEL_THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setThemeId(t.id)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  themeId === t.id
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => onTravelTo('journey')}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-emerald-300 transition-colors"
          >
            <span>Next: 05 Journey</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* CLUSTER FILTER STRIP */}
      <div className="relative z-20 flex flex-wrap items-center gap-2 mb-6">
        <span className="text-[11px] font-mono text-neutral-400 mr-1 uppercase">
          CLUSTER FOCUS:
        </span>
        {['ALL', ...clusters].map((cl) => (
          <button
            key={cl}
            onClick={() => setActiveClusterFilter(cl)}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              activeClusterFilter === cl
                ? 'bg-emerald-950/90 border border-emerald-400/80 text-emerald-200 font-bold shadow-xs'
                : 'bg-neutral-950/60 border border-emerald-950/60 text-neutral-400 hover:text-neutral-200 hover:border-emerald-900/60'
            }`}
          >
            {cl}
          </button>
        ))}
      </div>

      {/* MAIN TOPOLOGY INTERACTION CANVAS */}
      <main className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ====================================================================
            LEFT: TOPOLOGY NODE MAP (8 cols - Clustered Network)
            ==================================================================== */}
        <section className="lg:col-span-8 space-y-6">
          {clusters
            .filter((c) => activeClusterFilter === 'ALL' || activeClusterFilter === c)
            .map((clusterName) => {
              const clusterNodes = TOPOLOGY_NODES.filter((n) => n.cluster === clusterName);
              return (
                <div
                  key={clusterName}
                  className="bg-neutral-950/60 backdrop-blur-md border border-emerald-950/60 rounded-xl p-4 sm:p-5 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-emerald-950/40 pb-2">
                    <span className="font-mono text-xs font-semibold tracking-wider text-emerald-400 flex items-center gap-2 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      CLUSTER: {clusterName}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      {clusterNodes.length} NODES
                    </span>
                  </div>

                  {/* Nodes in this cluster */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {clusterNodes.map((node) => {
                      const isSelected = node.id === activeNode.id;
                      const isIlluminated = illuminatedNodeIds.has(node.id);

                      return (
                        <button
                          key={node.id}
                          onClick={() => setSelectedNodeId(node.id)}
                          className={`group text-left p-3 rounded-lg border transition-all duration-200 flex flex-col justify-between ${
                            isSelected
                              ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-md ring-1 ring-emerald-400/50 scale-[1.02]'
                              : isIlluminated
                              ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-100 hover:border-emerald-500'
                              : 'bg-neutral-950/40 border-neutral-800/40 text-neutral-400 hover:border-emerald-900/60 hover:text-neutral-200'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono mb-1 w-full">
                            <span className="truncate text-emerald-400/80 font-semibold">
                              {node.depth}
                            </span>
                            {isIlluminated && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            )}
                          </div>

                          <div className="font-sans font-semibold text-sm text-neutral-100 group-hover:text-white">
                            {node.name}
                          </div>

                          <div className="text-[10px] font-mono text-neutral-500 mt-1 truncate">
                            → {node.relatedProjects.length} Associated Projects
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </section>

        {/* ====================================================================
            RIGHT: FLOATING SYSTEM READOUT TERMINAL (4 cols)
            ==================================================================== */}
        <aside className="lg:col-span-4 bg-neutral-950/80 backdrop-blur-md border border-emerald-950/80 rounded-xl p-5 sm:p-6 space-y-5 sticky top-6">
          {/* Active Node Header */}
          <div className="border-b border-emerald-950/60 pb-4">
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 mb-1">
              <span>NODE INSPECTION</span>
              <span className="text-neutral-700">/</span>
              <span>{activeNode.cluster}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
              <Workflow className="w-5 h-5 text-emerald-400" />
              {activeNode.name}
            </h2>
            <div className="mt-1 text-xs font-mono text-emerald-300">
              DEPTH LEVEL: {activeNode.depth.toUpperCase()}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              CAPABILITY PROFILE
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-neutral-900/40 p-3 rounded border border-emerald-950/50">
              {activeNode.description}
            </p>
          </div>

          {/* Connected Topology Nodes */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              ILLUMINATED ADJACENT NODES ({activeNode.connectedNodes.length})
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {activeNode.connectedNodes.map((targetId) => {
                const targetNode = TOPOLOGY_NODES.find((n) => n.id === targetId);
                return (
                  <button
                    key={targetId}
                    onClick={() => setSelectedNodeId(targetId)}
                    className="px-2 py-1 rounded bg-emerald-950/50 border border-emerald-600/40 text-[11px] font-mono text-emerald-200 hover:bg-emerald-900/60 transition-colors flex items-center gap-1"
                  >
                    <span>{targetNode?.name || targetId}</span>
                    <ChevronRight className="w-3 h-3 text-emerald-400" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Connected Real Projects */}
          <div className="space-y-2 pt-2 border-t border-emerald-950/60">
            <h4 className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              GROUNDED IN PRODUCTION BUILDS ({activeNode.relatedProjects.length})
            </h4>
            <div className="space-y-1.5">
              {activeNode.relatedProjects.map((projTitle) => {
                const projectObj = PROJECTS_DATA.find((p) => p.title === projTitle);
                return (
                  <div
                    key={projTitle}
                    className="p-2 rounded bg-neutral-900/50 border border-neutral-800/60 text-xs font-mono text-neutral-300 flex items-center justify-between"
                  >
                    <span className="font-sans font-medium text-neutral-200 truncate">
                      {projTitle}
                    </span>
                    {projectObj?.liveUrl && (
                      <a
                        href={projectObj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 shrink-0 ml-2"
                        title="View Deployment"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* System Terminal Readout */}
          <div className="pt-2 text-[10px] font-mono text-neutral-500 border-t border-emerald-950/60 flex items-center justify-between">
            <span>GRAPH TOPOLOGY STATUS: ACTIVE</span>
            <span>VERIFIED ON SOBI.CODES</span>
          </div>
        </aside>
      </main>
    </div>
  );
};
