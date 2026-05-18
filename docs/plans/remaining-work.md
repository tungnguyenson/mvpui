# MVP UI — Remaining Work Checklist

Generated 2026-05-18. Updated 2026-05-18 (session 2). Reflects actual filesystem state vs untitled UI source.

---

## v0.1 Blockers (must ship before tag)

> InputTagsOuter: ✅ colocated in `inputs/input-tags.tsx`, exported from index — not a regression.

### Missing components (never implemented)

- [x] **Form** (react-hook-form wrapper)
  - Output: `packages/ui/src/components/form.tsx`
  - Exports: `Form`, `HookForm`, `FormField`, `useFormFieldContext`

- [x] **Modal**
  - Output: `packages/ui/src/components/modal.tsx`
  - Primitive: React Aria (consistent with Drawer)
  - Exports: `ModalOverlay`, `Modal`, `Dialog`, `ModalHeader`, `ModalBody`, `ModalFooter` (+ `DialogTrigger` re-export)
  - Note: demos use controlled state (`isOpen`/`onOpenChange`) — `DialogTrigger` incompatible with non-RAC `Button`

- [x] **DateRangePicker**
  - Output: `packages/ui/src/components/date-range-picker.tsx`
  - Shared: `packages/ui/src/components/calendar-cell.tsx` (extracted; date-picker.tsx refactored)
  - Features: preset sidebar, Apply/Cancel footer, controlled/uncontrolled

- [x] **Carousel**
  - Output: `packages/ui/src/components/carousel.tsx`
  - API: compound namespace (`Carousel.Root`, `.Content`, `.Item`, `.PrevTrigger`, `.NextTrigger`, `.IndicatorGroup`, `.Indicator`)

---

## Docs pages (one per missing component)

- [x] `apps/docs/app/components/(components)/form/page.tsx`
- [x] `apps/docs/app/components/(components)/modal/page.tsx`
- [x] `apps/docs/app/components/(components)/date-range-picker/page.tsx`
- [x] `apps/docs/app/components/(components)/carousel/page.tsx`
- [ ] `apps/docs/app/components/inputs/input-tags-outer` (add to existing inputs page or new page)

---

## Polish (post-component, pre-v0.1.0 tag)

### Demo pages

- [ ] `/examples/auth-form` — Button, Input, Label, HintText, Checkbox, Alert
- [ ] `/examples/settings` — Section + Toggle + Modal + form controls + AvatarLabelGroup + Badge + Tooltip
- [ ] `/examples/dashboard-lite` — Card + Avatar + Badge + Tooltip + ProgressCircle + Tag + Dropdown

### Skill consolidation (`packages/skill/`)

- [ ] `system.md` — updated with current architecture
- [ ] `tokens.md` — link to TOKEN_REGISTRY
- [ ] `components.md` — all ~55 components documented
- [ ] `patterns.md`
- [ ] `responsive.md`

### Distribution

- [ ] README + quickstart
- [ ] Test install in throwaway project
- [ ] `pnpm changeset` for all new components
- [ ] Tag `v0.1.0`

---

## v0.2 Scope

| Item | Notes |
|---|---|
| Combobox, MultiSelect, TagSelect | `base/select/` — React Aria |
| Table | `application/table/table.tsx` |
| File upload drag-drop | `application/file-upload/` |
| Toast / Notification | Uses Sonner |
| Command menu | — |
| AppNavigation sidebar variants | dual-tier, section-dividers, section-subheadings |
| Charts | → separate `@mvp-ui/charts` package |
| Marketing components | Build per-project, never in this pkg |

---

## Build order for remaining v0.1 items

```
1. InputTagsOuter   ✅ colocated (not a regression)
2. Form             ✅ done
3. Modal            ✅ done (React Aria, controlled state)
4. DateRangePicker  ✅ done (React Aria, CalendarCell extracted)
5. Carousel         ✅ done (Embla, compound namespace)
   ↓
6. Demo pages       ⬜ /examples/auth-form, /examples/settings, /examples/dashboard-lite
7. Skill files      ⬜ system.md, tokens.md, components.md, patterns.md, responsive.md
8. Tag v0.1.0       ⬜ README + changeset + test install first
```
