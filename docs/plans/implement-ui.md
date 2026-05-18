# MVP UI — Implementation Plan

## Task

Implement a UI component library based on **Untitled UI** design system, adapted to MVP UI conventions.

Per component:
- **Logic reference**: Untitled UI React source code (MIT) in `/Volumes/DATA/dev/test_repos/untitledui-react/`
- **Visual reference**: Untitled UI Figma file links (PRO Variables)
- **Adaptation**: match `packages/ui/src/components/button.tsx` architectural pattern, use `@mvp-ui/tokens`

Output per component: `.tsx` source + docs page in `apps/docs/` + skill entry post-push.

**Total scope**: ~32 components (Button + Label done; full Input family promoted from v0.2) — see mapping table.
**Estimated**: 28-36 working days (~6-7 weeks).

---

## Alignment (lock before kickoff)

### A1. Primitives mapping

| Component | Primitive | Reason |
|---|---|---|
| Button ✅ | Radix Slot (asChild) | Done |
| Tooltip | Radix Tooltip | Lighter, equivalent a11y |
| Dropdown | Radix DropdownMenu | Mature, well-known |
| Modal | Radix Dialog | Familiar API |
| Select, Slider | React Aria | Source uses it, richer than Radix variants |
| Checkbox, Radio, Toggle | React Aria | Matches source, consistency with Select |
| Combobox, Multi-select (v0.2+) | React Aria | Coverage |
| Input, Label, HintText, InputGroup, InputFile, InputPayment | **Native HTML + cva** | Existing `input.tsx`/`label.tsx` deliberately reject RA (documented in file). Keep codebase pattern. Source ported structurally, not its RA layer. |
| InputDate, InputNumber, PinInput, InputTags | React Aria | Headless unavoidable: date segments, locale number stepping, OTP focus nav, tag-list a11y — not hand-rollable correctly |
| Card, Alert, Badge, Progress, Avatar, Textarea, Tags | Native HTML + cva | No primitive needed |

> **A1 correction note:** an earlier edit flipped the whole Input family to React
> Aria on source-fidelity grounds. Reverted — existing `input.tsx` + `label.tsx`
> are native+cva by deliberate, documented design. Decision (Tung): **hybrid** —
> native+cva keeps the codebase pattern; RA only where headless behavior is
> genuinely unavoidable (Date/Number/Pin/Tags). Source is ported for *structure
> and API*, not its RA primitive.

Add `react-aria-components ^1.16` to `@mvp-ui/ui` deps **before Wave Input family**
(InputDate is the first RA component). Pull **Tooltip (Radix, A1)** ahead into
this wave — Input/Label slot in a help-icon Tooltip; do not stub.

### A2. Token translation

Untitled UI source uses their token names (`bg-brand-solid`, `text-tertiary`). Map to MVP UI tokens.

Create `packages/tokens/TOKEN_TRANSLATION.md` before Wave 1. Initial seed:

| Untitled | MVP UI | Category |
|---|---|---|
| bg-primary | bg | background |
| bg-secondary | bg-tertiary | background |
| bg-brand-solid | bg-primary | background |
| bg-brand-solid_hover | bg-primary-hover | background |
| bg-error-solid | bg-error-600 | background |
| text-primary | fg | text |
| text-secondary | fg-secondary | text |
| text-tertiary | fg-tertiary | text |
| text-brand-secondary | fg-brand | text |
| text-error-primary | fg-error | text |
| text-success-primary | fg-success | text |
| border-primary | border | border |
| border-secondary | border-secondary | border |
| border-error_subtle | border-error | border |
| border-success_subtle | border-success | border |
| fill-fg-tertiary | text-fg-tertiary | fill (icon) |
| fill-brand-secondary | text-fg-brand | fill (icon) |

Anchor first new mappings during Avatar (Wave 1A first session). Grow organically.

### A3. New tokens policy

Component needs token not in `@mvp-ui/tokens`?
1. Add to "Proposed" section in `packages/tokens/TOKEN_REGISTRY.md`
2. Confirm with Tung before committing tokens.css change
3. Avoid name collision between parallel sessions

### A4. Icon prop pattern (LOCKED)

