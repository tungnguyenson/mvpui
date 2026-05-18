# Recreating Untitled UI Components & Demos

Lessons from the Avatar session. Follow this to avoid wasted iterations.

---

## File Structure Rule

**Before writing any code**, check Untitled UI's directory layout:
```
find /Volumes/DATA/dev/test_repos/untitledui-react/components/base/<name> -type f | sort
```

Mirror it exactly in `packages/ui/src/components/<name>/`:
- One component per file (`avatar.tsx`, `avatar-label-group.tsx`, `avatar-profile-photo.tsx`)
- Shared sub-components in their own files (online indicator, verified tick, etc.)
- Add each new file as its own entry in `packages/ui/tsup.config.ts`
- Update `packages/ui/src/index.ts` to import from the new paths

CLAUDE.md hard rule: **one component per file, named export only**.

---

## Workflow (in order)

1. **Read the source demo file first**
   `/Volumes/DATA/dev/test_repos/untitledui-react/components/base/<name>/<name>.demo.tsx`
   Map every named export before writing a single line.

2. **Check component existence**
   `grep -r "ComponentName" /Volumes/DATA/dev/projects/mvp-ui/packages/ui/src/`
   If missing, implement the component first, then write the demo.

3. **Write the demo** (one `DocExample` per named export, see pattern below)

4. **Build the package** after any change to `packages/ui/src/`:
   `pnpm --filter @mvp-ui/ui build`
   The docs dev server does NOT hot-reload compiled package output.

5. **Verify in browser** at `http://localhost:3000/components/<name>`

---

## Demo Pattern

Each `DocExample` = direct translation of **one** named export from `.demo.tsx`. No interpretation.

| Source export type | Demo content |
|---|---|
| Atomic (`DefaultDemo`, `BaseDemo`) | 1-2 components, exact props from source |
| Full matrix (`Default`, `WithBorder`) | Explicit rows x columns, no `.map()` |
| Size row | `flex items-start gap-8` per row |
| Multiple rows | `flex flex-col gap-4` wrapper |

Never invent extras. If source shows 2 avatars, show 2. If source shows 6 sizes x 2 states, show exactly that.

---

## Token Mapping: Untitled UI -> MVP UI

| Untitled UI token | MVP UI equivalent | Notes |
|---|---|---|
| `bg-primary` (surface) | `bg-bg` | Their "primary" = white surface, ours = brand purple |
| `bg-secondary` | `bg-bg-secondary` | |
| `bg-tertiary` | `bg-bg-tertiary` | placeholder/empty state bg |
| `ring-bg-primary` | `ring-bg` | separator ring on stacked avatars |
| `ring-secondary_alt` | `ring-border` | subtle 1px border |
| `fg-success-secondary` / `#22C55E` | `bg-fg-success` / `text-fg-success` | online indicator green |
| `utility-neutral-300` (offline) | `bg-fg-disabled` | offline indicator gray |
| `text-fg-quaternary` | `text-fg-tertiary` or `text-fg-disabled` | |
| `text-quaternary` | `text-fg-tertiary` | |

Our success palette = Tailwind Green (not Emerald):
- `success-500` = `#22c55e`
- `success-600` = `#16a34a`

---

## Dark-Safe Checklist

- Never use raw scale values: `bg-success-500`, `bg-gray-300`, `bg-brand-600`
- Use semantic flipping aliases: `bg-fg-success`, `bg-fg-disabled`, `bg-bg-tertiary`
- Exception: add `/* dark-ok */` same-line comment for mode-independent values (verified badge `#1D9BF0`, glass white overlay)
- Run `pnpm lint:dark` to verify

---

## Core Rule: Don't Interpret, Translate

Every demo mistake traces back to the same root cause: building what you *think* the demo should show instead of copying what the source *actually* shows.

Before writing any `DocExample`, read the named export in `.demo.tsx` line by line. Ask:
- What components are rendered? (exact count, not "some avatars")
- What props are set? (exact values, not "appropriate sizes")
- What layout classes wrap them? (exact classNames, not "a flex row")

Then write that. Nothing more, nothing less.

---

## Other

| Issue | Fix |
|---|---|
| Compiled output stale | Run `pnpm --filter @mvp-ui/ui build` after every packages/ui edit |
