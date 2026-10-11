import type {ResearchArticleDraft} from '../data/researchArticles';
export function ResearchArticleBody({article}: {article:ResearchArticleDraft}) {
  return <div className="research-prose"><p className="article-lede">{article.introduction}</p>{article.sections.map((section,index) => <section key={section.heading}><h3><span aria-hidden="true">{String(index+1).padStart(2,'0')}</span>{section.heading}</h3>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{index===0 && <blockquote>{article.pullQuote}</blockquote>}</section>)}</div>;
}
