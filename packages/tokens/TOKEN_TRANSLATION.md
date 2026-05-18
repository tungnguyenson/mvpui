# Token Translation — Untitled UI → MVP UI

Untitled UI React source uses Untitled's own token names. This table maps them
to MVP UI semantic tokens (`@mvp-ui/tokens`). Authoritative — do **not** guess
inline during component adaptation. Grow this table per wave.

## ⚠️ Inversion hazard (read first)

Untitled and MVP UI use the word "primary" for **opposite** things:

| Untitled term | Means | MVP UI equivalent |
|---|---|---|
| `bg-primary` | primary **surface** (white in light) | `bg-bg` |
| `bg-secondary` | secondary surface | `bg-bg-secondary` |
| `bg-brand-solid` | brand action fill | `bg-primary` |
| `text-primary` | primary **text** | `text-fg` |

Never copy an Untitled `*-primary` class verbatim. Always resolve via this table.

## Seed (A2)

| Untitled | MVP UI | Category |
|---|---|---|
| bg-primary | bg | background (surface) |
| bg-secondary | bg-tertiary | background |
| bg-brand-solid | bg-primary | background (brand fill) |
| bg-brand-solid_hover | bg-primary-hover | background |
| bg-error-solid | bg-error-600 | background |
| text-primary | fg | text |
| text-secondary | fg-secondary | text |
| text-tertiary | fg-tertiary | text |
| text-brand-secondary | fg-brand | text |
| text-error-primary | fg-error | text |
| text-success-primary | fg-success | text |
| border-primary | border | border |
| border-secondary | border-secondary | border |
| border-error_subtle | border-error | border |
| border-success_subtle | border-success | border |
| fill-fg-tertiary | text-fg-tertiary | fill (icon) |
| fill-brand-secondary | text-fg-brand | fill (icon) |

## Wave 1.5 — Button family (CloseButton, ButtonUtility, SocialButton)

| Untitled | MVP UI | Note |
|---|---|---|
| text-fg-quaternary | text-muted-fg | lowest-emphasis icon/text (no quaternary token in MVP) |
| text-fg-quaternary_hover | text-fg-tertiary | hover lift one step |
| text-secondary_hover | text-fg | secondary text hover lift |
| bg-primary (surface) | bg-bg | utility/social button surface — **inversion** |
| bg-primary_hover | bg-bg-tertiary | surface hover (same as Button tertiary hover) |
| ring-primary | ring-border | inset 1px ring |
| shadow-xs-skeuomorphic | shadow-xs | no skeuomorphic token; collapse to shadow-xs |
| outline-focus-ring (outline-based) | ring-4 ring-brand-500/22 | MVP focus is box-shadow ring, not CSS outline |
| stroke-fg-disabled / text-fg-disabled | text-fg-disabled | exists in MVP |
| text-fg-white/70 (CloseButton dark theme) | text-fg-on-brand/70 | on-color tone, see CloseButton `tone` prop |
| hover:bg-white/20 (CloseButton dark theme) | hover:bg-fg-on-brand/20 | on-color tone hover |

### Mode-independent brand colors (kept raw, `dark-ok` comment required)

SocialButton brand fills are part of each provider's identity — they do **not**
flip with theme. Keep the raw value, annotate with `dark-ok` on the same line:

| Class | Provider | Reason |
|---|---|---|
| `bg-black text-white` | Apple / Twitter / Figma | brand-mandated solid |
| `bg-[#1877F2]` / `hover:bg-[#0C63D4]` | Facebook | brand hex |
| `bg-[#EA4C89]` / `hover:bg-[#E62872]` | Dribbble | brand hex |

These are A11-style allowed exceptions under CLAUDE.md "Dark-safe styling".
