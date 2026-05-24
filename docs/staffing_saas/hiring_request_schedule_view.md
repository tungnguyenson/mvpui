# Hiring Request — Lịch & Ứng viên (brainstorm)

Trạng thái: brainstorm — chưa implement. Ghi lại các quyết định thiết kế từ phiên 2026-05-24.

**Ngôn ngữ:** doc này viết tiếng Việt vì business logic phức tạp (1 Vị trí có nhiều HR đồng thời với SLA/giá khác nhau), tránh hiểu sai khi dịch.

**Bối cảnh:** 1 Hiring Request (HR) có khoảng ngày (`startDate → endDate`) + lịch theo thứ trong tuần. Mỗi ngày làm việc cần `headcount` CTV, hiện đã có `filled` người. Tab "Ứng viên" hiện tại (xem [apps/staffing-saas/docs/hiring-requests.md](../../apps/staffing-saas/docs/hiring-requests.md) §Detail page) chỉ hiển thị danh sách phẳng theo funnel, không cho thấy demand/supply theo từng ngày. Doc này thiết kế view theo ngày.

---

## 0. Phạm vi prototype v1

**Surface:** chỉ build tab **"Lịch làm việc"** trong HR Detail page (`/hiring-requests/[id]`). Hai surfaces khác (Hiring Center list, Demand Calendar) defer.

**Decisions đã lock cho v1:**

| Quyết định | Lock value | Lý do |
|---|---|---|
| **Q6** Per-day headcount | `headcount` **flat** cho toàn range, không override per-day | Đơn giản, ship nhanh. Nâng cấp Option B (`shift_dates` table) khi có demand thật. |
| **Q7** Position entity | Alias = `customerShift.id`, không thêm model `Position` riêng | Không cần thiết cho HR Detail. Revisit khi build Demand Calendar. |
| **Q1** Tab placement | Giữ 2 tab cùng tồn tại, đổi tên rõ:<br>· "Ứng viên" → **"Pipeline tuyển"** (funnel cross-day)<br>· Tab mới = **"Lịch làm việc"** (assignment per-day) | Hai audience khác (sales nhìn pipeline, ops nhìn lịch). Tránh confuse bằng label rõ. |
| **Q10** Assignment lifecycle (simplified v1) | State machine v1: `assigned → confirmed`; terminal: `cancelled`. Defer `checked-in`, `no-show` (thuộc timesheet domain). | Đủ cho UI prototype demo flow assign + confirm + cancel. |

**Out of scope v1 (defer):**
- Hiring Center list (group by Vị trí)
- Demand Calendar (`/hiring-center/positions/[id]`)
- Mobile responsive ≤ 375px (desktop-first)
- Bulk multi-date assignment
- Conflict detection UI
- Shortcut tạo HR từ Demand Calendar
- Per-day headcount override
- Worker check-in / no-show tracking

**Mock data cần chuẩn bị:**
- 1 customer
- 1 HR ngắn (≤ 7 ngày) — test fit-width mode
- 1 HR dài (1 tháng+) — test scroll + nav mode
- Lịch tuần có gap (ví dụ Mon/Wed/Fri) — test toggle "Ẩn ngày không tuyển"
- Mỗi ngày: 2–5 `HiringAssignment` với mix status (assigned, confirmed, cancelled)

---

## 1. Mô hình thực tế: 1 Vị trí ↔ N Hiring Requests

### 1.1 Tình huống business

1 **Vị trí** (ví dụ "CTV kho ca đêm" của khách hàng ABC) có thể có nhiều HR chạy song song, mỗi HR ứng với một "đơn đặt hàng" tách biệt:

| HR | Mục đích | Số lượng | Thời lượng | Lead time | Đơn giá |
|---|---|---|---|---|---|
| HR-A | Baseline ổn định | 20 CTV | cả năm | đã ổn định | ₫55k/h |
| HR-B | Tăng cường sự kiện | +10 CTV | 1 tuần | planned trước 30 ngày | ₫65k/h |
| HR-C | Điều chỉnh kế hoạch | +5 CTV | event | trước 2 ngày | ₫80k/h |
| HR-D | Spike khi đơn hàng tăng đột biến | +5 CTV | 6 ngày | đã trong event | ₫90k/h |

