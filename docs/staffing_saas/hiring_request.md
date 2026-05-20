# Hiring Request — Create / Edit Page — Content & UI Structure

Source: legacy ops screenshots (steps analyzed incrementally). Target: rebuild as a staffing-saas demo page using `@mvp-ui/ui` + design tokens.

Locale: Vietnamese (mirror copy verbatim from legacy where shown). Currency: VND. Date format: `DD/MM/YYYY`. Time range format: `HH:mm → HH:mm`.

## Pre-step (separate screen, before this form)

User picks **Công ty** + **Vị trí (loại công việc)** on a prior screen. Both values are carried into this create form via **wizard context** (not route params) so back-navigation preserves selection. Shown as immutable context (e.g. above the breadcrumb or in a fixed summary strip). They drive `pricingConfigId` resolution and are not re-edited inside the stepper.

---

## 1. Page shell — detail page

Shell pattern shared across all hiring-request surfaces (detail view + create/edit). Breadcrumb on top, entity header block below, then tabs/form body.

### 1.1 Breadcrumb (top bar)

| Slot | Content | Notes |
|---|---|---|
| Crumb 1 | `Home` icon | Links to root. |
| Crumb 2 | `Y/c tuyển dụng` | Links to list page. |
| Crumb 3 (detail) | `HR-2401 • CTV bán hàng cuối tuần` in `text-fg-brand` | Must `SetPageBreadcrumb` with `<code> • <title>`. Never default "Chi tiết". |
| Crumb 3 (create) | `Tạo mới` | |
| Crumb 3 (edit) | `Chỉnh sửa` | |
| Right cluster | Global search (`⌘K`), theme toggle, notification bell | Owned by app shell, not this page. |

### 1.2 Entity header block (detail page only)

Row layout, `bg-bg`, bottom `border-border-secondary`, vertical padding ~24px.

**Left (flex):**
- **Avatar tile** — 48×48 rounded-lg, `bg-primary`, `text-primary-fg` icon (e.g. `UserPlus`).
- **Stack:**
  - **Title row:** `text-xl font-semibold text-fg` ("CTV bán hàng cuối tuần") + **status badge** inline.
    - Status badge: `Badge type="pill-color" size="sm"`. Color by status: `warning` = `Đang tuyển`, `success` = `Hoàn thành`, `gray` = `Tạm dừng`, `error` = `Đã hủy`.
  - **Meta line:** `text-sm text-fg-tertiary` — joined by `•`: `<code>` • `<customer name>` • `<location>`. Example: `HR-2401 • GHN Sorting • Quận 1, TP.HCM`.
  - **Description:** `text-sm text-fg-secondary`, single line (truncate w/ tooltip on overflow). Example: `Khách hàng cần fill nhanh trước thứ 7. Ưu tiên CTV từng làm tại Highlands hoặc Vincom.`
  - **Tag row:** `Badge type="pill" color="gray" size="sm"` chips. Examples: `Retail`, `Activation`, `Cuối tuần`.

**Right (flex-end):**
- `Quay lại danh sách` — `Button color="secondary"`.
- `Đẩy CTV vào ca` — `Button color="primary"`. Primary action of the page.

### 1.3 Create / edit shell

- Breadcrumb crumb 3 = `Tạo mới` or `Chỉnh sửa`.
- No entity header block (no status, no actions yet) — just page title `Tạo tin tuyển dụng` / `Chỉnh sửa tin tuyển dụng` in `text-xl font-semibold text-fg`.
- Body = vertical stepper (§2) on left, active step form on right.
- Sticky footer: `Hủy` (secondary, left), `Lưu nháp` (secondary) + `Tiếp tục →` (primary) right. Last step: primary becomes `Đăng tin`.

---

## 2. Steps — convert legacy horizontal pipeline → vertical tabs

Legacy is an arrow/chevron pipeline (4 segments) sitting above the form. We replace it with a **vertical stepper** on the left rail.

Order (revised):

