# Mobile Adaptation Plan

Goal: native-feel touch UI without forking components. Desktop unchanged.

Status: draft / planning. Owner: design system.

## TL;DR

- Single source of truth: Tailwind v4 `@theme` tokens in `packages/tokens/src/theme.css`.
- Add a mobile breakpoint override block that flips scale tokens (`--spacing`, `--text-*`, line-height, optionally radius).
- Layer on per-component mobile floors (touch target 44px, font 16px in inputs to block iOS zoom).
- Adapt overlays, navigation, and dense layouts (tables) to mobile-native patterns.

Breakpoint contract: `mobile = max-width: 767px` (matches Tailwind `md:`).

---

## 1. Scale tokens (foundation)

Override design tokens at `(max-width: 767px)` so utilities scale themselves.

### Spacing

| Token | Desktop | Mobile | Effect |
|---|---|---|---|
| `--spacing` | `0.25rem` | `0.28rem` | All `p-*`, `m-*`, `gap-*`, `h-*`, `w-*`, `size-*` scale ~+12% |

Tailwind v4 derives every numeric utility from `--spacing`. Touching this one variable = entire spacing/sizing scale flips.

### Typography

| Token | Desktop | Mobile |
|---|---|---|
| `--text-xs` | `0.75rem` (12px) | `0.8125rem` (13px) |
| `--text-sm` | `0.875rem` (14px) | `1rem` (16px) ← unlocks iOS no-zoom |
| `--text-md` / `--text-base` | `1rem` | `1.0625rem` (17px) |
| `--text-lg` | `1.125rem` | `1.1875rem` |
| `--text-xl`+ | unchanged or fluid `clamp()` |

Body text and form fields **must hit 16px on mobile** to prevent iOS Safari auto-zoom on focus.

### Line height + letter spacing

- Body line-height bump: `1.5` → `1.55` mobile (small screens need more breathing).
- Heading tracking: tighten slightly (`-0.01em`) — small headings read denser on mobile.

### Radius

Hold radius constant (`--radius-*`) — scaling cards too round breaks visual identity. Optional: bump `--radius-sm` only.

### Shadow

Hold constant. Shadows shouldn't scale.

---

## 2. Touch target floors (component layer)

Tokens alone don't guarantee 44px. Components carrying `sm` size variant can still be under-spec on mobile.

### Hard floor rules

- Interactive elements (button, input, select, link, icon button, tab, nav item, switch, checkbox-row, list item): `min-h-11` (44px) mobile.
- Icon-only buttons: `min-w-11 min-h-11` mobile.
- Tap surface must extend to visible bounds — no decorative wrappers absorbing taps.

### Component-by-component

| Component | Mobile adjustment |
|---|---|
| Button (`sm`) | `min-h-11 md:min-h-9`, body text 16px |
| Input | `min-h-11 md:min-h-10`, text 16px floor, `inputmode` set per type |
| Textarea | min 3 rows mobile, font 16px |
| Select / Combobox | `min-h-11 md:min-h-10`, bottom-sheet picker pattern |
| Checkbox / Radio row | row `min-h-11`, label is hit target |
| Switch | `size-11` hit area; visual stays current size |
| Tabs | tab `min-h-11`, scroll-snap horizontal on overflow |
| SidebarNav item | `py-3 md:py-2`, `text-base md:text-sm` (✅ done) |
| Dropdown menu item | `min-h-11` |
| Pagination button | `min-w-11 min-h-11` |
| Date picker day cell | `min-w-11 min-h-11` |

---

## 3. Layout & containers

### Page gutters

| Surface | Desktop | Mobile |
|---|---|---|
| Page horizontal padding | `px-8` | `px-4` |
| Section vertical rhythm | `py-12` | `py-8` |
| Card padding | `p-6` | `p-4` |
| Modal padding | `p-6` | `p-4` |

### Header height

Desktop `h-16` (64px). Mobile `h-14` (56px) — keep above-fold space. Sticky on scroll.

### Bottom-zone CTAs

Primary actions in detail/edit forms move to a sticky bottom bar on mobile (thumb zone):
```tsx
<div className="md:hidden fixed inset-x-0 bottom-0 bg-bg border-t border-border p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
  <Button size="lg" className="w-full">Save</Button>
</div>
```

### Safe area insets

- Top: notch handling on full-screen drawers, modals.
- Bottom: home indicator (iOS). Use `pb-[env(safe-area-inset-bottom)]` on any sticky bottom element.
- Set `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />`.

### Viewport height units

Replace `h-screen` (100vh) with `h-dvh` (dynamic viewport) for full-screen surfaces — accounts for mobile browser chrome appearing/disappearing.

---

## 4. Navigation patterns

### Sidebar → Drawer