**Lý do tách HR riêng (không gộp vào 1):**
- **SLA khác nhau:** càng sát ngày càng khó tuyển → giá cao hơn, deadline ngặt hơn.
- **Giá khác nhau:** snapshot pricing tại thời điểm tạo HR (xem `hiring-requests.md` §Pricing snapshot). Không thể trộn giá vào 1 đơn duy nhất.
- **Owner khác nhau:** mỗi HR có recruiter riêng, audit trail riêng.
- **Approval khác nhau:** thưởng adhoc, headcount change có thể cần duyệt riêng từng HR.

**Hệ quả:** trên 1 ngày cụ thể của 1 Vị trí, demand thực tế = tổng `headcount` của các HR đang active trong ngày đó.

### 1.2 Hai góc nhìn cần phục vụ

| Góc nhìn | Audience | Mục đích |
|---|---|---|
| **HR-centric** | Recruiter, sales, account manager | Theo dõi từng đơn hàng: SLA, candidates, deadline, giá |
| **Position+day-centric** | Ops, dispatcher, customer success | Tổng hợp demand thực tế: "đêm nay cần bao nhiêu CTV ở kho đêm ABC" |

Không thể chọn 1 bỏ 1 — cả hai đều có audience thực tế. Kiến trúc cần cung cấp cả hai.

### 1.3 Phạm vi phiên hiện tại: Demand-side first

Toàn bộ hệ thống có 2 trục lớn cần quản lý:

| Trục | Bản chất | Entity gốc | Câu hỏi điển hình |
|---|---|---|---|
| **Demand** | Khách hàng cần gì | Hiring Request | "Đơn này còn thiếu mấy người? Deadline khi nào?" |
| **Supply** | CTV/Worker đang làm gì | Worker | "CTV này tuần tới làm những ca nào? Ai đang rảnh thứ 7?" |

**Quyết định:** Doc này (và sprint hiện tại) **chỉ làm phần Demand**. Cụ thể là tab/menu "Y/c tuyển dụng" trong app shell. Supply-side (Worker schedule, availability, conflict detection) **defer** — sẽ thiết kế riêng sau khi Demand stable.

**Hệ quả thiết kế:**
- 3 surfaces trong §2 (Hiring Center / Demand Calendar / HR Detail) đều thuộc Demand.
- Candidate panel ở HR Detail chỉ show worker từ góc nhìn "đang fill cho HR này", không show full worker schedule (cross-HR availability).
- Khi cần check conflict (CTV đã được assigned ca khác cùng giờ), trước mắt làm validation đơn giản ở backend; UI conflict-resolution để Supply-side phase 2.
- Chưa quyết gộp 2 trục về 1 surface duy nhất hay tách 2 nav riêng — sẽ revisit sau khi build Supply-side.

---

## 2. Kiến trúc surfaces (3 routes)

### 2.1 `/hiring-center` — HR-centric list (default)

Mặc định mở khi user vào Hiring Center. Đây là view chính của recruiter/sales.

**Layout:** list HRs, group-by mặc định = `Vị trí + Khách hàng`.

```
Hiring Center                            [+ Tạo Y/c tuyển dụng]
[Khách hàng ▾] [Vị trí ▾] [Trạng thái ▾] [Khoảng ngày ▾]  🔍 Tìm

▼ CTV kho ca đêm · ABC Corp           Tổng đang mở: 40 người · 3 HRs
  ├─ HR-2401 · Baseline cả năm    20/20 ✓   ₫55k/h   ổn định
  ├─ HR-2402 · Event Tết           8/10     ₫65k/h   planned · còn 7d
  └─ HR-2403 · Spike urgent        2/5  ⚠️  ₫80k/h   urgent · còn 2d

▶ CTV bán hàng cuối tuần · XYZ Ltd     12/15
```

**Group options:** Vị trí + Khách hàng (default) · Khách hàng · Trạng thái · Không group.

**Row click:** chuyển sang `/hiring-requests/[id]` (HR detail).

**Group header click:** mở dropdown — "Xem demand theo ngày" → `/hiring-center/positions/[positionId]` (Demand Calendar).

