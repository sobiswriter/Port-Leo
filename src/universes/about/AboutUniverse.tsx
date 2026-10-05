import React, { useState } from 'react';
import { UniverseId } from '../../types/universe';
import { ABOUT_DOSSIER, UNIVERSES_META } from '../../data/portfolioData';
import {
  User,
  Book,
  Monitor,
  Compass,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  Terminal,
  Sliders,
  Cpu,
  ShieldCheck,
  Zap,
  Radio,
  ExternalLink,
} from 'lucide-react';
import FaultyTerminal from '../../components/react-bits/FaultyTerminal';

interface AboutUniverseProps {
  onTravelTo: (universeId: UniverseId) => void;
}

interface PhosphorTheme {
  id: string;
  label: string;
  tint: string;
  badgeClass: string;
}

const PHOSPHOR_THEMES: PhosphorTheme[] = [
  {
    id: 'amber',
    label: 'Amber CRT (VT220)',
    tint: '#f59e0b',
    badgeClass: 'text-amber-400 border-amber-500/40 bg-amber-950/30',
  },
  {
    id: 'phosphor',
    label: 'Phosphor Green (VT100)',
    tint: '#10b981',
    badgeClass: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30',
  },
  {
    id: 'cyan',
    label: 'Cyber Cyan (DEC)',
    tint: '#06b6d4',
    badgeClass: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30',
  },
  {
    id: 'monochrome',
    label: 'Monochrome Glass',
    tint: '#e2e8f0',
    badgeClass: 'text-neutral-300 border-neutral-600/40 bg-neutral-900/40',
  },
];

const TERMINAL_GRID_MUL: [number, number] = [2, 1];

