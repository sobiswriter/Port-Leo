import type { HyperspeedEffectOptions } from '../components/react-bits/Hyperspeed';
interface TopoPalette {
  id: string;
  label: string;
  low: string;
  mid: string;
  high: string;
}

export const TOPO_PALETTES: TopoPalette[] = [
  { id: 'latent', label: 'Latent Manifold', low: '#5227FF', mid: '#FF9FFC', high: '#FFFFFF' },
  { id: 'loss', label: 'Loss Surface', low: '#06B6D4', mid: '#3B82F6', high: '#FFFFFF' },
  { id: 'neural', label: 'Neural Field', low: '#10B981', mid: '#06B6D4', high: '#FFFFFF' },
  { id: 'tensor', label: 'Deep Tensor', low: '#7C3AED', mid: '#A855F7', high: '#FFFFFF' },
];

interface LightSpectrum {
  id: string;
  label: string;
  colors: string[];
  backgroundColor: string;
}

export const LIGHT_SPECTRUMS: LightSpectrum[] = [
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

interface PixelTheme {
  id: string;
  label: string;
  color: string;
}

export const PIXEL_THEMES: PixelTheme[] = [
  { id: 'phosphor', label: 'Phosphor Green', color: '#10B981' },
  { id: 'cyan', label: 'Matrix Cyan', color: '#06B6D4' },
  { id: 'amber', label: 'Silicon Amber', color: '#F59E0B' },
  { id: 'violet', label: 'Compacted Violet', color: '#A855F7' },
];

interface NebulaTheme {
  id: string;
  label: string;
  hueShift: number;
  density: number;
  glowIntensity: number;
  speed: number;
  starSpeed: number;
  saturation: number;
  colorName: string;
}

export const NEBULA_THEMES: NebulaTheme[] = [
  {
    id: 'andromeda',
    label: 'Andromeda Core',
    hueShift: 260,
    density: 2.1,
    glowIntensity: 0.5,
    speed: 1.2,
    starSpeed: 0.6,
    saturation: 0.65,
    colorName: 'text-violet-400 border-violet-500/40 bg-violet-950/30',
  },
  {
    id: 'cygnus',
    label: 'Cygnus Rift',
    hueShift: 180,
    density: 2.3,
    glowIntensity: 0.55,
    speed: 1.4,
    starSpeed: 0.7,
    saturation: 0.75,
    colorName: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30',
  },
  {
    id: 'supernova',
    label: 'Supernova Amber',
    hueShift: 38,
    density: 1.8,
    glowIntensity: 0.6,
    speed: 1.1,
    starSpeed: 0.5,
    saturation: 0.6,
    colorName: 'text-amber-400 border-amber-500/40 bg-amber-950/30',
  },
  {
    id: 'pulsar',
    label: 'Pulsar Monochrome',
    hueShift: 210,
    density: 1.5,
    glowIntensity: 0.4,
    speed: 0.9,
    starSpeed: 0.4,
    saturation: 0.05,
    colorName: 'text-neutral-300 border-neutral-600/40 bg-neutral-900/40',
  },
];

export const GALAXY_FOCAL: [number, number] = [0.5, 0.5];
export const GALAXY_ROTATION: [number, number] = [1.0, 0.0];

interface PhosphorTheme {
  id: string;
  label: string;
  tint: string;
  badgeClass: string;
}

export const PHOSPHOR_THEMES: PhosphorTheme[] = [
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

export const TERMINAL_GRID_MUL: [number, number] = [2, 1];

interface WarpPreset {
  id: string;
  label: string;
  distortion: HyperspeedEffectOptions['distortion'];
  colors: HyperspeedEffectOptions['colors'];
  badgeClass: string;
}

export const WARP_PRESETS: WarpPreset[] = [
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

