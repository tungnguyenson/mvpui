---
"@mvp-ui/ui": minor
---

Rebuild Input to mirror the Untitled UI API.

**Breaking:** the stub `variant` / `startIcon` / `endIcon` props are replaced.

- Sizes: `sm` (default), `md`.
- States via props: `isInvalid` (also honors a bare `aria-invalid`), `isSuccess`; native `disabled` / `readOnly`. Invalid always wins over success.
- Slots: `iconLeading`, `iconTrailing` (component or element, like Button), `prefix`, `suffix`, `shortcut`.
- Always-wrap: the bordered field is a wrapper `<div>`; the inner native `<input>` is reset and fills it. `focus-within` drives the ring; `forwardRef` still targets the `<input>`. `inputVariants` styles the field wrapper, not the input element.
- `aria-invalid` / `aria-describedby` pass straight through for FormField (v0.2.0) to wire up.
- All colors map to `@mvp-ui/tokens` flipping aliases (`border-border`, `border-border-brand`, `border-border-error`, `border-border-success`) — dark-safe, no hardcoded hex, no raw numbered scales.

Divergences from Button's exact decisions: icons render at `size-5` (20px) not Button's `size-4` (16px) — Untitled UI inputs use 20px glyphs; and the styled box is a wrapper `<div>` with `focus-within` rather than the element itself. Both deliberate, justified by Untitled parity.

Migration: `variant="error"` → `isInvalid`, `startIcon={…}` → `iconLeading={…}`, `endIcon={…}` → `iconTrailing={…}`.

Note: `packages/skill` does not exist in this repo, so no skill doc entry was added despite the CLAUDE.md workflow step.
