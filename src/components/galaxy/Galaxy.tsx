import React, { useState, useCallback, useEffect } from 'react';
import { GALAXY_DESTINATIONS } from './destinations';
import { GalaxyCanvas } from './GalaxyCanvas';
import { CosmicHud } from './CosmicHud';
import { DestinationView } from './DestinationView';
import { cosmicAudio } from './audio';
import { GalaxyProps } from './types';
import './galaxy.css';

export const Galaxy: React.FC<GalaxyProps> = ({
  destinations = GALAXY_DESTINATIONS,
  onDestinationSelect,
  onReturnHome,
  className = '',
  initialMuted = true,
  onDestinationEnter,
  manageHistory = true,
  reducedMotion = false,
  enabled = true,
  journey,
  onHomeEnter,
  onReady,
  onDestinationIntent,
}) => {
  const [activeDestinationId, setActiveDestinationId] = useState<string | null>(() =>
    manageHistory ? destinations.find(d => `#${d.route}` === window.location.hash)?.id ?? null : null
  );
  const [hoveredDestinationId, setHoveredDestinationId] = useState<string | null>(null);
  const [isTraveling, setIsTraveling] = useState<boolean>(Boolean(activeDestinationId));
  const [showDestinationOverlay, setShowDestinationOverlay] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(initialMuted);
  const [zoomCommand, setZoomCommand] = useState<{ action: 'in' | 'out' | 'reset' | 'focus'; target?: string; sequence: number }>({action: 'reset', sequence: 0});
  const [distance, setDistance] = useState(29);

  // Handle destination selection & travel trigger
  const handleDestinationSelect = useCallback(
    (id: string) => {
      if (isTraveling || activeDestinationId === id) return;

      const dest = destinations.find((d) => d.id === id);
      if (!dest) return;

      setIsTraveling(true);
      setShowDestinationOverlay(false);
      setActiveDestinationId(id);

      // Audio cue
      cosmicAudio.playTravelWhoosh();

      // Update URL hash route
      if (manageHistory) window.history.pushState({ destinationId: id }, '', `#${dest.route}`);

      // Optional user callback
      onDestinationSelect?.(dest);
    },
    [isTraveling, activeDestinationId, destinations, onDestinationSelect, manageHistory]
  );

  // Handle destination hover
  const handleDestinationHover = useCallback(
    (id: string | null) => {
      setHoveredDestinationId(id);
      if (id) {
        const dest = destinations.find((d) => d.id === id);
        if (dest) {
          cosmicAudio.playHoverChime(dest.color);
        }
      }
    },
    [destinations]
  );

  // Handle travel completion
  const handleTravelComplete = useCallback((destId: string) => {
    setIsTraveling(false);
    const destination = destinations.find(d => d.id === destId);
    if (destination && onDestinationEnter) onDestinationEnter(destination);
    else setShowDestinationOverlay(true);
  }, [destinations, onDestinationEnter]);

  // Handle returning back to home galaxy
  const handleReturnHome = useCallback(() => {
    if (isTraveling && !activeDestinationId) return;

    setIsTraveling(true);
    setShowDestinationOverlay(false);
    setActiveDestinationId(null);

    // Audio cue
    cosmicAudio.playTravelWhoosh();

    // Reset URL
    if (manageHistory) window.history.pushState(null, '', '#/');

    // Optional user callback
    onReturnHome?.();
  }, [isTraveling, activeDestinationId, onReturnHome, manageHistory]);

  // Handle return home complete
  const handleReturnHomeComplete = useCallback(() => {
    setIsTraveling(false);
    setShowDestinationOverlay(false);
    onHomeEnter?.();
  }, [onHomeEnter]);

  useEffect(() => {
    if (!journey) return;
    setActiveDestinationId(journey.to);
    setHoveredDestinationId(null);
    setIsTraveling(true);
    setShowDestinationOverlay(false);
    cosmicAudio.playTravelWhoosh();
  }, [journey]);

  const selectDestination = useCallback((id: string) => {
    const destination = destinations.find(d => d.id === id);
    if (destination && onDestinationIntent) onDestinationIntent(destination);
    else handleDestinationSelect(id);
  }, [destinations, onDestinationIntent, handleDestinationSelect]);
  const zoom = useCallback((action: 'in' | 'out' | 'reset' | 'focus', target?: string) => setZoomCommand(previous => ({action, target, sequence: previous.sequence + 1})), []);

  // Audio mute toggle
  const handleToggleMute = useCallback(() => {
    const muted = cosmicAudio.toggleMute();
    setIsMuted(muted);
  }, []);

  // Handle browser back / forward navigation
  useEffect(() => {
    if (!manageHistory) return;
    const handlePopState = () => {
      const dest = destinations.find(d => `#${d.route}` === window.location.hash);
      setShowDestinationOverlay(false);
      setActiveDestinationId(dest?.id ?? null);
      setIsTraveling(Boolean(dest || activeDestinationId));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [destinations, manageHistory, activeDestinationId]);

  useEffect(() => {
    if (cosmicAudio.getIsMuted() !== initialMuted) cosmicAudio.toggleMute();
    return () => { if (!cosmicAudio.getIsMuted()) cosmicAudio.toggleMute(); };
  }, [initialMuted]);

  const activeDestination = destinations.find((d) => d.id === activeDestinationId);

  return (
    <div className={`cosmic-galaxy relative w-full h-full overflow-hidden bg-[#030307] ${className}`}>
      {/* 3D Interactive Galaxy Canvas & Spatial Landmarks */}
      <GalaxyCanvas
        destinations={destinations}
        activeDestinationId={activeDestinationId}
        hoveredDestinationId={hoveredDestinationId}
        isTraveling={isTraveling}
        onDestinationSelect={selectDestination}
        onDestinationHover={handleDestinationHover}
        onTravelComplete={handleTravelComplete}
        onReturnHomeComplete={handleReturnHomeComplete}
        reducedMotion={reducedMotion}
        enabled={enabled}
        journey={journey}
        zoomCommand={zoomCommand}
        onDistanceChange={setDistance}
        onReady={onReady}
      />

      {/* Cosmic HUD Interface */}
      <CosmicHud
        destinations={destinations}
        activeDestinationId={activeDestinationId}
        hoveredDestinationId={hoveredDestinationId}
        isTraveling={isTraveling}
        isMuted={isMuted}
        onDestinationSelect={selectDestination}
        onDestinationHover={handleDestinationHover}
        onReturnHome={handleReturnHome}
        onToggleMute={handleToggleMute}
        onZoom={zoom}
        distance={distance}
      />

      {/* Traveled Destination Overlay View */}
      {showDestinationOverlay && activeDestination && (
        <DestinationView
          destination={activeDestination}
          onReturnHome={handleReturnHome}
        />
      )}
    </div>
  );
};

export default Galaxy;

