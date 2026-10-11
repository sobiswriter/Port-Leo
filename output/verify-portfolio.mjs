import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PROJECTS_DATA, TOPOLOGY_NODES, AI_LAB_EXPERIMENTS, UNIVERSES_META, BEYOND_DATA} from '../src/data/portfolioData.ts';
import {places} from '../src/experience/places.ts';
import {RESUME_DOCUMENT} from '../src/data/resume.ts';
const originals = JSON.parse(fs.readFileSync('output/verified-portfolio-projects.json','utf8'));
assert.equal(PROJECTS_DATA.length, 19);
assert.equal(new Set(PROJECTS_DATA.map(p=>p.id)).size, 19);
for (const source of originals) {
  const project = PROJECTS_DATA.find(p=>p.title===source.title);
  assert.ok(project, source.title);
  assert.equal(project.tagline, source.desc);
  assert.equal(project.problem, source.summary);
  assert.equal(project.architecture[0], source.details);
  assert.deepEqual(project.stack, source.stack);
  assert.equal(project.githubUrl, source.github);
  assert.equal(project.liveUrl, source.demo);
}
const projectIds = new Set(PROJECTS_DATA.map(p=>p.id));
const skillIds = new Set(TOPOLOGY_NODES.map(p=>p.id));
for (const skill of TOPOLOGY_NODES) {
  skill.relatedProjects.forEach(id=>assert.ok(projectIds.has(id), id));
  skill.connectedNodes.forEach(id=>assert.ok(skillIds.has(id), id));
}
AI_LAB_EXPERIMENTS.forEach(e=>e.relatedProjects.forEach(id=>assert.ok(projectIds.has(id),id)));
assert.equal(BEYOND_DATA.email,'souradip.biswas23@lpu.in');
assert.equal(RESUME_DOCUMENT.url, null);
assert.equal(UNIVERSES_META.length,8);
for (const place of places) {
  assert.equal(UNIVERSES_META.find(p=>p.id===place.id).name,place.name);
  const source = fs.readFileSync(`src/universes/${place.id}/${({arrival:'Arrival',builder:'Builder','ai-lab':'AiLab',research:'Research',arsenal:'Arsenal',journey:'Journey',about:'About',beyond:'Beyond'})[place.id]}Universe.tsx`,'utf8');
  assert.equal((source.match(/<RoomIdentity /g)||[]).length,1,place.id);
}
console.log('Verified all 19 source project descriptions/stacks/URLs, skill and AI project references, 8 hero identities, contact email and résumé placeholder.');
