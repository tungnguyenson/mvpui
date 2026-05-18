# CLAUDE.md — MVP UI

## What this repo is

Shared design system for personal SaaS projects: tokens, React components, AI skill files, and a docs workbench. Consumed via git deps + git submodule.

Brand color: Untitled UI default purple (`--colors-brand-600: #7f56d9`). Resources in `resources/` use slate-navy as a consumer-project example — do not copy those hex values into this repo's tokens.

## Architecture

- `packages/tokens` — design tokens (CSS + TS). No React.
- `packages/ui` — React components. Depends on tokens.
- `packages/skill` — AI agent context. Not a build target.
- `apps/docs` — Next.js workbench. Used to develop + demo components.

## Workflow for adding a component

1. Build component in `packages/ui/src/components/<name>.tsx`
2. Export from `packages/ui/src/index.ts`
3. Add demo page at `apps/docs/app/components/<name>/page.tsx` with all variants
4. Add entry in `packages/skill/components.md` documenting:
   - Import path
   - Variant semantics
   - When to use / not use
   - Anti-patterns
5. Visually verify in `apps/docs` dev server
6. Add changeset: `pnpm changeset` (minor for new component, patch for fixes)

## Hard rules

- Never hardcode color/spacing values — always tokens
- Never add a component without its docs page
- Never bypass tokens by using arbitrary Tailwind values for known categories
- One component per file, named export only
- Use Radix Primitives for any component with complex interaction (Dialog, Popover, Tabs, etc.)
- Use `forwardRef` for components wrapping DOM elements

## Dark-safe styling (enforced)

Component variant/class strings must use the **semantic flipping aliases**, never raw numbered color scales. Raw scales are token-backed but do NOT flip under `[data-theme="dark"]` — they look right in light and wash out (or vanish) in dark. This is checked: `pnpm lint:dark` (in `pnpm lint` and CI) fails the build on a violation.

- **Banned in components** for `bg/text/border/divide/from/via/to`: `gray|brand|error|success|warning` at any scale `-25…-950`, plus `bg-white`, `bg-black`, `text-black`.
- **Use instead**: surfaces `bg-bg` / `bg-bg-secondary` / `bg-bg-tertiary`; text `text-fg` / `text-fg-secondary` / `text-fg-tertiary` / `text-fg-brand` / `text-fg-error` / `text-fg-success`; borders `border-border` / `border-border-secondary` / `border-border-brand` / `border-border-error` / `border-border-success`; actions `bg-primary` / `bg-primary-hover` / `bg-primary-active` / `text-primary-fg`; status `bg-{info,success,warning,error}-bg` + matching `-border` / `-fg`; neutral chip `bg-neutral-bg` / `border-neutral-border`. Need a new dark value? Add a flipping token in `packages/tokens` (`:root` light + `[data-theme="dark"]` override), don't reach for a scale.
- **Allowed exceptions** (genuinely mode-independent — solid destructive fill, alpha focus ring): keep the raw class but put `dark-ok` in a comment on the **same line**. `ring-*` alpha rings (e.g. `ring-brand-500/22`) are not banned.

## When unsure about design

Read `packages/skill/system.md` for design rationale.
Read `packages/skill/components.md` for similar component patterns.
If still unsure, check Untitled UI Figma reference (link in repo README).
Do not guess at color or spacing values — ask.

## Untitled UI adaptation

Plan: [docs/plans/implement-ui.md](docs/plans/implement-ui.md). Token mapping:
[packages/tokens/TOKEN_TRANSLATION.md](packages/tokens/TOKEN_TRANSLATION.md).
New-token proposals: [packages/tokens/TOKEN_REGISTRY.md](packages/tokens/TOKEN_REGISTRY.md).
Full A1–A12 decisions live in the plan — not duplicated here.

**Source (A12):** Untitled UI React (MIT), pinned at
`b857a83afef2ca52649d658b26b985eed8c9658b`, path
`/Volumes/DATA/dev/test_repos/untitledui-react/`. Don't pull during a push.

**Icon prop (A4, LOCKED):** `type IconProp = FC<{ className?: string }> | ReactNode;`
Render via the `renderIcon` helper pattern from `button.tsx`. Every icon slot
uses this exact type.

**License header (A11):**

Source-driven components:
```ts
/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/{folder}/{file}.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */
```

Figma-only components (Card, Alert):
```ts
/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */
```

## Stack

pnpm 9 · TypeScript 5.6+ · Next.js 16 · React 19 · Tailwind v4 · Radix Primitives · cva · tsup · Biome · Changesets
