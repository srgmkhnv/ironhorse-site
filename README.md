# Iron Horse

Russian-language website for Iron Horse detailing studios in Moscow, Makhachkala and Kaspiysk. Static HTML, CSS and JavaScript with local fonts and images; no build step or production dependencies.

## Run

```sh
npm start
npm run check
```

The preview runs at http://localhost:3000. Deploy only `dist/`. `.openai/hosting.json` retains the existing hosting project; this UI revision does not publish a deployment.

## Interface

- The opening restores the original large automotive photograph and restrained black/red/silver composition. It clearly names detailing and leads directly to the selected branch's WhatsApp. The exact wordmark appears in the header and footer; no repeated hero logo or shield-shaped surfaces remain.
- Above 1100px, six services use vertical tabs with a panel on the right. At 1100px and below, the same buttons and panels form a single-open accordion. Resizing retains the current service, selections and focus. Full service photographs are always visible on desktop; compact panels expose them through a native “Посмотреть автомобиль” disclosure, closed initially. The whole image remains available without cropping.
- The care form presents the selected services, optional vehicle model and branch in a contrasting silver “План ухода” summary. Removing a service synchronizes its checkbox. All selected information comes from the same browser-local state and is encoded into an editable WhatsApp message. The site does not send a message or reserve an appointment.
- Branch selection synchronizes the header, opening, form, contact panel and general WhatsApp links. Footer contact actions always target their own named branch.
- All nine photographs remain accessible. Desktop gallery pages contain a large photograph and two smaller photographs; tablets show two equal frames, and phones show one frame with the next frame's edge. Navigation uses measured element positions rather than a fixed card width.
- The native photo dialog supports keyboard navigation, Escape, focus return, touch swipes, downloading, image loading/error states and rapid changes.
- Camera and photographic light movement follow scrolling and pointer input. The opening scrolls naturally at every width while photographic light remains progressive. The opening text stays still and fully opaque. System reduced-motion changes cancel animation immediately. No motion toggle, light slider or hero scroll label is exposed. On phones the header scrolls away. The bottom contact shortcut stays available while browsing services/photos and hides in form/contact/closing/footer sections that already contain their own contact actions.

Without JavaScript, the service descriptions and all branch phone/WhatsApp/map links remain readable; the care section includes a direct WhatsApp fallback.

## Content and code

- `dist/index.html`: semantic content, six static service panels, form, gallery and footer. Keep static service names/descriptions and checkbox values aligned with the service data in the application script.
- `dist/app.js`: verified branch destinations, service metadata, responsive tabs/accordion, care state, city selection and WhatsApp message generation.
- `dist/styles.css`: brand tokens, five typography roles, restrained service/branch/FAQ separators, controls and responsive layout. Replaces the former `refinements.css` override layer.
- `dist/motion.js` / `motion.css`: event-driven photographic movement, entrances, menu page shielding and system motion preference.
- `dist/gallery.js` / `gallery.css`: gallery positioning and native dialog.
- `dist/assets/`: original shield/wordmark, local Golos and Unbounded fonts, and nine edited owner-derived photographs with provenance sidecars.

No prices, guarantees, customer reviews, project results or brand partnerships are invented. The owner-derived photos have regenerated studio backgrounds; captions describe the vehicles and do not claim specific service outcomes or actual premises. Preserve provenance sidecars and the owner's instruction to omit public technical retouching labels.

## Contact sources

Addresses were confirmed by the owner. Phone numbers were obtained from these public listings on 2026-10-18:

- Moscow: https://yandex.by/maps/org/iron_horse/122347266740/ — +7 910 498-92-11.
- Makhachkala: https://iron-horse-ulitsa-abubakarova.clients.site/ — +7 967 408-79-71.
- Kaspiysk: https://iron-horse-ulitsa-gagarina.clients.site/ — +7 902 355-29-50.

Numbers are preserved from the previous version. Pricing, materials, scheduling and availability are discussed with the selected branch.

## Validation

`npm run check` validates all three production JavaScript files. `tests/ui.mjs` runs browser interaction checks without adding dependencies, using the Chrome DevTools driver bundled with the user-requested Taste Skill (Node 22+ and Chromium/Chrome required). With the preview running:

```sh
TASTE_SKILL_ROOT=/path/to/taste-skill/skills/taste-skill npm run test:ui
```

The root is the directory containing the skill's `SKILL.md` and `scripts/`. Optionally set `UI_PREVIEW_URL` and `UI_TEST_REPORT` to change the target URL or save the JSON results. The suite intercepts WhatsApp navigation and does not send messages.

See `UI-REVIEW.md` for results and defended visual-inspector warnings.
