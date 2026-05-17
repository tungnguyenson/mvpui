# MVP UI — Repository Scaffold Spec

> **For the AI agent**: This document specifies how to scaffold the `mvp-ui` repository from an empty directory. Execute phase-by-phase. Do not skip phases or batch tasks across phases. After each phase, verify the done criteria before proceeding. If a decision is ambiguous, stop and ask — do not guess.

---

## 1. Context

`mvp-ui` is a personal monorepo containing a shared UI component library, design tokens, and AI agent context. Built on **shadcn/ui foundation + Untitled UI design language**. Consumed by multiple SaaS projects via git dependency (not npm registry initially). Skill files distributed via git submodule.

Three audiences:
1. **Owner (Tung)** — develops components in this repo, uses docs app as workbench
2. **Consumer projects** — pull in `@mvp-ui/ui` + `@mvp-ui/tokens` as deps
3. **AI agents in consumer projects** — read `@mvp-ui/skill` for design guidance

## 2. Goals

- Scaffold pnpm monorepo with 3 packages + 1 docs app
- Ship 7 baseline components production-ready: `Button`, `Input`, `Label`, `Card`, `Badge`, `Alert`, `Section`
- Build 2 demo pages in docs app: `auth-form`, `settings`
- Establish conventions so future components extend the same pattern
- Make every decision reversible (no premature lock-in)

## 3. Non-goals (v0)

- Publishing to npm registry — git deps only
- Dark mode — add in v1 after tokens stabilize
- Storybook — docs app is the visual workbench
- Test coverage targets — Playwright visual regression deferred to v0.2
- More than one theme/brand
- Animation system (Framer Motion etc.) — add when first component needs it
- Form library integration (react-hook-form) — keep components controlled-input agnostic

## 4. Stack (locked decisions — do not deviate)

| Layer | Choice | Version |
|---|---|---|
| Package manager | pnpm | 9+ |
| Workspace | pnpm workspaces | — |
| Language | TypeScript | 5.6+ |
| App framework | Next.js | 16 (App Router) |
| UI runtime | React | 19 |
| Styling | Tailwind CSS | v4 |
| Primitives | Radix UI Primitives | latest |
| Variants | class-variance-authority | latest |
| Class merging | clsx + tailwind-merge | latest |
| Icons | lucide-react | latest |
| Component build | tsup | latest |
| Versioning | Changesets | latest |
| Lint/format | Biome | latest (replaces ESLint+Prettier) |

## 5. Repository structure

```
mvp-ui/
├── package.json                        # Workspace root
├── pnpm-workspace.yaml
├── tsconfig.base.json                  # Shared TS config
├── biome.json
├── .gitignore
├── .nvmrc                              # Node 22
├── README.md
├── CLAUDE.md                           # Agent guidance for this repo
├── .changeset/
│   └── config.json
│
├── packages/
│   ├── tokens/                         # @mvp-ui/tokens
│   │   ├── package.json
│   │   ├── tsup.config.ts
│   │   ├── src/
│   │   │   ├── tokens.css              # Raw design tokens (CSS vars)
│   │   │   ├── theme.css               # Tailwind v4 @theme block
│   │   │   ├── tokens.ts               # TS const for code import
│   │   │   └── index.ts
│   │   └── README.md
│   │
│   ├── ui/                             # @mvp-ui/ui
│   │   ├── package.json
│   │   ├── tsup.config.ts
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   └── cn.ts               # clsx + tailwind-merge helper
│   │   │   ├── components/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── alert.tsx
│   │   │   │   └── section.tsx
│   │   │   └── index.ts                # Public exports
│   │   └── README.md
│   │
│   └── skill/                          # @mvp-ui/skill (not published)
│       ├── package.json                # Stub, no build
│       ├── SKILL.md                    # Entry point for agents
│       ├── system.md                   # Design language semantics
│       ├── tokens.md                   # Token reference (links to tokens pkg)
│       ├── components.md               # Component API reference
│       ├── responsive.md               # Breakpoint rules
│       ├── patterns.md                 # Composition patterns
│       └── examples/
│           ├── auth-form.tsx
│           └── settings-page.tsx
│
└── apps/
    └── docs/                           # Component workbench
        ├── package.json
        ├── next.config.ts
        ├── tsconfig.json
        ├── postcss.config.mjs
        ├── app/
        │   ├── layout.tsx              # Imports @mvp-ui/tokens/theme.css
        │   ├── globals.css
        │   ├── page.tsx                # Component index
        │   ├── components/
        │   │   ├── button/page.tsx     # All Button variants
        │   │   ├── input/page.tsx
        │   │   ├── card/page.tsx
        │   │   ├── badge/page.tsx
        │   │   ├── alert/page.tsx
        │   │   └── section/page.tsx
        │   └── examples/
        │       ├── auth-form/page.tsx
        │       └── settings/page.tsx
        └── README.md
```

