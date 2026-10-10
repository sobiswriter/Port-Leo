import type { CSSProperties, ReactNode } from 'react';
import GlowCursorScene from './GlowCursorScene';

export interface GlowCursorProps {
  color?: string; secondaryColor?: string; intensity?: number; trailWidth?: number;
  linger?: number; glow?: number; hotspot?: number; followSpeed?: number; grain?: number;
  clickBurst?: boolean; quality?: 'low' | 'medium' | 'high'; theme?: 'dark' | 'light';
  blendMode?: CSSProperties['mixBlendMode']; maxDevicePixelRatio?: number; enabled?: boolean;
  children?: ReactNode; className?: string; style?: CSSProperties;
}
export default GlowCursorScene;
