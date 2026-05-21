# Hiring Requests

Y/c tuyển dụng. A hiring request is a staffing order from a customer for a specific shift over a date range. The create flow is a 4-step wizard; the detail page tracks candidates, job posts, and timeline.

## Routes

| Route | Purpose |
|---|---|
| `/hiring-requests` | List page |
| `/hiring-requests/new?customerId={id}` | Create wizard (optional customer pre-select) |
| `/hiring-requests/[id]` | Detail page with 4 tabs |

## Entity shape

```ts
type HiringStatus = "draft" | "open" | "fulfilling" | "fulfilled" | "overdue" | "cancelled";
type CandidateStatus = "assigned" | "shortlisted" | "interviewing" | "rejected" | "withdrawn";

interface HiringRequestRecord {
  id: string;                       // "hr-2401"
  code: string;                     // "HR-2401"
  title: string;
  customer: string;
  customerId: string;
  shiftId: string | null;           // CustomerShift link
  area: string;
  headcount: number;
  filled: number;                   // count of candidates with status "assigned"
  committedWorkers: number;         // alias of filled
  filledSlots: number;              // shifts covered (headcount × working days actual)
  totalSlots: number;               // headcount × working days possible
  startDate: string;                // "DD/MM/YYYY"
  endDate: string;
  deadline: string;                 // customer hard deadline
  targetDeadline: string;           // internal fill target
  parentRequestId: string | null;   // if split from parent
  status: HiringStatus;
  payRate: string;                  // "₫55.000 / giờ"
  workerProfile: string[];          // required profile attributes
  skills: string[];                 // job skill tags
  contact: string;
  notes: string;
  candidates: HiringCandidate[];
  timeline: HiringTimelineEntry[];
  jobPosts: JobPost[];
}

interface HiringCandidate {
  id: string;
  workerId?: string;
  workerName: string;
  city: string;
  experience: string;               // "86 ca retail"
  status: CandidateStatus;
  matchScore: number;               // 0–100
  note?: string;
}

interface HiringTimelineEntry {
  id: string;
  at: string;
  action: string;
  actor: string;
  note?: string;
}

interface JobPost {
  id: string;                       // "JP-8821"
  hiringRequestId: string;
  title: string;
  displayedPay: { amount: number; unit: "shift" | "hour" };
  payCycle: string;
  visibility: "public" | "unlisted" | "private";
  status: "draft" | "published" | "paused" | "closed";
  adhocBonus: {
    amount: number;
    unit: "shift" | "hour";
    reason: string;
    approvalStatus: "pending" | "approved" | "rejected";
  } | null;
  publishedAt: string | null;
  closedAt: string | null;
  applicationCount: number;
}
```

### Status labels

| Status | Label | Color |
|---|---|---|
| `draft` | Nháp | gray |
| `open` | Đang tuyển | warning |
| `fulfilling` | Sắp đủ người | warning |
| `fulfilled` | Đủ người | success |
| `overdue` | Quá hạn | error |
| `cancelled` | Đã huỷ | gray |

### Candidate funnel labels

| Status | Label | Color |
|---|---|---|
| `assigned` | Đã nhận ca | success |
| `shortlisted` | Shortlist | warning |
| `interviewing` | Đang phỏng vấn | warning |
| `rejected` | Bị loại | error |
| `withdrawn` | Rút hồ sơ | gray |

## List page

### Summary metrics (3)
- **Request đang mở** — count where status is `open` or `fulfilling`
- **Request quá hạn** — count where status is `overdue`
- **CTV cần fill thêm** — sum of `headcount - filled` across filtered records

### Filters
- **Search** — `title` / `customer` / `code`
- **Status pills** — Tất cả · Đang tuyển · Sắp đủ · Đủ người · Quá hạn

### Header CTA
`Tạo Y/c tuyển dụng mới` → `/hiring-requests/new`

### Columns
Hiring request (title + code/area) · Khách hàng (logo + name) · Headcount ("X người") · Tiến độ fill ("filled/headcount") · Deadline · Trạng thái · Chevron.

## Create wizard

4 steps. `HiringRequestWizardProvider` context with mode `view | create | edit`. Tabs are clickable (no hard validation gating).

