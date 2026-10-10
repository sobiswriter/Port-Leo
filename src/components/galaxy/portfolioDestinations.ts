import { places } from '../../experience/places';
import type { DestinationConfig } from './types';

// The actual portfolio rooms are the stars; no duplicate content or invented metrics.
export const PORTFOLIO_DESTINATIONS: DestinationConfig[] = places.map((place, index) => ({
  id: place.id,
  name: place.name,
  subtitle: place.subtitle,
  sectorCode: String(index).padStart(2, '0'),
  route: place.id,
  armIndex: index % 2,
  progress: [0.32, 0.38, 0.54, 0.60, 0.74, 0.80, 0.94, 0.98][index],
  position: [0, 0, 0],
  color: place.color,
  accentColor: place.color,
  clusterRadius: 0.6,
  clusterParticleCount: 30,
  description: place.subtitle,
  stats: [],
  tags: [],
}));

