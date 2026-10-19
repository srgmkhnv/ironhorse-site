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

The built system is flat and deliberate. A scroll-directed photographic inspection pass moves light and camera framing on desktop and mobile, while interface states use a red stroke, an underline, directional movement or an inverted surface. A finite entrance introduces the mechanism; subsequent continuous movement follows visitor input. Russian body copy stays sober and readable beside the wide display face. Generated automotive illustrations remain visibly identified until authentic client photography is supplied.

**Key Characteristics:**
- Black studio ground with silver reading surfaces and branded red fields.
- Wide Unbounded headings paired with compact Golos text.
- Squared controls, fine rules and flat tonal layers.
- Image-bound light and camera movement on desktop and mobile, with an explicit motion control and a reduced-motion alternative.

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

**Display Font:** Unbounded (sans-serif fallback), locally served variable font (200–900).
**Body Font:** Golos (sans-serif fallback), locally served variable font (400–900).

**Character:** Wide, engineered display forms carry the brand; straightforward Russian text handles description and decisions. Headings use balanced wrapping and tight negative tracking rather than ornamental labels.

### Hierarchy
- **Display:** Hero headline, using the frontmatter desktop role. At widths up to (850px), it becomes `clamp(44px,7vw,64px)`; up to (600px), `clamp(37px,10.25vw,56px)` with line height (1.12); up to (360px), it is (36px). At (1600px) and above, it is (88px).
- **Headline:** Section headings use the frontmatter role; component-specific heading sizes run from (27px) to (66px). The base mobile section heading is (28px), line height (1.25).
- **Title:** Service-panel headings use the frontmatter role; (22px) at up to (1180px), (19px) at up to (850px), and (22px) at up to (600px). Branch address headings use their own fluid size.
- **Body:** Base text uses the frontmatter role and a paragraph cap of (70ch). Descriptive panel text uses (13–16px) and generous line heights (1.6–1.8).
- **Label:** Primary button labels use the frontmatter role; mobile buttons use (13px). Navigation is (13px) on desktop and fluid display type `clamp(26px,6.5vw,48px)` in the opened compact menu, becoming (28px) up to (600px).
- **Support:** The final stylesheet overrides establish image disclosures, scroll prompts and service tags at (11px), and service/form/branch notes at (12px), including mobile. Motion-toggle text, light-control text and the hero scroll/disclosure text also resolve to (11px) across viewport sizes. Preserve these late-cascade readable sizes.

**The Two Voices Rule.** Use Unbounded for the brand and major headings; use Golos for prose, controls and operational detail.

## Layout

The site uses full-width bands with a shared fluid horizontal gutter from frontmatter, rather than a centered maximum-width page box. The desktop header is (96px) tall. Main sections use vertical padding (110px); the approach section uses (130px). The header remains sticky and carries a distance-based page-progress rule. The hero is viewport-relative below the header, with content above imagery and a bottom disclosure/navigation row. With motion enabled, its sticky inspection section adds (76svh) of scroll travel; scrolling moves camera framing and the photographic beam rather than starting a loop.

Service and branch explorers use unequal two-column grids (.8fr / 1.2fr) with a (60px) gap. Care, approach and FAQ use two columns with (80–85px) gaps. Desktop service details use (30px) padding; branch panels use (42px). Most controls use thin borders and compact spacing inside these generous section intervals.

At up to (1180px), split gaps tighten, branch padding becomes (32px), header contact and hero city list disappear. At up to (850px), the header becomes (82px), desktop links become a toggle and full-height compact menu, section padding becomes (80px), care stacks into one column and the closing band stacks; explorers and FAQ still retain two columns.

At up to (600px), the gutter is (22px), header (76px), and section padding (65px). Service and branch explorers, approach, FAQ and form fields become single-column. Service tabs become horizontally scrollable bordered choices; branch tabs become a horizontal underlined row. Care options remain two columns. Hero image framing shifts below its text; height is `calc(100svh - 76px)` with a (640px) minimum, reducing to (630px) up to (360px). Enabled inspection travel is (65svh), with a visible touch/keyboard light control above the bottom disclosure. At viewport heights up to (650px), the enabled hero becomes a non-sticky (740px) section and the extra inspection travel is removed. A fixed bottom city/contact bar appears near the end of the hero story; safe-area inset is included in its padding and the footer reserves (100px) below. This bar is inert while hidden or while the compact menu is open. No content needs the photographic light to remain visible.

## Elevation & Depth

Content surfaces stay flat: depth comes from black/silver/red surface changes, one-pixel rules, image gradients and a brightened image duplicate behind a moving angled linear mask. The inspection beam has a narrow local glow; the range thumb has a small shadow and the compact menu has an edge shadow. These are specific light/control/overlay treatments, not a floating-card vocabulary.

**The Light Within Rule.** Keep the light reveal and photographic gradients inside image composition; content surfaces use tonal separation and fine rules. Reserve the existing local shadows for the inspection beam, range thumb and compact navigation overlay.

## Shapes

Controls, information panels, tabs and chips have square corners. Thin rectangular strokes and underlines define interaction boundaries. The authentic shield retains its supplied silhouette. Small circular red separators belong to the brand strip; the square-control rule does not prohibit those native dots. Inline SVG icons use fine strokes and rounded stroke caps. The light-range thumb is a small circular control; it does not change the square form of buttons and panels.

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