```ts
type IconProp = FC<{ className?: string }> | ReactNode;
```

Render via `renderIcon` helper from `button.tsx`. All components with icon slots use this exact type.

### A5. State strategy (LOCKED)

- Design choices (color, variant, size) → `cva` variants
- Runtime states (loading, error, open, selected, disabled, checked) → `data-*` attributes + `data-[state=...]:` Tailwind modifiers
- Boolean layout modes (iconOnly, dismissible) → `cva` compoundVariants

### A6. Size convention

- Default size: `sm` (matches Button)
- Size count per Untitled UI source (Button has 4, Input has 2, etc. — don't standardize across)
- Use existing spacing tokens, no new spacing

### A7. Polymorphism (asChild)

- Button: yes (existing)
- Card: yes (clickable card variant)
- Others: no by default

### A8. Family exports

Flat (match shadcn): `import { Avatar, AvatarLabelGroup } from "@mvp-ui/ui"`
Not namespace: ~~`Avatar.LabelGroup`~~

**A8 exception — PinInput (Tung-approved):** `PinInput` keeps the `input-otp`
compound API (`PinInput.Slot`, `PinInput.Group`, `PinInput.Label`,
`PinInput.Separator`, `PinInput.Description`). OTP is inherently compositional;
this is the shadcn/`input-otp` idiom. Slot-level styling needs sub-components.
Single documented exception — does not loosen A8 for other components.

### A9. CloseButton

Separate component (not Button variant). Built early (Wave 1.5) because Alert, Modal, Tags depend on it.

### A10. Code conventions (match Button)

- File: kebab-case (`close-button.tsx`)
- Export: PascalCase named export only (no `export default`)
- First line: `"use client"`
- `forwardRef<HTMLXxxElement, XxxProps>` for any DOM-wrapping component
- `displayName` set on every component
- TypeScript interface above component
- Extend native HTML props: `Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">` pattern
- Helper functions (renderIcon, Spinner, etc.) outside component body

### A11. License attribution

Source-driven components:
```ts
/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ {SHA}
 * Path: components/{folder}/{file}.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */
```

Figma-only components (Card, Alert):
```ts
/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */
```

### A12. Source pinning

Pin `untitledui-react/` to current commit SHA. Don't pull during push.

```bash
cd /Volumes/DATA/dev/test_repos/untitledui-react
git log -1 --format=%H   # record SHA
git checkout <SHA>
```

Record SHA in CLAUDE.md.

---

## Component mapping

Reference path is absolute: `/Volumes/DATA/dev/test_repos/untitledui-react/`.

### Status legend
✅ done · 🚧 in-progress · 📋 ready · ⬜ TODO · ❌ deferred

### Button family - need updated
| Component | View | Source path | Figma URL | Status |
|---|---|---|---|---|
| Button | master | `components/base/buttons/button.tsx` | https://www.figma.com/design/B1Afhyf9OX9gITABEJ74h7/%E2%9D%96-Untitled-UI-Figma-%E2%80%93-PRO-VARIABLES--v8.0--KTWJ8mYFqVpN--Copy-?node-id=3287-427074&t=IBBRr0Kw7tFu3vyP-4 | ✅ |
| Button | destructive | same | https://www.figma.com/design/B1Afhyf9OX9gITABEJ74h7/%E2%9D%96-Untitled-UI-Figma-%E2%80%93-PRO-VARIABLES--v8.0--KTWJ8mYFqVpN--Copy-?node-id=6218-85578&t=IBBRr0Kw7tFu3vyP-4 | ✅ |
| CloseButton | master | `components/base/buttons/close-button.tsx` | https://www.figma.com/design/B1Afhyf9OX9gITABEJ74h7/%E2%9D%96-Untitled-UI-Figma-%E2%80%93-PRO-VARIABLES--v8.0--KTWJ8mYFqVpN--Copy-?node-id=2763-420129&t=IBBRr0Kw7tFu3vyP-4 | ✅ |
| ButtonUtility | master | `components/base/buttons/button-utility.tsx` | https://www.figma.com/design/B1Afhyf9OX9gITABEJ74h7/%E2%9D%96-Untitled-UI-Figma-%E2%80%93-PRO-VARIABLES--v8.0--KTWJ8mYFqVpN--Copy-?node-id=8003-526508&t=IBBRr0Kw7tFu3vyP-4 | ✅|
| Button loading icon | master | | https://www.figma.com/design/B1Afhyf9OX9gITABEJ74h7/%E2%9D%96-Untitled-UI-Figma-%E2%80%93-PRO-VARIABLES--v8.0--KTWJ8mYFqVpN--Copy-?node-id=8993-429278&t=IBBRr0Kw7tFu3vyP-4 | ✅ |
| SocialButton | master | `components/base/buttons/social-button.tsx` | https://www.figma.com/design/B1Afhyf9OX9gITABEJ74h7/%E2%9D%96-Untitled-UI-Figma-%E2%80%93-PRO-VARIABLES--v8.0--KTWJ8mYFqVpN--Copy-?node-id=1256-130788&t=IBBRr0Kw7tFu3vyP-4 | ✅ |
| SocialLogoButton | master | `components/base/buttons/social-logos.tsx` | | ✅ |
| App Store Buttons | master | `components/base/buttons/app-store-buttons.tsx` | https://www.figma.com/design/B1Afhyf9OX9gITABEJ74h7/%E2%9D%96-Untitled-UI-Figma-%E2%80%93-PRO-VARIABLES--v8.0--KTWJ8mYFqVpN--Copy-?node-id=1303-2162&t=IBBRr0Kw7tFu3vyP-4 | ⬜ |

### Wave Input family (~17 components — single session, source-driven)

> **Primitive (hybrid — see A1 correction note):** native+cva for Input / Label /
> HintText / InputGroup / InputFile / InputPayment (keeps existing codebase
> pattern; source ported for structure + API only). React Aria for InputDate /
> InputNumber / InputTags. `input-otp` for PinInput (A8 exception). **Tooltip
> (Radix) + Tags family (React Aria) pulled ahead** — Input/Label need Tooltip;
> InputTags/InputTagsOuter hard-depend on Tags. Read the whole input folder
> together (see Multi-file source notes).
>
> **Decisions (Tung):** Tags family pulled forward from Wave 3 (InputTags blocker).
> PinInput keeps `input-otp` compound API — A8 exception (recorded in A8).
> New deps: `react-aria-components ^1.16`, `input-otp`.

| Component | View | Source path | Primitive | Status |
|---|---|---|---|---|
| Tooltip (pulled from Wave 1A) | master | `components/base/tooltip/tooltip.tsx` | Radix | ✅ |
| Tags family (pulled from Wave 3) | master | `components/base/tags/tags.tsx` + `base-components/{tag-checkbox,tag-close-x}.tsx` + `foundations/dot-icon` | React Aria | ✅ |
| Input (TextField/InputBase) | master | `components/base/input/input.tsx` | native+cva | ✅ updated |
| Label | master | `components/base/input/label.tsx` | native+cva | ✅ updated |
| HintText | master | `components/base/input/hint-text.tsx` | native+cva | ✅ |
| InputGroup | master | `components/base/input/input-group.tsx` | native+cva | ✅ |
| InputFile | master | `components/base/input/input-file.tsx` | native+cva | ✅ |
| InputPayment | master | `components/base/input/input-payment.tsx` | native+cva | ✅ |
| InputDate | master | `components/base/input/input-date.tsx` | React Aria | ✅ |
| InputNumber | master | `components/base/input/input-number.tsx` | React Aria | ✅ |
| InputTags | master | `components/base/input/input-tags.tsx` | React Aria | ✅ |
| InputTags | subcomp-outer | `components/base/input/input-tags-outer.tsx` | React Aria | ✅ |
| PinInput (A8 exception) | master | `components/base/input/pin-input.tsx` | input-otp | ✅ |


### Wave 1A — Standalone visuals, source-driven (7 components)
| Component | View | Source path | Figma URL | Status |
|---|---|---|---|---|
| Avatar | master | `components/base/avatar/avatar.tsx` | _paste_ | ⬜ |
| Avatar | subcomp-indicators | `components/base/avatar/base-components/` | _paste if separate frame_ | ⬜ |
| AvatarLabelGroup | master | `components/base/avatar/avatar-label-group.tsx` | _paste_ | ⬜ |
| Badge | master | `components/base/badges/badges.tsx` | _paste_ | ⬜ |
| BadgeGroup | master | `components/base/badges/badge-groups.tsx` | _paste_ | ⬜ |
| ProgressIndicator | master | `components/base/progress-indicators/progress-indicators.tsx` | _paste_ | ⬜ |
| ProgressCircle | master | `components/base/progress-indicators/progress-circles.tsx` | _paste_ | ⬜ |
| Tooltip | master | `components/base/tooltip/tooltip.tsx` | _paste_ | ⬜ |

### Wave 1B — Figma-only, no MIT source (2 components)
| Component | View | Source path | Figma URL | Status |
|---|---|---|---|---|
| Card | master | NONE | _paste_ | ⬜ |
| Alert | master | NONE | _paste_ | ⬜ |

### Wave 2 — Form controls (4 components, anchor + parallel)
| Component | View | Source path | Figma URL | Status |
|---|---|---|---|---|
| Checkbox | master | `components/base/checkbox/checkbox.tsx` | _paste_ | ⬜ |
| Radio | master | `components/base/radio-buttons/radio-buttons.tsx` | _paste_ | ⬜ |
| Toggle | master | `components/base/toggle/toggle.tsx` | _paste_ | ⬜ |
| Textarea | master | `components/base/textarea/textarea.tsx` | _paste_ | ⬜ |

### Wave 3 — Complex + composition (7 components, mostly sequential)
| Component | View | Source path | Figma URL | Status |
|---|---|---|---|---|
| Select | master | `components/base/select/select.tsx` | _paste_ | ⬜ |
| Select | subcomp-item-popover | `components/base/select/{select-item,popover}.tsx` | _paste if separate_ | ⬜ |
| Modal | master | `components/application/modals/modal.tsx` | _paste_ | ⬜ |
| Dropdown | master | `components/base/dropdown/dropdown.tsx` | _paste_ | ⬜ |
| Slider | master | `components/base/slider/slider.tsx` | _paste_ | ⬜ |
| Tags | master | `components/base/tags/tags.tsx` | _paste_ | ⬜ |
| Tags | subcomp-checkbox-close | `components/base/tags/base-components/` | _paste if separate_ | ⬜ |
| FileUploadTrigger | master | `components/base/file-upload-trigger/file-upload-trigger.tsx` | _paste_ | ⬜ |
| ButtonGroup | master | `components/base/button-group/button-group.tsx` | _paste_ | ⬜ |

### Multi-file source notes

**Select** (read all together):
```
components/base/select/
├── select.tsx              ← main
├── select-shared.tsx       ← shared internals
├── select-item.tsx         ← item rendering
├── popover.tsx             ← popover wrapper
└── select-native.tsx       ← native fallback (mobile)
```
Deferred to v0.2: combobox.tsx, multi-select.tsx, tag-select.tsx (same folder).

**Tags**:
```
components/base/tags/
├── tags.tsx                          ← main
└── base-components/
    ├── tag-checkbox.tsx              ← selectable
    └── tag-close-x.tsx               ← dismissible
```

**Avatar**:
```
components/base/avatar/
├── avatar.tsx                        ← main
├── avatar-label-group.tsx            ← included
├── utils.ts                          ← read for utilities
└── base-components/
    ├── avatar-add-button.tsx
    ├── avatar-company-icon.tsx
    ├── avatar-count.tsx
    ├── avatar-online-indicator.tsx
    └── verified-tick.tsx
```
Deferred: avatar-profile-photo.tsx.

**Input family** (read all together — every variant composes `input.tsx`):
```
components/base/input/
├── input.tsx              ← main: InputBase + TextField + Input (React Aria)
├── label.tsx              ← ✅ done (packages/ui/src/components/label.tsx)
├── hint-text.tsx          ← helper text / error
├── input-group.tsx        ← leading/trailing prefix + suffix
├── input-date.tsx         ← React Aria DateField
├── input-file.tsx         ← file input
├── input-number.tsx       ← React Aria NumberField
├── input-payment.tsx      ← card number formatting
├── input-tags.tsx         ← tag input main
├── input-tags-outer.tsx   ← InputTagsOuter (tags rendered outside field)
└── pin-input.tsx          ← OTP / PIN segments (usePinInputContext)
```
Already in `packages/ui/src/components/`: `input.tsx`, `label.tsx` — **update
in place, don't rebuild** (commit `9c1a5a4 update input ui`). Match source family
API while keeping existing token wiring.

### Deferred to v0.2+
- Combobox, MultiSelect, TagSelect (in `base/select/`)
- AvatarProfilePhoto
- Tabs, Sidebar nav, Page header, Breadcrumb, Pagination, Table, Empty state
- Date picker, File upload (full version), Loading indicator
- Toast/Notification (uses Sonner), Command menu
- Charts → separate package `@mvp-ui/charts`
- Marketing components → never (build per-project)

---

## Build order

### Dependency constraints (hard)
- Input family (Input + Label + HintText at minimum) → before any form control (Wave 2 needs Label)
- React Aria dep needed at Wave Input family (input.tsx uses it), not deferred to Wave 2
- CloseButton → before Alert, Modal, Tags
- Button (done) → blocks nothing
- Checkbox → anchor for Radio/Toggle pattern
- Select → anchor for React Aria popover pattern (Slider follows)

### Sequence

```
1&2. Wave Input family    Button done. Input(update) + Label(done) + HintText
                          + InputGroup + InputDate + InputFile + InputNumber
                          + InputPayment + InputTags(+outer) + PinInput
                         ↓
3. Wave 1A              Avatar + AvatarLabelGroup
                        Badge + BadgeGroup
                        ProgressIndicator + ProgressCircle
                        Tooltip
                         ↓
4. Wave 1B              Card + Alert
                         ↓
5. Wave 2 anchor        Checkbox
                         ↓
6. Wave 2 follow        Radio + Toggle + Textarea
                         ↓
7. Wave 3 sequential    Select → Modal → Dropdown → Slider → Tags → FileUploadTrigger → ButtonGroup
                         ↓
8. Polish               Demo pages + skill consolidation + tag v0.1.0
```

### Parallelization safety

Safe to parallel:
- Within Wave 1A: different families (Avatar / Badge / Progress / Tooltip)
- Within Wave 1B: Card + Alert
- Within Wave 1.5: Button Family, CloseButton + ButtonUtility
- Within Wave 2 (after Checkbox done): Radio + Toggle + Textarea

NOT safe to parallel:
- Wave Input family (single session — all variants compose input.tsx, share context)
- Wave 1B before Wave 1.5 (Alert needs CloseButton)
- Wave 2 anchor (Checkbox) — must be sequential
- Wave 3 components with each other (Select sets pattern, then others follow)
- Anything writing to token registry simultaneously

Tung decides sequential vs parallel per wave based on availability/energy.

---

## Per-component workflow

### Source-driven components (all except Card, Alert)

Phase 1 — Source analysis:
- Read source files from `/Volumes/DATA/dev/test_repos/untitledui-react/`
- Report: component structure, prop interface, variants, React Aria/Radix usage, Untitled tokens used, edge cases

Phase 2 — Token mapping:
- Check TOKEN_TRANSLATION.md for each Untitled token used
- Missing? → derive from Figma (`Figma:get_variable_defs`), add to table
- New MVP UI token needed? → add to TOKEN_REGISTRY.md "Proposed"

Phase 3 — Adaptation plan:
- cva structure
- Prop interface
- Primitives used (confirm with A1)
- Divergences from source (justify)
- New tokens (should be zero)

**WAIT for Tung confirmation.**

Phase 4 — Implement:
- File in `packages/ui/src/components/`
- Match `button.tsx` conventions (A10)
- License header (A11)
- Export from `packages/ui/src/index.ts`

Phase 5 — Docs page:
- `apps/docs/app/components/{slug}/page.tsx`
- Full variant × size × state matrix
- Link from `apps/docs/app/page.tsx`

Phase 6 — Self-audit:
- All variants, sizes, states
- forwardRef + displayName
- No hardcoded values
- TypeScript strict, no `any`
- Build passes, docs renders
- Visual parity with Untitled UI < 5% drift

Phase 7 — Report:
```
✅ {Component} complete
Source: {SHA}
Files: {list}
Variants: {list}
States: {list}
Primitives: {Radix/React Aria/native}
Token additions: {list or none}
Translation additions: {list}
Divergences: {list with justification}
Visual parity: ~XX%
```

### Figma-driven components (Card, Alert)

Same workflow except:
- Phase 1 replaced by Figma extraction (`Figma:get_design_context`, `get_variable_defs`, `get_screenshot` per variant)
- Pattern reference: shadcn/ui {Component} structure as starting point
- Build complete visual spec table before plan
- License header uses Figma-only variant (A11)

---

## Estimate

| Wave | Components | Days |
|---|---|---|
| Wave Input family | 10 (Input update, Label done, HintText, InputGroup, InputDate, InputFile, InputNumber, InputPayment, InputTags+outer, PinInput) | 5-7 |
| Wave 1.5 | 2 (CloseButton, ButtonUtility) | 1 |
| Wave 1A | 7 (Avatar family, Badge family, Progress family, Tooltip) | 3-4 |
| Wave 1B | 2 (Card, Alert) | 2 |
| Wave 2 | 4 (Checkbox anchor + Radio + Toggle + Textarea) | 3-4 |
| Wave 3 | 7 (Select, Modal, Dropdown, Slider, Tags, FileUploadTrigger, ButtonGroup) | 8-10 |
| Polish | Demo pages + skill + tag | 3-5 |
| **Total** | **~31 new + Button/Label done** | **28-36 days** |

---

## Risks

1. **Token translation drift across parallel sessions**
   Mitigation: Avatar (Wave 1A first) anchors translation pattern. Others consume entries.

2. **React Aria learning curve**
   First React Aria component is Checkbox (Wave 2 anchor). Don't parallel-build Radio/Toggle/Textarea until Checkbox pattern established.

3. **Figma MCP detail gaps**
   `get_design_context` may miss state nuances. Fallback: `get_screenshot` for visual verify, or manual Figma inspection.

4. **Source dependencies we don't have**
   Untitled source may import internal utilities. Phase 1 explicitly lists imports. Build minimal versions only if necessary.

5. **Burnout from 5-week push**
   Take 1-day break between waves. Optional interim tag (v0.1.0-alpha.1) after Wave 1 for morale.

---

## Post-push: ship v0.1.0

After all ~32 components done:

Demo pages (3-5 days):
- `/examples/auth-form` — Button, Input, Label, HintText, Checkbox, Alert
- `/examples/settings` — Section + Toggle + Modal + all form controls + AvatarLabelGroup + Badge + Tooltip
- `/examples/dashboard-lite` — Card + Avatar + Badge + Tooltip + ProgressCircle + Tag + Dropdown

Skill consolidation (3-5 days):
- system.md, tokens.md (link to TOKEN_REGISTRY), components.md (all ~32), patterns.md, responsive.md

Distribution (1-2 days):
- README + quickstart
- Test install in throwaway project
- Tag v0.1.0

Total to ship: ~6-7 weeks from kickoff.

---

## Kickoff checklist

Before Wave Input family starts:

- [ ] A1-A12 decisions in CLAUDE.md
- [ ] Source SHA pinned in CLAUDE.md (`untitledui-react/` checkout at SHA)
- [ ] TOKEN_REGISTRY.md created in `packages/tokens/`
- [ ] TOKEN_TRANSLATION.md created with initial seed (A2)
- [ ] `react-aria-components ^1.16` added to `@mvp-ui/ui` deps (now needed at Wave Input family)
- [ ] Diff existing `input.tsx` / `label.tsx` vs source family — plan update, not rebuild
- [ ] Figma MCP tested on Button (verify `get_design_context` works)
- [ ] License attribution templates in CLAUDE.md (A11)
- [ ] Family audit run (verify scope final — count grew with Input family)
- [ ] Figma URLs filled for at least Wave Input family + Wave 1.5

Once checked, kick off Wave Input family.