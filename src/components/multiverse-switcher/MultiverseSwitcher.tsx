import React, { useState, useEffect } from 'react';
import { UniverseId, UniverseMeta } from '../../types/universe';
import { UNIVERSES_META } from '../../data/portfolioData';
import { ChevronLeft, ChevronRight, Eye, EyeOff, Layers, Sparkles } from 'lucide-react';

interface MultiverseSwitcherProps {
  currentUniverseId: UniverseId;
  onSelectUniverse: (id: UniverseId) => void;
}

export const MultiverseSwitcher: React.FC<MultiverseSwitcherProps> = ({
  currentUniverseId,
  onSelectUniverse,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const currentIndex = UNIVERSES_META.findIndex((u) => u.id === currentUniverseId);
  const currentMeta: UniverseMeta = UNIVERSES_META[currentIndex] || UNIVERSES_META[0];

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + UNIVERSES_META.length) % UNIVERSES_META.length;
    onSelectUniverse(UNIVERSES_META[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % UNIVERSES_META.length;
    onSelectUniverse(UNIVERSES_META[nextIdx].id);
  };

  // Keyboard navigation [0-7] and Arrow Left/Right
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing into input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return;
      }

      if (e.key >= '0' && e.key <= '7') {
        const idx = parseInt(e.key, 10);
        if (idx >= 0 && idx < UNIVERSES_META.length) {
          onSelectUniverse(UNIVERSES_META[idx].id);
        }
      } else if (e.key === 'ArrowLeft' || e.key === '[') {
        handlePrev();
      } else if (e.key === 'ArrowRight' || e.key === ']') {
        handleNext();
      } else if (e.key.toLowerCase() === 'h') {
        setIsCollapsed((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onSelectUniverse]);

  if (isCollapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center gap-2 px-3 py-2 text-xs font-mono bg-neutral-900/90 text-neutral-200 hover:text-white border border-neutral-700 rounded-full shadow-lg backdrop-blur-md transition-all hover:bg-neutral-800"
          title="Open Multiverse Switcher (or press H)"
        >
          <Layers className="w-3.5 h-3.5 text-neutral-400" />
          <span>Stage {currentMeta.indexStr}: {currentMeta.name}</span>
          <span className="text-neutral-500">· [H] Expand</span>
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Multiverse Inspector Travel HUD"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl bg-neutral-900/95 text-neutral-100 border border-neutral-700/80 rounded-xl shadow-2xl backdrop-blur-md px-3 sm:px-4 py-2.5 transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        {/* Active Status & Steppers */}
        <div className="flex items-center justify-between sm:justify-start gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              title="Previous Universe (←)"
              className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-neutral-200">
              [{currentMeta.indexStr} {currentMeta.name.toUpperCase()}]
            </span>
            <button
              onClick={handleNext}
              title="Next Universe (→)"
              className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <span className="text-neutral-500 hidden md:inline">· {currentMeta.concept}</span>

          <button
            onClick={() => setIsCollapsed(true)}
            className="sm:hidden p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white"
            title="Minimize HUD"
          >
            <EyeOff className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 8 Universe Selectors */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {UNIVERSES_META.map((meta, idx) => {
            const isSelected = meta.id === currentUniverseId;
            return (
              <button
                key={meta.id}
                onClick={() => onSelectUniverse(meta.id)}
                className={`px-2 sm:px-2.5 py-1 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-neutral-100 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                }`}
                title={`Switch to ${meta.name} (Key: ${idx})`}
              >
                <span className="opacity-60">{meta.indexStr}</span>{' '}
                <span>{meta.name}</span>
              </button>
            );
          })}
        </div>

        {/* Keyboard hint & collapse toggle */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-500 pl-2 border-l border-neutral-800">
          <span className="hidden lg:inline text-[11px] text-neutral-400">Keys [0-7]</span>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors"
            title="Hide HUD [H]"
          >
            <EyeOff className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
