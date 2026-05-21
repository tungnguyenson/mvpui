# Workers (CTV)

Worker = cộng tác viên (CTV). The CTV is the gig worker who fulfills shifts. Their record is a hub linking out to verification, violations, payment batches, and shift history.

## Routes

| Route | Purpose |
|---|---|
| `/workers` | List page, tab + search |
| `/workers/[id]` | Detail page with snapshot panels |

## Entity shape

```ts
type WorkerStatus = "active" | "pending" | "locked";

interface WorkerRecord {
  id: string;
  name: string;
  city: string;
  district: string;
  phone: string;                          // "0901 234 567"
  status: WorkerStatus;
  rating: string;                         // "4.9"
  weeklyShifts: number;
  totalShifts: number;
  joinedAt: string;                       // "MM/YYYY"
  tags: string[];                         // ["Bán lẻ", "Activation", ...]
  bio: string;
  verification: WorkerVerificationSnapshot;
  violations: WorkerViolationSnapshot;
  payment: WorkerPaymentSnapshot;
  recentShifts: WorkerShiftHistory[];
}

interface WorkerVerificationSnapshot {
  status: "Đã xác thực" | "Chờ bổ sung" | "Đang rà soát";
  phone: string;                          // "Đã xác minh"
  nationalId: string;                     // CCCD
  taxId: string;                          // MST or "Chưa nộp"
}

interface WorkerViolationSnapshot {
  totalCases: number;
  latestLevel: "Không có" | "Nhẹ" | "Nghiêm trọng";
  latestNote: string;
}

interface WorkerPaymentSnapshot {
  batchId: string;                        // "PAY-0520-A"
  amount: string;                         // "₫4.850.000"
  status: "Đã chốt" | "Chờ duyệt" | "Chờ chuyển khoản";
}

interface WorkerShiftHistory {
  id: string;                             // "SH-801"
  shiftName: string;
  customer: string;
  schedule: string;                       // "18/05, 08:00 - 17:00"
  checkInStatus: "Đúng giờ" | "Đi trễ" | "Vắng mặt";
  payout: string;                         // "₫650.000" or "₫0"
}
```

### Status labels

| Status | Label | Color |
|---|---|---|
| `active` | Đang hoạt động | success |
| `pending` | Chờ duyệt | warning |
| `locked` | Tạm khóa | error |

### Check-in status colors
`Đúng giờ`=success, `Đi trễ`=warning, `Vắng mặt`=error.

## List page

### Filters
- **Tabs**: Tất cả, Đang hoạt động, Chờ duyệt, Tạm khóa (with counts).
- **Search**: name (case-insensitive), phone substring, or tag.

### Columns
CTV (avatar + name + phone) · Khu vực (district, city) · Trạng thái · Kỹ năng (up to 2 tags) · Tổng số ca · Đánh giá (★ rating).

### Header actions
`Onboard CTV mới` (primary) — not wired.

## Detail page

### Header
Avatar (with status overlay) · name · status badge · "{district}, {city} • Gia nhập {joinedAt}" · bio · tag badges. Actions: `Quay lại danh sách`, `Giao ca mới` (primary, not wired).

### Metric cards (4)
- Điểm đánh giá: ★ {rating}
- Ca tuần này: {weeklyShifts}
- Tổng số ca: {totalShifts}
- Batch gần nhất: {payment.batchId}

### Section: Hồ sơ worker
Phone · Rating statement · Verification status · Violations summary · Latest payment.

### Section: Liên kết nghiệp vụ (3 cards)
- **Xác thực** → `/worker-verifications/{id}` — shows `verification.status`
- **Vi phạm** → `/worker-violations/{id}` — shows "{totalCases} case"
- **Thanh toán** → `/worker-payment-batches/{payment.batchId.toLowerCase()}` — shows batch ID

### Section: Snapshot (3 columns)
Detail breakdown of verification (SĐT, CCCD/CMND, MST), violations (totalCases, latestLevel, latestNote), payment (batch, amount, status).

### Section: Lịch sử ca gần đây
For each `WorkerShiftHistory`: shift name, customer, status badge, schedule, shift ID, payout.

## Modals / drawers

None implemented. `Giao ca mới` button is intended for a future "Assign new shift" modal — likely fields: shift selection, date/time, customer, expected payout. Validation: shift availability + worker not `locked`.

## Business rules

### Status transitions
- `active` ↔ `pending` ↔ `locked` (manual + verification-driven)
- **Rule**: when `verification.status` is `Chờ bổ sung` or `Đang rà soát`, worker overall `status` should be `pending` (cannot accept new shifts).
- **Rule**: when `violations.latestLevel === "Nghiêm trọng"` or `totalCases ≥ threshold`, escalate to `locked` review.

### Check-in status → payout
- `Đúng giờ` → full payout
- `Đi trễ` → reduced payout (penalty %, backend-determined)
- `Vắng mặt` → ₫0 + triggers a violation case (see [worker-violations.md](./worker-violations.md))

### Rating
String displayed (e.g. "4.9"). Computed by backend from completed shifts.

### Status restricts shift eligibility
- `locked` worker cannot accept new shifts.
- `pending` worker cannot accept new shifts until verification clears.

### Snapshot vs source-of-truth
`verification`, `violations`, `payment` on `WorkerRecord` are denormalized snapshots. The authoritative records live in their own domains. Backend must keep snapshots in sync on each upstream change (verification approve, new violation case, batch status change).

### State machine

**WorkerStatus**

| From | To | Trigger | Guard / side effect |
|---|---|---|---|
| (create from candidate) | `pending` | candidate conversion or fresh onboard | verification not yet `Đã xác thực` |
| `pending` | `active` | verification approved | `verification.status = Đã xác thực` |
| `active` | `pending` | re-verification opened | shifts blocked until re-approval |
| `active` / `pending` | `locked` | severe violation or manual lock | `violations.latestLevel = "Nghiêm trọng"` or admin action; shifts blocked |
| `locked` | `active` | manual unlock | violation resolved |

`locked` and `pending` block shift acceptance.

**WorkerShiftHistory.checkInStatus** (per shift, not transitional): `Đúng giờ` / `Đi trễ` / `Vắng mặt` — classified at timesheet close (see [timesheets.md](./timesheets.md)) and immutable thereafter.

## Cross-references

- [Worker Verifications](./worker-verifications.md) — full doc/timeline (`/worker-verifications/{workerId}`)
- [Worker Violations](./worker-violations.md) — case history (`/worker-violations/{workerId}`)
- [Worker Payment Batches](./worker-payment-batches.md) — appears as `BatchLineItem`
- [Worker SWAT](./worker-swat.md) — workers promoted into SWAT contract
- [Worker Social Insurance](./worker-social-insurance.md) — monthly BHXH record
- [Shifts](./shifts.md) — `recentShifts[].id` references the shift
- [Customers](./customers.md) — customer name in shift history (no direct ID link yet, by name only)
- [Candidates](./candidates.md) — workers are created from candidates via `Chuyển thành CTV`
