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

## Wave Input family (Input, Label, HintText, InputGroup, InputFile, InputPayment, InputDate, InputNumber, InputTags, PinInput, Tooltip, Tags)

| Untitled | MVP UI | Note |
|---|---|---|
| bg-primary (surface) | bg-bg | field / tag / slot surface — **inversion** |
| bg-primary_hover | bg-bg-tertiary | hover surface |
| text-primary (text) | text-fg | input text — **inversion** |
| text-secondary | text-fg-secondary | label text |
| text-tertiary | text-fg-tertiary | hint / prefix / suffix |
| text-placeholder | text-fg-tertiary | placeholder (no distinct token) |
| text-quaternary / text-fg-quaternary | text-muted-fg | lowest-emphasis icon |
| text-fg-quaternary_hover | text-fg-tertiary | hover lift one step |
| text-brand-tertiary / text-brand-tertiary_alt | text-fg-brand | required `*`, filled PIN slot |
| text-error-primary / text-fg-error-secondary | text-fg-error | invalid text / icon |
| text-success-primary / text-fg-success-secondary | text-fg-success | tag dot |
| text-fg-white | text-fg-on-brand | checkbox tick on brand fill |
| ring-primary | ring-border | inset 1px field/tag ring |
| ring-brand (focus) | ring-brand-500/22 + border-border-brand | MVP focus = box-shadow ring, not outline |
| ring-error_subtle / outline-error_subtle | border-border-error | invalid border |
| bg-brand-solid (checkbox/segment) | bg-primary | brand fill |
| ring-brand-solid | ring-primary | brand fill ring |
| bg-fg-brand-primary (PIN caret) | bg-primary | caret fill |
| text-utility-neutral-300 (PIN separator) | text-fg-tertiary | separator dash |
| text-display-lg | text-4xl | no `display-*` scale in MVP |
| text-display-xl / text-display-2xl | text-5xl | clamp to largest MVP step |
| outline-focus-ring (Tag/TagCloseX) | ring-brand-500/22 | focus ring, box-shadow |
| bg-primary-solid (Tooltip surface, always-dark) | bg-fg / text-bg | **divergence:** theme-following tooltip (dark in light, light in dark) — avoids a new always-dark token; dark-safe via flipping aliases |
| outline-black/16 (TagAvatar contrast) | outline-border-secondary | dark-safe contrast ring |
| animate-caret-blink (PinInput) | animate-pulse | **divergence:** no `caret-blink` keyframe in MVP; pulse approximates |

### New MVP tokens proposed (A3)

**None.** Every Untitled token resolved to an existing MVP flipping alias.
The two visual divergences (Tooltip theme-following surface, PinInput caret
animation) avoid needing new tokens. No `tokens.css` change required.
