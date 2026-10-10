import { lazy, Suspense, useEffect, useState } from 'react';
const GlowCursor = lazy(() => import('../components/react-bits/GlowCursor'));

export function RoomCursor({ enabled }: { enabled: boolean }) {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const media = matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setFine(media.matches);
    sync(); media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  if (!fine || !enabled) return null;
  return <div className="room-cursor" aria-hidden="true"><Suspense fallback={null}>
    <GlowCursor color="#5f8bff" secondaryColor="#5f8bff" quality="high"
      intensity={0.75} trailWidth={1} linger={2} glow={0} hotspot={0.7} followSpeed={0}
      grain={0} clickBurst enabled/>
  </Suspense></div>;
}
