import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PROJECTS_DATA,TOPOLOGY_NODES,AI_LAB_EXPERIMENTS,BEYOND_DATA} from '../src/data/portfolioData.ts';
import {DOCUMENT_TEXT} from '../src/data/documentText.ts';
import {PROFILE_BACKGROUND} from '../src/data/profileBackground.ts';
const originals=JSON.parse(fs.readFileSync('output/verified-portfolio-projects.json','utf8'));
assert.equal(PROJECTS_DATA.length,24);
assert.equal(new Set(PROJECTS_DATA.map(p=>p.id)).size,24);
const ids=new Set(PROJECTS_DATA.map(p=>p.id));
const skills=new Set(TOPOLOGY_NODES.map(p=>p.id));
for(const source of originals){assert.ok(PROJECTS_DATA.some(p=>p.title===source.title || (source.title.startsWith('RIGHT.LEFT') && p.id==='right-left') || (source.title==='Project AIC' && p.id==='project-aic')),source.title);}
TOPOLOGY_NODES.forEach(n=>{n.relatedProjects.forEach(id=>assert.ok(ids.has(id),id));n.connectedNodes.forEach(id=>assert.ok(skills.has(id),id));});
AI_LAB_EXPERIMENTS.forEach(n=>n.relatedProjects.forEach(id=>assert.ok(ids.has(id),id)));
assert.equal(BEYOND_DATA.email,'souradip073@gmail.com');
assert.equal(PROFILE_BACKGROUND.phoneUrl,'tel:+918787822581');
const agency=PROJECTS_DATA.find(p=>p.id==='right-left');
assert.equal(agency.title,'LaunchSILO Labs');assert.equal(agency.liveUrl,'https://launchsilo.in/');assert.equal(agency.githubUrl,'https://github.com/sobiswriter/RLBiz');
assert.equal(PROJECTS_DATA.find(p=>p.id==='wassap').liveUrl,'https://wassapyo.vercel.app/');
for(const [key,file] of [['cv','Souradip_Biswas_CV.pdf'],['resume','Souradip_Biswas_Resume.pdf'],['ats','Souradip_Biswas_Resume_ATS.pdf']]){assert.ok(fs.readFileSync('public/documents/'+file).subarray(0,4).toString()==='%PDF');assert.ok(DOCUMENT_TEXT[key].includes('souradip073@gmail.com'));}
assert.ok(!fs.readFileSync('src/data/portfolioData.ts','utf8').includes('rightleft.ai.studio'));
console.log('Verified all original records remain, 24 unique projects, valid skill/AI references, current contact, LaunchSILO/Wassap URLs, and three PDF/text documents.');