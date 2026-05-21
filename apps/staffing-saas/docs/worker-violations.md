# Worker Violations

Quản lý vi phạm. Progressive-discipline system. Each violation is a case; cumulative cases drive a worker status (warning → suspended → locked) and accumulate monetary penalties.

## Routes

| Route | Purpose |
|---|---|
| `/worker-violations` | List page |
| `/worker-violations/[id]` | Detail page (`id` = worker slug) |

## Entity shape

```ts
type ViolationWorkerStatus = "normal" | "warning" | "suspended" | "locked";
type ViolationSeverity = "minor" | "moderate" | "severe";

interface ViolationWorkerRecord {
  id: string;
  workerName: string;
  workerId: string;                  // "WK-1002"
  city: string;
  district: string;
  phone: string;
  totalCases: number;
  latestSeverity: ViolationSeverity;
  status: ViolationWorkerStatus;
  latestAt: string;                  // "DD/MM/YYYY"
  totalPenalty: string;              // "₫X.XXX.XXX"
  notes: string;                     // admin notes
  cases: ViolationCase[];
}

interface ViolationCase {
  id: string;                        // "VL-3201"
  occurredAt: string;
  severity: ViolationSeverity;
  category: string;                  // Đi trễ / Vắng mặt / Bỏ ca / ...
  description: string;
  shiftId?: string;
  shiftName?: string;
  customer?: string;
  penalty: string;
  resolution: "Đã xử lý" | "Đang xử lý" | "Chờ phản hồi";
  reviewer: string;
}
```

### Status labels

| Status | Label | Color |
|---|---|---|
| `normal` | Bình thường | success / gray |
| `warning` | Đang cảnh cáo | warning |
| `suspended` | Tạm đình chỉ | warning |
| `locked` | Đã khóa | error |

### Severity labels

| Severity | Label | Color |
|---|---|---|
| `minor` | Nhẹ | warning |
| `moderate` | Trung bình | warning |
| `severe` | Nghiêm trọng | error |

### Resolution colors
`Chờ phản hồi`=warning · `Đang xử lý`=warning · `Đã xử lý`=success.

### Common violation categories
Đi trễ · Vắng mặt không báo · Bỏ ca giữa chừng · Vi phạm quy định · Mâu thuẫn với khách · Nhập sai báo cáo.

## List page

### Tabs (with counts)
Tất cả · Đang cảnh cáo · Tạm đình chỉ · Đã khóa.

### Search
`workerName` (case-insensitive) or `phone`.

### Columns
Worker (avatar + name + location) · Cases (`{totalCases} case` + `{latestAt}`) · Latest severity · Status · Penalty (total) · Chevron.

Row click → detail.

## Detail page

### Header
Breadcrumb · avatar + name + status badge + latest-severity badge · `{workerId} • {district}, {city}` · admin notes. Actions: `Quay lại danh sách`, `Mở rộng case mới` (primary).

### Metric cards (3)
- Total cases
- Total penalty
- Latest violation date

### Section: Hồ sơ worker
Worker name + ID · phone · latest violation date.

### Section: Penalty summary (3 cards)
Total penalty · current handling level · case count.

### Section: Lịch sử violation cases
Newest first. Per case:
- Header: category + severity badge + resolution badge + date
- Description
- 3-col meta:
  - Shift info (link to `/shifts/{shiftId.toLowerCase()}`) or "Không gắn với ca cụ thể" + customer
  - Penalty amount
  - Reviewer

## Modals / drawers

Not yet implemented. `Mở rộng case mới` should open a "Create case" modal with fields: category, description, severity, occurredAt, shiftId, customer, penalty, reviewer.

## Business rules

### Worker-status escalation (inferred from data)
```
normal      — no violations
warning     — 1–2 cases, pattern of minor/moderate
suspended   — multiple moderate or customer-facing severe
locked      — multiple severe cases or unresolved blockers
```
Notes field can specify suspension period ("Tạm đình chỉ 14 ngày").

### Case resolution lifecycle
```
Chờ phản hồi → Đang xử lý → Đã xử lý
```
Not all cases go through "Chờ phản hồi" or "Đang xử lý"; some go directly to "Đã xử lý".

### Penalty bands (observed)
- minor: ₫100k–₫200k (Đi trễ ≈ ₫120k, Nhập sai ≈ ₫200k)
- moderate: ₫300k–₫600k (Bỏ ca ≈ ₫600k, Vi phạm quy định ≈ ₫300k)
- severe: ₫800k+ (Vắng mặt không báo ≈ ₫800k)

Penalties are cumulative; `totalPenalty = sum(case.penalty)`.

### Soft-lock via status
- `warning` — eligible but flagged
- `suspended` — cannot accept new shifts during suspension period
- `locked` — cannot accept any shifts

### Appeals
Not currently modeled. "Chờ phản hồi" hints at a future dispute path.

### Penalty deduction
Penalties typically deducted via [worker-payment-batches.md](./worker-payment-batches.md) as `kind: "offset"` adjustments.

### State machines

**ViolationWorkerStatus** — escalates from case data; re-evaluate on every new case insert.

| From | To | Trigger |
|---|---|---|
| `normal` | `warning` | 1–2 cases, mostly minor / moderate |
| `warning` | `suspended` | new moderate or repeated case |
| `suspended` | `locked` | new severe or unresolved blocker |
| `locked` / `suspended` / `warning` | `warning` / `normal` | manual reinstate after review |

Status acts as soft-lock on shift eligibility (see [workers.md state machine](./workers.md#state-machine)).

**ViolationCase.resolution**

| From | To | Trigger | Side effect |
|---|---|---|---|
| (create) | `Chờ phản hồi` | reviewer awaits worker response | |
| `Chờ phản hồi` | `Đang xử lý` | reviewer engages | |
| `Đang xử lý` | `Đã xử lý` | penalty applied / closed | offset adjustment flows to next [payment batch](./worker-payment-batches.md) |
| (create) | `Đã xử lý` | immediate resolution (skip middle) | same |

**ViolationSeverity**: not transitional. Set on case creation, immutable.

## Cross-references

- **Workers** — `WorkerRecord.violations` snapshot. See [workers.md](./workers.md).
- **Shifts** — `case.shiftId`. See [shifts.md](./shifts.md).
- **Customers** — `case.customer` (string only, no ID link in code).
- **Timesheets** — absence/late events from a closed timesheet may auto-create violation cases. See [timesheets.md](./timesheets.md).
- **Worker Payment Batches** — penalties become offset adjustments. See [worker-payment-batches.md](./worker-payment-batches.md).
