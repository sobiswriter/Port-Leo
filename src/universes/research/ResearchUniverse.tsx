import {RESEARCH_RECORDS} from '../../data/portfolioData';
import {RESEARCH_ARTICLES, articleReadTime} from '../../data/researchArticles';
import {ResearchArticleBody} from '../../experience/ResearchArticleBody';
import {RoomProps} from '../../experience/places';
import {Continue, Eyebrow, RoomIdentity, ReadOn} from '../../experience/RoomParts';
export function ResearchUniverse({onTravelTo}: RoomProps) {
  return <div className="archive-room room-pad"><header className="archive-intro spacious-hero"><Eyebrow>03 / The archive</Eyebrow><RoomIdentity id="research"/><div className="archive-title"><span className="archive-bracket" aria-hidden="true">[</span><h1>Stay with<br/><em>the question.</em></h1><span className="archive-bracket" aria-hidden="true">]</span></div><p>Not every investigation ends with an answer.<br/>Some give you a better place to begin.</p><ReadOn target="archive-shelves" label="Read the notebook"/></header>
    <section className="archive-shelves" id="archive-shelves"><div className="shelf-heading"><Eyebrow>The research notebook</Eyebrow><span className="eyebrow">{RESEARCH_RECORDS.length} articles / open to read</span></div>{RESEARCH_RECORDS.map((record,index) => {
      const article = RESEARCH_ARTICLES[record.id];
      return <details className="archive-record" key={record.id}><summary><span className="record-number">{String(index+1).padStart(2,'0')}</span><span><small>{record.domain}</small><h2>{record.title}</h2><p className="article-preview-excerpt">{article?.introduction || record.overview}</p><span className="article-preview-meta">Working draft · {article ? articleReadTime(article) : 1} min read</span></span><span className="record-open">↗</span></summary>
        <article className="record-paper journal-paper" aria-label={`${record.title} article`}><aside className="record-margin"><Eyebrow>Written by</Eyebrow><p className="journal-author">Souradip Biswas</p><span className="journal-draft">Working draft</span><p>{article ? articleReadTime(article) : 1} minute read</p>{record.dateOrEra && <p>{record.dateOrEra}</p>}<span className="journal-rule" aria-hidden="true"/><small>{record.domain}</small></aside><div>
          {article ? <ResearchArticleBody article={article}/> : <p className="record-overview">{record.overview}</p>}
          <footer className="journal-context"><Eyebrow>Project & publication context</Eyebrow><p>{record.overview}</p>{record.investigationDetails.map(detail => <p key={detail}>{detail}</p>)}{record.keyOutcomes.map(outcome => <p key={outcome}>{outcome}</p>)}{record.artifactsAndTools.length > 0 && <p className="stack-line">{record.artifactsAndTools.join(' / ')}</p>}</footer>
        </div></article></details>;
    })}</section><Continue to="arsenal" onTravelTo={onTravelTo}/></div>;
}
