# Iron Horse — final interface

## Direction

The original automotive composition is the visual foundation. A red BMW M5 F90 LCI leads the first screen, recreated in a dark studio from the owner’s reference photographs. Wide desktop, three-quarter tablet and frontal phone compositions share the same red paint, black roof/wheels and facelift lights. “Детейлинг с характером” names the service; “Обсудить уход” goes directly to the selected branch's WhatsApp. The exact original logo stays in the header and returns at full width in the footer. Oversized repeated hero branding, silver hero cards and tapered section edges have been removed following independent reviews and the owner's feedback.

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

The opening scrolls naturally at every width. A single, time-based damped controller moves camera framing and light; it stops scheduling frames when input settles. Touch gestures only scroll and do not also steer light horizontally. The photo has no competing autoplay zoom or sweeping-light animation. The light uses a static gradient on a composited transform layer, not a full-resolution photo duplicate with a mask repainted every frame. Opening text stays still.

Content sections use gentle one-time entrances: opacity 0.9 to 1 and an 8px shift over 420ms, with no stagger delay. Observation begins just below the viewport. Service/branch choices, care options and FAQ rows have no scroll entrance, so interactive targets stay still. Delayed interaction animations apply their first frame during the delay to prevent flashing from the base style. No persistent hidden state gates content. A stable scrollbar gutter prevents sideways shifts when dialogs lock page scrolling.

Desktop service changes move the description and crossfade the photograph. Compact service accordions, photo disclosures and FAQ animate both opening and closing through their measured heights in 420ms, then release to intrinsic height. Closing service content becomes inert immediately. Reversing a disclosure or selecting another service interrupts the current transition and settles the latest state. Resizing also releases temporary heights before the responsive layout changes.

Care choices acknowledge selection with a short scale/checkmark response. Summary rows keep their DOM identity, animate additions and reposition surviving rows; list height changes smoothly. Gallery viewing animates the dialog entrance and uses directional 420ms photo transitions. A decorative, non-interactive copy retains the outgoing frame while the next image decodes, then fades away. Rapid navigation, load errors and closing remove those copies.

Component hover/focus transitions use 180ms, with a 220ms mobile city sheet entrance. The shared animation controller cancels effects and resolves pending disclosure states when system reduced motion activates or the page becomes hidden. With reduced motion, native disclosures and all state changes are immediate. Phone header scrolls away; the contextual contact shortcut hides while form/contact/closing/footer actions are visible. Menu and hidden shortcut use inert appropriately. No light slider, motion toggle or scroll label is shown.

## Content

Preserve original logos, all nine owner-derived edited photographs and provenance sidecars. Captions describe vehicles, not proven services or actual premises. Do not invent prices, customer reviews, guarantees, process footage or completed-project claims. Branch contacts and sources are recorded in README.md.
