import React, { createContext, useContext } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { places, type RoomProps } from './places';
import type { UniverseId } from '../types/universe';
export const StillContext = createContext(false);
export function AnimatedPanel({as = 'div', className, children, ariaLive}: {as?: 'div' | 'article' | 'aside' | 'output'; className?: string; children: React.ReactNode; ariaLive?: 'polite' | 'off'}) {
  const still = useContext(StillContext);
  const Panel = motion[as];
  return <Panel className={className} aria-live={ariaLive} initial={still ? false : {opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.55,ease:[0.16,1,0.3,1]}}>{children}</Panel>;
}
export function Eyebrow({ children }: {children: React.ReactNode}) { return <p className="eyebrow">{children}</p>; }
export function Continue({ to, onTravelTo }: RoomProps & {to: UniverseId}) {
  const place = places.find(p => p.id === to)!;
  const still = useContext(StillContext);
  return <footer className="next-place"><span className="eyebrow">A neighboring world awaits.</span><motion.button whileHover={still ? undefined : {x:6}} whileTap={still ? undefined : {scale:0.98}} onClick={() => onTravelTo(to)}>{place.name}<ArrowUpRight size={28}/></motion.button></footer>;
}
export function ReadOn({ target, label = 'Look a little closer' }: {target: string; label?: string}) { return <a className="text-link" href={`#${target}`} onClick={e => { e.preventDefault(); document.getElementById(target)?.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); }}>{label}<ArrowDown size={16}/></a>; }
