# Customers

Customer is the top-level commercial entity. Pipeline: Lead → Onboarding → Hiring → Paused. The detail page is the configuration hub for everything that flows downstream (positions, locations, pricing, shifts, reconciliation).

## Routes

| Route | Purpose |
|---|---|
| `/customers` | List page, tab-based pipeline filter |
| `/customers/new` | Create customer wizard |
| `/customers/[id]` | Detail page, vertical tabs |
| `/customers/[id]?tab=<id>` | Switch detail tab |
| `/customers/[id]?tab=shifts&shift=<id>` | Open shift edit sub-view |
| `/customers/[id]?tab=pricing&config=<id>` | Open pricing config detail |
| `/customers/[id]?tab=positions&position=<id>` | Open position edit |

Switching the outer `tab` clears the inner sub-route param (`shift`, `config`, `position`).

## Entity shape

```ts
type CustomerStatus = "hiring" | "lead" | "onboarding" | "paused";
type CustomerVerificationStatus = "active" | "pending" | "rejected";

interface CustomerRecord {
  id: string;
  name: string;
  industry: string;
  city: string;
  status: CustomerStatus;
  verificationStatus: CustomerVerificationStatus;
  contact: { name: string; title: string; phone: string; email: string };
  activeRequests: number;          // open hiring requests
  openShifts: number;              // open shifts
  totalJobs: number;
  totalFreelancers: number;
  monthlySpend: string;            // formatted VND
  joinedAt: string;                // "MM/YYYY"
  notes: string;
  hiringRequests: CustomerHiringRequest[];
  shifts: CustomerShift[];
  billing: CustomerBillingSnapshot;
  hiringStats?: { hired: number; target: number };
  lead?: CustomerLeadInfo;          // present only when status === "lead"
  onboarding?: CustomerOnboardingInfo; // present only when status === "onboarding"
  pausedInfo?: CustomerPausedInfo;     // present only when status === "paused"
}

interface CustomerBillingSnapshot {
  currentMonth: string;
  previousMonth: string;
  outstanding: string;             // unpaid amount, formatted VND
  paymentTerm: string;             // "30 ngày"
}

interface CustomerLeadInfo {
  stage: "Khám phá nhu cầu" | "Đang đàm phán" | "Đã gửi proposal" | "Chờ ký hợp đồng";
  source: "Inbound web" | "Outbound" | "Giới thiệu" | "Event/Hội thảo";
  notes: string;
  lastContactAt: string;           // "DD/MM/YYYY"
}

interface CustomerOnboardingInfo {
  stage: "Ký hợp đồng" | "Setup hệ thống" | "Đào tạo vận hành" | "Pilot job đầu tiên";
  progress: number;                // 0–100
  goLiveDate: string;
  accountManager: { name: string; title: string };
}

interface CustomerPausedInfo {
  reason: string;
  since: string;                   // "DD/MM/YYYY"
}
```

### Status labels

| Status | Label | Color |
|---|---|---|
| `hiring` | Đang tuyển | success |
| `lead` | Lead | brand |
| `onboarding` | Onboarding | warning |
| `paused` | Tạm ngưng | gray |

### Verification labels

| Status | Label | Color |
|---|---|---|
| `active` | Kích hoạt | success |
| `pending` | Chờ duyệt | warning |
| `rejected` | Từ chối | error |

## List page

### Filters
- **Tabs** (status, mutually exclusive): `hiring | lead | onboarding | paused | all` with counts.
- **Search**: matches `customer.name` OR `contact.name` (case-insensitive).
- **Header CTA**: `Tạo Khách hàng mới` → `/customers/new`.

### Columns (vary per tab)

**Hiring tab:** Khách hàng · HR đang mở · Đã tuyển (`hired/target`) · Ca đang mở · Công nợ · Xác thực · Detail link.

**Lead tab:** Khách hàng · Liên hệ · Nguồn · Giai đoạn (badge color by `LEAD_STAGE_COLOR`) · Ghi chú · Cập nhật · Detail link.

