import React, { useState, useMemo } from 'react';
import { UniverseId } from '../../types/universe';
import { BEYOND_DATA, UNIVERSES_META } from '../../data/portfolioData';
import {
  Send,
  Copy,
  Check,
  ExternalLink,
  Radio,
  Terminal,
  FileText,
  RotateCcw,
  Layers,
  ArrowRight,
  ShieldCheck,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';
import Hyperspeed, { HyperspeedEffectOptions, DEFAULT_HYPERSPEED_OPTIONS } from '../../components/react-bits/Hyperspeed';

interface BeyondUniverseProps {
  onTravelTo: (universeId: UniverseId) => void;
}

interface WarpPreset {
  id: string;
  label: string;
  distortion: HyperspeedEffectOptions['distortion'];
  colors: HyperspeedEffectOptions['colors'];
  badgeClass: string;
}

const WARP_PRESETS: WarpPreset[] = [
  {
    id: 'cyber',
    label: 'Cyber Neon (Ultraviolet & Cyan)',
    distortion: 'turbulentDistortion',
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0xffffff,
      brokenLines: 0xffffff,
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
      rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
      sticks: 0x03b3c3,
    },
    badgeClass: 'text-violet-400 border-violet-500/40 bg-violet-950/30',
  },
  {
    id: 'solar',
    label: 'Solar Hyperdrive (Amber & Crimson)',
    distortion: 'mountainDistortion',
    colors: {
      roadColor: 0x0a0505,
      islandColor: 0x0d0707,
      background: 0x000000,
      shoulderLines: 0xffedd5,
      brokenLines: 0xfde047,
      leftCars: [0xf59e0b, 0xfbbf24, 0xd97706],
      rightCars: [0xef4444, 0xdc2626, 0xb91c1c],
      sticks: 0xf59e0b,
    },
    badgeClass: 'text-amber-400 border-amber-500/40 bg-amber-950/30',
  },
  {
    id: 'quantum',
    label: 'Quantum Nexus (Emerald & Azure)',
    distortion: 'deepDistortion',
    colors: {
      roadColor: 0x050a08,
      islandColor: 0x070d0a,
      background: 0x000000,
      shoulderLines: 0xa7f3d0,
      brokenLines: 0x67e8f9,
      leftCars: [0x10b981, 0x059669, 0x34d399],
      rightCars: [0x06b6d4, 0x0891b2, 0x22d3ee],
      sticks: 0x10b981,
    },
    badgeClass: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30',
  },
  {
    id: 'starlight',
    label: 'Interstellar Monolith (Pure Starlight)',
    distortion: 'LongRaceDistortion',
    colors: {
      roadColor: 0x08080a,
      islandColor: 0x0a0a0d,
      background: 0x000000,
      shoulderLines: 0xffffff,
      brokenLines: 0xffffff,
      leftCars: [0xffffff, 0xe2e8f0, 0x94a3b8],
      rightCars: [0x38bdf8, 0x0284c7, 0x0369a1],
      sticks: 0xffffff,
    },
    badgeClass: 'text-neutral-300 border-neutral-600/40 bg-neutral-900/40',
  },
];

