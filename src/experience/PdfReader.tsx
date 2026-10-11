import {useEffect,useRef,useState} from 'react';
import {ChevronLeft,ChevronRight,Minus,Plus} from 'lucide-react';
import {getDocument,GlobalWorkerOptions,type PDFDocumentProxy} from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
GlobalWorkerOptions.workerSrc=workerUrl;
type LinkArea={url:string;left:number;top:number;width:number;height:number};
export default function PdfReader({url,label}: {url:string;label:string}) {
  const host=useRef<HTMLDivElement>(null);
  const canvas=useRef<HTMLCanvasElement>(null);
  const [pdf,setPdf]=useState<PDFDocumentProxy>();
  const [page,setPage]=useState(1);
  const [zoom,setZoom]=useState(1);
  const [width,setWidth]=useState(700);
  const [size,setSize]=useState({width:0,height:0});
  const [links,setLinks]=useState<LinkArea[]>([]);
  const [busy,setBusy]=useState(true);
  const [error,setError]=useState('');
  useEffect(()=>{
    let alive=true;setBusy(true);setError('');setPdf(undefined);setPage(1);setLinks([]);
    const task=getDocument({url});
    void task.promise.then(doc=>{if(alive)setPdf(doc);}).catch(()=>{if(alive){setBusy(false);setError('This PDF could not load. Use Text view or Open above.');}});
    return()=>{alive=false;void task.destroy();};
  },[url]);
  useEffect(()=>{if(!host.current)return;const observer=new ResizeObserver(([entry])=>setWidth(Math.max(220,entry.contentRect.width-32)));observer.observe(host.current);return()=>observer.disconnect();},[]);
  useEffect(()=>{
    if(!pdf || !canvas.current)return;
    let alive=true;
    let renderTask:ReturnType<Awaited<ReturnType<PDFDocumentProxy['getPage']>>['render']> | undefined;
    setBusy(true);setLinks([]);setError('');
    void (async()=>{
      const sheet=await pdf.getPage(page);if(!alive || !canvas.current)return;
      const original=sheet.getViewport({scale:1});
      const viewport=sheet.getViewport({scale:width/original.width*zoom});
      const ratio=Math.min(window.devicePixelRatio || 1,2,Math.sqrt(6000000/(viewport.width*viewport.height)));
      setSize({width:viewport.width,height:viewport.height});
      canvas.current.width=Math.ceil(viewport.width*ratio);canvas.current.height=Math.ceil(viewport.height*ratio);
      renderTask=sheet.render({canvas:canvas.current,viewport,transform:ratio===1?undefined:[ratio,0,0,ratio,0,0]});
      await renderTask.promise;if(!alive)return;
      const annotations=await sheet.getAnnotations();if(!alive)return;
      setLinks(annotations.filter(a=>a.url && /^(https?:|mailto:|tel:)/i.test(a.url)).map(a=>{const r=[...viewport.convertToViewportPoint(a.rect[0],a.rect[1]),...viewport.convertToViewportPoint(a.rect[2],a.rect[3])];return{url:a.url,left:Math.min(r[0],r[2]),top:Math.min(r[1],r[3]),width:Math.abs(r[2]-r[0]),height:Math.abs(r[3]-r[1])};}));
      setBusy(false);
    })().catch(err=>{if(alive && err?.name!=='RenderingCancelledException'){setBusy(false);setError('This page could not render. Use Text view or Open above.');}});
    return()=>{alive=false;renderTask?.cancel();};
  },[pdf,page,width,zoom]);
  return <div className="pdf-reader"><div className="pdf-controls" aria-label={`${label} reading controls`}>
    <button disabled={!pdf || page===1} onClick={()=>setPage(v=>v-1)} aria-label="Previous PDF page"><ChevronLeft size={18}/></button><span>Page {page} of {pdf?.numPages || '…'}</span><button disabled={!pdf || page>=pdf.numPages} onClick={()=>setPage(v=>v+1)} aria-label="Next PDF page"><ChevronRight size={18}/></button>
    <div/><button disabled={zoom<=0.5} onClick={()=>setZoom(v=>Math.max(.5,v-.25))} aria-label="Zoom out PDF"><Minus size={17}/></button><button onClick={()=>setZoom(1)} aria-label="Fit PDF to width">{Math.round(zoom*100)}%</button><button disabled={zoom>=2} onClick={()=>setZoom(v=>Math.min(2,v+.25))} aria-label="Zoom in PDF"><Plus size={17}/></button></div>
    <div ref={host} className="pdf-scroll" tabIndex={0} aria-label={`${label} pages`}><p role="status" className="pdf-status">{error || (busy?'Rendering document…':'')}</p><div className="pdf-sheet" style={{width:size.width || undefined,height:size.height || undefined}}><canvas ref={canvas} style={{width:size.width,height:size.height}} role="img" aria-label={`${label}, page ${page}. Choose Text view for selectable text.`}/>{links.map((link,i)=><a key={`${page}-${i}`} href={link.url} target={/^https?:/.test(link.url)?'_blank':undefined} rel="noreferrer" aria-label={`Document link: ${link.url}`} style={{left:link.left,top:link.top,width:link.width,height:link.height}}/>)}</div></div>
  </div>;
}
