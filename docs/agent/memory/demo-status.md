# Demo Page Status

**Rule**: Read this file before any component/demo work. Update it at the end of every session.

Source demos: `/Volumes/DATA/dev/test_repos/untitledui-react/components/base/`
Demo pages: `apps/docs/app/components/(components)/`
Nav registration: `apps/docs/app/nav.ts`

---

## Buttons

| Page | Source demo | Source exports | Page sections | Status |
|---|---|---|---|---|
| `/components/button` | `buttons/buttons.demo.tsx` | 20 | 20 | ✅ complete |
| `/components/button-utility` | no source demo | — | 5 | ✅ complete |
| `/components/close-button` | no source demo | — | 6 | ✅ complete |
| `/components/social-button` | `buttons/social-buttons.demo.tsx` | 15 | 15 | ✅ complete |
| `/components/app-store-buttons` | `buttons/app-store-buttons.demo.tsx` | 11 | 11 | ✅ complete |

## Inputs

| Page | Source demo | Source exports | Page sections | Status |
|---|---|---|---|---|
| `/components/input` | `input/inputs.demo.tsx` | 31 total (shared) | 9 | ✅ complete |
| `/components/label` | derived | — | 6 | ✅ complete |
| `/components/hint-text` | derived | — | 5 | ✅ complete |
| `/components/input-group` | `input/inputs.demo.tsx` | (shared) | 8 | ✅ complete |
| `/components/input-file` | `input/inputs.demo.tsx` | (shared) | 2 | ✅ complete |
| `/components/input-payment` | `input/inputs.demo.tsx` | (shared) | 2 | ✅ complete |
| `/components/input-number` | `input/inputs.demo.tsx` | (shared) | 4 | ✅ complete |
| `/components/input-date` | `input/inputs.demo.tsx` | (shared) | 2 | ✅ complete |
| `/components/input-tags` | `input/inputs.demo.tsx` | (shared) | 4 | ✅ complete |
| `/components/pin-input` | `input/pin-input.demo.tsx` | 9 | 9 | ✅ complete |

> Note: `inputs.demo.tsx` covers all input variants in one file. Map each export to its component page when building demos.

## Components

| Page | Source demo | Source exports | Page sections | Status |
|---|---|---|---|---|
| `/components/avatar` | `avatar/avatar.demo.tsx` | 17 | 17 | ✅ complete |
| `/components/badge` | `badges/badges.demo.tsx` | 25 | 25 | ✅ complete |
| `/components/progress` | `progress-indicators/progress-indicators.demo.tsx` | 9 | 9 | ✅ complete |
| `/components/tooltip` | `tooltip/tooltip.demo.tsx` | 6 | 6 | ✅ complete |
| `/components/featured-icon` | no source demo (Figma-only) | — | 9 | ✅ complete |
| `/components/tags` | `tags/tags.demo.tsx` | 13 | 13 | ✅ complete |
| `/components/card` | no source demo (Figma-only) | — | 4 | ✅ complete |
| `/components/alert` | no source demo (Figma-only) | — | 4 | ✅ complete |
| `/components/section` | no source demo | — | 3 | ✅ complete |

## Form Controls (Wave 2) — components built + demos

| Page | Source demo | Source exports | Page sections | Status |
|---|---|---|---|---|
| `/components/checkbox` | `checkbox/checkbox.demo.tsx` | 8 | 8 | ✅ complete |
| `/components/radio` | `radio-buttons/radio-buttons.demo.tsx` | 6 | 6 | ✅ complete |
| `/components/toggle` | `toggle/toggle.demo.tsx` | 12 | 12 | ✅ complete |
| `/components/textarea` | `textarea/textarea.demo.tsx` | 4 | 4 | ✅ complete |

> Wave 2 component files: `packages/ui/src/components/{checkbox,radio,toggle,textarea}.tsx`
> Demo pages in: `apps/docs/app/components/(inputs)/`

## Wave 3 — partial

