---
name: "AI进化调研员 Editorial System"
description: "A science-and-technology magazine design system pairing deep navy surfaces, warm orange and teal accents, and editorial serif-plus-sans typography for bilingual Chinese/English AI explainers."
---

## Overview

**AI进化调研员 (AI Evolution Researcher)** is an independent science-and-technology magazine and searchable knowledge archive. The interface feels rigorous like a researcher's notebook yet lively and inviting for curious readers arriving from WeChat or search engines.

The aesthetic is **Editorial Modernism**: generous whitespace, clear typographic hierarchy, tonal surface layering on deep navy in dark mode (and crisp off-white in light mode), and disciplined restraint—no marketing hero fluff, no particle backgrounds, no carousels, and no decorative illustrations competing with article cover imagery.

## Colors

The palette is anchored on a deep navy ground (`#0C1321`) in dark mode and a clean off-white ground (`#F9F9FF`) in light mode, with tonal surface containers stepping outward for hierarchy.

- **Primary (Orange):** Used for primary links, active indicators, reading progress, and key interactive highlights.
- **Secondary (Teal):** Used for secondary section accents, technical note markers, and subtle structural highlights.
- **Tertiary (Purple):** Used sparingly for category chips and taxonomy tags.
- **Neutral:** Deep navy surfaces in dark mode prevent pure-black halation while keeping body text comfortably above WCAG AA contrast.

```yaml
colors:
  light:
    primary: "#9D4300"
    on-primary: "#FFFFFF"
    primary-container: "#F97316"
    on-primary-container: "#582200"
    secondary: "#006B5F"
    on-secondary: "#FFFFFF"
    secondary-container: "#6DF5E1"
    on-secondary-container: "#006F64"
    tertiary: "#842BD2"
    on-tertiary: "#FFFFFF"
    tertiary-container: "#BE7BFF"
    on-tertiary-container: "#4C0084"
    error: "#BA1A1A"
    on-error: "#FFFFFF"
    error-container: "#FFDAD6"
    on-error-container: "#93000A"
    background: "#F9F9FF"
    on-background: "#151B2A"
    surface: "#F9F9FF"
    surface-dim: "#D3DAEE"
    surface-bright: "#F9F9FF"
    surface-container-lowest: "#FFFFFF"
    surface-container-low: "#F1F3FF"
    surface-container: "#E9EDFF"
    surface-container-high: "#E2E8FC"
    surface-container-highest: "#DCE2F6"
    on-surface: "#151B2A"
    surface-variant: "#FDDCCC"
    on-surface-variant: "#584237"
    outline: "#8C7164"
    outline-variant: "#E0C0B1"
    inverse-surface: "#2A3040"
    inverse-on-surface: "#EDF0FF"
    inverse-primary: "#FFB690"
  dark:
    primary: "#FFB690"
    on-primary: "#552100"
    primary-container: "#F97316"
    on-primary-container: "#582200"
    secondary: "#4FDBC8"
    on-secondary: "#003731"
    secondary-container: "#04B4A2"
    on-secondary-container: "#003F38"
    tertiary: "#DDB7FF"
    on-tertiary: "#490080"
    tertiary-container: "#BE7BFF"
    on-tertiary-container: "#4C0084"
    error: "#FFB4AB"
    on-error: "#690005"
    error-container: "#93000A"
    on-error-container: "#FFDAD6"
    background: "#0C1321"
    on-background: "#DCE2F6"
    surface: "#0C1321"
    surface-dim: "#0C1321"
    surface-bright: "#323949"
    surface-container-lowest: "#070E1C"
    surface-container-low: "#151B2A"
    surface-container: "#19202E"
    surface-container-high: "#232A39"
    surface-container-highest: "#2E3544"
    on-surface: "#DCE2F6"
    surface-variant: "#584237"
    on-surface-variant: "#E0C0B1"
    outline: "#A78B7D"
    outline-variant: "#584237"
    inverse-surface: "#DCE2F6"
    inverse-on-surface: "#2A3040"
    inverse-primary: "#9D4300"
```

## Typography

A three-voice editorial hierarchy: **Crimson Pro** brings magazine authority to the site masthead, section headings, and Latin display titles; **Lato** pairs with system Chinese fonts (`PingFang SC`, `Noto Sans SC`) for comfortable 17–18px reading at `1.8` line-height (max ~40 Chinese characters per line); and **Source Code Pro** handles dates, reading times, tags, and code snippets with tabular precision.

