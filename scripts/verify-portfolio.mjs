import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PROJECTS_DATA,TOPOLOGY_NODES,AI_LAB_EXPERIMENTS,BEYOND_DATA,RESEARCH_RECORDS} from '../src/data/portfolioData.ts';
import {BUILD_PROJECTS,AI_STUDIES} from '../src/data/portfolioCollections.ts';
import {RESEARCH_ARTICLES} from '../src/data/researchArticles.ts';
import {DOCUMENT_TEXT} from '../src/data/documentText.ts';
import {PROFILE_BACKGROUND} from '../src/data/profileBackground.ts';
import {places} from '../src/experience/places.ts';
const unique = (items, label) => assert.equal(new Set(items.map(x=>x.id)).size,items.length,`${label}: duplicate IDs`);
unique(PROJECTS_DATA,'Projects'); unique(TOPOLOGY_NODES,'Skills'); unique(RESEARCH_RECORDS,'Research'); unique(places,'Routes');
assert.equal(places.length,8);
const ids=new Set(PROJECTS_DATA.map(p=>p.id));
const originals=['legallm','project-aic','right-left','wassap','equity-echo','shri-guru-kirpa','sonar-thali','wat-ewrite','gdc-diagnostic','devineclub','cosmic-canvas','the-shadow-diary','personaverse','ai-overlay','inviter','business-venture-app','cosmos-anomaly','timeline-twist-v2','ps-utility-suite'];
for(const id of originals) assert.ok(ids.has(id),`Missing original project ${id}`);
const skills=new Set(TOPOLOGY_NODES.map(p=>p.id));
TOPOLOGY_NODES.forEach(n=>{n.relatedProjects.forEach(id=>assert.ok(ids.has(id),id));n.connectedNodes.forEach(id=>assert.ok(skills.has(id),id));});
AI_LAB_EXPERIMENTS.forEach(n=>n.relatedProjects.forEach(id=>assert.ok(ids.has(id),id)));
const aiIds=new Set(AI_STUDIES.flatMap(x=>x.relatedProjects));
assert.ok(!BUILD_PROJECTS.some(x=>aiIds.has(x.id)),'Projects/AI collection overlap');
assert.equal(new Set([...BUILD_PROJECTS.map(x=>x.id),...aiIds]).size,PROJECTS_DATA.length,'A project is inaccessible in its collection');
assert.deepEqual(BUILD_PROJECTS.slice(0,4).map(x=>x.id),['right-left','wassap','wat-ewrite','the-shadow-diary']);
for(const record of RESEARCH_RECORDS){const article=RESEARCH_ARTICLES[record.id];assert.ok(article?.introduction && article.pullQuote,record.id);assert.ok(article.sections.length>=3,record.id);}
assert.equal(BEYOND_DATA.email,'souradip073@gmail.com');
assert.equal(PROFILE_BACKGROUND.phoneUrl,'tel:+918787822581');
assert.equal(PROJECTS_DATA.find(x=>x.id==='right-left').liveUrl,'https://launchsilo.in/');
for(const p of PROJECTS_DATA){assert.ok(p.problem.trim(),`Missing description: ${p.id}`);for(const url of [p.liveUrl,p.githubUrl].filter(Boolean))assert.equal(new URL(url).protocol,'https:',url);}
for(const [key,file] of [['cv','Souradip_Biswas_CV.pdf'],['resume','Souradip_Biswas_Resume.pdf'],['ats','Souradip_Biswas_Resume_ATS.pdf']]){assert.equal(fs.readFileSync('public/documents/'+file).subarray(0,4).toString(),'%PDF');assert.ok(DOCUMENT_TEXT[key].includes(BEYOND_DATA.email));}
for(const file of ['public/audio/organ-variation.mp3','public/images/Profile card front.png','public/images/Profile card back.png','public/favicon.svg'])assert.ok(fs.statSync(file).size>0,file);
console.log(`Verified ${PROJECTS_DATA.length} projects, ${AI_STUDIES.length} distinct AI studies, ${RESEARCH_RECORDS.length} article drafts, eight routes, references and required assets.`);
