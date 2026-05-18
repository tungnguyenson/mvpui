# Build Input component for MVP UI (v0.1.0)

## Reference architecture

Read `packages/ui/src/components/button.tsx` FIRST. This is the template — mirror these decisions exactly:

- File structure: single file `packages/ui/src/components/input.tsx`
- License header at top (MIT, copyright TungMVP 2026)
- `"use client"` directive
- Section comment block explaining the component + any divergence from Untitled UI
- `cva` API with grouped class arrays
- Token usage from `@mvp-ui/tokens` — no hardcoded values
- `forwardRef` with displayName
- Icon API: `FC<{ className?: string }> | ReactNode` with `renderIcon` helper
- `data-*` attributes for CSS state hooks
- `aria-*` attributes for accessibility

## References for Input

1. **API & behavior**: https://www.untitledui.com/react/components/inputs
   - Read all sections including FAQ
   - Note exact prop names from Untitled UI's React API
   - List all variants/states/slots from "Examples" sections

2. **Source reference (MIT, learning only)**: https://github.com/untitleduico/react/tree/main/components/base/input
   - Understand structure but DO NOT copy verbatim
   - Apply MVP UI's Button pattern over Untitled UI's implementation

3. **Visual specs via Figma MCP**:
   - Use `Figma:get_design_context` on Input component in Untitled UI Figma https://www.figma.com/design/B1Afhyf9OX9gITABEJ74h7/%E2%9D%96-Untitled-UI-Figma-%E2%80%93-PRO-VARIABLES--v8.0--KTWJ8mYFqVpN--Copy-?node-id=85-1269&p=f&t=IBBRr0Kw7tFu3vyP-0
   - Extract tokens for every state combination (default, hover, focus, disabled, error, success)
   - Match `@mvp-ui/tokens` variable names — vocabulary already has all needed tokens

## Token vocabulary available (verified setup)

### Existing (from Button)
- Surface: `bg`, `bg-tertiary`, `bg-primary`, `bg-primary-hover`, `bg-primary-active`
- Text: `fg`, `fg-secondary`, `fg-tertiary`, `fg-brand`, `fg-error`, `primary-fg`
- Border: `border`, `border-secondary`, `border-error`
- Status: `error-500`, `error-600`, `error-700`
- Brand: `brand-500`
- Shadow: `shadow-xs`, `shadow-md`
- Ring: native Tailwind v4 opacity slash works — `ring-brand-500/22`, `ring-error-500/24`

### New (added for Input)
- Text: `fg-success` (success-600 light, success-500 dark)
- Border: `border-success` (success-200 light, success-500 dark)
- Ring: `ring-success-500/24` (analogous to error ring)

### Tailwind v4 native (no setup needed)
- Custom spacing: `px-4.5`, `py-2.5`, `gap-1.5` etc. auto-generated from `--spacing 0.25rem` base
- Custom font size: `text-md` declared in `@theme`
- Opacity slash: `ring-brand-500/22` generated on-the-fly

If you need a token NOT in this list, STOP and ask before inventing.

## Spec — what to build

