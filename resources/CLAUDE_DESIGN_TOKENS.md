# Design System — Token Export

Auto-generated reference of the slate-navy Untitled UI design system. Use this file as the single source of truth when porting tokens to Tailwind, Stitches, Style Dictionary, or any other downstream system.

For machine-readable form see `design-tokens.json` next to this file.

---

## Brand color — Slate-navy

`brand-600` (`#2C3A4D`) is the primary brand color. All buttons, links, focus rings, and brand-tinted surfaces derive from this single scale.

| Token | Hex | Common use |
| --- | --- | --- |
| `brand-25`  | `#F6F8FA` | Page-level tints, hero washes |
| `brand-50`  | `#EDF1F5` | Selected row, banner background |
| `brand-100` | `#D9E0E9` | Hover-tint on tinted surfaces |
| `brand-200` | `#B0BDCC` | Borders of brand-tinted cards · dark-mode accent |
| `brand-300` | `#8595A8` | Focused input border |
| `brand-400` | `#5C6E85` | "Softer" primary preset |
| `brand-500` | `#3F5066` | "Lighter" primary preset · dark-mode primary button |
| `brand-600` | `#2C3A4D` | **Default primary button, link, focus** |
| `brand-700` | `#233040` | Hover state of primary |
| `brand-800` | `#1A2433` | Pressed / inverted-ink-on-tint |
| `brand-900` | `#131A26` | Ink on tinted background |
| `brand-950` | `#0A0F18` | Deepest accent (rare) |

**Presets** swap the brand mini-ramp for higher contrast where needed:

| Preset    | brand-300 | brand-600 | brand-700 | brand-800 |
| --------- | --------- | --------- | --------- | --------- |
| Default   | `#8595A8` | `#2C3A4D` | `#233040` | `#1A2433` |
| Lighter   | `#B0BDCC` | `#3F5066` | `#2C3A4D` | `#233040` |
| Softer    | `#B0BDCC` | `#5C6E85` | `#3F5066` | `#2C3A4D` |

## Neutrals — Tailwind v4 zinc

| Token | Hex | | Token | Hex |
| --- | --- | --- | --- | --- |
| `neutral-0`   | `#FFFFFF` | | `neutral-500` | `#737373` |
| `neutral-25`  | `#FAFAFA` | | `neutral-600` | `#525252` |
| `neutral-50`  | `#F5F5F5` | | `neutral-700` | `#404040` |
| `neutral-100` | `#F0F0F0` | | `neutral-800` | `#262626` |
| `neutral-200` | `#E5E5E5` | | `neutral-900` | `#171717` |
| `neutral-300` | `#D4D4D4` | | `neutral-950` | `#0A0A0A` |
| `neutral-400` | `#A3A3A3` | | | |

## Semantic colors

Each ramp keeps the same five rungs: `tint-50`, `tint-100`, `base-500`, `default-600`, `hover-700`.

| | 50 | 100 | 500 | 600 | 700 |
| --- | --- | --- | --- | --- | --- |
| **Success** (green) | `#ECFDF5` | `#D1FAE5` | `#10B981` | `#059669` | `#047857` |
| **Warning** (amber) | `#FFFBEB` | `#FEF3C7` | `#F59E0B` | `#D97706` | `#B45309` |
| **Error**   (red)   | `#FEF2F2` | `#FEE2E2` | `#EF4444` | `#DC2626` | `#B91C1C` |

## Semantic tokens

| Token | Light value | Dark value |
| --- | --- | --- |
| `fg-primary`     | `neutral-900` | `#FAFAFA` |
| `fg-secondary`   | `neutral-700` | `#D4D4D4` |
| `fg-tertiary`    | `neutral-500` | `#A3A3A3` |
| `fg-quaternary`  | `neutral-400` | `#737373` |
| `fg-disabled`    | `neutral-300` | `#525252` |
| `fg-brand`       | `brand-600`   | `brand-200` |
| `fg-on-brand`    | `#FFFFFF`     | `#FAFAFA` |
| `bg-primary`     | `#FFFFFF`     | `#0A0A0A` |
| `bg-secondary`   | `neutral-25`  | `#171717` |
| `bg-tertiary`    | `neutral-50`  | `#262626` |
| `bg-brand-secondary` | `brand-50` | `rgba(133,149,168,0.12)` |
| `bg-overlay`     | `neutral-950` | `#0A0A0A` |
| `border-primary` | `neutral-200` | `#404040` |
| `border-secondary` | `neutral-100` | `#262626` |
| `border-brand`   | `brand-300`   | `brand-400` |

