# MVP UI — Component Index

Import all components from `@mvp-ui/ui`.

> **v0.1 inventory** — index table format. One row per logical component; sub-components listed in the same row. Detailed prop docs live in the source file and docs workbench at `apps/docs`.

---

## Buttons

| Component | Named exports | When to use | Gotcha |
|---|---|---|---|
| Button | `Button`, `buttonVariants` | Primary CTA, form submit, nav actions | HTML-based — use `disabled` not `isDisabled`, `onClick` not `onPress` |
| ButtonUtility | `ButtonUtility` | Icon-only utility actions (edit, delete, more) | Uses `icon` prop; always set `aria-label` |
| CloseButton | `CloseButton` | Dismiss dialogs, modals, alerts | HTML-based; `onClick` for close handler |
| SocialButton | `SocialButton` | OAuth / social sign-in flows | Pass `provider` prop; see social-logos exports for icons |
| AppStoreButtons | `AppStoreButton`, `GooglePlayButton`, `AppGalleryButton`, `GalaxyStoreButton` (+ Outline variants) | App store CTAs | Outline variants: `AppStoreOutlineButton` etc. |
| MacAppStoreButton | `MacAppStoreButton`, `MacAppStoreOutlineButton` | Mac App Store CTAs | — |
| ButtonGroup | `ButtonGroup`, `ButtonGroupItem` | Segmented selection, toolbar grouping | Items need unique `id`; manage selection externally |

---

## Inputs

| Component | Named exports | When to use | Gotcha |
|---|---|---|---|
| Input | `Input`, `InputBase`, `inputFieldVariants` | Standard text input | `InputBase` = unstyled base; `Input` = full field with label/hint |
| Label | `Label` | Form field labels | `isRequired` prop adds `*` indicator |
| HintText | `HintText`, `hintTextVariants` | Helper / error text below fields | `variant="error"` for red error state |
| InputGroup | `InputGroup`, `InputAddon` | Inputs with prefix/suffix addons (icons, text, buttons) | Wrap `Input` inside `InputGroup` |
| InputDate | `InputDate` | Native date input | Not same as `DatePicker` (no calendar UI) |
| InputFile | `InputFile` | File selection via input | Use `FileUploadTrigger` for drag-drop |
| InputNumber | `InputNumber` | Numeric input with +/− steppers | Uses `AriaNumberField` internally |
| InputTags | `InputTags`, `InputTagsOuter` | Tag entry (comma/enter delimited) | `InputTagsOuter` = standalone container |
| PinInput | `PinInput`, `usePinInputContext` | OTP / PIN entry | Compound: `PinInput.Root`, `.Slot`, `.Group` |

---

## Form Controls

| Component | Named exports | When to use | Gotcha |
|---|---|---|---|
| Checkbox | `Checkbox`, `CheckboxBase` | Boolean on/off, multi-select lists | React Aria — `isSelected` + `onChange: (v: boolean) => void` |
| Radio | `RadioButton`, `RadioButtonBase`, `RadioGroup` | Single-select from a group | Wrap items in `RadioGroup`; `value` + `onChange` on group |
| Toggle | `Toggle`, `ToggleBase` | Settings toggles, feature flags | React Aria — `isSelected` + `onChange: (v: boolean) => void` |
| Textarea | `TextArea`, `TextAreaBase` | Multi-line text entry | `TextAreaBase` = unstyled; `TextArea` = full with label/hint |

---

## Components

