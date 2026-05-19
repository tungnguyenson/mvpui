# MVP UI — Remaining Work Checklist

Generated 2026-05-18. Updated 2026-05-18 (session 3). Reflects actual filesystem state vs untitled UI source.

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

- [x] `/examples/auth-form` — split-screen; Button, Input, Label, HintText, Checkbox, Alert
- [x] `/examples/settings` — Section + Toggle + Modal + AvatarLabelGroup + Badge + Tooltip + Select
- [ ] `/examples/dashboard-lite` — not in nav.ts; deferred to v0.2

### Skill consolidation (`packages/skill/`)

- [x] `system.md` — architecture, build pipeline, RSC safety, dark mode, Tailwind v4 rules
- [x] `tokens.md` — semantic alias groups, golden rule, links to TOKEN_REGISTRY + TOKEN_TRANSLATION
- [x] `components.md` — all ~55 components, index table format (name | exports | when-to-use | gotcha)
- [x] `patterns.md` — Modal controlled state, HookForm, compound components, React Aria vs HTML props
- [x] `responsive.md` — breakpoints, mobile-first, layout patterns, component notes

### Distribution

- [x] README + quickstart
- [ ] Test install in throwaway project (manual — user action required)
- [x] `pnpm changeset` — wave2-4-components.md + v0.1-blockers.md written
- [ ] Tag `v0.1.0` (after test install confirmed)

---

## v0.2 Scope — ✅ COMPLETE (2026-05-18)

| Item | Status | Notes |
|---|---|---|
| Combobox, MultiSelect, TagSelect | ✅ done | `@mvp-ui/ui`; React Aria; docs pages |
| Table | ✅ done | `@mvp-ui/ui`; React Aria; sorting, selection, TableCard |
| File upload drag-drop | ✅ done | `@mvp-ui/ui`; drop zone, progress-bar, fill-behind-row variants |
| Toast / Notification | ✅ done | `@mvp-ui/ui`; Sonner wrapper; all variants |
| Command menu | ✅ done | `@mvp-ui/ui`; React Aria ComboBox in ModalOverlay |
| SidebarNavigation variants | ✅ done | `@mvp-ui/ui`; Simple, DualTier, SectionDividers, SectionsSubheadings, Slim |
| Charts | ✅ done | `@mvp-ui/charts`; BarChart, LineChart, PieChart, ProgressCircle (Recharts) |
| /examples/dashboard-lite | ✅ done | in nav.ts; uses Avatar, Badge, Card, Dropdown, Progress, Tags, Tooltip |
| Changesets | ✅ done | v0.2-components.md + v0.2-charts-package.md |
| Marketing components | — | Build per-project, never in this pkg |

---

## Build order for remaining v0.1 items

```
1. InputTagsOuter   ✅ colocated (not a regression)
2. Form             ✅ done
3. Modal            ✅ done (React Aria, controlled state)
4. DateRangePicker  ✅ done (React Aria, CalendarCell extracted)
5. Carousel         ✅ done (Embla, compound namespace)
   ↓
6. Demo pages       ✅ /examples/auth-form, /examples/settings (dashboard-lite → v0.2)
7. Skill files      ✅ system.md, tokens.md, components.md, patterns.md, responsive.md
8. Tag v0.1.0       ⬜ test install (manual) → pnpm changeset version → tag
```
