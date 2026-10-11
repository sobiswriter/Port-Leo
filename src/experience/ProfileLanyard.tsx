import {lazy, Suspense, useCallback, useContext, useState} from 'react';
import {StillContext} from './RoomParts';
const Lanyard = lazy(() => import('../components/react-bits/Lanyard'));
const front = new URL('images/Profile card front.png', document.baseURI).href;
const back = new URL('images/Profile card back.png', document.baseURI).href;
export function ProfileLanyard() {
  const still = useContext(StillContext);
  const [flipped, setFlipped] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const useFallback = useCallback(() => setUnavailable(true), []);
  const staticCard = still || unavailable;
  const fallback = <button className="profile-card-static" onClick={()=>setFlipped(v=>!v)} aria-label="Flip profile card"><img src={flipped ? back : front} alt={flipped ? 'Souradip Biswas: selected work and focus' : 'Souradip Biswas personal profile'} /></button>;
  return <div className={`profile-lanyard ${staticCard ? 'is-still' : 'is-free'}`}><div className="profile-lanyard-stage">
    {staticCard ? fallback : <Suspense fallback={fallback}><Lanyard onUnavailable={useFallback} pageDrag anchor="right" frontImage={front} backImage={back} strapImage={undefined} imageFit="contain" cardColor="#080b14" finish="glossy" size={0.64} strapLength={0.22} strapColor="#222039" metal="graphite" damping={0.65} breeze={0.12} style={{height:'100%'}} /></Suspense>}
    </div><p className="lanyard-hint">{staticCard ? 'Click the card to see the other side.' : 'Drag to swing · click to flip · Enter or Space when focused'}</p></div>;
}
