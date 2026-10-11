import {LiveProjectPreview} from '../../experience/LiveProjectPreview';
import {useState} from 'react';
import {ArrowLeft, ArrowRight, ArrowUpRight, Search} from 'lucide-react';
import {BUILD_PROJECTS} from '../../data/portfolioCollections';
import {RoomProps} from '../../experience/places';
import {Continue, Eyebrow, RoomIdentity, AnimatedPanel, ReadOn} from '../../experience/RoomParts';
export function BuilderUniverse({onTravelTo}: RoomProps) {
  const [selected,setSelected] = useState(BUILD_PROJECTS[0].id);
  const [query,setQuery] = useState('');
  const project = BUILD_PROJECTS.find(p => p.id === selected)!;
  const filtered = BUILD_PROJECTS.filter(p => `${p.title} ${p.category} ${p.stack.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
  const index = BUILD_PROJECTS.findIndex(p => p.id === selected);
  const description = [...new Set([project.problem, ...project.architecture].filter(Boolean))];
  return <div className="workshop-room room-pad"><header className="room-intro spacious-hero"><Eyebrow>01 / The workshop</Eyebrow><RoomIdentity id="builder"/><h1>Thought becomes<br/><em>something real.</em></h1><p>A working collection of software, systems, and stubborn ideas.</p><ReadOn target="workbench" label="Step into the workshop"/></header>
    <section id="workbench" className="workbench" aria-label="Project workbench"><aside className="project-index"><div className="index-heading"><span className="eyebrow">The collection</span><span>{BUILD_PROJECTS.length}</span></div><label className="project-search"><Search size={15}/><input aria-label="Find a project" placeholder="Find something…" value={query} onChange={e => setQuery(e.target.value)}/></label><div className="project-list">{filtered.map(p => <button key={p.id} aria-pressed={selected===p.id} onClick={() => setSelected(p.id)}><span>{String(BUILD_PROJECTS.indexOf(p)+1).padStart(2,'0')}</span>{p.title}<ArrowUpRight size={14}/></button>)}{!filtered.length && <p className="empty-note">No projects match. Try another word.</p>}</div></aside>
      <AnimatedPanel as="article" className="project-folio" key={project.id}><div className="folio-top"><Eyebrow>Selected work / {String(index+1).padStart(2,'0')}</Eyebrow>{project.status && <span className="folio-stamp">{project.status}</span>}</div><span className="folio-watermark" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><h2>{project.title}</h2>
        {project.liveUrl && <LiveProjectPreview key={project.id} url={project.liveUrl} title={project.title} unavailable={project.previewUnavailable}/>}
        <div className="folio-body"><Eyebrow>About the project</Eyebrow>{description.map(text => <p key={text}>{text}</p>)}{project.keyFeatures.length > 0 && <ul className="quiet-list">{project.keyFeatures.map(f => <li key={f}>{f}</li>)}</ul>}{project.stack.length > 0 && <p className="stack-line">{project.stack.join(' / ')}</p>}
          {(project.role || project.category || project.executionEnvironment) && <details className="folio-context"><summary>Project details</summary>{project.role && <p>{project.role}</p>}{project.category && <p>{project.category}</p>}{project.executionEnvironment && <p>{project.executionEnvironment}</p>}</details>}
        </div>
        <div className="folio-bottom"><div className="project-links">{project.sourceUnavailable && <span className="source-note">{project.sourceUnavailable}</span>}{project.githubUrl && !project.sourceUnavailable && <a href={project.githubUrl} target="_blank" rel="noreferrer">Source code <ArrowUpRight size={14}/></a>}{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={14}/></a>}</div><div><button aria-label="Previous project" onClick={() => setSelected(BUILD_PROJECTS[(index-1+BUILD_PROJECTS.length)%BUILD_PROJECTS.length].id)}><ArrowLeft size={18}/></button><button aria-label="Next project" onClick={() => setSelected(BUILD_PROJECTS[(index+1)%BUILD_PROJECTS.length].id)}><ArrowRight size={18}/></button></div></div>
      </AnimatedPanel></section><Continue to="ai-lab" onTravelTo={onTravelTo}/></div>;
}
