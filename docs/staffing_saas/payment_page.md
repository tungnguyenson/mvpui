# Worker Payment Batches — Content & UI Structure

Source: legacy ops screenshots in `resources/ops-screenshots/payments/`. Target: rebuild as staffing-saas demo under `apps/staffing-saas/app/(workspace)/worker-payment-batches/` using `@mvp-ui/ui` + design tokens (no raw color/spacing).

Locale: Vietnamese (mirror copy verbatim from legacy where shown). Currency: VND, `vi-VN` grouping with `.` thousand separator, `đ` suffix. Date format: `DD/MM/YYYY`. Time format: `HH:mm`. Period code format: `<half><_month_><year>`, e.g. `2_4_2026` = second half of April 2026.

> **PII policy (HARD).** Do NOT copy any real names, phones, citizen IDs, tax IDs, bank holder names, full bank accounts, or HubSpot/Slack handles from screenshots into demo seed data. Replace with synthetic placeholders:
> - Worker names → `Cộng tác viên A`, `Cộng tác viên B`, … or kebab-id `ctv-001`
> - Worker code (Mã CTV) → six-digit synthetic, e.g. `220001`, `220002`
> - Phone → `09•• ••• •••`
> - Bank account → first 3 + last 2 digits, middle masked: `202•••••809`
> - Bank holder name (`LE HOANG PHUONG`) → `[Worker A]` or omit; show only bank brand + masked account
> - PIC handles (`thuan.nguyen`, `hieu.le`, `long.hoang`, `thuy.tran`) → role-based: `pic-ops-01`, `pic-ops-02`
> - Customer brand names from legacy (`Shopee Express`, `Long Châu`, `GHN Sorting`) → reuse the demo brand list already in `customers-data.ts` (e.g. `GHN Fulfillment`, `Acme Retail`, `Nova Pharmacy`) so the page composes with existing customer demo.

---

## 1. Route layout

```
/worker-payment-batches/
  page.tsx                  → list view (PaymentBatchesPage)
  [id]/
    page.tsx                → detail shell with 4 tabs (PaymentBatchDetailPage)
```

Detail tabs are query-string driven (`?tab=overview|details|adjustments|config`) so deep-link + back-button work. Default `overview`.

---

## 2. List view — `Quản lý thanh toán`

Mirrors `payment_batch_listing.jpg`.

### 2.1 Page header

| Element | Treatment |
|---|---|
| Breadcrumb | `Home / Quản lý thanh toán` |
| Title | `Kỳ thanh toán` — `text-xl font-semibold text-fg` |
| Subtitle | `Theo dõi mọi kỳ thù lao đã chốt và đang chạy thanh toán cho CTV.` |
| Top-right action | `+ Tạo kỳ mới` (`Button color="primary"`), opens drawer prefilled with the next cycle code |

### 2.2 Filter bar (above table)

`flex flex-wrap gap-3 items-end`. Right side: `Reset` (secondary) + `Áp dụng` (primary).

| Control | Type | Placeholder / Options |
|---|---|---|
| Tìm theo code / tên kỳ | text + search icon | `Tìm kỳ thanh toán` |
| Năm | select | 2024 / 2025 / **2026** |
| Trạng thái | multi-select | `Mới`, `Đã chốt, chờ thực hiện thanh toán`, `Đang thanh toán`, `Hoàn thành`, `Đã huỷ` |
| Công ty vận hành | select | populated from `customers-data.ts` |

Above the filter row: tab-strip quick filter `Tất cả · Đang chạy · Đã chốt · Hoàn thành · Đã huỷ` (uses existing chip pattern in current `WorkerPaymentBatchesPage`).

### 2.3 Table

`TableCard` wrap. Five columns + trailing action link. No row icon avatar — the legacy `CreditCard` circle on the existing component is decorative noise; remove or downgrade to a 32px square tile holding the period code mono-text.