### Step 1: Thông tin cơ bản (`basic`)
- **Customer** combobox (with logo). Switching clears shift selection.
- **Shift selection** card grid — only active customer shifts. Each card: code, position, location, weekdays, start–end time. Selected = blue ring + check.
- **Pricing summary** sidebar (sticky) — table of rates for the selected shift's pricing config. Note: "Khi tạo y/c, hệ thống sẽ snapshot giá và chính sách của ca tại thời điểm này".
- **Ngày làm** — start + end date (required).
- **Số lượng cần tuyển** — number ≥ 1, suffix "người", quick preset buttons 5/10/20/50/100. Hint: "Tăng buffer 10-20% nếu khả năng no-show cao."
- **Ghi chú khách hàng** — textarea, 3 rows.

### Step 2: Lịch làm việc (`schedule`)
Two columns.

**Lịch:**
- Ngày bắt đầu / Ngày kết thúc
- **Lịch trong tuần** checkboxes Hai…CN (CN in warning color)
- Giờ bắt đầu / Giờ kết thúc
- Nghỉ giải lao (minutes, optional)

**Chính sách:**
- **Yêu cầu làm đủ ngày** checkbox. Hint: "Sẽ có ít CTV ứng tuyển hơn vì nếu nghỉ sẽ bị phạt"
- **Làm tròn giờ công** (minutes, min 1). Hint: "Cách làm tròn: Round-up. Ví dụ 0,5 = 1 và 0,4 = 0"
- **Ghi nhận giờ công** radio: `precise` (Chính xác) / `simple` (Đơn giản)
- **Có tăng ca** checkbox. If on:
  - `afterScheduledEnd` (default) — input: "Số phút tối thiểu sau giờ chính thức để tính tăng ca"
  - `dailyHourThreshold` — input: "Số giờ công chính thức / ngày"

### Step 3: Cước phí & Thưởng (`pay`)
- **Cấu hình cước phí** — dropdown (if multi) or read-only link.
- **Thu nhập** — read-only preview, link to detail. Info: snapshot generated from pricing.
- **% Biên LN gộp** — read-only.
- **Thưởng thêm** checkbox. If on:
  - Số tiền (min 1000, required)
  - Unit toggle (shift / hour)
  - Lý do (textarea, min 20 chars). Hint: "Trình bày lý do để người duyệt đánh giá (tối thiểu 20 ký tự)."
  - Approval status badge (pending=warning / approved=success / rejected=error). Info: "Cần được duyệt trước khi tin đăng được công khai."
- **Chu kỳ thanh toán** — Tiền ngay / Hàng tháng / 2 lần/tháng
- **Hình thức trả lương** — read-only

### Step 4: Tin tuyển dụng (`posting`)
**Left:**
- Tiêu đề tin đăng (default = position name)
- Thù lao hiển thị (radio, e.g. "162.500đ/ca — Theo cấu hình cước phí")
- Chế độ hiển thị radio:
  - `public` — Công khai (mọi freelancer)
  - `unlisted` — Hạn chế (link trực tiếp)
  - `private` — Ẩn (chỉ freelancer được mời)

**Right — Live preview card:** company header, pay section, bonus section (if enabled), schedule, location, job details (overridden requirements/benefits/instructions).

### Sticky bottom action bar
Back · Continue (not last step) · Save (last step, if mode ≠ view). All right-aligned.

## Detail page

### Header
Breadcrumb · UserPlus icon + title + status badge · `{code} • {customer} • {area}` · notes · skill tags. Actions: `Quay lại danh sách`, `Đẩy CTV vào ca` (primary).

### Metric cards (4)
- CTV đã nhận: `{committedWorkers}/{headcount}` — `{fillRate}% headcount · còn {remaining} người`
- Slot đã đi: `{filledSlots}/{totalSlots}` — `{slotFillRate}% · {headcount} × ngày`
- Khoảng tuyển: `{startDate} → {endDate}`
- Hạn fill: `{targetDeadline}` — deadline khách subtitle

### Tabs (with count badges)

1. **Tổng quan** — 2 columns. **Left "Thông tin yêu cầu":** customer (link), ca làm việc (link to shift), địa điểm, lịch, lương, liên hệ. **Right "Ghi chú khách hàng":** notes brief + worker profile pills.
2. **Tin tuyển dụng** — `Đăng tin mới` CTA + per-post card (ID, status, visibility, title, displayedPay, payCycle, dates, applicationCount, bonus info, `Xem`). Empty: "Chưa có tin tuyển dụng nào..."
3. **Ứng viên** — funnel pills (Tất cả + per-status with counts) + side metric "Còn cần {remaining} người". Per candidate: avatar + name (link if workerId), city, experience, status badge, match score, note.
4. **Timeline** — vertical timeline with action (bold), at + actor, optional note.