### Variants (from Untitled UI catalog)
**Sizes**: `sm`, `md` (default)
- Untitled UI Input has 2 sizes (vs Button's 4). Stick to their convention.

**States**: handled via props, not cva variants
- Default (no special state)
- Error (boolean prop or via `aria-invalid`)
- Success (boolean prop)
- Disabled (HTML `disabled` attribute)
- Read-only (HTML `readOnly` attribute, optional)

**Types**: native HTML input types
- `text` (default), `email`, `password`, `search`, `number`, `url`, `tel`
- Use HTML `type` prop, no special handling needed except `password` (see slots below)

### Slots
- `iconLeading`: `FC<{ className?: string }> | ReactNode` (matches Button API)
- `iconTrailing`: `FC<{ className?: string }> | ReactNode`
- `prefix`: `string | ReactNode` — text/element before input (e.g., "$", "https://")
- `suffix`: `string | ReactNode` — text/element after input (e.g., "USD", ".com")
- `shortcut`: `string | ReactNode` — keyboard shortcut hint (CMD+K style), aligned trailing
- Slot precedence (left to right): `iconLeading` → `prefix` → input → `suffix` → `iconTrailing` / `shortcut`

### Composition (NOT in Input itself — note for future)
- Label, hint text, error message → these are FormField composition (v0.2.0)
- Input itself is just the input control. Don't include Label or error message rendering inside Input.
- BUT: Input must accept `aria-invalid`, `aria-describedby` props for FormField to wire up later.

### Defer to v0.2.0 (do NOT build now)
- Password reveal toggle (eye icon button) — depends on Toggle/Button composition
- Character counter — depends on Textarea pattern
- Auto-resize — Textarea only
- Number stepper buttons — separate component or v0.3

## Plan before coding

Report back with:

1. **cva structure**: which dimensions (size? state via cva or props?), values per dimension
2. **Prop interface**: full TypeScript interface for `InputProps`
3. **Slot rendering logic**: how do you handle the prefix/suffix/icon/shortcut layout?
4. **State handling**: error/success as `aria-invalid`/`data-*` only, or also as cva variants?
5. **Divergences from Untitled UI**: list any (justify each)
6. **Token additions needed**: should be NONE based on vocabulary above — confirm

WAIT for confirmation before writing code.

## Implementation steps

After plan approved:

1. Create `packages/ui/src/components/input.tsx`
2. Export `Input` and `inputVariants` from `packages/ui/src/index.ts`
3. Create `apps/docs/app/components/input/page.tsx` with sections:
   - Sizes (sm, md)
   - States (default, error, success, disabled, read-only)
   - With icon leading
   - With icon trailing
   - With prefix text
   - With suffix text
   - With keyboard shortcut
   - With placeholder
   - All input types showcase
4. Add link from `apps/docs/app/page.tsx`

## Self-audit checklist

Before reporting done, verify:

- [ ] Sizes sm + md work, default is sm (matching Button convention)
- [ ] Error state visible: red border, red ring on focus, accepts `aria-invalid`
- [ ] Success state visible: green border, green ring on focus
- [ ] Disabled state: opacity, cursor, removes interaction
- [ ] Read-only state: subtle bg change, allows selection but no editing
- [ ] iconLeading + iconTrailing both work, sized to match input height
- [ ] prefix + suffix render as inline elements with proper spacing
- [ ] shortcut renders trailing with muted style
- [ ] Focus ring uses `ring-brand-500/22` (or `ring-error-500/24` for error, `ring-success-500/24` for success)
- [ ] All input types work (text, email, password, search, number)
- [ ] `forwardRef<HTMLInputElement, InputProps>` working
- [ ] displayName set
- [ ] License header present
- [ ] No hardcoded hex/rgb anywhere
- [ ] No `any`, no missing types
- [ ] No arbitrary Tailwind values for known tokens
- [ ] Component exported from `packages/ui/src/index.ts`
- [ ] Docs page covers full matrix
- [ ] Docs page linked from index
- [ ] Build succeeds: `pnpm --filter @mvp-ui/ui build`
- [ ] Docs renders without errors: `pnpm --filter docs dev`
- [ ] Visual parity with https://www.untitledui.com/react/components/inputs : < 5% drift

## Report format

```
✅ Input complete

Sizes: sm, md
States: default, error, success, disabled, read-only
Slots: iconLeading, iconTrailing, prefix, suffix, shortcut
Input types: text, email, password, search, number, url, tel
Token additions: none (vocabulary already complete)
Divergences from Untitled UI:
  - [list with justification, or "none"]

Files changed:
- packages/ui/src/components/input.tsx (created)
- packages/ui/src/index.ts (updated)
- apps/docs/app/components/input/page.tsx (created)
- apps/docs/app/page.tsx (added link)

Audit: all pass
Visual parity: ~XX%
```

## Anti-patterns (reject)

- Building Label or error message rendering INSIDE Input (that's FormField, v0.2.0)
- Adding password reveal toggle (defer to v0.2.0)
- Adding character counter (defer)
- Using arbitrary Tailwind values for spacing/opacity (native v4 supports custom values, use them properly)
- Inventing new semantic tokens
- Making `size` default to `md` instead of `sm` (match Button convention)
- Building `<InputGroup>` or other composition primitives now (compose in FormField later)

## Notes

- Untitled UI's Input renders `<input>` element directly. Polymorphism via `asChild` is NOT needed here (unlike Button). Skip Slot.
- Focus management: native `<input>` handles focus correctly. No React Aria needed for basic Input.
- Required attribute: native HTML `required` works, no special prop.
- Form integration: native HTML form attributes work (name, defaultValue, value, onChange). No special form library coupling.