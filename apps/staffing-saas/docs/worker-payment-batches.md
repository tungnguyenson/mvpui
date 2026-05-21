# Worker Payment Batches

Thanh toán CTV. Periodic batch payroll for workers. Each batch covers a defined work period and contains line items (per worker), transaction-type breakdown, company breakdown, and adjustments.

## Routes

| Route | Purpose |
|---|---|
| `/worker-payment-batches` | List page |
| `/worker-payment-batches/[id]` | Detail page (4 tabs); `id` matches `code` or `id`, case-insensitive |
| `/worker-payment-batches/payslip/[workerId]` | Individual worker payslip |

## Entity shape

```ts
type BatchStatus = "new" | "locked" | "running" | "completed" | "cancelled";
type PayoutMethod = "bank" | "ewallet" | "cash";
type PayoutStatus = "processing" | "transferred" | "rejected" | "invalid_account";
type AdjustmentKind = "debt" | "offset" | "adhoc_other";

interface PaymentBatchRecord {
  id: string;
  code: string;                       // "2_5_2026"
  cycleName: string;                  // "Kỳ 2 tháng 5 năm 2026"
  periodRange: string;                // "16/05 - 31/05/2026"
  dueDate: string;                    // "DD/MM/YYYY"
  daysRemaining?: number;             // negative if overdue
  status: BatchStatus;
  timeline: BatchTimeline;
  summary: BatchKPISummary;
  transactionTypes: BatchTransactionType[];
  companyBreakdown: BatchCompanyBreakdown[];
  items: BatchLineItem[];
  adjustments: BatchAdjustment[];
  adjustmentsConfirmedAt?: string;    // ISO
  adjustmentsConfirmedBy?: string;
  config: BatchConfig;
}

interface BatchKPISummary {
  totalAmount: number;                // VND, gross incl all transaction types
  totalNetAmount: number;             // sum of worker net amounts
  workerCount: number;
  companyCount: number;
  totalHours: number;                 // decimal
  invalidAccountCount: number;
}

interface BatchTimeline {
  createdAt: string;                  // ISO
  lockedAt?: string;
  completedAt?: string;
  updatedAt: string;
  updatedByPicHandle: string;
}

interface BatchLineItem {
  workerId: string;
  workerCode: string;
  workerName: string;
  workerPhoneMasked: string;          // "09•• ••• •••"
  payoutMethod: PayoutMethod;
  bankName?: string;                  // only if bank
  bankAccountMasked?: string;
  bankVerified: boolean;
  totalHours: number;
  netAmount: number;                  // VND
  payoutStatus: PayoutStatus;
}

interface BatchTransactionType {
  id: string;                         // "fee", "bonus-adhoc", "pit"
  label: string;                      // "Thù lao", "Thưởng Ad-hoc"
  amount: number;                     // VND, can be negative
  share: number;                      // 0.93 = 93%
}

interface BatchCompanyBreakdown {
  customerId: string;
  customerName: string;
  amount: number;
}

interface BatchAdjustment {
  id: string;
  workerId: string;
  workerCode: string;
  workerName: string;
  jobCode?: string;
  transactionDate: string;            // "DD/MM/YYYY"
  kind: AdjustmentKind;
  amount: number;                     // can be negative for offset
  description: string;
  picHandle: string;
  confirmed: boolean;
}

interface BatchConfig {
  code: string;
  cycleName: string;
  periodFrom: string;                 // ISO
  periodTo: string;
  payoutDate: string;
  operatedByCustomerId?: string;
  jobCodeAllowlist: string[];
  carryOverBatchId?: string;
}
```

### Status labels & colors

| Status | Label | Color |
|---|---|---|
| `new` | (Mới / Draft) | warning |
| `locked` | (Đã chốt) | warning |
| `running` | (Đang chạy) | brand |
| `completed` | (Hoàn thành) | success |
| `cancelled` | (Đã huỷ) | gray |

