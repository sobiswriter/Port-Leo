import React, { lazy, Suspense } from 'react';
import type { UniverseId } from '../types/universe';
import type { ColorPalette } from './colorPalettes';
import { TOPO_PALETTES, LIGHT_SPECTRUMS, PIXEL_THEMES, NEBULA_THEMES, PHOSPHOR_THEMES, WARP_PRESETS, GALAXY_FOCAL, GALAXY_ROTATION, TERMINAL_GRID_MUL } from './presets';
const Waves = lazy(() => import('../components/react-bits/PatternWaves'));
const Slats = lazy(() => import('../components/react-bits/MicroSlats'));
const Topography = lazy(() => import('../components/react-bits/Topography'));
const Lightfall = lazy(() => import('../components/react-bits/Lightfall'));
const PixelBlast = lazy(() => import('../components/react-bits/PixelBlast'));
const Galaxy = lazy(() => import('../components/react-bits/Galaxy'));
const Terminal = lazy(() => import('../components/react-bits/FaultyTerminal'));
const Highway = lazy(() => import('../components/react-bits/Hyperspeed'));
const waves = ['silk', 'lines', 'terminal', 'mesh', 'ocean'] as const;
const slats = ['swell', 'signal', 'tide', 'storm'] as const;
export const atmosphereNames: Record<UniverseId, string[]> = {
  arrival: ['Silk Current', 'Contour Flow', 'Glyph Stream', 'Matrix Weave', 'Ocean Swell'],
  builder: ['Velvet Swell', 'Signal Pulse', 'Tidal Glass', 'Storm Front'],
  'ai-lab': TOPO_PALETTES.map(p => p.label), research: LIGHT_SPECTRUMS.map(p => p.label), arsenal: PIXEL_THEMES.map(p => p.label), journey: NEBULA_THEMES.map(p => p.label), about: PHOSPHOR_THEMES.map(p => p.label), beyond: WARP_PRESETS.map(p => p.label),
};
class BackgroundBoundary extends React.Component<{children: React.ReactNode}, {failed: boolean}> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="still-sky" /> : this.props.children; }
}
export function Atmosphere({ room, variant, palette, still, shape }: { room: UniverseId; variant: number; palette: ColorPalette; still: boolean; shape: 'diamond' | 'square' | 'circle' | 'triangle' }) {
  const nebula = NEBULA_THEMES[variant % NEBULA_THEMES.length];
  const warp = WARP_PRESETS[variant % WARP_PRESETS.length];
  const terminal = PHOSPHOR_THEMES[variant % PHOSPHOR_THEMES.length];
  let scene: React.ReactNode;
  if (!still) switch(room) {
    case 'arrival': scene = <Waves preset={waves[variant % waves.length]} color={palette.primary} backgroundColor={palette.background} speed={0.35} fade="none" opacity={0.95} interactive cursorSize={70} cursorStrength={0.7} intro />; break;
    case 'builder': scene = <Slats preset={slats[variant % slats.length]} color={palette.primary} glintColor={palette.highlight} backgroundColor={palette.background} interactive />; break;
    case 'ai-lab': scene = <Topography lowColor={palette.secondary} midColor={palette.primary} highColor={palette.highlight} speed={0.35} morphAmount={2.8} morphSpeed={0.06} bands={2.4} thickness={0.012} scale={1.05} glow={0.55} colorMode="elevation" contrast={2.8} brightness={1.1} fillBands={false} opacity={0.65} grain mouseInteraction />; break;
    case 'research': scene = <Lightfall documentFlow colors={[palette.secondary, palette.primary, palette.highlight]} backgroundColor={palette.background} speed={0.45} streakCount={3} streakWidth={1} streakLength={1.3} glow={0.9} density={0.5} twinkle={0.8} zoom={2.5} backgroundGlow={0.35} opacity={0.65} mouseInteraction />; break;
    case 'arsenal': scene = <PixelBlast variant={shape} pixelSize={5} color={palette.primary} patternScale={2.5} patternDensity={1.1} enableRipples liquid liquidStrength={0.08} speed={0.45} transparent />; break;
    case 'journey': scene = <Galaxy focal={GALAXY_FOCAL} rotation={GALAXY_ROTATION} hueShift={palette.hue} density={nebula.density} starSpeed={nebula.starSpeed} speed={nebula.speed} glowIntensity={nebula.glowIntensity} saturation={0.28} twinkleIntensity={0.65} rotationSpeed={0.08} mouseInteraction mouseRepulsion transparent />; break;
    case 'about': scene = <Terminal key={terminal.id} gridMul={TERMINAL_GRID_MUL} mouseReact pageLoadAnimation noiseAmp={1} {...terminal} />; break;
    case 'beyond': scene = <Highway {...warp} background={warp.background ?? palette.background} interactive />; break;
  }
  return <div className={`atmosphere atmosphere-${room}`} aria-hidden="true"><BackgroundBoundary key={room}><Suspense fallback={<div className="still-sky" />}>{still ? <div className="still-sky" /> : scene}</Suspense></BackgroundBoundary><div className="atmosphere-shade" /></div>;
}