## Modals / drawers

### Change Headcount drawer
Triggered from edit mode. Fields:
- **Số lượng mới** (number ≥ 1). Hint shows: "Hiện tại: {n} · Thay đổi: {sign}{delta} ({changePct}%)"
- **Lý do** textarea (required, min 20 chars)

Threshold logic (`HEADCOUNT_APPROVAL_THRESHOLD_PCT = 20`):
- changePct ≥ 20% → warning + button "Gửi yêu cầu duyệt" (creates pending change entry; headcount not yet changed)
- changePct < 20% → success + button "Xác nhận" (applies immediately, logs approved entry)

`headcountPending` field stores requested value + reason while awaiting approval.

## Business rules

### Auto status transitions
- `open → fulfilling` when `filled ≥ headcount × 0.8`
- `fulfilling → fulfilled` when `filled ≥ headcount`
- `open | fulfilling → overdue` when `now > deadline` and not yet filled
- Manual: `any → cancelled`

### Computed values
- `fillRate = round((filled / headcount) × 100)`, capped at 100
- `remaining = max(headcount - filled, 0)`
- `slotFillRate = round((filledSlots / totalSlots) × 100)` (if totalSlots > 0)

### Pricing snapshot
On HR creation, capture the customer's pricing config rates immutably. Demo shows info message only; backend must implement the snapshot.

### Headcount-change governance
Changes ≥ 20% require explicit approval; below threshold auto-applies. All changes logged to timeline with timestamp, actor, reason, percentage.

### Job post lifecycle
`draft → published → (paused ↔ published) → closed`. Ad-hoc bonus must be `approved` before a post with bonus can go `public`.

### Multi-post strategy
One HR can host multiple `JobPost`s (re-post, different visibility, A/B audience). Each tracks its own `applicationCount`.

### State machines

**HiringStatus**

| From | To | Trigger | Guard |
|---|---|---|---|
| (create) | `draft` | wizard saved without publish | |
| `draft` | `open` | publish | all 4 wizard steps complete |
| `open` | `fulfilling` | candidate `assigned` | `filled ≥ headcount × 0.8` |
| `fulfilling` | `fulfilled` | candidate `assigned` | `filled ≥ headcount` |
| `fulfilling` | `open` | candidate withdraws / cancels | `filled < headcount × 0.8` |
| `open` / `fulfilling` | `overdue` | clock tick | `now > deadline` and not filled |
| `overdue` | `fulfilled` | last candidate assigned | `filled ≥ headcount` |
| any non-terminal | `cancelled` | manual | reason logged |

Terminal: `fulfilled`, `cancelled`.

**HiringCandidate.status** (funnel)

| From | To | Trigger | Side effect |
|---|---|---|---|
| `shortlisted` | `interviewing` | interview scheduled | |
| `shortlisted` / `interviewing` | `assigned` | hire confirmed | increments parent HR `filled` |
| `shortlisted` / `interviewing` | `rejected` | rejection | |
| any non-terminal | `withdrawn` | candidate withdraws | |

Terminal: `assigned`, `rejected`, `withdrawn`.

**JobPost.status**

| From | To | Trigger | Side effect |
|---|---|---|---|
| `draft` | `published` | publish | `publishedAt` set; if `adhocBonus.approvalStatus ≠ approved`, post cannot be `visibility=public` |
| `published` | `paused` | pause | applications halted |
| `paused` | `published` | resume | |
| `published` / `paused` | `closed` | manual close or HR `fulfilled` / `cancelled` | `closedAt` set |

**adhocBonus.approvalStatus**: `pending → approved | rejected`. Required `approved` before a `public` post can publish.

**Headcount change**: not an enum, but a flow. `changePct < 20%` → `Xác nhận` applies immediately + log to timeline. `changePct ≥ 20%` → `Gửi yêu cầu duyệt` creates `headcountPending`; admin approves to commit.

## Cross-references

- **Customers** — `customerId`. See [customers.md](./customers.md).
- **Customer Shifts** — `shiftId` (template). See [customers.md](./customers.md#shifts-tab).
- **Customer Pricing Configs** — pricing snapshot source. See [customers.md](./customers.md#pricing-tab).
- **Candidates** — applicants flow in via `HiringCandidate`. See [candidates.md](./candidates.md).
- **Workers** — `candidate.workerId` once converted. See [workers.md](./workers.md).
- **Shifts (global calendar)** — instantiated from the underlying customer shift; HR fills determine assignments. See [shifts.md](./shifts.md).