**Onboarding tab:** Khách hàng · Account Manager (avatar) · Giai đoạn · Tiến độ (progress bar `0–100%`) · Go-live · Detail link.

**Paused tab:** Khách hàng · Liên hệ · Tạm ngưng từ · Lý do · Công nợ tồn · Detail link.

**All tab:** Khách hàng · Trạng thái · HR · Ca · Công nợ · Detail link.

### Lead-stage colors
`Khám phá nhu cầu`=gray, `Đang đàm phán`=warning, `Đã gửi proposal`=brand, `Chờ ký hợp đồng`=success.

### Onboarding-stage colors
`Ký hợp đồng`=gray, `Setup hệ thống`=warning, `Đào tạo vận hành`=brand, `Pilot job đầu tiên`=success.

### Summary metrics (currently commented out; preserved in code)
- Khách hàng đang tuyển (hiring count + total HR + total open shifts)
- Pipeline Leads (lead count)
- Đang Onboarding (onboarding count)

## Detail page

Vertical tabs (left rail). Order:
1. **Tổng quan** (Overview)
2. **Hợp đồng** (Documents)
3. **Địa điểm** (Locations)
4. **Công việc** (Positions)
5. **Cấu hình giá** (Pricing)
6. **Ca làm việc** (Shifts)
7. **Cấu hình đối soát** (Reconciliation)
8. **Nhân viên** (Users) — customer-side users, not internal staff

### `CustomerDetailExtras` shape

```ts
interface CustomerDetailExtras {
  brand: { brandName: string; urlSlug: string; urlLabel: string; serviceTags: string[] };
  legal: { legalName: string; taxId: string; legalAddress: string; invoiceEmail: string };
  management: {
    operationalStatusLabel: string;
    verificationStatusLabel: string;
    companyType: string;            // "Khách hàng" | etc.
    companySize: string;            // "Big Corp" | etc.
    industry: string | null;
    isKeyAccount: boolean;
    accountManager: string;
    hubspotUrl: string | null;
  };
  documents: CustomerDocument[];
  users: CustomerUserRecord[];      // customer-side contacts
  positions: CustomerPosition[];
  locations: CustomerLocation[];
  pricingConfigs: CustomerPricingConfig[];
  shifts: CustomerShift[];          // shift templates per customer
  reconciliation: CustomerReconciliation;
}
```

### Overview tab
Brand profile, legal profile, management profile, operational snapshot (active requests, open shifts, monthly spend, outstanding, payment term).

### Documents tab
List of `CustomerDocument`:
```ts
interface CustomerDocument {
  id: string;
  name: string;
  type: string;                    // "Hợp đồng" | "Phụ lục" | etc.
  validFrom: string;
  validTo: string;
  renewalTerm: string;             // "Tự động gia hạn 12 tháng"
  note: string;
  createdAt: string;
}
```

### Locations tab
List of `CustomerLocation`:
```ts
interface CustomerLocation {
  id: string;
  shortName: string;
  address: string;
  province: string;
  jobCount: number;
  workerCount: number;
}
```

### Positions tab
Position table → click opens `PositionEditView` (sub-route `?position=<id>`).
```ts
interface CustomerPosition {
  id: string;
  name: string;
  description: string;
  requirements: string;            // multi-line, "-" bullets
  benefits: string;
  instructions: string;
}
```

### Pricing tab
List of `CustomerPricingConfig`. Click opens `PricingDetailView` (sub-route `?config=<id>`).

```ts
type CustomerPricingStatus = "active" | "inactive";
type CustomerPricingShiftType =
  | "day_regular" | "day_overtime"
  | "night_regular" | "night_overtime"
  | "day_holiday" | "night_holiday";

interface CustomerPricingConfig {
  id: number;
  name: string;
  appliedFrom: string;
  appliedTo: string;
  province: string;
  jobType: string;
  category: string;
  serviceClass: string;
  status: CustomerPricingStatus;
  rates: CustomerPricingRate[];
}

interface CustomerPricingRate {
  shiftType: CustomerPricingShiftType;
  payAmount: string;               // VND, worker pay
  feeAmount: string;               // VND, customer billing fee
  gm0: string;                     // gross margin %, "15%"
  expectedShare: string | null;    // expected share of revenue (planning)
  actualShareL30: string | null;   // last-30-day actual share
}
```

