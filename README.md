# Iron Horse

Russian-language presentation site for Iron Horse detailing studios in Moscow, Makhachkala and Kaspiysk. Buildless HTML, CSS and JavaScript; no installation or backend required.

## Run

`npm start` serves `dist/` at http://localhost:3000. `npm run check` validates JavaScript syntax. Only `dist/` is served; development context and design notes stay outside it.

## Content and contact updates

- `dist/app.js`: branch names, addresses, phone numbers and map links in `branches`; service descriptions in `services`.
- `dist/index.html`: initial content, navigation, care choices and FAQ. Keep no-JavaScript initial content aligned with app.js.
- `dist/styles.css`: responsive layout, design variables, local fonts and motion. Reduced-motion preferences are supported.
- `dist/assets/hero.webp` and `craft.webp`: generated illustrative photographs, visibly labelled as staged images on the page. Replace with owner-supplied photographs and accurate alt text when available. They are not presented as completed Iron Horse projects. JSON sidecars retain generation provenance.
- `dist/assets/shield.png`: the authentic shield extracted from the owner's supplied PDF.

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
