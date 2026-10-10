import React, { useRef, useState } from 'react';
import { ArrowUpRight, X, Copy, Check } from 'lucide-react';
import { BEYOND_DATA } from '../../data/portfolioData';
import { RoomProps } from '../../experience/places';
import { Eyebrow } from '../../experience/RoomParts';
export function BeyondUniverse({onTravelTo}: RoomProps) {
 const dialog = useRef<HTMLDialogElement>(null);
 const [copied,setCopied] = useState(false);
 const [notice,setNotice] = useState('');
 const [name,setName] = useState('');
 const [message,setMessage] = useState('');
 async function copy() {try {await navigator.clipboard.writeText(BEYOND_DATA.email); setCopied(true); setNotice('Email address copied.');} catch {setNotice(`Copy this address: ${BEYOND_DATA.email}`);}}
 function draft(e:React.FormEvent) {e.preventDefault(); location.href=`mailto:${BEYOND_DATA.email}?subject=${encodeURIComponent(`A new possibility — ${name}`)}&body=${encodeURIComponent(`Hi Sobi,\n\n${message}\n\n${name}`)}`; setNotice('Your email app has been requested. Review and send the draft there.');}
 return <div className="beyond-room room-pad"><section className="road-invitation"><Eyebrow>07 / The open road</Eyebrow><h1>And now,<br/><em>what’s next?</em></h1><p>A strange idea. A difficult problem. A conversation<br/>that turns into something neither of us expected.</p><button className="primary-link" onClick={() => dialog.current?.showModal()}>Let’s find out <ArrowUpRight size={22}/></button><div className="email-line"><a href={`mailto:${BEYOND_DATA.email}`}>{BEYOND_DATA.email}</a><button aria-label="Copy email address" onClick={copy}>{copied ? <Check size={16}/> : <Copy size={16}/>}</button></div><p className="contact-notice" role="status">{notice}</p></section><footer className="road-footer"><div><Eyebrow>Find me elsewhere</Eyebrow><div className="social-links">{BEYOND_DATA.channels.filter(c => !c.url.startsWith('mailto:')).map(c => <a href={c.url} key={c.name} target="_blank" rel="noreferrer">{c.name} <ArrowUpRight size={15}/></a>)}</div></div><button className="text-link" onClick={() => onTravelTo('arrival')}>Back to the beginning ↗</button></footer><dialog className="letter-dialog" ref={dialog} aria-labelledby="letter-title"><form onSubmit={draft}><div className="settings-title"><Eyebrow>A little correspondence</Eyebrow><button type="button" aria-label="Close letter" onClick={() => dialog.current?.close()}><X/></button></div><h2 id="letter-title">Dear Sobi,</h2><label>What’s on your mind?<textarea required value={message} onChange={e => setMessage(e.target.value)} placeholder="I’ve been thinking about…" rows={6}/></label><label>Your name<input required value={name} onChange={e => setName(e.target.value)} autoComplete="name" placeholder="Signed,"/></label><button className="primary-link" type="submit">Open email draft <ArrowUpRight size={18}/></button><p>Opens your email app. You review and send it there.</p><p role="status">{notice}</p></form></dialog></div>;
}
