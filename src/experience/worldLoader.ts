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
export function preloadRoom(id: UniverseId) {
  let promise = cache.get(id);
  if (!promise) {
    promise = loaders[id]().catch(error => {cache.delete(id); throw error;});
    cache.set(id, promise);
  }
  return promise;
}
export const rooms = Object.fromEntries(Object.keys(loaders).map(id => [id, lazy(() => preloadRoom(id as UniverseId))])) as Record<UniverseId, ReturnType<typeof lazy<RoomModule['default']>>>;
let galaxyPromise: ReturnType<typeof importGalaxy> | undefined;
const importGalaxy = () => import('../components/galaxy/Galaxy').then(m => ({default: m.Galaxy}));
export const preloadGalaxy = () => galaxyPromise ??= importGalaxy();
export const Universe = lazy(preloadGalaxy);

const atmospheres = [
  () => import('../components/react-bits/PatternWaves'), () => import('../components/react-bits/MicroSlats'),
  () => import('../components/react-bits/Topography'), () => import('../components/react-bits/Lightfall'),
  () => import('../components/react-bits/PixelBlast'), () => import('../components/react-bits/Galaxy'),
  () => import('../components/react-bits/FaultyTerminal'), () => import('../components/react-bits/Hyperspeed'),
];
export function warmWorlds() {
  const connection = (navigator as Navigator & {connection?: {saveData?: boolean; effectiveType?: string}}).connection;
  if (connection?.saveData || connection?.effectiveType?.includes('2g')) return () => {};
  const queue = [...Object.keys(loaders).map(id => () => preloadRoom(id as UniverseId)), ...atmospheres];
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout>;
  const next = () => {
    if (cancelled) return;
    const load = queue.shift();
    if (!load) return;
    void load().catch(() => {}).finally(() => { if (!cancelled) timer = setTimeout(next, 350); });
  };
  timer = setTimeout(next, 1200);
  return () => {cancelled = true; clearTimeout(timer);};
}
