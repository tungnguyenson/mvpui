# Timesheets

Chấm công. Per-shift attendance records. A timesheet aggregates worker check-ins for one shift instance and must be finalized before its data flows into reconciliation and payment batches.

## Routes

| Route | Purpose |
|---|---|
| `/timesheets` | List page (by shift) |
| `/timesheets/[id]` | Detail page. `id` format `ts-{shiftCode}-{date}` |

## Entity shape

```ts
type TimesheetStatus = "in-progress" | "closed" | "needs-review" | "exception";
type AttendanceStatus = "on-time" | "late" | "early-leave" | "absent" | "no-checkout";

interface TimesheetRecord {
  id: string;                          // "ts-sh-702-20"
  shiftId: string;
  shiftCode: string;                   // "SH-702"
  shiftName: string;
  customer: string;
  customerId: string;
  date: string;                        // "DD/MM/YYYY"
  schedule: string;                    // "13:00 - 18:00"
  expectedCount: number;
  checkedInCount: number;
  status: TimesheetStatus;
  exceptions: number;                  // count of non-"on-time" records
  notes: string;
  records: AttendanceRecord[];
}

interface AttendanceRecord {
  id: string;
  workerId: string;
  workerName: string;
  role: string;
  checkInAt: string;                   // time or "—"
  checkOutAt: string;
  workedHours: string;                 // "5.1h", "0h", or "—"
  payout: string;                      // "₫331.500" or "₫0"/"—"
  status: AttendanceStatus;
  note?: string;
}
```

### Status labels

| Status | Label | Color |
|---|---|---|
| `in-progress` | Đang diễn ra | warning |
| `closed` | Đã chốt | success |
| `needs-review` | Cần duyệt | warning |
| `exception` | Có bất thường | error |

### Attendance labels

| Status | Label | Color |
|---|---|---|
| `on-time` | Đúng giờ | success |
| `late` | Đi trễ | warning |
| `early-leave` | Về sớm | warning |
| `absent` | Vắng mặt | error |
| `no-checkout` | Thiếu checkout | warning |

## List page

### Summary metrics (3 cards)
- **Ca đang diễn ra** — count of `in-progress`
- **Bất thường chờ xử lý** — sum of `exceptions` across filtered records
- **Ca đã chốt** — count of `closed`

### Filters
- **Search** — `shiftName` OR `customer` (case-insensitive)
- **Tabs** (mutually exclusive): Tất cả, Đang diễn ra, Cần duyệt, Có bất thường

### Columns
Ca chấm công (icon + name + code + schedule) · Khách hàng · Ngày · Check-in (`{checkedInCount}/{expectedCount}`) · Bất thường (count) · Trạng thái · Detail chevron.

Row links to `/timesheets/{id}`.

## Detail page

### Header
Breadcrumb · Clock icon + name + status badge · `{shiftCode} • {customer} • {date} {schedule}` · notes.

### Header actions
- `Quay lại danh sách` → `/timesheets`
- `Mở ca làm việc` → `/shifts/{shiftId}`
- `Chốt chấm công` (primary, finalize) — handler not wired

### Metrics (3)
- Workers dự kiến — `expectedCount`
- Đã check-in — `{checkedInCount}/{expectedCount}`
- Bất thường — `exceptions`

### Layout (2-col, 0.9fr / 1.1fr)

**Left — Tóm tắt ca**
- Customer (link to `/customers/{customerId}`)
- Date + schedule
- Shift detail link

**Right — Bất thường cần xử lý**
- For each record with `status !== "on-time"`: warning box with `{workerName} • {label}` + optional note.
- Empty: "Toàn bộ workers check-in/out đúng giờ, không có bất thường."

### Attendance records (full width)
Per record: avatar + worker name (link to `/workers/{workerId}`) + role · status badge · 4-col grid (Check-in, Check-out, Worked hours, Payout) · optional note.

## Modals / drawers

None yet. `Chốt chấm công` should open a confirmation drawer to:
- review exceptions
- approve any adjustments
- transition `in-progress`/`needs-review` → `closed`

## Business rules

### Status transitions
```
in-progress → closed       (no exceptions, all check-outs complete)
in-progress → needs-review (exceptions present but non-blocking)
in-progress → exception    (blocking: missing checkouts past tolerance, no-shows)
needs-review → closed      (admin clears exceptions)
exception → needs-review → closed
```
`closed` is terminal; record locks for payroll/reconciliation.

### Attendance classification (backend-computed)
- `late` — `checkInAt > shift.startTime + tolerance`
- `early-leave` — `checkOutAt < shift.endTime`
- `absent` — no check-in
- `no-checkout` — check-in but no check-out
- `on-time` — within accepted window

### Worked-hours computation
Delta between `checkInAt` and `checkOutAt`, formatted "Xh" / "X.XXh". Apply `roundingMinutes` round-up from the customer shift template (see [customers.md](./customers.md#shifts-tab)).

### Payout
`payout = hourly_rate × workedHours`, where rate comes from the shift's pricing config (see [customers.md](./customers.md#pricing-tab)). Absent / no-checkout → `₫0` or `—`.

### Exception count
`timesheet.exceptions = count of records where status !== "on-time"`. Drives auto-promotion to `needs-review` / `exception`.

### Closed-record immutability
Once `closed`, edits should be blocked (audit trail requirement). Per-record exception notes may stay editable for documentation.

### State machines

**TimesheetStatus**

| From | To | Trigger | Side effect |
|---|---|---|---|
| (create at shift start) | `in-progress` | shift starts | open for check-ins |
| `in-progress` | `closed` | shift end, no exceptions, all checkouts present | auto-promote on auto-finalize OR admin runs `Chốt chấm công` |
| `in-progress` | `needs-review` | shift end, `exceptions > 0` non-blocking | admin must resolve |
| `in-progress` | `exception` | mid-shift critical issue (mass no-show, missing checkouts past tolerance) | admin must resolve |
| `needs-review` / `exception` | `closed` | admin resolves + `Chốt chấm công` | record locks for payroll / reconciliation |

`closed` terminal. Once closed, only note fields remain editable.

**AttendanceRecord.status** — classified at close, not transitional. Backend rules:

| Conditions | Status |
|---|---|
| check-in within tolerance, check-out within tolerance | `on-time` |
| check-in late, check-out present | `late` |
| check-out before scheduled end | `early-leave` |
| no check-in past grace period | `absent` |
| check-in present, no check-out | `no-checkout` |

Any non-`on-time` increments `timesheet.exceptions` and may auto-create a violation case (see [worker-violations.md](./worker-violations.md)).

## Cross-references

- **Shifts** — `shiftId` source. See [shifts.md](./shifts.md).
- **Workers** — `records[].workerId`. See [workers.md](./workers.md).
- **Customers** — `customerId`. See [customers.md](./customers.md).
- **Worker Violations** — late / no-show / absent records may create violation cases. See [worker-violations.md](./worker-violations.md).
- **Reconciliations** — closed timesheets feed reconciliation runs. See [reconciliations.md](./reconciliations.md).
- **Worker Payment Batches** — closed timesheets feed batch line items. See [worker-payment-batches.md](./worker-payment-batches.md).
