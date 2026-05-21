# Bonuses

Thưởng. Bonus programs for workers. Each program defines a target audience (job scope), eligibility conditions, and a payout formula. Approved workers flow into the next payment batch.

## Routes

| Route | Purpose |
|---|---|
| `/bonuses` | List page |
| `/bonuses/[id]` | Detail page with config accordion + applied worker list |

## Entity shape

```ts
type BonusStatus = "running" | "ended" | "cancelled" | "draft";
type BonusPayoutKind = "fixed" | "per_shift" | "per_hour" | "tiered";

interface BonusRecord {
  id: string;                          // "BNS-1042"
  title: string;
  description: string;
  periodFrom: string;                  // "DD/MM/YYYY"
  periodTo: string;
  status: BonusStatus;
  manager: string;

  // Worker participation
  requested: number;
  approved: number;
  qualified: number;
  appliedCount: number;

  // Budget tracking (VND)
  budgetMax: number;
  appliedAmount: number;
  paidAmount: number;

  // Config
  jobScope: BonusJobScope[];
  conditions: BonusConditions;
  payout: BonusPayout;

  // Ledger
  workers: BonusAppliedWorker[];
  changelog: BonusChangelogEntry[];
}

interface BonusJobScope {
  code: string;                        // "JOB-1001"
  label: string;                       // "Kho A · Q12 · ca 8h–17h"
}

interface BonusConditions {
  minShifts: number;
  minHoursPerShift: number;
  notes?: string;
}

interface BonusPayout {
  kind: BonusPayoutKind;
  amount: number;                      // VND per unit
  cadence: string;                     // "Theo từng ca" / "Cộng dồn theo giờ thực tế" / "Theo kỳ thù lao"
  note?: string;
}

interface BonusAppliedWorker {
  id: string;
  name: string;
  confirmedAmount: number;
  paidAmount: number;
}

interface BonusChangelogEntry {
  at: string;                          // "DD/MM/YYYY"
  by: string;                          // person or "Tự động"
  note: string;
}
```

### Status labels
`running` · `ended` · `cancelled` · `draft`. (UI labels per status not encoded in file — assume "Đang chạy / Kết thúc / Đã huỷ / Nháp".)

### Payout-kind labels
`fixed` — Cố định · `per_shift` — Theo ca · `per_hour` — Theo giờ · `tiered` — Theo bậc.

## List page

### Summary metrics (3)
- **Chương trình đang chạy** — count of `running`
- **Ngân sách tối đa (đang chạy)** — sum of `budgetMax` over running programs
- **Đã thanh toán (toàn bộ)** — sum of `paidAmount` across all

### Filters
- Search — ID / title / description
- Date range (UI present, not yet wired)
- Status dropdown — All / Running / Ended / Cancelled / Draft
- Manager dropdown — All + unique managers
- Job code dropdown — All + unique scope codes
- Refresh — clear all filters, reset to page 1

### Columns
1. ID — `BNS-1042` (row header link)
2. Tiêu đề — title + description snippet
3. Thời gian — `periodFrom` / `periodTo` (stacked)
4. Đã áp dụng — `appliedCount` + `appliedAmount`
5. Trạng thái — badge
6. Quản lý — manager name
7. `Chi tiết` + chevron

Page size: 8.

## Detail page

### Header
Breadcrumb Dashboard → Thưởng → title. `Quay lại` link · title + status badge · ID + manager · description.

### Header actions (status-dependent)
- All: `Lịch sử thay đổi`
- `running`: `Hủy thưởng` (destructive)
- `draft` or `running`: `Cập nhật`

### Summary card: "Kết quả thực tế"
Note: "Số liệu cập nhật theo timesheet đã đối soát; CTV pending chưa được tính."

Left grid — Cộng tác viên:
- Yêu cầu: `requested`
- Đã duyệt: `approved`
- Đạt điều kiện: `qualified`

