# Sobi’s Multiverse

Souradip (Sobi) Biswas’s portfolio: an interactive galaxy connecting eight pages of projects, AI studies, research writing, skills, experience, personal background and contact information.

## Run locally

Use Node.js 22.12 or newer and npm. `package-lock.json` is the canonical dependency lockfile.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite (normally http://localhost:3000). No API key, backend or database is required. The AI examples are labeled illustrations, rather than live inference endpoints. Contact opens an email draft in the visitor’s email app.

## Before pushing

```sh
npm run lint
npm run verify
npm run build
npm audit
```

- `lint`: TypeScript validation.
- `verify`: project preservation, collection separation/order, route IDs, references, article coverage, contact details and required PDFs/images/audio.
- `build`: production output in `dist/`.
- `preview`: serve that build locally; use the printed preview URL to check it.
- `clean`: remove generated `dist/` using a cross-platform Node command.

Browser coverage and remaining limitations are recorded in [docs/release-check.md](docs/release-check.md). The Playwright CLI smoke script is `scripts/browser-smoke.js`; it expects a production preview at http://127.0.0.1:4173 and runs through eight routes at desktop/mobile sizes, reduced motion and the galaxy home. It returns observations; review them for failures. `scripts/browser-interactions.js` covers the main controls/documents; `scripts/browser-renderers.js` cycles all atmosphere presets and checks active WebGL context counts.

## Deploy

This is a static Vite app. Deploy the contents of `dist/`, not the source directory. Hosting a custom domain at `/` uses the default build. For a GitHub Pages project under `/REPOSITORY/`, build with:

```sh
npm run build -- --base=/REPOSITORY/
```

Use your actual repository name. Hash navigation (`#/`, `#builder`, `#about`, etc.) avoids server-side route rewrites. Enable HTTPS for clipboard support. Hashed JavaScript/CSS and the PDF worker can be cached immutably; the HTML should revalidate so a deployment can load its current chunks. Replacing a document or public image at the same filename may require cache revalidation at the host.

## Edit content

- `src/data/portfolioData.ts`: sourced projects, skills, studies, milestones and profile records.
- `src/data/portfolioCollections.ts`: Projects/AI separation and featured order. A project belongs in one collection; Shadow Diary is in Projects by design.
- `src/data/researchArticles.ts`: owner-authorized working drafts. Replace these with the owner’s final writing; they do not assert unpublished results.
- `src/data/profileBackground.ts`: phone, agency, education, training and experience.
- `src/experience/places.ts`: professional page labels and subtitles.
- `public/documents/`: supplied CV, résumé and ATS résumé. Register changes in `src/data/resume.ts` and refresh the corresponding selectable transcript in `src/data/documentText.ts`.
- `public/images/`: Lanyard front/back images.
- `public/audio/organ-variation.mp3`: supplied background music, volume 0.48. Browsers can require a gesture before playback; the sound control reflects the actual playback state.

Content provenance and unconfirmed external references are documented in [docs/content-sources.md](docs/content-sources.md).

## Interaction and performance

Only the active room mounts its animated background. Room modules and atmosphere imports share cached promises and warm during idle time, respecting save-data/2g connections. PDFs, worker, transcripts, profile card and glow cursor are loaded separately. The galaxy stops rendering while its room is hidden; Lightfall, Lanyard, Hyperspeed and the glow cursor suspend their loops when the tab is hidden. Galaxy label updates run at 30 Hz, while canvas rendering follows the browser. PDF rendering and the full-page Lanyard canvas have pixel budgets.

The system reduced-motion preference enables still backgrounds and a static, flippable profile card. Visitors can toggle still mode in a page’s environment controls. Galaxy navigation includes a directory for keyboard/touch users and devices without WebGL. Page controls and editable fields do not trigger global arrow-key navigation.

Live site windows load automatically near the viewport and open the site when clicked. External sites can block frames, require authentication or change independently; source/live links remain available. No remote site’s embedding protections are bypassed.

## Repository hygiene

Never commit `.env` files, API keys, `node_modules`, `dist`, `.playwright-cli`, or newly generated `output/` artifacts. Previously tracked audit artifacts remain tracked; review staged changes before pushing. The portfolio requires no client-side secrets. Keep licensing notices for supplied components/cursors.
