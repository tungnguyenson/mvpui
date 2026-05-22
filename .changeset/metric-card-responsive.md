---
"@mvp-ui/ui": minor
---

MetricCard: add `responsive` prop (default `true`) for mobile-compact treatment below the `lg` breakpoint. Shrinks the value text one tier (`text-3xl` → `text-xl`, `text-2xl` → `text-lg`, etc.), hides `helpText`, and tightens body padding/gap (`p-5 gap-5` → `p-4 gap-4`). Desktop layout is unchanged. Pass `responsive={false}` to opt out and render the desktop layout at every viewport.

Behavior change: existing callsites with `helpText` will hide that text below `lg` by default. Set `responsive={false}` to restore the previous behavior.