| Component | Named exports | When to use | Gotcha |
|---|---|---|---|
| Accordion | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | Vertically stacked, expandable panels (FAQ, config groups) | Radix-based; mirrors shadcn API. `type="single"` + `collapsible` for one-at-a-time, `type="multiple"` for many open. `AccordionTrigger` accepts `trailing` slot for badges. |
| Alert | `Alert`, `AlertTitle`, `AlertDescription` | Inline feedback (success, error, warning, info) | `variant` prop, not `color` |
| Avatar | `Avatar` | User/entity image representation | `src` optional; falls back to initials or placeholder. `state="verified"\|"blocked"` for status badge (mutually exclusive with `status` dot and `count` badge) |
| AvatarLabelGroup | `AvatarLabelGroup` | Avatar + name + subtitle inline | `size` required (`sm`/`md`/`lg`); extends `AvatarProps` |
| AvatarProfilePhoto | `AvatarProfilePhoto` | Editable avatar with upload overlay | `state="verified"\|"blocked"\|null` (null = no badge) |
| AvatarCompanyIcon | `AvatarCompanyIcon` | Company logo avatar | — |
| AvatarCount | `AvatarCount` | "+N" overflow avatar in groups | — |
| AvatarAddButton | `AvatarAddButton` | Add member button in avatar groups | — |
| Badge | `Badge`, `BadgeWithDot`, `BadgeWithIcon`, `BadgeWithFlag`, `BadgeWithImage`, `BadgeWithButton`, `BadgeIcon` | Status labels, counts, plan tiers | `color` + `type` props; `type="pill-color"` is default rounded pill |
| BadgeGroup | `BadgeGroup` | Avatar stacks with count overflow | — |
| Card | `Card`, `CardHeader`, `CardContent`, `CardFooter`, `CardTitle`, `CardDescription` | Content containers | presentational; no built-in shadow token — add via className |
| Carousel | `Carousel` | Image/card sliders | Compound namespace: `Carousel.Root/Content/Item/PrevTrigger/NextTrigger/IndicatorGroup/Indicator` |
| DatePicker | `DatePicker` | Single-date calendar picker | React Aria; `value` is `DateValue` from `@internationalized/date` |
| DateRangePicker | `DateRangePicker` | Date range with presets | Preset sidebar; Apply/Cancel footer; controlled via `value`/`onApply` |
| Dot | `Dot` | Status indicator dot | — |
| Drawer | `Drawer`, `DrawerHeader`, `DrawerBody`, `DrawerFooter` | Side panel (left/right) | Controlled state: `isOpen`/`onOpenChange` on `Drawer`; same as Modal |
| Dropdown | `Dropdown` | Context menus, kebab menus | Compound: `Dropdown.Menu`, `.Item`, `.Popover`, `.DotsButton`, `.SectionHeader`, `.SubmenuTrigger` |
| EmptyState | `EmptyState` | Empty list / zero-data placeholder | `icon`, `title`, `description`, `actions` props |
| FeaturedIcon | `FeaturedIcon` | Large icon in onboarding / feature callouts | `icon`, `size`, `color`, `type` props |
| FileUploadTrigger | `FileUploadTrigger` | Drag-and-drop file upload area | Accepts files via click or drag; `onUpload` callback |
| LoadingIndicator | `LoadingIndicator` | Spinner or pulse loading state | `variant="spinner"/"dots"`; `size="sm"/"md"/"lg"` |
| MetricCard | `MetricCard` | KPI tile with label, value, change badge, optional sparkline/footer | `responsive` default `true` — below `lg` shrinks value, hides `helpText`, tightens padding. Set `responsive={false}` to keep desktop layout at every viewport. |
| MetricStrip | `MetricStrip` | Compact horizontal KPI row — icon chip + value + label inline, separated by dividers | Props-array API (`items: MetricStripItem[]`). `mobileLayout="row"` (default) keeps row at all sizes; `"stack"` switches to vertical below `lg`. Smaller footprint than a grid of `MetricCard`. |
| Modal | `Modal`, `ModalOverlay`, `Dialog`, `ModalHeader`, `ModalBody`, `ModalFooter` | Dialogs, confirmations, destructive actions | Use controlled state — `DialogTrigger` incompatible with non-RAC Button |
| Pagination | `Pagination` | Page navigation for tables/lists | `page`, `totalPages`, `onPageChange` props |
| Progress | `Progress` (circle + bar) | Task / upload progress | — |
| Section | `Section` | Settings page content groups | `title`, `description`, `actions` props; adds `border-b` divider |
| Select | `Select`, `SelectItem` | Single-option dropdown | React Aria; `items` array + render-prop children; use `Select.Item` |
| Slider | `Slider` | Range / value sliders | React Aria; `value`, `onChange`, `min`, `max`, `step` |
| Tab / Tabs | `Tabs`, `TabList`, `Tab`, `TabPanel`, `TabVariant`, `TabOrientation` | Tabbed content switching | React Aria; `variant="underline"/"pill"`, `orientation="horizontal"/"vertical"` (vertical = left-rail layout — underline shows left-line indicator, pill shows brand-tinted active row); `Tab` has `icon` + `value` (trailing neutral pill — counts, labels) |
| Tag | `Tag`, `TagGroup`, `TagList`, `TagItem`, `TagAvatar` | Filterable label groups, multi-select tags | `TagGroup` manages selection; `TagList` + `TagItem` for display |
| Tooltip | `Tooltip`, `TooltipTrigger` | Hover label for icon buttons | Wrap trigger in `TooltipTrigger` inside `Tooltip` |