| # | Header | Field | Render |
|---|---|---|---|
| 1 | Kỳ thanh toán | `batch.cycleName`, `batch.periodRange`, `batch.code` | 3-line stack: name `text-sm font-medium text-fg`, range `text-xs text-fg-tertiary`, code `text-xs text-fg-tertiary font-mono` |
| 2 | Thống kê | `batch.workerCount`, `batch.companyCount` | two-line: `Số CTV : 424` / `Số công ty : 10` — colon-aligned, mono numbers |
| 3 | Hạn thanh toán | `batch.dueDate`, `batch.daysRemaining` | date `text-sm text-fg`; if `daysRemaining > 0` show `(Còn N ngày)` in `text-fg-error text-xs` below; if past due and not paid → `(Quá hạn N ngày)` `text-fg-error`; else hide |
| 4 | Tổng tiền | `batch.totalAmount` | right-aligned VND with `đ` suffix, `text-sm font-medium text-fg` |
| 5 | Trạng thái | `batch.status`, `batch.statusUpdatedAt` | Badge top, timestamp underneath using human form (`10:46 Hôm nay`, `Hôm qua`, else `HH:mm DD/MM/YYYY`) |
| 6 | (action) | — | `Xem chi tiết` — text link `text-fg-brand`, opens `/worker-payment-batches/[id]?tab=overview` |

Status → badge color map:

| Status | Label | Color |
|---|---|---|
| `new` | `Mới` | `warning` |
| `locked` | `Đã chốt, chờ thực hiện thanh toán` | `warning` |
| `running` | `Đang thanh toán` | `brand` |
| `completed` | `Hoàn thành` | `success` |
| `cancelled` | `Đã huỷ` | `gray` |

Pagination: `20 / trang`, `1-N of N items`, prev/next + page numbers — match the convention used in `CustomersPage`.

### 2.4 Empty state

Centered illustration + `Chưa có kỳ thanh toán` + primary `+ Tạo kỳ mới`.

---

## 3. Detail shell — `Chi tiết kỳ thù lao`

Sticky block on top of every tab (mirrors `payment_batch_detail_overview.jpg`).

### 3.1 Header

| Element | Source | Treatment |
|---|---|---|
| Breadcrumb | route | `Home / Quản lý thanh toán / Chi tiết kỳ thù lao` |
| Title | `batch.code` | `Kỳ thù lao 2_4_2026` — `text-xl font-semibold text-fg` |
| Status row | `batch.status` | `Trạng thái: <Badge>` |
| Meta lines | 3 timestamps | `Cập nhật: 09:52 - 06/05/2026, bởi [pic-ops-02]`; `Chốt kỳ: 14:43 04/05/2026`; `Hoàn thành: 09:52 06/05/2026`. Each: label `text-fg-tertiary`, value `text-fg`, separated by ` · ` on `md+`, stacked on `sm`. PIC value links to `/users/[picId]`. |
| Header actions (right) | conditional on status | `running` → `[Tạm dừng]` (secondary) + `[Đánh dấu hoàn thành]` (primary); `locked` → `[Chạy thanh toán]` (primary); `new` → `[Chốt kỳ]` (primary) + `[Huỷ kỳ]` (tertiary destructive); `completed` → header-actions hidden, replaced with single `[Tải báo cáo]` (secondary, download icon). |

### 3.2 Tabs

Order matches legacy:

1. **Tổng quan** — overview KPIs + breakdown charts
2. **Chi tiết** — per-worker line items
3. **Các khoản điều chỉnh** — adjustment ledger
4. **Cấu hình** — cycle configuration form

Tab bar: underline style, active `text-fg-brand` + `border-border-brand`, inactive `text-fg-secondary`.

---

## 4. Tab — Tổng quan

Source: `payment_batch_detail_overview.jpg`.

### 4.1 KPI tiles (3 columns on `lg`, stack on `sm`)

| Tile | Label | Value | Icon |
|---|---|---|---|
| 1 | `Tổng số tiền` | `batch.totalAmount` (VND no `đ` suffix, large `text-3xl font-semibold`) | dollar-sign in `bg-brand-solid text-primary-fg` rounded-md tile |
| 2 | `Số Freelancer` | `batch.workerCount` | user icon |
| 3 | `Số công ty` | `batch.companyCount` | company / building icon |

Card chrome: `rounded-xl border border-border-secondary bg-bg p-5 shadow-xs`. Label row above value, icon left-aligned at 40×40.

### 4.2 Section — `Types of transaction`

Two-column layout on `lg`, stacks on `md`.

**Left (1/3 width):** SVG donut chart, center label = `batch.totalAmount + " đ"`. Segments colored from the brand sequential ramp (use tokens `--colors-utility-brand-{50…700}` if present; otherwise add a `chart.series` token group — propose in `TOKEN_REGISTRY.md`). Segments < 0.5% bucket into `Khác` slice.

