import React, { useState, useEffect } from 'react';
import { UniverseId, UniverseMeta } from '../../types/universe';
import { UNIVERSES_META } from '../../data/portfolioData';
import { Compass, ChevronLeft, ChevronRight, X, ArrowUpRight } from 'lucide-react';

interface MultiverseSwitcherProps {
  currentUniverseId: UniverseId;
  onSelectUniverse: (id: UniverseId) => void;
}

export const MultiverseSwitcher: React.FC<MultiverseSwitcherProps> = ({
  currentUniverseId,
  onSelectUniverse,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        return;
      }

      if (e.key >= '0' && e.key <= '7') {
        const idx = parseInt(e.key, 10);
        if (idx >= 0 && idx < UNIVERSES_META.length) {
          onSelectUniverse(UNIVERSES_META[idx].id);
          setIsOpen(false);
        }
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key.toLowerCase() === 'u') {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onSelectUniverse]);

  return (
    <>
      {/* ====================================================================
          MINIMAL SUBORDINATE UNIVERSE INDEX TRIGGER (Bottom Right)
          ==================================================================== */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80 rounded-full px-2 py-1.5 shadow-2xl text-xs font-mono text-neutral-300">
        <button
          onClick={handlePrev}
          title="Previous Universe (←)"
          className="p-1 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 px-2.5 py-1 hover:bg-neutral-800/80 rounded-full transition-colors group"
          title="Toggle Universe Index Directory (Key: U)"
        >
          <Compass className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
          <span className="font-semibold text-neutral-200">
            {currentMeta.indexStr} {currentMeta.name.toUpperCase()}
          </span>
          <span className="text-[10px] text-neutral-500 hidden sm:inline">
            · Index
          </span>
        </button>

        <button
          onClick={handleNext}
          title="Next Universe (→)"
          className="p-1 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ====================================================================
          COMPACT UNIVERSE INDEX DIRECTORY (Opens on demand)
          ==================================================================== */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md bg-neutral-950/95 border border-neutral-800 rounded-xl p-5 shadow-2xl text-neutral-100 space-y-4 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-neutral-300" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-200">
                  Multiverse Directory
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              {UNIVERSES_META.map((meta, idx) => {
                const isSelected = meta.id === currentUniverseId;
                return (
                  <button
                    key={meta.id}
                    onClick={() => {
                      onSelectUniverse(meta.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-neutral-100 text-neutral-950 font-bold shadow-sm'
                        : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isSelected ? 'text-neutral-950 font-bold' : 'text-neutral-500'}>
                        {meta.indexStr}
                      </span>
                      <div>
                        <div className="font-sans font-semibold text-sm">
                          {meta.name}
                        </div>
                        <div
                          className={`text-[10px] font-mono ${
                            isSelected ? 'text-neutral-700' : 'text-neutral-500'
                          }`}
                        >
                          {meta.concept}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded border ${
                          isSelected
                            ? 'border-neutral-950/30 text-neutral-800'
                            : 'border-neutral-800 text-neutral-500'
                        }`}
                      >
                        [{idx}]
                      </span>
                      <ArrowUpRight
                        className={`w-3.5 h-3.5 opacity-40 group-hover:opacity-100 ${
                          isSelected ? 'opacity-100' : ''
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>Press [0-7] to jump directly</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