Already implemented (Drawer + SidebarNavCollapsible). Confirm full-height `h-dvh` on drawer panel.

### Top bar

- Search → bottom-sheet on mobile (full-width input, keyboard auto-opens). Expose as `<AppShell.Header.Search>` slot.
- Breadcrumb → collapsed to current page only on mobile.
- Avatar menu → bottom-sheet not popover (easier reach).

### Tabs

Horizontal scroll-snap when overflowing. Active tab auto-scrolls into view.

### Sticky pattern

Top bar + section heading can stick. Bottom bar can stick. Avoid both AND a sticky table header — too much chrome on small screens.

---

## 5. Overlays

| Overlay | Desktop | Mobile |
|---|---|---|
| Modal | centered card, max 600px | full-screen sheet, slides up |
| Drawer (side) | right/left panel | full-screen or 90% width |
| Popover | anchored | bottom-sheet |
| Tooltip | hover-triggered | tap-toggled or skip entirely |
| Toast | top-right | bottom, above safe-area |
| Confirm dialog | centered | bottom-sheet with stacked CTAs |

### Scroll lock

Body scroll must lock when any overlay opens. Use `overflow:hidden` on `<html>` + position lock to prevent rubber-band on iOS.

---

## 6. Forms

### Stacking

- Two-column desktop forms → single column mobile.
- Labels above input (never beside) on mobile.
- Field gap `gap-4 md:gap-5`.

### Keyboard

- Set `inputmode="numeric|tel|email|decimal|url"` on appropriate fields.
- Set `autocomplete` for browser autofill (`email`, `current-password`, `street-address`, etc).
- Set `enterkeyhint="next|done|search"` for soft keyboard action button.
- On focus, scroll field into view above keyboard (`scrollIntoView` with `block: 'center'`).

### Visual viewport

Forms with sticky CTAs: subscribe to `visualViewport` to push CTA above the on-screen keyboard.

### Error placement

Inline below field. Keep visible even with keyboard open.

---

## 7. Data density

### Tables → Cards

Desktop tables don't fit mobile. Default pattern:
- `md:hidden` card list (1 card per row, key-value rows inside)
- `hidden md:table` data table

OR use horizontal scroll with sticky first column for sparse tables.

### Lists

- Desktop: dense list (`py-2`)
- Mobile: expanded list with chevron-right affordance (`py-4`), entire row tap target.

### Charts

- Reduce data density (fewer ticks, larger touch targets on data points).
- Disable hover tooltips → tap-only on mobile.

---

## 8. Interaction states

### Hover removal

`hover:` styles do nothing on touch. Don't hide critical actions behind hover.
Use `@media (hover: hover)` to gate hover affordances:
```css
@media (hover: hover) {
  .row:hover .row-actions { opacity: 1; }
}
.row .row-actions { opacity: 1; } /* touch: always visible */
```

### Focus ring

Mobile: keyboard focus rare but still required (Bluetooth keyboards, external). Keep current ring. Don't thicken further — wastes pixels.

### Long-press / context menu

Optional pattern for power users. Don't depend on it for primary actions.

### Active state

Add `active:scale-[0.98]` or `active:bg-bg-tertiary` for tactile feedback on tap.

---

## 9. Icons & glyphs

Tokens override scales `size-*`. Icons set with `size-4/5/6` scale free. Watch for:
- Decorative icons that should stay small even on mobile (set with arbitrary px → escape scaling).
- Brand logo: explicit width/height, doesn't scale.

---

## 10. Motion

- Respect `prefers-reduced-motion: reduce`.
- Mobile: lean on hardware-accelerated transforms only (`translate`, `opacity`). No layout-triggering animations.
- Drawer/sheet entrance: 250ms ease-out. Snappier than desktop (mobile expects responsiveness).
- Disable parallax / scroll-tied animation on mobile (CPU/battery).

---

## 11. Images & media

- `loading="lazy"` for below-fold.
- Mobile-specific sources via `srcset` / `<picture>` when image is hero/feature.
- Aspect-ratio reservation (`aspect-[16/9]`) to prevent CLS.

---

## 12. iOS / Android quirks

| Quirk | Fix |
|---|---|
| Auto-zoom on input focus (< 16px text) | Body input `text-base` floor mobile |
| 100vh includes URL bar | Use `100dvh` |
| Rubber-band scroll past sticky | `overscroll-behavior: contain` on scrollable containers |
| Tap delay on iOS | `touch-action: manipulation` on buttons |
| Pull-to-refresh hijacks app | `overscroll-behavior-y: contain` on `<body>` for app shells |
| Notch covers content | `viewport-fit=cover` + safe-area-insets |
| iOS double-tap zoom | `touch-action: manipulation` on interactive |
| Form date input ugly | Use react-aria Calendar in bottom-sheet, hide native |