The service panel is a square black surface with an image above its (30px) text inset. Its image reveals through a scroll-driven top clip (up to 24%); selection changes use a cancellable (500ms) outgoing image fade/scale and a (700ms) incoming scale/brightness transition. The former panel-hover image zoom is disabled. The approach photograph has a small scroll-driven vertical shift within its cropped frame. Branch panels are square silver-gray fields with responsive padding (42 / 32 / 30 / 27px 24px). Neither uses a shadow.

### Inputs / Fields

Care fields are transparent on deep red, with white text and a half-opacity white bottom rule. Padding is (15px 0 12px). The optional vehicle input has a white caret in this section. Mobile text and select fields use (16px). Focus uses a white two-pixel outline with (3px) offset. The header city selector is a compact native dark select.

### Navigation

The supplied shield and wordmark anchor a quiet sticky header. Desktop links reveal a red underline over (.4s); the compact toggle uses two one-pixel lines rotating into a cross over (.3s). At up to (850px), the menu fills the viewport below the header with a dark background, ruled display-type links and small red directional strokes. It opens with a (550ms) clip reveal and staggered link entrances (55ms steps, capped at 165ms), and closes over (230ms). Repeated toggles cancel the previous transition; a generation check prevents a stale close from hiding a reopened menu.

The open menu locks document scrolling and makes main content, footer and bottom contact bar inert. Its own vertical scrolling and automatic first/last link margins keep every destination reachable on short screens. Escape closes it and restores focus to the toggle; link selection, skip-link activation, outside click and resizing above (850px) also close it. Hidden bottom contact controls remain inert after closing.

### Service and branch tabs

Desktop choices are ruled lists. Selection turns text deep red, shifts it right (12px), and reveals an arrow; at intermediate widths service selection shifts (5px). Mobile service selection inverts to ink/white; branch selection uses a two-pixel deep-red underline. Arrow keys, Home and End update selection and focus; selected tabs alone remain in the ordinary tab sequence. Panel changes cancel previous panel animations and use (500ms) opacity, blur (3px) and (22px) vertical movement. Mobile service-tab scrolling follows the active motion setting.

### Care choices

Squared checkbox tiles sit in a two-column grid with (10px) gaps, reducing to (8px) on mobile. Selected tiles invert to white/deep-red immediately, rotate their plus SVG (45deg), and draw a two-pixel bottom rule over (.45s). Direct checkbox changes compress the tile to (.94) and return over (350ms); the count uses the shared panel transition. Only geometry animates during selection so foreground/background contrast changes together. Hover strengthens the border; keyboard focus remains visible on the actual checkbox. Selection updates a live summary and is carried into the editable WhatsApp enquiry.

### Disclosures

FAQ rows retain native details/summary semantics, one-pixel rules and a plus SVG that rotates (45deg) over (.5s). Enhanced expansion measures the answer wrapper and animates height/opacity over (360ms). Repeated activation cancels the previous transition and starts from the current height; disabling motion settles the requested expanded state immediately.

### Photographic inspection and motion control

The shared easing is `cubic-bezier(.16,1,.3,1)`. The finite hero entrance reveals heading, prose and actions over (900ms), staggered by (90ms), with a (1500ms) camera move and one (2400ms) light pass. Scroll cancels the introductory camera/light movement and takes over: the beam traverses (20–85%), the camera scales by up to (1.12) on desktop or (1.16) on mobile, and the text shifts upward while retaining at least (.55) opacity. The hero progress line and horizontal brand band track scroll distance; neither loops. Multi-line section headings reveal once over (750ms), staggered by (75ms).

Pointer and touch input steer the same photographic light as the labelled native (0–100) range, which supplies keyboard operation. Touch preserves vertical page scrolling and pinch zoom. Leaving/releasing the hero or scrolling returns light control to the scroll position. Scroll rendering uses a coalesced animation frame, while direct steering updates the light position without an idle loop; section geometry refreshes on resize, fonts, image loads and content-size changes. Hidden documents pause active animations and schedule no render frames.

The visible motion button turns the complete motion system off immediately: running animations cancel, disclosures settle, camera/text/brand transforms reset, light and its control hide, and transitions and smooth scrolling stop. System reduced-motion preference defaults to this quiet state. Explicitly enabling motion overrides that preference for the current page; later system changes apply only until a visitor makes an explicit choice. Static content, tabs, forms, FAQ and navigation remain usable in either state.

## Do's and Don'ts

### Do:
- **Do** preserve the supplied shield, black/red/silver identity and two-font relationship.
- **Do** retain square controls, visible keyboard focus and explicit selected states.
- **Do** preserve responsive tab orientation, scrollable mobile choices and meaningful touch/keyboard motion controls on mobile.
- **Do** honor system reduced motion by default, allow explicit motion opt-in, and settle interrupted interactions to their requested state.
- **Do** label generated illustrations visibly and preserve their provenance when replacing or reusing imagery.

### Don't:
- **Don't** present generated illustrations as completed client work.
- **Don't** substitute rounded pill controls or floating shadow cards for the built squared, flat components.
- **Don't** make photographic light or animation necessary to read content or complete a contact request.
- **Don't** loop the hero inspection or leave hidden contact controls keyboard-accessible.
