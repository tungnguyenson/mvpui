---
"@mvp-ui/ui": minor
---

Add Wave 2–4 components: form controls, components, navigation, icons, shared assets.

**Wave 2 — Form Controls**
- `Checkbox` / `CheckboxBase` — React Aria checkbox; `sm`/`md` sizes; `label` + `hint` props
- `RadioButton` / `RadioGroup` — React Aria radio group; grouped selection
- `Toggle` / `ToggleBase` — React Aria switch; `sm`/`md` sizes; `slim` prop
- `TextArea` / `TextAreaBase` — multi-line text input with label/hint

**Wave 3 — Components**
- `Select` / `SelectItem` — React Aria combobox-style select; `items` + render-prop children; icon, avatar, supporting text per item
- `Slider` — React Aria slider; min/max/step; single and range modes
- `ButtonGroup` / `ButtonGroupItem` — segmented control for grouped actions
- `BadgeGroup` — avatar stack with count overflow
- `Dropdown` — context menu compound: `.Menu`, `.Item`, `.Popover`, `.DotsButton`, `.SectionHeader`, `.SubmenuTrigger`
- `FileUploadTrigger` — drag-and-drop file upload area

**Wave 4a — Components**
- `Tabs` / `TabList` / `Tab` / `TabPanel` — React Aria tabs; `underline` and `pill` variants; `sm`/`md` sizes
- `Pagination` — page navigation with `buildRange()`; `compact` prop; chevron icons
- `EmptyState` — zero-data placeholder; `icon`, `title`, `description`, `actions`
- `LoadingIndicator` — SVG spinner + dot-pulse; `sm`/`md`/`lg`; `primary`/`secondary`

**Wave 4b — Components + Navigation**
- `Drawer` / `DrawerHeader` / `DrawerBody` / `DrawerFooter` — React Aria Dialog/Modal; `left`/`right` sides; `sm`/`md`/`lg`
- `DatePicker` — React Aria DatePicker + Calendar; single-date selection
- `AppNav` / `AppNavItem` — presentational sidebar navigation; `items`/`logo`/`footer` props

**Foundations — Icons**
- 16 `IntegrationIcons` (Figma, Slack, Notion, …)
- 14 `SocialLogos` (Twitter, GitHub, Google, …)
- 56 `PaymentIcons` (Visa, Mastercard, Amex, …)

**Shared Assets**
- `SectionDivider` — full-width HR; `max-w-7xl`
- `IPhoneMockup` — SVG phone shell; `light`/`dark`/`auto` theme
- `BackgroundPattern` — decorative grid/dot backgrounds; 4 patterns; 3 sizes
- `Illustration` — 4 types (box, cloud, documents, credit-card); 3 sizes
- `CreditCard` — 13 themes; scalable width
- `QRCode` + `GradientScan` — `qr-code-styling` backed; branded corner handles; scan overlay
