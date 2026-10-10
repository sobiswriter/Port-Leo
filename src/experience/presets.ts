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
    label: 'Celestial Rays',
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
    label: 'Aurora Veil',
    colors: ['#34D399', '#22D3EE', '#60A5FA', '#FFFFFF'],
    backgroundColor: '#030e12',
  },
  {
    id: 'solar',
    label: 'Solar Cascade',
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
  { id: 'violet', label: 'Violet Ripple', color: '#A855F7' },
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
  { id: 'mint', label: 'Mint Phosphor', tint: '#a7ef9e', scale: 2.5, digitSize: 1.5, timeScale: 1, noiseAmp: 1, brightness: 0.7, scanlineIntensity: 1, curvature: 0.1, mouseStrength: 0.8, mouseReact: true, pageLoadAnimation: true },
  { id: 'rose', label: 'Rose Signal', tint: '#f43f5e', scale: 1.6, digitSize: 1.5, timeScale: 2.5, noiseAmp: 1, brightness: 0.7, scanlineIntensity: 1, curvature: 0.3, mouseStrength: 0.8, mouseReact: true, pageLoadAnimation: true },
  { id: 'amber', label: 'Amber CRT', tint: '#f5bc72', scale: 1.2, digitSize: 1.8, timeScale: 0.45, brightness: 0.8, scanlineIntensity: 0.8, curvature: 0.22, mouseStrength: 0.45, glitchAmount: 1.1 },
  { id: 'monochrome', label: 'Silver Grid', tint: '#d8e2ef', scale: 3.2, digitSize: 0.85, timeScale: 0.65, brightness: 0.65, scanlineIntensity: 0.45, curvature: 0.04, mouseStrength: 0.3, glitchAmount: 0.4 },
  { id: 'cyan', label: 'Cyan Transmission', tint: '#6bdae7', scale: 0.9, digitSize: 1.2, timeScale: 1.6, brightness: 0.75, scanlineIntensity: 0.65, curvature: 0.18, mouseStrength: 0.6, glitchAmount: 0.65 },
  { id: 'violet', label: 'Violet Glass', tint: '#bca0ee', scale: 2, digitSize: 1.4, timeScale: 0.3, brightness: 0.7, scanlineIntensity: 0.6, curvature: 0.35, mouseStrength: 0.5, glitchAmount: 0.8 },
];
export const TERMINAL_GRID_MUL: [number, number] = [2, 1];

interface WarpPreset extends HyperspeedProps { id: string; label: string; }
export const WARP_PRESETS: WarpPreset[] = [
  // Tight bends, close cyan poles and a low viewpoint: a neon canyon.
  { id: 'cyber', label: 'Neon Canyon', curve: 'winding', curvature: 1.15, speed: 1, boost: 3.2, fov: 88, boostFov: 120, lanes: 2, roadWidth: 6, medianWidth: 1, cameraHeight: 4, density: 44, trailLength: 0.8, lightSize: 0.8, poles: 64, poleHeight: 2.6, dust: 30, glow: 0.8, reflections: 0.7, roadOpacity: 0.22, steer: 0.2, background: '#050711', tailColors: ['#e14ac6', '#9046df'], headColors: ['#40e9ef', '#2193d9'], poleColors: ['#2dd9ec', '#7b54ec'] },
  // Broad amber crests, fewer cars, long warm ribbons and an elevated camera.
  { id: 'solar', label: 'Solar Ridge', curve: 'hills', curvature: 1.1, speed: 0.75, boost: 3.1, fov: 75, boostFov: 112, lanes: 2, roadWidth: 12, medianWidth: 5, cameraHeight: 12, density: 16, trailLength: 2.5, lightSize: 1.3, poles: 10, poleHeight: 0.7, dust: 65, glow: 0.55, reflections: 0.15, roadOpacity: 0.3, steer: 0.3, background: '#120907', roadColor: '#21120d', lineColor: '#715236', tailColors: ['#ff983d', '#ef5a36'], headColors: ['#ffe6b8'], poleColors: ['#f4b05a'] },
  // Owner's Deep configuration; colours and controls match the supplied reference.
  { id: 'deep', label: 'Deep', curve: 'deep', curvature: 1, speed: 1, boost: 3, fov: 90, boostFov: 130, lanes: 3, roadWidth: 18, medianWidth: 2, cameraHeight: 8, density: 50, trailLength: 1, lightSize: 1, poles: 50, poleHeight: 1, dust: 100, glow: 0.6, reflections: 0.5, roadOpacity: 0.1, steer: 0.35, interactive: true, background: '#08080a', roadColor: '#08080a', lineColor: '#25252d', tailColors: ['#7c3aed', '#3b82f6', '#06b6d4', '#5a40ff'], headColors: ['#2c34bc', '#3b82f6'], poleColors: ['#000000'] },
  // Ground-level racing: wide multi-lane circuit and dense, narrow white streaks.
  { id: 'starlight', label: 'Silver Circuit', curve: 'racing', curvature: 0.75, speed: 1.3, boost: 3, fov: 96, boostFov: 124, lanes: 5, roadWidth: 17, medianWidth: 1.2, cameraHeight: 2.8, density: 90, trailLength: 0.45, lightSize: 0.55, poles: 36, poleHeight: 0.45, dust: 0, glow: 0.3, reflections: 0.9, roadOpacity: 0.5, steer: 0.15, background: '#070a10', roadColor: '#101721', lineColor: '#6b819b', tailColors: ['#e3eaf6', '#99b5dd'], headColors: ['#c7ecff'], poleColors: ['#91b8e2'] },
  // Straight geometric corridor, bright rose beacons and long parallel trails.
  { id: 'rose', label: 'Rose Corridor', curve: 'straight', curvature: 0, speed: 1.05, boost: 3.2, fov: 82, boostFov: 118, lanes: 3, roadWidth: 8, medianWidth: 3, cameraHeight: 6, density: 28, trailLength: 2.2, lightSize: 1.1, poles: 24, poleHeight: 3.2, dust: 15, glow: 0.7, reflections: 0.65, roadOpacity: 0.16, steer: 0.1, background: '#10040d', tailColors: ['#ff4b8e', '#ca426f'], headColors: ['#ffe1bf', '#fff2e3'], poleColors: ['#e87ccd', '#ffb2db'] },
  // Spacious lavender drift with short lights, almost no roadside geometry.
  { id: 'dusk', label: 'Lavender Drift', curve: 'gentle', curvature: 0.28, speed: 0.6, boost: 3, fov: 68, boostFov: 110, lanes: 1, roadWidth: 9, medianWidth: 10, cameraHeight: 16, density: 8, trailLength: 0.35, lightSize: 1.6, poles: 4, poleHeight: 0.65, dust: 160, glow: 0.4, reflections: 0.1, roadOpacity: 0.03, steer: 0.4, background: '#0b0915', tailColors: ['#b0a0e5', '#e1b9de'], headColors: ['#b6d7ee'], poleColors: ['#ac9fcc'] },
];


