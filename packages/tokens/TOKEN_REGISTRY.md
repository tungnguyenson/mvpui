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
| _(none yet — full set is the original tokens.css)_ | | |
