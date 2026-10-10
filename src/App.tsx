import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Orbit, X, SlidersHorizontal, Pause, Play, ArrowUpRight } from 'lucide-react';
import type { UniverseId } from './types/universe';
import { places } from './experience/places';
import { Atmosphere, atmosphereNames } from './experience/Atmosphere';
import { colorPalettes } from './experience/colorPalettes';
import { PORTFOLIO_DESTINATIONS } from './components/galaxy/portfolioDestinations';
import { rooms, Universe, preloadGalaxy, preloadRoom, warmWorlds } from './experience/worldLoader';
import { UniverseLoading } from './experience/UniverseLoading';
import { LivingPage } from './experience/LivingPage';
import { SceneBoundary } from './experience/SceneBoundary';
import './experience/experience.css';
import './experience/universe.css';
import './components/galaxy/galaxy.css';

type Route = UniverseId | 'universe';
const readRoute = (): Route => places.find(p => p.id === location.hash.slice(1))?.id ?? 'universe';
const pixelShapes = ['diamond', 'square', 'circle', 'triangle'] as const;
const nextVariant = (count: number, previous: number, random: number) => count > 1 ? (previous + 1 + Math.floor(random * (count - 1))) % count : 0;

export default function App() {
  const [room, setRoom] = useState<Route>(readRoute);
  const roomRef = useRef(room);
  const [variants, setVariants] = useState<Partial<Record<UniverseId, number>>>(() => Object.fromEntries(places.map(({id}) => [id, Math.floor(Math.random() * atmosphereNames[id].length)])));
  const [colors, setColors] = useState<Partial<Record<UniverseId, number>>>(() => Object.fromEntries(places.map(({id}) => [id, Math.floor(Math.random() * colorPalettes[id].length)])));
  const [still, setStill] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [shape, setShape] = useState<typeof pixelShapes[number]>(() => pixelShapes[Math.floor(Math.random() * pixelShapes.length)]);
  const [settings, setSettings] = useState(false);
  const [flight, setFlight] = useState(false);
  const [journey, setJourney] = useState<{from: string | null; to: string | null; sequence: number}>();
  const [sceneReady, setSceneReady] = useState(false);
  const [modulesReady, setModulesReady] = useState(false);
  const [bootVisible, setBootVisible] = useState(true);
  const [progress, setProgress] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const main = useRef<HTMLElement>(null);
  const universeMain = useRef<HTMLElement>(null);
  const pending = useRef<{from: Route; to: Route; sequence: number} | null>(null);
  const sequence = useRef(0);
  const ready = sceneReady && modulesReady;

  const commit = useCallback((id: Route) => {
    roomRef.current = id;
    setRoom(id); setFlight(false); setSettings(false); pending.current = null;
    if (id !== 'universe') {
      setColors(previous => ({...previous, [id]: nextVariant(colorPalettes[id].length, previous[id] ?? 0, Math.random())}));
      setVariants(previous => ({...previous, [id]: nextVariant(atmosphereNames[id].length, previous[id] ?? 0, Math.random())}));
      if (id === 'arsenal') setShape(previous => pixelShapes[nextVariant(pixelShapes.length, pixelShapes.indexOf(previous), Math.random())]);
    }
  }, []);
  const arrive = useCallback(async (destination: {id: string}) => {
    const target = pending.current;
    if (!target || target.to !== destination.id) return;
    try {
      await preloadRoom(destination.id as UniverseId);
      if (pending.current?.sequence === target.sequence) commit(target.to);
    } catch {
      if (pending.current?.sequence === target.sequence) setError('This world could not be loaded. Check your connection and try again.');
    }
  }, [commit]);
  const arriveHome = useCallback(() => {
    if (pending.current?.to === 'universe') commit('universe');
  }, [commit]);
  const travel = useCallback((to: Route, push = true) => {
    if (to === roomRef.current && !pending.current) return;
    setError(null); setSettings(false);
    const from = roomRef.current;
    const id = ++sequence.current;
    pending.current = {from, to, sequence: id};
    if (to !== 'universe') void preloadRoom(to).catch(() => {});
    if (push && location.hash !== (to === 'universe' ? '#/' : `#${to}`)) history.pushState(null, '', to === 'universe' ? '#/' : `#${to}`);
    setFlight(true);
    setJourney({from: from === 'universe' ? null : from, to: to === 'universe' ? null : to, sequence: id});
  }, []);
  const enterStar = useCallback((destination: {id: string}) => travel(destination.id as UniverseId), [travel]);
  const onSceneReady = useCallback(() => {setSceneReady(true); setProgress(previous => Math.max(previous, 90));}, []);
  const onSceneFailure = useCallback(() => setError('The universe could not be loaded.'), []);

  useEffect(() => {
    let cancelled = false;
    const initial = roomRef.current;
    void preloadGalaxy().then(async () => {if (!cancelled) setProgress(previous => Math.max(previous, 45)); if (initial !== 'universe') await preloadRoom(initial);}).then(() => {
      if (!cancelled) {setModulesReady(true); setProgress(previous => Math.max(previous, 75));}
    }).catch(() => {if (!cancelled) setError('The universe could not be loaded.');});
    return () => {cancelled = true;};
  }, []);
  useEffect(() => {if (ready) setProgress(100);}, [ready]);
  useEffect(() => {if (!ready) return; return warmWorlds();}, [ready]);
  useEffect(() => {
    const sync = () => {
      const hash = location.hash.slice(1);
      // Local document anchors belong to the current page, not the route system.
      if (hash && hash !== '/' && !places.some(p => p.id === hash)) return;
      if (pending.current?.to === readRoute()) return;
      travel(readRoute(), false);
    };
    addEventListener('popstate', sync); addEventListener('hashchange', sync);
    return () => {removeEventListener('popstate', sync); removeEventListener('hashchange', sync);};
  }, [travel]);
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (bootVisible || flight || event.defaultPrevented || event.repeat || event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target instanceof Element ? event.target : null;
      if (document.querySelector('dialog[open]') || target?.closest('input, textarea, select, button, a, summary, [contenteditable], [role="slider"], [role="tablist"], [role="combobox"]')) return;
      if (event.key === 'Escape' && room !== 'universe') {travel('universe'); return;}
      if (room === 'universe' || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const index = places.findIndex(p => p.id === room);
      travel(places[(index + (event.key === 'ArrowRight' ? 1 : -1) + places.length) % places.length].id);
    };
    addEventListener('keydown', keyboard); return () => removeEventListener('keydown', keyboard);
  }, [bootVisible, flight, room, travel]);
  useEffect(() => {
    window.scrollTo({top:0, behavior:'instant'});
    document.title = `${room === 'universe' ? 'The universe' : places.find(p => p.id === room)!.name} — Sobi’s Multiverse`;
    if (!bootVisible && !flight) (room === 'universe' ? universeMain : main).current?.focus({preventScroll:true});
  }, [room, bootVisible, flight]);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setStill(media.matches);
    media.addEventListener('change', sync); return () => media.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    if (!bootVisible || !ready) return;
    // Transitionend is skipped when system motion settings disable transitions.
    const timer = setTimeout(() => setBootVisible(false), still ? 0 : 900);
    return () => clearTimeout(timer);
  }, [bootVisible, ready, still]);

  const page = room === 'universe' ? null : room;
  const index = places.findIndex(p => p.id === page);
  const Room = page ? rooms[page] : null;
  const palette = page ? colorPalettes[page][colors[page] ?? 0] : null;
  const showSpace = !page || flight;
  return <div className={`experience universe-experience ${still ? 'is-still' : ''} ${flight ? 'is-in-transit' : ''}`} style={{'--accent': palette?.highlight ?? '#c7c5ef'} as React.CSSProperties}>
    <a className="skip-link" href="#main-content" onClick={event => {event.preventDefault(); (page ? main : universeMain).current?.focus();}}>Skip to content</a>
    <main ref={universeMain} id="universe-home" tabIndex={-1} aria-label="The universe" aria-hidden={!showSpace} inert={!showSpace || bootVisible} className={`universe-stage ${showSpace ? 'is-visible' : ''} ${flight ? 'is-flying' : ''}`}>
      <SceneBoundary onFailure={onSceneFailure}><Suspense fallback={null}><Universe destinations={PORTFOLIO_DESTINATIONS} enabled={showSpace || !sceneReady} manageHistory={false} reducedMotion={still} onDestinationIntent={enterStar} onDestinationEnter={arrive} onHomeEnter={arriveHome} onReady={onSceneReady} journey={journey}/></Suspense></SceneBoundary>
    </main>
    {page && modulesReady && <div className={`world-shell ${flight ? 'is-departing' : ''}`} inert={flight || bootVisible} aria-hidden={flight}>
      <Atmosphere room={page} variant={variants[page] || 0} palette={palette!} still={still || flight} shape={shape}/>
      <header className="site-header"><button className="wordmark" onClick={() => travel('universe')} aria-label="Sobi’s Multiverse home">sobi<span>®</span><small>A PERSONAL UNIVERSE</small></button><span className="room-location"><i/> {String(index).padStart(2, '0')} / {places[index].name}</span><button className="atlas-trigger" onClick={() => travel('universe')}>The universe <Orbit size={18}/></button></header>
      <main id="main-content" ref={main} tabIndex={-1} key={page} className="room-content"><div className="world-orbit-mark" aria-hidden="true"><i/><span/><b/></div><LivingPage key={page} still={still}><Suspense fallback={<div className="room-loading">Opening {places[index].name}…</div>}>{Room && <Room onTravelTo={travel}/>}</Suspense></LivingPage></main>
      <nav className="world-hop" aria-label="Travel to another world"><span>EXPLORE THE UNIVERSE</span>{places.filter(p => p.id !== page).map(place => <button key={place.id} onPointerEnter={() => {void preloadRoom(place.id).catch(() => {});}} onFocus={() => {void preloadRoom(place.id).catch(() => {});}} onClick={() => travel(place.id)}><i style={{background:place.color}}/>{place.name}<ArrowUpRight size={12}/></button>)}</nav>
      <div className="environment-controls"><button aria-label={still ? 'Enable animated backgrounds' : 'Pause animated backgrounds'} onClick={() => setStill(!still)}>{still ? <Play size={15}/> : <Pause size={15}/>}</button><button aria-expanded={settings} aria-controls="atmosphere-settings" onClick={() => setSettings(!settings)}><SlidersHorizontal size={14}/><span>Atmosphere</span></button></div>
      {settings && <section className="atmosphere-settings" id="atmosphere-settings" aria-label="Atmosphere settings"><div className="settings-title"><span className="eyebrow">Change the feeling</span><button aria-label="Close atmosphere settings" onClick={() => setSettings(false)}><X size={16}/></button></div>{atmosphereNames[page].map((name, i) => <button key={name} aria-pressed={(variants[page] || 0) === i} onClick={() => setVariants(v => ({...v, [page]:i}))}>{name}<span>{(variants[page] || 0) === i ? '●' : '○'}</span></button>)}{page === 'arsenal' && <label>Pixel shape<select value={shape} onChange={event => setShape(event.target.value as typeof shape)}>{pixelShapes.map(s => <option key={s}>{s}</option>)}</select></label>}<p>{still ? 'Still mode is on.' : 'Your surroundings, your choice.'}</p></section>}
    </div>}
    {!page && !flight && <button className="universe-motion" aria-label={still ? 'Enable universe motion' : 'Pause universe motion'} onClick={() => setStill(!still)}>{still ? <Play size={13}/> : <Pause size={13}/>}</button>}
    {flight && <div className="transit-caption" role="status" aria-live="polite"><span>{pending.current?.from === 'universe' ? 'THE HOME GALAXY' : places.find(p => p.id === pending.current?.from)?.name} <ArrowUpRight size={13}/></span><p>{pending.current?.to === 'universe' ? 'Returning to the universe' : `Approaching ${places.find(p => p.id === pending.current?.to)?.name}`}</p><i/></div>}
    {error && !bootVisible && <div className="travel-error" role="alert"><p>{error}</p><button onClick={() => travel('universe')}>Return to the universe</button><button onClick={() => {const to = pending.current?.to; if (to) travel(to);}}>Try again</button></div>}
    {bootVisible && <UniverseLoading ready={ready} progress={progress} error={error} onExit={() => setBootVisible(false)}/>}
  </div>;
}
