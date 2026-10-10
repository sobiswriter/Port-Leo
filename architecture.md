# Architecture

React + TypeScript + Vite; Tailwind remains available alongside authored experience CSS.

- `src/App.tsx`: hash navigation, lazy room loading, global atlas, motion preference, atmosphere controls.
- `src/experience/`: shared low-level environment and navigation components, room metadata, and styling.
- `src/universes/`: independent compositions for the eight destinations.
- `src/components/react-bits/`: retained background engines. Avoid changing shaders during layout work.
- `src/data/portfolioData.ts`: supplied portfolio records; these are owner-provided content, not independently verified evidence.
- `src/types/universe.ts`: shared domain types.

Only the active room and its background mount. Background imports are lazy to avoid loading every renderer at the entry point. Still mode provides a CSS atmosphere instead of a running canvas. The atlas uses a native modal dialog for focus containment and Escape handling.

No backend, database, or real inference endpoint is needed for this portfolio. Experiment evaluations are preset illustrations. Contact uses mailto and must describe the handoff accurately.

Validation: invoke `node node_modules/typescript/bin/tsc --noEmit` and `node node_modules/vite/bin/vite.js build` if the host npm launcher remains broken.
