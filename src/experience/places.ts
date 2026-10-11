import type { UniverseId } from '../types/universe';
export const places: { id: UniverseId; name: string; worldName: string; subtitle: string; color: string }[] = [
  { id: 'arrival', name: 'Overview', worldName: 'The threshold', subtitle: 'Souradip Biswas · AI/ML developer, full stack engineer, and agency owner.', color: '#c8bda9' },
  { id: 'builder', name: 'Projects', worldName: 'The workshop', subtitle: 'Applied AI, web applications, desktop software, and creative tools.', color: '#b6bfea' },
  { id: 'ai-lab', name: 'AI & Experiments', worldName: 'The observatory', subtitle: 'Document intelligence, generative AI, and behavior-aware interfaces.', color: '#cbb0f6' },
  { id: 'research', name: 'Research & Publications', worldName: 'The archive', subtitle: 'Research interests, patent publication, and conference participation.', color: '#b7cbef' },
  { id: 'arsenal', name: 'Technical Skills', worldName: 'The tool room', subtitle: 'Languages, AI tools, application development, and automation.', color: '#b5d9bb' },
  { id: 'journey', name: 'Experience & Recognition', worldName: 'The long way here', subtitle: 'Collaborations, programs, achievements, and learning milestones.', color: '#d2bde9' },
  { id: 'about', name: 'About Me', worldName: 'The quiet room', subtitle: 'The person, interests, and approach behind the work.', color: '#e3bf8d' },
  { id: 'beyond', name: 'Contact & Résumé', worldName: 'The open road', subtitle: 'Get in touch, find professional profiles, and access the résumé.', color: '#a8dadd' },
];
export interface RoomProps { onTravelTo: (id: UniverseId | 'universe') => void }
