import React, { useState } from 'react';
import { UniverseId, AiLabExperiment } from '../../types/universe';
import { AI_LAB_EXPERIMENTS, UNIVERSES_META } from '../../data/portfolioData';
import {
  Sparkles,
  Cpu,
  Brain,
  Sliders,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Workflow,
  ArrowRight,
  Terminal,
  Activity,
  Layers,
} from 'lucide-react';
import Topography from '../../components/react-bits/Topography';

interface AiLabUniverseProps {
  onTravelTo: (universeId: UniverseId) => void;
}

interface TopoPalette {
  id: string;
  label: string;
  low: string;
  mid: string;
  high: string;
}

const TOPO_PALETTES: TopoPalette[] = [
  { id: 'latent', label: 'Latent Manifold', low: '#5227FF', mid: '#FF9FFC', high: '#FFFFFF' },
  { id: 'loss', label: 'Loss Surface', low: '#06B6D4', mid: '#3B82F6', high: '#FFFFFF' },
  { id: 'neural', label: 'Neural Field', low: '#10B981', mid: '#06B6D4', high: '#FFFFFF' },
  { id: 'tensor', label: 'Deep Tensor', low: '#7C3AED', mid: '#A855F7', high: '#FFFFFF' },
];

export const AiLabUniverse: React.FC<AiLabUniverseProps> = ({ onTravelTo }) => {
  const currentMeta = UNIVERSES_META.find((u) => u.id === 'ai-lab')!;
  const [selectedExpId, setSelectedExpId] = useState<string>('project-aic');

  // Topography Original Interactive State
  const [activePaletteId, setActivePaletteId] = useState<string>('latent');
  const [fieldSpeed, setFieldSpeed] = useState<number>(0.35);
  const activePalette = TOPO_PALETTES.find((p) => p.id === activePaletteId) || TOPO_PALETTES[0];

  const activeExp: AiLabExperiment =
    AI_LAB_EXPERIMENTS.find((e) => e.id === selectedExpId) || AI_LAB_EXPERIMENTS[0];

  // Interactive Probe state (if probe exists on active experiment)
  const probe = activeExp.interactiveProbe;
  const [probeParams, setProbeParams] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (probe) {
      probe.parameters.forEach((param) => {
        initial[param.id] = param.defaultVal;
      });
    }
    return initial;
  });

  const handleParamChange = (paramId: string, val: string) => {
    setProbeParams((prev) => ({ ...prev, [paramId]: val }));
  };

  const probeKey = probe
    ? Object.values(probeParams).join('_')
    : '';
  const probeEvaluation = probe
    ? probe.evaluations[probeKey] || Object.values(probe.evaluations)[0]
    : null;

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-neutral-100 flex flex-col p-4 sm:p-8 lg:p-10 overflow-x-hidden selection:bg-purple-900/60 selection:text-white">
      {/* 
        ========================================================================
        Topography WebGL Morphing Elevation Field (ORIGINAL BEHAVIOR RESTORED)
        Spans the entire AI Lab universe with interactive cursor elevation bumps
        ========================================================================
      */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Topography
          lowColor={activePalette.low}
          midColor={activePalette.mid}
          highColor={activePalette.high}
          speed={fieldSpeed}
          morphAmount={2.8}
          morphSpeed={0.06}
          bands={2.4}
          thickness={0.012}
          scale={1.05}
          pixelSize={1.0}
          glow={0.55}
          colorMode="elevation"
          contrast={2.8}
          brightness={1.1}
          fillBands={false}
          opacity={0.65}
          grain={true}
          grainIntensity={0.04}
          mouseInteraction={true}
          mouseRadius={0.32}
          mouseStrength={0.45}
        />
        {/* Subtle radial scrim to preserve text contrast while keeping contour lines visible everywhere */}
        <div className="absolute inset-0 bg-radial-[at_50%_35%] from-transparent via-[#050505]/40 to-[#050505]/85 pointer-events-none" />
      </div>

      {/* Structural Stage Border Frame */}
      <div className="absolute inset-2 sm:inset-4 pointer-events-none border border-purple-950/40 rounded-lg z-10" />

      {/* OBSERVATORY HEADER */}
      <header className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-purple-900/30 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-purple-300 uppercase">
              OBSERVATORY 02 // {currentMeta.name.toUpperCase()}
            </span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">|</span>
          <span className="font-mono text-xs text-neutral-400 hidden sm:inline">
            COGNITIVE & BEHAVIORAL INVESTIGATIONS
          </span>
        </div>

        {/* Contour Color Spectrum Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-neutral-950/70 border border-purple-950/80 p-0.5 rounded text-[11px] font-mono">
            <span className="text-neutral-400 px-1.5 flex items-center gap-1">
              <Layers className="w-3 h-3 text-purple-400" />
              <span className="hidden sm:inline">Contour:</span>
            </span>
            {TOPO_PALETTES.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePaletteId(p.id)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  activePaletteId === p.id
                    ? 'bg-purple-600 text-white font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => onTravelTo('research')}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-purple-300 transition-colors"
          >
            <span>Next: 03 Research</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* CONTROLLED ASYMMETRY / FLOATING EXPERIMENT CONSOLE */}
      <main className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ====================================================================
            LEFT: FLOATING EXPERIMENT CAPSULES (Vertical Stack)
            ==================================================================== */}
        <aside className="lg:col-span-4 space-y-2.5">
          <div className="text-[11px] font-mono text-purple-400 tracking-wider uppercase px-1 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-purple-400" />
              EXPERIMENT CAPSULES ({AI_LAB_EXPERIMENTS.length})
            </span>
            <span className="text-neutral-500">SELECT TO OBSERVE</span>
          </div>

          <div className="space-y-2">
            {AI_LAB_EXPERIMENTS.map((exp) => {
              const isSelected = exp.id === activeExp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => setSelectedExpId(exp.id)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all duration-200 backdrop-blur-md ${
                    isSelected
                      ? 'bg-purple-950/70 border-purple-500/70 text-white shadow-lg ring-1 ring-purple-500/40 translate-x-1'
                      : 'bg-neutral-950/50 border-purple-950/50 text-neutral-300 hover:bg-neutral-900/60 hover:border-purple-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1">
                    <span className="text-purple-300 uppercase">{exp.focusArea}</span>
                    <span className="text-neutral-500">{exp.status}</span>
                  </div>

                  <h3 className="font-sans font-semibold text-sm text-neutral-100 group-hover:text-white">
                    {exp.title}
                  </h3>

                  <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {exp.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ====================================================================
            RIGHT: SELECTED EXPERIMENT OBSERVATORY (What, Why, How, Explored, Learned)
            ==================================================================== */}
        <section className="lg:col-span-8 bg-neutral-950/70 backdrop-blur-md border border-purple-950/70 rounded-xl p-5 sm:p-7 space-y-6">
          {/* Top Experiment Header */}
          <div className="border-b border-purple-900/30 pb-5">
            <div className="flex items-center gap-2 text-[11px] font-mono text-purple-400 mb-1">
              <span>EXPERIMENT SPECIFICATION</span>
              <span className="text-neutral-700">/</span>
              <span className="text-neutral-300">{activeExp.focusArea}</span>
              <span className="text-neutral-700">·</span>
              <span className="text-emerald-400">{activeExp.status}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {activeExp.title}
            </h2>
            <p className="text-sm text-purple-200/90 mt-1 leading-relaxed">
              {activeExp.tagline}
            </p>
          </div>

          {/* THE 5 CORE PILLARS: WHAT, WHY, HOW, EXPLORED, LEARNED */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. WHAT */}
            <div className="bg-neutral-900/50 border border-purple-950/60 rounded-lg p-4 space-y-1.5">
              <div className="text-[11px] font-mono text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-purple-400" />
                WHAT IT IS
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {activeExp.what}
              </p>
            </div>

            {/* 2. WHY */}
            <div className="bg-neutral-900/50 border border-purple-950/60 rounded-lg p-4 space-y-1.5">
              <div className="text-[11px] font-mono text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                WHY IT WAS BUILT
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {activeExp.why}
              </p>
            </div>

            {/* 3. HOW */}
            <div className="bg-neutral-900/50 border border-purple-950/60 rounded-lg p-4 space-y-1.5 md:col-span-2">
              <div className="text-[11px] font-mono text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5 text-purple-400" />
                HOW IT WAS ARCHITECTED
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {activeExp.how}
              </p>
            </div>

            {/* 4. WHAT WAS EXPLORED */}
            <div className="bg-neutral-900/50 border border-purple-950/60 rounded-lg p-4 space-y-1.5">
              <div className="text-[11px] font-mono text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-purple-400" />
                WHAT WAS EXPLORED
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {activeExp.whatWasExplored}
              </p>
            </div>

            {/* 5. WHAT WAS LEARNED */}
            <div className="bg-purple-950/30 border border-purple-600/40 rounded-lg p-4 space-y-1.5">
              <div className="text-[11px] font-mono text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-purple-300" />
                WHAT WAS LEARNED
              </div>
              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                {activeExp.whatWasLearned}
              </p>
            </div>
          </div>

          {/* INTERACTIVE MODEL / PARAMETER PROBE (If available) */}
          {probe && (
            <div className="bg-black/60 border border-purple-900/40 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-purple-950/80 pb-2">
                <span className="text-xs font-mono text-purple-300 font-semibold flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-purple-400" />
                  {probe.title.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-neutral-500">INTERACTIVE PROBE</span>
              </div>

              <p className="text-xs text-neutral-400">
                {probe.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {probe.parameters.map((param) => (
                  <div key={param.id} className="space-y-1">
                    <label className="text-[11px] font-mono text-neutral-400 block">
                      {param.label}
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {param.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleParamChange(param.id, opt)}
                          className={`px-2 py-1 text-[11px] font-mono rounded transition-colors ${
                            probeParams[param.id] === opt
                              ? 'bg-purple-600 text-white font-bold shadow-xs'
                              : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {probeEvaluation && (
                <div className="mt-3 p-3 bg-neutral-950/80 rounded border border-purple-950/60 font-mono text-xs text-purple-200 whitespace-pre-wrap leading-relaxed">
                  {probeEvaluation}
                </div>
              )}
            </div>
          )}

          {/* TECHNOLOGIES & LINKED SYSTEMS */}
          <div className="pt-4 border-t border-purple-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-neutral-500 mr-1">TECHNOLOGIES:</span>
              {activeExp.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-purple-950/50 border border-purple-700/40 text-purple-200 text-[11px]"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="text-neutral-400">
              <span className="text-neutral-500">RELATED: </span>
              {activeExp.relatedProjects.join(', ')}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
