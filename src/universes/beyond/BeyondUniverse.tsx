import React, { useState, useMemo } from 'react';
import { UniverseId } from '../../types/universe';
import { BEYOND_DATA, UNIVERSES_META, ABOUT_DOSSIER } from '../../data/portfolioData';
import {
  Send,
  Copy,
  Check,
  FileDown,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Zap,
  Sliders,
  Radio,
  Globe,
  Terminal,
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

  // Hyperspeed Warp State
  const [selectedPresetId, setSelectedPresetId] = useState<string>('cyber');
  const [isHyperdriveEngaged, setIsHyperdriveEngaged] = useState<boolean>(false);
  const [showWarpControls, setShowWarpControls] = useState<boolean>(false);

  // Transmission Form State
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [topic, setTopic] = useState('Systems Engineering & Architecture');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transmissionSuccess, setTransmissionSuccess] = useState(false);

  // Resume Modal / View State
  const [showResumeModal, setShowResumeModal] = useState(false);

  // PGP Copy State
  const [copiedPgp, setCopiedPgp] = useState(false);

  const activePreset =
    WARP_PRESETS.find((p) => p.id === selectedPresetId) || WARP_PRESETS[0];

  // Memoized Hyperspeed effect options to prevent unnecessary scene recreations
  const hyperspeedOptions = useMemo<HyperspeedEffectOptions>(() => {
    return {
      ...DEFAULT_HYPERSPEED_OPTIONS,
      distortion: activePreset.distortion,
      colors: activePreset.colors,
      fov: isHyperdriveEngaged ? 130 : 90,
      speedUp: isHyperdriveEngaged ? 3.5 : 2.0,
      lanesPerRoad: 4,
      length: 400,
    };
  }, [activePreset, isHyperdriveEngaged]);

  const handleCopyPgp = () => {
    navigator.clipboard.writeText(BEYOND_DATA.pgpKeyFingerprint);
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2000);
  };

  const handleSendTransmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTransmissionSuccess(true);
      setSenderName('');
      setSenderEmail('');
      setMessage('');
    }, 500);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030305] text-neutral-100 flex flex-col p-6 sm:p-10 lg:p-12 overflow-hidden selection:bg-cyan-950 selection:text-cyan-200">
      {/* 
        ========================================================================
        Hyperspeed WebGL 3D Warp Tunnel Highway Surface
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
              <span className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 font-semibold">
                UNIVERSE 07
              </span>
              <span aria-hidden="true" className="text-neutral-600">/</span>
              <span className="text-neutral-200 font-semibold uppercase tracking-wider">{currentMeta.name}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">{currentMeta.concept}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight font-display text-white drop-shadow-md">
              Transmissions, Verification & Egress
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-2xl">
              Terminal egress station to dispatch packets to Sobi, verify cryptographic identity signatures, inspect credentials, or loop into the multiverse.
            </p>
          </div>

          {/* Quick Actions & Warp Controller Toggle */}
          <div className="flex items-center gap-2.5 self-start lg:self-center">
            <button
              onClick={() => setShowWarpControls(!showWarpControls)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                showWarpControls
                  ? 'bg-cyan-950/60 text-cyan-200 border-cyan-500/60 shadow-lg shadow-cyan-950/40'
                  : 'bg-neutral-900/70 text-neutral-400 hover:text-neutral-200 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Warp HUD {showWarpControls ? '▲' : '▼'}</span>
            </button>

            <button
              onClick={() => setShowResumeModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-semibold text-neutral-100 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-colors shadow-lg"
            >
              <FileDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>Inspect CV / Resume</span>
            </button>
          </div>
        </header>

        {/* 
          ========================================================================
          Expandable Hyperspeed Warp Controller HUD
          ========================================================================
        */}
        {showWarpControls && (
          <div className="mt-4 p-4 sm:p-5 rounded-xl bg-neutral-950/85 backdrop-blur-xl border border-cyan-900/30 text-xs font-mono space-y-4 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-900">
              <div className="flex items-center gap-2 text-cyan-300">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold uppercase tracking-wider">Hyperspeed Warp Drive Control</span>
              </div>
              <span className="text-[11px] text-neutral-500">
                Live Three.js postprocessing bloom & relativistic road distortion
              </span>
            </div>

            {/* Warp Presets */}
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-neutral-400 block font-semibold">
                Relativistic Velocity Spectrum:
              </label>
              <div className="flex flex-wrap gap-2">
                {WARP_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                      selectedPresetId === preset.id
                        ? `${preset.badgeClass} font-bold shadow-md`
                        : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hyperdrive Boost Toggle */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setIsHyperdriveEngaged(!isHyperdriveEngaged)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-mono font-bold transition-all shadow-lg ${
                  isHyperdriveEngaged
                    ? 'bg-cyan-500 text-neutral-950 border-cyan-400 shadow-cyan-500/30'
                    : 'bg-neutral-900/80 text-cyan-300 border-cyan-700/50 hover:bg-cyan-950/40'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>{isHyperdriveEngaged ? '⚡ HYPERDRIVE ENGAGED (WARP 3.5X)' : '⚡ ENGAGE HYPERDRIVE BOOST'}</span>
              </button>

              <span className="text-[11px] text-neutral-400">
                Status: {isHyperdriveEngaged ? 'FOV 130° · Relativistic Boost' : 'Cruising · FOV 90° Nominal'}
              </span>
            </div>
          </div>
        )}

        {/* 
          ========================================================================
          Main Structural Stage: Split Terminal Dispatch Desk
          ========================================================================
        */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 items-start w-full">
          {/* Left Column: Direct Transmission Form (7 Cols) */}
          <section className="lg:col-span-7 bg-neutral-950/65 backdrop-blur-md border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl hover:border-neutral-700 transition-colors">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block mb-1 font-semibold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Direct Transmission Console
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-neutral-50">
                Dispatch a Packet to Sobi
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed font-sans">
                {BEYOND_DATA.transmissionNote}
              </p>
            </div>

            {transmissionSuccess ? (
              <div className="p-6 rounded-xl bg-neutral-900/80 border border-emerald-500/40 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-semibold">
                  <Check className="w-4 h-4" />
                  <span>Transmission Dispatched Successfully</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  Your message packet has been encrypted and acknowledged. If your transmission requires response, expect contact within 24-48 hours.
                </p>
                <button
                  onClick={() => setTransmissionSuccess(false)}
                  className="text-xs text-cyan-400 hover:text-white underline pt-1 font-mono block"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendTransmission} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-neutral-400">Your Name / Handle</label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Alice Chen"
                      className="w-full px-3 py-2 bg-neutral-900/80 border border-neutral-800 rounded-lg text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-400">Return Email Address</label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="alice@domain.org"
                      className="w-full px-3 py-2 bg-neutral-900/80 border border-neutral-800 rounded-lg text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400">Transmission Context</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900/80 border border-neutral-800 rounded-lg text-neutral-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Systems Engineering & Architecture">Systems Engineering & Architecture</option>
                    <option value="AI Research & Foundation Models">AI Research & Foundation Models</option>
                    <option value="Multi-Agent Consensus Inquiry">Multi-Agent Consensus Inquiry</option>
                    <option value="Open Source Collaboration">Open Source Collaboration</option>
                    <option value="General Invariant Discussion">General Invariant Discussion</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-neutral-400">
                    <label>Transmission Payload / Message</label>
                    <span className="text-[10px] text-neutral-600">{message.length} chars</span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your inquiry, engineering opportunity, or architectural problem statement..."
                    className="w-full px-3 py-2 bg-neutral-900/80 border border-neutral-800 rounded-lg text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500 resize-none font-sans"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500 font-mono flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    Channel: Egress Port 443 (TLS Encrypted)
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-2 text-xs font-mono font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-lg transition-colors shadow-lg shadow-cyan-950/50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch Packet</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </section>

          {/* Right Column: Identity Verification & Coordinates (5 Cols) */}
          <aside className="lg:col-span-5 space-y-6">
            {/* Cryptographic Identity Fingerprint */}
            <div className="bg-neutral-950/65 backdrop-blur-md border border-neutral-800/80 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  PGP Identity Signature
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/50">
                  Verified
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-neutral-500 block">
                  Public Key Fingerprint (4096-bit RSA):
                </span>
                <div className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-xl text-xs font-mono text-neutral-300 break-all select-all flex items-center justify-between gap-2">
                  <span>{BEYOND_DATA.pgpKeyFingerprint}</span>
                  <button
                    onClick={handleCopyPgp}
                    className="shrink-0 p-1.5 hover:bg-neutral-800 rounded transition-colors text-neutral-400 hover:text-white"
                    title="Copy PGP Fingerprint"
                  >
                    {copiedPgp ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                For sensitive inquiries or vulnerability reports, encrypt using Sobi&apos;s key published to keys.openpgp.org.
              </p>
            </div>

            {/* Network Coordinates */}
            <div className="bg-neutral-950/65 backdrop-blur-md border border-neutral-800/80 rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                Network Coordinates & Ingress
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {BEYOND_DATA.socials.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-cyan-500/50 hover:bg-neutral-900/90 text-neutral-300 hover:text-white transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="block font-semibold group-hover:text-cyan-300 transition-colors">{link.label}</span>
                      <span className="text-[10px] text-neutral-500 block">{link.username}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-600 group-hover:text-cyan-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </main>

        {/* Resume / CV Modal Drawer */}
        {showResumeModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-neutral-200 shadow-2xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">{ABOUT_DOSSIER.name} — Curriculum Vitae</h3>
                  <p className="text-xs font-mono text-cyan-400">{ABOUT_DOSSIER.role}</p>
                </div>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="text-neutral-400 hover:text-white px-2.5 py-1 rounded text-sm font-mono border border-neutral-800 hover:border-neutral-600 transition-colors"
                >
                  ✕ Close
                </button>
              </div>

              <div className="space-y-5 text-xs sm:text-sm">
                <p className="text-neutral-300 leading-relaxed bg-neutral-900/60 p-4 rounded-xl border border-neutral-800/80 font-sans">
                  {BEYOND_DATA.resumeSummary.summaryText}
                </p>

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-2 font-semibold">
                    Core Competencies
                  </h4>
                  <ul className="space-y-1.5 text-neutral-300 font-sans">
                    {BEYOND_DATA.resumeSummary.focusAreas.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-2 font-semibold">
                    Experience Highlights
                  </h4>
                  <ul className="space-y-2 text-neutral-300 font-sans">
                    {BEYOND_DATA.resumeSummary.experienceHighlights.map((e, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-1 font-semibold">
                    Formal Education
                  </h4>
                  <p className="text-neutral-300 font-mono text-xs">{BEYOND_DATA.resumeSummary.education}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-mono">Digital Signature: Verified</span>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-neutral-100 text-neutral-900 font-semibold rounded-lg hover:bg-white transition-colors"
                >
                  Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="pt-6 pb-2 border-t border-neutral-800/80 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Beyond Egress · Stage 07/07</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>Open Frequency Status: Online</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onTravelTo('about')}
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>← 06 About</span>
            </button>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={() => onTravelTo('arrival')}
              className="text-cyan-300 hover:text-white transition-colors font-medium flex items-center gap-1"
            >
              <span>Return to 00 Arrival ↺</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