Dark mode is activated with `[data-theme="dark"]` on `<html>` or `<body>`. The brand scale is shared across both themes.

---

## Typography

**Primary typeface:** Inter (300 / 400 / 500 / 600 / 700 / 800), loaded from Google Fonts.
**Mono:** JetBrains Mono (400 / 500 / 600). Substituted for Roboto Mono.

### Display scale

All display sizes use **letter-spacing −2%**, semibold (600) by default.

| Token | Size | Line height | Tracking |
| --- | --- | --- | --- |
| `display-2xl` | 72 px / 4.5 rem  | 90 px | −2% |
| `display-xl`  | 60 px / 3.75 rem | 72 px | −2% |
| `display-lg`  | 48 px / 3 rem    | 60 px | −2% |
| `display-md`  | 36 px / 2.25 rem | 44 px | −2% |
| `display-sm`  | 30 px / 1.875 rem| 38 px | −2% |
| `display-xs`  | 24 px / 1.5 rem  | 32 px | −2% |

### Body scale

Regular (400) by default, medium (500) for buttons + labels.

| Token | Size | Line height |
| --- | --- | --- |
| `text-xl` | 20 px / 1.25 rem  | 30 px |
| `text-lg` | 18 px / 1.125 rem | 28 px |
| `text-md` | 16 px / 1 rem     | 24 px |
| `text-sm` | 14 px / 0.875 rem | 20 px |
| `text-xs` | 12 px / 0.75 rem  | 18 px |

### Weights in use

| Weight | Name | Use |
| --- | --- | --- |
| 400 | Regular  | Body copy, captions |
| 500 | Medium   | Buttons, labels, links, nav items |
| 600 | Semibold | Headings, display, emphasized inline |
| 700 | Bold     | Rare — reserved for inline emphasis only |

Italics, all-caps, and serifs are not used.

---

## Spacing

4-pt base scale.

| Token | px | Common use |
| --- | --- | --- |
| `space-0`   | 0   | — |
| `space-0_5` | 2   | Hair gap |
| `space-1`   | 4   | Icon-text inline gap |
| `space-1_5` | 6   | — |
| `space-2`   | 8   | Tight inline gap |
| `space-3`   | 12  | Default control padding-y |
| `space-4`   | 16  | Default control padding-x |
| `space-5`   | 20  | — |
| `space-6`   | 24  | Card inner padding |
| `space-8`   | 32  | Between blocks |
| `space-10`  | 40  | — |
| `space-12`  | 48  | Between major blocks |
| `space-16`  | 64  | Between page sections |
| `space-20`  | 80  | Hero / page top |
| `space-24`  | 96  | Marketing section padding |
| `space-32`  | 128 | Hero on large screens |

**Spacing groupings**
- Inside components: **8 / 12 / 16**
- Between blocks: **24 / 32 / 48**
- Between page sections: **64 / 96**

## Radii

| Token | px | Use |
| --- | --- | --- |
| `radius-none` | 0     | Sharp / data tables |
| `radius-xxs`  | 2     | Tags |
| `radius-xs`   | 4     | Checkbox |
| `radius-sm`   | 6     | Tag with avatar, nav-item |
| `radius-md`   | 8     | **Buttons, inputs (default)** |
| `radius-lg`   | 10    | Tooltip, dropdown menu, icon tile |
| `radius-xl`   | 12    | **Cards (default)** |
| `radius-2xl`  | 16    | Modals, big cards |
| `radius-3xl`  | 20    | Hero illustrations |
| `radius-4xl`  | 24    | CTA banner, marketing hero card |
| `radius-full` | 9999  | Pills, avatars, switches |

## Shadows

