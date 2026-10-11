export function LiveProjectPreview({url,title,unavailable}: {url:string;title:string;unavailable?:string}) {
  return <section className="live-project-preview" aria-label={`${title} live preview`}>
    <div className="preview-screen">
      {!unavailable && <iframe src={url} title={`${title} live site preview`} loading="lazy" tabIndex={-1} aria-hidden="true" referrerPolicy="strict-origin-when-cross-origin" sandbox="allow-scripts allow-same-origin"/>}
      <a className={unavailable ? 'preview-launch' : 'preview-visit'} href={url} target="_blank" rel="noreferrer" aria-label={`Visit ${title} live site`}>
        {unavailable && <><strong>{title}</strong><span>{unavailable}</span></>}
      </a>
    </div>
  </section>;
}
