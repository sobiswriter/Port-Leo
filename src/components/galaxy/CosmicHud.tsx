import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw, ArrowUpRight, List, X, Eye } from 'lucide-react';
import { DestinationConfig } from './types';

interface CosmicHudProps {
  destinations: DestinationConfig[];
  activeDestinationId: string | null;
  hoveredDestinationId: string | null;
  isTraveling: boolean;
  isMuted: boolean;
  onDestinationSelect: (id: string) => void;
  onDestinationHover: (id: string | null) => void;
  onReturnHome: () => void;
  onToggleMute: () => void;
  onZoom: (action: 'in' | 'out' | 'reset' | 'focus', target?: string) => void;
  distance: number;
}

export const CosmicHud: React.FC<CosmicHudProps> = (props) => {
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [inspectedId, setInspectedId] = useState<string | null>(null);
  useEffect(() => { if (props.isTraveling) {setDirectoryOpen(false); setInspectedId(null);} }, [props.isTraveling]);
  useEffect(() => { if (props.hoveredDestinationId) setInspectedId(props.hoveredDestinationId); }, [props.hoveredDestinationId]);
  const selected = props.destinations.find(d => d.id === (props.activeDestinationId || props.hoveredDestinationId || inspectedId));
  return <div className="cosmic-hud">
    <header className="cosmic-header"><span className="cosmic-wordmark">sobi<span>®</span></span><span className="cosmic-coordinate">PERSONAL MULTIVERSE / STAR ATLAS</span></header>
    <div className="cosmic-intro"><span className="cosmic-kicker">THE IMAGINATION OF SOBI / {String(props.destinations.length).padStart(2, '0')} WORLDS</span><h1>Bound by curiosity.<br/><em>Limitless by nature.</em></h1><p>Some ideas become software. Others become entire worlds.<br/>Find the star that pulls you.</p></div>
    <button className="cosmic-directory-toggle" aria-expanded={directoryOpen} aria-controls="cosmic-directory" onClick={() => setDirectoryOpen(!directoryOpen)}>{directoryOpen ? <X size={15}/> : <List size={15}/>}World directory</button>
    <nav id="cosmic-directory" className={`cosmic-directory ${directoryOpen ? 'is-open' : ''}`} aria-label="Galaxy worlds">
      <div className="cosmic-kicker">CHOOSE YOUR OWN WAY</div>
      {props.destinations.map(dest => <button key={dest.id} disabled={props.isTraveling} onClick={() => props.onDestinationSelect(dest.id)} onMouseEnter={() => props.onDestinationHover(dest.id)} onMouseLeave={() => props.onDestinationHover(null)} onFocus={() => props.onDestinationHover(dest.id)} onBlur={() => props.onDestinationHover(null)} className={selected?.id === dest.id ? 'is-active' : ''} style={{'--star-color': dest.color} as React.CSSProperties}><span className="cosmic-sector">{dest.sectorCode}</span><i/><span>{dest.name}</span><ArrowUpRight size={14}/></button>)}
      <p>There is no right order.</p>
    </nav>
    {selected && !props.isTraveling && <div className="cosmic-inspection"><button className="cosmic-preview-close" aria-label="Close star preview" onClick={() => {setInspectedId(null); props.onDestinationHover(null);}}><X size={12}/></button><span className="cosmic-kicker">{selected.sectorCode} / STELLAR SYSTEM</span><p>{selected.name}</p><button onClick={() => props.onZoom('focus', selected.id)}>Look closer <Eye size={12}/></button><button onClick={() => props.onDestinationSelect(selected.id)}>Enter world <ArrowUpRight size={12}/></button></div>}
    <footer className="cosmic-footer"><span className="cosmic-instructions">DRAG TO ORBIT <b>·</b> SCROLL TO ZOOM <b>·</b> SELECT A STAR</span><div>
      {props.activeDestinationId && <button disabled={props.isTraveling} onClick={props.onReturnHome} aria-label="Return to galaxy"><RotateCcw size={14}/><span>Return</span></button>}
      <button data-sound-control onClick={props.onToggleMute} aria-label={props.isMuted ? 'Enable galaxy sound' : 'Mute galaxy sound'} aria-pressed={!props.isMuted}>{props.isMuted ? <VolumeX size={14}/> : <Volume2 size={14}/>}<span>Sound {props.isMuted ? 'off' : 'on'}</span></button>
    </div></footer>
    <div className="cosmic-status" role="status" aria-live="polite">{props.isTraveling ? `In transit · ${selected?.name ?? 'the home galaxy'}` : selected ? selected.subtitle : props.distance > 85 ? 'A single galaxy in an ocean of possibilities.' : 'You are here. Everything else is a possibility.'}</div>
  </div>;
};