**Right (2/3 width):** transaction breakdown list. Each row:

```
●  <category name>  <percent>%                                <amount> đ
```

- Dot color matches donut segment
- Category name `text-sm text-fg`
- Percent inline, muted, `text-xs text-fg-tertiary`
- Amount right-aligned, `text-sm font-medium text-fg`; negative amounts (refunds/withholdings) render `text-fg-error`

Demo seed should keep the legacy category labels (these are domain transaction types, not PII) but use synthetic numbers. Sample category list:

| Order | Category | Sample share |
|---|---|---|
| 1 | Thù lao | 93.02% |
| 2 | Thưởng Ad-hoc khuyến khích FL đi làm | 2.78% |
| 3 | Thưởng chuyên cần | 1.71% |
| 4 | Thưởng tuyển dụng | 1.69% |
| 5 | Hoàn thuế TNCN | 0.27% |
| 6 | SPR thưởng hiệu suất | 0.21% |
| 7 | Dư nợ Phí hiệu suất | 0.20% |
| 8 | Thưởng TOP 5 | 0.13% |
| 9 | Bù lương do lỗi chấm tay | 0.11% |
| 10 | Nghỉ phép hưởng lương | 0.07% |
| 11 | Onboarding kỳ mới | 0.03% |
| 12 | Hỗ trợ chi phí di chuyển | 0.00% |
| 13 | Truy thu sai thao tác | -0.06% |
| 14 | Thuế thu nhập cá nhân | -0.39% |

### 4.3 Section — `Thù lao theo công ty`

Horizontal bar chart, one row per customer. Use customer brands already seeded in `customers-data.ts`:

```
GHN Fulfillment     ████████████████████  ▒ 597.573.500 đ
Acme Retail          █████████████          ▒ 436.054.500 đ
Nova Pharmacy        ████                   ▒ 105.966.200 đ
...
```

- Sort descending by amount
- Bar fill `bg-brand-solid`, track `bg-bg-secondary`
- Row label left, amount right, `text-sm text-fg`
- If > 10 companies → collapse to top 10 + `Xem thêm` toggle

Card chrome: `rounded-xl border border-border-secondary bg-bg shadow-xs`, header `Thù lao theo công ty` `text-base font-semibold text-fg` `border-b px-5 py-4`, body `p-5`.

---

## 5. Tab — Chi tiết

Source: `payment_batch_detail_workers.jpg`.

### 5.1 Top stats strip (single row, no card chrome — just labeled values separated by `·`)

| Label | Value | Render |
|---|---|---|
| Tổng thực nhận | `batch.totalNetAmount` | `1.413.984.445 đ` — `text-base font-semibold text-fg` |
| Số CTV | `batch.workerCount` | `1208` |
| Tổng giờ công | `batch.totalHours` | `30391.62` — two decimals |
| TK nhận tiền không hợp lệ | `batch.invalidAccountCount` | `0` if zero render in `text-fg-tertiary`; if `>0` render in `text-fg-error font-semibold` and link to a filtered subview |

Right side of strip: `[Export]` + `[Import]` buttons, both `Button color="secondary" size="sm"` with download/upload icon. Export downloads a CSV of the current filter scope; Import opens a file-picker drawer with template-link + dry-run flow.

### 5.2 Filter bar

`flex flex-wrap gap-3`. Right: `Huỷ lọc` (tertiary text button).

| Control | Type | Placeholder |
|---|---|---|
| Tìm tên / mã CTV | text + search icon | `Tìm tên, mã CTV` |
| Phương thức nhận tiền | select | `Phương thức nhận tiền` — options: `Ngân hàng`, `Ví điện tử`, `Tiền mặt` |
| Trạng thái thanh toán | select | `Trạng thái thanh toán` — options: `Đang xử lý`, `Đã chuyển`, `Bị từ chối`, `TK không hợp lệ` |

### 5.3 Table

