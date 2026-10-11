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

## Portfolio content and navigation refresh — 2026-10-11
- Reconciled sobi.codes with sobiswriter/Me-Protfolio src/app/page.js and its five-page consolidated portfolio PDF. Imported all 19 project descriptions, stacks and actual source/demo links; 18 skill entries, six AI project studies, six research/publication entries and nine recognition/program entries. Updated identity, professional overview, public email and LinkedIn. Removed unsupported generic project URLs, synthetic outcomes, unsourced dates and per-project job/status claims. Source provenance and editorial boundaries recorded in docs/content-sources.md. Source statements remain owner-reported; awards/patent details not independently certified.
- Added professional labels and descriptive subtitles to all eight heroes and home navigation while retaining creative world names in heroes/star cards. Hash routes unchanged. Professional names: Overview, Projects, AI & Experiments, Research & Publications, Technical Skills, Experience & Recognition, About Me, Contact & Résumé. Updated browser titles and SEO identity.
- Reserved a styled Résumé & CV section with an honest coming-soon state. src/data/resume.ts URL is null until the owner supplies the new PDF; public/documents/README.md documents how view/download actions activate. Did not reuse the old repository résumé.
- Increased organ-variation playback volume from 0.32 to 0.48, preserving autoplay fallback and mute. Cached room imports now preload their corresponding atmosphere, and background warming uses idle callbacks with save-data/2g protection. Hyperspeed cancels frames and releases held boost when the tab is hidden; resumes on return.
- Validation: npm run lint and production build pass. output/verify-portfolio.mjs matches all 19 source descriptions/stacks/URLs, checks skill/AI references, eight single hero identities, email and résumé placeholder. Browser checked Projects (including RIGHT.LEFT with no invented source link), Contact & Résumé, galaxy navigation and Experience & Recognition; mobile galaxy/contact have no horizontal overflow. No browser errors/warnings captured. Saved desktop home proof at output/galaxy/portfolio-content-refresh.png.
- Content chunk reduced from about 54 KB to 29 KB (gzip about 17.8 KB to 6.7 KB). Existing Three.js 555 KB chunk warning remains. No measured FPS audit or full external demo availability audit performed; updated CV still awaits owner upload. No publish or commit performed.

## Documents, Lanyard and current professional profile — 2026-10-11
- Registered the supplied unchanged CV, résumé and ATS résumé from public/documents. Contact now has document tabs, PDF.js canvas reading with page navigation, fit/zoom, clickable URI annotations, selectable full text, open and download links. Replaced the native iframe approach after browser QA showed a blank plugin viewer. PDF.js/worker and document text load separately from the main bundle.
- Installed pdfjs-dist 6.4.299. Aligned dev esbuild with Vite's required peer version (0.28.2) after npm reported a dependency resolution conflict. npm audit reports no vulnerabilities.
- Reconciled the newer PDFs into profile, skills, experience, education, training, awards and research. Current contact: souradip073@gmail.com and +91 8787822581. Added Bhudrishty, waterborne outbreak prediction, retail and medical client applications, and BisosChamber. Niva's identity is confirmed by Project AIC README. Current totals: 24 projects, nine AI studies, 37 skills, 13 milestones; all original project records retained.
- Replaced displayed RIGHT.LEFT agency identity with LaunchSILO Labs and launchsilo.in; retained right-left internal ID for references. RLBiz link is documented in the CV, though absent from the current public repository catalog. Added a Contact services invitation with a direct agency link, without importing the agency site's marketing performance metrics.
- Fetched the 63 current public GitHub repositories and relevant READMEs. Updated Wassap to wassapyo.vercel.app and confirmed Guru-Kripa-Jwellers/Main_Inviter sources; added BisosChamber's source/homepage. Removed legacy source URLs absent from the current public catalog rather than inventing replacements. Details in docs/content-sources.md; source downloads retained under output.
- Added supplied React Bits Lanyard source using existing Three.js and exact owner front/back images. About hero includes draggable physics, click/keyboard flip, hidden-tab suspension, and static flipping under paused/reduced motion. Mobile stacks card below intro. Source images are unchanged.
- Projects and AI studies show optional interactive live preview screens for projects with live URLs. Remote frames load on click and have direct-open fallback. Confirmed LaunchSILO embeds successfully. LegalLM deployment sends DENY/frame-ancestors none, so its preview tile opens externally; did not bypass embedding restrictions.
- Validation: npm run lint, npm run build, output/verify-portfolio.mjs and git diff --check pass. Browser verified front/back images, dragging, Enter flipping, paused static card, updated Contact links, all document selectors, CV page 2, PDF zoom/annotations, ATS text/download attribute, LaunchSILO iframe, and AI BisosChamber source/demo/preview. About/Contact tested at 390px without page horizontal overflow after fixing a mobile CSS specificity conflict. Saved proof output/galaxy/profile-lanyard.png.
- Limitations: Three.js shader precision warning appeared in this GPU/browser during card lighting compilation, without render errors. Three.js shared production chunk remains 582 KB; lazy PDF reader 433 KB and worker 1.26 MB. No FPS benchmark or full feature audit of every external deployment. Some repositories may be private/renamed and cannot be publicly confirmed. No publish or commit performed.

