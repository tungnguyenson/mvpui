---
"@mvp-ui/ui": minor
---

Tab: add `value?: ReactNode` prop. Renders a trailing pill after the label (Untitled UI Figma reference). Three states:

- default: neutral (`bg-neutral-bg`, `border-neutral-border`, `text-fg-secondary`)
- hover (inactive): lifted neutral (`bg-bg-tertiary`, `border-border`)
- selected: brand-tinted (`bg-info-bg`, `border-border-brand`, `text-info-fg`)

Use for counts, status labels, etc.

Also: `TabList` now scrolls horizontally when tabs overflow. Scrollbar hidden via `[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`. Tab labels never wrap (`whitespace-nowrap`, `shrink-0`). Pill variant gets `max-w-full` so the chrome can't exceed viewport.
