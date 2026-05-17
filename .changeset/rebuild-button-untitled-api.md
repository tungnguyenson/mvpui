---
"@mvp-ui/ui": minor
---

Rebuild Button to mirror the Untitled UI API.

**Breaking:** the `variant` prop is renamed to `color` and the value set changed.

- 9 color variants: `primary`, `secondary`, `tertiary`, `primary-destructive`, `secondary-destructive`, `tertiary-destructive`, `link-color`, `link-gray`, `link-destructive` (default `primary`).
- 4 sizes: `sm` (default), `md`, `lg`, `xl`.
- New props: `isLoading`, `showTextWhileLoading`, `iconLeading`, `iconTrailing` (each accepts a component or element).
- Icon-only mode (omit children + pass an icon) gets square padding; pass `aria-label`.
- `asChild` (Radix `Slot` + `Slottable`) still composes injected icons; we keep `asChild` instead of Untitled's `href`.
- All colors map to `@mvp-ui/tokens` utilities — no hardcoded hex.

Migration: `variant="ghost"` → `color="tertiary"`, `variant="destructive"` → `color="primary-destructive"`, `variant="secondary"` → `color="secondary"`, `variant="primary"` → `color="primary"`.

Note: `packages/skill` does not exist in this repo, so no skill doc entry was added despite the CLAUDE.md workflow step.
