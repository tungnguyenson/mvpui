---
"@mvp-ui/ui": minor
---

Add the Input family + pulled-ahead Tooltip & Tags, adapted from Untitled UI React (MIT, pinned `b857a83a`). Primitive strategy is **hybrid** (plan A1 correction): native+cva keeps the existing codebase pattern; React Aria only where headless behavior is unavoidable.

- **`Tooltip` / `TooltipTrigger`** — Radix Tooltip (plan A1). API mirrors Untitled (`title`, `description`, `arrow`, `delay`, `placement`). Surface is theme-following (`bg-fg`/`text-bg`) — dark-safe with **no new token**. Pulled ahead from Wave 1A (Input/Label need it).
- **`Tag` / `TagGroup` / `TagList` / `TagAvatar` / `Dot`** — React Aria `TagGroup`. Sizes `sm`/`md`/`lg`, status dot, count, avatar, `selectionMode`, removable. Pulled ahead from Wave 3 — `InputTags` depends on it.
- **`Input` / `InputBase`** — updated in place (not rebuilt). Native `<input>` in an always-on field wrapper; adds `size` `lg`, password toggle, in-field help `tooltip`, invalid icon, and `label`/`hint`/`isRequired` composition. `inputVariants` renamed `inputFieldVariants`; `InputBase` is the reusable field box.
- **`Label`** — updated in place: adds `isRequired` (`*`), `isInvalid`, `tooltip`/`tooltipDescription` (help icon).
- **`HintText`** — native `<p>` + cva; `isInvalid` switches role + color; sizes `sm`/`md`.
- **`InputGroup` / `InputAddon`** — label + input flanked by separated addons + hint; composes the native `InputBase`.
- **`InputFile`** — readonly name field + Upload button over a hidden native file input; sizes, `allowsMultiple`, `isLoading` spinner.
- **`InputPayment`** (+ `formatCardNumber`) — card-number field with brand auto-detect and 4-group formatting; 5 brand marks (Visa/Mastercard/Amex/Discover/UnionPay) as mode-independent SVGs.
- **`InputNumber`** — React Aria `NumberField` (locale parsing, keyboard + spin stepping; vertical/horizontal).
- **`InputDate`** — React Aria `DateField` (segmented, locale-aware).
- **`InputTags` / `InputTagsOuter`** — React Aria + the Tags family; tags inside or below the field; controlled/uncontrolled with stable keys.
- **`PinInput`** — `input-otp`, compound API (`PinInput.Group/.Slot/.Label/.Separator/.Description`). **Documented exception to plan A8** (flat exports): OTP is inherently compositional.

New deps: `react-aria-components ^1.16`, `input-otp`, `@radix-ui/react-tooltip`. New subpath exports for every component above. All Untitled tokens mapped via `TOKEN_TRANSLATION.md` (Wave Input family section) — **zero new `@mvp-ui/tokens` tokens**. Two visual divergences, both documented: theme-following Tooltip surface, and `animate-pulse` for the PIN fake-caret (no `caret-blink` keyframe in MVP).

Note: `packages/skill` does not exist in this repo, so no skill doc entry was added despite the CLAUDE.md workflow step.
