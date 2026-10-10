import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { places, type RoomProps } from './places';
import type { UniverseId } from '../types/universe';
export function Eyebrow({ children }: {children: React.ReactNode}) { return <p className="eyebrow">{children}</p>; }
export function Continue({ to, onTravelTo }: RoomProps & {to: UniverseId}) {
  const place = places.find(p => p.id === to)!;
  return <footer className="next-place"><span className="eyebrow">There’s more on the other side.</span><button onClick={() => onTravelTo(to)}>{place.name}<ArrowUpRight size={28}/></button></footer>;
}
export function ReadOn({ target, label = 'Look a little closer' }: {target: string; label?: string}) { return <a className="text-link" href={`#${target}`} onClick={e => { e.preventDefault(); document.getElementById(target)?.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); }}>{label}<ArrowDown size={16}/></a>; }
