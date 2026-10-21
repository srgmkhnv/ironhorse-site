---
name: Iron Horse
description: A black, silver and red automotive studio with engineered type and image-bound light.
colors:
  ink: "#0c0d0f"
  panel: "#151618"
  silver: "#eeefed"
  red: "#d71425"
  deep-red: "#b60f1e"
  line: "#343538"
  white: "#ffffff"
  supporting: "#b5b7ba"
typography:
  display:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "clamp(44px,5.15vw,82px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "clamp(30px,3.2vw,52px)"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-.035em"
  title:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-.025em"
  body:
    fontFamily: "Golos, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Golos, sans-serif"
    fontSize: "14px"
    fontWeight: 500
  support:
    fontFamily: "Golos, sans-serif"
    fontSize: "12px"
rounded:
  square: "0"
spacing:
  compact: "8px"
  control: "16px"
  inset: "24px"
  panel: "30px"
  split: "60px"
  wide: "80px"
  section: "110px"
  gutter: "clamp(24px,4.45vw,80px)"
components:
  button-red:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "17px 24px"
  button-red-hover:
    backgroundColor: "{colors.deep-red}"
  button-light:
    backgroundColor: "{colors.silver}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "17px 24px"
  button-light-hover:
    backgroundColor: "{colors.white}"
  service-tag:
    textColor: "#c5c6c8"
    rounded: "{rounded.square}"
    padding: "5px 9px"
  care-option:
    textColor: "{colors.white}"
    rounded: "{rounded.square}"
    padding: "15px 16px"
  care-option-selected:
    backgroundColor: "{colors.white}"
    textColor: "{colors.deep-red}"
  service-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.silver}"
    rounded: "{rounded.square}"
  photo-control:
    textColor: "{colors.silver}"
    rounded: "{rounded.square}"
    padding: "10px"
    height: "46px"
    width: "46px"
  studio-panel:
    backgroundColor: "#dedfdd"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "42px"
---

# Design System: Iron Horse

## Overview

**Creative North Star: "The Light Tunnel"**

The Light Tunnel translates the supplied black, red and silver shield into a dark automotive studio: broad engineered lettering, a single illuminated automobile, precise rules and squared controls. Large silver service and branch surfaces interrupt the black ground; saturated red fields give the care form and final invitation their own visual weight.

The built system is flat and deliberate. A scroll-directed photographic inspection pass moves light and camera framing on desktop and mobile, while interface states use a red stroke, an underline, directional movement or an inverted surface. A finite entrance introduces the mechanism; subsequent continuous movement follows visitor input. Russian body copy stays sober and readable beside the wide display face. The current photographs are AI-regenerated from nine owner-supplied vehicle images: retouching removes clutter and replaces building backgrounds with studio settings. At the owner’s request, retouching labels and background-replacement notices are omitted from the public interface; source provenance remains in the asset metadata. Photographic color and finish remain image content rather than new UI accents. The purple BMW with gold wheels anchors the hero, and the same owner series supplies service, approach and gallery imagery.

**Key Characteristics:**
- Black studio ground with silver reading surfaces and branded red fields.
- Wide Unbounded headings paired with compact Golos text.
- Squared controls, fine rules and flat tonal layers.
- Image-bound light and camera movement on desktop and mobile, with system-controlled reduced motion and no visible animation controls.
- Owner-supplied vehicle imagery, native gallery scrolling and a full-photo viewer without technical retouching labels.

## Colors

The palette follows the actual shield: black studio surfaces, silver lettering and information fields, with saturated red for brand emphasis and contact actions. Frontmatter values are normative; additional local overlay and border colors remain component details.

### Primary
- **Brand Red:** Main contact buttons, the closing field and active decorative accents.
- **Deep Red:** The care-selection field, primary-button hover and selected tab text on silver.

### Neutral
- **Studio Ink:** Page ground, header and dark mobile selected tabs.
- **Panel Black:** Service detail surface and mobile navigation.
- **Silver:** Main foreground and the service/branch section ground; reverses to ink text on light fields.
- **Rule Grey:** Dark section separators and disclosure rows.
- **White:** Text on red, selected care options, light-button hover and focus on red fields.
- **Supporting Silver:** Service prose and quiet interface detail on dark panels. Other local supporting grays remain as built.

**The Branded Surface Rule.** Use the existing black, silver and red surface relationships: dark studio framing, silver information sections, and red contact or selection fields.

## Typography