## Overview and Projects brightness — 2026-10-11
- Gently softened Overview PatternWaves opacity from 0.95 to 0.83 and Projects MicroSlats brightness from 1.2 to 1.04 (roughly 13% reduction). Applies across their background variants; text, controls and motion remain unchanged.
- Validation: npm run lint and git diff --check pass. No browser visual comparison performed for this small configuration adjustment.

## Project previews, focused collections and page-sized readers — 2026-10-11
- Live previews load automatically near the viewport, with a full-screen link overlay that opens the live site. Applied to Projects and AI studies; known blocked embeds retain direct-link fallback. No eager loading of every project's remote site.
- Added portfolioCollections.ts: 16 Projects and eight AI studies, with disjoint project IDs. LaunchSILO, Wassap, Wat-EWrite and The Shadow Diary lead Projects in that order. Shadow Diary stays in Projects as explicitly requested; its duplicate AI entry is excluded. All 24 underlying records and AI source records remain preserved.
- Project folios now show title, optional preview, then sourced overview and implementation paragraphs. Removed detail tabs and minimum body height, omitted empty lists, and kept contextual fields in compact disclosure. Collection shows about 15 rows before internal scrolling. Added four research summary articles/notes from existing records, including the patent publication, with links to Research & Publications; no invented publications or findings.
- Lanyard canvas spans the entire About page, with page-level ray picking so regular controls remain clickable. White 3D pin marks the strap anchor; mobile anchor follows its stacked card slot. Dragging outside the old card rectangle works. Capped pixel budget and tightened camera depth range after browser testing caught layered-face z-fighting on the larger canvas. Resizing rehangs the card. Reduced-motion/static fallback remains.
- PDF reader expands to the complete current page, including at zoom, rather than constraining it to a short internal vertical scroller. Browser measured desktop page 1306px / reader 1338px and mobile page 368px / reader 392px, with no internal vertical clipping or page horizontal overflow.
- Validation: TypeScript, production build, existing portfolio verifier and collection overlap/order checks pass. Browser checked automatic LaunchSILO preview, AI BisosChamber preview/link, four notebook articles, wide card drag, white pin, mobile About and Contact flow, PDF page sizing. Screenshots in output/playwright. External preview consoles report LaunchSILO API 401 and BisosChamber stylesheet 404; their page content still renders, and direct links remain. Existing favicon 404 and Three.js shader precision warning also observed. No full audit of all remote deployments; existing large Three.js bundle warning remains. No publish or commit.

## Plain live preview windows — 2026-10-11
- Removed the preview browser chrome, bezel/border, rounded frame, bottom note, gradient shade and visible Visit button from the shared Projects/AI preview. Site content fills the plain window; transparent accessible link overlay still opens the live site. Blocked embeds retain a minimal title/reason link, with source/live links below the project unchanged.
- Validation: npm run lint passes. Styling/component-only change; no new tests added.

