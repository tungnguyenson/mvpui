# MVP UI — System Architecture

## Monorepo layout

```
packages/
  tokens/    Design tokens — CSS custom properties + TS map. No React.
  ui/        React component library. Consumes tokens.
  skill/     AI agent context files (this dir). Not a build target.
apps/
  docs/      Next.js 16 docs workbench. Used to develop + demo components.
```

## Packages

### `@mvp-ui/tokens`
- Source: `packages/tokens/src/tokens.css` — all CSS custom properties
- Source: `packages/tokens/src/theme.css` — dark-mode overrides under `[data-theme="dark"]`
- Output: `dist/index.css` (imported by app via CSS layer or direct import)
- Token decisions: `TOKEN_REGISTRY.md` (proposals/shipped), `TOKEN_TRANSLATION.md` (mapping from Untitled UI)

### `@mvp-ui/ui`
- Source: `packages/ui/src/components/` — one component per file, named exports only
- Barrel: `packages/ui/src/index.ts`
- Build: `tsup` — `splitting: false`, `banner: { js: '"use client";' }` (LOCKED, do not change)
- Dist: `packages/ui/dist/` — each component has its own entry in `tsup.config.ts`
- Peer deps: React 19, react-aria-components ^1.16, Tailwind v4
- Primitives: React Aria for interactive components (Drawer, Modal, DatePicker, DateRangePicker, Select, Tabs, Checkbox, Radio, Toggle, Slider, PinInput)

## RSC safety

The tsup config stamps `"use client"` on every output file. Every component is a client component. To use in RSC apps: import normally — the directive prevents accidental server rendering.

**Compound statics in RSC page modules**: React RSC proxies do not carry namespace statics (e.g. `PinInput.Slot`). Any `page.tsx` that accesses compound statics must delegate to a `"use client"` island file.

## Dark mode

- Activation: `data-theme="dark"` attribute on `<html>` (or a wrapper element)
- Semantic aliases (e.g. `bg-bg`, `text-fg`, `border-border`, `bg-primary`) flip automatically
- Raw scale tokens (e.g. `bg-gray-900`, `brand-600`) do NOT flip — banned in component files
- Enforcement: `pnpm lint:dark` (runs in CI; fails build on violation)

## Tailwind v4 rules

- Data variants: `data-disabled:` not `data-[disabled]:` for boolean attributes
- Attribute-value variants still use brackets: `data-[state=open]:`, `data-[icon-only=true]:`
- Arbitrary negative: `outline-offset-[-0.5px]` not `-outline-offset-[0.5px]`

## Build pipeline

```bash
pnpm --filter @mvp-ui/tokens build   # rebuild tokens (CSS)
pnpm --filter @mvp-ui/ui build       # rebuild UI package (required before docs hot-reload picks up changes)
pnpm --filter docs dev               # start docs workbench
pnpm --filter docs build             # production build verification
pnpm tsc -b                          # full monorepo type check
```

## Component origin

Components adapted from Untitled UI React (MIT), pinned at `b857a83`:
`/Volumes/DATA/dev/test_repos/untitledui-react/components/base/`

License headers:
- Source-driven: "Adapted from Untitled UI React (MIT)" header
- Figma-only (Card, Alert): "Built from Untitled UI Figma reference" header

## Stack versions

| Tool | Version |
|---|---|
| pnpm | 9 |
| TypeScript | 5.6+ |
| Next.js | 16 |
| React | 19 |
| Tailwind | v4 |
| react-aria-components | ^1.16 |
| tsup | latest |
| Biome | latest |
| react-hook-form | latest |
| embla-carousel-react | latest |
| @internationalized/date | latest |
