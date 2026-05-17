---
"@mvp-ui/tokens": minor
---

Add a dark theme.

Semantic aliases (`--color-bg*`, `--color-fg*`, `--color-border*`,
`--color-primary*`, `--color-ring`, `--shadow-*`) now have dark values under
any `[data-theme="dark"]` subtree. Adds `--color-fg-error` /
`--color-border-error` (error-600/200 light, error-500 dark) so non-filled
destructive UI stays as vivid as filled destructive in dark.

Adds status subtle-surface tokens `--color-{info,success,warning,error}-{bg,
border,fg}` and `--color-neutral-{bg,border}` for Alert/Badge. Each flips in
dark (bg -50→-950, border -200→-800, fg -700→-300). Extends the
emerald/amber/red ramps with the `-300`/`-800`/`-950` stops these need
(canonical Tailwind values; the ramps already sampled `-500`/`-700` from the
same palette). Scoped to the wrapper, not `:root`, so a
single element can render a dark surface inside an otherwise light page.

Dark values mirror the Untitled UI "Dark mode" color collection. The raw
brand/gray/state ramps are mode-independent and unchanged. No breaking
changes — light mode is the default and untouched.

Adds `--color-primary-active` (brand-800 light, brand-400 dark) so the
primary button press state flips instead of going darker-on-dark.

Note: per the Untitled dark convention, `--color-primary-hover` /
`--color-primary-active` resolve lighter (`brand-500` / `brand-400`) in dark
instead of darker. Press/hover go lighter on dark surfaces by design — not a
regression.
