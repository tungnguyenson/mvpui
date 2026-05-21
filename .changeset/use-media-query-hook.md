---
"@mvp-ui/ui": minor
---

Add `useMediaQuery(query)` hook. SSR-safe via `useSyncExternalStore` — returns `false` on the server and during the first client render, then updates on mount and on viewport changes. Subscribes/unsubscribes from `window.matchMedia` automatically.

Use for responsive component logic that can't be expressed via Tailwind classes alone (e.g. swapping `Tabs` `orientation` between mobile and desktop).

```tsx
import { useMediaQuery } from "@mvp-ui/ui";

const isMobile = useMediaQuery("(max-width: 767px)");
```

Also exported as `@mvp-ui/ui/use-media-query` subpath for tree-shaking.