**Filter customer:** dropdown lấy từ `resources/data/customers.json`.

### 2.2 `/hiring-center/positions/[id]` — Demand Calendar

View tổng hợp theo Vị trí. Hiển thị demand thực tế từng ngày = tổng nhu cầu các HR active.

```
← Hiring Center · CTV kho ca đêm · ABC Corp                [+ Tạo HR mới]

         Mon 26   Tue 27   Wed 28   Thu 29   Fri 30
Total    20/20    28/30    33/40 ⚠️ 40/40    25/25
         ██████   ██████░  ████░░░  ██████   ██████
─────────────────────────────────────────────────────
HR-2401   20/20    20/20    20/20    20/20    20/20    Baseline
HR-2402    —        8/10     8/10    10/10     5/5     Event Tết
HR-2403    —        —        5/5      5/5      —       Spike
HR-2404    —        —        0/5      5/5      —       Demand+
```

- Mỗi cột = 1 ngày (cùng adaptive mode như date strip — §3.2)
- Hàng `Total` = sum demand + sum filled across HRs trong ngày đó
- Mỗi row tiếp theo = 1 HR contributor + label ngắn
- `—` = HR không cover ngày đó
- Cell click trên row HR → drill xuống HR detail tab "Lịch & Ứng viên", chọn sẵn ngày đó
- Cell click trên row `Total` → modal/drawer liệt kê tất cả candidates được assigned ngày đó qua tất cả HRs

**Không cho assign candidate trực tiếp ở view này** — assignment luôn thuộc về 1 HR cụ thể (giá, SLA gắn với HR đó).

### 2.3 `/hiring-requests/[id]` — HR Detail (scope: 1 HR)

Detail page hiện tại (giữ nguyên shell từ `hiring_request.md`). Thêm tab mới **"Lịch & Ứng viên"** thay thế hoặc chen vào tab "Ứng viên" hiện tại (chưa quyết — xem §6 câu 2).

**Quan trọng:** date strip ở tab này **chỉ scope HR này**, không trộn data từ HR khác cùng Vị trí. Lý do: 1 HR là 1 contract độc lập, recruiter của HR-2403 không quan tâm CTV đã fill cho HR-2401.

Aggregated view ở §2.2 chính là chỗ trộn data — không phải ở detail.

---

## 3. Data model — `HiringAssignment` (quyết định Q1)

### 3.1 Tại sao cần entity mới

Model hiện tại trong [hiring-requests.md](../../apps/staffing-saas/docs/hiring-requests.md):

```ts
interface HiringCandidate {
  id: string;
  workerId?: string;
  workerName: string;
  status: CandidateStatus;     // shortlisted | interviewing | assigned | rejected | withdrawn
  matchScore: number;
  ...
}
```

`HiringCandidate` chỉ biết "ứng viên A có status assigned cho HR-2401" — không biết **ngày nào** trong khoảng `[startDate, endDate]` của HR-2401 mà A sẽ làm. Khi 1 HR có range nhiều ngày, hoặc khi A cover 1 phần range:

- Không trả lời được "Wed 28/5 có bao nhiêu người đã chốt?"
- Không biết A có conflict với HR khác cùng ngày không
- Không track được no-show / check-in từng ngày
- Không snapshot được giá tại thời điểm assign cho từng ngày (giá có thể đổi giữa range nếu HR điều chỉnh)

**Hệ quả:** introduce `HiringAssignment` — bản ghi commit per (HR, candidate, date).

### 3.2 Shape đề xuất

```ts
type AssignmentStatus =
  | "assigned"    // CTV đã được gán, chưa confirm
  | "confirmed"   // CTV xác nhận sẽ làm
  | "checked-in"  // CTV đến chỗ làm (timesheet open)
  | "no-show"     // CTV không đến (terminal)
  | "cancelled";  // huỷ trước ngày (terminal)

interface HiringAssignment {
  id: string;                    // "ha-2401-001"
  hiringRequestId: string;       // FK → HiringRequest.id (single source of contract)
  candidateId: string;           // FK → HiringCandidate.id (funnel record)
  workerId: string;              // FK → Worker (resolved khi confirmed)
  date: string;                  // "DD/MM/YYYY" — ngày làm việc cụ thể
  shiftDateId: string | null;    // FK → shift_dates row (nếu có bảng riêng)
  status: AssignmentStatus;
  payRateSnapshot: string;       // snapshot từ HR.payRate tại thời điểm assign
  bonusSnapshot: number | null;  // snapshot bonus nếu HR có adhoc bonus approved
  createdAt: string;
  createdBy: string;             // userId
  note: string | null;
}
```

