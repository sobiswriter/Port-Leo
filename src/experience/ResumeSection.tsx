import { ArrowUpRight, Download, FileText } from 'lucide-react';
import { RESUME_DOCUMENT } from '../data/resume';
import { Eyebrow } from './RoomParts';
export function ResumeSection() {
  const {url, filename} = RESUME_DOCUMENT;
  return <section className="resume-section" id="resume" aria-labelledby="resume-title">
    <div><Eyebrow>Professional background</Eyebrow><h2 id="resume-title">Résumé & CV</h2>
      <p>Applied AI, software projects, research, and experience in one document.</p></div>
    <div className="resume-document"><FileText size={28} aria-hidden="true"/>
      {url ? <><span>PDF résumé</span><div><a href={url} target="_blank" rel="noreferrer">View résumé <ArrowUpRight size={16}/></a><a href={url} download={filename}>Download PDF <Download size={16}/></a></div></>
        : <><span>Updated résumé coming soon</span><p>The latest PDF will be available here.</p></>}
    </div>
  </section>;
}
