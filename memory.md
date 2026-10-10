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

## Galaxy motion and music correction — 2026-10-11
- Restored ambient spiral rotation and inward star flow. Camera orientation remains drag-controlled; the home pause and zoom buttons remain removed. Reduced-motion preference remains supported.
- Distributed 24 varied neighbouring galaxies over a sphere around the home galaxy, including behind the starting camera. Dragging now continues across overlaid landmarks and stops on release or window blur.
- Copied the owner's root `Organ Varition.mp3` to `public/audio/organ-variation.mp3`. The original remains intact. The track preloads during startup, loops at a moderate volume, and continues across page navigation. Removed the synthetic background drone; retained quiet hover/travel cues.
- Playback is attempted when the loading screen clears. Audible autoplay was blocked in the test browser; the first interaction started playback successfully. The existing Sound button reflects playback and manual mute remains respected on subsequent interactions.
- TypeScript and production build pass; the audio file is included in dist. Browser checks verified ambient landmark movement, neighbours from the opposite view, advancing music playback through archive navigation, and mute/unmute. No browser console errors observed. Vite still reports the existing Three.js chunk size advisory.

## Sky and background variants — 2026-10-11
- Expanded the universe star field to 6,800 points, improved small-star visibility and warm/cool colouring, and added eight restrained gas-cloud sprites using a shared procedural texture. Distant neighbours use Gaussian point halos and distance fading; the main galaxy remains sharp and animated. Environment textures are disposed on teardown.
- Increased Pattern Waves opacity and eased the first two rooms' dark overlays. Micro Slats receives a modest brightness lift while retaining each preset's original motion and lighting parameters.
- Added six Terminal configurations. Mint matches the supplied screenshot: #a7ef9e, scale 2.5, digit size 1.5, speed 1, noise 1, brightness 0.7, scanlines 1, curvature 0.1, mouse strength 0.8; mouse interaction and load animation enabled. Rose matches the second: #f43f5e, scale 1.6, speed 2.5, curvature 0.3, with the other supplied values retained. Added distinct amber, silver, cyan and violet variants.
- Integrated the owner's supplied new React Bits Hyperspeed JavaScript renderer behind a typed React boundary, replacing the previous renderer. Added six selectable curves/palettes with distinct density, trail length, pole height, dust, bloom and reflection settings. Holding the background boosts speed and trail stretch; controls and links do not trigger boost. Pointer listeners and GPU resources are cleaned up on exit.
- TypeScript and production build pass. Browser checks confirmed sky rendering, both supplied Terminal looks, all six Terminal and road preset selections, held-pointer boost, visible road poles/trails, and first-room visibility. No console errors observed. Existing Three.js chunk-size advisory remains; no measured FPS audit was performed.
- Final phone-width check confirmed the new Hyperspeed canvas fits the viewport; pausing removes it and resuming recreates it without console errors.

## Room openings, hold interaction and cursor — 2026-10-11
- Workshop, observatory and tool room now have viewport-height opening heroes and named scroll links. Archive, journey and quiet room use the same below-fold spacing while retaining their distinct layouts and existing reveal animations. The threshold and open road retain their layouts. Portfolio content is preserved.
- Hyperspeed listens for held pointer presses/releases in the capture phase, excludes interactive controls and open dialogs, and releases on cancellation/window blur. Mouse holds suppress text dragging. All six road presets use moderate 1.6–1.8x boosts, with a default FOV shift from 90 to 106 and the existing eased release.
- Integrated the supplied GlowCursor source in a lazy typed boundary. Room-only fixed overlay has no pointer hit area, a short soft trail, low simulation quality and capped pixel ratio. Unmounts during travel, still mode and for coarse pointers. The native cursor remains available if WebGL2/float buffers are unsupported. Home has a compact cream arrow without a trail, with normal link/button and drag feedback.
- Validation: TypeScript and production build pass (existing Three.js chunk-size advisory). Browser confirmed held boost true during a 3-second press and false after release; glow trail renders; workshop content begins below the viewport and scroll link reveals it. Quiet room verified at desktop and 390px width: content below fold, no horizontal overflow. Screenshot saved to output/galaxy/spacious-workshop.png. Initial component extraction mistakenly selected the usage block; corrected to the full source before final validation. No measured FPS audit or physical touch-device test performed.

## Owner cursor configuration — 2026-10-11
- Applied the exact supplied Comet controls to room GlowCursor: primary/cooling #5f8bff, intensity 0.75, trail width 1, linger 2 seconds, glow 0, hotspot 0.7, follow speed 0, grain 0, high quality, click burst enabled. Fine-pointer and motion-preference gating remains.
- Replaced the cream angular cursor with original rounded monochrome SVG cursors inspired by the owner's reference: outlined arrow with small accents, grey hover arrow with rings, black pressed arrow with rings. White outer edges keep them legible on dark backgrounds. Home has no glow trail. Text inputs retain the text cursor.
- TypeScript passes; all three 32px cursor SVGs parse as valid XML. No new dependencies.

