# Iron Horse

Russian-language presentation site for Iron Horse detailing studios in Moscow, Makhachkala and Kaspiysk. Buildless HTML, CSS and JavaScript; no installation or backend required.

## Run

`npm start` serves `dist/` at http://localhost:3000. `npm run check` validates JavaScript syntax. Only `dist/` is served; development context and design notes stay outside it.

## Content and contact updates

- `dist/app.js`: branch names, addresses, phone numbers and map links in `branches`; service descriptions in `services`.
- `dist/index.html`: initial content, navigation, care choices and FAQ. Keep no-JavaScript initial content aligned with app.js.
- `dist/styles.css`: responsive layout, design variables, local fonts and motion. Reduced-motion preferences are supported.
- `dist/assets/photos/`: nine AI-regenerated owner photographs, each with a full-size WebP, responsive 640px version and JSON provenance. The hero uses photo-04; gallery includes every image. Original source photographs are retained outside the deployment at /workspace/ironhorse-sources, and native generated PNGs remain under /workspace/generated_images. Per the owner’s follow-up request, public retouching labels and redundant service/form/branch notices are removed; source provenance remains in asset metadata. The replacement backdrop is not represented as the actual premises.
- `dist/assets/shield.png`: the authentic shield extracted from the owner's supplied PDF.
- `dist/assets/wordmark.svg`: exact outlined letterforms extracted from that same PDF; no substituted brand font.
- `dist/refinements.css`: owner-requested header, city picker, full-frame service layout and expanded footer.

The care form stores no data and opens WhatsApp with an editable enquiry. Nothing is sent automatically. City selection updates all general enquiry links, contact panel and care city. No analytics, cookies or external font CDNs are used.

## Verified content sources

Addresses confirmed directly by the owner. Contact numbers obtained from the following public business listings on 2026-10-18:

- Moscow: https://yandex.by/maps/org/iron_horse/122347266740/ — +7 910 498-92-11.
- Makhachkala: https://iron-horse-ulitsa-abubakarova.clients.site/ — +7 967 408-79-71.
- Kaspiysk: https://iron-horse-ulitsa-gagarina.clients.site/ — +7 902 355-29-50. Older directory listings show a different number; this version follows the business landing page's WhatsApp contact.

The owner should confirm recipient numbers before a public launch. Availability, exact materials, timing and price are discussed with the selected branch. No price list, guarantees, testimonials or portfolio projects have been invented.

## Verification

Browser checks completed at 320, 390, 1280 and 1440 px: no horizontal overflow, all local resources load, no JavaScript errors, service tabs and keyboard navigation, service transfer into care selection, synced cities, correctly encoded WhatsApp URL with chosen services and car model, FAQ expansion, mobile navigation and Escape handling, reduced-motion mode. WhatsApp messages were not sent.

## Hosting

`.openai/hosting.json` records the private Sites project and static output directory. There is no build step. Deploy only the matching pushed source commit and its `.openai/hosting.json` + `dist/` archive. The packaged archive excludes product/design development context.

## Motion revision

`dist/motion.css` and `dist/motion.js` add the scroll-directed Light Tunnel inspection pass on desktop and mobile. The photographic beam follows scroll and decorative pointer/touch input. The user-requested interface refinement removed the visible range, motion toggle and bottom hero scroll label. A finite entrance, service crossfades, line entrances, compact-navigation reveal, checkbox feedback and FAQ expansion complement the focal scene. Rendering is event-driven; the application has no idle requestAnimationFrame loop.

System reduced motion defaults to a quiet static layout. Runtime system changes cancel tracked transitions and settle disclosures. There is no page-level override. Background-tab visibility pauses tracked Web Animations. The compact menu makes main/footer/fixed actions inert, and its short-screen layout keeps every destination reachable.

Normal-motion QA covers 320×720, 390×844, 568×320, 768×1024, 1280×800 and 1440×1000, including touch scroll, rapid repeated transitions, runtime reduced-motion changes, menu Escape/resize, FAQ interruption and the existing WhatsApp flow. Independent visual/motion and technical reviews were completed. Two menu defects found in technical review were fixed and independently rechecked.


## Owner photo integration

The owner supplied nine photographs and requested high-quality regeneration, removal of buildings/clutter and website placement. Each reference was edited with the image-generation tool. Recognizable vehicle colors, finishes and body identity anchor the edits; studio backgrounds, reflections and peripheral details were regenerated. The previous purely illustrative hero/process delivery assets were retired. No per-service results, before/after claims or customer identities were added.

`dist/gallery.js` / `gallery.css` provide the native horizontal photo rail and modal viewer. Photos can be opened with a pointer or keyboard, switched with arrows, swiped on touch, closed with Escape, and downloaded. Native dialog focus trapping and return to the originating image are preserved. Images stay hidden during loading, a live status reports loading/failure, and a request counter prevents stale decode callbacks from replacing newer selections. Runtime reduced-motion changes cancel the viewer transition.

Normal and reduced-motion QA covered six viewport sizes, all nine full-size image loads, carousel bounds/keyboard, viewer wraparound/rapid changes, Escape and focus return, existing mobile navigation, hero scroll transforms and the selected-city WhatsApp flow. The high-resolution PNG archive is available at /workspace/iron-horse-photos-highres.zip; it is deliberately outside the deployment archive.

## Browser feedback revision
The header uses the exact vector wordmark and heavier navigation. A keyboard-operable city listbox shows branch addresses and synchronizes general contact links. Service portraits render in full with contain framing and crossfades, never scroll clipping or zoom cropping. WhatsApp uses the standard filled Simple Icons symbol (https://github.com/simple-icons/simple-icons/blob/develop/icons/whatsapp.svg). The expanded footer links each branch directly to its own WhatsApp number and preserves a large exact wordmark.
