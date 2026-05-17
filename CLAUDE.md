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

## When unsure about design

Read `packages/skill/system.md` for design rationale.
Read `packages/skill/components.md` for similar component patterns.
If still unsure, check Untitled UI Figma reference (link in repo README).
Do not guess at color or spacing values — ask.

## Stack

pnpm 9 · TypeScript 5.6+ · Next.js 16 · React 19 · Tailwind v4 · Radix Primitives · cva · tsup · Biome · Changesets
