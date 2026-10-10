import React, { useState } from 'react';
import { TOPOLOGY_NODES, PROJECTS_DATA } from '../../data/portfolioData';
import { RoomProps } from '../../experience/places';
import { Continue, Eyebrow } from '../../experience/RoomParts';
export function ArsenalUniverse({onTravelTo}: RoomProps) {
 const [selected,setSelected] = useState(TOPOLOGY_NODES[0].id);
 const node = TOPOLOGY_NODES.find(n => n.id===selected)!;
 const clusters = [...new Set(TOPOLOGY_NODES.map(n => n.cluster))];
 return <div className="arsenal-room room-pad"><header className="room-intro"><Eyebrow>04 / The tool room</Eyebrow><h1>Know the tools.<br/><em>Build beyond them.</em></h1><p>A cabinet of languages, systems, and ways of thinking.</p></header><section className="tool-cabinet"><div className="tool-drawers">{clusters.map((cluster,i) => <section className="tool-drawer" key={cluster}><Eyebrow>0{i+1} / {cluster}</Eyebrow><div>{TOPOLOGY_NODES.filter(n => n.cluster===cluster).map(n => <button aria-pressed={selected===n.id} key={n.id} onClick={() => setSelected(n.id)}>{n.name}<span>{selected===n.id ? '↗' : '+'}</span></button>)}</div></section>)}</div><aside className="tool-inspector" aria-live="polite"><div className="tool-emblem" aria-hidden="true">✳</div><Eyebrow>On the workbench</Eyebrow><h2>{node.name}</h2><span className="tool-depth">{node.depth}</span><p>{node.description}</p><Eyebrow>Works with</Eyebrow><div className="related-tools">{node.connectedNodes.map(id => {const related=TOPOLOGY_NODES.find(n => n.id===id); return related ? <button key={id} onClick={() => setSelected(id)}>{related.name} ↗</button> : null;})}</div><Eyebrow>Put to use in</Eyebrow><ul>{node.relatedProjects.map(p => <li key={p}>{PROJECTS_DATA.find(project => project.id===p)?.title || p}</li>)}</ul><button className="text-link" onClick={() => onTravelTo('builder')}>Visit the workshop ↗</button></aside></section><Continue to="journey" onTravelTo={onTravelTo}/></div>;
}