| # | Header | Field | Render |
|---|---|---|---|
| 1 | Cộng tác viên | `item.workerName`, `item.workerCode`, `item.workerPhoneMasked` | 3-line stack: name `text-sm font-medium text-fg` linking to `/workers/[id]`; `MS: 222432` `text-xs text-fg-tertiary`; phone `09•• ••• •••` `text-xs text-fg-tertiary` |
| 2 | Phương thức nhận tiền | `item.payoutMethod`, `item.bankAccountMasked`, `item.bankAccountHolderRedacted`, `item.bankName`, `item.bankVerified` | 4-line stack: method label + green check (`bankVerified=true` → `CheckCircle` `text-fg-success`); masked account number `text-xs text-fg-tertiary`; holder placeholder `[Tên CTV trùng khớp]` muted; bank name e.g. `NH TMCP Á Châu (ACB Bank)` |
| 3 | Số giờ công | `item.totalHours` | right-aligned, two decimals, `text-sm text-fg` |
| 4 | Thực nhận | `item.netAmount` | right-aligned VND, `text-sm font-medium text-fg` |
| 5 | Phiếu lương | — | `Chi tiết` text link `text-fg-brand` → opens payslip side drawer |
| 6 | Trạng thái | `item.payoutStatus` | Badge `pill-color size="sm"`: `Đang xử lý` (warning), `Đã chuyển` (success), `Bị từ chối` (error), `TK không hợp lệ` (error) |

Column 1/2 are sortable; column 3/4 sortable numeric (caret affordance from existing `Table` component).

Payslip drawer (Chi tiết): right-side `Sheet` showing per-shift breakdown — date, customer, shift type, hours, gross, deductions, net — with `Tải xuống PDF` action. Use synthetic data only.

---

## 6. Tab — Các khoản điều chỉnh

Source: `payment_batch_detail_adjustment.jpg`.

### 6.1 Confirmation + actions strip

Right-aligned row above the table:

- Left text: `Đã xác nhận lúc 13:20 - 04/05/2026 bởi [pic-ops-02]` — `text-sm text-fg-tertiary`; if not yet confirmed → `Chưa xác nhận` in `text-fg-error` + inline `[Xác nhận khoản điều chỉnh]` primary button.
- Right: `[Export]` (`Button color="primary"` per legacy — green in legacy; in our brand, use `secondary` and let primary stay reserved for cycle-level actions).

### 6.2 Stats + filters (one row)

| Cell | Label | Value / Control |
|---|---|---|
| Tổng tiền | `adjustments.totalAmount` | `78.213.710 đ` `text-base font-semibold text-fg` |
| Số giao dịch | `adjustments.count` | `129` |
| Tìm | text + search | `Tìm tên, mã CTV` |
| Mã việc | text | `Mã việc` |
| Từ ngày → Đến ngày | dual date picker | `Từ ngày`, `Đến ngày` |
| Loại giao dịch | select | `Loại giao dịch` — `Dư nợ`, `Cấn trừ`, `Adhoc Khác` |

Right: `Huỷ lọc` (tertiary).

### 6.3 Table

| # | Header | Field | Render |
|---|---|---|---|
| 1 | Cộng tác viên | `adj.workerName`, `adj.workerCode` | name link `text-sm font-medium text-fg`; `MS: 222432` muted underneath |
| 2 | Mã việc | `adj.jobCode` | mono `text-sm text-fg`; blank cell when N/A |
| 3 | Ngày | `adj.transactionDate` | `DD/MM/YYYY` |
| 4 | Loại thanh toán | `adj.kind` | plain text `Dư nợ` / `Cấn trừ` / `Adhoc Khác` (no badge — legacy uses text) |
| 5 | Số tiền | `adj.amount` | colored numeric: positive → `text-fg-success` with `+` prefix; negative → `text-fg-error` with `-` prefix; right-aligned, mono digits |
| 6 | Nội dung | `adj.description` | `text-sm text-fg` truncated to 1 line, tooltip on hover for full text |
| 7 | PIC | `adj.picHandle` | `text-sm text-fg-tertiary`, e.g. `pic-ops-02` |
| 8 | Trạng thái | `adj.confirmed` | trailing green `CheckCircle` `text-fg-success` when confirmed; otherwise `Clock` `text-fg-warning` |

Row hover reveals `[…]` overflow menu with `Sửa khoản điều chỉnh` / `Xoá` (only when batch status is `new` or `locked`).

Pagination footer identical to other tables. Legacy shows `1-20 of 129 items`.

---

## 7. Tab — Cấu hình

Source: `payment_batch_detail_config.jpg`.

Single-column form on a bordered card. Field rows: label left (`text-sm text-fg-tertiary`, ~240px on `md+`), input right, full-width.

Field rules:

| Label | Input | Required | Locked when status | Hint |
|---|---|---|---|---|
| Code | text, mono | yes | `locked` / `running` / `completed` | `Ví dụ: 1_7_4_2022 là mã của kỳ thanh toán SKT tháng 7 lần 4` |
| Tên kỳ thanh toán | text | yes | `running` / `completed` | `Ví dụ: Kỳ thanh toán Việc Có 01/2022, lần 1` |
| Thời gian phát sinh thù lao từ ngày | dual date picker | yes | `running` / `completed` | — |
| Ngày thanh toán | date picker | yes | `completed` | — |
| Công ty vận hành | select (companies) | no | `locked` / `running` / `completed` | `Ví dụ nếu Khách hàng là Shopee nhưng do SKT vận hành thì ở đây chọn công ty là SKT` |
| Giới hạn mã công việc | tags-input (multi) | no | `running` / `completed` | `Danh sách công việc cách nhau bởi dấu phẩy, và không trùng nhau. Ví dụ: 85334, 72698, 28445, 96297` |
| Dư nợ | select (previous batches) | no | `running` / `completed` | links to prior cycle for carry-over |

Required marker: red asterisk prefix `text-fg-error`.

Footer:
- Left: `Trạng thái: <Badge> ✎` — pencil to inline-edit (admin only).
- Right: `[Huỷ]` (secondary) + `[Cập nhật]` (primary, disabled until dirty). On a `new` batch also surface `[Chốt kỳ]` (warning-color outline button) to transition.

Validation:
- Code: `^[1-2]_(?:[1-9]|1[0-2])_(20\d{2})$` (e.g. `2_4_2026`); the half-month digit must match the date range.
- Date range: `phát sinh.to >= phát sinh.from`; `ngày thanh toán >= phát sinh.to`.
- Mã công việc tags: dedupe + numeric-only on enter.

---

## 8. Data model — extend `worker-payment-batches-data.ts`

Current shape is too thin for the tabs above. Proposed extension (additive — keep `PaymentBatchRecord` + `BatchLineItem` names so existing imports compile):

```ts
export type BatchStatus =
  | "new"
  | "locked"
  | "running"
  | "completed"
  | "cancelled";

export type PayoutMethod = "bank" | "ewallet" | "cash";
export type PayoutStatus =
  | "processing"
  | "transferred"
  | "rejected"
  | "invalid_account";

export type AdjustmentKind = "debt" | "offset" | "adhoc_other";

export interface BatchKPISummary {
  totalAmount: number;        // VND
  totalNetAmount: number;     // VND, after tax/deductions
  workerCount: number;
  companyCount: number;
  totalHours: number;         // two decimals
  invalidAccountCount: number;
}

export interface BatchTransactionType {
  id: string;
  label: string;              // "Thù lao", "Thưởng chuyên cần", ...
  amount: number;             // signed VND
  share: number;              // 0..1 fraction, sum across all ≈ 1
}

export interface BatchCompanyBreakdown {
  customerId: string;         // joins to customers-data.ts
  customerName: string;
  amount: number;
}

export interface BatchLineItem {
  workerId: string;           // ctv-001
  workerCode: string;         // "220001"
  workerName: string;         // "Cộng tác viên A"
  workerPhoneMasked: string;  // "09•• ••• •••"
  payoutMethod: PayoutMethod;
  bankName?: string;          // "NH TMCP Á Châu (ACB Bank)"
  bankAccountMasked?: string; // "202•••••809"
  bankVerified: boolean;
  totalHours: number;
  netAmount: number;
  payoutStatus: PayoutStatus;
}

export interface BatchAdjustment {
  id: string;
  workerId: string;
  workerCode: string;
  workerName: string;
  jobCode?: string;
  transactionDate: string;    // ISO; render DD/MM/YYYY
  kind: AdjustmentKind;
  amount: number;             // signed VND
  description: string;
  picHandle: string;          // "pic-ops-02"
  confirmed: boolean;
}

export interface BatchConfig {
  code: string;
  cycleName: string;
  periodFrom: string;         // ISO date
  periodTo: string;           // ISO date
  payoutDate: string;         // ISO date
  operatedByCustomerId?: string;
  jobCodeAllowlist: string[];
  carryOverBatchId?: string;
}

export interface BatchTimeline {
  createdAt: string;
  lockedAt?: string;
  completedAt?: string;
  updatedAt: string;
  updatedByPicHandle: string;
}

export interface PaymentBatchRecord {
  id: string;
  code: string;                          // "2_4_2026"
  cycleName: string;                     // "Việc Có Kỳ 2 tháng 4 năm 2026"
  periodRange: string;                   // "16/04 - 30/04/2026" — display
  dueDate: string;                       // "05/05/2026"
  daysRemaining?: number;                // negative = overdue
  status: BatchStatus;
  timeline: BatchTimeline;
  summary: BatchKPISummary;
  transactionTypes: BatchTransactionType[];
  companyBreakdown: BatchCompanyBreakdown[];
  items: BatchLineItem[];
  adjustments: BatchAdjustment[];
  adjustmentsConfirmedAt?: string;
  adjustmentsConfirmedBy?: string;       // pic handle
  config: BatchConfig;
}

export const BATCH_STATUS_LABELS: Record<
  BatchStatus,
  { label: string; color: "warning" | "brand" | "success" | "error" | "gray" }
> = {
  new:        { label: "Mới", color: "warning" },
  locked:     { label: "Đã chốt, chờ thực hiện thanh toán", color: "warning" },
  running:    { label: "Đang thanh toán", color: "brand" },
  completed:  { label: "Hoàn thành", color: "success" },
  cancelled:  { label: "Đã huỷ", color: "gray" },
};
```

