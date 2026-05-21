# Shifts

Operational shift calendar. Shifts are instantiated from per-customer shift templates (see [customers.md](./customers.md#shifts-tab)) and live in `/shifts` for cross-customer ops view.

## Routes

| Route | Purpose |
|---|---|
| `/shifts` | Calendar view (default). Week / Day / Customer subview |
| `/shifts/list` | Table view (legacy URL; redirects to `/shifts?display=table`) |
| `/shifts?display=calendar\|table` | Toggle outer mode |
| `/shifts/[id]` | Shift detail page |

View preferences persist in `localStorage` (display mode, calendar subview, customer scope, sidebar collapsed).

## Entity shape

```ts
type ShiftStatus = "open" | "filling" | "full" | "critical" | "closed";
type Region = "TP. HCM" | "Hà Nội" | "Bình Dương" | "Đà Nẵng" | "Hải Phòng" | "Cần Thơ";

interface ShiftRecord {
  id: string;                     // "{templateId}-YYYYMMDD"
  code: string;                   // "GHN-1234"
  name: string;
  customer: string;
  customerId: string;
  region: Region;
  site: string;
  address: string;
  schedule: string;               // "Thứ Hai, 08:00 – 17:00"
  startAt: string;                // formatted
  endAt: string;
  startAtMs: number;              // unix ms
  endAtMs: number;
  requiredCount: number;
  assignedCount: number;
  status: ShiftStatus;
  payRate: string;                // "55.000đ/h"
  payRateNote: string;            // "Phụ cấp ăn ca ₫45.000"
  requirements: string[];
  notes: string;
  assignments: ShiftAssignment[];
  operator: ShiftOperator;
  plannedCheckIns: PlannedCheckIn[];
}

interface ShiftAssignment {
  workerId: string;
  workerName: string;
  role: string;
  confirmedAt: string;
  status: "Đã xác nhận" | "Dự bị" | "Đã huỷ";
}

interface ShiftOperator {
  id: string;
  name: string;
  initials: string;
  avatarUrl: string;
}

interface PlannedCheckIn {
  workerId: string;
  workerName: string;
  initials: string;
  scheduledAtMs: number;
  late: boolean;
  noShow: boolean;
}
```

### Status labels

| Status | Label | Color |
|---|---|---|
| `open` | Đang mở | warning |
| `filling` | Đang tuyển | warning |
| `full` | Đủ người | success |
| `critical` | Thiếu gấp | error |
| `closed` | Đã đóng | gray |

### Assignment statuses
`Đã xác nhận` (success) · `Dự bị` (warning) · `Đã huỷ` (error).

## Calendar view

3 sub-tabs: **Week**, **Day**, **Customer ("Theo KH")**.

### Week view
- 7-column grid (Mon–Sun) × 4 time buckets (morning / afternoon / evening / night).
- Header per day: name, date, shift count, highlight if today.
- Footer per day: needed count, registered vs required, fill %.
- Past days dimmed.
- Card: name, site, fill progress bar, operator avatar with status dot.

### Day view
- Operational state tabs: **Sắp tới** (upcoming) / **Đang diễn ra** (ongoing) / **Sắp kết thúc** (ending-soon) / **Đã kết thúc** (done).
- KPI strip above list: Required, Registered, Attended, Fill Rate %, No-show + Late count, Critical shift count.
- Rows: 8 columns (status dot, time range, op badge with countdown, name + issue label, attended/assigned/required ratio, worker avatar preview, operator, chevron).
- Operational badges:
  - upcoming → `▶ {countdown}` (urgent if <30 min to start)
  - ongoing → `⏱ {countdown-to-end}`
  - ending-soon → `⏹ {countdown}` when <1h remaining
  - done → `✓ {endTime} hoàn tất`
- Auto-tick every 60s (`60_000ms`) to refresh countdowns.

### Customer view ("Theo KH")
Matrix: sticky customer column × 7 weekday columns. Per customer row: logo, name, total shifts, total assigned/required, missing count (red if >0). Cells stack mini shift rows (compact time, status dot color, assigned/required).

## Sidebar filters (apply to all views)

- Customer multi-select (hidden in week view; that view requires single customer)
- Search (name / code / site)
- Region multi-select
- Operator multi-select (avatar-prefixed)
- Status checkbox list
- Fill bucket chips: `low <50%`, `mid 50–99%`, `full 100%`
- Time bucket chips: morning 06–12, afternoon 12–18, evening 18–22, night 22–06
- Active count badge + Reset button

```ts
interface ShiftFilters {
  search: string;
  regions: string[];
  statuses: ShiftStatus[];
  fillBuckets: ("low" | "mid" | "full")[];
  timeBuckets: ("morning" | "afternoon" | "evening" | "night")[];
  operators: string[];
}
```

## Table view (`/shifts?display=table`)

Status tabs: `Tất cả`, `Thiếu gấp` (critical), `Đang mở` (open), `Đang tuyển` (filling), `Đủ người` (full), `Đã đóng` (closed). Each with count.

Columns:
1. Shift (name + code)
2. Customer / Site (logo + name, site + region)
3. Schedule (weekday + HH:MM range)
4. Fill (badge + progress bar)
5. Operator (avatar + name)
6. Pay rate

Click row → opens `ShiftDetailModal` (does not navigate). Detail page accessed via modal footer.

## Detail page (`/shifts/[id]`)

### Header
Breadcrumb · CalendarDays icon in primary box · title + status badge · subtitle `{code} · {customer} · {site}` · schedule label. Actions: `Quay lại danh sách`, `Mời thêm CTV` (primary).

### Metrics row (4)
- Fill: `{assigned}/{required} · {%}%` (warning if not 100%)
- Pay rate
- Date range
- Time range

### Shift info card (left)
Customer (link) · Site + address · Pay rate + note · Notes.

### Requirements card (right)
Requirement strings rendered as rounded pills.

### Assignments card (full width)
Per assignment: worker avatar + name (link), role, confirmation date, status badge.

## Modals / drawers

### ShiftDetailModal (size `lg`)
Triggered by clicking a shift card or table row. Contains:
- Status badge + monospace code; name + customer/site subtitle
- 2-col info grid: Schedule, Time range, Region + address, Pay rate (with optional payRateNote)
- Fill progress bar + assigned/required
- Operator
- Requirements list
- Notes
- First 5 worker assignments (+N indicator if more)
- Footer: `Đóng`, `Xem cấu hình Ca làm việc` (→ `/shifts/{id}`)

## Business rules

### Weekday encoding
Display order Mon → Sun. In code: `getDay() === 0` (Sunday) maps to index 6; otherwise `getDay() - 1`. Templates store `dayOffsets: number[]` (0-indexed Mon=0).

### Time-bucket classification
```ts
getTimeBucket(shift):
  hour = startAt hour
  if 6 ≤ hour < 12 → "morning"
  if 12 ≤ hour < 18 → "afternoon"
  if 18 ≤ hour < 22 → "evening"
  else → "night"
```

### Fill bucket
```ts
if requiredCount === 0 → "full"
if assigned / required ≥ 1.0 → "full"
if assigned / required < 0.5 → "low"
else → "mid"
```

### Status resolution (generated shifts)
```ts
resolveStatus(hint, assigned, required):
  if assigned ≥ required → "full"   // override hint
  if assigned / required < 0.5 → "critical"
  else → hint                       // open / filling / closed
```

### Operational state (day view)
```ts
if now < startAt → "upcoming"
if now ≥ endAt → "done"
if endAt - now ≤ 1h → "ending-soon"
else → "ongoing"
```

### No-show grace period
`15 min` after shift start (`GRACE_PERIOD_MS = 900_000`). Workers whose `scheduledAtMs ≤ startAt + grace` and `noShow = true` count as no-shows.

### Late detection
`PlannedCheckIn.late = true` when arrival is >5 min after scheduled check-in.

### Overnight shifts
If template `overnight: true`, endDay = startDay + 1. Schedule label shows `(qua đêm)`.

### Pay rate formatting
`formatPayRate(vnd, unit)` → `{vnd.toLocaleString("vi-VN")}đ/{abbr}` where abbr is from `payRateUnit ∈ {"giờ", "ca"}`.

### Data generation
`shifts-generator.ts` instantiates `ShiftTemplate` (per customer/position/location/pricing) into per-day `ShiftRecord`s. Window: 4 weeks before + 4 weeks after anchor date. Worker assignments and check-in offsets are deterministic per-shift per-worker hash for stable mock data.

### State machines

**ShiftStatus** — partially derived via `resolveStatus(hint, assigned, required)`; persisted hint plus runtime overrides.

| From | To | Trigger |
|---|---|---|
| `open` | `filling` | `assigned/required` enters 0.5–0.99 band |
| `filling` | `full` | `assigned ≥ required` |
| `full` | `filling` | worker withdraws, ratio drops below 1.0 |
| `open` / `filling` | `critical` | `assigned/required < 0.5` near start time |
| any | `closed` | shift end reached or manual close (becomes a Timesheet) |

`closed` terminal once attendance finalized.

**ShiftAssignment.status**

| From | To | Trigger | Side effect |
|---|---|---|---|
| (create) | `Dự bị` | invite sent | reserve slot |
| `Dự bị` | `Đã xác nhận` | worker confirms | slot locked |
| `Đã xác nhận` / `Dự bị` | `Đã huỷ` | worker withdraws or admin removes | slot released back to required count |

**Operational state** (derived, never persisted): pure function of `(now, startAtMs, endAtMs)`.

| Condition | State |
|---|---|
| `now < startAtMs` | `upcoming` |
| `now ≥ startAtMs && now < endAtMs - 1h` | `ongoing` |
| `endAtMs - 1h ≤ now < endAtMs` | `ending-soon` |
| `now ≥ endAtMs` | `done` |

## Cross-references

- **Customer shift templates** (`CustomerShift`) — the source for generated shifts. See [customers.md](./customers.md#shifts-tab).
- **Customers** — `customerId`, logo lookup.
- **Positions / Locations / Pricing configs** — referenced via the template; pricing rate appears on each generated shift.
- **Workers** — `assignments[].workerId`, `plannedCheckIns[].workerId`.
- **Hiring Requests** — multiple HRs can be opened against one shift. See [hiring-requests.md](./hiring-requests.md).
- **Timesheets** — each shift instance becomes a timesheet record once it runs. See [timesheets.md](./timesheets.md).