| Component | Source demo | Source exports | Page sections | Status |
|---|---|---|---|---|
| Select | `select/select.demo.tsx` | 19 | 10 (core exports; skipped MultiSelect/TagSelect/Native — require separate components) | ✅ complete |
| Slider | `slider/slider.demo.tsx` | 4 | 4 | ✅ complete |
| ButtonGroup | `button-group/button-group.demo.tsx` | 9 | 9 | ✅ complete |
| BadgeGroup | `badges/badge-groups.demo.tsx` | 24 | 24 | ✅ complete |
| Dropdown | no source demo (built from source component) | — | 8 | ✅ complete |
| FileUploadTrigger | no source demo (built from source component) | — | 6 | ✅ complete |
| Modal | no source demo found | — | — | ⏭ skipped (out of scope) |

> Wave 3 leftovers (index.ts, tsup.config.ts, package.json, nav.ts additions): `/tmp/wave3-leftovers-shared.md`

## Wave 4a — complete

| Component | Status | Notes |
|---|---|---|
| Tabs | ✅ complete | react-aria Tabs; underline/pill variants, sm/md sizes |
| Pagination | ✅ complete | custom buildRange(); compact prop; lucide chevrons |
| EmptyState | ✅ complete | presentational; icon/title/description/actions props |
| LoadingIndicator | ✅ complete | SVG spinner + dot-pulse; sm/md/lg; primary/secondary |

## Wave 4b — complete

| Component | Status | Notes |
|---|---|---|
| Drawer | ✅ complete | react-aria Dialog/Modal; side (left/right); sm/md/lg; title/description wired with aria-labelledby |
| DatePicker | ✅ complete | react-aria DatePicker/Calendar; light + dark safe |
| AppNav | ✅ complete | presentational sidebar nav; items/logo/footer props |

## v0.1 Missing Components — complete

| Component | Status | Notes |
|---|---|---|
| Form | ✅ complete | HookForm + FormField + useFormFieldContext; react-hook-form wrapper over React Aria Form |
| Modal | ✅ complete | React Aria; DialogTrigger/ModalOverlay/Modal/Dialog + ModalHeader/Body/Footer; sm/md/lg/xl/full sizes |
| CalendarCell | ✅ complete | Shared internal cell for DatePicker + DateRangePicker; auto-detects range vs single via RangeCalendarContext |
| DateRangePicker | ✅ complete | React Aria; preset sidebar; single-month calendar; Apply/Cancel footer; controlled/uncontrolled |
| Carousel | ✅ complete | Embla; compound namespace (Carousel.Root/.Content/.Item/.PrevTrigger/.NextTrigger/.IndicatorGroup/.Indicator); A8 exception |

## Foundations — complete

| Component | Status | Notes |
|---|---|---|
| IntegrationIcons (16 icons) | ✅ complete | grayscale prop; fill-fg-quaternary alias |
| SocialIcons (7→14 logos) | ✅ complete | extended social-logos.tsx |
| PaymentIcons (5→56 icons) | ✅ complete | extended payment-icons.tsx |

## Shared Assets — complete

| Component | Status | Notes |
|---|---|---|
| SectionDivider | ✅ complete | max-w-7xl HR; border-secondary token |
| IPhoneMockup | ✅ complete | SVG phone shell; light/dark/auto theme; scale via CSS width |
| BackgroundPattern | ✅ complete | circle/square/grid/grid-check; sm/md/lg; currentColor |
| Illustration | ✅ complete | box/cloud/documents/credit-card; sm/md/lg |
| CreditCard | ✅ complete | 13 themes (normal/strip/vertical-strip); scalable width |
| QRCode + GradientScan | ✅ complete | qr-code-styling backed; md/lg; branded corner handles |

## v0.2 Components — complete

