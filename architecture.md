# Architecture

React 19, TypeScript, Vite and authored CSS with Tailwind available. This is a static application; no backend or inference credentials are required.

- `src/App.tsx`: hash history, cached room loading, loading screen, galaxy journeys, still mode, atmosphere controls and keyboard navigation.
- `src/components/galaxy/`: Three.js star map, drag/zoom, professional destination directory, audio singleton and WebGL fallback. React landmark projections update at 30 Hz.
- `src/experience/`: shared navigation/environment infrastructure, scroll reveals, boundaries, cursor, project previews, PDF reader, profile card and article body.
- `src/universes/`: eight independently composed pages. Only the active page and atmosphere mount; the galaxy remains available for transitions but suspends when hidden.
- `src/data/portfolioData.ts`: owner-provided/source-reconciled records. `portfolioCollections.ts` gives Projects and AI studies distinct homes. `researchArticles.ts` contains editable draft prose separate from factual records.
- `public/documents`, `src/data/resume.ts`, `src/data/documentText.ts`: unchanged owner PDFs, document registry and selectable transcripts. PDF.js and its worker are lazy-loaded.
- `src/components/react-bits/`: retained animated engines. Preserve their variations and interaction; room-specific framing and controls belong in `src/experience`.
- `scripts/verify-portfolio.mjs`: reproducible content/asset integrity checks, without depending on local downloaded audit files.

Module promises share browser caching; idle warming respects constrained connections. There is no service worker or offline guarantee. A failed page chunk has a reload message while navigation remains available. WebGL-unavailable devices have a galaxy directory and a static profile card; failed backgrounds fall back to CSS. Motion-aware reveal logic never requires a fixed visible fraction of a long document.

Experiment responses are visibly illustrative. Contact uses mailto and never claims delivery. External previews are sandboxed, load near the viewport, and act as links. Known frame restrictions get a direct-link fallback.

Run `npm run lint`, `npm run verify`, and `npm run build` before pushing. See README.md for root/project-path hosting and docs/release-check.md for browser validation.
