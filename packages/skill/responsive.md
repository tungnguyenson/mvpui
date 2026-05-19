# MVP UI — Responsive Patterns

## Breakpoints (Tailwind v4 defaults)

| Prefix | Min-width | Typical target |
|---|---|---|
| *(none)* | 0 | Mobile (default/smallest) |
| `sm:` | 640px | Large mobile / small tablet |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Wide desktop |
| `2xl:` | 1536px | Ultra-wide |

## Mobile-first rule

Write the base class for mobile, then add responsive prefixes for larger viewports:

```tsx
// Correct: 1 col on mobile, 2 on sm, 3 on lg
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

// Wrong: starts desktop, tries to undo downward
<div className="grid grid-cols-3 sm:grid-cols-2 grid-cols-1">
```

## Common layout patterns

### Split-screen (auth, marketing)
```tsx
<div className="flex min-h-screen">
  {/* Hidden on mobile, visible from lg */}
  <div className="hidden lg:flex lg:w-1/2 ...">Brand panel</div>
  {/* Full width on mobile, half on lg */}
  <div className="flex flex-1 ...">Content</div>
</div>
```

### Settings / content pages
```tsx
<div className="mx-auto max-w-2xl px-6 py-10">
  {/* Constrained readable width, padded on all screen sizes */}
</div>
```

### Form grids
```tsx
<div className="grid gap-5 sm:grid-cols-2">
  {/* Stacks on mobile, 2-col on sm+ */}
</div>
```

### Sidebar + content (docs shell)
```tsx
<div className="flex min-h-screen">
  <nav className="sticky top-0 h-screen w-64 shrink-0 ...">Sidebar</nav>
  <main className="flex-1 min-w-0">Content</main>
</div>
```
`min-w-0` on main prevents flex child overflow.

## Component responsive notes

| Component | Mobile behavior |
|---|---|
| `Modal` | Slides up from bottom on mobile (via `items-end` on overlay at base, `sm:items-center` for desktop centering) |
| `Drawer` | Full-height side panel; `size` controls width |
| `DateRangePicker` | Preset sidebar hidden on mobile (`hidden sm:flex`) |
| `Carousel` | Use `basis-full` for 1-per-view mobile, `basis-1/2` or `basis-1/3` for desktop |
| `Select`, `DatePicker` | Full width by default; constrain with container width |
| `PinInput` | Slots shrink below `sm`; set `size="sm"` on mobile |

## Safe viewport units

Use `dvh` for full-screen mobile layouts (avoids iOS Safari toolbar clipping):

```tsx
// Correct
<div className="min-h-dvh">

// Avoid
<div className="min-h-screen">  // 100vh — clips under mobile browser chrome
```

`Modal` uses `min-h-dvh` on the overlay and `max-h-[calc(100dvh-6rem)]` on the panel.