## Native cursor correction — 2026-10-11
- Removed the three hand-drawn SVG cursor assets after owner feedback. The app now uses genuine platform-native arrow, link hand, text caret and grabbing cursors through standard CSS. This uses the user's actual cursor theme and native hotspots/scaling rather than reproducing the reference as an illustration. Blue Comet GlowCursor settings remain intact in room pages.
- Verified the stylesheet no longer references the removed cursor assets. This is a CSS-only cursor change; no JavaScript logic changed.

## Rounded stemless SVG cursor — 2026-10-11
- Owner clarified a sourced rounded SVG cursor without the usual arrow stem. Selected Lucide Mouse Pointer 2, using the exact path from the installed lucide-react 0.546.0 package rather than drawing from the screenshot. Added 28px light and blue hover variants with native 5,5 hotspots and rounded joins. Included the package license in public/cursors/LICENSE.txt.
- Applied to fine-pointer desktop surfaces and interactive controls. Galaxy inherits the compact cursor, and retains grabbing feedback during a drag. Text inputs retain caret cursors. Comet glow configuration unchanged.
- Both assets parse as valid SVG XML. No dependency changes.

## Faster held Hyperspeed — 2026-10-11
- Increased all six held boost multipliers from 1.6–1.8x to 2.4–2.8x. Default/neon multiplier is 2.6x. Boost engagement now uses a 0.22-second time constant instead of 0.28; smooth 0.85-second release remains. Increased boosted FOV from 106 to 114 for a stronger sense of travel. Normal cruising speeds remain unchanged.

## Stronger sensation of held speed — 2026-10-11
- Owner requested another modest increase: held boosts now 3.0–3.4x across presets (default/neon 3.2x), boosted FOV 120, engagement time constant 0.2 seconds. Increased held trail stretch from 1.1 to 1.4 to make passing lights convey speed more strongly. Smooth release and ordinary cruising parameters retained.
- TypeScript validation run for this configuration change; no interaction logic changes.

## Distinct Hyperspeed environments — 2026-10-11
- Reworked the six road presets around different spatial characters, rather than minor palette changes: narrow low neon canyon with 64 tall pillars; broad elevated amber hills with 16 cars; pole-free orbital dive with no road/reflection surface and 650 dust points; wide ground-level five-lane racing circuit with 90 cars; straight rose corridor with towering beacons and long trails; elevated sparse lavender drift with eight cars and four small poles.
- Added an eased cameraHeight prop (2–20 range), independent preset road/median widths, field of view, light sizes, lane counts, backgrounds, surface colouring, reflections and steering. Atmosphere now respects each preset's background instead of overriding it with a shared random palette. Strong held boost retained across all six variants.
- TypeScript and production build pass. Browser selected all six presets, confirmed selection controls work and each renders without console errors/warnings. Saved five representative screenshots in output/galaxy. No measured FPS audit performed.

## Deep preset replacement and names — 2026-10-11
- Replaced Orbital Dive with Deep using the owner's supplied screenshot: deep curve/curvature 1, speed 1, boost 3, FOV 90/130, 3 lanes, road width 18, median 2, density 50, trail length/light size 1, 50 poles, dust 100, glow 0.6, reflections 0.5, road opacity 0.1, steering 0.35, interactive enabled. Restored standard camera/pole height. Road #08080a and line #25252d; sampled reference swatches for tail #7c3aed/#3b82f6/#06b6d4/#5a40ff, headlights #2c34bc/#3b82f6 and black poles.
- Presets now have concise proper names in Atmosphere: Neon Canyon, Solar Ridge, Deep, Silver Circuit, Rose Corridor, Lavender Drift. Existing index/order retained.
- TypeScript passes; production build run for this preset update.

## Names across room configurations — 2026-10-11
- Applied short distinct Atmosphere names across the remaining rooms: threshold Silk Current/Contour Flow/Glyph Stream/Matrix Weave/Ocean Swell; workshop Velvet Swell/Signal Pulse/Tidal Glass/Storm Front; archive Celestial Rays/Quantum Prism/Aurora Veil/Solar Cascade; terminal Mint Phosphor/Rose Signal/Amber CRT/Silver Grid/Cyan Transmission/Violet Glass. Tool room's fourth configuration is Violet Ripple.
- Retained the observatory's existing Latent Manifold/Loss Surface/Neural Field/Deep Tensor and journey's Andromeda Core/Cygnus Rift/Supernova Amber/Pulsar Monochrome names. All eight rooms now expose concise named configurations; rendering parameters and ordering unchanged.
- TypeScript validation run. Labels-only change; no new tests added.
