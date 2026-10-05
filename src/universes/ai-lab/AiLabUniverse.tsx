import React, { useState } from 'react';
import { UniverseId, AiExperimentItem } from '../../types/universe';
import { AI_LAB_EXPERIMENTS, UNIVERSES_META } from '../../data/portfolioData';
import { Play, RotateCcw, Cpu, Sparkles, Terminal, Activity, ArrowRight, Mountain, Sliders } from 'lucide-react';
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
  const [selectedExpId, setSelectedExpId] = useState<string>(AI_LAB_EXPERIMENTS[0].id);

  // Topography Interactive State
  const [activePaletteId, setActivePaletteId] = useState<string>('latent');
  const [fieldSpeed, setFieldSpeed] = useState<number>(0.35);

  const activePalette = TOPO_PALETTES.find((p) => p.id === activePaletteId) || TOPO_PALETTES[0];

  const activeExp: AiExperimentItem =
    AI_LAB_EXPERIMENTS.find((e) => e.id === selectedExpId) || AI_LAB_EXPERIMENTS[0];

  // Interactive Test Bench State
  const [selectedPrompt, setSelectedPrompt] = useState<string>(
    activeExp.demoPromptOptions?.[0] || 'Run synthetic evaluation workload'
  );
  const [temperature, setTemperature] = useState<number>(activeExp.defaultTemperature || 0.2);
  const [contextDepth, setContextDepth] = useState<number>(64);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationLog, setSimulationLog] = useState<string | null>(null);

  const handleSelectExperiment = (exp: AiExperimentItem) => {
    setSelectedExpId(exp.id);
    setSelectedPrompt(exp.demoPromptOptions?.[0] || 'Default evaluation task');
    setTemperature(exp.defaultTemperature || 0.2);
    setSimulationLog(null);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationLog(null);

    setTimeout(() => {
      setIsSimulating(false);
      const output =
        activeExp.sampleOutputs?.[selectedPrompt] ||
        `[Simulation Complete: ${activeExp.title}]\nTemperature: ${temperature.toFixed(2)} | Context: ${contextDepth}k tokens\nExecution finished in 24.8ms. Invariant bounds checked: verified 100% adherence to safety constraints.`;
      setSimulationLog(output);
    }, 450);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-neutral-100 flex flex-col p-6 sm:p-10 lg:p-12 overflow-hidden selection:bg-neutral-800">
      {/* 
        ========================================================================
        Topography WebGL Morphing Elevation Field
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
      <div className="absolute inset-4 sm:inset-6 pointer-events-none border border-neutral-800/60 rounded-lg z-10" />

      {/* AI Lab Universe Header */}
      <header className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80 backdrop-blur-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>UNIVERSE 02</span>
            <span aria-hidden="true" className="text-neutral-700">/</span>
            <span className="text-neutral-300 font-semibold uppercase">{currentMeta.name}</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="text-neutral-400">{currentMeta.concept}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-display text-neutral-100">
            Cognitive Experiments & Model Prototypes
          </h1>
        </div>

        {/* Topography Palette Switcher & Status */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-neutral-900/80 border border-neutral-800 p-0.5 rounded-md backdrop-blur-md">
            <span className="text-[11px] font-mono text-neutral-400 px-2 flex items-center gap-1">
              <Mountain className="w-3 h-3 text-neutral-400" />
              <span className="hidden sm:inline">Manifold:</span>
            </span>
            {TOPO_PALETTES.map((pal) => (
              <button
                key={pal.id}
                onClick={() => setActivePaletteId(pal.id)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  activePaletteId === pal.id
                    ? 'bg-neutral-100 text-neutral-950 font-bold shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                }`}
              >
                {pal.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>5 Active Prototypes</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Structural Stage: Split Laboratory Bench */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 items-start">
        {/* Left: Experiment Registry (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono tracking-wider text-neutral-400 uppercase flex items-center justify-between px-1 mb-2">
            <span>Active Hypotheses ({AI_LAB_EXPERIMENTS.length})</span>
            <span className="text-neutral-400">Select to run</span>
          </div>

          <div className="space-y-2.5">
            {AI_LAB_EXPERIMENTS.map((exp) => {
              const isSelected = exp.id === activeExp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => handleSelectExperiment(exp)}
                  className={`w-full text-left p-4 rounded-lg border backdrop-blur-md transition-all ${
                    isSelected
                      ? 'bg-neutral-900/90 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/20'
                      : 'bg-neutral-950/70 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1">
                    <span>{exp.type}</span>
                    <span className="text-neutral-300 font-semibold">{exp.status}</span>
                  </div>

                  <h3 className="text-base font-semibold text-neutral-100">{exp.title}</h3>

                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {exp.hypothesis}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive Experimentation & Simulation Bench (7 Cols) */}
        <div className="lg:col-span-7 bg-neutral-950/80 backdrop-blur-md border border-neutral-800/80 rounded-xl p-6 sm:p-8 space-y-6">
          {/* Active Experiment Header */}
          <div className="border-b border-neutral-800/80 pb-5">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1">
              <span>PROTOTYPE SPECIFICATION</span>
              <span className="text-neutral-300 font-semibold">{activeExp.type}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-neutral-50">
              {activeExp.title}
            </h2>
            <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
              {activeExp.hypothesis}
            </p>
          </div>

          {/* Architecture Hook Details */}
          <div className="space-y-1.5 bg-neutral-900/60 p-4 rounded-lg border border-neutral-800/80">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
              Kernel & Pipeline Architecture
            </span>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-mono">
              {activeExp.architecture}
            </p>
          </div>

          {/* Empirical Benchmarks Table */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
              Empirical Evaluation vs Baseline
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeExp.evalMetrics.map((metric, idx) => (
                <div key={idx} className="bg-neutral-900/70 p-3 rounded-lg border border-neutral-800/80">
                  <div className="text-xs text-neutral-400">{metric.name}</div>
                  <div className="text-xl font-bold font-mono text-neutral-100 mt-1">
                    {metric.value}
                  </div>
                  <div className="text-xs text-neutral-500 font-mono mt-0.5">
                    Baseline: {metric.baseline}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Simulation Console */}
          <div className="pt-4 border-t border-neutral-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                Live Execution Simulator
              </span>
              <span className="text-xs font-mono text-neutral-400">Interactive Test Harness</span>
            </div>

            {/* Prompt Selector */}
            {activeExp.demoPromptOptions && activeExp.demoPromptOptions.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs text-neutral-400 block">Select Evaluation Workload:</label>
                <div className="space-y-1.5">
                  {activeExp.demoPromptOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedPrompt(opt);
                        setSimulationLog(null);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs rounded transition-colors border ${
                        selectedPrompt === opt
                          ? 'bg-neutral-800 border-neutral-600 text-neutral-100 font-medium'
                          : 'bg-neutral-950/60 border-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Controls (Temperature & Context) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-900/60 p-3.5 rounded-lg border border-neutral-800/80 text-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-neutral-400 font-mono">
                  <span>Temperature</span>
                  <span>{temperature.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-neutral-400 font-mono">
                  <span>Context Window</span>
                  <span>{contextDepth}k tokens</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="128"
                  step="16"
                  value={contextDepth}
                  onChange={(e) => setContextDepth(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Trigger Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-neutral-100 hover:bg-white rounded transition-colors disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <Activity className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Inference...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Execute Inference Simulation</span>
                  </>
                )}
              </button>

              {simulationLog && (
                <button
                  onClick={() => setSimulationLog(null)}
                  className="text-xs text-neutral-400 hover:text-neutral-200 flex items-center gap-1 font-mono"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear Output</span>
                </button>
              )}
            </div>

            {/* Simulation Output Terminal Log */}
            {simulationLog && (
              <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 text-xs font-mono text-neutral-300 whitespace-pre-wrap leading-relaxed">
                {simulationLog}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Nav */}
      <footer className="relative z-10 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400 backdrop-blur-xs">
        <div>
          <span>AI Lab Workbench · Stage 02/07</span>
          <span aria-hidden="true" className="text-neutral-700"> · </span>
          <span>Surface: Interactive Morphing Topography (WebGL)</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onTravelTo('builder')}
            className="text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            ← 01 Builder
          </button>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <button
            onClick={() => onTravelTo('research')}
            className="text-neutral-200 hover:text-white transition-colors font-medium"
          >
            Enter 03 Research →
          </button>
        </div>
      </footer>
    </div>
  );
};

