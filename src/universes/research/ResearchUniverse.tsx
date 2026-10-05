import React, { useState } from 'react';
import { UniverseId, ResearchPaperItem } from '../../types/universe';
import { RESEARCH_PAPERS, UNIVERSES_META } from '../../data/portfolioData';
import { BookOpen, Copy, Check, FileText, Quote, ArrowUpRight, Search, Sparkles } from 'lucide-react';
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
  const [activeBibtexId, setActiveBibtexId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Lightfall Spectrum State
  const [spectrumId, setSpectrumId] = useState<string>('celestial');
  const activeSpectrum = LIGHT_SPECTRUMS.find((s) => s.id === spectrumId) || LIGHT_SPECTRUMS[0];

  const filteredPapers = RESEARCH_PAPERS.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyBibtex = (paper: ResearchPaperItem) => {
    navigator.clipboard.writeText(paper.bibtex);
    setCopiedId(paper.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-neutral-100 flex flex-col p-6 sm:p-10 lg:p-12 overflow-hidden selection:bg-neutral-800">
      {/* 
        ========================================================================
        Lightfall WebGL Falling Light Streaks Surface
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
      <div className="absolute inset-4 sm:inset-6 pointer-events-none border border-neutral-800/60 rounded-lg z-10" />

      {/* Research Header */}
      <header className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80 backdrop-blur-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>UNIVERSE 03</span>
            <span aria-hidden="true" className="text-neutral-700">/</span>
            <span className="text-neutral-300 font-semibold uppercase">{currentMeta.name}</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="text-neutral-400">{currentMeta.concept}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-display text-neutral-100">
            Papers, Investigations & Preprints
          </h1>
        </div>

        {/* Controls: Lightfall Spectrum & Search */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Light Spectrum Selector */}
          <div className="flex items-center gap-1 bg-neutral-900/80 border border-neutral-800 p-0.5 rounded-md backdrop-blur-md">
            <span className="text-[11px] font-mono text-neutral-400 px-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-neutral-400" />
              <span className="hidden sm:inline">Beam:</span>
            </span>
            {LIGHT_SPECTRUMS.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSpectrumId(spec.id)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  spectrumId === spec.id
                    ? 'bg-neutral-100 text-neutral-950 font-bold shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                }`}
              >
                {spec.label}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Filter topics, venues, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-neutral-900/80 border border-neutral-800 rounded text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 backdrop-blur-md w-52 sm:w-60"
            />
          </div>
        </div>
      </header>

      {/* Main Structural Stage: Academic Monograph Archive */}
      <main className="relative z-10 flex-1 py-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3 text-xs font-mono text-neutral-400">
          <span>Peer-Reviewed Proceedings & Technical Monographs ({filteredPapers.length})</span>
          <span className="text-neutral-300">Total Citations: 175+</span>
        </div>

        <div className="space-y-8">
          {filteredPapers.map((paper) => {
            const isBibtexOpen = activeBibtexId === paper.id;
            return (
              <article
                key={paper.id}
                className="bg-neutral-950/75 backdrop-blur-md border border-neutral-800/80 rounded-xl p-6 sm:p-8 space-y-5 hover:border-neutral-700 transition-colors shadow-lg"
              >
                {/* Monograph Top Metadata Line */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-200 font-semibold">{paper.venue}</span>
                    <span aria-hidden="true" className="text-neutral-700">·</span>
                    <span>{paper.year}</span>
                    <span aria-hidden="true" className="text-neutral-700">·</span>
                    <span className="text-neutral-400">arXiv:{paper.arxivId}</span>
                  </div>

                  <div className="flex items-center gap-3 text-neutral-400">
                    <span className="text-neutral-300 font-medium">{paper.citations} Citations</span>
                    <span aria-hidden="true" className="text-neutral-700">·</span>
                    <span>{paper.readTime}</span>
                  </div>
                </div>

                {/* Monograph Title */}
                <h2 className="text-xl sm:text-2xl font-bold font-display text-neutral-50 leading-snug">
                  {paper.title}
                </h2>

                {/* Formal Abstract */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Abstract
                  </span>
                  <p className="text-sm text-neutral-300 leading-relaxed text-justify">
                    {paper.abstract}
                  </p>
                </div>

                {/* Key Formal Contributions */}
                <div className="space-y-2 bg-neutral-900/60 p-4 rounded-lg border border-neutral-800/80">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Key Theoretical & Engineering Contributions:
                  </span>
                  <ul className="space-y-1.5">
                    {paper.contributions.map((c, cIdx) => (
                      <li key={cIdx} className="text-xs sm:text-sm text-neutral-300 flex items-start gap-2">
                        <span className="text-neutral-500 font-mono select-none">[{cIdx + 1}]</span>
                        <span className="leading-relaxed">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags (Unboxed text with separators) & Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-neutral-800/80">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                    <span className="font-mono text-neutral-500 uppercase">Tags:</span>
                    {paper.tags.map((tag, tIdx) => (
                      <React.Fragment key={tag}>
                        <span className="text-neutral-300">{tag}</span>
                        {tIdx < paper.tags.length - 1 && <span aria-hidden="true" className="text-neutral-700">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setActiveBibtexId(isBibtexOpen ? null : paper.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900/90 hover:bg-neutral-800 rounded border border-neutral-700 transition-colors"
                    >
                      <Quote className="w-3.5 h-3.5" />
                      <span>{isBibtexOpen ? 'Hide BibTeX' : 'Cite (BibTeX)'}</span>
                    </button>

                    <a
                      href={`https://arxiv.org/abs/${paper.arxivId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-950 bg-neutral-100 hover:bg-white rounded transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Read Preprint</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Expandable BibTeX Drawer */}
                {isBibtexOpen && (
                  <div className="pt-3 border-t border-neutral-800/80">
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                      <span>BibTeX Entry</span>
                      <button
                        onClick={() => handleCopyBibtex(paper)}
                        className="inline-flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
                      >
                        {copiedId === paper.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied to clipboard</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Citation</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 rounded-lg bg-neutral-950/90 text-neutral-300 text-xs font-mono overflow-x-auto border border-neutral-800/80 leading-relaxed">
                      {paper.bibtex}
                    </pre>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400 backdrop-blur-xs">
        <div>
          <span>Research Archive · Stage 03/07</span>
          <span aria-hidden="true" className="text-neutral-700"> · </span>
          <span>Surface: Interactive Lightfall Tunnel (WebGL)</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onTravelTo('ai-lab')}
            className="text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            ← 02 AI Lab
          </button>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <button
            onClick={() => onTravelTo('arsenal')}
            className="text-neutral-200 hover:text-white transition-colors font-medium"
          >
            Enter 04 Arsenal →
          </button>
        </div>
      </footer>
    </div>
  );
};

