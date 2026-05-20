# Hiring Request & Tin đăng — Domain Split

Doc này mô tả cách tách `HiringRequest` (customer-facing đơn đặt) và `JobPost` (staffing-internal tin tuyển dụng) sau khi đã chuyển toàn bộ cấu hình ổn định (vị trí, địa điểm, lịch, giá, chính sách) sang `CustomerShift` (xem [customer_shift.md](./customer_shift.md)).

Locale: Vietnamese. Currency: VND. Date format: `DD/MM/YYYY`. Audience của SaaS này là **Staffing Company** — customer không có app/portal riêng trong scope demo (xem §1).

---

## 1. Hai góc nhìn, hai domain

### 1.1 Góc nhìn Customer (khách hàng dùng dịch vụ staffing)

Customer chỉ quan tâm:
- Đã thoả thuận shift nào (giá + chính sách đính kèm).
- Khoảng ngày cần tuyển, số lượng.
- Tiến độ staffing fill đến đâu.

Customer **không** quan tâm:
- Staffing company đăng tin ở đâu, tiêu đề gì, public hay private.
- Staffing tự bonus thêm bao nhiêu để hấp dẫn CTV.
- Staffing trả CTV theo chu kỳ nào.

**Lưu ý phạm vi demo:** customer KHÔNG tự tạo `HiringRequest` trong SaaS này. Staffing nhập hộ sau khi trao đổi qua channel ngoài (Zalo, email, gọi). Customer portal là 1 hệ thống tách riêng, ngoài scope. Vì vậy UI hiện tại cũng dành cho góc nhìn staffing — nhưng `HiringRequest` entity vẫn được thiết kế "customer-facing" (sạch field, ai cũng đọc được, không có internal noise).

### 1.2 Góc nhìn Staffing Company

Staffing nhận `HiringRequest`, phải fulfill bằng cách:
- Đăng `JobPost` (tin tuyển dụng) — có thể nhiều tin cho 1 HR.
- Tự chi `adhocBonus` nếu cần đẩy nhanh.
- Quyết `payCycle`, `visibility`, content marketing trên tin.
- Theo dõi CTV ứng tuyển → chốt CTV → CTV đi làm thật.

Đây là phần "vận hành nội bộ", customer không cần thấy.

---

## 2. Entity model

```
Customer (1) ──┐
               ├─→ HiringRequest (N) ──→ JobPost (M, ≥0) ──→ Application (K) ──→ Worker (CTV)
CustomerShift ─┘                                                                       │
                                                                                       │
                                  ShiftInstance (per-day slot) ←── ShiftAssignment ────┘
```

### 2.1 `HiringRequest` (Yêu cầu tuyển dụng) — customer-facing

| Field | Type | Note |
|---|---|---|
| `id` | string | prefix `HR-` (e.g. `HR-2451`) |
| `customerId` | FK | sở hữu HR |
| `shiftId` | FK → `CustomerShift` | ca làm việc đã chốt |
| `startDate` | date | ngày đầu tuyển (CTV đầu tiên đi làm) |
| `endDate` | date | ngày cuối |
| `headcount` | int | số lượng cam kết |
| `customerNote` | string \| null | brief từ khách (yêu cầu đặc biệt) |
| `status` | enum | `pending` / `accepted` / `fulfilling` / `completed` / `cancelled` |
| `parentRequestId` | FK → `HiringRequest` \| null | nếu là supplement HR (xem §4) |
| `priceSnapshot` | object \| null | snapshot giá + chính sách tại thời điểm tạo. *(Optional trong demo; production cần)* |
| `createdAt`, `acceptedAt`, `completedAt` | timestamps | |
| `targetDeadline` | date \| null | hạn cuối customer mong đợi fill xong. Default = `startDate - 1` |

**Status pipeline:**
- `pending` — vừa tạo, chờ staffing nhận
- `accepted` — staffing đã accept, cam kết fulfill
- `fulfilling` — đã có ít nhất 1 JobPost published và đang nhận application
- `completed` — đã fill đủ (hoặc qua `endDate` mà không hủy)
- `cancelled` — huỷ trước hoặc trong khi đang fulfilling

### 2.2 `JobPost` (Tin đăng) — staffing-internal

