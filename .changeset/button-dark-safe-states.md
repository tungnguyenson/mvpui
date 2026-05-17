---
"@mvp-ui/ui": patch
---

Make Button hover/active states dark-theme safe.

`secondary`, `tertiary`, `secondary-destructive`, and `tertiary-destructive`
used fixed light utilities (`bg-gray-100`, `bg-error-50/100`) that flashed
bright on dark surfaces. They now use semantic tokens (`bg-bg-tertiary`,
`bg-border-secondary`) that flip under `[data-theme="dark"]`. `link-color`
no longer hard-shifts to `brand-700` on hover (wrong direction in dark) —
the underline is the hover affordance; color stays on the flipping
`text-fg-brand` token. No API change.

`secondary-destructive`, `tertiary-destructive`, and `link-destructive` now
use the flipping `text-fg-error` / `ring-border-error` tokens so their red
matches filled `primary-destructive` in dark (was the dim, fixed
`error-700`).

Also fixes `asChild`: button children were wrapped in a Fragment, which
stopped Radix `Slot` from finding `Slottable` — the slotted element rendered
unstyled (an invisible bare `<a>` on dark surfaces). Children are now passed
directly so `Slot` styles the element.

Known trade-off: in dark, `secondary`/`tertiary`/`secondary-destructive`/
`tertiary-destructive` hover and active both resolve to `--gray-800` (the
token set has no dark error-bg ramp to map onto), so those four lose the
pressed-vs-hover distinction in dark only. Light mode is unaffected.
