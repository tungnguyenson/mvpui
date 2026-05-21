# Token Registry — MVP UI

Source of truth for which semantic tokens exist and which are proposed.
Shipped tokens live in `src/tokens.css` + `src/theme.css`. This file tracks
**proposals** so parallel component sessions don't collide on names (A3).

## Policy (A3)

A component needs a token not in `@mvp-ui/tokens`?

1. Add a row to **Proposed** below (name, value light, value dark, why, component).
2. Confirm with Tung before editing `tokens.css` / `theme.css`.
3. Once shipped, move the row to **Shipped log** with the commit SHA.

Target: most components add **zero** new tokens — translate via
`TOKEN_TRANSLATION.md` first. Only propose when no existing semantic alias fits.

## Proposed

| Token | Light | Dark | Why | Component | Status |
|---|---|---|---|---|---|
| _(none)_ | | | | | |

Wave 1.5 (CloseButton, ButtonUtility, SocialButton): **no new tokens** — all
needs covered by existing aliases via `TOKEN_TRANSLATION.md`.

## Shipped log

| Token | SHA | Component |
|---|---|---|
| `--color-tag-{c}-{bg,border,fg,accent}` for c ∈ {gray, brand, error, warning, success, slate, sky, blue, indigo, purple, pink, orange} (48 tokens × 2 modes) | _pending_ | Badge, BadgeWithDot, BadgeIcon, BadgeWithButton |

### Tag/Badge surfaces — design intent

Each color exposes a 4-slot semantic set that flips in `[data-theme="dark"]`:

| Slot | Light | Dark | Used for |
|---|---|---|---|
| `bg` | `-50` | `-950` | badge fill |
| `border` | `-200` | `-800` | ring + addonButton hover bg |
| `fg` | `-700` | `-300` | label text + addonButton hover text |
| `accent` | `-500` | `-400` | dot, leading/trailing icon, addonButton resting text |

Decorative colors (slate, sky, blue, indigo, purple, pink, orange) get a raw
ramp in `tokens.css` (50/100/200/300/400/500/700/800/950) so they can be
swapped centrally if the palette shifts. brand/gray/success/warning/error
re-use existing ramps.

Why a separate `tag-` namespace instead of reusing `info-bg`/`success-bg`/etc:
those status tokens own a *meaning* (info, warning, error) — Badge color
choices are often editorial (categories, tags), not status. Keeping them
distinct lets `success` status surfaces evolve independently from `success`
badge surfaces if needed.