---

## 13. Accessibility on mobile

- Tap targets ≥ 44×44px (WCAG 2.5.5 AA = 24px, 2.5.5 AAA = 44px — we target AAA).
- Spacing between tap targets ≥ 8px.
- Text contrast unchanged (WCAG AA).
- Pinch-to-zoom must NOT be disabled (`user-scalable=no` is banned).
- Orientation: support landscape; lock only if absolutely justified.

---

## 14. Performance on mobile

- Mobile network = slower. Audit bundle: < 150kb JS gzipped (matches global rule).
- Defer below-fold images, defer heavy charts.
- Throttle scroll listeners (`requestAnimationFrame`).
- Test on real low-end device (or Chrome DevTools mobile + 4G throttle).

---

## 15. Implementation order

1. **Phase 1 — Foundation** (one PR)
   - Add mobile `@media` override in `packages/tokens/src/theme.css` for `--spacing`, `--text-*`, line-height
   - Revert ad-hoc mobile utility flips already shipped (SidebarNav `py-3 md:py-2`, `text-base md:text-sm`, `gap-1 md:gap-0.5`) — superseded by token-level scaling. Keep `min-h-*` touch-target floors (token bump alone won't hit 44px).
   - Set `text-base` floor on Input/Textarea components mobile
   - Add `min-h-11` floor on Button, Input, Select, Tab triggers, nav items
   - Add safe-area utilities to globals
   - Switch `h-screen` → `h-dvh` in app shells
2. **Phase 2 — Layout patterns**
   - Page gutters via responsive Container component
   - Header `h-14 md:h-16`
   - Sticky bottom-CTA pattern for forms
3. **Phase 3 — Overlays**
   - Modal → full-screen sheet on mobile (or use Drawer)
   - Tooltip behavior on touch
   - Popover → bottom-sheet variant
4. **Phase 4 — Density**
   - Table → card migration on listing pages
   - Tab horizontal-scroll
5. **Phase 5 — Polish**
   - Hover gating via `@media (hover: hover)`
   - `touch-action: manipulation` on interactive
   - Active states for tactile feedback

Each phase = changeset minor bump. Visual QA after each.

---

## 16. Risks

- `--spacing` override scales everything — including icon `size-*`. Decide per-icon whether scaling is desired.
- Existing pages may rely on tight desktop dimensions (compact tables, dense forms). Audit listing pages first.
- Components with hardcoded px sizing (`size-[20px]`) won't scale. `CLAUDE.md` already bans these but check for legacy.
- Hero typography (`text-5xl`+) may need responsive overrides (`text-4xl md:text-5xl`) — auto-scale via tokens may overshoot.

---

## 17. Out of scope

- App-shell rewrites (Drawer/AppShell architecture already in place; mobile sizing flows through tokens, not shell refactor).
- Per-component ad-hoc utility flips (e.g. our earlier SidebarNav `py-2 → py-3 md:py-2` patch). Equivalent of bumping a variant from `sm` to `md` element-by-element. Token-level approach in §1 supersedes this — once `--spacing` and `--text-*` flip at mobile breakpoint, utilities scale free. Existing ad-hoc patches become candidates for revert during Phase 1 cleanup.
- New component variants for "mobile-only" surfaces — strive for one component, mobile-aware.
- Native mobile app (React Native / Expo). This plan is responsive web only.

---

## 18. Decisions

- **Breakpoint:** Single cutoff at `md` (767px). No `xs` tier. Tailwind v4 default `md:` boundary acts as touch/desktop divider. Per-surface `max-[480px]:` overrides allowed as escape hatch later.
- **Radius:** Stays constant. Radius = brand identity, not touch concern. Scaling rounds corners ~12% larger on mobile for no UX gain.
- **JS exposure:** No. CSS only. Components needing runtime values use `matchMedia('(max-width: 767px)')` + local constant. Single source of truth stays in tokens CSS.
- **Per-app override:** No, shared scale. Consistency goal. Apps may locally override `--spacing` in their own `globals.css` (specificity escape hatch) but not formalized.
- **Opt-in vs opt-out:** Opt-in via `@import "@mvp-ui/tokens/mobile.css"`. Each consuming app explicitly imports. Avoids surprising existing apps. staffing-saas opts in immediately; other apps opt in when ready.
- **Scale magnitude:** Start at **+8%** (`--spacing: 0.27rem` from `0.25rem`; `--text-sm: 0.9375rem` from `0.875rem`; etc.). Visual QA after Phase 1. Bump to +12% only if confirmed too small. Easier to scale up than walk back.
- **Phase 1 atomicity:** Token bump + `min-h-11` touch floors ship together. Token bump alone leaves inputs at ~38px (under 44px AAA target). Half-fixed mobile is worse than current state.
