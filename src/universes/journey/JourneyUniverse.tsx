import React from 'react';
import { COSMIC_MILESTONES } from '../../data/portfolioData';
import { RoomProps } from '../../experience/places';
import { Continue, Eyebrow, ReadOn } from '../../experience/RoomParts';
export function JourneyUniverse({onTravelTo}: RoomProps) {
 return <div className="journey-room room-pad"><header className="journey-intro spacious-hero"><Eyebrow>05 / The long way here</Eyebrow><h1>Nothing happens<br/><em>in a straight line.</em></h1><p>A few moments that changed the direction.</p><ReadOn target="journey-path" label="Walk the path"/><span className="orbit-ring" aria-hidden="true"/></header><section className="journey-path" id="journey-path">{COSMIC_MILESTONES.map((m,i) => <article className="journey-moment" key={m.id}><div className="moment-marker"><span>{String(i+1).padStart(2,'0')}</span></div><div className="moment-copy"><Eyebrow>{m.year || m.epoch} / {m.category}</Eyebrow><h2>{m.title}</h2><p className="moment-summary">{m.summary}</p><p>{m.significance}</p><details><summary>A closer look +</summary><p>{m.context}</p><ul className="quiet-list">{m.verifiedDetails.map(d => <li key={d}>{d}</li>)}</ul></details></div></article>)}<div className="journey-unfinished"><Eyebrow>The next coordinate</Eyebrow><h2>Still becoming.</h2><p>There’s a lot of sky left.</p></div></section><Continue to="about" onTravelTo={onTravelTo}/></div>;
}

