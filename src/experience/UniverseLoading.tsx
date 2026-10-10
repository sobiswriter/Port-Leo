import React from 'react';
export function UniverseLoading({ready, progress, error, onExit}: {ready: boolean; progress: number; error: string | null; onExit: () => void}) {
  return <div className={`universe-loading ${ready ? 'is-ready' : ''}`} role="status" aria-live="polite" onTransitionEnd={event => {if (ready && event.target === event.currentTarget) onExit();}}>
    <span className="loading-wordmark">sobi<span>®</span></span>
    <div className="loading-system" aria-hidden="true"><i/><i/><i/><b/><span/></div>
    <div className="loading-copy"><span className="eyebrow">A PERSONAL UNIVERSE</span><p>{error ? 'A world is taking longer to reach.' : ready ? 'Your universe awaits.' : 'Everything begins with a little curiosity.'}</p><span className="loading-stage">{error ? 'CONNECTION INTERRUPTED' : progress < 45 ? 'GATHERING STARLIGHT' : progress < 90 ? 'CHARTING YOUR WORLDS' : 'OPENING THE UNIVERSE'}</span><div className="loading-track"><i style={{width: `${progress}%`}}/></div>{error && <button onClick={() => location.reload()}>Try again ↗</button>}</div>
    <span className="loading-footnote">WORK · THOUGHT · POSSIBILITY</span>
  </div>;
}
