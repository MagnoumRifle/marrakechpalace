# Validation — Marrakech Palace

- Next.js production build succeeds; all seven page routes are pre-rendered.
- TypeScript check passes.
- HTTP smoke check passes for every route, unique titles, French document language, one H1 per page, 39 image references, the PDF signatures and partial-download responses, MP4 range streaming, robots, sitemap and 404.
- Browser review at 1440 × 1000 and 390 × 844: every page fits its viewport with no document overflow; no broken loaded images reported on the desktop route pass.
- Hero film reaches its playing state; the pause control changes to the play control. The site uses the owner's unchanged original MP4.
- Villa explorer: Plans 2D selects the correct source files; RDC bedroom option uses RDC1, first floor uses 1ET, and returning to RDC preserves the bedroom selection. Zoom and Escape-to-close work.
- Gallery: first-floor filter returns 14 images; opening a scene and selecting the next scene updates the viewer. The viewer closes normally.
- Mobile menu opens and navigation closes it and reaches the selected route. A thumbnail-strip overflow found during review was corrected before the final route pass.
- Contact: the empty form is blocked; a filled test request creates an encoded WhatsApp URL for +212 631 857 034 with the selected RDC option. No external message was sent.
- Map: activation loads the Google Maps iframe at 31.6550299, -7.8052779, with the map region and attribution visible in its accessibility tree.

This is local validation, not a deployed Vercel test or a Lighthouse performance score. The original video is about 20 MB; the owner will provide a lighter replacement later. Source PDFs remain their original sizes and download only on request. Production sitemap URLs require NEXT_PUBLIC_SITE_URL.