**Brand Lettering:** Exact outlined glyphs from the supplied logo PDF in `assets/wordmark.svg`; never typeset an approximation. The header combines it with the authentic shield; the footer uses it at full width.

**Display Font:** Unbounded (sans-serif fallback), locally served variable font (200–900). The hero is (600), desktop navigation (650), and service/footer headings (600).
**Body Font:** Golos (sans-serif fallback), locally served variable font (400–900).

**Character:** Wide, engineered display forms carry the brand; straightforward Russian text handles description and decisions. Headings use balanced wrapping and tight negative tracking rather than ornamental labels.

### Hierarchy
- **Display:** Hero headline, using the frontmatter desktop role. At widths up to (850px), it becomes `clamp(44px,7vw,64px)`; up to (600px), `clamp(37px,10.25vw,56px)` with line height (1.12); up to (360px), it is (36px). At (1600px) and above, it is (88px).
- **Headline:** Section headings use the frontmatter role; component-specific heading sizes run from (27px) to (66px). The base mobile section heading is (28px), line height (1.25).
- **Title:** Service-panel headings use the frontmatter role; (22px) at up to (1180px), (19px) at up to (850px), and (22px) at up to (600px). Branch address headings use their own fluid size.
- **Body:** Base text uses the frontmatter role and a paragraph cap of (70ch). Descriptive panel text uses (13–16px) and generous line heights (1.6–1.8).
- **Label:** Primary button labels use the frontmatter role; mobile buttons use (13px). Navigation is (13px) on desktop and fluid display type `clamp(26px,6.5vw,48px)` in the opened compact menu, becoming (28px) up to (600px).
- **Support:** Service tags remain (11px); gallery and operational labels retain their established sizes. Motion controls, hero scroll labels and technical photo notices have been removed at the owner’s request.

**The Two Voices Rule.** Use the exact supplied vector wordmark for Iron Horse lettering, Unbounded for major headings and navigation, and Golos for prose, controls and operational detail.

## Layout

The site uses full-width bands with a shared fluid horizontal gutter from frontmatter, rather than a centered maximum-width page box. The desktop header is (96px) tall. Main sections use vertical padding (110px); the approach section uses (130px). The header remains sticky and carries a distance-based page-progress rule. The hero is viewport-relative below the header, with content above imagery; the former bottom navigation label and location row are removed. With motion enabled, its sticky inspection section adds (76svh) of scroll travel; scrolling moves camera framing and the photographic beam rather than starting a loop.

Branch explorers retain the unequal two-column grid (.8fr / 1.2fr) with a (60px) gap. Services use a narrower tab column (.7fr) and wider panel (2fr), with (40px) between them. Care, approach and FAQ use two columns with (80–85px) gaps. Desktop service details use (30px) padding; branch panels use (42px). Most controls use thin borders and compact spacing inside these generous section intervals. The expanded dark footer has a shield/heading row, footer navigation, three directly linked branch contacts, an oversized exact vector wordmark, copyright and a back-to-top action. Branch contacts use three columns, stacking at up to (700px).

At up to (1180px), split gaps tighten, branch padding becomes (32px), header contact and hero city list disappear. Desktop links become a compact-menu toggle at up to (1100px). At up to (850px), the header becomes (82px), section padding becomes (80px), care stacks into one column and the closing band stacks; explorers and FAQ still retain two columns.

At up to (600px), the gutter is (22px), header (76px), and section padding (65px). Service and branch explorers, approach, FAQ and form fields become single-column. Service tabs become horizontally scrollable bordered choices; branch tabs become a horizontal underlined row. Care options remain two columns. Hero image framing shifts below its text; height is `calc(100svh - 76px)` with a (640px) minimum, reducing to (630px) up to (360px). Enabled inspection travel is (65svh), without the former light-range control or motion toggle. At viewport heights up to (650px), the enabled hero becomes a non-sticky (740px) section and the extra inspection travel is removed. A fixed bottom city/contact bar appears near the end of the hero story; safe-area inset is included in its padding and the footer reserves (100px) below. This bar is inert while hidden or while the compact menu is open. No content needs the photographic light to remain visible.

The photographic gallery uses native horizontal scrolling with snap-to-start cards: three columns with (24px) gaps, two with (20px) gaps at up to (1000px), and (82%) card widths with (16px) gaps at up to (600px). The narrow layout deliberately shows the next card edge. Portrait card frames use a (2:3) ratio and cropped images; the viewer uses `object-fit: contain` to show the entire edited photograph. Its desktop dialog is bounded by `min(1240px,96vw)` width and `min(950px,95dvh)` height, with a full-viewport, safe-area-aware layout at up to (600px).

