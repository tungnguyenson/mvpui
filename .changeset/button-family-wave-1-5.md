---
"@mvp-ui/ui": minor
---

Add Button family (Wave 1.5), adapted from Untitled UI React (MIT, pinned `b857a83a`).

- **`CloseButton`** — dismiss affordance for Alert/Modal/Tags. Built-in X icon. Sizes `xs`/`sm`/`md`/`lg` (default `sm`). `tone` `default` (neutral) or `on-color` (saturated/brand surfaces). Native `<button>` — diverges from Untitled's react-aria.
- **`ButtonUtility`** — compact icon-only control. `color` `secondary`/`tertiary`, sizes `xs`/`sm`. `icon` (component or element), `asChild` for link rendering. `tooltip` maps to native `title` for now (real Tooltip lands Wave 1A).
- **`SocialButton`** — OAuth sign-in. `social` (google/facebook/apple/twitter/figma/dribble) × `theme` (brand/color/gray) × `size` (md/lg), icon-only when no children, `asChild`. Provider brand fills are mode-independent by design.
- **Social logo set** — `GoogleLogo`, `FacebookLogo`, `AppleLogo`, `TwitterLogo`, `FigmaLogo`, `FigmaLogoOutlined`, `DribbleLogo` (each takes `colorful`). Exported flat for standalone use.

All colors map to `@mvp-ui/tokens` via `TOKEN_TRANSLATION.md` — zero new tokens. New subpath exports: `@mvp-ui/ui/{close-button,button-utility,social-button,social-logos}`.

Note: `packages/skill` does not exist in this repo, so no skill doc entry was added despite the CLAUDE.md workflow step.