### Adjustment kinds
- `debt` — money owed to worker (positive)
- `offset` — deduction (negative, recovery)
- `adhoc_other` — misc (either sign)

## Money formatting

- `Intl.NumberFormat("vi-VN")` — groups of 3, dot separator ("1.000.000")
- `formatVnd(n, { suffix: true })` → "1.000.000 đ"
- `formatVnd(n, { sign: true })` → "+100.000" / "-900.000"
- Hours → 2 decimals, vi-VN locale: "9.412,50"

## List page

### Tabs
All · Running (`new` + `running`) · Locked · Completed · Cancelled.

### Search
`code`, `cycleName`, `periodRange` (case-insensitive substring).

### Columns
1. Cycle — `cycleName` (link) + `periodRange` + `code`
2. Stats — worker count + company count
3. Due date — date + "Còn X ngày" / "Quá hạn X ngày" (error if overdue && not closed/cancelled)
4. Total amount — `formatVnd + " đ"`
5. Status badge + relative update time
6. `Xem chi tiết` link

Pagination footer: `1-{count} of {count} items` · `20 / trang`.

## Detail page

### Header
Breadcrumb · H1 `Kỳ thù lao {code}` · status badge + update timestamp + editor handle · timeline (created, locked, completed) · config dates `Kỳ phát sinh: {from} → {to} · Ngày thanh toán: {payoutDate}`.

### Header actions (status-dependent)

| Status | Buttons |
|---|---|
| `new` | `Huỷ kỳ` (destructive) · `Chốt kỳ` (primary) |
| `locked` | `Chạy thanh toán` (primary) |
| `running` | `Tạm dừng` (secondary) · `Đánh dấu hoàn thành` (primary) |
| `completed` | `Tải báo cáo` |
| `cancelled` | (none) |

### Tabs

#### 1. Tổng quan
- KPI cards: Total amount · Worker count · Company count
- Donut + transaction type list (label, amount, share %)
- Horizontal bar chart: payout amount by company

#### 2. Chi tiết
- Summary row: total net · worker count · total hours · invalid account count
- Export / Import buttons
- Filters: search · payout method · payout status · Reset
- Table columns: Worker (link) · Payout method (bank details if any) · Hours · Net amount (link to payslip) · Status badge
- 20 per page

#### 3. Các khoản điều chỉnh
- Confirmation banner: `Đã xác nhận lúc {time} bởi {user}` OR `Chưa xác nhận [Xác nhận khoản điều chỉnh]`
- Summary: total amount + transaction count (signed colors)
- Filters: search · job code · kind · Reset · Export
- Columns: Worker · Job code · Date · Kind · Amount (signed) · Description · PIC · Confirmation icon + action menu

#### 4. Cấu hình
Editable form, fields lock per status:

| Field | Locked from status |
|---|---|
| code | locked / running / completed |
| cycleName | running / completed |
| periodFrom / periodTo | running / completed |
| payoutDate | completed |
| operatedByCustomerId | locked / running / completed |
| jobCodeAllowlist | running / completed |
| carryOverBatchId | running / completed |

## Modals / drawers

Triggered by header actions (inferred — not all wired):
1. Create new batch (`Tạo kỳ mới`)
2. Cancel batch — confirmation dialog
3. Lock batch (`Chốt kỳ`) — freezes most config
4. Start payment (`Chạy thanh toán`)
5. Pause payment (`Tạm dừng`)
6. Mark complete
7. Confirm adjustments — bulk confirm pending
8. Edit adjustment row — kind / amount / description

## Business rules

### Status lifecycle
```
new → locked → running → completed
   ↓        ↓
cancelled   cancelled
```

- `running` can step back to `locked` via `Tạm dừng`.
- `cancelled` reachable from `new` or `locked`; never from `running`/`completed`.

### Net amount per worker
```
netAmount ≈ baseWage + bonuses - deductions - taxes
```
Adjustments apply separately as `+debt`, `-offset`, signed `adhoc_other`.