## Elevation & Depth

Content surfaces stay flat: depth comes from black/silver/red surface changes, one-pixel rules, image gradients and a brightened image duplicate behind a moving angled linear mask. The inspection beam has a narrow local glow; compact-menu and city-list overlays have local edge shadows. These are specific light/control/overlay treatments, not a floating-card vocabulary.

**The Light Within Rule.** Keep the light reveal and photographic gradients inside image composition; content surfaces use tonal separation and fine rules. Reserve local shadows for the inspection beam and navigation/city overlays.

## Shapes

Controls, information panels, tabs and chips have square corners. Thin rectangular strokes and underlines define interaction boundaries. The authentic shield retains its supplied silhouette. Small circular red separators belong to the brand strip; the square-control rule does not prohibit those native dots. Inline SVG icons use fine strokes and rounded stroke caps. The removed range slider is not part of the interface.

## Components

### Buttons

Precise rectangular actions, with a directional SVG rather than a decorative glyph.
- **Primary:** Red with white text; frontmatter defines padding. Minimum height is (58px), gap (36px), one-pixel transparent border; mobile minimum height is (54px), padding (15px 20px).
- **Light:** Silver with ink text, turning white on hover. Used on the red care field.
- **Hover / Focus:** Red actions deepen on hover. Arrow icons move (3px, -3px) over (.4s). Keyboard focus is a red two-pixel outline with (6px) offset; it is white in care and closing fields.
- **Text action:** Text with a small inline arrow and a (44px) minimum height. Header contact is a separate one-pixel outlined action with a red hover border.

### Chips

Service tags are static squared outlines: one-pixel gray border, frontmatter padding and (11px) text. They communicate scope; they are not selectable filters.

### Cards / Containers

The service explorer uses a narrower ruled tab column beside a black image/text panel. The panel contains a full (2:3) portrait on the left and vertically centered descriptive content on the right; images use `object-fit: contain`, with no scroll clipping or zoom cropping. Switching services crossfades the outgoing image over (500ms) and fades/brightens the new frame over (700ms). At up to (1100px), service tabs become a horizontal scroll rail; at up to (600px), the panel stacks photograph above text. The approach photograph retains its small scroll-directed shift. Branch panels preserve the incumbent square silver-gray fields.

### Inputs / Fields

Care fields are transparent on deep red, with white text and a half-opacity white bottom rule. Padding is (15px 0 12px). The optional vehicle input has a white caret in this section. Mobile text and select fields use (16px). Focus uses a white two-pixel outline with (3px) offset. The header city picker is a squared (46px) button. Its dark popover lists three cities with street addresses, a check on the selected option, and visible keyboard focus. Arrow keys, Home/End and Enter/Space select; Escape/outside click/Tab close without trapping focus. City selection synchronizes the contact panel, care form, mobile city and general WhatsApp links. The care form retains its native city select.

### Navigation

The authentic shield and exact vector wordmark anchor the sticky header. Desktop links use Unbounded (650), silver text and a two-pixel red reveal underline over (.4s); the compact toggle uses two one-pixel lines rotating into a cross over (.3s). At up to (1100px), the menu fills the viewport below the header with a dark background, ruled display-type links and small red directional strokes. It opens with a (550ms) clip reveal and staggered link entrances (55ms steps, capped at 165ms), and closes over (230ms). Repeated toggles cancel the previous transition; a generation check prevents a stale close from hiding a reopened menu.

The open menu locks document scrolling and makes main content, footer and bottom contact bar inert. Its own vertical scrolling and automatic first/last link margins keep every destination reachable on short screens. Escape closes it and restores focus to the toggle; link selection, skip-link activation, outside click and resizing above (1100px) also close it. Hidden bottom contact controls remain inert after closing.

### Service and branch tabs

Desktop choices are ruled lists. Selection turns text deep red, shifts it right (12px), and reveals an arrow; at intermediate widths service selection shifts (5px). Mobile service selection inverts to ink/white; branch selection uses a two-pixel deep-red underline. Arrow keys, Home and End update selection and focus; selected tabs alone remain in the ordinary tab sequence. Panel changes cancel previous panel animations and use (500ms) opacity, blur (3px) and (22px) vertical movement. Mobile service-tab scrolling follows the active motion setting.

### Care choices

