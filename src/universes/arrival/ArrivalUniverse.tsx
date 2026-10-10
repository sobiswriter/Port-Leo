import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { type RoomProps, places } from '../../experience/places';
import { Eyebrow } from '../../experience/RoomParts';
export function ArrivalUniverse({onTravelTo}: RoomProps) {
 return <div className="arrival-room">
  <section className="threshold">
   <div className="threshold-note"><span>INDEPENDENT THOUGHT.<br/>INTERCONNECTED WORLDS.</span><span>EST. IN CURIOSITY<br/>BASED ON EARTH</span></div>
   <div className="threshold-title"><Eyebrow>The imagination of Sobi</Eyebrow><h1>A restless<br/><em>mind.</em><span className="title-star" aria-hidden="true">✳</span></h1><p>Some ideas become software.<br/>Others become entire worlds.</p></div>
   <button className="doorway" onClick={() => onTravelTo('builder')} aria-label="Enter the multiverse through the workshop"><span className="door-frame"><span className="door-light"/><span className="door-coordinate">01 — THE WORKSHOP</span></span><span className="door-caption">Step inside <ArrowRight size={20}/></span></button>
   <div className="threshold-bottom"><span>AI / ML DEVELOPER<br/>& CURIOUS HUMAN</span><button className="text-link" onClick={() => document.getElementById('world-directory')?.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})}>Or wander at your own pace <span>↓</span></button><span>EIGHT PLACES.<br/>ONE UNFINISHED STORY.</span></div>
  </section>
  <section className="world-directory" id="world-directory"><div className="directory-intro"><Eyebrow>A map, not an itinerary</Eyebrow><h2>Follow what<br/><em>pulls you.</em></h2><p>Work, experiments, questions, and the person behind them. Every door opens a different part of the same mind.</p></div><div className="directory-rows">{places.slice(1).map((p,i) => <button key={p.id} onClick={() => onTravelTo(p.id)}><span className="eyebrow">0{i+1}</span><span>{p.name}<small>{p.subtitle}</small></span><ArrowUpRight/></button>)}</div></section>
 </div>;
}
