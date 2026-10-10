import React, { lazy, Suspense, useMemo } from 'react';
import type { UniverseId } from '../types/universe';
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
  arrival: ['Silk', 'Contour lines', 'Terminal glyphs', 'Matrix mesh', 'Swell'], builder: ['Swell', 'Signal', 'Tide', 'Storm'],
  'ai-lab': TOPO_PALETTES.map(p => p.label), research: LIGHT_SPECTRUMS.map(p => p.label), arsenal: PIXEL_THEMES.map(p => p.label), journey: NEBULA_THEMES.map(p => p.label), about: PHOSPHOR_THEMES.map(p => p.label), beyond: WARP_PRESETS.map(p => p.label),
};
class BackgroundBoundary extends React.Component<{children: React.ReactNode}, {failed: boolean}> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="still-sky" /> : this.props.children; }
}
export function Atmosphere({ room, variant, still, shape }: { room: UniverseId; variant: number; still: boolean; shape: 'diamond' | 'square' | 'circle' | 'triangle' }) {
  const topo = TOPO_PALETTES[variant % TOPO_PALETTES.length];
  const light = LIGHT_SPECTRUMS[variant % LIGHT_SPECTRUMS.length];
  const nebula = NEBULA_THEMES[variant % NEBULA_THEMES.length];
  const warp = WARP_PRESETS[variant % WARP_PRESETS.length];
  const highwayOptions = useMemo(() => ({ distortion: warp.distortion, colors: warp.colors, fov: 90, fovSpeedUp: 145, speedUp: 6, lanesPerRoad: 4, length: 400 }), [warp]);
  let scene: React.ReactNode;
  if (!still) switch(room) {
    case 'arrival': scene = <Waves preset={waves[variant % waves.length]} color="#d4d4d4" backgroundColor="#080909" speed={0.35} fade="none" opacity={0.8} interactive cursorSize={70} cursorStrength={0.7} intro />; break;
    case 'builder': scene = <Slats preset={slats[variant % slats.length]} color="#a5b4fc" backgroundColor="#08090b" interactive />; break;
    case 'ai-lab': scene = <Topography lowColor={topo.low} midColor={topo.mid} highColor={topo.high} speed={0.35} morphAmount={2.8} morphSpeed={0.06} bands={2.4} thickness={0.012} scale={1.05} glow={0.55} colorMode="elevation" contrast={2.8} brightness={1.1} fillBands={false} opacity={0.65} grain mouseInteraction />; break;
    case 'research': scene = <Lightfall colors={light.colors} backgroundColor={light.backgroundColor} speed={0.45} streakCount={3} streakWidth={1} streakLength={1.3} glow={0.9} density={0.5} twinkle={0.8} zoom={2.5} backgroundGlow={0.35} opacity={0.65} mouseInteraction />; break;
    case 'arsenal': scene = <PixelBlast variant={shape} pixelSize={5} color={PIXEL_THEMES[variant % PIXEL_THEMES.length].color} patternScale={2.5} patternDensity={1.1} enableRipples liquid liquidStrength={0.08} speed={0.45} transparent />; break;
    case 'journey': scene = <Galaxy focal={GALAXY_FOCAL} rotation={GALAXY_ROTATION} hueShift={nebula.hueShift} density={nebula.density} starSpeed={nebula.starSpeed} speed={nebula.speed} glowIntensity={nebula.glowIntensity} saturation={nebula.saturation} twinkleIntensity={0.65} rotationSpeed={0.08} mouseInteraction mouseRepulsion transparent />; break;
    case 'about': scene = <Terminal scale={1.4} gridMul={TERMINAL_GRID_MUL} digitSize={1.3} timeScale={0.35} scanlineIntensity={0.38} glitchAmount={1} flickerAmount={0.8} noiseAmp={1} curvature={0.2} tint={PHOSPHOR_THEMES[variant % PHOSPHOR_THEMES.length].tint} mouseReact brightness={0.85} pageLoadAnimation={false} />; break;
    case 'beyond': scene = <Highway effectOptions={highwayOptions} />; break;
  }
  return <div className={`atmosphere atmosphere-${room}`} aria-hidden="true"><BackgroundBoundary key={room}><Suspense fallback={<div className="still-sky" />}>{still ? <div className="still-sky" /> : scene}</Suspense></BackgroundBoundary><div className="atmosphere-shade" /></div>;
}