Squared checkbox tiles sit in a two-column grid with (10px) gaps, reducing to (8px) on mobile. Selected tiles invert to white/deep-red immediately, rotate their plus SVG (45deg), and draw a two-pixel bottom rule over (.45s). Direct checkbox changes compress the tile to (.94) and return over (350ms); the count uses the shared panel transition. Only geometry animates during selection so foreground/background contrast changes together. Hover strengthens the border; keyboard focus remains visible on the actual checkbox. Selection updates a live summary and is carried into the editable WhatsApp enquiry.

### Disclosures

FAQ rows retain native details/summary semantics, one-pixel rules and a plus SVG that rotates (45deg) over (.5s). Enhanced expansion measures the answer wrapper and animates height/opacity over (360ms). Repeated activation cancels the previous transition and starts from the current height; disabling motion settles the requested expanded state immediately.

### Owner photo gallery and viewer

The photographic series extends the existing dark studio framing with square image buttons, restrained captions and fine outlined controls. Gallery captions use (13px), reducing to (12px) on mobile. At the owner’s request, the hero, services, approach, gallery and viewer omit technical retouching/background-replacement notices. Captions describe vehicles, color and framing without claiming a performed service or result. Asset sidecars retain the original prompts and source provenance.

The rail remains a native scroll region with a thin scrollbar and visible keyboard focus. Previous/next controls move one card and disable at their bounds; a live position label reports the visible range. Arrow keys, Home and End operate when the rail itself has focus. Each photograph button opens a native modal dialog. The close button receives focus; Escape, close and an outside-backdrop click dismiss it and return focus to the opening photograph. Viewer arrow keys, buttons and horizontal touch swipes navigate the series with wraparound; vertical scrolling and pinch zoom remain available. A download link always points to the selected full-size edited file.

Full-size images stay hidden until decoding completes. A request counter prevents an older decode from displaying a stale selection; closing invalidates pending completion. Loading and error states use a live status message. The rail uses smooth scrolling only when the shared motion setting permits it. Image hover enlarges by (1.035) over (800ms); decoded viewer images enter from (.35) opacity and (1.025) scale over (380ms) when motion is enabled. The rail and viewer controls are (46px) square, reducing to (44px) in the mobile viewer; hover adds a red border and subtle tonal background. Preserve full-photo containment and the quiet presentation when extending this pattern.

### Photographic inspection and motion control

The shared easing is `cubic-bezier(.16,1,.3,1)`. The finite hero entrance reveals heading, prose and actions over (900ms), staggered by (90ms), with a (1500ms) camera move and one (2400ms) light pass. Scroll cancels the introductory camera/light movement and takes over: the beam traverses (20–85%), the camera scales by up to (1.12) on desktop or (1.16) on mobile, and the text shifts upward while retaining at least (.55) opacity. The horizontal brand band track scroll distance; neither loops. Multi-line section headings reveal once over (750ms), staggered by (75ms).

Pointer/touch movement steers the photographic beam decoratively; scrolling resumes the automatic light position. No range slider, motion toggle or bottom hero scroll label is visible. Motion never carries necessary information or controls access to services/contact. Scroll rendering is coalesced into a frame; geometry refreshes on resize, fonts, image loads and content changes. Hidden documents pause animations and schedule no render frames.

System `prefers-reduced-motion` directly controls motion, including runtime changes. Reduced motion cancels running animations, settles FAQ state, resets camera/content transforms, hides light, and disables transitions/smooth scrolling. All content, tabs, form, FAQ, gallery and navigation remain usable. There is no page-level motion override.

## Do's and Don'ts

### Do:
- **Do** preserve the supplied shield, black/red/silver identity and two-font relationship.
- **Do** retain square controls, visible keyboard focus and explicit selected states.
- **Do** preserve responsive tab orientation, scrollable service choices and keyboard access to city selection and navigation.
- **Do** honor system reduced motion, including runtime changes, and settle interrupted interactions to their requested state.
- **Do** preserve source provenance for owner-derived photographs in asset metadata; keep technical retouching notices out of the public interface as requested by the owner.
- **Do** retain native gallery scrolling, visible bounded rail controls, full-image containment and keyboard/touch access in the viewer.

### Don't:
- **Don't** present edited imagery as proof of specific completed services or imply that a replaced studio background depicts the actual premises.
- **Don't** substitute rounded pill controls or floating shadow cards for the built squared, flat components.
- **Don't** make photographic light or animation necessary to read content or complete a contact request.
- **Don't** loop the hero inspection or leave hidden contact controls keyboard-accessible.