| Token | Value (light) | Use |
| --- | --- | --- |
| `shadow-xs`  | `0 1px 2px 0 rgba(16,24,40,0.05)` | Resting surface (default) |
| `shadow-sm`  | `0 1px 2px 0 rgba(16,24,40,0.06), 0 1px 3px 0 rgba(16,24,40,0.10)` | Avatar circles, switch knob |
| `shadow-md`  | `0 2px 4px -2px rgba(16,24,40,0.06), 0 4px 8px -2px rgba(16,24,40,0.10)` | Hover state for cards / buttons |
| `shadow-lg`  | `0 4px 6px -2px rgba(16,24,40,0.03), 0 12px 16px -4px rgba(16,24,40,0.08)` | Popovers, dropdowns |
| `shadow-xl`  | `0 8px 8px -4px rgba(16,24,40,0.03), 0 20px 24px -4px rgba(16,24,40,0.08)` | Floating cards, "Most popular" plan |
| `shadow-2xl` | `0 24px 48px -12px rgba(16,24,40,0.18)` | Modals |
| `shadow-3xl` | `0 32px 64px -12px rgba(16,24,40,0.14)` | Hero / showcase |

Dark mode deepens each shadow's alpha to 0.30–0.60.

## Focus rings

| Token | Value | Use |
| --- | --- | --- |
| `ring-brand` | `0 0 0 4px rgba(44,58,77,0.22)` | Focused inputs, buttons |
| `ring-error` | `0 0 0 4px rgba(240,68,56,0.24)` | Error inputs |
| `ring-gray`  | `0 0 0 4px rgba(152,162,179,0.14)` | Neutral focus |

Focus is **always** a 4 px halo, never an outline.

---

## Component patterns

### Buttons

Heights: `sm 36 / md 40 / lg 44 / xl 48`. Default `radius-md` (8 px); `xl` uses `radius-lg` (10 px). All sizes use weight 600.

| Variant | Background | Border | Text | Hover | Pressed |
| --- | --- | --- | --- | --- | --- |
| **Primary**     | `brand-600` | `brand-600` | `#FFFFFF` | bg → `brand-700`, shadow → md | bg → `brand-900` |
| **Secondary**   | `#FFFFFF`   | `border-primary` | `fg-secondary` | bg → `neutral-50` | bg → `neutral-100` |
| **Tertiary**    | transparent | transparent | `fg-secondary` | bg → `neutral-50` | bg → `neutral-100` |
| **Destructive** | `error-600` | `error-600` | `#FFFFFF` | bg → `error-700` | — |
| **Link**        | transparent | none | `brand-700` | underline | — |

Default transition: `all 200–250ms cubic-bezier(0.2, 0, 0, 1)`. **No scale on hover or press** — color shift + shadow lift only.

### Cards

| Pattern | Background | Border | Shadow | Radius |
| --- | --- | --- | --- | --- |
| **Default**  | `#FFFFFF`     | `border-primary` (1 px) | `shadow-xs` | `radius-xl` (12) |
| **Elevated** | `#FFFFFF`     | none                    | `shadow-md` | `radius-xl` (12) |
| **Selected** | `brand-25`    | `brand-300` (1 px)      | none        | `radius-xl` (12) |
| **Empty**    | `bg-secondary`| `border-primary` (1 dashed) | none    | `radius-xl` (12) |
| **Modal**    | `#FFFFFF`     | none                    | `shadow-2xl`| `radius-2xl` (16) |
| **Hero**     | `#FFFFFF`     | `border-primary`        | `shadow-2xl`| `radius-2xl` (16) |

Default card body padding: 16 px on small cards, 20–24 px on medium, 32 px on plan cards. **No colored left-borders.**

### Form patterns

**Field anatomy:** label (500 14 px) → input → optional hint (400 13 px tertiary). Spacing between fields: 16–20 px.

**Input rest:**
- padding `10 px 14 px`, height `40 px`
- background `#FFFFFF`, border `border-primary`, radius `8 px`, shadow `shadow-xs`
- value text `400 14 px`, placeholder `fg-placeholder`

**Input focused:** border → `brand-300`, shadow → `shadow-xs, ring-brand`

**Input error:** border → `error-300`, shadow → `shadow-xs, ring-error`

**Checkbox / radio** — 16–18 px, `radius-xs` for checkbox, `radius-full` for radio. Selected fills with `brand-600` and shows a white check / 5 px brand inner ring.

**Toggle (switch)** — 36 × 20, knob 16 × 16. Off: `neutral-200`. On: `brand-600`. Transition: 200 ms cubic-bezier(0.2,0,0,1).

### Badges & pills

Pill anatomy: `padding 2px 8px`, `radius-full`, `font 500 12 px`, optional 6 × 6 colored dot at left. Each semantic role pairs tint-50 fill + 100/200 border + 700 text. Removable tags add a 12 × 12 `x` icon on the right inside a 4 px box.

