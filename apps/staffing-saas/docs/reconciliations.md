# Reconciliations (Runs)

Đối soát. Actual per-customer per-period reconciliation runs. Each run is the snapshot of customer-facing settlement: line items, discrepancies, customer approval, invoice handoff.

For the per-customer **configuration** (cycle, payment term, contacts) see [customer-reconciliations.md](./customer-reconciliations.md).

## Routes

| Route | Purpose |
|---|---|
| `/reconciliations` | List page |
| `/reconciliations/[id]` | Detail page |

## Entity shape

```ts
type ReconciliationStatus = "open" | "pending-approval" | "approved" | "disputed";

interface ReconciliationRecord {
  id: string;                          // "rc-highlands-0515"
  code: string;                        // "RC-HL-0515"
  period: string;                      // "01/05 - 15/05/2026"
  customer: string;                    // brand name
  customerId: string;
  totalShifts: number;
  totalAmount: string;                 // formatted VND
  variance: string;                    // can be ±
  variancePercent: string;
  status: ReconciliationStatus;
  owner: string;                       // assigned staff
  closedAt?: string;
  notes: string;
  discrepancies: DiscrepancyItem[];
  approvals: ApprovalEntry[];
}

type DiscrepancyType =
  | "missing-checkout" | "rate-mismatch"
  | "extra-shift" | "missing-shift" | "penalty";

interface DiscrepancyItem {
  id: string;
  type: DiscrepancyType;
  shiftId?: string;
  shiftName?: string;
  workerName?: string;
  expected: string;
  actual: string;
  delta: string;
  note: string;
}

interface ApprovalEntry {
  id: string;
  at: string;                          // "DD/MM/YYYY HH:MM"
  actor: string;
  action: string;                      // "Đẩy phiếu lên duyệt" / ...
  note?: string;
}
```

### Status labels

| Status | Label | Color |
|---|---|---|
| `open` | Đang đối soát | warning |
| `pending-approval` | Chờ duyệt | warning |
| `approved` | Đã chốt | success |
| `disputed` | Đang tranh chấp | error |

### Discrepancy-type labels

| Type | Label |
|---|---|
| `missing-checkout` | Thiếu check-out |
| `rate-mismatch` | Sai pay rate |
| `extra-shift` | Ca thừa |
| `missing-shift` | Ca thiếu |
| `penalty` | Áp dụng phạt |

## List page

### Filters
- Status tabs — All / Open / Pending Approval / Approved / Disputed (with counts)
- Search — `code` or customer name

### Columns
1. Period — code + period range (icon)
2. Customer
3. Shifts — `totalShifts`
4. Amount — `totalAmount`
5. Variance — `variance` + `variancePercent` (color if negative)
6. Status badge
7. Detail chevron

## Detail page

### Header
Breadcrumb · title + status badge · customer · period · closed date (if any) · notes. Actions: `Quay lại danh sách`, `Gửi duyệt khách hàng` (primary). Future actions implied: Approve / Send invoice / Mark paid / Dispute.

### KPI cards (4)
Total shifts · Total amount · Variance · Variance %.

### Layout (2 cols on lg)

**Left — Reconciliation info**
- Customer logo + name + link to customer detail
- Period
- Owner

**Right — Summary numbers**
Compact KPI grid (same 4 metrics).

### Discrepancy items section
Title "Discrepancy items" · subtitle "Chi tiết các khoản chênh lệch cần khách hàng phê duyệt."

Per item: type label + shift/worker context (left) · delta badge warning (right) · 2-col Expected vs Actual · note below.

Empty: "Chưa có khoản chênh lệch nào..."

### Approval timeline section
Title "Approval timeline" · subtitle "Lịch sử xử lý phiếu đối soát từ nội bộ và khách hàng."

Vertical timeline: action (bold), `{at} • {actor}`, optional note.

Empty: "Phiếu vẫn ở trạng thái khởi tạo..."

## Modals / drawers

Not yet implemented. Expected:
1. **Approve modal** — confirm customer sign-off, optional note → status `approved`
2. **Dispute modal** — `pending-approval` → `disputed`, reason, investigator, evidence upload
3. **Send-to-customer modal** — confirm recipients from config, message, PDF attachment, delivery tracking
4. **Mark paid modal** — record payment date, method, amount → close

## Business rules

### Period-close lifecycle
```
open                         (compiling)
  → pending-approval         (sent to customer)
  → approved                 (customer signed off)
       → invoice generation
       → payment receipt
       → closed (closedAt set)
  → disputed                 (customer objected)
       → investigate / adjust
       → re-submit (back to pending-approval) or close
```

### Data sources
- **Timesheets** (closed) — source of truth for shifts, workers, hours, attendance, payout. See [timesheets.md](./timesheets.md).
- **Worker Payment Batches** — cross-checks aggregate payout per customer for the period. See [worker-payment-batches.md](./worker-payment-batches.md).
- **Customer Reconciliation Config** — cycle window, payment term, invoice rules, contacts, required docs. See [customer-reconciliations.md](./customer-reconciliations.md).

### Discrepancy detection rules
- `missing-checkout` — check-in present but no check-out; system estimated end time
- `rate-mismatch` — actual rate ≠ contract rate (contract amendment not synced)
- `extra-shift` — more workers/hours than contracted
- `missing-shift` — planned shift didn't execute
- `penalty` — deduction applied (absence, damage, customer-contract penalty)

### Customer approval
Reconciliation must be `approved` (with all discrepancies acknowledged) before invoice generation.

### Dispute flow
If customer objects, status moves to `disputed` with evidence/notes in the approval timeline. Operations investigates, then re-submits corrected figures or closes with dispute notation.

### Period cutoff
Strict cutoff defined by `CustomerReconciliation.cycle.endDay` and `debtCutoffRule`. Only timesheets with `date ≤ cutoff` are included.

### VAT
Not explicitly shown in UI. Calculation deferred to invoice generation (standard Vietnamese VAT = 10% on services).

### Invoice handoff
Approval makes the run eligible for invoice generation (separate system / future). `closedAt` marks customer payment confirmation.

### State machine

**ReconciliationStatus**

| From | To | Trigger | Side effect |
|---|---|---|---|
| (create) | `open` | period close compiles data | snapshot built from closed timesheets |
| `open` | `pending-approval` | `Gửi duyệt khách hàng` | snapshot sent to customer; approval timeline entry |
| `pending-approval` | `approved` | customer sign-off | eligible for invoice generation |
| `pending-approval` | `disputed` | customer objection | reason + evidence in approval timeline |
| `disputed` | `pending-approval` | re-submit with corrections | new snapshot |
| `disputed` | `approved` | dispute resolved in our favor | |
| `approved` | (closed) | payment confirmed | `closedAt` set; record locked |

No separate `closed` enum value — `closedAt` timestamp is the marker. After this point, the record is read-only.

## Cross-references

- **Customers** — `customerId` → [customers.md](./customers.md)
- **Customer Reconciliations (config)** — rules consumed here → [customer-reconciliations.md](./customer-reconciliations.md)
- **Timesheets** — line-item source → [timesheets.md](./timesheets.md)
- **Worker Payment Batches** — adjacent settlement domain (worker-side payout) → [worker-payment-batches.md](./worker-payment-batches.md)
- **Shifts** — discrepancies reference shift IDs → [shifts.md](./shifts.md)
