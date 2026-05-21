---
"@mvp-ui/ui": minor
---

`Tabs`: add `responsive?: boolean` prop (default `true`). Vertical tabs now automatically collapse to a horizontal underline bar below `max-width: 767px`. No effect on `orientation="horizontal"`.

Opt out by setting `responsive={false}` — keeps the supplied `orientation`/`variant` on every viewport (use when the tabs live inside a layout that's already hidden on mobile, or when the sidebar shape must be preserved).

```tsx
// Mobile: horizontal + underline. Desktop: vertical + pill.
<Tabs orientation="vertical" variant="pill">…</Tabs>

// Always vertical, never collapses.
<Tabs orientation="vertical" variant="pill" responsive={false}>…</Tabs>
```

Internally uses the new `useMediaQuery` hook (SSR-safe via `useSyncExternalStore`).
