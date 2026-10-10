import React, { useEffect, useRef, useState, useCallback } from 'react';
import { DestinationConfig, ProjectedDestination, GalaxyProps } from './types';
import { GalaxyEngine } from './GalaxyEngine';
import { SpatialLandmark } from './SpatialLandmark';

interface GalaxyCanvasProps {
  destinations: DestinationConfig[];
  activeDestinationId: string | null;
  hoveredDestinationId: string | null;
  isTraveling: boolean;
  onDestinationSelect: (id: string) => void;
  onDestinationHover: (id: string | null) => void;
  onTravelComplete: (id: string) => void;
  onReturnHomeComplete: () => void;
  reducedMotion: boolean;
  enabled: boolean;
  journey?: GalaxyProps['journey'];
  zoomCommand: { action: 'in' | 'out' | 'reset' | 'focus'; target?: string; sequence: number };
  onDistanceChange: (distance: number) => void;
  onReady?: () => void;
}

export const GalaxyCanvas: React.FC<GalaxyCanvasProps> = ({
  destinations,
  activeDestinationId,
  hoveredDestinationId,
  isTraveling,
  onDestinationSelect,
  onDestinationHover,
  onTravelComplete,
  onReturnHomeComplete,
  reducedMotion,
  enabled,
  journey,
  zoomCommand,
  onDistanceChange,
  onReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<GalaxyEngine | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [projections, setProjections] = useState<Map<string, ProjectedDestination>>(new Map());

  // Handle projected positions updates from Three.js render loop
  const handleProjectedPositionsUpdate = useCallback((list: ProjectedDestination[]) => {
    setProjections((prev) => {
      const next = new Map(prev);
      list.forEach((p) => next.set(p.id, p));
      return next;
    });
  }, []);

  // Initialize GalaxyEngine on mount
  useEffect(() => {
    if (!canvasRef.current) return;

    let engine: GalaxyEngine;
    try { engine = new GalaxyEngine({
      canvas: canvasRef.current,
      destinations,
      onProjectedPositionsUpdate: handleProjectedPositionsUpdate,
      onTravelComplete,
      onReturnHomeComplete,
      reducedMotion,
      onDistanceChange,
    }); } catch {
      setUnavailable(true);
      onReady?.();
      return;
    }

    engineRef.current = engine;
    onReady?.();

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [destinations, handleProjectedPositionsUpdate, onTravelComplete, onReturnHomeComplete, onDistanceChange, onReady]);

  useEffect(() => { engineRef.current?.setEnabled(enabled); }, [enabled]);
  useEffect(() => { engineRef.current?.setReducedMotion(reducedMotion); }, [reducedMotion]);
  useEffect(() => { if (zoomCommand.sequence) engineRef.current?.zoom(zoomCommand.action, zoomCommand.target); }, [zoomCommand]);
  useEffect(() => {
    if (!journey) return;
    if (unavailable) {
      if (journey.to) onTravelComplete(journey.to);
      else onReturnHomeComplete();
    } else engineRef.current?.startJourney(journey.from, journey.to);
  }, [journey, unavailable, onTravelComplete, onReturnHomeComplete]);

  // Sync hover state to engine
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setHoveredDestination(hoveredDestinationId);
    }
  }, [hoveredDestinationId]);

  // Trigger travel in engine when activeDestinationId changes
  useEffect(() => {
    if (journey) return;
    if (unavailable) {
      if (activeDestinationId) onTravelComplete(activeDestinationId);
      else onReturnHomeComplete();
      return;
    }
    if (!engineRef.current) return;

    if (activeDestinationId) {
      engineRef.current.travelToDestination(activeDestinationId);
    } else {
      engineRef.current.returnToHome();
    }
  }, [activeDestinationId, unavailable, onTravelComplete, onReturnHomeComplete, reducedMotion, journey]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#030307]">
      {unavailable && <p className="cosmic-fallback" role="status">The star map is unavailable on this device. Choose a world from the directory.</p>}
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none cursor-grab active:cursor-grabbing"
      />

      {/* Spatial 2D Landmarks Layer (hidden or dimmed when traveled into a destination) */}
      {!activeDestinationId && !isTraveling && <div className="absolute inset-0 pointer-events-none">
        {destinations.map((dest) => (
          <SpatialLandmark
            key={dest.id}
            destination={dest}
            projection={projections.get(dest.id)}
            isHovered={hoveredDestinationId === dest.id}
            isSelected={activeDestinationId === dest.id}
            onHover={onDestinationHover}
            onSelect={onDestinationSelect}
          />
        ))}
      </div>}
    </div>
  );
};

