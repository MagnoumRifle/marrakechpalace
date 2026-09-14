# Marrakech Palace

Luxury real-estate website built with Next.js App Router, React and TypeScript for Vercel. Seven French pages use the approved ivory, bronze and dark-brown direction. All project renders and plans are supplied assets; originals remain in the working archive.

Framework references: [Next.js documentation](https://nextjs.org/docs) and [Vercel image optimization](https://vercel.com/academy/optimize-your-vercel-account/image-optimization).

## Run locally

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Use Node.js 22 or 24.

## Verify

```sh
npm run typecheck
npm run build
npm run test:smoke
```

The smoke check needs a running server at port 3000. Set `TEST_BASE_URL` to check another local preview or deployed URL. It checks seven routes, metadata, asset references, PDF signatures, partial video responses and the 404 page. Browser checks also cover plan variants, floor selection, zoom, gallery filtering/navigation, mobile menu, map activation and the WhatsApp enquiry flow.

## Deploy on Vercel

1. Push this project to your Git repository. The `public` folder must be included. Original production renders, research and design boards are ignored; only optimized website copies are deployed.
2. Import the repository into Vercel. Framework: **Next.js**. Root: this project folder. Build command: `npm run build`. Leave the output directory at the Next.js default.
3. Choose Node.js **24.x** (22.x is also supported).
4. Once the production domain is known, set `NEXT_PUBLIC_SITE_URL` to its complete HTTPS origin and redeploy. This enables the production sitemap URLs.

No database, mail provider, API keys, or runtime secrets are required. Deployment has not been performed from this workspace.

## Project settings

- `src/lib/site.ts`: WhatsApp number, display number, Google Maps location and document URLs. Current owner-supplied temporary number: **+212 631 857 034**. Update `whatsapp` and `phoneDisplay` together when the final sales number is available.
- `public/media/hero.mp4`: supplied original 19,764,654-byte video, unchanged. Replace it with the lighter H.264 MP4 later. Use a new filename in `src/components/hero.tsx` and `src/lib/gallery.ts` if you want to immediately invalidate cached copies.
- `public/documents/`: the original brochure and CPS, available to view or download directly. No form is required for access.
- `src/lib/gallery.ts`: curated ordering, scene labels, the film entry and the verified floor-plan mapping: **RDC2 = Salon; RDC1 = Chambre + salle de bain; 1ET = Premier étage**.
- `src/app/globals.css`: responsive design tokens and page styles. Fonts are served locally, without requests to Google Fonts.

The enquiry form validates the required fields and prepares a WhatsApp message. The visitor reviews and sends it in WhatsApp. The site does not claim a booking has been confirmed and does not store or email enquiries. No messages were sent during testing.

## Media and performance

All seven content pages are pre-rendered. Only interactive elements hydrate on the client. Website image copies use WebP (39 images, about 6 MB combined), responsive Next.js Image delivery, long-lived image caching, lazy loading and reserved image dimensions. The source artwork is not altered.

The hero uses a priority poster while the original film starts muted and inline. Reduced-motion and data-saving preferences suppress autoplay, the user can pause, and playback pauses when the video leaves the viewport or the tab is hidden. Gallery films play only when requested. Google Maps loads when the visitor asks to display it, avoiding an initial map download.

The original video remains about 20 MB as requested; it is the main remaining transfer-size improvement for a later media update. Both PDFs are the full original downloads and are not preloaded.

## Before public launch

Replace the temporary sales number and set the production domain. Confirm final commercial facts and document versions against `PROJECT-BRIEF.md`, including its recorded source discrepancies. No prices, availability, delivery dates, travel times or testimonials have been invented. The current typographic `mp` monogram is a website treatment and can be replaced with the original brand artwork when supplied separately.
