---
name: Bernard Lim Portfolio
description: The Monograph Folio — Architectural Systems & Mobile Engineering Specimen
colors:
  bg: "#090a0d"
  surface: "#16181f"
  surface-hover: "#1e212b"
  surface-active: "#242834"
  border: "#232732"
  border-strong: "#333847"
  text: "#f5f5f3"
  text-muted: "#9ba1b0"
  text-faint: "#858ca0"
  accent-live: "#22c55e"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "3.4rem"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "2.4rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Instrument Sans, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Instrument Sans, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "10px"
  pill: "9999px"
spacing:
  sm: "8px"
  md: "14px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.text}"
    textColor: "{colors.bg}"
    rounded: "{rounded.sm}"
    padding: "8px 18px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "8px 18px"
---

# Design System: Bernard Lim Portfolio

## Overview

**Creative North Star: "The Architectural Monograph Folio"**

A strictly monochromatic, single-viewport editorial system inspired by high-end architectural monographs and patent folios. Built for elite technical recruiters and engineering managers, the surface communicates tier-1 software engineering craftsmanship (Faire iOS and Ford Android Automotive) within 30 to 60 seconds with zero required scrolling.

The system relies on high typographic contrast, generous negative space (*ma*), hairline architectural divisions, and kinetic GSAP choreography that reinforces systems discipline rather than gratuitous visual noise.

**Key Characteristics:**
- Strictly monochromatic palette with obsidian canvas, warm chalk typography, and restrained status accents.
- Zero-scroll desktop architecture fitting comfortably within 100vh.
- Asymmetrical two-column spread: left editorial masthead and live hardware specimen bay; right curated career ledger.
- Purposeful GSAP motion: orchestrated entrance lines, magnetic micro-physics, and smooth exhibit crossfades.

## Colors

The palette is rigorously restrained to neutral grayscale tones, letting production artifacts and high-caliber typography lead.

### Primary
- **Warm Chalk Text** (`#f5f5f3`): Primary typography, high-contrast headlines, and active control borders.
- **Obsidian Ground** (`#090a0d`): Deep, non-distracting canvas ground providing maximum contrast.

### Secondary
- **Live Status Emerald** (`#22c55e`): Used exclusively for live status indicators (e.g., current co-op status and clipboard copy confirmations).

### Neutral
- **Slate Surface** (`#16181f`): Background for interactive ledger rows, cards, and pill badges.
- **Surface Hover** (`#1e212b`): Subtle elevation for hovered interactive elements.
- **Architectural Hairline** (`#232732`): 1px structural boundaries dividing masthead, workspace columns, and footer.
- **Muted Body Text** (`#9ba1b0`): Body paragraphs, secondary metadata, and descriptions (WCAG AAA compliant ≥ 4.5:1).
- **Technical Faint** (`#858ca0`): Monospaced technical labels, timestamps, and indexing numerals.

### Named Rules
**The Single-Accent Restraint Rule.** Color is never used as decoration or background fill. Aside from the single 6px emerald status dot, all surfaces, borders, and text remain strictly monochromatic.

## Typography

**Display Font:** Instrument Serif (Roman)
**Body Font:** Instrument Sans
**Label/Mono Font:** JetBrains Mono

**Character:** A sophisticated balance of literary authority and technical precision—pairing the classical bookplate proportions of Instrument Serif with the clarity of Instrument Sans and the tabular discipline of JetBrains Mono.

### Hierarchy
- **Display** (Roman 400, clamp(38px, 4.4vw, 54px), line-height 1.02): Primary hero masthead headline ("Systems & mobile engineering craft").
- **Headline** (Semi-bold 600, 20px, line-height 1.2): Exhibit titles in specimen bay.
- **Title** (Semi-bold 600, 15px, line-height 1.3): Ledger row company titles.
- **Body** (Regular 400, 13px–13.5px, line-height 1.55, max-width 580px): Overview summary and technical project descriptions.
- **Label** (Regular 400, 11px–12px, letter-spacing 0.04em–0.08em): Monospaced dates, index numbers, technology chips, and system status tags.

### Named Rules
**The No-Italic Display Cliche Rule.** Display headings are set in upright Roman weights rather than oversized italic serif cliches, maintaining timeless editorial gravitas.

## Layout

A fixed single-viewport edge-to-edge architectural layout on desktop (`100dvh`, `overflow: hidden`).

- **Masthead** (58px height, 40px horizontal padding): Locks brand identity, current availability, and theme controls.
- **Workspace Grid**: Asymmetrical two-column grid (`1.25fr 1px 0.85fr`).
  - Left column: Editorial headline block and live interactive specimen bay.
  - Middle: 1px continuous architectural vertical hairline rule.
  - Right column: Curated 4-row experience ledger and technical capabilities box.
- **Anchored Footer** (52px height, 40px horizontal padding): Location metadata, external profile links, and copyright.
- **Responsive Adaptation**: Viewports ≤ 1024px transition smoothly from fixed single-viewport to elegant fluid vertical scrolling.

## Elevation & Depth

Surfaces are intentionally flat and architectural, deriving depth from tonal layering, hairline contrast, and real hardware chassis geometry rather than artificial drop shadows or blurry glow halos.

### Shadow Vocabulary
- **Chassis Elevation** (`box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45)`): Applied to physical hardware mockups (iPhone brushed titanium frame and automotive display) to create tangible object presence.
- **Active Ledger Glow** (`box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15)`): Subtle tonal lift on selected experience rows.

### Named Rules
**The Halo Prohibition Rule.** Zero-offset colored glow halos (`box-shadow: 0 0 Xpx #color`) are strictly forbidden. Depth must be conveyed through tonal stepping and physical specimen geometry.

## Shapes

- **Base Radius:** 4px (`--radius-sm`) for chips, buttons, and skill cards; 6px (`--radius-md`) for ledger rows; 34px for the contoured iPhone 18 Pro chassis.
- **Pills:** 9999px for status indicators and theme toggle controls.
- **Borders:** 1px solid hairlines throughout.

## Components

### Buttons
- **Shape:** 4px radius (`--radius-sm`).
- **Primary Action (Resume):** High-contrast filled chalk text (`#f5f5f3`) on dark ground, transforming subtly on hover (`translateY(-1px)`).
- **Secondary Action (Copy Email):** Tonal surface button with monospaced text and tactile GSAP copy feedback.

### Curated Experience Ledger Rows
- **Shape:** 6px radius (`--radius-md`), 1px hairline border.
- **Behavior:** Interactive select rail acting as navigation for the specimen bay. Hovering or clicking smoothly transitions the active exhibit and highlights the active indicator marker.

### Specimen Display Bay
- **Exhibits:** 4 coordinated exhibits (Faire iOS, Ford Android Automotive, Priority Dynamics, ElementsAR).
- **Hardware Plates:** Features an authentic brushed titanium iPhone frame with auto-playing video and an automotive CarPlay infotainment console.

## Do's and Don'ts

### Do:
- **Do** maintain a strict 100vh single-viewport desktop experience where all essential qualifications are visible without scrolling.
- **Do** ensure all functional text meets or exceeds the 11px legibility floor and passes WCAG AAA contrast (≥ 4.5:1).
- **Do** orchestrate animations through GSAP with purposeful, unified easing (`expo.inOut` and `power3.out`).
- **Do** allow immediate keyboard accessibility (`Tab`, `Enter`, `Space`) across all interactive rows and controls.

### Don't:
- **Don't** add decorative rainbow gradients, emojis, or neon glow halos.
- **Don't** use generic card containers or kickers above headings.
- **Don't** introduce extraneous scrollbars or uncontained overflow on desktop screens.
