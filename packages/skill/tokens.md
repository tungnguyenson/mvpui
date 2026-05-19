# MVP UI — Token System

## Golden rule

**Always use semantic aliases. Never use raw scale tokens in component files.**

Raw scale tokens (`gray-900`, `brand-600`, `bg-white`) are available in Tailwind but do **not** flip under `[data-theme="dark"]`. Semantic aliases do.

Violation is caught by `pnpm lint:dark`.

## Key references

- Full token list: `packages/tokens/src/tokens.css`
- Dark overrides: `packages/tokens/src/theme.css` (under `[data-theme="dark"]`)
- Proposals/shipped log: `packages/tokens/TOKEN_REGISTRY.md`
- Untitled UI → MVP UI mapping: `packages/tokens/TOKEN_TRANSLATION.md`

## Semantic alias groups

### Surfaces
| Token | Use |
|---|---|
| `bg-bg` | Page / primary surface |
| `bg-bg-secondary` | Recessed panel, sidebar |
| `bg-bg-tertiary` | Deeply recessed, input fill |
| `bg-primary` | Brand action fill |
| `bg-primary-hover` | Brand action hover |
| `bg-primary-active` | Brand action active/pressed |

### Text
| Token | Use |
|---|---|
| `text-fg` | Primary body text |
| `text-fg-secondary` | Secondary / supporting text |
| `text-fg-tertiary` | Placeholder, caption |
| `text-fg-quaternary` | Disabled / deemphasised |
| `text-fg-brand` | Brand-colored inline text |
| `text-fg-error` | Error inline text |
| `text-fg-success` | Success inline text |
| `text-primary-fg` | Text on `bg-primary` surfaces |

### Borders
| Token | Use |
|---|---|
| `border-border` | Default border |
| `border-border-secondary` | Subtle divider |
| `border-border-brand` | Brand-accented border |
| `border-border-error` | Error state border |
| `border-border-success` | Success state border |

### Status backgrounds
| Variant | bg | border | fg |
|---|---|---|---|
| info | `bg-info-bg` | `border-info-border` | `text-info-fg` |
| success | `bg-success-bg` | `border-success-border` | `text-success-fg` |
| warning | `bg-warning-bg` | `border-warning-border` | `text-warning-fg` |
| error | `bg-error-bg` | `border-error-border` | `text-error-fg` |

### Neutral chips / badges
| Token | Use |
|---|---|
| `bg-neutral-bg` | Neutral badge background |
| `border-neutral-border` | Neutral badge border |

### Focus rings
Alpha rings are allowed: `ring-brand-500/22` (not banned — purely additive).

## Adding a new token

1. Add a row to `TOKEN_REGISTRY.md` Proposed table.
2. Add the property to `tokens.css` (`:root`) and its dark override to `theme.css` (`[data-theme="dark"]`).
3. Re-run `pnpm --filter @mvp-ui/tokens build`.
4. Move registry row to Shipped with commit SHA.

Never add new tokens without both light and dark values.