## 6. Naming conventions

- Package scope: `@mvp-ui/*` (matches repo name)
- Component file: kebab-case (`form-field.tsx`)
- Component export: PascalCase (`FormField`)
- Each component: one file, named export (no default exports for components)
- Index files: re-export everything explicitly, no `export *`
- CSS variables: kebab-case with category prefix (`--color-brand-600`, `--spacing-section`)
- Tailwind utility classes: rely on Tailwind v4 `@theme` to expose tokens as utilities

## 7. Package contracts

### 7.1 `@mvp-ui/tokens`

**Purpose**: Pure CSS + TypeScript constants. No React. Foundation that every other package depends on.

**Exports** (from `package.json` `exports` field):
```json
{
  "./tokens.css": "./src/tokens.css",
  "./theme.css": "./src/theme.css",
  "./tokens": {
    "import": "./dist/tokens.js",
    "types": "./dist/tokens.d.ts"
  }
}
```

**`src/tokens.css`** — raw CSS variables. Initial values are placeholders matching Untitled UI defaults. To be replaced when Tung exports real tokens from Figma. Include:
- Color scales: `--brand-{25,50,100,200,300,400,500,600,700,800,900,950}` using slate-navy hex values
- Gray scale: `--gray-{25..950}`
- Semantic colors: `--color-bg`, `--color-fg`, `--color-muted-fg`, `--color-border`, `--color-ring`
- Spacing scale: `--spacing-{xs,sm,md,lg,xl,2xl,3xl}` mapping to rem
- Radii: `--radius-{sm,md,lg,xl,full}`
- Shadows: `--shadow-{xs,sm,md,lg,xl}`
- Typography: font family fallback stack, size scale `--text-{xs..5xl}`

**`src/theme.css`** — Tailwind v4 `@theme` block that maps tokens to Tailwind utilities. Example:
```css
@import "./tokens.css";

@theme {
  --color-primary: var(--brand-600);
  --color-primary-hover: var(--brand-700);
  --color-bg: var(--gray-25);
  --color-fg: var(--gray-900);
  /* etc. */
}
```

**`src/tokens.ts`** — TypeScript object literal for code imports (when JS needs token values, e.g. inline styles in rare cases).

### 7.2 `@mvp-ui/ui`

**Purpose**: React components built on shadcn/ui patterns with Untitled UI flavor.

**Build**: `tsup` produces ESM + CJS + .d.ts. Tree-shakeable via per-component subpath exports.

**`package.json` exports**:
```json
{
  ".": {
    "import": "./dist/index.js",
    "types": "./dist/index.d.ts"
  },
  "./button": "./dist/button.js",
  "./input": "./dist/input.js"
}
```

**Dependencies**:
- `@mvp-ui/tokens` (workspace)
- `class-variance-authority`
- `clsx`, `tailwind-merge`
- `@radix-ui/react-*` per component need
- `lucide-react` (peer dep for icons)

**Peer dependencies**:
- `react`, `react-dom` (^19)
- `tailwindcss` (^4)

### 7.3 `@mvp-ui/skill`

**Purpose**: AI agent context for consumer projects. Not a build target. Distributed via git submodule.

**`package.json`**: minimal, `"private": true`, no `main`/`module`/`exports`. Exists only so pnpm includes it in workspace.

**`SKILL.md` structure** (entry point):
```markdown
# MVP UI Design System Skill

## When to use this skill
Whenever generating UI in a project that depends on @mvp-ui/ui.

## Routing
- Need token values? → tokens.md
- Need component API? → components.md
- Need composition pattern? → patterns.md
- Need responsive rules? → responsive.md
- Need design rationale? → system.md
- Need example screens? → examples/
```

