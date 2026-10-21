# Iron Horse — final interface

## Direction

The original automotive composition is the visual foundation. A large purple BMW, its paint and reflections lead the first screen. “Детейлинг с характером” names the service; “Обсудить уход” goes directly to the selected branch's WhatsApp. The exact original logo stays in the header and returns at full width in the footer. Oversized repeated hero branding, silver hero cards and tapered section edges have been removed following independent reviews and the owner's feedback.

## Visual system

Precision updates the existing black `#0c0d0f`, silver `#eeefed`, red `#d71425` and deep red `#b60f1e` system, with local Unbounded and Golos. Controls use 6px corners, compact icon controls use 4px, and shared color/duration tokens keep interaction states consistent. Main buttons and form fields are 56px tall; compact header buttons are 48px. Equal responsive gutters, 16px running text, 13px secondary text and visible keyboard focus remain. Services, branch lists and FAQ retain fine separators. Active service rows have a quiet tonal fill and red edge marker. Neutral scrims are used for legibility over the actual hero photograph.

## Components

- Six services: desktop vertical tabs; single-open accordion at 1100px and below. Compact panels show descriptions and actions first; native photo disclosures retain complete, uncropped images. Resizing preserves service, selected work and keyboard focus.
- The care form creates a concrete, editable WhatsApp enquiry. A rectangular silver “План ухода” shows selected services, optional car and branch. No repeated logo, shield decoration, quote or confirmed booking is implied.
- City choice synchronizes the header, opening, form, contact panel and general WhatsApp links. Both pickers display city, address and the selected checkmark. Desktop dialogs anchor above or below their trigger according to available space; at 600px and below, native modal bottom sheets make the background inert. Escape, backdrop/close-button dismissal and focus return are supported. The form retains its named native select for no-script use. Footer contact actions always belong to their named branch.
- Buttons have filled, outline and neutral variants. Adding a service updates its action to a dark “Добавлено в план” state with a checkmark. Care choices always show a checkbox boundary and use an inverted surface plus a filled checkmark when selected.
- Interface icons are local inline SVG symbols from Lucide 0.468.0, with a consistent 1.75px stroke. Closing, navigation, photo enlargement, download, route and phone actions each use their own symbol. The filled WhatsApp brand icon is retained. Lucide licensing is in `dist/assets/Lucide-LICENSE.txt`.
- Gallery: one large and two smaller photographs per desktop page, two frames on tablets, one frame plus the next edge on phones. All nine photographs have a native full-size dialog, download, keyboard/swipe controls, focus return and error recovery.
- Original-style restrained branch selector and FAQ; a simple red closing invitation. Useful branch contacts remain in the footer.

## Motion and accessibility

The opening scrolls naturally at every width. Camera/light motion follows scrolling and pointer input; short entrances never gate reading. Component transitions use 180ms, with a 220ms mobile sheet entrance. System reduced-motion changes cancel animation immediately. Phone header scrolls away; the contextual contact shortcut hides while form/contact/closing/footer actions are visible. Menu and hidden shortcut use inert appropriately. No light slider, motion toggle or scroll label is shown.

## Content

Preserve original logos, all nine owner-derived edited photographs and provenance sidecars. Captions describe vehicles, not proven services or actual premises. Do not invent prices, customer reviews, guarantees, process footage or completed-project claims. Branch contacts and sources are recorded in README.md.
