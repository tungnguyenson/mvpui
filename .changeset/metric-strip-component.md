---
"@mvp-ui/ui": minor
---

Add `MetricStrip` — a compact horizontal KPI strip for at-a-glance summaries. Renders a single bordered row of metric items, each with an optional tinted icon chip, a value, and a short label. Items are separated by a divider and can be linked via `href`.

Props-array API (`items: MetricStripItem[]`) — no compound namespace, safe to render from server components.

`mobileLayout`:

- `row` (default) — single horizontal row at every viewport. Value/label typography shrinks below `lg`.
- `stack` — vertical stack below `lg`, horizontal row above.

Lighter footprint than a grid of `MetricCard`. Use when a quick page-header summary is enough and the full card chrome is overkill.
