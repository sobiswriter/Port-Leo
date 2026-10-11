import {lazy,Suspense,useState} from 'react';
import {ArrowUpRight, Download, FileText} from 'lucide-react';
import {RESUME_DOCUMENTS} from '../data/resume';
import {Eyebrow} from './RoomParts';
const PdfReader=lazy(()=>import('./PdfReader'));
export function ResumeSection() {
  const [selected,setSelected] = useState('resume');
  const [mode,setMode] = useState<'pdf'|'reader'>('pdf');
  const [texts,setTexts] = useState<Record<string,string>>({});
  const doc = RESUME_DOCUMENTS.find(d=>d.id===selected)!;
  async function read() {setMode('reader'); if (!texts.resume) {try {const data=await import('../data/documentText'); setTexts(data.DOCUMENT_TEXT);} catch {setTexts({resume:'Text could not load. Use PDF view or Open above.',cv:'Text could not load. Use PDF view or Open above.',ats:'Text could not load. Use PDF view or Open above.'});}}}
  return <section className="document-library" id="resume" aria-labelledby="resume-title">
    <div className="document-heading"><div><Eyebrow>Professional background</Eyebrow><h2 id="resume-title">The work, on paper.</h2><p>Read my résumé or full CV here. Keep a copy when you need it.</p></div><FileText size={34} aria-hidden="true"/></div>
    <div className="document-tabs" aria-label="Choose a professional document">{RESUME_DOCUMENTS.map(d=><button key={d.id} aria-pressed={selected===d.id} onClick={()=>setSelected(d.id)}>{d.label}</button>)}</div>
    <div className="document-toolbar"><div><strong>{doc.label}</strong><p>{doc.description}</p></div><div className="document-actions"><button aria-pressed={mode==='pdf'} onClick={()=>setMode('pdf')}>PDF view</button><button aria-pressed={mode==='reader'} onClick={read}>Text view</button><a href={doc.url} target="_blank" rel="noreferrer">Open <ArrowUpRight size={15}/></a><a href={doc.url} download={doc.filename}>Download <Download size={15}/></a></div></div>
    {mode==='pdf' ? <><Suspense fallback={<p role="status">Opening document reader…</p>}><PdfReader key={doc.id} label={doc.label} url={doc.url}/></Suspense><p className="document-help">Turn pages, zoom, and follow links directly in the document. Choose Text view for selectable text.</p></> : <article className="document-reader" aria-label={`${doc.label} text`} tabIndex={0}>{texts[doc.id] || 'Loading document text…'}</article>}
  </section>;
}
