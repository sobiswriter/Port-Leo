# Project memory

## 2026-10-10 — reset and new direction
The owner rejected the previous layouts: scattered dots and dashboard-like interfaces did not feel like an experience or a place. They restored the legacy checkout. The backgrounds and their variations are the parts they want retained.

Approved scope: rebuild the local experience, propose creative direction, and create the missing reference documents. The working concept is “An atlas of a restless mind.”

Baseline: eight React universe views, shared portfolio data, eight WebGL backgrounds, and hash navigation. The prior inspection found generic portfolio/profile URLs across project records and no backend. The local npm launcher failed, but direct TypeScript and Vite invocations worked.

The old UI Redesign.txt is historical context. The owner's current request and these updated documents guide this pass.

## Implementation completed in this pass
- Replaced all eight legacy room layouts with the atlas direction; retained every existing background engine unchanged.
- Extracted the original palette/preset definitions into src/experience/presets.ts. Atmosphere controls expose those palettes, wave/slat presets, and Arsenal pixel shapes.
- Added a persistent atlas dialog, browser-hash navigation, visited-place indicators, lazy room/background imports, and a still-mode control respecting reduced-motion preference.
- Added project search and two-page folios, experiment parameter illustrations, expandable archive records, tool selection and relationships, a scrolling milestone path, a personal journal, and a native email-draft composer.
- Preserved supplied content; project links are labeled as Sobi’s GitHub profile rather than pretending to be individual repositories. Contact does not claim delivery.

## Verification
- Direct TypeScript check and Vite production build pass.
- Browser walkthrough covered all eight rooms; no JavaScript errors observed.
- Checked all eight at 390px viewport width with no horizontal document overflow.
- Exercised project search/selection/pages, lab parameter output, archive expansion, tool selection, atlas navigation, browser back/forward, atmosphere switching, still-mode canvas removal, and letter-dialog fields/Escape. No email was sent or draft handoff launched during testing.
- Kept the existing server on port 3000; it serves the new source. The temporary port 3001 test server is shut down at handoff.
- Main JS entry is about 230 kB minified. The deferred Three.js-related chunk remains about 691 kB and triggers Vite’s size advisory. This is not a measured frame-rate/performance audit.

## Remaining product decisions
The owner should judge this visual direction in motion. Project-specific links and factual portfolio claims still need owner verification before a public release. No hosting, Git commit, or external publication was performed.

## Random atmospheres
Each initial page load starts with random presets. Every navigation (including browser history and selecting the current room again) picks a different preset from that room’s last selection during the current app session. Manual selections become the previous preset to exclude on the next visit. Arsenal also randomizes its pixel shape. Still mode remains respected; reloading starts a fresh random session.
