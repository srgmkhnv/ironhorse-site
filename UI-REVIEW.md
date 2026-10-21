# Iron Horse — final UI review

2026-10-21. The final revision restores the original vehicle-led visual foundation and retains useful interaction improvements. The owner requested publication to GitHub after corrections.

## Changes

- Large automotive photograph and direct “Обсудить уход” WhatsApp entry replace the silver hero card. Oversized repeated wordmark, shield-shaped cards and tapered section boundaries are removed.
- Services, branches and FAQ regain restrained original-style separators. Concrete section headings explain their purpose. Desktop navigation uses the display face; the mobile photograph is raised to reduce the dark gap below the actions.
- Six desktop service tabs become a single-open compact accordion. Complete service photographs remain accessible through native disclosures, without extending every initial panel.
- A rectangular silver care summary lists selected services, optional vehicle and selected branch. Phone choices use two columns where there is enough width, shortening the path to the summary. One state supplies both the visible plan and the editable WhatsApp message.
- City synchronization, all nine gallery entries, accessible photo dialog, downloads, loading/error recovery, keyboard/touch controls and focus return are retained. Footer contacts always target their named branch.
- The opening scrolls naturally at every width; photographic light/camera motion and runtime system reduced-motion support remain. The contextual mobile shortcut avoids sections with their own contact actions.
- With JavaScript disabled, all six service descriptions, native photo controls and branch contacts remain accessible.

## Independent visual review

Three agents originally reviewed separate screenshot sets without the previous self-rating or the owner's reaction. The latest branded hero lost to the previous photographic version in all three reviews; the brand reviewer also preferred the original site's visual foundation over both redesigns.

After correction, two reviewers examined desktop, tablet and phone screenshots and full-page sheets. Both found the earlier composition problems resolved and no blocking visual issue. The art reviewer found no substantial visual regression against the original, while noting a calmer typographic treatment. Small follow-up adjustments raised the phone photograph, shortened phone service choices and strengthened desktop navigation.

The former **8.1 self-rating is withdrawn**. No replacement numeric score or conversion improvement is claimed. Browser checks establish behavior, not aesthetic quality or actual conversion.

## Validation

- `npm run check`: production JavaScript syntax.
- `npm run test:ui`: **274 assertions** at 320×720, 390×844, 568×320, 768×1024, 1100×900, 1280×800 and 1440×1000. Includes six services, selections/removal, three branches and encoded enquiries, gallery bounds, all nine thumbnail/full-size images, loading failure/recovery, rapid dialog changes, keyboard/touch/focus, menus, FAQ, resizing, natural scrolling and runtime reduced motion.
- Separate browser checks verify usable no-script service widths and native photo controls at 390px and 1440px.
- Local HTML asset and anchor references checked; `git diff --check` passed.
- Taste Skill browser inspector: **0 FAIL, 3 WARN**, with the explicit `--allow hairline` exception below. Final desktop/tablet/mobile screenshots are reviewed. Source lint: **0 FAIL, 1 WARN**, with narrowly documented line-level exceptions.
- WhatsApp navigation is intercepted in tests. No messages are sent.

## Deliberate exceptions and limits

- **Fine separators:** retained from the original visual system at the owner's direction after independent reviewers found the filled replacement panels too heavy. The inspector's `hairline` house rule is explicitly allowed; this is a design choice, not a functional error hidden by a passing result.
- **Photographic scrims and light mask:** neutral overlays/masks over the actual photo provide readable text and the existing light effect. They do not add gradient surfaces to content panels. A shadow is reserved for the floating city dropdown.
- **No footage:** no process/premises footage was supplied; unrelated stock video would not prove Iron Horse's work.
- **Horizontal gallery:** intentional, with controls, keyboard access, a visible next edge on phones and measured bounds. The “empty middle” heuristic includes off-screen rail pages; separately viewed screenshots and decoded thumbnails confirm visible photographs.
- **Source numbering warning:** zero-padding belongs to downloadable filenames, not decorative interface labels.
- Owner-derived photographs have regenerated studio backgrounds. Preserve provenance sidecars; captions do not claim specific services or actual premises. Genuine case studies, verified process photos and approved materials/prices remain content opportunities, not invented launch proof.
- Existing contact numbers are preserved; their public listing sources are recorded in README.md.

## Evidence

Git-tracked preview images: `docs/previews/desktop.jpg` and `docs/previews/mobile.jpg`. Local ignored artifacts: `.taste-skill/final/`, `.taste-skill/final-gallery.jpg`, `.taste-skill/final-tests.json`. Original logos, photographs and provenance files are unchanged.