### 3.3 Quan hệ với `HiringCandidate`

```
HiringRequest (1) ──< (N) HiringCandidate (1) ──< (N) HiringAssignment
                                ↑                          ↓
                       funnel state per HR        commit state per day
```

**Phân vai:**
- `HiringCandidate` = bản ghi pipeline tuyển dụng. Trạng thái: `shortlisted → interviewing → assigned | rejected | withdrawn`. Tồn tại từ lúc ứng viên vào funnel.
- `HiringAssignment` = bản ghi commit ngày làm. Tạo ra khi `HiringCandidate.status → "assigned"`, đồng thời chọn các ngày cụ thể. Một candidate có thể có N assignment (N ngày khác nhau trong cùng HR).
- Khi candidate bị `withdrawn` sau khi đã assigned: huỷ các assignment chưa diễn ra (status → `cancelled`), giữ assignment đã `checked-in` để timesheet/billing.

### 3.4 Aggregation rules (giải quyết Q3)

`filled` không còn là 1 con số duy nhất trên `HiringRequest` — phải compute theo scope:

| Scope | Công thức |
|---|---|
| **`filled` per ngày của 1 HR** | `count(HiringAssignment WHERE hrId=X AND date=D AND status IN [assigned, confirmed, checked-in])` |
| **`filled` tổng của 1 HR** (hiển thị ở list, header) | `count(DISTINCT workerId WHERE hrId=X AND status IN [assigned, confirmed, checked-in])` — số CTV unique đã commit ít nhất 1 ngày |
| **`slotFilled` của 1 HR** | `count(HiringAssignment WHERE hrId=X AND status IN [assigned, confirmed, checked-in])` — tổng slot ca đã commit |
| **`filled` per ngày của Vị trí** (Demand Calendar row Total) | `Σ filled-per-day across all HRs có shift ngày D thuộc Vị trí P` |

`no-show` và `cancelled` không count vào `filled` (vì là terminal "không có người"). Nhưng vẫn lưu để audit + thay người.

### 3.5 Sourcing demand series (giải quyết Q8 một phần)

Cần `{ date, headcount, filled }[]` cho date strip. Option:

**Option A — Compute từ `HiringRequest` + `HiringAssignment` runtime:**
- `dates` = enumerate `[startDate, endDate]` ∩ `workWeekdays`
- `headcount` per ngày = `HR.headcount` (giả định flat — không đổi giữa range)
- `filled` per ngày = aggregate từ `HiringAssignment` (§3.4)

**Option B — Bảng riêng `shift_dates`:**
- Mỗi row = `{ hrId, date, headcountForDay, ... }`
- Cho phép override `headcount` theo từng ngày (ví dụ event days cần nhiều hơn)

**Khuyến nghị:** start với Option A (simpler), nâng cấp Option B khi có yêu cầu "ngày X cần 8 người, ngày Y cần 12" trong cùng HR. Hiện tại business chưa rõ có cần per-day override không — defer.

### 3.6 Implication cho UI

- **Candidate panel ngày D (HR detail):** list `HiringAssignment WHERE hrId=current AND date=D`. Mỗi row = 1 assignment, hiển thị worker + status assignment (không phải status funnel).
- **`+ Thêm ứng viên` flow:** chọn worker → tạo `HiringCandidate` nếu chưa có → chọn ngày(s) → tạo `HiringAssignment` per ngày.
- **Bulk multi-date assign (Q6):** select N ngày → 1 worker → tạo N assignment cùng lúc. UI đáng làm phase 2.
- **Demand Calendar Total cell click:** modal show toàn bộ assignment ngày đó qua các HRs.

---

## 4. Thiết kế date strip (cho HR Detail, tab "Lịch & Ứng viên")

