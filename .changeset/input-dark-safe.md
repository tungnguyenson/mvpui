---
"@mvp-ui/ui": patch
---

Make Input dark-theme safe.

`bg-white`, `disabled:bg-gray-50`, and `focus-visible:border-brand-300` were
fixed light utilities that did not flip on dark surfaces — the field stayed
white in dark. They now use semantic tokens (`bg-bg`,
`disabled:bg-bg-secondary`, `focus-visible:border-border-brand`) that flip
under `[data-theme="dark"]`. No API change.
