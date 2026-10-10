import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X, SlidersHorizontal, Pause, Play } from 'lucide-react';
import type { UniverseId } from './types/universe';
import { places } from './experience/places';
import { Atmosphere, atmosphereNames } from './experience/Atmosphere';
import './experience/experience.css';
const rooms = {
  arrival: lazy(() => import('./universes/arrival/ArrivalUniverse').then(m => ({default: m.ArrivalUniverse}))),
  builder: lazy(() => import('./universes/builder/BuilderUniverse').then(m => ({default: m.BuilderUniverse}))),
  'ai-lab': lazy(() => import('./universes/ai-lab/AiLabUniverse').then(m => ({default: m.AiLabUniverse}))),
  research: lazy(() => import('./universes/research/ResearchUniverse').then(m => ({default: m.ResearchUniverse}))),
  arsenal: lazy(() => import('./universes/arsenal/ArsenalUniverse').then(m => ({default: m.ArsenalUniverse}))),
  journey: lazy(() => import('./universes/journey/JourneyUniverse').then(m => ({default: m.JourneyUniverse}))),
  about: lazy(() => import('./universes/about/AboutUniverse').then(m => ({default: m.AboutUniverse}))),
  beyond: lazy(() => import('./universes/beyond/BeyondUniverse').then(m => ({default: m.BeyondUniverse}))),
};
const fromHash = (): UniverseId => places.find(p => p.id === location.hash.slice(1))?.id || 'arrival';
export default function App() {
  const [room, setRoom] = useState<UniverseId>(fromHash);
  const [variants, setVariants] = useState<Partial<Record<UniverseId, number>>>({});
  const [still, setStill] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [shape, setShape] = useState<'diamond' | 'square' | 'circle' | 'triangle'>('diamond');
  const [settings, setSettings] = useState(false);
  const [visited, setVisited] = useState<UniverseId[]>([fromHash()]);
  const atlas = useRef<HTMLDialogElement>(null);
  const main = useRef<HTMLElement>(null);
  const first = useRef(true);
  const travel = useCallback((id: UniverseId) => { atlas.current?.close(); setSettings(false); if (location.hash !== `#${id}`) location.hash = id; else setRoom(id); }, []);
  useEffect(() => {
    const sync = () => setRoom(fromHash());
    addEventListener('hashchange', sync); return () => removeEventListener('hashchange', sync);
  }, []);
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'instant'});
    setVisited(v => v.includes(room) ? v : [...v, room]);
    document.title = `${places.find(p => p.id === room)!.name} — Sobi’s Multiverse`;
    if (!first.current) main.current?.focus({preventScroll: true});
    first.current = false;
  }, [room]);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setStill(media.matches);
    media.addEventListener('change', sync); return () => media.removeEventListener('change', sync);
  }, []);
  const index = places.findIndex(p => p.id === room);
  const Room = rooms[room];
  return <div className={`experience ${still ? 'is-still' : ''}`} style={{'--accent': places[index].color} as React.CSSProperties}>
    <a className="skip-link" href="#main-content" onClick={e => {e.preventDefault(); main.current?.focus();}}>Skip to content</a>
    <Atmosphere room={room} variant={variants[room] || 0} still={still} shape={shape}/>
    <header className="site-header"><button className="wordmark" onClick={() => travel('arrival')} aria-label="Sobi’s Multiverse home">sobi<span>®</span><small>A PERSONAL MULTIVERSE</small></button><span className="room-location"><i/> {String(index).padStart(2, '0')} / {places[index].name}</span><button className="atlas-trigger" onClick={() => atlas.current?.showModal()}>The atlas <Menu size={18}/></button></header>
    <main id="main-content" ref={main} tabIndex={-1} key={room} className="room-content"><Suspense fallback={<div className="room-loading">Entering {places[index].name}…</div>}><Room onTravelTo={travel}/></Suspense></main>
    <div className="environment-controls"><button aria-label={still ? 'Enable animated backgrounds' : 'Pause animated backgrounds'} title={still ? 'Enable motion' : 'Still mode'} onClick={() => setStill(!still)}>{still ? <Play size={15}/> : <Pause size={15}/>}</button><button aria-expanded={settings} aria-controls="atmosphere-settings" onClick={() => setSettings(!settings)}><SlidersHorizontal size={14}/><span>Atmosphere</span></button></div>
    {settings && <section className="atmosphere-settings" id="atmosphere-settings" aria-label="Atmosphere settings"><div className="settings-title"><span className="eyebrow">Change the feeling</span><button aria-label="Close atmosphere settings" onClick={() => setSettings(false)}><X size={16}/></button></div>{atmosphereNames[room].map((name, i) => <button key={name} aria-pressed={(variants[room] || 0) === i} onClick={() => setVariants(v => ({...v, [room]: i}))}>{name}<span>{(variants[room] || 0) === i ? '●' : '○'}</span></button>)}{room === 'arsenal' && <label>Pixel shape<select value={shape} onChange={e => setShape(e.target.value as typeof shape)}>{['diamond','square','circle','triangle'].map(s => <option key={s}>{s}</option>)}</select></label>}<p>{still ? 'Still mode is on. Enable motion to see these variations.' : 'Your surroundings, your choice.'}</p></section>}
    <dialog ref={atlas} className="atlas-dialog" aria-label="The atlas" onClick={e => {if(e.target === atlas.current) atlas.current.close();}}><div className="atlas-inner"><div className="atlas-heading"><span className="eyebrow">A field guide to Sobi</span><button onClick={() => atlas.current?.close()} aria-label="Close atlas"><X/></button></div><h2>Choose your<br/><em>own way.</em></h2><nav aria-label="Universe atlas">{places.map((p,i) => <button key={p.id} onClick={() => travel(p.id)} aria-current={room === p.id ? 'page' : undefined}><span className="atlas-number">0{i}</span><span>{p.name}<small>{p.subtitle}</small></span><span className="atlas-visited">{visited.includes(p.id) ? 'VISITED' : 'EXPLORE'}</span><ArrowUpRight size={20}/></button>)}</nav><p className="atlas-note">{visited.length} of 8 places visited · There is no right order.</p></div></dialog>
  </div>;
}