### 4.1 Cấu trúc cell

```
┌─────┐
│ Mon │   thứ
│  26 │   ngày trong tháng
│─────│
│ 3/5 │   đã tuyển / cần
│████░│   progress bar
│ 60% │   tỉ lệ fill
└─────┘
```

**Màu theo fill rate:**
- 100% → success
- 1–99% → warning
- 0% → error / muted

**Cell selected:** border `border-border-brand` + mũi tên chỉ xuống candidate panel.

### 4.2 Adaptive mode — job ngắn vs dài

Quyết định mode dựa trên **số ngày có ca** (không phải `endDate − startDate`):

| Độ dài job | Mode |
|---|---|
| ≤ 14 ngày có ca | Fit-width, không scroll, không cần nav tháng/tuần |
| > 14 ngày có ca | Scroll ngang + nav `‹ ›` theo tuần/tháng + month picker |

`dates.length` = số bản ghi `shift_date` riêng biệt của HR đó.

### 4.3 Ngày không tuyển trong khoảng

**Quyết định: default hiện, có toggle ẩn/hiện.**

Vì lịch trong tuần có thể chỉ chạy 1 số thứ (ví dụ Mon/Wed/Fri), 1 số ngày trong `[startDate, endDate]` không có ca.

- **Default = hiện:** giữ context calendar — user thấy gap trong lịch mà không mất orientation.
- **Toggle:** "Ẩn ngày không tuyển", persist vào `localStorage` (hoặc URL `?showEmpty=false`).
- **Cách hiển thị khi show:**
  - Background `bg-bg-secondary`
  - Text `text-fg-disabled`
  - Em-dash `—` thay cho progress bar / tỉ lệ
  - Không focusable, không clickable
  - Tooltip hover: "Không có ca tuyển ngày này"
- **Khi hide:** strip thu lại chỉ còn ngày có ca. Với job dài, chèn week separator (`W21`, `W22`, …) giữa các tuần để user vẫn cảm nhận được gap.

**Bảng so sánh trade-off đã cân nhắc:**

|  | Hiện (default) | Ẩn |
|---|---|---|
| Calendar context | ✓ giữ | ✗ mất |
| Mật độ strip | Thưa hơn | Dày hơn |
| Lịch sparse (chỉ cuối tuần) | Nhiều ô chết | Gọn |
| Job cả năm | Scroll nhiều | Manageable |

Toggle giải quyết trade-off — user tự chọn mode phù hợp.

### 4.4 Navigation cho job dài

```
‹  Tháng 5 – 6 2025  ›                    [Ẩn ngày không tuyển]
```

- `‹ ›` cuộn strip 1 tuần (giữ Alt-click để nhảy 1 tháng).
- Label tháng clickable → mở month picker cho job cả năm.
- Toggle pill ở cluster phải.

---

## 5. Candidate panel (dưới date strip)

Hiển thị **assignments** của ngày đang chọn (không phải candidates — vì candidates là pipeline cross-day, assignment mới là cam kết per-day).

```
Wed 28 May · Cần 3 · Đã chốt 0 · ⚠️ Thiếu 3

[Nguyễn A]  Đã gán      [Xác nhận lại] [Huỷ assignment]
[Trần B]    Đã xác nhận                [Huỷ assignment]
[+ Thêm CTV cho ngày này]
```

- Header line: cần / đã chốt (count assignments status ∈ [assigned, confirmed, checked-in]) / thiếu.
- Mỗi row = 1 `HiringAssignment`:
  - Worker name + avatar (link tới profile)
  - Assignment status badge: `Đã gán` / `Đã xác nhận` / `Đã check-in` / `Không đến` / `Đã huỷ`
  - Inline actions theo state machine assignment (§3.2): confirm / cancel / mark no-show / reopen
  - Note (nếu có)
- Empty state CTA: `+ Thêm CTV cho ngày này` mở flow:
  1. Pick existing `HiringCandidate` (đã trong funnel) hoặc invite worker mới
  2. Pick ngày — có thể multi-select (bulk, Q6 phase 2)
  3. Confirm → tạo `HiringAssignment` per ngày
