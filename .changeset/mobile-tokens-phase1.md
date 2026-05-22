---
"@mvp-ui/tokens": minor
"@mvp-ui/ui": minor
---

Mobile adaptation — Phase 1 (foundation)

**Tokens (`@mvp-ui/tokens`):**

- New opt-in `mobile.css` export. Imports after `theme.css` to apply `(max-width: 767px)` overrides on the Tailwind v4 design scale.
  - `--spacing: 0.25rem → 0.27rem` (+8%): scales every numeric utility (`p-*`, `m-*`, `gap-*`, `h-*`, `w-*`, `size-*`) automatically.
  - Typography bump: `text-xs 12 → 13px`, `text-sm 14 → 16px` (iOS no-zoom floor on form fields), `text-md 16 → 17px`, `text-lg 18 → 19px`.
  - Radius and shadow held constant (brand identity, not touch-related).
- New safe-area utilities: `pt-safe`, `pr-safe`, `pb-safe`, `pl-safe`, `px-safe`, `py-safe`, plus composable `pb-safe-or-*` / `pt-safe-or-*` that stack `env(safe-area-inset-*)` onto a base spacing scale.

**Components (`@mvp-ui/ui`):**

- Touch-target floor `min-h-11 md:min-h-0` + `touch-manipulation` added to Button, Input, Select trigger, Tab, and SidebarNav rows so interactive surfaces hit 44 px on mobile (WCAG 2.5.5 AAA).
- `SlimNavButton`: `size-10 → size-11 md:size-10` to match touch floor.
- Link-variant buttons (`link-color`, `link-gray`, `link-destructive`) opt out of the min-height floor via `min-h-0!` to stay inline with surrounding text.
- Reverted earlier per-component mobile flips on SidebarNav (`text-base md:text-sm`, `py-3 md:py-2`, `gap-1 md:gap-0.5`, `text-sm md:text-xs`) — superseded by the token-level scaling. Components return to single-class utilities while still rendering bigger on mobile via the scaled tokens.

**Consumer apps:**

- `apps/staffing-saas` opts in to `@mvp-ui/tokens/mobile.css` and switches `h-screen → h-dvh` on AppShell + login page. `Viewport.viewportFit = "cover"` added to enable iOS notch / home-indicator safe-area handling.

See `docs/mobile_sizes.md` for the full plan, decisions, and follow-up phases.