1. **Thông tin cơ bản** — Basic info
2. **Lịch làm việc** — Work schedule
3. **Lương & quyền lợi** — Pay & benefits *(name kept for legacy parity; benefits text actually lives in Step 1 via the `Quyền lợi` override row — confirm whether to rename to just `Lương`)*
4. **Đăng tuyển** — Posting (title, displayed comp, visibility, public preview)

Legacy `Mô tả & yêu cầu` is dropped — description now lives on the Position config ([PositionsTab.tsx](apps/staffing-saas/app/components/customers/detail/PositionsTab.tsx)) and is inherited via pre-step. Legacy `Hướng dẫn` is also dropped from this flow — confirm with stakeholder if instructions move elsewhere or are part of `Đăng tuyển`.

Use `Tabs` component with vertical orientation. If variant not yet in `@mvp-ui/ui`, add later.

**Navigation gating**: none. User can jump to any step at will. Validation runs per step only when the user tries to advance with `Tiếp tục →` or publish with `Đăng tin`. Step rail marks completed / has-errors / current — never disabled.

---

## 3. Step 1 — `Thông tin cơ bản`

Layout: single column of label/control rows. Label column ~200px (`text-fg-tertiary`), control column flex (`text-fg`). Required marker = red `*` after label.

### 3.1 Fields (visible in screenshot)