- Panel sticky/swap content khi đổi ngày — date strip giữ mounted.

**Phân biệt với tab "Ứng viên" cũ:**
- Tab "Ứng viên" cũ = funnel view (HiringCandidate level): xem ai đã apply, ai đang interview, ai bị reject. Không gắn ngày cụ thể.
- Tab "Lịch & Ứng viên" mới = assignment view (HiringAssignment level): xem ngày X có ai sẽ làm. Gắn ngày cụ thể.

Cả hai cùng tồn tại có giá trị — quyết định cuối ở §7 câu 1.

---

## 6. Tóm tắt phân vai 3 surfaces

| Route | Scope | Audience | Aggregation? |
|---|---|---|---|
| `/hiring-center` | All HRs, group by Vị trí | Recruiter, sales | Không — list HRs |
| `/hiring-center/positions/[id]` | 1 Vị trí, all HRs | Ops, dispatcher | **Có** — sum demand + filled theo ngày |
| `/hiring-requests/[id]` | 1 HR | Owner recruiter | Không — chỉ HR đó |

**Nguyên tắc bất biến:** assignment (CTV nhận ca) **luôn thuộc về 1 HR cụ thể**. Aggregation chỉ là view, không phải data merge. Khi cần ghi/sửa, luôn xuống level HR.

---

## 7. Câu hỏi mở (phiên sau)

**Đã quyết phiên 2026-05-24:**
- ~~Q1 Data model~~ → §3, dùng `HiringAssignment`
- ~~Q2 Scope Demand vs Supply~~ → §1.3, Demand-first
- ~~Q3 Aggregation `filled`~~ → §3.4
- ~~Q6 Per-day headcount~~ → §0, flat cho v1
- ~~Q7 Position entity~~ → §0, alias `customerShift.id` cho v1
- ~~Q1 Tab placement~~ → §0, giữ 2 tab "Pipeline tuyển" + "Lịch làm việc"
- ~~Q10 Assignment lifecycle (simplified)~~ → §0, `assigned → confirmed → cancelled`

**Còn lại (defer, không block v1):**

1. **Mobile 375px:** date strip ngang trên màn 375px — collapse thành single-date pager? swipe giữa các ngày?
2. **Year-round jobs:** month picker có cần affordance "Hôm nay" để jump nhanh?
3. **Bulk actions:** assign 1 CTV cho N ngày 1 lần — multi-select date trong strip?
4. **Edge case màu:** ngày `headcount=0` (slot bị xoá giữa range) thì màu gì?
5. **Per-day headcount override (v2):** khi cần override sẽ revisit Option B `shift_dates`.
6. **Position entity (v2):** revisit khi build Demand Calendar.
7. **Tạo HR từ Demand Calendar:** shortcut UX flow.
8. **Conflict detection:** worker double-booked — Supply-side, defer phase 2.
9. **Full assignment lifecycle:** `checked-in`, `no-show` — thuộc timesheet domain, design riêng.
10. **Tab "Pipeline tuyển" có cần rework không** sau khi tách assignment? Hay giữ nguyên funnel view hiện tại.

---

## 8. UI references — tái sử dụng từ "Lịch làm việc" (shifts)

Trang `/shifts/calendar` ([apps/staffing-saas/app/components/shifts/](../../apps/staffing-saas/app/components/shifts/)) đã giải quyết nhiều bài toán tương tự (calendar/table toggle, week/day nav, filter sidebar). Tận dụng pattern + component có sẵn, không reinvent.

### 8.1 Pattern header 3 tầng (áp dụng cho Demand Calendar)

Cấu trúc trong [ShiftsCalendarPage.tsx](../../apps/staffing-saas/app/components/shifts/ShiftsCalendarPage.tsx):

```
┌──────────────────────────────────────────────────────────────────┐
│ Level 1: [Calendar] [Bảng]            ← pill tabs (display mode) │
│ Level 2: [Tuần] [Ngày] [Theo KH]      ← underline tabs (subview) │
│ Level 3: ‹ 26/5 – 30/5 ›  [Khách hàng ▾]  ← date nav + scope     │
├──────────────────────────────────────────────────────────────────┤
│ FilterChips: [Trạng thái: Đang tuyển ×] [Vùng: HCM ×]            │
├──────────────────────────────────────────────────────────────────┤
│ SummaryLine: 28 ca trong tuần · lọc từ 35 ca                     │
├─────────────────────────────────────────────────┬────────────────┤
│ Main content                                    │ FilterSidebar  │
│                                                 │ (collapsible)  │
└─────────────────────────────────────────────────┴────────────────┘
```

