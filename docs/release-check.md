# Release check — 11 October 2026

Ready for the owner to push, with the external and device limits below. No blocking portfolio issue was found in the completed checks.

## Local changes

- Fixed scroll reveals for very tall sections; a fixed visibility ratio could leave them invisible. Still mode now exposes previously unrevealed content.
- Added a page-load error boundary with reload and surviving navigation.
- Added static Lanyard fallback for unavailable/lost WebGL, and galaxy directory fallback after context loss. Keyboard shortcuts respect the profile card's button role.
- Capped PDF backing canvases at six million pixels at high zoom. Lanyard's page canvas retains its 4.5-million-pixel budget.
- Fixed WebGL context retention in GlowCursor, Lightfall, Lanyard, Hyperspeed and galaxy cleanup; dispose now releases the context as well as graphics objects. Removed deprecated Three.Clock use from PixelBlast.
- Limited galaxy landmark updates to 30 Hz without limiting the scene's browser frame loop. Lightfall explicitly suspends rendering in hidden tabs. Music preloads metadata rather than requesting the entire 10.2 MB track before startup.
- Added a music toggle to every room, using the shared audio state so visitors can mute without returning home.
- Added a favicon/theme color. Asset URLs were checked under a GitHub Pages-style project path.
- CosmicCanvas has a direct-link fallback because its supplied HTTPS URL redirects to HTTP. LaunchSILO's CV-supplied RLBiz source URL returned 404 publicly; its link is withheld and the collection labels the source unavailable, while preserving the source record for later correction.
- Added repeatable `npm run verify`, portable `npm run clean`, setup/content/deployment documentation, and ignored newly generated browser/audit artifacts.

## Verification

- `npm run lint`: pass.
- `npm run verify`: pass; 24 projects retained, 16 Projects/eight distinct AI entries, four featured positions, six article drafts, eight route IDs, reference integrity, current contact and required public assets.
- `npm run build`: pass.
- `npm audit`: zero reported vulnerabilities at review time.
- `git diff --check`: pass (Git may print normal LF/CRLF conversion warnings on Windows).
- Production Chromium: all eight direct routes checked at 1280px and 390px; headings and active route identity correct, no horizontal page overflow, no uncaught application errors or failed local assets.
- Interactions: collection search, short/no-preview folio (about 465px tall), first four positions, automatic plain iframe, clicking preview opens live site, home directory travel, page-to-page travel and Back, article expansion, still mode visibility, Hyperspeed held/released state, contact dialog/Escape.
- Final room controls at 390px: music plays/mutes at volume 0.48, no overflow; private-source label and CosmicCanvas no-iframe fallback verified.
- Documents: résumé, CV and ATS selection; canvas rendering, full-page reader height, CV page 2, selectable text, download attributes. No test submitted or sent an email.
- Renderer stress test after cleanup fixes: all 37 atmosphere presets rendered, active contexts stayed at three per page/four on About and returned to one at home, without context-limit warnings or uncaught errors.
- Reduced motion: static profile card and no running page background.
- No-WebGL test: usable galaxy directory, travel to About, static card flip. Expected renderer-construction messages can appear when WebGL is deliberately disabled.
- Repository subpath build `/portfolio/`: document, worker, favicon, cursor and music paths resolve; PDF rendered.

## External and performance limits

All 12 live-demo URLs responded with HTTP 200 during this review. This is an availability check, not a feature audit. LegalLM's response ends at a Vercel login with frame restrictions; CosmicCanvas redirects to HTTP and its HTTPS destination could not be reached. Both open separately. LaunchSILO's public page renders but its embedded site-content API responds 401. A previously observed BisosChamber stylesheet 404 belongs to that external deployment. Other publicly linked project repositories returned 200; RLBiz returned 404. These external deployments cannot be repaired from this portfolio repository.

Vite still reports the shared Three.js chunk at about 582 KB uncompressed / 146 KB gzip. The separately loaded PDF reader is about 433 KB / 130 KB gzip, with a 1.26 MB worker fetched on Contact. The supplied audio file is 10.2 MB. These sizes are recorded rather than hidden by increasing warning thresholds. Existing lazy loading, module reuse, pixel budgets, hidden-tab suspension and reduced motion remain in place.

This review does not guarantee a fixed frame rate on every device. It does not certify real Safari/iOS behavior, every external application's functionality, or offline operation; there is no service worker. Research essays remain working drafts. No GitHub push, commit or deployment was performed.

## Reproduce browser checks

Serve the production build with `node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4173`. With Playwright CLI installed:

```sh
npx --package @playwright/cli playwright-cli -s=release open http://127.0.0.1:4173/
npx --package @playwright/cli playwright-cli -s=release run-code --filename scripts/browser-smoke.js
npx --package @playwright/cli playwright-cli -s=release run-code --filename scripts/browser-interactions.js
npx --package @playwright/cli playwright-cli -s=release run-code --filename scripts/browser-renderers.js
```

Inspect the returned observations: correct route headings, no overflow, no visibly hidden revealed sections, no local asset failures and successful interaction flags. Closed disclosures are excluded from the visibility check. Browser-only output lives in ignored folders.

### Mobile galaxy follow-up
Mobile and coarse-pointer layouts use small labels with 44px touch targets. Inspection cards and hover descriptions are hidden, and the footer describes drag/pinch/tap gestures. Drags can begin on a star without navigating; lifting one finger after a pinch resumes orbiting. Checked at 390x844 in Chrome, including no horizontal overflow, desktop hover preservation and star tap navigation. Startup playback was verified; an intentionally rejected first play call resumed on the next interaction. Audible autoplay remains subject to browser policy.
