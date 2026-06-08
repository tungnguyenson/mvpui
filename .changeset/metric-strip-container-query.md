---
"@mvp-ui/ui": patch
---

Fix `MetricStrip` overflow inside fixed-width shells. Layout now uses container queries (`@container` / `@lg`) instead of viewport breakpoints, so the strip stacks/rows based on its own width — not the viewport. This stops long values (e.g. a `₫9.450.000` money string) from overflowing and colliding with the next column when the strip lives in a narrow frame (like a 448px phone shell) viewed on a desktop viewport. Value text also gains a `truncate` overflow guard.
