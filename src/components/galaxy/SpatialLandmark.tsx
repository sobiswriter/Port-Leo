import React from 'react';
import { DestinationConfig, ProjectedDestination } from './types';
interface SpatialLandmarkProps {
  destination: DestinationConfig;
  projection: ProjectedDestination | undefined;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}
export const SpatialLandmark: React.FC<SpatialLandmarkProps> = ({destination, projection, isHovered, isSelected, onHover, onSelect}) => {
  if (!projection?.visible) return null;
  return <button className={`cosmic-landmark ${projection.distanceToCamera > 80 ? 'is-distant' : ''} ${projection.x > window.innerWidth - 150 ? 'label-left' : ''} ${isHovered || isSelected ? 'is-active' : ''}`} style={{left: projection.x, top: projection.y, '--star-color': destination.color} as React.CSSProperties} onMouseEnter={() => onHover(destination.id)} onMouseLeave={() => onHover(null)} onFocus={() => onHover(destination.id)} onBlur={() => onHover(null)} onClick={() => onSelect(destination.id)} aria-label={`Enter ${destination.name}`}>
    <span className="cosmic-star"><i/></span><span className="cosmic-star-label"><small>{destination.sectorCode} / WORLD</small><span>{destination.name}</span><em>{destination.subtitle}</em></span>
  </button>;
};