### Batch totals
- `totalAmount = SUM(item.netAmount) + SUM(adjustment.amount)`
- `totalNetAmount = SUM(item.netAmount)` (excludes adjustments)

### Transaction-type breakdown
14 types observed (fee, bonus-adhoc, bonus-attendance, bonus-recruitment, bonus-top5, comp-clock-fix, comp-paid-leave, tax-refund, pit, performance-fee, ...). Per type:
```
amount = ROUND(totalAmount * share / 1000) * 1000   // round to ₫1k
```

### Adjustment confirmation
- Each adjustment individually confirmed/pending.
- Batch-level `adjustmentsConfirmedAt`/`adjustmentsConfirmedBy` set when bulk-confirmed.
- UI shows warning icon if any unconfirmed.

### Carry-over
`carryOverBatchId` — previous batch's pending debts auto-populated as `debt` adjustments in the new batch.

### Payout account validation
- `bankVerified: true` — name matched, safe to pay
- `bankVerified: false` — manual review
- `payoutStatus: "invalid_account"` — invalid format, must correct
- Rule: batch cannot complete if any `invalid_account` remains.

### Company breakdown
`totalAmount` allocated across customers by worker distribution, rounded to ₫1k.

### Hours
Per-worker `totalHours` aggregated from closed [timesheets](./timesheets.md).

### State machines

**BatchStatus**

| From | To | Trigger | Field-lock effect |
|---|---|---|---|
| (create) | `new` | `Tạo kỳ mới` | all config editable |
| `new` | `locked` | `Chốt kỳ` | locks `code`, `operatedByCustomerId` |
| `new` | `cancelled` | `Huỷ kỳ` | terminal |
| `locked` | `running` | `Chạy thanh toán` | additionally locks `cycleName`, `periodFrom`/`To`, `jobCodeAllowlist`, `carryOverBatchId` |
| `locked` | `cancelled` | `Huỷ kỳ` | terminal |
| `running` | `locked` | `Tạm dừng` | step back |
| `running` | `completed` | `Đánh dấu hoàn thành` | additionally locks `payoutDate`; full read-only |

Terminal: `completed`, `cancelled`. Cannot move `running → cancelled` (must pause first).

**BatchLineItem.payoutStatus**

| From | To | Trigger |
|---|---|---|
| (create) | `processing` | item queued for payout |
| `processing` | `transferred` | bank confirms transfer |
| `processing` | `rejected` | bank rejects (account closed, etc.) |
| `processing` | `invalid_account` | account number invalid before submit |
| `invalid_account` / `rejected` | `processing` | account corrected + retry |

Batch cannot reach `completed` while any item is `invalid_account` (blocks `Đánh dấu hoàn thành`).

**BatchAdjustment.confirmed**: `false → true` per-item or via bulk `Xác nhận khoản điều chỉnh`. Bulk action also sets batch-level `adjustmentsConfirmedAt` / `adjustmentsConfirmedBy`. No path back to `false`.

## Cross-references

- **Workers** — `BatchLineItem.workerId`, `BatchAdjustment.workerId`. Each worker has a payslip route `/worker-payment-batches/payslip/{workerId}`. See [workers.md](./workers.md).
- **Worker Verifications** — bank account / `bankVerified` flag sourced here. See [worker-verifications.md](./worker-verifications.md).
- **Timesheets** — closed timesheets are the source for `totalHours`. See [timesheets.md](./timesheets.md).
- **Bonuses** — bonus programs' worker payouts feed into the appropriate transaction type. See [bonuses.md](./bonuses.md).
- **Worker Violations** — penalties flow in as `offset` adjustments. See [worker-violations.md](./worker-violations.md).
- **Worker Social Insurance** — income for BHXH declaration is the net amount paid here. See [worker-social-insurance.md](./worker-social-insurance.md).
- **Customers** — `companyBreakdown[].customerId`, `config.operatedByCustomerId`. See [customers.md](./customers.md).