Áp dụng cho Demand Calendar:
- **Level 1:** [Calendar] [Bảng] — calendar = matrix Total/HR, bảng = flat table
- **Level 2:** [Tuần] [Tháng] — đổi grain hiển thị
- **Level 3:** `WeekNavigator` hoặc `MonthNavigator` + (optional) position-scope picker nếu cần switch nhanh

### 8.2 Components tái sử dụng được

| Component | File | Dùng ở đâu |
|---|---|---|
| `WeekNavigator` | [calendar/WeekNavigator.tsx](../../apps/staffing-saas/app/components/shifts/calendar/WeekNavigator.tsx) | Date strip HR Detail (long jobs), Demand Calendar |
| `DayNavigator` | [calendar/DayNavigator.tsx](../../apps/staffing-saas/app/components/shifts/calendar/DayNavigator.tsx) | Mobile single-date pager cho HR Detail |
| `FilterSidebar` pattern | [filter/FilterSidebar.tsx](../../apps/staffing-saas/app/components/shifts/filter/FilterSidebar.tsx) | Hiring Center list (lọc khách hàng, vị trí, trạng thái) |
| `FilterChips` | [filter/FilterChips.tsx](../../apps/staffing-saas/app/components/shifts/filter/FilterChips.tsx) | Active filters bar above list |
| SummaryLine pattern | inline trong ShiftsCalendarPage | "X HR đang mở · lọc từ Y" |
| `EmptyState` | `@mvp-ui/ui` | Không có HR / chưa chọn vị trí |
| `CustomerScopePicker` | [calendar/CustomerScopePicker.tsx](../../apps/staffing-saas/app/components/shifts/calendar/CustomerScopePicker.tsx) | Filter khách hàng (cả Hiring Center + Demand Calendar) |
| localStorage persistence pattern | `*_STORAGE_KEY` constants trong ShiftsCalendarPage | Toggle "Ẩn ngày không tuyển", subview, group-by |

### 8.3 Pattern cần invent mới (không có trong shifts)

| Component mới | Lý do |
|---|---|
| **Compact date strip cell** với progress bar | WeekView của shifts là grid time-bucket (sáng/chiều/tối/đêm), không phù hợp. Date strip cần ô gọn ngang với fill ratio. |
| **Demand matrix** (rows = HRs, cols = days, có Total row) | Shifts không có khái niệm "nhiều HR đóng góp vào 1 ngày" → cần component mới. |
| **Group-by-position list** với expand/collapse | Shifts list không group hierarchical theo Vị trí. |

### 8.4 Inconsistency cần resolve

- **Tab variant:** shifts dùng `Tabs variant="pill"` (Level 1) + `variant="underline"` (Level 2). HR Detail hiện đang dùng pattern nào? → check trước khi thêm tab "Lịch & Ứng viên" để consistent.
- **Calendar vs Bảng terminology:** shifts dùng "Calendar / Bảng". Hiring Center / Demand Calendar dùng "Calendar / Bảng" hay "Theo nhu cầu / Theo HR"? → thống nhất.
- **Date format:** shifts dùng `formatDateRangeVi(weekStart, weekEnd)` — reuse cho date strip header.

---

## 9. Tham chiếu

- Spec HR hiện tại: [apps/staffing-saas/docs/hiring-requests.md](../../apps/staffing-saas/docs/hiring-requests.md)
- Page shell precedent: [hiring_request.md](./hiring_request.md)
- Customer shift (Vị trí): [customer_shift.md](./customer_shift.md)
- Shifts calendar (UI reference): [apps/staffing-saas/app/components/shifts/](../../apps/staffing-saas/app/components/shifts/)
- Component index (đọc trước khi build): [packages/skill/components.md](../../packages/skill/components.md)