| # | Label | Field key (proposed) | Control | Required | Notes / copy |
|---|---|---|---|---|---|
| 1 | `Vị trí` | `positionId` | Read-only text — `position.name`, `text-fg font-semibold`. Inherited from pre-step (see top of doc). | — | Sourced from `CustomerPosition` ([apps/staffing-saas/app/components/customers/customer-detail-data.ts:46](apps/staffing-saas/app/components/customers/customer-detail-data.ts#L46)). |
| 2 | `Mô tả công việc` | `descriptionOverride` (+ `descriptionFromPosition`) | Textarea, **disabled by default**, pre-filled from `position.description`. Unlocked by the per-field `Chỉnh sửa` checkbox (see §3.2). When edited, the request stores an override; when checkbox is cleared, override is discarded and value reverts to position source. | — | Override pattern shared with rows 3 + 4. |
| 3 | `Yêu cầu` | `requirementsOverride` (+ `requirementsFromPosition`) | Textarea, disabled by default, pre-filled from `position.requirements`. Same `Chỉnh sửa` override pattern. | — | `CustomerPosition` schema currently lacks `requirements` — must be added to [customer-detail-data.ts:46](apps/staffing-saas/app/components/customers/customer-detail-data.ts#L46) + surfaced in [PositionsTab.tsx](apps/staffing-saas/app/components/customers/detail/PositionsTab.tsx) before this works end-to-end. |
| 4 | `Quyền lợi` | `benefitsOverride` (+ `benefitsFromPosition`) | Textarea, disabled by default, pre-filled from `position.benefits`. Same `Chỉnh sửa` override pattern. | — | `CustomerPosition` schema needs `benefits: string` added. Same caveat as row 3. |
| 5 | `Hướng dẫn, tài liệu` | `instructionsOverride` + `documentsOverride` (+ position-sourced equivalents) | Two stacked controls inside one row: textarea for instructions (disabled by default, pre-filled from `position.instructions`) + file list for documents (read-only chip list from `position.documents`, with `Thêm tài liệu` upload button when overriding). Single `Chỉnh sửa` checkbox unlocks both. | — | `CustomerPosition` needs `instructions: string` + `documents: { id, name, url }[]` added. Same caveat as row 3. |
| 6 | `Địa điểm làm việc` | `workLocationId` | Dropdown with two trailing actions: (a) refresh icon button to reload list, (b) external-link button `Quản lý địa điểm` opening location admin in new tab. Below the dropdown: sub-text `Đ/c: <full address>` in `text-fg-tertiary text-sm`. | ✅ | Example: `Đóng gói kho ECDC - ViettelPost. Quận 12, Hồ Chí Minh` → `Đ/c: Kho Guardian VTP-DC, Phường Trung Mỹ Tây, Quận 12, Hồ Chí Minh`. |
| 7 | `Số lượng` | `headcount` | Number input, min=1. | ✅ | Helper text (verbatim): `Lưu ý: Nếu định tuyển 10 thì bạn nên chọn 12 hoặc 15 vì thực tế có thể người lao động bận việc vào phút chót không đi làm nữa`. Render as `text-fg-tertiary text-sm` below input. |

### 3.2 Override pattern — `Chỉnh sửa` checkbox

Shared by rows 2–5 (description, requirements, benefits, instructions+documents — all inherited from `CustomerPosition`).

- Each row renders its label with a trailing `Chỉnh sửa` checkbox: `<label>Mô tả công việc</label> · <Checkbox label="Chỉnh sửa" />`.
- **Unchecked (default)**: input is `disabled`, value = position source (read-only fill). Visually muted (`bg-bg-secondary`, `text-fg-secondary`).
- **Checked**: input becomes editable. Value stored as request-level override. Show a small revert affordance (`Khôi phục mặc định` link in `text-fg-brand text-xs`) below the input — clicking it unchecks the checkbox and discards the override.
- Save semantics: when checkbox is unchecked at save time, persist `override = null` (server falls back to position source on read). When checked, persist current value.
- Position-source change after override exists: keep override (do not silently re-sync). Surface a tiny diff banner if position source diverges later: `Mô tả từ vị trí đã thay đổi — Khôi phục mặc định?`

### 3.3 Component mapping (`@mvp-ui/ui`)

| Field | Component |
|---|---|
| Read-only text (position name) | Plain `Text` blocks, no `Input` wrapper. |
| Overridable textarea | `Textarea` + sibling `Checkbox` for `Chỉnh sửa`. `disabled` prop bound to `!isOverriding`. |
| Document list | `Badge type="pill" color="gray"` chips with file name + download icon. Override mode adds an `Upload` button row. |
| Dropdowns | `Select` (Radix-based). With trailing button group, wrap in flex row: `<Select/> <IconButton Refresh/> <Button leadingIcon=ExternalLink>Quản lý địa điểm</Button>`. |
| Number input | `Input type="number"`. |
| Helper text | `<p className="text-sm text-fg-tertiary mt-1.5">…</p>` (or `InputHelper` if it exists). |
| Required marker | `<span className="text-fg-error ml-0.5">*</span>` on label. |

---

## 4. Step 2 — `Lịch làm việc`

Layout: stacked **section cards** (bordered, `bg-bg`, `rounded-xl`, `border-border-secondary`, `p-5`). Each card has a bold header (`text-base font-semibold text-fg`) and a single-column label/control grid inside.

### 4.1 Section — `Lịch` (Schedule)

| # | Label | Field key | Control | Required | Notes / copy |
|---|---|---|---|---|---|
| 1 | `Ngày bắt đầu` | `startDate` | Date input + calendar icon button trigger. Format `DD/MM/YYYY`. | ✅ | Default = today. |
| 2 | `Ngày kết thúc` | `endDate` | Date input + calendar icon button trigger. Format `DD/MM/YYYY`. | ✅ | Must be `>= startDate`. Default = `startDate`. |
| 3 | `Lịch trong tuần` | `weekdays` | Checkbox row, 7 items: `Hai`, `Ba`, `Tư`, `Năm`, `Sáu`, `Bảy`, `CN`. Only Sunday (`CN`) label rendered in `text-fg-warning`; Saturday (`Bảy`) stays neutral (blue-collar convention — Saturday is a regular work day). | ✅ | At least one day must be checked. Stored as array of `1..7` (Mon=1, Sun=7). |
| 4 | `Yêu cầu làm đủ ngày` | `requireFullAttendance` | Single checkbox. | — | Helper text (verbatim, in `text-fg-tertiary text-sm`): `* Lưu ý: Sẽ có ít CTV ứng tuyển hơn vì nếu nghỉ sẽ bị phạt`. |
| 5 | `Giờ bắt đầu` | `startTime` | Time input + clock icon trigger. Format `HH:mm`. | ✅ | Example: `16:00`. |
| 6 | `Giờ kết thúc` | `endTime` | Time input + clock icon trigger. Format `HH:mm`. | ✅ | Example: `21:00`. If `endTime <= startTime`, treat as overnight shift — surface a confirmation hint. |
| 7 | `Nghỉ giải lao` | `breakMinutes` | Number input with suffix `phút`. | — | Helper: `(Đơn vị phút)` — unit minutes. Defaults empty / 0. Subtracted from paid hours in downstream pricing. |

### 4.2 Section — `Chấm công` (Timekeeping)

| # | Label | Field key | Control | Required | Notes / copy |
|---|---|---|---|---|---|
| 1 | `Làm tròn giờ công mỗi` | `roundingMinutes` | Number input with suffix `phút`. Inline layout: `[label] [input] phút`. | ✅ | Default = `1`. Helper (verbatim): `Cách làm tròn: Round-up. Ví dụ 0,5 = 1 và 0,4 = 0`. (NB: copy says "Round-up" but example is round-half-up. Keep verbatim — flag in open decisions.) |
| 2 | `Ghi nhận giờ công` | `attendanceMode` | Radio group, 2 vertically stacked options. One option always preselected. | — | `precise` = `Chính xác, ghi nhận theo giờ vào/ra thực tế` (**default**). `simple` = `Đơn giản, chỉ cần CTV có chấm công 1 lần thì sẽ được tính đủ giờ công`. Drives payroll math: `precise` uses actual timestamps; `simple` credits full shift on any check-in. |

### 4.3 Section — `Tăng ca` (Overtime)

| # | Label | Field key | Control | Required | Notes / copy |
|---|---|---|---|---|---|
| 1 | `Có tăng ca` | `allowsOvertime` | Single checkbox. | — | When unchecked, sub-block 4.3.1 is hidden. |

#### 4.3.1 Sub-block — `Cách tính tăng ca` (Overtime calc mode)

Visible only when `allowsOvertime = true`. Radio group, 2 vertically stacked options. Each option has a label + helper-text block + one conditional sub-field that appears when the option is selected.

| # | Label | Field key | Control | Required (when `allowsOvertime`) | Notes / copy |
|---|---|---|---|---|---|
| 1 | `Cách tính tăng ca` | `overtimeCalcMode` | Radio, 2 options (see below). | ✅ | One must be selected. |
| 2 | *(sub-field — option A)* `Số phút tối thiểu sau giờ chính thức để tính tăng ca` | `overtimeMinMinutesAfterShift` | Number input with suffix `phút`. Visible only when `overtimeCalcMode = afterScheduledEnd`. | — | Optional buffer. Default `0`. |
| 3 | *(sub-field — option B)* `Số giờ công chính thức / ngày` | `overtimeDailyHourLimit` | Number input with suffix `giờ`. Visible only when `overtimeCalcMode = dailyHourThreshold`. | ✅ (when option B) | Example default: `8`. |

**Radio options (verbatim copy + helper text):**

- `afterScheduledEnd` — `Mặc định, quá giờ chính thức là tăng ca`
  > `Ví dụ: Giờ làm chính thức từ 8:00 - 14:00 (6 tiếng). Công tăng ca bắt đầu tính sau mốc 14:00 hoặc cộng thêm cấu hình số phút tối thiểu dưới đây`
- `dailyHourThreshold` — `Quá số Giờ công chính thức quy định/ngày là tăng ca`
  > `Ví dụ: Giờ công chính thức quy định mỗi ngày là 8h, thì không quan trọng giờ vào/ra bao nhiêu, ca bắt đầu/kết thúc giờ nào. Miễn là số giờ công thực thế được ghi nhận > 8h thì được tính tăng ca`

Helper text renders below each radio label in `text-sm text-fg-tertiary`, indented under the radio button.

### 4.4 Component mapping (`@mvp-ui/ui`)

| Field | Component |
|---|---|
| Date input | `DatePicker` (or `Input` + popover calendar if no primitive yet — flag for build). |
| Time input | `TimePicker` (or `Input type="time"` fallback). |
| Weekday picker | Inline `Checkbox` group. Could swap to a `ToggleGroup type="multiple"` for nicer affordance. |
| Standalone checkbox | `Checkbox` + label. |
| Number input | `Input type="number"` with trailing suffix slot (`phút`). |
| Attendance mode | `RadioGroup` (Radix) — vertical stack, each option `text-sm text-fg`. |
| Section card | `<section className="rounded-xl border border-border-secondary bg-bg p-5">` + header + content. |

### 4.5 Validation

- `endDate >= startDate`.
- `weekdays.length >= 1`.
- Overnight shift (`endTime <= startTime`) — allow, but show inline hint `Ca qua đêm — sẽ tính sang ngày hôm sau`.
- `breakMinutes >= 0`, `< (endTime - startTime in minutes)`.
- `roundingMinutes >= 1`, integer.
- `overtimeCalcMode`: required when `allowsOvertime`.
- `overtimeMinMinutesAfterShift`: integer ≥ 0 (only when option A).
- `overtimeDailyHourLimit`: integer ≥ 1 (only when option B).

---

## 5. Step 3 — `Lương & quyền lợi`

Layout: stacked section cards (same pattern as §4). Pricing config is the input; the income preview below derives from it + Step 2 schedule.

### 5.1 Section — `Cấu hình cước phí` (Pricing config — drives all downstream calc)

| # | Label | Field key | Control | Required | Notes / copy |
|---|---|---|---|---|---|
| 1 | `Cấu hình cước phí` | `pricingConfigId` | Default: link-style display (`text-fg-brand`) opening config in new tab. Format: `<name> (áp dụng từ DD/MM/YYYY đến DD/MM/YYYY)`. Example: `CTV kho - Hồ Chí Minh (áp dụng từ 03/12/2025 đến 31/12/2026)`. If multiple configs match company+position+location, becomes a `Select` to choose between them. | ✅ | Source of truth for worker rate, service fee, bonuses, and gross-margin calc. Changing it re-renders §5.2 instantly. |

### 5.2 Section — `Thu nhập` (Income preview, read-only)

All fields display-only; recompute from §5.1 + Step 2 schedule.

| # | Label | Field key | Display | Notes |
|---|---|---|---|---|
| 1 | `Thu nhập dự tính` | `estimatedIncomePerShift` | Bold money, `text-fg font-semibold`. Format: `162.500đ/ca`. Below: link `Click để xem chi tiết` in `text-fg-brand text-sm`, opens breakdown modal or drawer. | Currency = VND, suffix `đ`. Per-shift unit (`/ca`). |
| 2 | *(redacted block 1 — likely base rate breakdown)* | TBD | TBD | Needs un-redacted screenshot. Probably `Đơn giá CTV` (worker base rate) row. |
| 3 | *(redacted block 2 — likely fee / total breakdown)* | TBD | TBD | Probably `Phí dịch vụ` (platform fee) + `Tổng chi phí khách hàng` (customer total). |
| 4 | `% Biên LN gộp` | `grossMarginPct` | Plain text, `text-fg font-semibold`. Format: `5%`. | Gross margin %. Derived = `(customerTotal - workerPay) / customerTotal`. Display-only. |

Breakdown modal/drawer (triggered by `Click để xem chi tiết`): TBD — needs screenshot. Likely a table of per-line items (base, OT, bonus, allowances, fee, total).

### 5.3 Section — `Thưởng thêm` (Adhoc bonus, requires approval)

Staffing-company-funded incentive layered on top of the customer-paid rate. **NOT billed to customer** — reduces staffing company's gross margin (subtract from §5.2 `grossMarginPct` numerator). Used when standard comp can't attract enough workers (peak season, hard-to-fill shift).

| # | Label | Field key | Control | Required | Notes / copy |
|---|---|---|---|---|---|
| 1 | `Có thưởng thêm` | `hasAdhocBonus` | Single checkbox. | — | When unchecked, sub-fields hidden. |
| 2 | `Số tiền thưởng` | `adhocBonusAmount` | Number input + unit segmented control (`/ca` ↔ `/h`). Display format prefixes `+` and suffixes `đ` — e.g. `+20.000đ/ca`. | ✅ (when `hasAdhocBonus`) | Stored as `{ amount: number, unit: 'shift' \| 'hour' }`. |
| 3 | `Lý do` | `adhocBonusReason` | Textarea, ~3 rows. | ✅ (when `hasAdhocBonus`) | Justification shown to approver. Min 20 chars. |
| 4 | `Trạng thái duyệt` | `adhocBonusApprovalStatus` | Read-only `Badge`. | — | `pending` = `Chờ duyệt` (warning), `approved` = `Đã duyệt` (success), `rejected` = `Từ chối` (error). Defaults `pending` on save. Posting cannot publish (`Đăng tin` blocked at Step 4) while status = `pending` or `rejected` if bonus is enabled. |

Approval flow: on submit with `hasAdhocBonus = true`, request is routed to a staffing-company manager. Manager sees the reason + margin impact and approves/rejects. Inline hint near the field: `* Cần được duyệt trước khi tin đăng được công khai.`

Margin impact (live, in §5.2): `effectiveMarginPct = (customerTotal - workerPay - adhocBonusTotal) / customerTotal`. Render a secondary row in §5.2 when bonus enabled: `% Biên LN sau thưởng` in `text-fg-warning` if it drops below a threshold (TBD).

### 5.4 Section — `Thanh toán` (Payment terms)

| # | Label | Field key | Control | Required | Notes / copy |
|---|---|---|---|---|---|
| 1 | `Chu kỳ thanh toán` | `payCycle` | Dropdown. | ✅ | Known option: `Tiền ngay` (immediate). Other options TBD — likely `Hàng tháng`, `2 lần / tháng`, etc. Selecting a value resolves the policy text shown in row 2. |
| 2 | `Hình thức trả lương` | `payTermsDescription` (derived) | **Read-only** policy block — disabled textarea or plain prose card (`bg-bg-secondary p-3 rounded-lg text-sm text-fg`). Auto-resolved from the selected `payCycle` template. Not editable. | — | Example resolved text for `Tiền ngay`-equivalent cycle: `Lương sẽ được thanh toán sau 2 ngày làm việc kể từ ngày chốt công, không tính Thứ 7 và Chủ nhật.` Below the block, render an italic `text-fg-tertiary text-sm` helper showing other template examples — `Ví dụ:` · `Trả liền, tiền mặt hoặc Momo` · `Trả hàng tháng, ngày 01-05` · `Trả 2 lần/ tháng, vào ngày 15 - 20 và 01 - 05`. |

### 5.5 Component mapping (`@mvp-ui/ui`)

| Field | Component |
|---|---|
| Pricing config | Default `<a>` link styled `text-fg-brand`. Multi-match fallback: `Select` with link affordance after pick. |
| Read-only money / pct row | Plain label + `<span className="font-semibold text-fg">…</span>` value. |
| Detail link | `<button>` styled as link, `text-fg-brand`. Opens `Dialog` or side `Drawer` with breakdown table. |
| Dropdown | `Select`. |
| Textarea | `Textarea` (autosize). |
| Example list | `<ul className="mt-2 list-disc pl-5 text-sm italic text-fg-tertiary">`. |
| Bonus amount + unit | `<Input type="number"/>` + `<ToggleGroup>` (`/ca`, `/h`) — reuse §6.1 pattern. |
| Approval status | `Badge type="pill-color"` colored by status. |

### 5.6 Validation

- `pricingConfigId`: required. Must be active (today ∈ `[appliedFrom, appliedTo]`).
- `adhocBonusAmount.amount`: required when `hasAdhocBonus`, integer ≥ 1000.
- `adhocBonusReason`: required when `hasAdhocBonus`, trimmed length ≥ 20.
- `payCycle`: required, enum. (Derives `payTermsDescription` — no separate validation.)

### 5.7 Open for step 3

- Un-redact rows 2 & 3 (base rate / fee breakdown). Needs clean screenshot.
- Spec out detail drawer (`Click để xem chi tiết`) contents.
- Enumerate all `payCycle` options.
- Source the full `payCycle` → policy-text map (one template per cycle option).
- Confirm picker behavior when 0 active pricing configs match — block step, or show "request new config" CTA?
- Confirm adhoc-bonus approver role + UI surface (separate manager inbox vs in-line approve button for high-tier users).
- Confirm margin warning threshold (when does `% Biên LN sau thưởng` flip to warning color?).
- Confirm whether rejected bonus locks the request entirely or just blocks publishing while creator edits.

---

## 6. Step 4 — `Đăng tuyển`

Layout: two-column on `>=lg`. Left column = posting form (section cards). Right column = sticky live preview card.

### 6.1 Section — `Nội dung tin đăng` (Posting content)

| # | Label | Field key | Control | Required | Notes / copy |
|---|---|---|---|---|---|
| 1 | `Tiêu đề tin đăng` | `postingTitle` | Text input. | ✅ | Default = `position.name` (from pre-step). Editable. Live-bound to preview card title. |
| 2 | `Thù lao hiển thị` | `displayedPay` | Composite: number input + unit segmented control (`/ca` ↔ `/h`). | ✅ | Public-facing comp shown on the job card. Distinct from internal `estimatedIncomePerShift` (§5.1). Examples: `165.000đ/ca`, `35.000đ/h`. Stored as `{ amount: number, unit: 'shift' \| 'hour' }`. Format as VND with `đ` suffix + unit. |
| 3 | `Chế độ hiển thị` | `visibility` | Radio group, 3 options stacked vertically. Each option has label + 1-line description. | ✅ | `public` = `Công khai` — `Hiển thị cho tất cả freelancer`. `unlisted` = `Hạn chế` — `Chỉ hiển thị qua link trực tiếp`. `private` = `Ẩn` — `Chỉ freelancer được mời mới thấy`. Default = `public`. |

### 6.2 Section — `Xem trước` (Preview, right column)

Live preview card mirroring how the posting renders in the freelancer app. Updates as user edits §6.1.

Card structure (`border border-border-secondary rounded-xl bg-bg shadow-xs p-4`):

| Slot | Source | Treatment |
|---|---|---|
| Company logo | `company.logoUrl` | 40×40 rounded-md tile top-left. Fallback = monogram on `bg-brand-solid`. |
| Posting title | `postingTitle` | `text-base font-semibold text-fg`. |
| Position name | `position.name` | `text-sm text-fg-secondary`. |
| Location | `workLocation.shortName` + line below `workLocation.address` | `text-sm text-fg-tertiary`, leading `MapPin` icon. |
| Comp chip | `displayedPay` (formatted) | `Badge type="pill-color" color="success" size="md"`. Example: `165.000đ/ca`. |
| Bonus chip(s) | derived from §5 benefits (if any) | Same badge variant, color `brand` or `warning`. TBD until §5 redacted rows resolved. |
| Visibility hint | `visibility` | Small footer row, icon + label. `Globe` for `public`, `Link` for `unlisted`, `EyeOff` for `private`. |

### 6.3 Component mapping (`@mvp-ui/ui`)

| Field | Component |
|---|---|
| Text input | `Input`. |
| Comp composite | `<Input type="number"/>` + `<ToggleGroup>` (2 items `/ca`, `/h`). |
| Visibility | `RadioGroup` (Radix) vertical, each item with label + description (Untitled UI "radio with text" pattern). |
| Preview card | `<aside>` with sticky positioning on `>=lg`, plain layout inside. |
| Logo fallback | Reuse the avatar-tile pattern from §1.2. |

### 6.4 Validation

- `postingTitle`: required, trimmed length ≥ 5, ≤ 120.
- `displayedPay.amount`: required, integer ≥ 1000.
- `displayedPay.unit`: required enum.
- `visibility`: required enum.

### 6.5 Open for step 4

- Confirm `displayedPay` is freely entered or auto-suggested from `estimatedIncomePerShift` (§5.1).
- Confirm exact preview-card layout matches the live freelancer app card — needs a real screenshot to mirror 1:1.
- Confirm whether `Hạn chế (unlisted)` produces a shareable token URL (likely yes — affects backend schema).
- Confirm bonus chip data source — pulled from §5 benefits or separately entered here.

---

## 7. Form actions — Save / Publish / Cancel

Sticky footer at the bottom of the form body (full width, `border-t border-border-secondary`, `bg-bg p-4`). Same footer shown on every step; button matrix depends on **step position** + **mode** (create vs edit) + **draft state**.

### 7.1 Button matrix

| Mode | Step | Left | Right cluster |
|---|---|---|---|
| Create | Steps 1–3 | `Hủy` (secondary, ghost) | `Lưu nháp` (secondary) · `Tiếp tục →` (primary) |
| Create | Step 4 (last) | `Hủy` (secondary, ghost) | `Lưu nháp` (secondary) · `← Quay lại` (secondary) · `Đăng tin` (primary) |
| Edit (draft) | Any step | `Hủy` (secondary, ghost) | `Lưu` (secondary) · `Tiếp tục →` (primary, hidden on last step) · `Đăng tin` (primary, last step only) |
| Edit (published) | Any step | `Hủy` (secondary, ghost) | `Lưu` (primary) |

> `Lưu nháp` exists **only in create mode**. Edit mode uses `Lưu` (no draft concept post-creation).

### 7.2 Action semantics

| Button | Action | Validation | Side effects |
|---|---|---|---|
| `Hủy` | Discard unsaved changes, return to list. Confirm-dialog if dirty: `Bỏ thay đổi chưa lưu?` | none | — |
| `Lưu nháp` | Persist as `draft` status. Available on all steps in create mode. | per-field shape only; cross-field rules deferred | request becomes editable later via the list. |
| `Lưu` | Persist current values to existing request. Used in edit mode. | full validation for current step | If request is `published`, surface a warning before save when changes affect already-applied freelancers (`Thay đổi này sẽ ảnh hưởng đến X CTV đã ứng tuyển`). |
| `← Quay lại` | Jump to previous step. No persistence. | — | scroll resets to top. |
| `Tiếp tục →` | Validate current step → advance. | full step validation | step in stepper marked complete. |
| `Đăng tin` | Validate all steps → publish (`status = published`, default badge color `warning` = `Đang tuyển`). | **all** steps must be valid; blocked if `hasAdhocBonus` + `adhocBonusApprovalStatus ≠ approved`. | sends to freelancer feed per `visibility` rule from §6.1. |

### 7.3 Loading + error states

- Primary action button shows spinner on click (`isLoading` prop). All other buttons disabled while in flight.
- On server error: inline toast at top of footer area, `bg-error-bg text-error-fg border-error-border`, dismissible. Field-level errors also re-marked.
- On success: small toast at top-right of viewport, `bg-success-bg`, `Đã lưu` / `Đã đăng tin`.

### 7.4 Keyboard

- `Enter` inside any input does NOT submit (textarea + form footer too easy to misfire). Only the explicit footer button triggers save/publish.
- `Cmd/Ctrl + S` triggers `Lưu nháp` (create) or `Lưu` (edit) — shown as a hint on hover.

---

## 8. Locked decisions

- **No auto-save.** Drafts persist only on explicit `Lưu nháp`.
- **All fields stay editable** in edit mode (no locked fields post-publish for now).
- **Status lifecycle** intentionally deferred — not in scope right now.
- **Step navigation**: no gating; user jumps freely (see §2).
- **`Lưu nháp`** in create mode only.

## 9. Still open before build

1. Bonus chip data source in §6.2 preview — derive from `Quyền lợi` text (Step 1 row 4) or a structured field?
2. `displayedPay` autosuggest from `estimatedIncomePerShift` (§5.1), or always manual?
3. Adhoc-bonus approver UI surface — separate manager inbox vs in-line approve.
4. Margin warning threshold for `% Biên LN sau thưởng`.
5. Pricing-config picker when 0 active configs match — block step or show "request new config" CTA?
6. Full `payCycle` → policy-text map (one template per cycle option).
7. Un-redact §5.2 rows 2 & 3 (base rate / fee breakdown).
8. Spec out the `Click để xem chi tiết` breakdown drawer in §5.2.
9. Confirm preview-card layout in §6.2 mirrors live freelancer app card 1:1.
10. `Hạn chế (unlisted)` — does it produce a shareable token URL?