### Iconography

Lucide (CDN), 24 × 24 nominal, **1.5 stroke**, round joins/caps, `currentColor` stroke. Common sizes inline: 14 / 16 / 18 / 20 / 24 px. No PNG/raster icons. No emoji in product UI.

---

## Responsive breakpoints

| Name    | Range       | Notes |
| ------- | ----------- | ----- |
| Mobile  | `≤ 767 px`  | Single column, sidebar → drawer, tables → stacked cards |
| Tablet  | `768–1023`  | Narrow sidebar (220 px), 2-col metric grids |
| Desktop | `≥ 1024`    | Full layout, 264 px sidebar, 4-col metrics, 1280 px marketing container |

### App dashboard rules (`@media max-width: 767px`)

- Sidebar → fixed 296 px drawer with backdrop-blur scrim; `transform: translateX(-100%)` at rest, `0` when `data-drawer="open"`.
- Sticky 56 px mobile-topbar with logomark + hamburger + bell.
- KPI metrics: 4 → 2 col, smaller font (22 px values, was 30 px).
- Table → stacked cards: each `<tr>` becomes a card; `<thead>` hidden; per-cell `::before` injects the column name ("Status", "Role", etc).
- Modal: width `calc(100vw − 32px)`, max 480 px.
- Pager: stack, two equal-width buttons.

### Marketing site rules (`@media max-width: 859px`)

- Header: nav links hidden, "Log in" hidden, hamburger button appears; mobile-drawer slides in from right (296 px).
- Hero H1: 60 → 36 px; CTAs full-width and stacked.
- Section padding: 96 → 56 px.
- Features grid: 3 → 1 col.
- Pricing grid: 3 → 1 col; "Most popular" stops elevating (`transform: none`).
- Footer grid: 5 → 1 col.
- CTA banner: padding 64 → 32 px, full-width-on-page with 16 px gutter, 16 px radius.

### Settings rules (`@media max-width: 767px`)

- Vertical tab bar → horizontal scrolling pill bar; sticky to top; active pill is brand-filled.
- Section rows: 280 / 1 fr grid → single column stack with 12 px gap.
- Team table: rows become flex-wrap cards; thead hidden.
- Invoice table: rows become 2-col grid with download spanning full width.
- Savebar: sticky to bottom of viewport.

### Auth rules (`@media max-width: 859px` → 600 px)

- Visual column hidden below 860 px.
- Below 600 px: inputs and buttons enforce 44 px minimum height (tap target), `auth-bottom` row stacks.

### Mobile tap targets

Minimum touchable area is **44 × 44 px** anywhere a finger is expected. This is enforced on form inputs, buttons, and switch toggles below 600 px.

---

## Motion

- **Duration:** `200–250 ms` for state changes, `300 ms` for drawer/menu transitions.
- **Easing:** `cubic-bezier(0.2, 0, 0, 1)` (near `ease-out-expo`). Use this for everything except spinners.
- **Enter:** `opacity 0 → 1` + `translateY(4 px → 0)`.
- **Exit:** reverse of enter.
- **Hover:** background shift one ramp step + shadow lift to next-step shadow.
- **Press:** background two ramp steps deeper, shadow back to xs.
- **Loading:** 1.2 s shimmer or 0.9 s border-arc spinner. Never bounce or pulse.
- **Never** scale on hover or press.

---

## Voice & copy

- Sentence case for UI labels, headlines, buttons.
- Second person ("you", "your").
- No emoji in product UI; marketing may use one ornamentally.
- Numbers numeric: "2,420 customers", "$99/mo", "320,000+ designers".
- Buttons are verbs: "Save changes", "Create account", "Delete project". Never "Submit", "OK".
- Errors are matter-of-fact: "Couldn't save changes — try again."
- Success is understated: "Settings saved."

---

## File map

| Source | What's in it |
| --- | --- |
| `colors_and_type.css`         | Authoritative CSS variables (light + dark) |
| `design-tokens.json`          | Machine-readable mirror of this doc |
| `DESIGN_TOKENS.md`            | This file |
| `assets/`                     | Logomark, wordmark, customer logos |
| `preview/*.html`              | Token specimens shown in the Design System tab |
| `ui_kits/{app,web,auth,settings}/` | Working hi-fi recreations with Tweaks panel |
