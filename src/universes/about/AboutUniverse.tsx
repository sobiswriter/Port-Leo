import React, { useState } from 'react';
import { UniverseId } from '../../types/universe';
import { ABOUT_DOSSIER, UNIVERSES_META } from '../../data/portfolioData';
import {
  User,
  BookOpen,
  Compass,
  ArrowRight,
  Radio,
  Sliders,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
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
  
  // FaultyTerminal Interactive State (ORIGINAL STATE RESTORED)
  const [selectedThemeId, setSelectedThemeId] = useState<string>('amber');
  const [glitchIntensity, setGlitchIntensity] = useState<number>(1.0);
  const [crtCurvature, setCrtCurvature] = useState<number>(0.2);
  const [mouseReact, setMouseReact] = useState<boolean>(true);

  const activeTheme =
    PHOSPHOR_THEMES.find((theme) => theme.id === selectedThemeId) || PHOSPHOR_THEMES[0];

  return (
    <div className="relative min-h-screen w-full bg-[#050608] text-neutral-100 flex flex-col p-4 sm:p-8 lg:p-12 overflow-x-hidden selection:bg-amber-950 selection:text-amber-200">
      {/* 
        ========================================================================
        FaultyTerminal WebGL CRT Glyphs & Phosphor Glitch Surface (ORIGINAL BEHAVIOR RESTORED)
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

      {/* Structural Stage Border Frame */}
      <div className="absolute inset-2 sm:inset-4 pointer-events-none border border-amber-950/40 rounded-lg z-10" />

      {/* LIVING DOSSIER TOP BAR */}
      <header className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-amber-950/50 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-amber-300 uppercase">
              DOSSIER 06 // {currentMeta.name.toUpperCase()}
            </span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">|</span>
          <span className="font-mono text-xs text-neutral-400 hidden sm:inline">
            INTELLECTUAL MONOGRAPH & APPLIED PHILOSOPHY
          </span>
        </div>

        {/* CRT Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-neutral-950/70 border border-amber-950/80 p-0.5 rounded text-[11px] font-mono">
            <span className="text-neutral-400 px-1.5 flex items-center gap-1">
              <Layers className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Phosphor:</span>
            </span>
            {PHOSPHOR_THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedThemeId(t.id)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  selectedThemeId === t.id
                    ? 'bg-amber-600 text-white font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => onTravelTo('beyond')}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-amber-300 transition-colors"
          >
            <span>Next: 07 Beyond</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* ASYMMETRIC LIVING DOSSIER LAYOUT */}
      <main className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ====================================================================
            LEFT: IDENTITY PROFILE DOSSIER (3 cols)
            ==================================================================== */}
        <aside className="lg:col-span-3 bg-neutral-950/65 backdrop-blur-md border border-amber-950/60 rounded-xl p-5 space-y-5">
          <div className="border-b border-amber-950/40 pb-4">
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-1">
              AUTHOR IDENTITY
            </div>
            <h1 className="text-3xl font-bold font-display text-white">
              {ABOUT_DOSSIER.name}
            </h1>
            <div className="text-xs font-mono text-amber-300/90 mt-0.5">
              {ABOUT_DOSSIER.handle}
            </div>
            <div className="text-xs text-neutral-300 mt-2 font-medium">
              {ABOUT_DOSSIER.role}
            </div>
          </div>

          {/* Location & Status */}
          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{ABOUT_DOSSIER.location} ({ABOUT_DOSSIER.coordinates})</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{ABOUT_DOSSIER.timezone}</span>
            </div>
            <div className="p-2.5 rounded bg-amber-950/30 border border-amber-900/40 text-amber-200 text-[11px] leading-relaxed">
              ACTIVE STATE: {ABOUT_DOSSIER.status}
            </div>
          </div>

          {/* Core Disciplines */}
          <div className="space-y-2 pt-2 border-t border-amber-950/40">
            <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
              CORE DISCIPLINES
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ABOUT_DOSSIER.positioning.map((pos) => (
                <span
                  key={pos}
                  className="px-2 py-0.5 rounded bg-neutral-900/80 border border-amber-950/60 text-[11px] font-mono text-amber-200/90"
                >
                  {pos}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* ====================================================================
            CENTER: LARGE PERSONAL NARRATIVE MONOGRAPH (5 cols)
            ==================================================================== */}
        <section className="lg:col-span-5 bg-neutral-950/70 backdrop-blur-md border border-amber-950/70 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-amber-950/40 pb-4">
            <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1">
              PHILOSOPHICAL THESIS
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Systems Over Demos: Building Dependable AI
            </h2>
            <p className="text-xs font-mono text-amber-300 mt-1 italic">
              &ldquo;{ABOUT_DOSSIER.manifestoStatement}&rdquo;
            </p>
          </div>

          {/* Authentic Narrative Paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
            {ABOUT_DOSSIER.narrativeParagraphs.map((para, idx) => (
              <p key={idx} className="leading-relaxed text-balance">
                {para}
              </p>
            ))}
          </div>

          {/* Current Inquiries */}
          <div className="pt-4 border-t border-amber-950/40 space-y-2 font-mono text-xs">
            <div className="text-[11px] text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              CURRENT ACTIVE INQUIRIES
            </div>
            <ul className="space-y-1.5 text-neutral-300 text-[11px]">
              {ABOUT_DOSSIER.currentExplorations.map((exp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">›</span>
                  <span>{exp}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ====================================================================
            RIGHT: ENGINEERING AXIOMS & PRINCIPLES (4 cols)
            ==================================================================== */}
        <aside className="lg:col-span-4 space-y-3">
          <div className="text-[11px] font-mono text-amber-400 tracking-wider uppercase px-1 mb-1">
            CORE ENGINEERING AXIOMS ({ABOUT_DOSSIER.engineeringAxioms.length})
          </div>

          <div className="space-y-3">
            {ABOUT_DOSSIER.engineeringAxioms.map((ax) => (
              <div
                key={ax.number}
                className="bg-neutral-950/65 backdrop-blur-md border border-amber-950/60 rounded-xl p-4 space-y-2 hover:border-amber-700/50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-bold">
                    AXIOM {ax.number}
                  </span>
                  <span className="text-neutral-400 font-sans font-semibold">
                    {ax.title}
                  </span>
                </div>

                <div className="text-xs font-medium text-neutral-200 italic leading-snug">
                  &ldquo;{ax.thesis}&rdquo;
                </div>

                <p className="text-[11px] text-neutral-400 leading-relaxed pt-1 border-t border-amber-950/30">
                  {ax.context}
                </p>
              </div>
            ))}
          </div>

          {/* Offline Pursuits */}
          <div className="bg-neutral-950/60 backdrop-blur-md border border-amber-950/60 rounded-xl p-4 space-y-2 font-mono text-xs">
            <div className="text-[10px] text-amber-400 uppercase tracking-wider">
              OFFLINE PURSUITS & INFLUENCES
            </div>
            <div className="space-y-1 text-[11px] text-neutral-400">
              {ABOUT_DOSSIER.offlinePursuits.map((pur, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-amber-500">·</span>
                  <span>{pur}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 mt-8 pt-4 border-t border-amber-950/50 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Terminal className="w-3 h-3 text-amber-400" />
          LIVING DOSSIER ENGINE · CALM READING CHAMBER
        </span>
        <span>VERIFIED PORTFOLIO MANIFESTO · SOBI.CODES</span>
      </footer>
    </div>
  );
};
