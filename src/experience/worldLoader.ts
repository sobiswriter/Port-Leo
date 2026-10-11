import { lazy } from 'react';
import type { UniverseId } from '../types/universe';

// One promise per module: prefetch and React.lazy share the same browser/module cache.
const loaders = {
  arrival: () => import('../universes/arrival/ArrivalUniverse').then(m => ({default: m.ArrivalUniverse})),
  builder: () => import('../universes/builder/BuilderUniverse').then(m => ({default: m.BuilderUniverse})),
  'ai-lab': () => import('../universes/ai-lab/AiLabUniverse').then(m => ({default: m.AiLabUniverse})),
  research: () => import('../universes/research/ResearchUniverse').then(m => ({default: m.ResearchUniverse})),
  arsenal: () => import('../universes/arsenal/ArsenalUniverse').then(m => ({default: m.ArsenalUniverse})),
  journey: () => import('../universes/journey/JourneyUniverse').then(m => ({default: m.JourneyUniverse})),
  about: () => import('../universes/about/AboutUniverse').then(m => ({default: m.AboutUniverse})),
  beyond: () => import('../universes/beyond/BeyondUniverse').then(m => ({default: m.BeyondUniverse})),
};
type RoomModule = Awaited<ReturnType<typeof loaders[UniverseId]>>;
const cache = new Map<UniverseId, Promise<RoomModule>>();
const atmospheres = {
  arrival: () => import('../components/react-bits/PatternWaves'),
  builder: () => import('../components/react-bits/MicroSlats'),
  'ai-lab': () => import('../components/react-bits/Topography'),
  research: () => import('../components/react-bits/Lightfall'),
  arsenal: () => import('../components/react-bits/PixelBlast'),
  journey: () => import('../components/react-bits/Galaxy'),
  about: () => import('../components/react-bits/FaultyTerminal'),
  beyond: () => import('../components/react-bits/Hyperspeed'),
};
export function preloadRoom(id: UniverseId) {
  let promise = cache.get(id);
  if (!promise) {
    promise = Promise.all([loaders[id](), atmospheres[id]().catch(() => null)])
      .then(([room]) => room).catch(error => {cache.delete(id); throw error;});
    cache.set(id, promise);
  }
  return promise;
}
export const rooms = Object.fromEntries(Object.keys(loaders).map(id => [id, lazy(() => preloadRoom(id as UniverseId))])) as Record<UniverseId, ReturnType<typeof lazy<RoomModule['default']>>>;
let galaxyPromise: ReturnType<typeof importGalaxy> | undefined;
const importGalaxy = () => import('../components/galaxy/Galaxy').then(m => ({default: m.Galaxy}));
export const preloadGalaxy = () => galaxyPromise ??= importGalaxy();
export const Universe = lazy(preloadGalaxy);

export function warmWorlds() {
  const connection = (navigator as Navigator & {connection?: {saveData?: boolean; effectiveType?: string}}).connection;
  if (connection?.saveData || connection?.effectiveType?.includes('2g')) return () => {};
  const queue = Object.keys(loaders).map(id => () => preloadRoom(id as UniverseId));
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout>;
  let idle: number | undefined;
  const schedule = () => {
    if (cancelled) return;
    if ('requestIdleCallback' in window) idle = window.requestIdleCallback(next, {timeout: 2500});
    else timer = setTimeout(next, 350);
  };
  const next = () => {
    if (cancelled) return;
    if (document.hidden) {timer = setTimeout(schedule, 1200); return;}
    const load = queue.shift();
    if (!load) return;
    void load().catch(() => {}).finally(schedule);
  };
  timer = setTimeout(schedule, 1200);
  return () => {cancelled = true; clearTimeout(timer); if (idle !== undefined) window.cancelIdleCallback(idle);};
}