| Component | Package | Status | Notes |
|---|---|---|---|
| Combobox (`ComboBox`) | `@mvp-ui/ui` | ✅ complete | React Aria ComboBox; optional shortcut kbd, icon, label, hint, tooltip; 5 doc sections |
| MultiSelect | `@mvp-ui/ui` | ✅ complete | Autocomplete + multi-selection; badge count, select-all, reset footer; 5 doc sections |
| TagSelect | `@mvp-ui/ui` | ✅ complete | Tag-chip selection with removable chips in trigger; 4 doc sections |
| Table (`Table`, `TableCard`) | `@mvp-ui/ui` | ✅ complete | React Aria; sorting, row selection, sm/md sizes, card wrapper; 4 doc sections |
| FileUpload | `@mvp-ui/ui` | ✅ complete | Drag-drop drop zone, progress-bar list item, fill-behind-row list item; 4 doc sections |
| Toast (`Toaster`, `toast`) | `@mvp-ui/ui` | ✅ complete | Sonner wrapper; success/error/warning/info/promise/action; 6 doc sections |
| CommandMenu | `@mvp-ui/ui` | ✅ complete | React Aria ComboBox in ModalOverlay; grouped items, shortcuts, disabled; 4 doc sections |
| SidebarNav | `@mvp-ui/ui` | ✅ complete | 5 variants: Simple, DualTier, SectionDividers, SectionsSubheadings, Slim; CSS width transitions; 5 doc sections |
| BarChart | `@mvp-ui/charts` | ✅ complete | Recharts; stacked/grouped; multi-series; 3 doc sections |
| LineChart | `@mvp-ui/charts` | ✅ complete | Recharts; area/line; gradient fill; dashed lines; 3 doc sections |
| PieChart | `@mvp-ui/charts` | ✅ complete | Recharts; donut/pie; per-item colors; 3 doc sections |
| ProgressCircle | `@mvp-ui/charts` | ✅ complete | Recharts RadialBar; 4 sizes; title/subtitle; custom colors; 4 doc sections |
| Sparkline | `@mvp-ui/ui` | ✅ complete | Lightweight inline SVG; tone palette (brand/success/error/warning/neutral); smooth/straight; filled/line; 7 doc sections |
| MetricCard | `@mvp-ui/ui` | ✅ complete | Label+value tile; trend arrow + colored change; built-in Sparkline shorthand; prefix/suffix; loading skeleton; href anchor; chart slot; 10 doc sections |
| `/examples/dashboard-lite` | `@mvp-ui/ui` | ✅ complete | stat cards, orders table, traffic sources, team activity, deal tags |

## Example Pages

| Page | Components used | Status |
|---|---|---|
| `/examples/auth-form` | Button, Input, Label, HintText, Checkbox, Alert | ✅ complete — split-screen layout |
| `/examples/settings` | Section, Toggle, Modal, AvatarLabelGroup, Badge, Tooltip, Select, Input, Button, CloseButton | ✅ complete |
| `/examples/dashboard-lite` | Avatar, Badge, Button, ButtonUtility, Card, Dropdown, EmptyState, ProgressBar, Tag, TagGroup, TagList, Tooltip | ✅ complete |

## Consumer Apps

Standalone workspace apps that consume `@mvp-ui/ui` (not docs demo pages).

| App | Purpose | Status | Notes |
|---|---|---|---|
| `apps/staffing-saas` | Demo `@mvp-ui/ui` with a custom brand token | 🚧 in progress | Slate-navy brand override (`--brand-25…950` redefined in `app/globals.css :root` after the tokens import — wins by cascade order). Routed workspace shell now live: `/` dashboard, `/customers` + `/customers/[id]`, and `/workers` + `/workers/[id]` are completed; sidebar uses path-based navigation; `Chính sách giá` removed from nav per scope. Remaining nav routes currently resolve to placeholder `EmptyState` pages via catch-all routing until their listing/detail pages are built. Build verified with `pnpm build`. Browser/interaction not auto-verified (chrome-devtools MCP profile locked). |

## Skill Files (`packages/skill/`)

| File | Status |
|---|---|
| `system.md` | ✅ complete |
| `tokens.md` | ✅ complete |
| `components.md` | ✅ complete — index table format |
| `patterns.md` | ✅ complete |
| `responsive.md` | ✅ complete |