### 7.4 `apps/docs`

**Purpose**: Visual workbench for component development + integration test bed.

**Routing**:
- `/` — landing page with link grid to all components and examples
- `/components/[name]` — exhaustive variant showcase per component
- `/examples/[name]` — full screen composition examples

**Setup**:
- Use Tailwind v4 with `@import "tailwindcss"` + import `@mvp-ui/tokens/theme.css` in `globals.css`
- Use workspace dep `"@mvp-ui/ui": "workspace:*"`
- No auth, no API routes, no DB — pure presentation

---

## 8. Execution phases

**Critical**: complete each phase fully before starting the next. After each phase, run the listed verification commands and confirm they pass.

### Phase 0 — Workspace skeleton

**Tasks**:
1. Initialize git repo with `main` branch
2. Create root `package.json` with `"private": true`, scripts: `dev`, `build`, `lint`, `format`, `changeset`
3. Create `pnpm-workspace.yaml` listing `packages/*` and `apps/*`
4. Create `tsconfig.base.json` with strict mode, `moduleResolution: "bundler"`, `target: "ES2022"`
5. Create `biome.json` with reasonable defaults (tab indent, double quotes, organize imports)
6. Create `.gitignore` (node_modules, .next, dist, .turbo, .env*, .DS_Store)
7. Create `.nvmrc` with `22`
8. Create empty `README.md` (fill in Phase 6)
9. Create `CLAUDE.md` — see content in Section 10 below
10. Initialize Changesets: `pnpm dlx @changesets/cli init`

**Verification**:
- `pnpm install` runs without errors
- `pnpm -r run build` exits 0 (even with no packages yet)

### Phase 1 — Tokens package

**Tasks**:
1. Create `packages/tokens/package.json` with name `@mvp-ui/tokens`, version `0.0.0`, type `module`
2. Create `src/tokens.css` with placeholder Untitled UI-flavored values:
   - Brand scale: slate-navy palette (research correct hex values; if unsure, use these placeholders and flag in commit message)
   - Gray scale: warm-tinted neutrals
   - Spacing on 8pt grid
   - Radii starting at 0.625rem for `--radius-md`
3. Create `src/theme.css` mapping tokens → Tailwind v4 `@theme` block
4. Create `src/tokens.ts` exporting object literal mirror of CSS vars (for JS access)
5. Configure `tsup` for building `tokens.ts` only (CSS files are passthrough)
6. Set up `exports` field correctly for subpath imports
7. Write `README.md` documenting how consumers import the CSS

**Verification**:
- `pnpm --filter @mvp-ui/tokens build` produces `dist/` with `.js` and `.d.ts`
- CSS files copy to dist (or are exported from src directly)
- Manually verify: in a scratch HTML file, `<link>` to the built CSS, check `--brand-600` resolves

### Phase 2 — UI package + docs app skeleton + Button

**Goal**: ship one full component end-to-end before adding more. Validates the whole pipeline.

**Tasks**:
1. Create `packages/ui/package.json` with deps and peer deps as specified
2. Create `src/lib/cn.ts` exporting `cn()` using clsx + tailwind-merge
3. Create `src/components/button.tsx`:
   - Use `cva` for variants: `primary`, `secondary`, `ghost`, `destructive`
   - Sizes: `sm` (h-9), `md` (h-11, default), `lg` (h-12)
   - Support `asChild` via Radix `Slot`
   - Forwarded ref
   - Use semantic tokens from `@mvp-ui/tokens` (e.g. `bg-primary`, `text-primary-fg`)
4. Create `src/index.ts` exporting `Button` and `buttonVariants`
5. Configure `tsup` to build per-component entry points + barrel
6. Create `apps/docs` with Next.js 16 + Tailwind v4 setup
7. In `apps/docs/app/globals.css`: `@import "tailwindcss"; @import "@mvp-ui/tokens/theme.css";`
8. Create `app/components/button/page.tsx` showing every variant × size + states (default, hover demo, disabled, with icon, asChild rendering as link)
9. Create `app/page.tsx` with link to button page

