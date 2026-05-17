---
"@mvp-ui/tokens": minor
---

Add `--color-fg-success` / `--color-border-success` semantic aliases.

Mirrors the existing `fg-error` / `border-error` pair: `success-600` / `success-200`
in light, both `success-500` in dark (`[data-theme="dark"]`). Generates
`text-fg-success` and `border-border-success` Tailwind utilities so Input/Field
success state can flip in dark instead of washing out — and stays dark-safe
(no raw `success` scale in components). No breaking changes; light mode untouched.
