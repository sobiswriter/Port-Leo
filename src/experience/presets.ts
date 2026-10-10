import type { HyperspeedProps } from '../components/react-bits/Hyperspeed';
import type { FaultyTerminalProps } from '../components/react-bits/FaultyTerminal';
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

interface PhosphorTheme extends FaultyTerminalProps { id: string; label: string; }
export const PHOSPHOR_THEMES: PhosphorTheme[] = [
  { id: 'mint', label: 'Mint phosphor · large / steady', tint: '#a7ef9e', scale: 2.5, digitSize: 1.5, timeScale: 1, noiseAmp: 1, brightness: 0.7, scanlineIntensity: 1, curvature: 0.1, mouseStrength: 0.8, mouseReact: true, pageLoadAnimation: true },
  { id: 'rose', label: 'Rose signal · fast / curved', tint: '#f43f5e', scale: 1.6, digitSize: 1.5, timeScale: 2.5, noiseAmp: 1, brightness: 0.7, scanlineIntensity: 1, curvature: 0.3, mouseStrength: 0.8, mouseReact: true, pageLoadAnimation: true },
  { id: 'amber', label: 'Amber CRT · broad / slow', tint: '#f5bc72', scale: 1.2, digitSize: 1.8, timeScale: 0.45, brightness: 0.8, scanlineIntensity: 0.8, curvature: 0.22, mouseStrength: 0.45, glitchAmount: 1.1 },
  { id: 'monochrome', label: 'Silver grid · fine / measured', tint: '#d8e2ef', scale: 3.2, digitSize: 0.85, timeScale: 0.65, brightness: 0.65, scanlineIntensity: 0.45, curvature: 0.04, mouseStrength: 0.3, glitchAmount: 0.4 },
  { id: 'cyan', label: 'Cyan transmission · wide / brisk', tint: '#6bdae7', scale: 0.9, digitSize: 1.2, timeScale: 1.6, brightness: 0.75, scanlineIntensity: 0.65, curvature: 0.18, mouseStrength: 0.6, glitchAmount: 0.65 },
  { id: 'violet', label: 'Violet glass · deep / drifting', tint: '#bca0ee', scale: 2, digitSize: 1.4, timeScale: 0.3, brightness: 0.7, scanlineIntensity: 0.6, curvature: 0.35, mouseStrength: 0.5, glitchAmount: 0.8 },
];
export const TERMINAL_GRID_MUL: [number, number] = [2, 1];

interface WarpPreset extends HyperspeedProps { id: string; label: string; }
export const WARP_PRESETS: WarpPreset[] = [
  { id: 'cyber', label: 'Neon winding · violet trails / cyan poles', curve: 'winding', curvature: 1, speed: 1, boost: 1.7, fov: 90, boostFov: 106, lanes: 3, density: 40, trailLength: 1, lightSize: 1, poles: 20, poleHeight: 1, dust: 100, glow: 0.6, reflections: 0.5, roadOpacity: 0.1, steer: 0.35, tailColors: ['#d856bf', '#6750a2', '#c247ac'], headColors: ['#03b3c3', '#0e5ea5', '#324555'], poleColors: ['#03b3c3'] },
  { id: 'solar', label: 'Solar hills · amber ribbons / tall poles', curve: 'hills', curvature: 0.75, speed: 0.8, boost: 1.65, density: 32, trailLength: 1.4, lightSize: 1.1, poles: 28, poleHeight: 1.5, dust: 80, glow: 0.65, reflections: 0.6, tailColors: ['#efa34a', '#e06f44'], headColors: ['#ffd5a6', '#fce8ce'], poleColors: ['#f9be72'] },
  { id: 'quantum', label: 'Deep space · emerald descent / blue headlights', curve: 'deep', curvature: 0.65, speed: 0.65, boost: 1.8, density: 44, trailLength: 0.85, poles: 24, poleHeight: 1.2, dust: 220, glow: 0.5, reflections: 0.7, tailColors: ['#34caa0', '#328d81'], headColors: ['#7adaef', '#418fb6'], poleColors: ['#58d6b5', '#60b8df'] },
  { id: 'starlight', label: 'Starlight racing · long trails / dense traffic', curve: 'racing', curvature: 0.6, speed: 1.25, boost: 1.7, density: 64, trailLength: 1.8, lightSize: 0.8, poles: 36, poleHeight: 0.85, dust: 180, glow: 0.5, reflections: 0.4, tailColors: ['#dce5fa', '#a1b0cd'], headColors: ['#8ccfea', '#5087c0'], poleColors: ['#d4e9f6'] },
  { id: 'rose', label: 'Rose express · straight / bright headlamps', curve: 'straight', curvature: 0, speed: 1.05, boost: 1.7, lanes: 4, density: 52, trailLength: 0.55, lightSize: 1.25, poles: 18, poleHeight: 1.8, dust: 120, glow: 0.7, reflections: 0.8, tailColors: ['#f16b91', '#b54473'], headColors: ['#ffe4d4', '#f5c3b9'], poleColors: ['#df99c9'] },
  { id: 'dusk', label: 'Dusk glide · gentle / sparse lights', curve: 'gentle', curvature: 0.4, speed: 0.55, boost: 1.6, lanes: 2, density: 24, trailLength: 1.1, lightSize: 0.85, poles: 14, poleHeight: 1.25, dust: 60, glow: 0.45, reflections: 0.55, tailColors: ['#9e83db', '#c2a5e5'], headColors: ['#98c5d8', '#accfd4'], poleColors: ['#b29acf'] },
];


