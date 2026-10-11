# Portfolio content sources

Reconciled on 11 October 2026 from the owner's sources:

- Live portfolio: https://sobi.codes/
- Repository: https://github.com/sobiswriter/Me-Protfolio
- Repository `src/app/page.js`: all 19 project descriptions, technology stacks, GitHub/demo links, professional overview, skills, experience, email and professional profiles.
- Repository `Souradip Biswas – Consolidated Portfolio Data.pdf`: full identity, college-student/independent-builder positioning, skill familiarity, research themes, programs and recognition.

Downloaded originals and extracted project records are saved under `output/old-portfolio-*`, `output/portfolio-consolidated-source.*` and `output/verified-portfolio-projects.json`. Downloaded JavaScript was parsed as static literals; it was never executed.

## Editorial boundaries

Project descriptions and project links follow the source records. The source does not provide per-project job titles, completion dates, measured performance, production status for every project, patent number/title, detailed award ranks, or technical evaluation outcomes; the application does not assert those details. Research entries describe interests and related project work, rather than invented publications. Removed illustrative AI responses that were not provided by either source.

The source explicitly lists OpenXAI and HacktoSkill collaborations in 2025, a patent publication, IIT Ropar Tech Fest recognition, hackathon participation/wins, ODDO Meet and IMC attendance, HackerRank ratings and foundational Spanish coursework. It does not establish exact dates for the other entries. These remain owner-reported portfolio statements, not independently verified certificates.

The newer owner-supplied CV, résumé, and ATS résumé in `public/documents` supersede the older profile where they differ. Contact now uses `souradip073@gmail.com`, `+91 8787822581`, and the same GitHub/LinkedIn profiles. All three unchanged PDFs are available onsite through a PDF.js reader with zoom, pages, and linked annotations, plus selectable text and download options.

Navigation labels describe the content, while creative world names remain in each hero and star preview. Route identifiers are preserved.

## Current document and GitHub reconciliation

- The current CV adds LaunchSILO Labs agency ownership and platform features, Bhudrishty and the SIH 2026 nomination, freelance retail/medical client work, Niva, LegalLM implementation details, waterborne outbreak prediction, education, training, dated patent publication, and award ranks. These remain owner-provided claims; no independent certificate verification is implied.
- RIGHT.LEFT is replaced throughout application content by LaunchSILO Labs and https://launchsilo.in/. Its `right-left` internal record ID is retained to preserve existing references. RLBiz source comes from the CV; it is not listed in the public repository catalog.
- Fetched all 63 repositories currently returned by the public GitHub API, plus relevant READMEs. Updated Wassap's homepage, linked Guru-Kripa-Jwellers and Main_Inviter, and confirmed Project AIC's README identifies the assistant as Niva. Added BisosChamber as a separate, newer PersonaVerse evolution rather than relabeling the original project.
- Legacy source links to PersonaVerse, AI-Overlay, Business-Venture-App, and PowerShell-Utility-Suite were absent from the current public catalog and are no longer presented as confirmed source links. No repositories or live demo URLs were invented for client work or CV projects.
- HTTP checks returned 200 for LaunchSILO, Wassap, BisosChamber, Guru Kripa, and LegalLM. LegalLM redirects to a deployment with X-Frame-Options DENY / frame-ancestors none, so its preview screen opens externally. Other demos retain direct-open fallback alongside optional embedded previews. HTTP success does not guarantee every feature or future deployment availability.
- Added the supplied React Bits Lanyard source, using existing Three.js and the exact front/back images. Added keyboard flipping, hidden-tab suspension, and a static flip card when motion is disabled. PDF.js is lazy loaded; esbuild was aligned with Vite's existing peer requirement to resolve installation.

## Final release review

The research prose in src/data/researchArticles.ts is owner-authorized draft writing, separate from these source records. It adds editorial framing and future questions, without supplying missing patent methods, measured results or event anecdotes. The article views retain original source context.

The final URL check returned 200 for all 12 demo entry URLs. LegalLM resolves to a Vercel login with DENY/frame-ancestors restrictions. CosmicCanvas's supplied URL redirects to HTTP; the HTTPS destination failed, so it has a separate-page fallback. RLBiz is still recorded from the CV but returned 404 publicly; its source action is suppressed with an unavailable label. LaunchSILO's embedded public page renders, though its site-content API responds 401. Browser entry-point success does not guarantee every external feature.

See docs/release-check.md for production browser coverage, deployment-path verification and remaining external/performance limits.
