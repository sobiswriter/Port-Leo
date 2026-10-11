import fs from 'node:fs';
import { PROJECTS_DATA as previous } from '../src/data/portfolioData.ts';
import { places } from '../src/experience/places.ts';
const source = fs.readFileSync('output/old-portfolio-page.js','utf8');
// Only parse static JSON-compatible project literals; never execute downloaded code.
const originals = [...source.matchAll(/\{\s*title:\s*"[^]*?stack:\s*\[[^\]]*\][^}]*\}/g)].map(([block]) =>
  JSON.parse(block.replace(/\b(title|type|desc|summary|details|stack|github|demo):/g,'"$1":').replace(/,\s*}/g,'}')));
if (originals.length!==19) throw Error(`Expected 19 source projects; got ${originals.length}`);
const projects=previous.map(old=>{
  const p=originals.find(p=>p.title===old.title || (old.id==='right-left' && p.title.startsWith('RIGHT.LEFT')));
  if (!p) throw Error(`Missing project: ${old.title}`);
  return {id:old.id,title:p.title,tagline:p.desc,category:old.category,role:p.type,
    problem:p.summary,architecture:[p.details],keyFeatures:[],stack:p.stack,
    ...(p.github?{githubUrl:p.github}:{}),...(p.demo?{liveUrl:p.demo}:{}),
    featured:p.title==='LegalLM',status:p.title==='LegalLM'?'Featured Project':p.title==='Project AIC'?'Long-term Project':'Portfolio Project',executionEnvironment:p.type};
});
projects.find(p=>p.id==='the-shadow-diary').keyFeatures = ['Inspired by psychological and Jungian themes.'];
projects.find(p=>p.id==='ps-utility-suite').keyFeatures = ['Web scraping and scheduling modules.', 'Stopwatch utilities and image editing tools.'];
const ai=projects.filter(p=>['legallm','project-aic','personaverse','the-shadow-diary','ai-overlay','equity-echo'].includes(p.id)).map(p=>({
  id:p.id,title:p.title,tagline:p.tagline,focusArea:p.role,what:p.problem,why:p.problem,how:p.architecture[0],
  whatWasExplored:p.architecture[0],whatWasLearned:p.problem,technologies:p.stack,relatedProjects:[p.id],status:p.status
}));
const investigations=[
 ['document-intelligence','Document Intelligence','Document analysis & NLP',['legallm']],
 ['behavior-persona','Persona, Identity & Behavior Modeling','Behavior-aware interfaces',['project-aic','personaverse']],
 ['generative-writing','Generative AI & Writing','AI-assisted rewriting',['the-shadow-diary']],
 ['creative-tooling','Creative & Systems Tooling','Interfaces and automation',['cosmic-canvas','ai-overlay','ps-utility-suite']],
];
const research=investigations.map(([id,title,domain,ids])=>({id,title,type:'SYSTEM EXPLORATION',domain,
 overview:ids.map(id=>projects.find(p=>p.id===id).problem).join(' '),
 investigationDetails:ids.map(id=>projects.find(p=>p.id===id).architecture[0]),keyOutcomes:[],
 artifactsAndTools:[...new Set(ids.flatMap(id=>projects.find(p=>p.id===id).stack))]}));
research.push({id:'patent',title:'Patent Publication (IPR)',type:'PUBLICATION SIGNAL',domain:'Applied research',
 overview:'Published a patent demonstrating original technical innovation and applied research.',
 investigationDetails:['Patent publication is listed in the previous portfolio.'],keyOutcomes:[],artifactsAndTools:[],signalBadge:'Patent publication'});
research.push({id:'conferences',title:'Conference Participation',type:'CONFERENCE SIGNAL',domain:'Industry events',
 overview:'Attended ODDO Meet in Gandhinagar and IMC Conference in Delhi.',
 investigationDetails:['ODDO Meet · Gandhinagar','IMC Conference · Delhi'],keyOutcomes:[],artifactsAndTools:[]});
const skills=[
 ['python','Python','LANGUAGES',['Python']],['typescript','TypeScript','LANGUAGES',['TypeScript']],['javascript','JavaScript','LANGUAGES',['JavaScript','React']],['powershell','PowerShell','LANGUAGES',['PowerShell']],['java','Java','LANGUAGES',[]],
 ['nlp','NLP & Generative AI','AI / ML',['AI/NLP Stack','OpenAI API','Gemini AI']],['documents','Document Analysis','AI / ML',['AI/NLP Stack']],['transformers','Transformers','AI / ML',['Transformers','PyTorch']],['rewriting','AI Rewriting Pipelines','AI / ML',['OpenAI API']],
 ['electron','Electron','APPLICATION DEVELOPMENT',['Electron']],['tkinter','Tkinter','APPLICATION DEVELOPMENT',['Tkinter']],['node-next','Node.js & Next.js','APPLICATION DEVELOPMENT',['Node.js','Next.js']],['ai-interface','UI/UX for AI','APPLICATION DEVELOPMENT',['AI Integration','React']],['api','API Architectures','APPLICATION DEVELOPMENT',['Express','Twilio','Financial APIs']],
 ['modular','Modular AI Design','SYSTEMS & TOOLING',['Transformers']],['automation','Automation Pipelines','SYSTEMS & TOOLING',['PowerShell','Twilio']],['cli','CLI & PowerShell Utilities','SYSTEMS & TOOLING',['PowerShell']],['integrations','Third-party Integrations','SYSTEMS & TOOLING',['Twilio','SMTP','OpenAI API','Gemini AI']]
];
const nodes=skills.map(([id,name,cluster,tech])=>({id,name,cluster,depth:id==='java'?'Familiarity':'Applied',
 description:id==='java'?'Working familiarity with Java.':`${name} is part of my ${cluster.toLowerCase().replace('ai / ml','AI / ML')} toolkit.`,
 connectedNodes:skills.filter(s=>s[2]===cluster && s[0]!==id).slice(0,3).map(s=>s[0]),relatedProjects:projects.filter(p=>p.stack.some(t=>tech.includes(t))).map(p=>p.id)}));
const events=[
 ['openxai-2025','India Accelerator – OpenXAI','2025','Cohort','Blockseblock Labs','Collaborative project under Blockseblock Labs, in an accelerator-style development environment focused on scalable AI systems.'],
 ['hacktoskill-2025','LegalLM – HacktoSkill','2025','Cohort',"Google’s HacktoSkill program",'Collaborative project focused on scalable AI legal systems.'],
 ['patent-publication','Patent Publication (IPR)',null,'Patent','Applied research','Published a patent demonstrating original technical innovation and applied research.'],
 ['techfest-iit-ropar','Tech Fest – IIT Ropar',null,'Award & Recognition','IIT Ropar','Recognition for technical performance and innovation.'],
 ['hackathons-ideathons','Hackathons & Ideathons',null,'Hackathon','Rapid prototyping','Winner and participant in multiple events involving problem-solving and solution presentation.'],
 ['oddo-meet','ODDO Meet',null,'Conference','Gandhinagar','Attended ODDO Meet in Gandhinagar.'],
 ['imc-conference','IMC Conference',null,'Conference','Delhi','Attended IMC Conference in Delhi.'],
 ['hackerrank','HackerRank',null,'Award & Recognition','Programming','5★ in Problem Solving and 5★ in Python.'],
 ['espanola','Espanola – Grade B*',null,'Academic','Language coursework','Completed foundational Spanish coursework with consistent performance.'],
];
const milestones=events.map(([id,title,year,category,context,summary],index)=>({id,title,...(year?{year}:{}),epoch:category,category,context,summary,significance:'',verifiedDetails:[summary],celestialCoordinates:{sector:context,magnitude:category,anchorIndex:index}}));
const about={name:'Souradip (Sobi) Biswas',handle:'@sobiswriter',role:'AI / ML Developer & Researcher',location:'India',timezone:'IST (UTC+05:30)',coordinates:'',status:'College student · independent developer · research-oriented builder',
 positioning:['AI / ML Systems','Applied AI','Creative Tooling'],manifestoStatement:'AI as a system, not a demo.',
 narrativeParagraphs:['I build applied AI systems with a focus on usability, clarity, and reliable execution. My core interests include document intelligence, generative AI, NLP, and behavior-aware interfaces.', 'I combine AI, interface design, and tooling into complete products, with an iterative workflow centered on shipping useful outcomes. I am a college student and independent developer with a research-driven product mindset.'],
 engineeringAxioms:[{number:'01',title:'Applied Systems',thesis:'Build usable systems around AI.',context:'Focus on usability, clarity, and reliable execution.'},{number:'02',title:'AI + Interfaces + Tooling',thesis:'Bring intelligence and the interface together.',context:'Combine AI, interface design, and tooling into complete products.'},{number:'03',title:'Experiment & Iterate',thesis:'Keep building, sharing, and improving.',context:'An iterative workflow centered on useful outcomes.'}],
 currentExplorations:['Document intelligence and NLP','Generative AI and rewriting pipelines','Persona, identity, and behavior modeling','Creative and systems tooling'],offlinePursuits:['Foundational Spanish coursework · Espanola Grade B*']};
about.narrativeParagraphs.push('I share projects on GitHub and technical posts on LinkedIn about AI systems, interfaces, and development practices. Building, sharing, and refining real systems is a consistent thread through my work.');
const beyond={transmissionHeader:'Contact & Résumé',terminalStatus:'Open to collaboration',email:'souradip.biswas23@lpu.in',channels:[
 {name:'GitHub',handle:'@sobiswriter',url:'https://github.com/sobiswriter',protocol:'Code',note:'Projects and source repositories.'},
 {name:'LinkedIn',handle:'Souradip Biswas',url:'https://www.linkedin.com/in/sobiswriter/',protocol:'Professional profile',note:'Professional updates and connections.'},
 {name:'Previous Portfolio',handle:'sobi.codes',url:'https://sobi.codes/',protocol:'Portfolio',note:'The original portfolio.'}],
 curriculumVitae:{summary:'A résumé covering applied AI, software projects, research, and professional background.',coreCompetencies:about.positioning,verifiedSignals:events.map(e=>e[1]),resumeDownloadAvailable:false}};
const metadata=places.map((p,i)=>({id:p.id,indexStr:String(i).padStart(2,'0'),name:p.name,title:p.name,tagline:p.subtitle,concept:p.worldName,hash:p.id}));
const exports=[['UNIVERSES_META','UniverseMeta[]',metadata],['PROJECTS_DATA','ProjectItem[]',projects],['AI_LAB_EXPERIMENTS','AiLabExperiment[]',ai],['RESEARCH_RECORDS','ResearchRecordItem[]',research],['TOPOLOGY_NODES','TopologyNode[]',nodes],['COSMIC_MILESTONES','CosmicMilestone[]',milestones],['ABOUT_DOSSIER','AboutDossier',about],['BEYOND_DATA','BeyondData',beyond]];
fs.writeFileSync('src/data/portfolioData.ts',"// Content reconciled against sobi.codes and sobiswriter/Me-Protfolio. See docs/content-sources.md.\nimport type {UniverseMeta, ProjectItem, AiLabExperiment, ResearchRecordItem, TopologyNode, CosmicMilestone, AboutDossier, BeyondData} from '../types/universe';\n\n"+exports.map(([name,type,value])=>`export const ${name}: ${type} = ${JSON.stringify(value,null,2)};`).join('\n\n')+'\n');
fs.writeFileSync('output/verified-portfolio-projects.json',JSON.stringify(originals,null,2));
console.log(`Imported ${projects.length} projects, ${nodes.length} skills, ${milestones.length} milestones.`);