| Field | Type | Note |
|---|---|---|
| `id` | string | prefix `JP-` (e.g. `JP-8821`) |
| `hiringRequestId` | FK → HR | tin này thuộc HR nào |
| `title` | string | tiêu đề marketing, public-facing |
| `displayedPay` | object | `{ amount: number; unit: 'shift' \| 'hour' }` — thù lao hiển thị trên tin (có thể nhỉnh hơn pricing thực) |
| `adhocBonus` | object \| null | `{ amount, unit, reason, approvalStatus, approvedBy?, approvedAt? }` — thưởng thêm do staffing tự chi |
| `payCycle` | enum | `Tiền ngay` / `Hàng tháng` / `2 lần/tháng` / ... |
| `visibility` | enum | `public` / `unlisted` / `private` |
| `descriptionOverride` | string \| null | tinh chỉnh copy mô tả cho tin này |
| `requirementsOverride` | string \| null | tinh chỉnh yêu cầu |
| `benefitsOverride` | string \| null | tinh chỉnh quyền lợi |
| `status` | enum | `draft` / `published` / `paused` / `closed` |
| `publishedAt`, `pausedAt`, `closedAt` | timestamps | |
| `applicationCount` | int (derived) | số application thuộc tin này |

**Tại sao 1:N (HR → JobPost):**
- Re-post sau khi tin cũ hết hạn / bị paused / bị cảnh báo bot/abuse.
- A/B test 2 phiên bản tiêu đề cùng lúc.
- Đăng song song public + private invite (tin VIP gửi network) cho cùng 1 HR.
- Multi-channel (Facebook campaign + in-app feed) phân tách metric.

**Lifecycle độc lập với HR:**
- HR có thể `accepted` mà chưa có JobPost nào → staffing chưa kịp đăng.
- JobPost có thể `closed` mà HR vẫn `fulfilling` (vì còn JobPost khác đang nhận).
- HR `cancelled` → cascade close mọi JobPost (force `closed`).

### 2.3 `Application` (CTV ứng tuyển) — gắn vào JobPost

| Field | Type | Note |
|---|---|---|
| `id` | string | |
| `jobPostId` | FK → JobPost | CTV apply vào tin cụ thể nào |
| `hiringRequestId` | FK → HR (denormalized) | copy từ JobPost.hiringRequestId, để query nhanh fulfill stats |
| `workerId` | FK → Worker | CTV |
| `status` | enum | `applied` / `shortlisted` / `accepted` / `rejected` / `cancelled_by_worker` |
| `appliedAt`, `acceptedAt` | timestamps | |

**Lý do gắn JobPost (không phải HR thẳng):**
- Phân tích kênh: tin nào, channel nào hút CTV tốt hơn.
- Một CTV có thể apply cùng 1 HR qua 2 tin khác nhau (đăng lại) — phân biệt thuộc tin nào.
- Cascade fulfill về HR qua `hiringRequestId` denormalized (nhanh, không cần JOIN).

### 2.4 `ShiftAssignment` (CTV đi làm ngày cụ thể) — track per-slot

HR kéo dài N ngày, mỗi ngày cần `headcount` CTV. 1 CTV được `accepted` không có nghĩa CTV đó đi đủ N ngày. Vì vậy cần entity riêng cho per-day assignment:

| Field | Type | Note |
|---|---|---|
| `id` | string | |
| `hiringRequestId` | FK → HR | |
| `workerId` | FK → Worker | |
| `date` | date | ngày cụ thể trong `[HR.startDate, HR.endDate]` |
| `status` | enum | `booked` / `checked_in` / `completed` / `no_show` / `late` / `cancelled` |
| `checkInAt`, `checkOutAt` | timestamp \| null | |
| `paidHours` | number \| null | sau khi áp dụng rounding + break + OT từ shift policy |

1 `Application accepted` → tạo N `ShiftAssignment` records (1 per working day) cho CTV đó. Số ngày tính theo `CustomerShift.weekdays` overlap với `[HR.startDate, HR.endDate]`.

---

## 3. Fulfillment metric — dual track

User chọn **cả 2 metric song song**. Hiển thị trên HR detail header + list view:

### 3.1 `committedWorkers` — số CTV cam kết đi làm

