---
"@mvp-ui/ui": minor
---

Add Wave 1A components: FeaturedIcon, Avatar, ProgressBar, Badge (v2).

**`FeaturedIcon`** — decorative icon container for empty states and feature headers. Four themes: `light` (tinted), `dark` (solid fill), `modern` (surface + ring), `outline` (concentric rings). Five colors: `brand`, `gray`, `error`, `warning`, `success`. Four sizes: `sm`/`md`/`lg`/`xl`. Accepts `icon` as component or element. New subpath: `@mvp-ui/ui/featured-icon`.

**`Avatar`** — user identity container. Image with initials/placeholder fallback. Sizes `xs`–`2xl`. Decorations: `status` (online/offline dot), `verified` (blue checkmark badge), `count` (notification count), custom `badge` slot. `border` ring, `rounded` toggle, `focusable` for link wrappers. New subpath: `@mvp-ui/ui/avatar`.

**`AvatarLabelGroup`** — Avatar + name + subtitle. Sizes `sm`/`md`/`lg`.

**`ProgressBar` / `ProgressBarBase`** — linear progress bar. `labelPosition`: `right`, `bottom`, `top-floating`, `bottom-floating`. Custom `valueFormatter`. New subpath: `@mvp-ui/ui/progress`.

**`ProgressBarCircle`** — full-circle SVG progress indicator. Five sizes (`xxs`–`lg`) with center label.

**`ProgressBarHalfCircle`** — gauge-style half-circle variant.

**`Badge` v2 (breaking)** — full Untitled UI badge system. Replaces `variant` prop with `color` × `type`:
- `color`: 5 semantic dark-safe (`gray`, `brand`, `error`, `warning`, `success`) + 7 decorative (`slate`, `sky`, `blue`, `indigo`, `purple`, `pink`, `orange`)
- `type`: `pill-color` (rounded-full), `color` (rounded-md), `modern` (surface bg)
- `size`: `sm` / `md`
- `onDismiss`: renders a close button
- **`BadgeIcon`**: icon-only badge variant

All components use dark-safe token aliases from `@mvp-ui/tokens`. Decorative Badge colors use Tailwind's built-in color palette (not in banned category). Docs pages added for all components.
