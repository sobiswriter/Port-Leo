import React, { useState, useEffect, useCallback } from 'react';
import { UniverseId } from './types/universe';
import { UNIVERSES_META } from './data/portfolioData';

// Individual Universe Containers
import { ArrivalUniverse } from './universes/arrival/ArrivalUniverse';
import { BuilderUniverse } from './universes/builder/BuilderUniverse';
import { AiLabUniverse } from './universes/ai-lab/AiLabUniverse';
import { ResearchUniverse } from './universes/research/ResearchUniverse';
import { ArsenalUniverse } from './universes/arsenal/ArsenalUniverse';
import { JourneyUniverse } from './universes/journey/JourneyUniverse';
import { AboutUniverse } from './universes/about/AboutUniverse';
import { BeyondUniverse } from './universes/beyond/BeyondUniverse';

// Multiverse Travel / Inspection HUD
import { MultiverseSwitcher } from './components/multiverse-switcher/MultiverseSwitcher';

export default function App() {
  // Determine initial universe from URL hash if present
  const getInitialUniverse = (): UniverseId => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const matched = UNIVERSES_META.find((u) => u.hash === hash || u.id === hash);
    return matched ? matched.id : 'arrival';
  };

  const [activeUniverse, setActiveUniverse] = useState<UniverseId>(getInitialUniverse);

  // Sync hash changes (e.g. browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const matched = UNIVERSES_META.find((u) => u.hash === hash || u.id === hash);
      if (matched && matched.id !== activeUniverse) {
        setActiveUniverse(matched.id);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeUniverse]);

  // Handle travel between universes
  const handleSelectUniverse = useCallback((universeId: UniverseId) => {
    setActiveUniverse(universeId);
    window.location.hash = universeId;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Render the selected standalone universe container
  const renderCurrentUniverse = () => {
    switch (activeUniverse) {
      case 'arrival':
        return <ArrivalUniverse onTravelTo={handleSelectUniverse} />;
      case 'builder':
        return <BuilderUniverse onTravelTo={handleSelectUniverse} />;
      case 'ai-lab':
        return <AiLabUniverse onTravelTo={handleSelectUniverse} />;
      case 'research':
        return <ResearchUniverse onTravelTo={handleSelectUniverse} />;
      case 'arsenal':
        return <ArsenalUniverse onTravelTo={handleSelectUniverse} />;
      case 'journey':
        return <JourneyUniverse onTravelTo={handleSelectUniverse} />;
      case 'about':
        return <AboutUniverse onTravelTo={handleSelectUniverse} />;
      case 'beyond':
        return <BeyondUniverse onTravelTo={handleSelectUniverse} />;
      default:
        return <ArrivalUniverse onTravelTo={handleSelectUniverse} />;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-neutral-950 font-sans text-neutral-100 pb-20">
      {/* Standalone Universe Viewport Container */}
      <div id={`universe-${activeUniverse}`} className="w-full min-h-screen">
        {renderCurrentUniverse()}
      </div>

      {/* Multiverse Travel & Inspection Layer */}
      <MultiverseSwitcher
        currentUniverseId={activeUniverse}
        onSelectUniverse={handleSelectUniverse}
      />
    </div>
  );
}