= COUNT(`Application` WHERE `hiringRequestId = HR.id` AND `status = 'accepted'`)

Đây là số người đã "nhận HR". Target = `HR.headcount`.

### 3.2 `filledSlots` — số slot thực tế đã đi làm

Tổng slot = `headcount × workingDaysInRange` (working days dựa trên `CustomerShift.weekdays`).
Filled slot = COUNT(`ShiftAssignment` WHERE `hiringRequestId = HR.id` AND `status IN ('checked_in', 'completed')`).

### 3.3 UI hiển thị

```
HR-2451 · CTV kho ECDC tuần 21/05
─────────────────────────────────
CTV đã nhận: 8 / 12 người    [66%]   <-- committedWorkers
Slot đã đi: 36 / 60 slot      [60%]   <-- filledSlots
                              5 ngày × 12 = 60 slot
─────────────────────────────────
Còn 3 ngày · Hạn fill: 19/05/2026
```

**Trên HR list (table cột "Tiến độ"):**
- Cell hiển thị 2 dòng nhỏ: `8/12 CTV · 36/60 slot`.
- Progress bar 2 thanh chồng nhau hoặc 1 thanh `committedWorkers` (primary) + sub-text `filledSlots`.

### 3.4 Trạng thái suy ra

- `committedWorkers ≥ headcount` ⇒ HR đã "đủ người cam kết" (chưa chắc đã đi đủ).
- `filledSlots = totalSlots` ⇒ HR `completed` thật sự.
- Nếu `today > endDate` và còn slot trống ⇒ HR `completed` với fill rate < 100% (tính vào KPI staffing).

---

## 4. Xử lý thay đổi HR — hybrid

User chọn **hybrid: nhỏ inline, lớn split**. Quy ước threshold dưới đây cần stakeholder chốt — đang đề xuất:

### 4.1 Edit in-place (cùng HR ID, log history)

Cho phép khi HR `pending` hoặc `accepted` chưa có application nào, mọi field tự do edit.

Khi HR đã `fulfilling` (có ít nhất 1 application), chỉ cho edit in-place các thay đổi nhỏ:

| Thay đổi | Ngưỡng in-place | Vượt ngưỡng ⇒ |
|---|---|---|
| Tăng `headcount` | `delta ≤ 20%` của headcount gốc, **và** `today + 2 days < endDate` | Tạo HR-supplement |
| Giảm `headcount` | luôn cho in-place (giảm xuống ≥ committedWorkers) | — |
| Đổi `endDate` lùi (kéo dài) | `delta ≤ 3 days` | Tạo HR mới với date range nối tiếp |
| Đổi `endDate` tiến (rút ngắn) | `endDate ≥ today + 1` và `endDate ≥ ngày cuối có assignment đã booked` | Block; phải huỷ HR và tạo lại |
| Đổi `startDate` | KHÔNG cho phép sau khi `accepted` | Tạo HR mới |
| Đổi `customerNote` | luôn cho | — |
| Đổi `shiftId` | KHÔNG cho phép | Huỷ + tạo HR mới |

Mọi edit log vào audit table: `who`, `when`, `field`, `oldValue`, `newValue`.

### 4.2 Tạo HR-supplement (split)

Khi vượt ngưỡng:
- Tạo HR mới với `parentRequestId = HR_goc.id`.
- HR mới có SLA riêng, fulfillment counter riêng.
- HR gốc giữ nguyên (cam kết với customer không thay đổi cho lượng cũ).
- UI trên HR detail hiển thị "HR liên quan" section: list HR-supplement.

Ví dụ:
- HR-2451: headcount 100, startDate 21/05, endDate 27/05 → `accepted`, đang fulfill được 60 CTV.
- Customer hôm 22/05 báo cần thêm 50 CTV nữa cho cùng range.
- delta 50 = 50% của 100 → vượt ngưỡng 20% → tạo `HR-2459` với `parentRequestId = HR-2451`, headcount = 50.
- Hai HR fulfill song song, mỗi HR có dashboard riêng.

### 4.3 UX — tự động đề xuất

Khi staffing/customer edit headcount và vượt ngưỡng, modal hiện ra:

```
Thay đổi này vượt 20% headcount gốc.
Đề xuất: Tạo HR bổ sung HR-XXXX kế thừa ca làm việc, ngày, giá từ HR gốc.
   - HR gốc HR-2451 giữ nguyên 100 CTV
   - HR mới HR-2459 cần 50 CTV thêm

[ Tạo HR bổ sung ]    [ Huỷ ]
```

---

## 5. Worker assignment chain

Khi staffing chốt 1 CTV cho HR-2451:

1. `Application` của CTV (gắn 1 trong các `JobPost` của HR-2451) chuyển `status = accepted`.
2. System auto-gen `ShiftAssignment` records: 1 record cho mỗi working day trong `[startDate, endDate]` (theo `CustomerShift.weekdays`).
3. CTV thấy danh sách ngày cần đi trong app của họ.
4. Hôm đi làm: CTV check-in tại địa điểm → `ShiftAssignment.status = checked_in`.
5. Sau ca: check-out + tính `paidHours` theo `CustomerShift` policy (rounding, break, OT).

CTV có thể chủ động huỷ 1 ngày cụ thể → `ShiftAssignment.status = cancelled` cho ngày đó, không ảnh hưởng các ngày khác. Staffing có thể tìm CTV thay → tạo `ShiftAssignment` mới cho CTV thay.

**Quan hệ multi-CTV/1 slot không tồn tại.** 1 `(hiringRequestId, workerId, date)` là unique. Mỗi CTV book ngày nào thì giữ slot ngày đó.

**Overbook?** Cho phép staffing book quá `headcount` (vd cần 12 mà book 15 vì sợ no-show) — nhưng cảnh báo warning. `committedWorkers` có thể vượt `headcount` (hiển thị `15/12 CTV` chấp nhận được trong UX).

---

## 6. UI tổ chức

### 6.1 Customer detail tab

Hiện tại có:
- Tab `Ca làm việc` (`CustomerShift`) — đã làm.
- Cần thêm tab `Yêu cầu tuyển dụng` — list HR của customer đó.

HR list cột:
- `id` (HR-xxxx)
- Tên ca (`shift.name`)
- Range (`DD/MM - DD/MM`)
- Headcount target
- `committedWorkers / headcount` (progress bar)
- `filledSlots / totalSlots` (compact)
- Status badge
- (action) Sửa / Xem chi tiết

HR detail (customer-facing view):
- Header: HR code + tên shift + status badge.
- Block "Yêu cầu khách hàng" — read-only summary: customer, shift snapshot, dates, headcount, customerNote.
- Block "Tiến độ" — dual metric + progress chart per day.
- Sub-tab "Tin tuyển dụng" — list JobPost (staffing-only, có thể ẩn cho customer role sau này).
- Sub-tab "CTV ứng tuyển" — list Application.
- Sub-tab "Phân ca" — list ShiftAssignment per day.
- Block "HR liên quan" — nếu có `parentRequestId` hoặc có HR khác có `parentRequestId = currentHR`.

### 6.2 Staffing global view

Sidebar route mới (cấp app):
- `/hiring-requests` — cross-customer HR board. Filter customer / shift / status / date range.
- `/job-posts` — cross-customer tin đăng board. Filter status / channel / customer / date.

Cấu trúc rất giống tab Customer detail nhưng không lock vào 1 customer.

### 6.3 JobPost detail

Form đăng tin (đã spec sẵn ở `hiring_request.md` Step 4 cũ — di chuyển nguyên xi sang JobPost):
- `title`, `displayedPay`, `visibility`, `adhocBonus`, `payCycle`.
- Override mô tả / yêu cầu / quyền lợi (per posting, không phải per HR — vì mỗi tin có thể marketing khác nhau).
- Live preview card.
- Action: `Save draft` / `Publish` / `Pause` / `Close`.

---

## 7. Wizard flow đề xuất

### 7.1 Tạo `HiringRequest` (1 step duy nhất)

Trang đơn giản, không stepper:

| Field | Control | Required |
|---|---|---|
| Customer (nếu staffing tạo hộ — luôn vậy trong demo) | Select | ✅ |
| Ca làm việc | Select (chỉ shift active của customer) | ✅ |
| Ngày bắt đầu | Date | ✅ |
| Ngày kết thúc | Date | ✅ (≥ startDate) |
| Số lượng | Number | ✅ (≥ 1) |
| Ghi chú khách hàng | Textarea | — |
| Hạn fill (tự auto = startDate - 1, override được) | Date | — |

