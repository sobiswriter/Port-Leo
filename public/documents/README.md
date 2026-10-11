# Professional documents

The supplied PDFs are published unchanged:

- Souradip_Biswas_Resume.pdf: concise résumé, one page.
- Souradip_Biswas_CV.pdf: full CV, two pages.
- Souradip_Biswas_Resume_ATS.pdf: ATS résumé, one page.

Contact & Résumé reads them using a lazy PDF.js canvas viewer with page navigation, fit/zoom and clickable document links. The reader grows to the complete current page; Text view supplies a selectable transcript. Open and Download remain available independently of the renderer.

To replace a document, put the new PDF here, update its registry entry in src/data/resume.ts if the filename changes, and refresh the matching entry in src/data/documentText.ts. Reconcile affected profile/contact/project facts in the other data modules too. Run npm run verify and check the PDF/Text views in the browser. Public documents may need host cache revalidation after replacement at the same URL.
