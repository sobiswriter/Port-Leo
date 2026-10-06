import React, { useState } from 'react';
import { UniverseId, ResearchRecordItem } from '../../types/universe';
import { RESEARCH_RECORDS, UNIVERSES_META } from '../../data/portfolioData';
import {
  FileText,
  Bookmark,
  Award,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Layers,
  Compass,
  Radio,
} from 'lucide-react';
import Lightfall from '../../components/react-bits/Lightfall';

interface ResearchUniverseProps {
  onTravelTo: (universeId: UniverseId) => void;
}

interface LightSpectrum {
  id: string;
  label: string;
  colors: string[];
  backgroundColor: string;
}

const LIGHT_SPECTRUMS: LightSpectrum[] = [
  {
    id: 'celestial',
    label: 'Celestial Archive',
    colors: ['#A6C8FF', '#5227FF', '#FF9FFC', '#FFFFFF'],
    backgroundColor: '#050714',
  },
  {
    id: 'quantum',
    label: 'Quantum Prism',
    colors: ['#38BDF8', '#818CF8', '#C084FC', '#FFFFFF'],
    backgroundColor: '#060a1f',
  },
  {
    id: 'aurora',
    label: 'Aurora Borealis',
    colors: ['#34D399', '#22D3EE', '#60A5FA', '#FFFFFF'],
    backgroundColor: '#030e12',
  },
  {
    id: 'solar',
    label: 'Solar Monograph',
    colors: ['#FDE047', '#FB923C', '#F43F5E', '#FFFFFF'],
    backgroundColor: '#140507',
  },
];

