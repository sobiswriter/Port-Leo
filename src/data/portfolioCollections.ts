import {AI_LAB_EXPERIMENTS, PROJECTS_DATA} from './portfolioData';
// Each project has one home. The owner's featured writing project stays in Projects.
export const AI_STUDIES = AI_LAB_EXPERIMENTS.filter(study => study.id !== 'the-shadow-diary');
const aiProjectIds = new Set(AI_STUDIES.flatMap(study => study.relatedProjects));
const featuredOrder = ['right-left', 'wassap', 'wat-ewrite', 'the-shadow-diary'];
export const BUILD_PROJECTS = PROJECTS_DATA.filter(project => !aiProjectIds.has(project.id)).sort((a, b) => {
  const rank = (id: string) => featuredOrder.includes(id) ? featuredOrder.indexOf(id) : featuredOrder.length;
  return rank(a.id) - rank(b.id);
});
