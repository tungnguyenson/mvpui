# Building with MVP UI (@mvp-ui/ui)

A Tailwind v4 + React 19 design system (Untitled UI lineage). Brand color is purple
(`--color-brand-600: #7f56d9`). Components are imported from `window.MvpUI.*` and styled
with **semantic, dark-safe utility classes** — not raw color scales.

## Setup
- **No app-level provider is required.** Components render standalone. Two exceptions:
  - **Toasts:** mount `<Toaster />` once near the root, then call `toast(...)` / `toast.success(...)` anywhere.
  - **Theming:** the design system stylesheet must be loaded (it ships the tokens + `@font-face` for Inter / JetBrains Mono). **Dark mode** is opt-in via `[data-theme="dark"]` on a wrapping element — every semantic class below flips automatically.
- Fonts: `Inter` (sans) and `JetBrains Mono` (mono) ship with the bundle; use `font-sans` / `font-mono`.

## Styling idiom — use SEMANTIC aliases, never raw color scales
Raw numbered scales (`gray-*`, `brand-*`, `bg-white`, `text-black`) look right in light mode but do **not** flip in dark mode. Always reach for the flipping aliases:

| Purpose | Use |
|---|---|
| Surfaces | `bg-bg`, `bg-bg-secondary`, `bg-bg-tertiary` |
| Text | `text-fg`, `text-fg-secondary`, `text-fg-tertiary`, `text-fg-brand`, `text-fg-error`, `text-fg-success` |
| Borders | `border-border`, `border-border-secondary`, `border-border-brand`, `border-border-error`, `border-border-success` |
| Primary action | `bg-primary`, `bg-primary-hover`, `bg-primary-active`, `text-primary-fg` |
| Status surfaces | `bg-{info,success,warning,error}-bg` + matching `-border` / `-fg` |
| Neutral chip | `bg-neutral-bg`, `border-neutral-border` |
| Focus ring | `ring-border-brand` (semantic) — don't combine with an alpha ring |
| Radius / spacing | standard Tailwind scale (`rounded-xl`, `gap-3`, `p-4`, …) |

The brand scale (`var(--color-brand-25 … 950)`, e.g. `text-brand-600`) is available for charts/accents, but prefer the semantic aliases for UI chrome so dark mode stays correct.

## Compose real components, never hand-roll
Reach for the library part before inventing markup: `Button`, `Input`, `Select`, `Card` (+ `CardHeader`/`CardContent`/`CardFooter`), `Modal` (+ `ModalHeader`/`ModalBody`/`ModalFooter` inside `ModalOverlay`/`Dialog`), `Table`, `Badge`, `Avatar`, `Tabs` (+ `TabList`/`Tab`/`TabPanel`), `Tooltip`, `Dropdown.*`, `SocialButton`, the payment-icon / brand-logo set, charts (`BarChart`/`LineChart`/`PieChart`/`Sparkline`), etc. Icons are passed to icon slots as **rendered elements** (`iconLeading={<Mail />}`).

## Where the truth lives
- The stylesheet (tokens, semantic aliases, dark overrides) is the design source — read it before styling.
- Every component has a `<Name>.d.ts` (its exact prop contract) and a `<Name>.prompt.md` (usage) under `components/<group>/<Name>/`. Read those for the real API.

## Minimal example
```tsx
import { Card, CardHeader, CardContent, Button, Badge } from "@mvp-ui/ui";

<Card className="max-w-sm">
  <CardHeader className="flex items-center justify-between gap-3">
    <h3 className="text-fg font-semibold">Project Aurora</h3>
    <Badge color="success">Active</Badge>
  </CardHeader>
  <CardContent className="text-fg-secondary text-sm">
    On track for the Aug 15 launch — 3 open tasks remaining.
    <div className="mt-4 flex gap-2">
      <Button size="sm">View project</Button>
      <Button size="sm" color="secondary">Archive</Button>
    </div>
  </CardContent>
</Card>
```