export const BeyondUniverse: React.FC<BeyondUniverseProps> = ({ onTravelTo }) => {
  const currentMeta = UNIVERSES_META.find((u) => u.id === 'beyond')!;
  
  // Hyperspeed Warp State (ORIGINAL STATE RESTORED)
  const [selectedPresetId, setSelectedPresetId] = useState<string>('cyber');
  const activePreset =
    WARP_PRESETS.find((p) => p.id === selectedPresetId) || WARP_PRESETS[0];

  const hyperspeedOptions = useMemo<HyperspeedEffectOptions>(() => {
    return {
      ...DEFAULT_HYPERSPEED_OPTIONS,
      distortion: activePreset.distortion,
      colors: activePreset.colors,
      fov: 90,
      fovSpeedUp: 145,
      speedUp: 6.0,
      lanesPerRoad: 4,
      length: 400,
    };
  }, [activePreset]);

  // Message composition form state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('Technical Collaboration');
  const [message, setMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [transmissionSent, setTransmissionSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(BEYOND_DATA.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Build mailto link
    const mailtoUrl = `mailto:${BEYOND_DATA.email}?subject=${encodeURIComponent(
      `[Multiverse Transmission] ${subject} - from ${senderName || 'Visitor'}`
    )}&body=${encodeURIComponent(
      `From: ${senderName} (${senderEmail})\n\n${message}`
    )}`;

    window.open(mailtoUrl, '_blank');
    setTransmissionSent(true);
    setTimeout(() => setTransmissionSent(false), 4000);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030305] text-neutral-100 flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-x-hidden selection:bg-cyan-950 selection:text-cyan-200">
      {/* 
        ========================================================================
        Hyperspeed WebGL 3D Warp Tunnel Highway Surface (ORIGINAL BEHAVIOR RESTORED)
        Spans the entire Beyond universe with blooming speed trails & camera warp
        ========================================================================
      */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Hyperspeed
          effectOptions={hyperspeedOptions}
          className="w-full h-full"
        />
        {/* Soft atmospheric gradient scrim ensuring crisp readability of all console forms */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030305]/75 via-[#030305]/50 to-[#030305]/90 pointer-events-none" />
      </div>

      {/* Structural Stage Border Frame */}
      <div className="absolute inset-2 sm:inset-4 pointer-events-none border border-cyan-950/40 rounded-lg z-10" />

      {/* TRANSMISSION TOP STATUS BAR */}
      <header className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-cyan-950/50 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-cyan-300 uppercase">
              EGRESS 07 // {currentMeta.name.toUpperCase()} TERMINAL
            </span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">|</span>
          <span className="font-mono text-xs text-neutral-400 hidden sm:inline">
            DISPATCH PROTOCOL ACTIVE
          </span>
        </div>

        {/* Warp Controls & Reset Loop */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onTravelTo('arrival')}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 hover:text-white hover:bg-cyan-900/60 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Return to Chamber 00</span>
          </button>
        </div>
      </header>

      {/* COMPACT TRANSMISSION TERMINAL (Flanked by Warp Beams) */}
      <main className="relative z-20 my-auto py-6 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ====================================================================
            LEFT: MESSAGE COMPOSITION TERMINAL (7 cols)
            ==================================================================== */}
        <section className="lg:col-span-7 bg-neutral-950/80 backdrop-blur-md border border-cyan-950/80 rounded-xl p-5 sm:p-7 space-y-5 shadow-2xl">
          <div className="border-b border-cyan-950/60 pb-3">
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
              DISPATCH TERMINAL
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Transmit Direct Dispatch
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Send an inquiry directly to Sobi via authenticated mail dispatch protocol.
            </p>
          </div>

          <form onSubmit={handleTransmit} className="space-y-3.5 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-neutral-400 text-[11px]">SENDER IDENTITY / NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-neutral-900/80 border border-neutral-800 rounded px-3 py-2 text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 text-[11px]">RETURN FREQUENCY / EMAIL</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. elena@research.org"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full bg-neutral-900/80 border border-neutral-800 rounded px-3 py-2 text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 text-[11px]">SUBJECT / VECTOR</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-neutral-900/80 border border-neutral-800 rounded px-3 py-2 text-neutral-200 focus:outline-none focus:border-cyan-400"
              >
                <option value="Technical Collaboration">Technical Collaboration & Architecture</option>
                <option value="Applied AI Role">Engineering Opportunities & Roles</option>
                <option value="Document Intelligence">Document Intelligence Discussion</option>
                <option value="General Inquiry">General Multiverse Transmission</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 text-[11px]">TRANSMISSION PAYLOAD / MESSAGE</label>
              <textarea
                required
                rows={4}
                placeholder="Compose your dispatch message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-neutral-900/80 border border-neutral-800 rounded p-3 text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-cyan-400 leading-relaxed resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] text-neutral-500 font-mono">
                DISPATCH ENCRYPTED & LOGGED
              </span>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold transition-colors shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{transmissionSent ? 'DISPATCH PREPARED!' : 'TRANSMIT MESSAGE'}</span>
              </button>
            </div>
          </form>
        </section>

        {/* ====================================================================
            RIGHT: VERIFIED PUBLIC CHANNELS (5 cols)
            ==================================================================== */}
        <aside className="lg:col-span-5 space-y-4">
          <div className="bg-neutral-950/80 backdrop-blur-md border border-cyan-950/80 rounded-xl p-5 space-y-4">
            <div className="border-b border-cyan-950/50 pb-3">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
                PUBLIC CHANNELS
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Verified Endpoints
              </h3>
            </div>

            {/* Direct Email with copy trigger */}
            <div className="p-3 rounded bg-cyan-950/30 border border-cyan-800/40 space-y-1.5">
              <div className="text-[10px] font-mono text-cyan-400 uppercase">
                PRIMARY DIRECT INBOX
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold text-white truncate">
                  {BEYOND_DATA.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-[11px] font-mono text-cyan-300 transition-colors flex items-center gap-1 shrink-0"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Public Channels List */}
            <div className="space-y-2">
              {BEYOND_DATA.channels.map((ch) => (
                <a
                  key={ch.name}
                  href={ch.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded bg-neutral-900/60 border border-neutral-800/60 hover:border-cyan-700/60 transition-all flex items-center justify-between text-xs group"
                >
                  <div>
                    <div className="font-semibold text-neutral-200 group-hover:text-white flex items-center gap-1.5">
                      <span>{ch.name}</span>
                      <span className="text-neutral-500 font-mono text-[11px]">({ch.handle})</span>
                    </div>
                    <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                      {ch.protocol}
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Curriculum Vitae Card */}
          <div className="bg-neutral-950/80 backdrop-blur-md border border-cyan-950/80 rounded-xl p-5 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-cyan-950/50 pb-2">
              <span className="text-cyan-400 font-semibold uppercase flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                CURRICULUM VITAE SUMMARY
              </span>
              <span className="text-neutral-500 text-[10px]">VERIFIED 2025</span>
            </div>

            <p className="text-neutral-300 font-sans text-xs leading-relaxed">
              {BEYOND_DATA.curriculumVitae.summary}
            </p>

            <div className="pt-2">
              <a
                href="https://sobi.codes"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded bg-neutral-900 border border-cyan-800/50 text-cyan-300 hover:text-white hover:bg-cyan-950/80 transition-colors"
              >
                <span>Access Full CV & Portfolio on sobi.codes</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </aside>
      </main>

      {/* EGRESS FOOTER */}
      <footer className="relative z-20 pt-4 border-t border-cyan-950/50 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Terminal className="w-3 h-3 text-cyan-400" />
          MULTIVERSE EGRESS · HYPERSPEED TRANSMISSION BEAMS
        </span>
        <span>FINAL REALITY · TERMINAL EXHAUSTED</span>
      </footer>
    </div>
  );
};