---

## Forms

| Component | Named exports | When to use | Gotcha |
|---|---|---|---|
| Form | `Form`, `HookForm`, `FormField`, `useFormFieldContext` | react-hook-form integration | `HookForm` = `FormProvider` + Aria `Form`; `FormField` extends `UseControllerProps` |

---

## Navigation

| Component | Named exports | When to use | Gotcha |
|---|---|---|---|
| Breadcrumbs | `Breadcrumbs`, `BreadcrumbItem` | Page hierarchy trail; headers, nested routes | `items` array; `divider="chevron"/"slash"`; `variant="text"/"text-with-line"/"button"`; `showHomeIcon` (default true) |
| PageHeader | `PageHeader`, `PageHeaderPrimaryAction` | Standard page-top block: breadcrumb + title + description + primary CTA + secondary actions row. Use in every list/detail page inside `PageScaffold` instead of hand-rolling `<h1>` + `<p>` + button row | `title` is the simple form; pass `children` to override the title/description column when a detail page needs a leading icon, inline status badges, or tag chips. `primaryAction={{label, icon, href, onClick}}` for the single-button 80% case — renders inline `<Button>` on desktop and a fixed-position `<FAB>` on mobile. `actions` for multi-button rows (back+save, filter+export+create) — always inline, never becomes a FAB. `description`/`breadcrumbs` optional; `variant="default"/"compact"`. Title/description/breadcrumbs/children are `hidden md:flex`; `actions` stays visible at all viewports. Pass `linkAs={NextLink}` (done by `AppPageHeader` in staffing-saas) for client-side nav on `primaryAction.href`. Breadcrumb renders w/ `showHomeIcon={false}` |
| FAB | `FAB` | Floating action button — circular, fixed bottom-right of viewport. Typically not used directly; passed as `PageHeader`'s `primaryAction` slot which renders it on mobile only | `label` required (used as `aria-label`); `icon` accepts lucide component OR ReactNode; `href` for nav (use `linkAs` to integrate Next Link); `onClick` for handler; `position="fixed"` (default) pins to viewport bottom-right w/ safe-area inset, `position="static"` for in-flow demos. Color `primary` (default) or `secondary`. Pair w/ `pb-24 md:pb-0` on content so the FAB doesn't cover bottom rows |
| AppNav | `AppNav`, `AppNavItem`, `AppNavItemDef` | Sidebar navigation shell | presentational; pass `items`, `logo`, `footer` props |

---

## Shared Assets

| Component | Named exports | When to use | Gotcha |
|---|---|---|---|
| SectionDivider | `SectionDivider` | Full-width HR between page sections | Max-width `max-w-7xl` |
| IPhoneMockup | `IPhoneMockup` | Device frame for mobile screenshots | `theme="light"/"dark"/"auto"`; scale via CSS `width` |
| BackgroundPattern | `BackgroundPattern` | Decorative grid/dot backgrounds | `pattern="circle"/"square"/"grid"/"grid-check"`; `currentColor` |
| Illustration | `Illustration`, `BoxIllustration`, `CloudIllustration`, `DocumentsIllustration`, `CreditCardIllustration` | Zero-state / onboarding illustrations | `type` and `size` props |
| CreditCard | `CreditCard` | Credit card UI mock | 13 `theme` options; scale via `width` |
| QRCode | `QRCode`, `GradientScan` | QR code display with branded handles | Backed by `qr-code-styling`; `GradientScan` is an overlay |

---

## Integration Icons

| Component | Named exports | When to use |
|---|---|---|
| IntegrationIcons | 16 named exports (e.g. `FigmaIcon`, `SlackIcon`, `NotionIcon`) | App integration logos in lists/tables |
| SocialLogos | 14 named exports (e.g. `TwitterLogo`, `GitHubLogo`) | Social network logos |
| PaymentIcons | 56 named exports (e.g. `VisaIcon`, `MastercardIcon`) | Payment method logos |
