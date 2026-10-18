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

The built system is flat and deliberate. Light lives inside imagery and its masking layers, while interface states use a red stroke, an underline, a small directional movement or an inverted surface. Russian body copy stays sober and readable beside the wide display face. Generated automotive illustrations remain visibly identified until authentic client photography is supplied.

**Key Characteristics:**
- Black studio ground with silver reading surfaces and branded red fields.
- Wide Unbounded headings paired with compact Golos text.
- Squared controls, fine rules and flat tonal layers.
- Image-bound light, restrained directional motion and a reduced-motion alternative.

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
- **Display:** Hero headline, using the frontmatter desktop role. At widths up to (850px), it becomes `clamp(46px,7vw,64px)`; up to (600px), `clamp(39px,10.25vw,61px)` with line height (1.15). At (1600px) and above, it is (88px).
- **Headline:** Section headings use the frontmatter role; component-specific heading sizes run from (27px) to (66px). The base mobile section heading is (28px), line height (1.25).
- **Title:** Service-panel headings use the frontmatter role; (22px) at up to (1180px), (19px) at up to (850px), and (22px) at up to (600px). Branch address headings use their own fluid size.
- **Body:** Base text uses the frontmatter role and a paragraph cap of (70ch). Descriptive panel text uses (13–16px) and generous line heights (1.6–1.8).
- **Label:** Primary button labels use the frontmatter role; mobile buttons use (13px). Navigation is (13px) on desktop and display type (20px) in the opened compact menu.
- **Support:** The final stylesheet overrides establish image disclosures, scroll prompts and service tags at (11px), and service/form/branch notes at (12px), including mobile. Preserve these late-cascade readable sizes.

**The Two Voices Rule.** Use Unbounded for the brand and major headings; use Golos for prose, controls and operational detail.

## Layout

The site uses full-width bands with a shared fluid horizontal gutter from frontmatter, rather than a centered maximum-width page box. The desktop header is (96px) tall. Main sections use vertical padding (110px); the approach section uses (130px). Hero height is viewport-relative, constrained to (730–1000px), with content above imagery and a bottom disclosure/navigation row.

Service and branch explorers use unequal two-column grids (.8fr / 1.2fr) with a (60px) gap. Care, approach and FAQ use two columns with (80–85px) gaps. Desktop service details use (30px) padding; branch panels use (42px). Most controls use thin borders and compact spacing inside these generous section intervals.

At up to (1180px), split gaps tighten, branch padding becomes (32px), header contact and hero city list disappear. At up to (850px), the header becomes (82px), desktop links become a toggle and dropdown, section padding becomes (80px), care stacks into one column and the closing band stacks; explorers and FAQ still retain two columns.

At up to (600px), the gutter is (22px), header (76px), and section padding (65px). Service and branch explorers, approach, FAQ and form fields become single-column. Service tabs become horizontally scrollable bordered choices; branch tabs become a horizontal underlined row. Care options remain two columns. Hero image framing shifts below its text and the hero is constrained to (780–920px). A fixed bottom city/contact bar appears after the hero leaves view; safe-area inset is included in its padding and the footer reserves (100px) below. No content needs the pointer light to remain visible.

## Elevation & Depth

There are no box shadows in the built stylesheet. Depth comes from black/silver/red surface changes, one-pixel rules, image gradients and the masked photographic highlight. The hero has two gradient overlays and a brightened image duplicate behind a radial mask; the highlight is photographic light rather than a card glow.

**The Light Within Rule.** Keep the light reveal and photographic gradients inside image composition; interface surfaces use tonal separation and fine rules rather than box shadows.

## Shapes

Controls, information panels, tabs and chips have square corners. Thin rectangular strokes and underlines define interaction boundaries. The authentic shield retains its supplied silhouette. Small circular red separators belong to the brand strip; the square-control rule does not prohibit those native dots. Inline SVG icons use fine strokes and rounded stroke caps.

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

The service panel is a square black surface with an image above its (30px) text inset; its image scales to (1.035) on panel hover. Branch panels are square silver-gray fields with responsive padding (42 / 32 / 30 / 27px 24px). Neither uses a shadow.

### Inputs / Fields

Care fields are transparent on deep red, with white text and a half-opacity white bottom rule. Padding is (15px 0 12px). The optional vehicle input has a white caret in this section. Mobile text and select fields use (16px). Focus uses a white two-pixel outline with (3px) offset. The header city selector is a compact native dark select.

### Navigation

The supplied shield and wordmark anchor a quiet horizontal header. Desktop links reveal a red underline over (.4s); the compact menu uses two one-pixel lines rotating into a cross over (.3s). The mobile dropdown is flat panel black with ruled rows. Escape closes it and restores focus to the toggle; link selection, outside click and desktop resizing also close it.

### Service and branch tabs

Desktop choices are ruled lists. Selection turns text deep red, shifts it right (12px), and reveals an arrow; at intermediate widths service selection shifts (5px). Mobile service selection inverts to ink/white; branch selection uses a two-pixel deep-red underline. Arrow keys, Home and End update selection and focus; selected tabs alone remain in the ordinary tab sequence. Panel changes use (.45s) opacity, blur and (5px) vertical movement.

### Care choices

Squared checkbox tiles sit in a two-column grid with (10px) gaps, reducing to (8px) on mobile. Selected tiles invert to white/deep-red and rotate their plus SVG (45deg). Hover strengthens the border; keyboard focus remains visible on the actual checkbox. Selection updates a live summary and is carried into the editable WhatsApp enquiry.

### Disclosures and light behavior

FAQ rows use native details/summary, one-pixel rules and a plus SVG that rotates (45deg) on opening over (.5s). The hero image develops over (1.8s); heading and prose enter over (1.2s / 1.5s). Non-touch pointer movement updates the radial highlight through requestAnimationFrame; leaving fades it out over (.8s). The progress line repeats over (3s). Reduced-motion preference disables all animations, transitions, smooth scrolling and the pointer-light layer; mobile hides that layer too.

## Do's and Don'ts

### Do:
- **Do** preserve the supplied shield, black/red/silver identity and two-font relationship.
- **Do** retain square controls, visible keyboard focus and explicit selected states.
- **Do** preserve the responsive tab orientation, scrollable mobile choices and reduced-motion behavior.
- **Do** label generated illustrations visibly and preserve their provenance when replacing or reusing imagery.

### Don't:
- **Don't** present generated illustrations as completed client work.
- **Don't** substitute rounded pill controls or floating shadow cards for the built squared, flat components.
- **Don't** make pointer-following light or animation necessary to read content or complete a contact request.