export const ResearchUniverse: React.FC<ResearchUniverseProps> = ({ onTravelTo }) => {
  const currentMeta = UNIVERSES_META.find((u) => u.id === 'research')!;
  const [selectedRecordId, setSelectedRecordId] = useState<string>('res-doc-intelligence');

  // Lightfall Spectrum State
  const [spectrumId, setSpectrumId] = useState<string>('celestial');
  const activeSpectrum = LIGHT_SPECTRUMS.find((s) => s.id === spectrumId) || LIGHT_SPECTRUMS[0];

  const activeRecord: ResearchRecordItem =
    RESEARCH_RECORDS.find((r) => r.id === selectedRecordId) || RESEARCH_RECORDS[0];

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-neutral-100 flex flex-col p-4 sm:p-8 lg:p-10 overflow-x-hidden selection:bg-indigo-900/60 selection:text-white">
      {/* 
        ========================================================================
        Lightfall WebGL Falling Light Streaks Surface (ORIGINAL BEHAVIOR RESTORED)
        Spans the entire Research universe with interactive cursor illumination
        ========================================================================
      */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Lightfall
          colors={activeSpectrum.colors}
          backgroundColor={activeSpectrum.backgroundColor}
          speed={0.45}
          streakCount={3}
          streakWidth={1.0}
          streakLength={1.3}
          glow={0.9}
          density={0.5}
          twinkle={0.8}
          zoom={2.5}
          backgroundGlow={0.35}
          opacity={0.65}
          mouseInteraction={true}
          mouseStrength={0.6}
          mouseRadius={0.9}
          mouseDampening={0.15}
        />
        {/* Subtle radial scrim to preserve typography contrast while keeping falling light streaks vivid throughout */}
        <div className="absolute inset-0 bg-radial-[at_50%_30%] from-transparent via-[#050505]/40 to-[#050505]/85 pointer-events-none" />
      </div>

      {/* Structural Stage Border Frame */}
      <div className="absolute inset-2 sm:inset-4 pointer-events-none border border-indigo-950/40 rounded-lg z-10" />

      {/* ARCHIVE TOP BAR */}
      <header className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-indigo-900/30 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-indigo-300 uppercase">
              ARCHIVE 03 // {currentMeta.name.toUpperCase()} DOSSIER
            </span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">|</span>
          <span className="font-mono text-xs text-neutral-400 hidden sm:inline">
            INVESTIGATIONS & VERIFIED PUBLICATION SIGNALS
          </span>
        </div>

        {/* Spectrum Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-neutral-950/70 border border-indigo-950/80 p-0.5 rounded text-[11px] font-mono">
            <span className="text-neutral-400 px-1.5 flex items-center gap-1">
              <Layers className="w-3 h-3 text-indigo-400" />
              <span className="hidden sm:inline">Stream:</span>
            </span>
            {LIGHT_SPECTRUMS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSpectrumId(s.id)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  spectrumId === s.id
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => onTravelTo('arsenal')}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-indigo-300 transition-colors"
          >
            <span>Next: 04 Arsenal</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* ASYMMETRIC INVESTIGATION ARCHIVE LAYOUT */}
      <main className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ====================================================================
            SIDE: INVESTIGATION THREADS & SIGNAL DIRECTORY (4 cols)
            ==================================================================== */}
        <aside className="lg:col-span-4 space-y-2.5">
          <div className="text-[11px] font-mono text-indigo-400 tracking-wider uppercase px-1 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              DOSSIER DIRECTORY ({RESEARCH_RECORDS.length})
            </span>
            <span className="text-neutral-500">SELECT RECORD</span>
          </div>

          <div className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {RESEARCH_RECORDS.map((rec) => {
              const isSelected = rec.id === activeRecord.id;
              return (
                <button
                  key={rec.id}
                  onClick={() => setSelectedRecordId(rec.id)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all duration-200 backdrop-blur-md ${
                    isSelected
                      ? 'bg-indigo-950/80 border-indigo-500/70 text-white shadow-lg ring-1 ring-indigo-500/30'
                      : 'bg-neutral-950/50 border-indigo-950/50 text-neutral-400 hover:bg-neutral-900/60 hover:text-neutral-200 hover:border-indigo-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-indigo-300 font-semibold">{rec.type}</span>
                    {rec.signalBadge && (
                      <span className="text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
                        {rec.signalBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-sans font-semibold text-sm text-neutral-100 group-hover:text-white">
                    {rec.title}
                  </h3>

                  <div className="text-[11px] font-mono text-neutral-500 mt-1 truncate">
                    {rec.domain}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ====================================================================
            MAIN: LARGE DOCUMENTARY DOSSIER SURFACE (8 cols)
            ==================================================================== */}
        <section className="lg:col-span-8 bg-neutral-950/75 backdrop-blur-md border border-indigo-950/70 rounded-xl p-6 sm:p-8 space-y-6">
          {/* Dossier Record Header */}
          <div className="border-b border-indigo-950/60 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-indigo-400 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/40 text-indigo-200 font-semibold">
                  {activeRecord.type}
                </span>
                <span className="text-neutral-600">/</span>
                <span className="text-neutral-300">{activeRecord.domain}</span>
              </div>
              {activeRecord.dateOrEra && (
                <span className="text-neutral-400 font-mono">EPOCH: {activeRecord.dateOrEra}</span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {activeRecord.title}
            </h2>

            <p className="text-sm text-neutral-300 mt-2 leading-relaxed bg-neutral-900/40 p-3.5 rounded border border-indigo-950/50">
              {activeRecord.overview}
            </p>
          </div>

          {/* Investigation Analysis Points */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
              INVESTIGATION FOCUS & ARCHITECTURAL INQUIRY
            </h4>
            <div className="space-y-2">
              {activeRecord.investigationDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded bg-neutral-900/50 border border-indigo-950/40 text-xs sm:text-sm text-neutral-200"
                >
                  <span className="text-indigo-400 font-mono text-xs font-semibold shrink-0 mt-0.5">
                    0{idx + 1}.
                  </span>
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Findings & Real Outcomes */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              EMPIRICAL FINDINGS & SYSTEM VALIDATION
            </h4>
            <div className="space-y-2">
              {activeRecord.keyOutcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded bg-indigo-950/20 border border-indigo-900/40 text-xs sm:text-sm text-indigo-100"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Artifacts & Systems */}
          <div className="pt-4 border-t border-indigo-950/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-neutral-500">CONNECTED ARTIFACTS:</span>
              {activeRecord.artifactsAndTools.map((art) => (
                <span
                  key={art}
                  className="px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-700/40 text-indigo-200 text-[11px]"
                >
                  {art}
                </span>
              ))}
            </div>

            <div className="text-neutral-500">
              VERIFIED DOSSIER · SOBI.CODES ARCHIVE
            </div>
          </div>
        </section>
      </main>

      {/* BOTTOM: RECOGNITION & PUBLICATION SIGNALS STREAM */}
      <footer className="relative z-20 mt-6 pt-4 border-t border-indigo-950/50">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            VERIFIED PUBLICATION & COMPETITIVE SIGNALS STREAM
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              { label: 'PATENT PUBLICATION', desc: 'System & Computational IP' },
              { label: 'AIFUSION IIT ROPAR', desc: 'Applied AI Honors' },
              { label: 'OPENXAI 2025', desc: 'India Accelerator Cohort' },
              { label: 'HACKTOSKILL 2025', desc: 'LegalLM Innovation' },
              { label: 'TECH FEST IIT ROPAR', desc: 'Engineering Distinction' },
              { label: 'IMC & ODDO MEET', desc: 'Industry Assemblies' },
            ].map((sig, i) => (
              <div
                key={i}
                className="p-2 rounded bg-neutral-950/60 border border-indigo-950/50 text-left font-mono backdrop-blur-xs"
              >
                <div className="text-[10px] font-semibold text-indigo-300 truncate">
                  {sig.label}
                </div>
                <div className="text-[9px] text-neutral-500 truncate">
                  {sig.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};