## Distribution

| Item | Status |
|---|---|
| README + quickstart | ✅ complete |
| Changesets | ✅ wave2-4-components.md + v0.1-blockers.md |
| Test install | ⬜ manual — user action |
| Tag v0.1.0 | ⬜ after test install |

## Deferred

*(BadgeGroup was deferred to Wave 3 — now complete)*

---

## Navigation Components

| Component | Status | Notes |
|---|---|---|
| Breadcrumbs | ✅ complete | Figma-only; `variant="text"/"text-with-line"/"button"`; `divider="chevron"/"slash"`; `showHomeIcon`; 5 demo sections |

## Disclosure Components

| Component | Status | Notes |
|---|---|---|
| Accordion | ✅ complete | `@radix-ui/react-accordion` + Untitled tokens; mirrors shadcn API (`Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`). Supports `type="single"`+`collapsible` or `type="multiple"`. `AccordionTrigger` accepts `trailing` slot for badges + `hideChevron` flag. Animation keyframes (`--animate-accordion-down/up`) live in `@mvp-ui/tokens` theme.css driven by Radix `--radix-accordion-content-height`. 4 demo sections |

## Session log

| Date | Work done |
|---|---|
| 2026-05-18 | Avatar (17), Badge (25), Shiki→highlight.js migration |
| 2026-05-18 | Button (20), ButtonUtility (5), CloseButton (6), SocialButton (15), AppStoreButtons (11), Tags fix (4→13) |
| 2026-05-18 | Wave 2: Checkbox (8), Radio (6), Toggle (12), Textarea (4) — built + demo'd |
| 2026-05-18 | Input family: Input (9), Label (6), HintText (5), InputGroup (8), InputFile (2), InputPayment (2), InputNumber (4), InputDate (2), InputTags (4), PinInput (9) — all demo pages written, tsc clean |
| 2026-05-18 | Wave 3: Select (10 sections), Slider (4 sections), ButtonGroup (9 sections) — built + demo'd, tsc clean |
| 2026-05-18 | Wave 3 continued: BadgeGroup (24 sections), Dropdown (8 sections), FileUploadTrigger (6 sections) — built + demo'd, tsc clean. Leftovers in /tmp/wave3-leftovers-shared.md |
| 2026-05-18 | Foundations: IntegrationIcons (16), SocialIcons (7→14), PaymentIcons (5→56) — all built |
| 2026-05-18 | Route collision fix: deleted 15 duplicate page dirs from (components) group |
| 2026-05-18 | Wave 4a: Tabs, Pagination, EmptyState, LoadingIndicator — built + exported + nav'd |
| 2026-05-18 | Wave 4b: Drawer, DatePicker, AppNav — built + exported + nav'd; tsc clean (both packages) |
| 2026-05-18 | Dropdown: added SubmenuTrigger to Dropdown namespace; fixed DropdownExamples direct react-aria-components import |
| 2026-05-18 | InputDate focused-segment contrast fix: chained data-focused:data-placeholder:text-primary-fg (0,2,0 specificity) |
| 2026-05-18 | Shared assets: SectionDivider, IPhoneMockup, BackgroundPattern (4 patterns), Illustration (4 types), CreditCard (13 themes), QRCode+GradientScan — all source files, exports, tsup entries, package.json exports, nav entries, docs pages; build clean |
| 2026-05-18 | v0.1 blockers: Form, Modal, DateRangePicker, Carousel — all 4 implemented; CalendarCell extracted as shared module; react-hook-form + embla-carousel-react + @internationalized/date added; docs pages for all 4; packages/ui + docs build clean |
| 2026-05-18 | Modal fix: DialogTrigger incompatible with HTML-based Button; rewrote all demos to controlled state (isOpen/onOpenChange) |
| 2026-05-18 | Polish: /examples/auth-form (split-screen), /examples/settings (Section+Toggle+Modal+Select+Badge+Tooltip+AvatarLabelGroup); packages/skill/ created (system, tokens, components, patterns, responsive); changesets written (wave2-4, v0.1-blockers); README + quickstart written |
| 2026-05-18 | v0.2: Combobox, MultiSelect, TagSelect, Table, FileUpload, Toast (Sonner), CommandMenu, SidebarNav (5 variants) — all in @mvp-ui/ui. @mvp-ui/charts package created with BarChart, LineChart, PieChart, ProgressCircle (Recharts). /examples/dashboard-lite. Changesets v0.2-components.md + v0.2-charts-package.md. |
| 2026-05-19 | Breadcrumbs — Figma-only; 3 variants (text/text-with-line/button), 2 dividers (chevron/slash), showHomeIcon prop; 5 demo sections; nav.ts + skill/components.md updated |
| 2026-05-19 | New consumer app `apps/staffing-saas` — demos `@mvp-ui/ui` with slate-navy brand-token override (redefine `--brand-*` ramp in app globals.css; cascade-order verified). Single-route dark sidebar (VI CTV nav) + light Dashboard; non-Dashboard nav items → EmptyState via hashchange. tsc + biome clean (only pre-existing CSS `@source` parser note). Browser interaction not auto-verified — chrome-devtools MCP profile locked. |
| 2026-05-20 | `apps/staffing-saas` pages plan created in `docs/plans/staffing-saas-pages.md`. App migrated from hash nav to route-based shell with catch-all placeholders for unfinished modules. Dashboard completed as first nav item: richer operations overview, module links, hiring requests, verification queue, payment batch summary, and worker performance table. `Chính sách giá` removed from nav. `pnpm build` clean. |
| 2026-05-20 | `apps/staffing-saas` customers module completed. Added `/customers` listing page with search and status filters plus `/customers/[id]` detail page with company profile, main contact, hiring requests, open shifts, and billing snapshot. `pnpm build` clean. |
| 2026-05-20 | `apps/staffing-saas` workers module completed. Added `/workers` listing page with search and status filters plus `/workers/[id]` detail page with profile summary, shift history, and cross-links to verification, violations, and payment flows. `pnpm build` clean. |
| 2026-05-20 | `apps/staffing-saas` reconciliation-config list page added at `/customer-reconciliations` ("Cấu hình đối soát"); new sidebar entry directly under "Khách hàng". Page modeled on legacy "Tổng hợp cấu hình đối soát": filter bar (Tên công ty, Mã số thuế), 10-col table with info-tooltip headers, account-number badge, brand-color company link (detail route TBD), payment-doc warning pills, contact chips on `bg-info-bg`, and Pagination footer over 12 seed rows. Seed data in `customer-reconciliation-configs-data.ts`. `tsc` clean on the new files; dark-safe lint clean. |
| 2026-05-20 | New `Accordion` component in `@mvp-ui/ui` (`@radix-ui/react-accordion` + Untitled tokens, shadcn-style API). Animation keyframes added to `@mvp-ui/tokens` theme.css. Docs page + nav "Disclosure" section + skill index entry + changeset. `apps/staffing-saas`: replaced legacy `/reward-rules` (rule library demo) with new `/bonuses` (adhoc bonus instances) inspired by the legacy `Thưởng Adhoc` screenshots in `resources/ops-screenshots/bonus/`. List page: filter bar (search, DateRangePicker, status/manager/job-code Selects, refresh), 3 summary cards, 7-col table, Pagination. Detail page: header with status pill + destructive `Hủy thưởng`, `Kết quả thực tế` stat band (CTV requested/approved/qualified + budget max/applied/paid), two-column body — left worker ledger (search + Avatar + paginated Table), right config Accordion (6 sections, multi-open). Seed data in `bonuses-data.ts` is sanitized — synthetic IDs (`BNS-104x`, `JOB-100x`, `W-220xx`), no real partner brands or production amounts. Old `reward-rules` route + components dir deleted; sidebar nav updated `Thưởng → /bonuses`. `tsc` clean on new files; biome lint clean on new files; pre-existing `exactOptionalPropertyTypes` errors in shared assets / other detail pages remain. |