Sau khi tạo: status `pending`. Staffing accept ngay (nếu staffing tạo hộ) hoặc để pending nếu cần review.

### 7.2 Tạo `JobPost` từ HR (1 step)

Trên HR detail, nút `+ Đăng tin mới`:

| Field | Control | Required |
|---|---|---|
| Tiêu đề | Input | ✅ |
| Thù lao hiển thị | Number + unit toggle (`/ca`, `/h`) | ✅ |
| Visibility | RadioGroup 3 options | ✅ |
| Chu kỳ thanh toán | Select | ✅ |
| Có thưởng thêm | Checkbox + sub-block (amount + reason + duyệt) | — |
| Override mô tả / yêu cầu / quyền lợi | Textarea (mỗi cái + checkbox `Chỉnh sửa`) | — |
| Preview card (live) | Right column | — |

Sau khi tạo: status `draft`. Action `Đăng tin` để publish → status `published` + cập nhật HR.status = `fulfilling`.

---

## 8. Migration từ `hiring_request.md` cũ

Spec `hiring_request.md` hiện tại có 4 step (BasicInfo / Schedule / Pay / Posting). Sau khi tách:

| Step cũ | Đi đâu |
|---|---|
| BasicInfo (position, location, description override) | Position + location → CustomerShift. Override description → JobPost. |
| Schedule (weekdays, time, dates, timekeeping, OT) | weekdays/time/timekeeping/OT → CustomerShift. dates → HR. |
| Pay (pricing config, adhoc bonus, payCycle) | pricing → CustomerShift. adhoc bonus + payCycle → JobPost. |
| Posting (title, displayedPay, visibility) | toàn bộ → JobPost. |

`hiring_request.md` sẽ trở thành spec mỏng: chỉ còn §7.1 + UI mô tả HR detail. Tin đăng tách hẳn sang `job_post.md` (cần tạo, hiện chưa có).

---

## 9. Câu hỏi còn mở

1. **Threshold edit in-place** ở §4.1 đang đề xuất 20% — cần chốt với ops team.
2. **`parentRequestId` chain depth**: HR-supplement có thể có HR-supplement của nó không? Đề xuất: cho phép, nhưng UI flat (1 cấp parent + N cấp sibling).
3. **HR `cancelled` lúc đang `fulfilling`**: CTV đã booked có được auto-bồi thường? Cần policy.
4. **JobPost cũ đã `closed` có thể "reopen" không?** Đề xuất: không — tạo JobPost mới (audit trail).
5. **Cross-HR worker assignment**: 1 CTV book đồng thời 2 HR khác nhau cùng ngày (đụng độ shift) — block cứng hay cảnh báo?
6. **Demo phạm vi**: build entity nào trước? Đề xuất ưu tiên `HiringRequest` (đã có sample) + đơn giản hoá wizard về §7.1 trước, JobPost làm sau.

---

## 10. Build order đề xuất

1. **Refactor HR data model** (`hiring-requests-data.ts`): bỏ field thuộc về Shift/JobPost, thêm `shiftId`, `committedWorkers`, `filledSlots`, `totalSlots`, `targetDeadline`, `parentRequestId`. Sample data tự generate fulfillment count.
2. **Đơn giản hoá HR create page** (`HiringRequestCreatePage`): từ 4 step xuống 1 form đơn giản (§7.1).
3. **HR detail page**: thêm dual-metric block + sub-tab `Tin tuyển dụng` (empty placeholder).
4. **Tạo `JobPost` entity + sample data**.
5. **Build `JobPostListPanel`** trong HR detail sub-tab.
6. **Build `JobPostCreate` / `JobPostEdit` page** (dùng lại UI Step 4 cũ).
7. **Build `Application` + `ShiftAssignment`** (sau, nếu cần demo fulfillment).
8. **Cập nhật `hiring_request.md`** thành phiên bản mỏng + tạo `job_post.md` riêng.

Mỗi bước verify ở `apps/staffing-saas` dev server, light + dark mode.