```yaml
typography:
  display-lg:
    fontFamily: "Crimson Pro"
    fontSize: 44px
    fontWeight: 700
    lineHeight: 54px
    letterSpacing: -0.5px
  display-lg-mobile:
    fontFamily: "Crimson Pro"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 38px
    letterSpacing: -0.25px
  headline-lg:
    fontFamily: "Crimson Pro"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 46px
    letterSpacing: -0.25px
  headline-lg-mobile:
    fontFamily: "Crimson Pro"
    fontSize: 26px
    fontWeight: 700
    lineHeight: 34px
    letterSpacing: 0px
  headline-md:
    fontFamily: "Crimson Pro"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 32px
    letterSpacing: 0px
  title-lg:
    fontFamily: "Lato"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 30px
    letterSpacing: 0px
  title-md:
    fontFamily: "Lato"
    fontSize: 18px
    fontWeight: 700
    lineHeight: 28px
    letterSpacing: 0px
  body-lg:
    fontFamily: "Lato"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 32px
    letterSpacing: 0px
  body-md:
    fontFamily: "Lato"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 26px
    letterSpacing: 0px
  body-sm:
    fontFamily: "Lato"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: 0px
  label-lg:
    fontFamily: "Lato"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
    letterSpacing: 0.1px
  label-md:
    fontFamily: "Source Code Pro"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.2px
  mono-sm:
    fontFamily: "Source Code Pro"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 18px
    letterSpacing: 0px
```

## Layout & Spacing

The layout uses a **Fixed-Max-Width Grid** (`1200px` outer container within a `1280px` desktop viewport, collapsing to single-column fluid flow on mobile) on an `8px` spacing scale. Article reading columns are capped around `40` Chinese characters (~`720px`) for effortless scanning.

```yaml
spacing:
  gutter-xs: 4px
  gutter-sm: 8px
  gutter-md: 16px
  gutter-lg: 24px
  gutter-xl: 32px
  section: 48px
  page-margin: 32px
```

## Elevation & Depth

Hierarchy relies on **tonal surface layering** rather than heavy drop shadows: `surface` (`#0C1321`) → `surface-container-low` (`#151B2A`) → `surface-container` (`#19202E`) → `surface-container-high` (`#232A39`), paired with subtle `1px` ghost borders (`outline-variant` at low opacity) to crisp up card edges. No neon glow blobs or glassmorphic blurs.

## Shapes

Clean, editorial corner radii: subtle `4px` on badges and chips, `12px` on article cards and category tiles, and `16px` on the featured hero container.

```yaml
rounded:
  sm: 4px
  DEFAULT: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
```

## Motion & Micro-interaction

Motion serves **navigation and reading only**: a thin top reading-progress bar, subtle hover color shifts on links and cards, and gentle card rise-in on scroll. No decorative loops, no carousels, and no layout-thrashing animations; all motion respects `prefers-reduced-motion`.

```yaml
motion:
  state-change:
    duration: 150ms
    delay: 0ms
    timingFunction: ease-out
  surface-enter:
    duration: 280ms
    delay: 0ms
    timingFunction: cubic-bezier(0.2, 0, 0, 1)
```

## Voice & Content Strategy

- **Tone of voice:** Rigorous, clear, and curious—explaining complex AI protocols and architectures in plain Simplified Chinese without hype or buzzwords.
- **Bilingual structure:** Primary UI, navigation, and explainer articles are in Simplified Chinese; the "Tech Notes" section uses concise, technical English titles and summaries.
- **Metadata formatting:** Dates use `YYYY-MM-DD` in monospace (`Source Code Pro`), paired with reading time (`阅读 8 分钟`).

## Components

Component implementations live as individual HTML sticker sheet files in
`components/`. Each file contains the canonical, styled HTML components with
`<!-- COMPONENT: name -->` comment markers. Read each file before use.

- **Button** → `@components/button.html`: `button-primary`, `button-icon`, `button-with-icon`
- **Card** → `@components/card.html`: `card-elevated`, `card-action`, `card-interactive`, `card-interactive-2`
- **Chip** → `@components/chip.html`: `chip-action`, `chip-input`, `chip-with-icon`
- **Typography** → `@components/typography.html`: `typography-display`, `typography-body`, `typography-label`
