# Iron Horse

Russian-language website for Iron Horse detailing studios in Moscow, Makhachkala and Kaspiysk. Static HTML, CSS and JavaScript with local fonts, images and SVG icons; no build step or production dependencies. Playwright is a development-only dependency for browser checks.

## Run

```sh
npm start
npm run check
```

The preview runs at http://localhost:3000. Deploy only `dist/`. `.openai/hosting.json` retains the separate existing hosting project.

## GitHub Pages

`.github/workflows/pages.yml` validates production JavaScript and publishes only `dist/` after changes merge into `main`. Pull requests validate/package the site without deploying. Manual runs are also available from Actions → Deploy GitHub Pages.

The repository's Settings → Pages → Build and deployment → Source must be **GitHub Actions**. GitHub requires an eligible plan for Pages from a private repository. The workflow does not change repository visibility or require a personal token. The default project address is `https://srgmkhnv.github.io/ironhorse-site/`; use the deployment's environment URL as the actual address once a deployment succeeds. All site asset URLs are relative so the project subdirectory is supported.

A ready-to-publish static snapshot is also available on the `gh-pages` branch, with `index.html` at the root and `.nojekyll`. To publish that snapshot directly, set Settings → Pages → Source to **Deploy from a branch**, select **gh-pages / (root)** and save. This source publishes commits to `gh-pages`; it does not automatically copy subsequent changes from `main`.

Publication attempt on 2026-10-21: the UI/motion changes and deployment workflow are merged into `main`. All 664 local browser assertions pass with the `/ironhorse-site/` project prefix. GitHub Actions run [39617756328](https://github.com/srgmkhnv/ironhorse-site/actions/runs/39617756328) failed before assigning a runner or executing any build step; publication was skipped. The connected integration cannot read the check annotations or change Pages settings. A successful public deployment has not been verified.

## Interface

- The opening restores the original large automotive photograph and restrained black/red/silver composition. It clearly names detailing and leads directly to the selected branch's WhatsApp. The exact wordmark appears in the header and footer; no repeated hero logo or shield-shaped surfaces remain.
- Above 1100px, six services use vertical tabs with a panel on the right. At 1100px and below, the same buttons and panels form a single-open accordion. Resizing retains the current service, selections and focus. Full service photographs are always visible on desktop; compact panels expose them through a native “Посмотреть автомобиль” disclosure, closed initially. The whole image remains available without cropping.
- The care form presents the selected services, optional vehicle model and branch in a contrasting silver “План ухода” summary. Removing a service synchronizes its checkbox. All selected information comes from the same browser-local state and is encoded into an editable WhatsApp message. The site does not send a message or reserve an appointment.
- Precision components share 6px control corners, consistent button/field sizes and short interaction transitions. Service actions distinguish added work; care choices have visible checkbox boundaries. Local Lucide icons identify the individual actions; the filled WhatsApp icon remains.
- Branch selection synchronizes the header, opening, form, contact panel and general WhatsApp links. Header and form use the same city/address/checkmark picker. Desktop popups fit available space above or below their trigger; phone pickers are native modal bottom sheets with background shielding, Escape/backdrop dismissal and focus return. The native form select remains available without scripting. Footer contact actions always target their own named branch.
- All nine photographs remain accessible. Desktop gallery pages contain a large photograph and two smaller photographs; tablets show two equal frames, and phones show one frame with the next frame's edge. Navigation uses measured element positions rather than a fixed card width.
- The native photo dialog supports keyboard navigation, Escape, focus return, touch swipes, downloading, image loading/error states and rapid changes.
- Camera and photographic light movement follow scrolling and pointer input. The opening scrolls naturally at every width while photographic light remains progressive. The opening copy has a short entrance and remains still during scrolling. System reduced-motion changes cancel animation immediately. No motion toggle, light slider or hero scroll label is exposed. On phones the header scrolls away. The bottom contact shortcut stays available while browsing services/photos and hides in form/contact/closing/footer sections that already contain their own contact actions.
- Motion covers the whole page: staggered section entrances, desktop service photo crossfades, measured opening/closing for compact service/photo disclosures and FAQ, animated care-summary additions/reordering and directional gallery photo transitions. Rapid changes settle the most recent state. Temporary heights release when effects finish, the viewport changes or reduced motion activates. Decorative outgoing images are removed on transition completion, cancellation or reduced motion. All content remains available without motion JavaScript.

Without JavaScript, the service descriptions and all branch phone/WhatsApp/map links remain readable; the care section includes a direct WhatsApp fallback.

## Content and code

- `dist/index.html`: semantic content, six static service panels, form, gallery and footer. Keep static service names/descriptions and checkbox values aligned with the service data in the application script.
- `dist/app.js`: verified branch destinations, service metadata, responsive tabs/accordion, care state, shared responsive city pickers and WhatsApp message generation.
- `dist/styles.css`: brand tokens, five typography roles, restrained service/branch/FAQ separators, controls and responsive layout. Replaces the former `refinements.css` override layer.
- `dist/motion.js` / `motion.css`: event-driven photographic movement, entrances, menu page shielding and system motion preference.
- `dist/gallery.js` / `gallery.css`: gallery positioning and native dialog.
- `dist/assets/`: original shield/wordmark, local Golos and Unbounded fonts, Lucide license, and nine edited owner-derived photographs with provenance sidecars. Lucide 0.468.0 symbols are embedded in `index.html`; no icon runtime or CDN is loaded.

No prices, guarantees, customer reviews, project results or brand partnerships are invented. The owner-derived photos have regenerated studio backgrounds; captions describe the vehicles and do not claim specific service outcomes or actual premises. Preserve provenance sidecars and the owner's instruction to omit public technical retouching labels.

## Contact sources

Addresses were confirmed by the owner. Phone numbers were obtained from these public listings on 2026-10-18:

- Moscow: https://yandex.by/maps/org/iron_horse/122347266740/ — +7 910 498-92-11.
- Makhachkala: https://iron-horse-ulitsa-abubakarova.clients.site/ — +7 967 408-79-71.
- Kaspiysk: https://iron-horse-ulitsa-gagarina.clients.site/ — +7 902 355-29-50.

Numbers are preserved from the previous version. Pricing, materials, scheduling and availability are discussed with the selected branch.

## Validation

`npm run check` validates all three production JavaScript files. The browser suites use Playwright and run on Node 18+ without requiring a separately installed skill. Start the preview in another terminal, then:

```sh
npm ci
npx playwright install chromium
npm run test:ui
```

For an existing system Chromium, use `CHROMIUM_PATH=/usr/bin/chromium npm run test:ui` instead of downloading a browser. Optionally set `UI_PREVIEW_URL` and `UI_TEST_REPORT` to change the target URL or save the original scenario suite's JSON results. `tests/ui.mjs` covers existing service, gallery and enquiry flows; `tests/components.mjs` exercises pointer/keyboard input on city pickers and service controls; `tests/motion.mjs` samples intermediate animation frames and checks reversals, rapid input, resizing and runtime motion reduction at seven viewport sizes. WhatsApp navigation is intercepted in the original suite; the other suites do not submit enquiries.

Normal-motion walkthroughs are in `docs/previews/motion-desktop.mp4` and `docs/previews/motion-mobile.mp4`. They cover services, gallery viewing, care selection/removal, approach, branches, FAQ, closing and footer.

See `UI-REVIEW.md` for results and defended visual-inspector warnings.