Shift-type labels:
- `day_regular` → Ca ngày thường
- `day_overtime` → Tăng ca ngày thường
- `night_regular` → Ca đêm - ngày thường
- `night_overtime` → Tăng ca đêm - ngày thường
- `day_holiday` → Ca ngày lễ
- `night_holiday` → Ca đêm ngày lễ

### Shifts tab
List of `CustomerShift` (shift templates). Click opens `ShiftEditView` (sub-route `?shift=<id>`) with 4 sections: General, Schedule, Pricing, Policy + Hiring Request list.

```ts
type CustomerShiftStatus = "active" | "inactive";
type CustomerShiftAttendanceMode = "precise" | "simple";
type CustomerShiftOvertimeCalcMode = "afterScheduledEnd" | "dailyHourThreshold";
type CustomerShiftWeekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;   // 1=Mon, 7=Sun
type CustomerShiftKind = "day" | "night" | "mixed";

interface CustomerShift {
  id: string;
  name: string;
  status: CustomerShiftStatus;
  positionId: string;              // → CustomerPosition
  locationId: string;              // → CustomerLocation
  weekdays: CustomerShiftWeekday[];
  startTime: string;               // "HH:MM"
  endTime: string;
  breakMinutes: number | null;
  pricingConfigId: number;         // → CustomerPricingConfig
  requireFullAttendance: boolean;
  roundingMinutes: number;
  attendanceMode: CustomerShiftAttendanceMode;
  allowsOvertime: boolean;
  overtimeCalcMode: CustomerShiftOvertimeCalcMode | null;
  overtimeMinMinutesAfterShift: number | null;  // for "afterScheduledEnd"
  overtimeDailyHourLimit: number | null;        // for "dailyHourThreshold"
  createdAt: string;
  updatedAt: string;
  hiringRequestCount: number;
  hiringRequests: CustomerShiftHiringRequestRef[];
}

interface CustomerShiftHiringRequestRef {
  id: string;                      // "HR-2451"
  title: string;
  status: "publishing" | "draft" | "paused" | "completed";
  startDate: string;
  endDate: string;
  headcount: number;
  filled: number;
}
```

Shift-kind classifier (derived, not stored):
```ts
classifyShiftKind(startTime, endTime):
  inNight = (t) => t > "22:00" || t < "06:00";
  startInNight = inNight(startTime);
  endInNight = inNight(endTime);
  if (startInNight && endInNight) return "night";
  if (!startInNight && !endInNight) return "day";
  return "mixed";
```

Weekday display: T2..T7, CN (Sunday rendered in warning color).

### Reconciliation tab
Per-customer reconciliation config. Full shape in [customer-reconciliations.md](./customer-reconciliations.md).

```ts
interface CustomerReconciliation {
  cycle: { perMonth: string | null; startDay: string | null; endDay: string | null };
  invoiceProfile: {
    statementDueRule: string | null;
    invoiceDueRule: string | null;
    debtCutoffRule: string | null;
    paymentTermDays: string | null;
    issuanceMethod: string | null;
    templateFile: string | null;
    templateLinkUrl: string | null;
    requiredDocs: string[];
  };
  contacts: CustomerReconciliationContact[];
  channel: {
    kind: string | null;            // "Zalo" | ...
    bookingGroupUrl: string | null;
    reconciliationGroupUrl: string | null;
  };
  note: string | null;
}

interface CustomerReconciliationContact {
  id: string;
  role: string;                    // "Đối soát" | "Thanh toán" | "Giám sát"
  fullName: string;
  phone: string;
  email: string;
  coverageArea: string;
}
```

### Users tab
Customer-side user contacts:
```ts
interface CustomerUserRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}
```

