import type { UniverseId } from '../types/universe';
export const places: { id: UniverseId; name: string; subtitle: string; color: string }[] = [
  { id: 'arrival', name: 'The threshold', subtitle: 'Every world begins with curiosity.', color: '#c8bda9' },
  { id: 'builder', name: 'The workshop', subtitle: 'Ideas, made tangible.', color: '#b6bfea' },
  { id: 'ai-lab', name: 'The observatory', subtitle: 'What happens when machines remember?', color: '#cbb0f6' },
  { id: 'research', name: 'The archive', subtitle: 'Questions worth staying with.', color: '#b7cbef' },
  { id: 'arsenal', name: 'The tool room', subtitle: 'The instruments behind the work.', color: '#b5d9bb' },
  { id: 'journey', name: 'The long way here', subtitle: 'A life in moments of becoming.', color: '#d2bde9' },
  { id: 'about', name: 'The quiet room', subtitle: 'A person behind the possibilities.', color: '#e3bf8d' },
  { id: 'beyond', name: 'The open road', subtitle: 'The next chapter could be ours.', color: '#a8dadd' },
];
export interface RoomProps { onTravelTo: (id: UniverseId | 'universe') => void }