**Verification**:
- `pnpm --filter @mvp-ui/ui build` succeeds
- `pnpm --filter docs dev` starts dev server
- `http://localhost:3000/components/button` renders all variants correctly
- Disabled state has correct opacity and cursor
- Focus ring uses `--color-ring` token
- asChild composition works: `<Button asChild><a href="...">Link</a></Button>` renders an `<a>` with button styles

**Done criteria**: Tung can visually verify Button matches Untitled UI flavor. If it doesn't, fix tokens in Phase 1 — do not patch Button.

### Phase 3 — Remaining 6 baseline components

**Order** (each completed fully before next):
1. `Label` — simplest, just typography token application + `htmlFor` handling
2. `Input` — text input with focus ring, error state, optional `startIcon`/`endIcon` slot props
3. `Card` — container with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` subcomponents
4. `Badge` — variants: `default`, `secondary`, `success`, `warning`, `error`
5. `Alert` — with `AlertTitle`, `AlertDescription`; variants: `info`, `success`, `warning`, `error`; optional icon slot
6. `Section` — composition primitive for settings pages: `<Section title="" description="" actions={...}>{children}</Section>`. Use this to internalize the Untitled UI settings pattern.

For each component:
1. Create `src/components/<name>.tsx`
2. Add export to `src/index.ts`
3. Create `apps/docs/app/components/<name>/page.tsx` with exhaustive variant showcase
4. Link from `app/page.tsx`
5. Visual verify in browser

**Verification per component**:
- All variants render
- Props are forwarded correctly to underlying DOM
- Keyboard accessibility works (Tab order, focus visible)
- Tokens are used (no hardcoded colors/spacing in component files)

### Phase 4 — Demo pages

Build two example screens that compose the components. These are integration tests and serve as references for consumer projects.

**`apps/docs/app/examples/auth-form/page.tsx`**:
- Login form matching Untitled UI auth screen
- Email + Password inputs with labels
- Primary "Sign in" button + secondary "Sign in with Google" button
- "Forgot password?" link
- Sign up link at bottom
- Centered card layout, max-width ~400px

**`apps/docs/app/examples/settings/page.tsx`**:
- Settings page matching the Untitled UI mobile settings screen
- "My details" section with title + description + Cancel/Save action buttons
- Form fields: First name, Last name, Email address
- Use `Section` component to wrap each settings group
- Divider between sections

**Verification**: pages render correctly, responsive down to 375px wide, look visually close to Untitled UI references.

### Phase 5 — Skill package

**Tasks**:
1. Create `packages/skill/package.json` (stub, private, no build)
2. Create `SKILL.md` with routing structure (see 7.3)
3. Create `system.md` — design language explanation:
   - Why warm-tinted neutrals over pure black/white
   - Brand color rationale (slate-navy 600 = primary, why not 500)
   - Typography rationale
   - Spacing rhythm philosophy
4. Create `tokens.md` — reference table of every token category with semantic explanation. **Link to `@mvp-ui/tokens` package as source of truth for values; do not duplicate hex codes.**
5. Create `components.md` — per-component:
   - Import path
   - When to use / when NOT to use
   - Variant semantics (what each variant means)
   - Anti-patterns
   - Composition examples
6. Create `responsive.md` — breakpoint rules:
   - Mobile cutoff at 860px (Untitled UI convention)
   - Marketing site rules (hamburger nav, hero stacking, etc.)
   - App dashboard rules (sidebar collapse, etc.)
   - Settings page rules
   - Auth screen rules
7. Create `patterns.md` — composition patterns:
   - Section pattern (title + description + content + actions)
   - Form field pattern (label + input + hint/error)
   - Empty state pattern
   - Loading state pattern
8. Copy `apps/docs/app/examples/auth-form/page.tsx` and `settings/page.tsx` to `examples/` as reference files

**Verification**: a fresh Claude Code instance, given only `@mvp-ui/skill` files, can describe how to build a new screen using `@mvp-ui/ui`.

### Phase 6 — Documentation & distribution setup

**Tasks**:
1. Write root `README.md`:
   - What MVP UI is
   - Quickstart for consumer projects
   - How to install via git dependency: `"@mvp-ui/ui": "github:tung/mvp-ui#v0.1.0&path:/packages/ui"` (verify exact syntax for git deps with subpath; if pnpm doesn't support it cleanly, document alternative: separate build artifact branch or use `pnpm` git ref with workspace patches)
   - How to add skill as submodule: `git submodule add <repo-url> .claude/skills/mvp-ui packages/skill`
   - How to import: `import { Button } from "@mvp-ui/ui"`, `@import "@mvp-ui/tokens/theme.css"` in consumer's globals.css
2. Write `packages/ui/README.md` — component list + import examples
3. Write `packages/tokens/README.md` — token reference + customization guide
4. Write `apps/docs/README.md` — how to run, how to add new component pages
5. Tag `v0.1.0` after final verification

**Verification**:
- Create a throwaway Next.js app, install `@mvp-ui/ui` and `@mvp-ui/tokens` via the documented method
- Import and render `<Button>Hello</Button>`
- Verify it looks identical to docs app

---

## 9. Conventions to enforce

These apply throughout the repo. Encode in `CLAUDE.md` (Section 10) so agents follow them on every change.

**Component structure**:
- One component per file, file name kebab-case matching component name
- Named export only (no `export default`)
- Use `forwardRef` for any component that wraps an HTML element
- Define `Props` interface above the component, extend native HTML props with `React.ComponentPropsWithoutRef<"button">`
- Spread `...props` last so consumers can override

**Styling**:
- Never hardcode colors, spacing, radii, shadows — always reference token CSS vars via Tailwind classes (e.g. `bg-primary`, not `bg-[#2C3A4D]`)
- Never use arbitrary values for tokens that should exist (`p-[18px]` is a smell — either add a token or use the nearest scale value)
- Use `cn()` helper for all conditional classes, never string concatenation
- Variant logic always via `cva`, even for simple components

**TypeScript**:
- Strict mode on
- Explicit return types on exported functions (helps with .d.ts quality)
- No `any`, no `as` casts except at library boundaries (with comment explaining why)

**Accessibility**:
- All interactive elements have visible focus state using `--color-ring`
- Form components support keyboard navigation
- Icon-only buttons require `aria-label`
- Don't reinvent: use Radix Primitives for Dialog, Popover, Tooltip, Tabs, Select, etc.

**Anti-patterns** (reject these in code review):
- Adding a component without adding its docs page
- Bumping `@mvp-ui/ui` without bumping changeset entry
- Importing from `@mvp-ui/ui/dist/...` instead of public exports
- Using `style={...}` inline instead of Tailwind classes
- Adding `useEffect` for styling concerns (use CSS-only solutions when possible)
- Premature abstraction: don't extract a shared subcomponent until the same pattern appears 3+ times

---

## 10. CLAUDE.md content (place at repo root)

```markdown
# CLAUDE.md — MVP UI

## What this repo is

Shared design system for personal SaaS projects: tokens, React components, AI skill files, and a docs workbench. Consumed via git deps + git submodule.

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
```

---

## 11. Open questions for the owner (Tung) — ask before scaffolding if unresolved

1. **Exact repo name**: confirm `mvp-ui` as directory and `@mvp-ui/*` as package scope, or use a different scope (e.g. `@tung/mvp-ui`)
2. **Git host**: GitHub private? GitLab? affects distribution docs
3. **Untitled UI tokens**: are the Figma-exported tokens available now, or should Phase 1 use placeholder values to be replaced later?
4. **Brand color**: Untitled UI's slate-navy as default brand, or override with a different brand color in `@mvp-ui/tokens` defaults?
5. **License**: private repo, but should files carry a license header? (Probably not for personal use, but confirm.)

---

## 12. Out of scope for this scaffold (track for future)

- Visual regression testing with Playwright on `apps/docs`
- Token sync automation from Figma → `packages/tokens/src/tokens.css`
- Dark mode token layer
- Animation/motion tokens
- Form field component composing Label + Input + hint/error (after Phase 3 baseline)
- Calendar, DatePicker, Combobox, Select (deferred until first consumer needs them — likely React Aria for these, see notes)
- Public documentation site (only personal use for now)
- Component MCP server for runtime AI queries