export const AboutUniverse: React.FC<AboutUniverseProps> = ({ onTravelTo }) => {
  const currentMeta = UNIVERSES_META.find((u) => u.id === 'about')!;

  // FaultyTerminal Interactive State
  const [selectedThemeId, setSelectedThemeId] = useState<string>('amber');
  const [glitchIntensity, setGlitchIntensity] = useState<number>(1.0);
  const [crtCurvature, setCrtCurvature] = useState<number>(0.2);
  const [mouseReact, setMouseReact] = useState<boolean>(true);
  const [showTerminalControls, setShowTerminalControls] = useState<boolean>(false);

  const activeTheme =
    PHOSPHOR_THEMES.find((theme) => theme.id === selectedThemeId) || PHOSPHOR_THEMES[0];

  return (
    <div className="relative min-h-screen w-full bg-[#050608] text-neutral-100 flex flex-col p-6 sm:p-10 lg:p-12 overflow-hidden selection:bg-amber-950 selection:text-amber-200">
      {/* 
        ========================================================================
        FaultyTerminal WebGL CRT Glyphs & Phosphor Glitch Surface
        Spans the entire About universe with interactive cursor ripples & scanlines
        ========================================================================
      */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FaultyTerminal
          scale={1.4}
          gridMul={TERMINAL_GRID_MUL}
          digitSize={1.3}
          timeScale={0.35}
          pause={false}
          scanlineIntensity={0.38}
          glitchAmount={glitchIntensity}
          flickerAmount={0.8}
          noiseAmp={1.0}
          chromaticAberration={glitchIntensity > 1.5 ? 2.0 : 0.8}
          dither={0.4}
          curvature={crtCurvature}
          tint={activeTheme.tint}
          mouseReact={mouseReact}
          mouseStrength={mouseReact ? 0.35 : 0}
          brightness={0.85}
          pageLoadAnimation={false}
          className="w-full h-full"
        />
        {/* Soft vignette gradient to guarantee pristine reading contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/75 via-[#050608]/50 to-[#050608]/90 pointer-events-none" />
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
              <span className="px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-800/50 text-amber-300 font-semibold">
                UNIVERSE 06
              </span>
              <span aria-hidden="true" className="text-neutral-600">/</span>
              <span className="text-neutral-200 font-semibold uppercase tracking-wider">{currentMeta.name}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">{currentMeta.concept}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight font-display text-white drop-shadow-md">
              Philosophy, Human Tenets & Living Dossier
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-2xl">
              The engineering philosophy, core principles of craft, workstation hardware setup, and intellectual reading canon behind Sobi&apos;s work.
            </p>
          </div>

          {/* Quick Controls & Egress */}
          <div className="flex items-center gap-2.5 self-start lg:self-center">
            <button
              onClick={() => setShowTerminalControls(!showTerminalControls)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                showTerminalControls
                  ? 'bg-amber-950/60 text-amber-200 border-amber-500/60 shadow-lg shadow-amber-950/40'
                  : 'bg-neutral-900/70 text-neutral-400 hover:text-neutral-200 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Terminal HUD {showTerminalControls ? '▲' : '▼'}</span>
            </button>

            <button
              onClick={() => onTravelTo('beyond')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-neutral-900/70 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <span>07 Beyond</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* 
          ========================================================================
          Expandable Faulty Terminal HUD Controller
          ========================================================================
        */}
        {showTerminalControls && (
          <div className="mt-4 p-4 sm:p-5 rounded-xl bg-neutral-950/85 backdrop-blur-xl border border-amber-900/30 text-xs font-mono space-y-4 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-900">
              <div className="flex items-center gap-2 text-amber-300">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="font-semibold uppercase tracking-wider">CRT Mainframe Diagnostics</span>
              </div>
              <span className="text-[11px] text-neutral-500">
                Move cursor over terminal for real-time raster wave displacement
              </span>
            </div>

            {/* Phosphor Presets */}
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-neutral-400 block font-semibold">
                Phosphor Phosphorescence:
              </label>
              <div className="flex flex-wrap gap-2">
                {PHOSPHOR_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedThemeId(theme.id)}
                    className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                      selectedThemeId === theme.id
                        ? `${theme.badgeClass} font-bold shadow-md`
                        : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Glitch & Curvature Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-semibold">
                  Glitch Displacement:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: 'Clean', val: 0.3 },
                    { label: 'Nominal', val: 1.0 },
                    { label: 'Heavy', val: 2.2 },
                  ].map((g) => (
                    <button
                      key={g.label}
                      onClick={() => setGlitchIntensity(g.val)}
                      className={`py-1 text-center rounded border transition-colors ${
                        glitchIntensity === g.val
                          ? 'bg-neutral-200 text-neutral-950 font-bold border-white'
                          : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-white'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-semibold">
                  CRT Glass Curvature:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: 'Flat Glass', val: 0.0 },
                    { label: 'Curved CRT', val: 0.35 },
                  ].map((c) => (
                    <button
                      key={c.label}
                      onClick={() => setCrtCurvature(c.val)}
                      className={`py-1 text-center rounded border transition-colors ${
                        crtCurvature === c.val
                          ? 'bg-neutral-200 text-neutral-950 font-bold border-white'
                          : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-white'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-semibold">
                  Cursor Resonance:
                </span>
                <button
                  onClick={() => setMouseReact(!mouseReact)}
                  className={`w-full py-1.5 px-3 rounded-lg border text-left transition-colors flex items-center justify-between ${
                    mouseReact
                      ? 'bg-amber-950/40 border-amber-700/60 text-amber-200'
                      : 'bg-neutral-900/50 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <span>{mouseReact ? '● Interactive Shockwave' : '○ Static Raster'}</span>
                  <span className="text-[10px] text-amber-400 font-bold">{mouseReact ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 
          ========================================================================
          Main Structural Stage: Split Editorial Dossier
          ========================================================================
        */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 items-start w-full">
          {/* Left Column: Dossier Profile & Workstation Specs (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Identity Capsule */}
            <div className="bg-neutral-950/65 backdrop-blur-md border border-neutral-800/80 rounded-2xl p-6 space-y-5 shadow-xl hover:border-neutral-700 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-950/50 border border-amber-600/40 flex items-center justify-center font-display font-bold text-lg text-amber-200 mb-3 shadow-inner">
                  S
                </div>
                <h2 className="text-xl font-bold font-display text-neutral-100">{ABOUT_DOSSIER.name}</h2>
                <div className="text-xs font-mono text-amber-400/90">{ABOUT_DOSSIER.handle}</div>
                <p className="text-xs text-neutral-300 mt-2 font-mono leading-relaxed">{ABOUT_DOSSIER.role}</p>
              </div>

              <div className="space-y-2 pt-4 border-t border-neutral-800/80 text-xs font-mono">
                <div className="flex items-center gap-2 text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span>{ABOUT_DOSSIER.location}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span>{ABOUT_DOSSIER.timezone}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Compass className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span>{ABOUT_DOSSIER.coordinates}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800/80">
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block mb-1 font-semibold">
                  Current Research Focus:
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {ABOUT_DOSSIER.status}
                </p>
              </div>
            </div>

            {/* Workstation & Hardware Specifications */}
            <div className="bg-neutral-950/65 backdrop-blur-md border border-neutral-800/80 rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2 font-semibold">
                <Monitor className="w-3.5 h-3.5 text-amber-400" />
                Workstation & Hardware Setup
              </h3>

              <div className="space-y-3 text-xs">
                {ABOUT_DOSSIER.workspaceSpecs.map((spec, idx) => (
                  <div key={idx} className="space-y-0.5 bg-neutral-900/40 p-2.5 rounded-lg border border-neutral-800/60">
                    <span className="font-mono text-neutral-500 text-[10px] uppercase tracking-wider block">{spec.category}:</span>
                    <span className="text-neutral-200 leading-snug block font-mono">{spec.item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Non-Deterministic Pursuits */}
            <div className="bg-neutral-950/65 backdrop-blur-md border border-neutral-800/80 rounded-2xl p-6 space-y-3 shadow-xl">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Non-Deterministic Pursuits
              </h3>
              <ul className="space-y-2 text-xs text-neutral-300">
                {ABOUT_DOSSIER.offlinePursuits.map((pursuit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-mono font-bold">›</span>
                    <span className="leading-relaxed font-sans">{pursuit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Right Column: Narrative Essay, Axioms & Reading Bookshelf (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Origin Statement Essay */}
            <section className="bg-neutral-950/65 backdrop-blur-md border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  Origin Statement · The Vertical Slice
                </span>
                <span className="text-[11px] font-mono text-neutral-500">Essay #01</span>
              </div>
              <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans pt-1">
                {ABOUT_DOSSIER.bioParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-pretty">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* The 4 Core Engineering Axioms */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
                <h2 className="text-xs font-mono tracking-wider text-neutral-200 uppercase font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Core Engineering Axioms
                </h2>
                <span className="text-xs font-mono text-neutral-500">Principles of Craft</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ABOUT_DOSSIER.axioms.map((axiom) => (
                  <div
                    key={axiom.number}
                    className="bg-neutral-950/65 backdrop-blur-md border border-neutral-800/80 rounded-2xl p-5 space-y-2.5 hover:border-amber-500/40 hover:bg-neutral-950/80 transition-all duration-200 shadow-xl group"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-neutral-500 font-bold group-hover:text-amber-400 transition-colors">
                        AXIOM {axiom.number}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover:bg-amber-400 transition-colors" />
                    </div>
                    <h3 className="text-base font-semibold text-neutral-100 font-display">
                      &ldquo;{axiom.statement}&rdquo;
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed pt-1 font-sans">
                      {axiom.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Intellectual Influences & Bookshelf */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
                <h2 className="text-xs font-mono tracking-wider text-neutral-200 uppercase flex items-center gap-2 font-semibold">
                  <Book className="w-4 h-4 text-cyan-400" />
                  Foundational Influences & Bookshelf
                </h2>
                <span className="text-xs font-mono text-neutral-500">Intellectual Canon</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ABOUT_DOSSIER.readingList.map((book, idx) => (
                  <div
                    key={idx}
                    className="bg-neutral-950/65 backdrop-blur-md border border-neutral-800/80 rounded-2xl p-4 sm:p-5 space-y-2.5 hover:border-neutral-700 transition-colors shadow-xl"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                      <span className="text-cyan-400/90 font-semibold px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40 text-[10px]">
                        {book.category}
                      </span>
                      <span className="text-[11px] text-neutral-500">{book.author}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-neutral-100 font-display pt-1">
                      {book.title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      {book.impact}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="pt-6 pb-2 border-t border-neutral-800/80 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Personal Dossier · Stage 06/07</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>Axioms, Workstation & Intellectual Canon</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onTravelTo('journey')}
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>← 05 Journey</span>
            </button>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={() => onTravelTo('beyond')}
              className="text-amber-300 hover:text-white transition-colors font-medium flex items-center gap-1"
            >
              <span>Enter 07 Beyond →</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