## Research notebook article drafts — 2026-10-11
- Replaced sparse Research record interiors with six owner-authorized first-person editorial drafts: document intelligence, conversational personas/memory, generative writing, creative tooling, the recorded patent, and conference reflections. New src/data/researchArticles.ts separates editable prose from source records; each has an introduction, pull quote and three sections. ResearchArticleBody shares article rendering with the four AI notebook previews.
- Added article excerpts, calculated reading time, author and quiet working-draft labels. Warm paper, narrower reading measure, section typography, pull quotes and responsive author margin replace the minimal bullet layout. Existing source context and all six records remain accessible. Drafts express design interests and next questions; no invented benchmarks, patent methods, clinical results or event anecdotes.
- Validation: npm run lint, npm run build and git diff --check pass. Checked coverage of all six records, opened article in browser, and verified 390px layout without horizontal overflow (294px prose width). Desktop proof output/playwright/research-article-draft.png. Existing shared Three.js bundle warning and favicon 404 remain. No publish or commit.

## Final pre-push review — 2026-10-11
- Fixed reveal thresholds for tall content and exposed hidden reveals when still mode is enabled. Added room-load boundary and text-reader failure message; arrow shortcuts now respect role=button controls.
- Added unavailable/lost-WebGL fallbacks for Lanyard and galaxy; verified directory navigation and static card flipping with WebGL deliberately disabled. Capped PDF canvases at 6 MP, retained Lanyard budget, reduced React galaxy projections to 30 Hz, suspended Lightfall on hidden tabs and changed music preload to metadata. Added synchronized room-level music toggle and favicon/theme color.
- Long navigation QA exposed active WebGL context retention. Fixed cleanup in GlowCursor, Lightfall, Lanyard, Hyperspeed and galaxy with explicit context release; removed PixelBlast's deprecated Three.Clock. Tested all 37 atmosphere presets: 3 active contexts per page, 4 on About, returning to 1 at home; zero context-limit warnings, uncaught errors or galaxy fallback activations.
- Source/live checks: all 12 demo entry URLs returned 200; all public source URLs returned 200 except CV-supplied RLBiz (404). RLBiz remains recorded but its source link is withheld with an unavailable label. CosmicCanvas redirects to HTTP with unavailable HTTPS; uses a direct-link fallback. LegalLM resolves to Vercel login/frame blocking. External LaunchSILO API 401/occasional Firestore connectivity and prior BisosChamber CSS 404 are external deployment issues; did not modify remote apps.
- Added npm run verify in scripts/verify-portfolio.mjs, independent of downloaded output files. Added reusable Playwright CLI smoke/interactions/renderer scripts. npm clean uses a portable Node operation. Ignored newly generated output and browser artifacts, preserving tracked files. Updated README, architecture, design, plan, source/document guides and docs/release-check.md; no API credentials required.
- Final validation: TypeScript, verifier, production build, npm audit (0 vulnerabilities), git diff --check pass. Production browser checked all 8 routes at 1280/390px: correct identities, no horizontal overflow, no actually visible unrevealed sections, no uncaught application errors or failed local assets. Closed disclosures excluded from visibility scan. Interaction checks passed for project order/search/compact folio, auto/plain preview click, home/page travel/Back, research expansion, still mode, Hyperspeed hold/release, contact dialog/Escape, all PDF selectors/download attributes/CV page 2/full-page rendering/text. Final 390px sound controls play/mute correctly at .48 volume, with no overflow; source-unavailable and CosmicCanvas no-iframe fallback verified.
- Project-subpath build at /portfolio/ rendered PDF and resolved document/worker/favicon/cursor/audio URLs. Reduced-motion and no-WebGL paths tested. Shared Three.js ~582KB/146KB gzip warning remains; PDF reader/worker lazy-loaded. No fixed FPS promise, real Safari/iOS test or complete external feature audit. No commit, push or deployment performed.