Helpers to add: `formatVnd(amount: number, opts?: { suffix?: boolean })`, `formatRelativeVi(iso: string)` (`Hôm nay`, `Hôm qua`, else `HH:mm DD/MM/YYYY`), `maskAccount(account: string)`, `maskPhone(phone: string)`.

Seed at least 12 batches across the 5 statuses, with each batch's `items[]` length ≥ 8 to make tab 2 paginate, and `adjustments[]` length ≥ 10 to populate tab 3.

---

## 9. Cross-cutting UI conventions

- **Card chrome:** `rounded-xl border border-border-secondary bg-bg shadow-xs`. Section header `border-b border-border-secondary px-5 py-4`; body `p-5`.
- **Tables:** header `bg-bg-secondary text-fg-tertiary text-xs uppercase tracking-wide`. Use existing `Table` + `TableCard` from `@mvp-ui/ui`.
- **Number columns:** right-aligned, tabular numerals (`tabular-nums` utility) so VND figures align across rows.
- **Currency formatting:** `Intl.NumberFormat('vi-VN').format(value)` + ` đ` suffix. Negatives keep the minus sign before the digits.
- **Status badges:** reuse `BATCH_STATUS_LABELS`. Single source of truth for color mapping.
- **Empty states:** `flex flex-col items-center gap-2 py-12 text-sm text-fg-tertiary` with neutral icon. Never use raw gray scale colors.
- **PII rendering:** redact at the data layer (the seed) — components should not contain mask logic, so a real-API swap later only needs to flip a flag.
- **Dark mode:** all surfaces use semantic tokens (`bg-bg*`, `text-fg*`, `border-border*`). The donut + bar chart segments must use `bg-brand-solid` and the `--colors-utility-brand-*` ramp so they flip cleanly. If a new chart-series ramp is needed, propose tokens in `packages/tokens/TOKEN_REGISTRY.md` before hardcoding hex.

---

## 10. Build order

1. Replace seed in `worker-payment-batches-data.ts` with the extended model from §8 (synthetic data only).
2. Refactor list `WorkerPaymentBatchesPage` to match §2 — drop the `CreditCard` row avatar, add `Thống kê` and `Hạn thanh toán` columns, add countdown rendering.
3. Build detail shell + tab routing (`?tab=`) in `WorkerPaymentBatchesDetailPage`; lift header from current detail file into a `BatchHeader` component.
4. Tab `Tổng quan` — KPI tiles + donut + per-company bar chart (chart as a small `BatchBreakdownChart.tsx` component; no chart library required, hand-rolled SVG is fine at this scale).
5. Tab `Chi tiết` — stats strip + filter bar + table + payslip side drawer (`Sheet` from `@mvp-ui/ui`).
6. Tab `Các khoản điều chỉnh` — confirmation strip + filter bar + adjustments table + row overflow menu.
7. Tab `Cấu hình` — form with field-level lock based on `batch.status`; wire validation.
8. Verify at 1440 + 1024 in light + dark, then re-run `pnpm lint:dark` to catch any raw-scale token leaks before commit.
