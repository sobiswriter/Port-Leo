import React from 'react';
import HyperspeedScene from './HyperspeedScene';

export interface HyperspeedProps {
  curve?: 'straight' | 'gentle' | 'winding' | 'hills' | 'racing' | 'deep';
  curvature?: number;
  speed?: number;
  boost?: number;
  fov?: number;
  boostFov?: number;
  lanes?: number;
  roadWidth?: number;
  medianWidth?: number;
  cameraHeight?: number;
  density?: number;
  trailLength?: number;
  lightSize?: number;
  poles?: number;
  poleHeight?: number;
  dust?: number;
  glow?: number;
  reflections?: number;
  roadOpacity?: number;
  steer?: number;
  tailColors?: string[];
  headColors?: string[];
  poleColors?: string[];
  roadColor?: string;
  lineColor?: string;
  background?: string;
  theme?: 'dark' | 'light';
  interactive?: boolean;
  boosting?: boolean;
  onBoostStart?: () => void;
  onBoostEnd?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

// Typed application boundary around the supplied React Bits JavaScript renderer.
export default function Hyperspeed(props: HyperspeedProps) {
  return <HyperspeedScene {...props} />;
}