Right grid — Ngân sách:
- Chi phí tối đa: `budgetMax`
- Đã áp dụng: `appliedAmount`
- Đã thanh toán: `paidAmount`

### Left panel: Danh sách CTV được thưởng
- Search (worker ID or name)
- Table (5/page): Mã CTV (link) · Cộng tác viên (avatar + name link) · Đã xác nhận · Đã thanh toán
- Empty: "Chương trình chưa phát sinh payout nào."

### Right panel: Cấu hình (accordion, all expanded)

1. **Thông tin chung** — ID, title, description, manager
2. **Áp dụng cho** (with count badge) — `jobScope` pills (code badge + label)
3. **Thời gian** — `periodFrom` / `periodTo`
4. **Điều kiện**
   - Số ca tối thiểu: `≥ {minShifts} ca`
   - Số giờ tối thiểu: `≥ {minHoursPerShift} giờ/mỗi ca`
   - Ghi chú (if present)
5. **Chi tiết thưởng**
   - Hình thức: payout kind label
   - Số tiền: amount + unit suffix
   - Thời gian chi thưởng: `cadence`
   - Ghi chú (if present)
6. **Lịch sử thay đổi** (with count) — changelog entries

Edit button — shown when status is `running` or `draft`.

## Business rules

### Payout formulas

```
fixed:      amount_per_worker = payout.amount
per_shift:  amount_per_worker = qualified_shifts * payout.amount
per_hour:   amount_per_worker = qualified_hours * payout.amount
tiered:     amount_per_worker = tier_amount(performance_metric)
```

`total = sum of amount_per_worker for qualified workers`.

### Eligibility (qualified)
1. Worker has shifts within `periodFrom`/`periodTo`
2. Worker's job code matches one of `jobScope[].code`
3. Worker completed ≥ `minShifts` shifts in period
4. Each shift ≥ `minHoursPerShift` hours
5. Special conditions per `conditions.notes` (e.g., "no pending shifts", "night hours only")
6. Worker `approved` (not just `requested`)

### Lifecycle
- `draft → running` — manual approval
- `running → ended` — auto on `periodTo`
- `running → cancelled` — manual via action
- `ended` / `cancelled` — no further edits, no further disbursements

### Disbursement
Qualified workers' amounts feed into [worker-payment-batches.md](./worker-payment-batches.md) as the appropriate transaction type (bonus-adhoc / bonus-attendance / etc.).

`confirmedAmount` = locked in; `paidAmount` = actually sent via batch.

### Accrual snapshot
Only confirmed/completed shifts count. Pending shifts excluded. Snapshot happens at timesheet reconciliation; no retroactive accrual after `periodTo`.

### Budget cap
`budgetMax` is the spend ceiling. Backend must decide overspend behaviour (pro-rata reduction or first-come-first-served). Not enforced in UI.

### Changelog
Records every config change. `by: "Tự động"` indicates a system-generated entry.

### State machine

**BonusStatus**

| From | To | Trigger | Side effect |
|---|---|---|---|
| (create) | `draft` | save without approve | no accrual |
| `draft` | `running` | manager approval | eligibility engine starts; `requested` / `qualified` populate |
| `draft` | `cancelled` | discard | terminal |
| `running` | `ended` | clock reaches `periodTo` | no further accrual; `paidAmount` may still update as batches close |
| `running` | `cancelled` | `Hủy thưởng` action | no further disbursement |

Terminal: `ended`, `cancelled`. Only `running` accrues against `budgetMax`.

## Cross-references

- **Workers** — `workers[].id` → `/workers/{id}`. See [workers.md](./workers.md).
- **Worker Payment Batches** — bonus amounts become transaction-type entries. See [worker-payment-batches.md](./worker-payment-batches.md).
- **Timesheets / Shifts** — eligibility derives from shift records and closed timesheets. See [timesheets.md](./timesheets.md), [shifts.md](./shifts.md).
- **Hiring Requests** — `jobScope.code` corresponds to hiring request job codes. See [hiring-requests.md](./hiring-requests.md).
