# Mobile Page Shell — Flush Layout

How pages render on mobile so they feel native (iOS Settings / Android list pattern) rather than a shrunk desktop card layout.

## Goal

- Edge-to-edge list/detail surfaces on mobile
- Single white surface, no gray gutter strip above content
- Subtle top divider from sticky header only
- Zero per-page opt-in — global responsive defaults

Desktop layout unchanged.

## Pattern

| Surface | Mobile | Desktop |
|---|---|---|
| `<main>` background | `bg-bg` (white) | `bg-bg-secondary` (gray) |
| `PageScaffold` content padding | `px-0 pt-4 pb-24` | `px-8 py-8` |
| `TableCard.Root` chrome | flush rectangle, no ring/shadow/rounded | `rounded-xl ring-1 shadow-xs` |
| Mobile sticky `Header` | subtle `border-b border-border-secondary` | own desktop divider |

Net effect: mobile pages are a single white sheet under a thin header line, lists run to the screen edges with row dividers handling visual structure.

## Implementation

Three responsive class flips. No context, no hook, no prop drilling.

### 1. `apps/staffing-saas/app/components/_shell/PageScaffold.tsx`

```tsx
<div
  className={`flex flex-col gap-8 px-0 pt-4 pb-24 md:px-8 md:py-8 md:pb-8${
    contentClassName ? ` ${contentClassName}` : ""
  }`}
>
  {children}
</div>
```

Mobile drops horizontal gutter, tightens top to `pt-4`, keeps `pb-24` for FAB clearance. Desktop unchanged.

### 2. `apps/staffing-saas/app/components/_shell/AppShell.tsx`

```tsx
<main className="min-w-0 flex-1 overflow-y-auto bg-bg md:bg-bg-secondary">
```

Mobile: white background = card `bg-bg` blends seamlessly, no visible seam.
Desktop: gray gutter around cards preserved.

### 3. `packages/ui/src/components/table.tsx` — `TableCardRoot`

```tsx
<div
  {...props}
  className={cn(
    "overflow-hidden bg-bg md:rounded-xl md:shadow-xs md:ring-1 md:ring-border",
    className,
  )}
>
```

Mobile: flush rectangle. Desktop: card chrome intact.

Rebuild required: `pnpm build` in `packages/ui` after this edit.

## Why this shape

- **No `bg-bg-secondary` strip above content on mobile.** Card `bg-bg` matching `<main>` `bg-bg` eliminates the gray seam that appears above a flush card.
- **No card ring on mobile.** Rounded corners only make sense when a card has visible inset from its parent. Mobile-flush card has zero inset, so ring/shadow/rounded would only add a sharp color edge with no purpose.
- **Header divider stays.** The thin `border-b border-border-secondary` is the only divider needed to separate the sticky top bar from scrolling content.
- **Responsive classes, not context.** Single source of truth, every page benefits, no per-page plumbing, no `useEffect` setters, no provider wrappers.

## Blast radius

Global. Every page using `PageScaffold` + `TableCard.Root` gets mobile-flush.

Pages that render raw `rounded-xl ring-1` markup inline (not via `TableCard.Root`) stay rounded on mobile — replace with `TableCard.Root` or apply the same responsive classes.

## Anti-patterns

- **Effect-only setter components** (e.g. `<SetMobileHeaderChrome borderless />` mounted to fire a side effect, returning `null`). Awkward, undiscoverable, requires reading source of the component to understand. Use responsive classes when state is purely visual.
- **`px-4` mobile content padding.** Wastes horizontal width on small screens. Lists feel cramped.
- **Card with `rounded-xl ring-1` flush to viewport edge.** Sharp color edge with no visible inset = looks unfinished.
- **`py-8` (32px) top spacing on mobile.** Wastes vertical real estate above first content. `pt-4` (16px) gives breathing room without dead zone.

## Per-page custom needs

If a page must override the global pattern (e.g. dashboard with multiple stacked cards needing visual grouping):

- Wrap the inner section in its own `bg-bg-secondary` panel
- Or apply responsive ring/rounded on a specific card via `className` (since `cn` uses `tailwind-merge`, overrides resolve cleanly)

Avoid reintroducing per-page padding constants — they fragment the pattern.

## Checklist for new pages

- [ ] Use `PageScaffold` for outer layout
- [ ] Use `TableCard.Root` for list surfaces (no inline `rounded-xl ring-1` markup)
- [ ] Verify on 375×667 mobile viewport: edge-to-edge content, single white background, only header has a divider
- [ ] Verify on `md:` desktop viewport: card chrome intact, gray gutter visible
