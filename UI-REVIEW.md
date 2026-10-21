# Iron Horse — Precision components and motion review

2026-10-21. Component and whole-page motion update based on `d29f6e61204fb44a80a57aac97565388f933895c`.

## Red BMW hero

The opening now uses a studio recreation of the owner’s red BMW M5 F90 LCI, with black roof/wheels and facelift light signatures. Desktop uses a wide front three-quarter view, tablet a square three-quarter view, and phones a frontal view. Responsive picture sources and matching media preloads load one hero asset per viewport. Local WebP assets retain their generated pixel dimensions; provenance is recorded alongside each asset. Existing damped camera and gradient-light animation remains in place. Compact compositions fit the complete vehicle within the frame.

All 684 browser assertions passed with the new hero. Additional manual Chromium checks at 320, 390, 768, 1440 and 2560px confirmed image decoding, the expected single image request, no horizontal overflow or JavaScript errors, and continued scroll-driven camera transforms. Compact framing was refined and the 20 motion-stability assertions repeated. Current desktop/phone screenshots are in `docs/previews/desktop.jpg` and `mobile.jpg`; older walkthrough videos still show the purple hero.

## Scroll-stability correction

A user-reported scroll jitter was reproduced in Chromium: an already visible service choice stayed at opacity 1 during its 165ms delay, then jumped to approximately 0.16 opacity and a 28px displacement. Hero pointer exit also moved the light by about 67 percentage points in one frame.

The correction removes scroll entrances from interactive choices and FAQ rows. Content entrances have no delay and use opacity 0.9–1 with an 8px displacement. Other delayed effects apply their first frame during the delay. Camera/light control uses one time-based damped loop that stops at rest; touch does not steer the light. The full-image moving mask and competing autoplay effects are removed. Scrollbar space remains reserved while dialogs are open.

A repeat sample showed content opacity rising monotonically from 0.9 and a maximum light-position change of about 7.3 percentage points per frame in the same desktop interaction. These measurements establish the specific regression correction, not a frame-rate guarantee for physical devices. The original 664 assertions pass, plus 20 stability assertions on desktop/phone: **684 total**. The earlier video walkthroughs below predate this correction.

## Changes

- Shared 6px control corners, 4px compact icon corners, 56px main controls, 48px compact header controls and 180ms interaction transitions. Filled, outline and neutral button treatments use the existing palette.
- Active service rows have a restrained tonal fill and red edge marker. Added-service actions show “Добавлено в план” with a checkmark and dark background; removing work resets the action.
- Care choices display checkbox boundaries before selection, then an inverted surface and filled checkmark. Vehicle and branch fields share dimensions, borders and focus treatment.
- Header and form city pickers show each city, address and selected checkmark. Desktop dialogs position above or below the trigger within the viewport. Native modal bottom sheets on phones shield the background, lock page scrolling and support Escape, close-button/backdrop dismissal and focus return. A breakpoint change closes the sheet and unlocks scrolling.
- Local Lucide 0.468.0 SVG symbols replace reused/rotated plus and diagonal-arrow icons for close, photo enlargement, previous/next, download, phone, route and up actions. The filled WhatsApp icon is retained; licensing ships with the assets.
- FAQ disclosure chevrons and gallery controls use matching dimensions and interaction states.
- Motion across the service explorer, gallery, care form, approach, branches, FAQ, closing and footer: gentle one-time content entrances, desktop service image crossfades, measured opening and closing of compact services/photo disclosures/FAQ, care-summary height and row transitions, selection acknowledgement, mobile-menu entrance and directional photo-viewer transitions. The outgoing gallery frame remains visible during decoding.
- Interrupted size transitions resolve their final state and remove clipping. Closing service panels become inert immediately. Runtime reduced motion, page visibility changes and resizing release temporary effects; native disclosures remain functional without scripting.
- Playwright is a development-only dependency. Browser checks no longer require a local Taste Skill installation. Static deployment still consists only of `dist/`.

## Validation

- `npm run check`: all three production JavaScript files pass syntax checks.
- `tests/ui.mjs`: **274 browser assertions**, covering existing service tabs/accordions, care selection/removal, synchronized branches, encoded WhatsApp enquiries, gallery bounds, all nine images, image errors/recovery, rapid viewer changes, keyboard/touch/focus, resizing and runtime reduced motion.
- `tests/components.mjs`: **193 assertions**, using pointer and keyboard input on both city pickers. Covers all branches, city/address selection, viewport bounds, modal behavior, Home/End/Space/Enter/Escape, cancellation, focus return, service selection/removal, backdrop dismissal, breakpoint changes and native no-script city selection.
- `tests/motion.mjs`: **197 assertions** with normal motion. Samples running entrances across eight sections, intermediate service/FAQ heights, opening/closing/reversals, rapid service/photo changes, care row changes and focus, outgoing-frame retention, runtime reduced-motion activation during an effect and resizing mid-transition.
- All three suites cover 320×720, 390×844, 568×320, 768×1024, 1100×900, 1280×800 and 1440×1000 in Chromium: **664 assertions** in total.
- Axe-core 4.10.3, WCAG 2 A/AA and 2.1 AA tags: **zero detected violations** for the main page, open header picker and open form picker at 390px and 1440px. This is a bounded automated scan, not a claim of complete accessibility certification.
- Screenshots inspected for the opening, service explorer, care form, desktop picker, mobile sheet and full-size gallery viewer. Normal-motion walkthroughs recorded at 1280×800 (21 seconds) and 390×844 (28 seconds), with no JavaScript errors; frame sheets inspected across the whole page. No independent-agent visual review or conversion result is claimed for this update.
- `git diff --check` and local asset, fragment and SVG symbol checks pass.
- WhatsApp tests intercept navigation; no messages are sent.

## Preview evidence

- `docs/previews/desktop.jpg` and `docs/previews/mobile.jpg`: updated opening.
- `docs/previews/precision-desktop.jpg`: care form with two selected services.
- `docs/previews/precision-mobile.jpg`: same form at 390px, including its summary.
- `docs/previews/precision-city-mobile.jpg`: branch selection sheet.
- `docs/previews/motion-desktop.mp4`: normal-motion desktop walkthrough across the site.
- `docs/previews/motion-mobile.mp4`: normal-motion phone walkthrough, including reversible disclosures.

## Scope and limits

Original logos, all nine photographs/provenance, contact destinations, content, natural scrolling and photographic motion are preserved. Existing fine service/branch/FAQ separators remain part of the design. No prices, customer reviews, guarantees or project-result claims are added. The screenshots use an example car model only as transient form input. This branch does not publish a deployment. Testing uses Chromium viewport emulation; physical iOS/Android devices and other browser engines have not been tested.