## Business rules

- **Status-derived data**: `lead`, `onboarding`, `pausedInfo` are populated only when `status` matches. Backend should enforce.
- **Hiring stats** (`hired/target`) only meaningful when `status === "hiring"`.
- **Pricing snapshot on HR creation**: when a hiring request is created from a shift, the pricing config rates are snapshotted (see [hiring-requests.md](./hiring-requests.md)). Backend must store immutable snapshot.
- **Pricing config status**: `active` configs are eligible for new HRs; `inactive` is preserved for historical reference.
- **Shift `attendanceMode`**:
  - `precise` — record exact check-in/out, applies `roundingMinutes` with round-up
  - `simple` — single check-in counts as full attendance
- **Shift overtime**:
  - `afterScheduledEnd` — overtime counts after `overtimeMinMinutesAfterShift` minutes past scheduled end
  - `dailyHourThreshold` — overtime counts when worker exceeds `overtimeDailyHourLimit` hours/day
- **`requireFullAttendance`**: when true, partial-attendance workers get penalized (UI hint: "Sẽ có ít CTV ứng tuyển hơn").
- **Verification status** gates: pending verification customers cannot have active hiring requests (inferred from data — onboarding customers have `verificationStatus: "pending"` and `activeRequests: 0`).
- **Customer overrides**: `CUSTOMER_EXTRAS_OVERRIDES` in `customer-detail-data.ts` show some customers get bespoke reconciliation, documents, management profiles. Backend should support full per-customer config (no shared defaults beyond initial seed).

### State machines

**CustomerStatus** — manual transitions, sales / AM workflow.

| From | To | Trigger | Side effect |
|---|---|---|---|
| (create) | `lead` | sales creates customer | `lead` subobject populated |
| `lead` | `onboarding` | contract signed | `onboarding` subobject populated; lead kept for history |
| `onboarding` | `hiring` | first HR opened (or go-live reached) | `onboarding` cleared |
| `hiring` | `paused` | manual pause | `pausedInfo` set; `activeRequests` / `openShifts` should go to 0 |
| `paused` | `hiring` | resume | `pausedInfo` cleared |

**Lead stage** (linear, only while `status=lead`): `Khám phá nhu cầu → Đang đàm phán → Đã gửi proposal → Chờ ký hợp đồng → (exit to onboarding)`.

**Onboarding stage** (linear, only while `status=onboarding`, `progress` 0–100): `Ký hợp đồng → Setup hệ thống → Đào tạo vận hành → Pilot job đầu tiên → (exit to hiring)`.

**CustomerVerificationStatus**

| From | To | Trigger | Guard |
|---|---|---|---|
| `pending` | `active` | docs approved | tax ID + invoice email valid |
| `pending` | `rejected` | docs denied | reason logged |
| `active` | `pending` | re-verification triggered | |

Flipping `status: onboarding → hiring` should require `verificationStatus = active`.

**CustomerPricingStatus / CustomerShiftStatus**: simple `active ↔ inactive` toggle. `inactive` preserved for history; cannot back new hiring requests.

**HR ref status (`CustomerShiftHiringRequestRef.status`)**: mirrors hiring-request lifecycle. Authoritative state lives in [hiring-requests.md](./hiring-requests.md).

## Cross-references

- **Hiring Requests** — created against a `CustomerShift`, scoped to the customer. See [hiring-requests.md](./hiring-requests.md).
- **Shifts** (global calendar) — instantiated from `CustomerShift` templates via `shifts-generator.ts`. See [shifts.md](./shifts.md).
- **Reconciliation runs** — consume `CustomerReconciliation.cycle` and `invoiceProfile`. See [reconciliations.md](./reconciliations.md).
- **Customer Reconciliations (list)** — read-only summary of every customer's reconciliation config. See [customer-reconciliations.md](./customer-reconciliations.md).
- **Workers** — assigned to shifts owned by customers; customer name appears in worker shift history, violation context, payment batch breakdown.
