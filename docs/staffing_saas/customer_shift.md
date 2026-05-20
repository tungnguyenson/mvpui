# Customer — Tab "Ca làm việc"

Tab mới trên `CustomerDetailPage` quản lý các **ca làm việc cố định** dưới góc nhìn khách hàng. Đây là entity tái sử dụng: 1 ca = 1 cấu hình (vị trí + địa điểm + lịch tuần + giá + chính sách) **không có ngày bắt đầu/kết thúc**. Ngày cụ thể chỉ chọn khi tạo `HiringRequest`.

Locale: Vietnamese. Currency: VND. Date format: `DD/MM/YYYY`. Time: `HH:mm`. Code prefix mẫu: `SC1234`.

---

## 1. Vị trí trong app

Thêm tab vào [CustomerDetailTabs.tsx](apps/staffing-saas/app/components/customers/detail/CustomerDetailTabs.tsx). Order đề xuất (chèn sau `Cấu hình giá`, trước `Cấu hình đối soát`):

| # | Tab id | Label |
|---|---|---|
| 1 | overview | Tổng quan |
| 2 | documents | Hợp đồng |
| 3 | locations | Địa điểm |
| 4 | positions | Công việc |
| 5 | pricing | Cấu hình giá |
| 6 | **shifts** | **Ca làm việc** *(mới)* |
| 7 | reconciliation | Cấu hình đối soát |
| 8 | users | Nhân viên |

Lý do đặt sau `pricing`: ca làm việc phụ thuộc `position`, `location`, `pricingConfig` — các tab nguồn nằm trước, đọc tuyến tính dễ hiểu.

URL: `/customers/[id]?tab=shifts` (list) · `/customers/[id]?tab=shifts&shift=new` (create) · `/customers/[id]?tab=shifts&shift=SC1234` (edit). Pattern khớp với `PositionsTab` hiện tại.

---

## 2. Data model

Bổ sung vào [customer-detail-data.ts](apps/staffing-saas/app/components/customers/customer-detail-data.ts):

```ts
export type CustomerShiftStatus = "active" | "inactive";

export const CUSTOMER_SHIFT_STATUS_LABELS: Record<
  CustomerShiftStatus,
  { label: string; color: "success" | "gray" }
> = {
  active: { label: "Đang hoạt động", color: "success" },
  inactive: { label: "Ngừng hoạt động", color: "gray" },
};

export type CustomerShiftAttendanceMode = "precise" | "simple";
export type CustomerShiftOvertimeCalcMode = "afterScheduledEnd" | "dailyHourThreshold";
export type CustomerShiftWeekday = 1 | 2 | 3 | 4 | 5 | 6 | 7; // Mon=1, Sun=7

export interface CustomerShift {
  id: string;                       // auto-gen, prefix "SC" (e.g. SC1234)
  name: string;                     // user-defined, e.g. "Ca tối kho ECDC"
  status: CustomerShiftStatus;

  // §3.1 — Thông tin chung
  positionId: string;               // FK → CustomerPosition.id
  locationId: string;               // FK → CustomerLocation.id

  // §3.2 — Lịch làm việc
  weekdays: CustomerShiftWeekday[]; // ≥ 1
  startTime: string;                // "HH:mm"
  endTime: string;                  // "HH:mm" — nếu ≤ startTime ⇒ ca qua đêm
  breakMinutes: number | null;      // optional

  // §3.3 — Cấu hình giá
  pricingConfigId: number;          // FK → CustomerPricingConfig.id

  // §3.4 — Chính sách làm việc (mirror ScheduleStep "Chính sách")
  requireFullAttendance: boolean;   // "Yêu cầu làm đủ ngày" — bật ⇒ phạt nếu nghỉ
  roundingMinutes: number;          // ≥ 1, round-up
  attendanceMode: CustomerShiftAttendanceMode;
  allowsOvertime: boolean;
  overtimeCalcMode: CustomerShiftOvertimeCalcMode | null;
  overtimeMinMinutesAfterShift: number | null;   // chỉ khi calcMode = afterScheduledEnd
  overtimeDailyHourLimit: number | null;         // chỉ khi calcMode = dailyHourThreshold

  // §3.5 — Meta (read-only)
  createdAt: string;
  updatedAt: string;
  hiringRequestCount: number;       // số HR đang dùng ca này
}
```

Bổ sung `shifts: CustomerShift[]` vào `CustomerDetailExtras`.

**Lý do chọn `pricingConfigId` đơn (không phải mảng):** 1 ca = 1 nguồn giá. Nếu cùng vị trí/địa điểm có nhiều cấu hình giá theo thời gian, dùng `appliedFrom/appliedTo` trên `CustomerPricingConfig` (đã có). Đổi giá ⇒ tạo ca mới hoặc đổi `pricingConfigId` (logged).

**Lý do KHÔNG chứa start/end date, headcount, posting title, bonus, payCycle:** những trường này thay đổi mỗi lần tuyển → thuộc về `HiringRequest`, không thuộc về `CustomerShift`.

---

## 3. List view (`?tab=shifts`)

Khung card giống `PositionsTab` hiện tại.

### 3.1 Header

| Slot | Nội dung |
|---|---|
| Title | `Ca làm việc` |
| Subtitle | `Mỗi ca = vị trí + địa điểm + lịch + cấu hình giá + chính sách. Khi tạo y/c tuyển dụng, chọn ca và thêm ngày làm.` |
| Action (top-right) | `Button color="primary"` `iconLeading={<Plus/>}` → `Thêm ca làm việc` |

### 3.2 Status tab + Filter bar

**Status tab** đặt trên filter bar — replace cột trạng thái trong table. `Tabs variant="underline"` hoặc segmented `ToggleGroup`:

```
[ Tất cả (N) ] [ Đang hoạt động (N) ] [ Ngừng hoạt động (N) ]
```

Số count cập nhật theo filter hiện tại. Default tab = `Đang hoạt động`.

**Filter bar** dưới status tab, `flex flex-wrap gap-3 items-end`. Mọi field optional, debounce 300ms.

| Input | Type | Placeholder |
|---|---|---|
| Tên ca / Mã | text + search icon | `Tìm theo tên hoặc SC...` |
| Vị trí | `Select` (từ `extras.positions`) | `Vị trí` |
| Địa điểm | `Select` (từ `extras.locations`) | `Địa điểm` |
| Cấu hình giá | `Select` (từ `extras.pricingConfigs`) | `Cấu hình giá` |

Right cluster: `Reset` (secondary) · `Lọc` (primary).

### 3.3 Table

7 cột — gom + bỏ để fit width thường gặp.

| # | Header | Render |
|---|---|---|
| 1 | Mã | `shift.id` — link `text-fg-brand` (`SC1234`) |
| 2 | Tên ca | `shift.name` semibold. Hint: tên ca thường đã chứa vị trí (e.g. `Ca tối kho ECDC - CTV lấy hàng`) — không tách cột `Vị trí` riêng. |
| 3 | Địa điểm | `location.shortName` — tooltip `location.address` |
| 4 | Lịch | 2 dòng stack dọc trong 1 cell: <br>**Dòng 1** — day chips `T2 T3 T4 T5 T6 T7 CN` (day không chọn `text-fg-quaternary line-through`, day chọn `text-fg font-medium`, Sunday luôn `text-fg-warning`). <br>**Dòng 2** — `HH:mm → HH:mm` (`text-sm text-fg-secondary`). Ca qua đêm thêm pill nhỏ `(qua đêm)` `text-fg-tertiary` inline. |
| 5 | Cấu hình giá | link `text-fg-brand` → mở pricing config trong tab cùng route (`?tab=pricing&config=N`) |
| 6 | Đang dùng | `shift.hiringRequestCount` — `0` ⇒ `text-fg-tertiary`. `>0` ⇒ `Badge type="pill" color="brand" size="sm"` `3 y/c` |
| 7 | (action) | `Button color="secondary" size="sm" iconLeading={<Pencil/>}` → `Sửa` |

Trạng thái không hiện trong row — đã filter qua status tab ở §3.2.

Empty state: `Không có dữ liệu`. CTA: `+ Thêm ca làm việc đầu tiên`.

Pagination footer giống `PositionsTab` (`1-N of N items` · `20 / trang`).

---

## 4. Detail / edit view (`?tab=shifts&shift=SC1234` or `&shift=new`)

**Render in-place trong tab `shifts`** — KHÔNG tạo route page mới, KHÔNG đổi URL pathname. Chỉ swap nội dung của tab khi search-param `shift` có giá trị (giống pattern `PositionEditView` ↔ `PositionsTab` hiện tại). Outer tab `CustomerDetailTabs` vẫn giữ nguyên ở trạng thái active `shifts`, vertical tab rail bên trái vẫn nguyên.

```tsx
// pseudo
function ShiftsTab() {
  const shiftParam = searchParams.get("shift");
  if (shiftParam === "new") return <ShiftEditView mode="create" />;
  if (shiftParam) return <ShiftEditView mode="edit" shift={find(shiftParam)} />;
  return <ShiftsList />;
}
```

### 4.1 Header block

| Slot | Nội dung |
|---|---|
| Left | `Button color="link-color" iconLeading={<ArrowLeft/>}` → `Quay lại danh sách` (set `?shift=` rỗng) |
| Title | Create: `Tạo ca làm việc mới` · Edit: `<shift.id> · <shift.name>` |
| Right (edit only) | `Badge` trạng thái + `Button color="secondary" size="sm"` `Đổi trạng thái` (popover chọn active/inactive) |

Breadcrumb (qua `SetPageBreadcrumb`): `Home / Quản lý công ty / <brandName> / Ca làm việc / <SC1234>` (edit) hoặc `.../Tạo mới` (create). Tuân thủ rule entity-key trong [feedback_breadcrumb_entity_name.md].

### 4.2 Horizontal tab (sub-tab)

Đặt **bên trong** form detail (đã có vertical tab `CustomerDetailTabs` ở ngoài → bắt buộc dùng horizontal ở đây để không xung đột pattern).

```
[ Thông tin chung ] [ Lịch làm việc ] [ Cấu hình giá ] [ Chính sách làm việc ]
─────────────────────────────────────────────────────────────────────────────
```

Component: `Tabs variant="underline" orientation="horizontal"` từ `@mvp-ui/ui`. Active tab `text-fg-brand` + `border-b-2 border-border-brand`.

**Validation gating:** không. User nhảy tab tự do. Mỗi tab có badge `●` `text-fg-error` ở cuối label nếu có lỗi sau khi user thử lưu.

### 4.3 Sticky form footer (chung cho mọi tab)

| Mode | Left | Right cluster |
|---|---|---|
| Create | `Hủy` (secondary) | `Lưu` (primary) |
| Edit | `Hủy` (secondary) | `Lưu thay đổi` (primary) — disabled khi form not dirty |

Khi save thành công: toast `Đã lưu ca làm việc`. Khi `shift.hiringRequestCount > 0` và user đổi field có ảnh hưởng pricing/policy: confirm dialog `Thay đổi sẽ ảnh hưởng N y/c tuyển dụng đang dùng ca này. Tiếp tục?`.

---

## 5. Sub-tab 1 — `Thông tin chung`

`SectionCard` đơn, 2 trường stack dọc. Label column `~200px`.

| # | Label | Field | Control | Required | Notes |
|---|---|---|---|---|---|
| 1 | `Tên ca` | `name` | `Input type="text"` | ✅ | trim ≥ 3, ≤ 80. Hint: `Ví dụ: Ca tối kho ECDC, Ca sáng cuối tuần` |
| 2 | `Vị trí` | `positionId` | `Select` (items = `extras.positions`) + trailing `IconButton Refresh` + `Button color="link-color" iconTrailing={<ExternalLink/>}` `Quản lý vị trí` (link `?tab=positions`) | ✅ | Chọn xong, hiển thị preview card bên dưới: `position.name` (semibold) · `position.description` truncate 2 dòng · link `Xem chi tiết →` mở `?tab=positions&position=<id>` |
| 3 | `Địa điểm làm việc` | `locationId` | `Select` (items = `extras.locations`) + trailing `IconButton Refresh` + `Button color="link-color"` `Quản lý địa điểm` | ✅ | Sub-text `Đ/c: <location.address>` `text-fg-tertiary text-sm` |

Validation:
- `name` required, trimmed length 3–80, unique trong scope customer (case-insensitive).
- `positionId` required, must exist trong `extras.positions`.
- `locationId` required, must exist trong `extras.locations`.

---

## 6. Sub-tab 2 — `Lịch làm việc`

`SectionCard` đơn. Pattern **mirror nguyên** từ [ScheduleStep.tsx](apps/staffing-saas/app/components/hiring-requests/config/steps/ScheduleStep.tsx) section `Lịch` — bỏ 2 field `startDate` + `endDate` (ngày cụ thể chỉ có ở HR).

| # | Label | Field | Control | Required | Notes |
|---|---|---|---|---|---|
| 1 | `Lịch trong tuần` | `weekdays` | Checkbox row 7 items: `T2 T3 T4 T5 T6 T7 CN` (Sunday label `text-fg-warning`) | ✅ | Stored `[1..7]`. Min 1 day. Quick action row trên đầu: `Chọn cả tuần` · `T2 → T6` · `T7 + CN` (link buttons). |
| 2 | `Giờ bắt đầu` | `startTime` | `Input type="time"` | ✅ | `HH:mm` |
| 3 | `Giờ kết thúc` | `endTime` | `Input type="time"` | ✅ | Nếu `endTime ≤ startTime` ⇒ hint inline `Ca qua đêm — sẽ tính sang ngày hôm sau` `text-fg-warning` |
| 4 | `Nghỉ giải lao` | `breakMinutes` | `Input type="number"` suffix `phút` | — | `≥ 0`, `< (endTime - startTime)`. Mặc định 0. Trừ khỏi giờ trả lương ở pricing downstream. |

Preview row cuối card: `Tổng giờ công / ca: <X giờ Y phút>` (derived). Format: `endTime - startTime - breakMinutes`. Ca qua đêm cộng 24h.

Validation:
- `weekdays.length ≥ 1`.
- `startTime`, `endTime` đều phải có giá trị `HH:mm` hợp lệ.
- `breakMinutes ∈ [0, totalShiftMinutes)`.

---

## 7. Sub-tab 3 — `Cấu hình giá`

`SectionCard` đơn. Pattern mirror từ [PayStep.tsx](apps/staffing-saas/app/components/hiring-requests/config/steps/PayStep.tsx) section `Cấu hình cước phí` — **bỏ** Thưởng thêm + Thanh toán (chỉ xuất hiện ở HR).

| # | Label | Field | Control | Required | Notes |
|---|---|---|---|---|---|
| 1 | `Cấu hình cước phí` | `pricingConfigId` | Logic phân nhánh theo số lượng cấu hình match `positionId + locationId.province`: <br>**1 match** ⇒ link-style `text-fg-brand` `<name> (áp dụng từ DD/MM/YYYY đến DD/MM/YYYY)` + `ExternalLink` icon → mở `?tab=pricing&config=<id>`. <br>**Nhiều match** ⇒ `Select` items = matched configs. <br>**0 match** ⇒ empty state `Chưa có cấu hình giá phù hợp.` + CTA `Tạo cấu hình giá mới →` (link `?tab=pricing&config=new`) | ✅ | Filter logic chạy client-side trên `extras.pricingConfigs`. |
| 2 | (preview, read-only) | — | Bảng tóm tắt rates từ pricing config đã chọn — 6 dòng shift type (`day_regular`, `day_overtime`, ...) × 3 cột (`Mức chi trả`, `Mức phí`, `GM0`). `bg-bg-secondary p-4 rounded-lg`. | — | Mục đích: user verify đúng cấu hình. Click row ⇒ deep-link vào pricing detail tab. |
| 3 | (info banner) | — | `Alert color="info"` (nếu component có) hoặc `<div className="rounded-lg border border-info-border bg-info-bg p-3 text-sm text-info-fg">...` | — | Copy: `Thu nhập dự tính / ca, % biên LN gộp, thưởng thêm, chu kỳ thanh toán sẽ được tính khi tạo y/c tuyển dụng từ ca này.` |

Validation:
- `pricingConfigId` required, must exist trong `extras.pricingConfigs`, và `status = 'active'` (nếu inactive ⇒ warning inline nhưng không block save).

---

## 8. Sub-tab 4 — `Chính sách làm việc`

`SectionCard` chia 3 block. Pattern mirror từ [ScheduleStep.tsx](apps/staffing-saas/app/components/hiring-requests/config/steps/ScheduleStep.tsx) section `Chính sách` — bỏ qua các trường thuộc về HR.

> **Lưu ý conventon:** user yêu cầu "tương tự PayStep" cho block này — nhưng các field `chấm công`, `phạt`, `tăng ca`, `làm tròn` thực tế nằm trong `ScheduleStep` (file `PayStep` chỉ chứa thưởng thêm + chu kỳ thanh toán). Doc này theo nội dung user mô tả, không theo tên file.

### 8.1 Block — `Phạt nghỉ ca`

| # | Label | Field | Control | Required | Notes |
|---|---|---|---|---|---|
| 1 | `Yêu cầu làm đủ ngày` | `requireFullAttendance` | `Checkbox` standalone | — | Helper text: `* Lưu ý: Sẽ có ít CTV ứng tuyển hơn vì nếu nghỉ sẽ bị phạt` `text-fg-tertiary text-sm` |

### 8.2 Block — `Chấm công`

| # | Label | Field | Control | Required | Notes |
|---|---|---|---|---|---|
| 1 | `Làm tròn giờ công mỗi` | `roundingMinutes` | `Input type="number"` suffix `phút` | ✅ | min `1`, default `1`. Hint: `Cách làm tròn: Round-up. Ví dụ 0,5 = 1 và 0,4 = 0` |
| 2 | `Ghi nhận giờ công` | `attendanceMode` | `RadioGroup` vertical, 2 options | ✅ | `precise` (default) `Chính xác, ghi nhận theo giờ vào/ra thực tế`. `simple` `Đơn giản, chỉ cần CTV có chấm công 1 lần thì sẽ được tính đủ giờ công` |

### 8.3 Block — `Tăng ca`

| # | Label | Field | Control | Required | Notes |
|---|---|---|---|---|---|
| 1 | `Có tăng ca` | `allowsOvertime` | `Checkbox` standalone | — | Khi unchecked ⇒ sub-block 8.3.1 ẩn |

#### 8.3.1 Sub-block — `Cách tính tăng ca` (chỉ khi `allowsOvertime = true`)

Khung `rounded-lg border border-border-secondary bg-bg-secondary p-4`.

| # | Label | Field | Control | Required | Notes |
|---|---|---|---|---|---|
| 1 | `Cách tính tăng ca` | `overtimeCalcMode` | `RadioGroup` 2 options | ✅ | `afterScheduledEnd` `Mặc định, quá giờ chính thức là tăng ca`. `dailyHourThreshold` `Quá số Giờ công chính thức quy định/ngày là tăng ca` — copy + hint verbatim từ ScheduleStep. |
| 2 | *(option A)* `Số phút tối thiểu sau giờ chính thức để tính tăng ca` | `overtimeMinMinutesAfterShift` | `Input type="number"` suffix `phút` | — | Visible khi `overtimeCalcMode = afterScheduledEnd`. Default `0`. |
| 3 | *(option B)* `Số giờ công chính thức / ngày` | `overtimeDailyHourLimit` | `Input type="number"` suffix `giờ` | ✅ (khi option B) | Visible khi `overtimeCalcMode = dailyHourThreshold`. Default `8`. |

Validation:
- `roundingMinutes`: required, integer ≥ 1.
- `attendanceMode`: required enum.
- Khi `allowsOvertime = true`:
  - `overtimeCalcMode`: required enum.
  - `afterScheduledEnd` ⇒ `overtimeMinMinutesAfterShift` integer ≥ 0 (default 0 OK).
  - `dailyHourThreshold` ⇒ `overtimeDailyHourLimit` integer ≥ 1.

---

## 9. Cross-cutting UI conventions

- **SectionCard**: `rounded-xl border border-border-secondary bg-bg shadow-xs`. Header `border-b border-border-secondary px-5 py-4`, body `p-5`.
- **Required marker**: `<span className="text-fg-error ml-0.5">*</span>` sau label.
- **Label column**: `text-sm font-medium text-fg-secondary`, width ~200px ≥ md.
- **Helper text**: dùng `HintText` từ `@mvp-ui/ui` hoặc `<p className="text-sm text-fg-tertiary mt-1.5">`.
- **Empty / null preview value**: `Chưa cập nhật` semibold-dark (required missing) hoặc `(chưa có)` italic muted (optional missing).
- **Status badge**: dùng `CUSTOMER_SHIFT_STATUS_LABELS` (đề xuất ở §2).
- **Day chips trong list**: reuse pattern weekday từ ScheduleStep checkbox (Sunday warning color).
- **Day labels khắp nơi**: `T2 T3 T4 T5 T6 T7 CN` — convention từ ScheduleStep, không dùng `Hai/Ba/...` ở list view (chật cột).

---

## 10. Tương tác với HiringRequest (out of scope tab này, ghi chú để align)

Khi user tạo HR mới, pre-step hiện tại đang yêu cầu chọn `customer + position`. Sau khi có tab `Ca làm việc`, đề xuất pre-step được mở rộng thành:

1. Chọn `customer`.
2. Chọn `Ca làm việc` (`CustomerShift`) — không bắt buộc (có thể bỏ qua, nhập tay như cũ).
3. Nếu chọn ca ⇒ wizard auto-fill các field tương ứng và đánh dấu `Đã tạo từ ca <SC1234>` ở header HR detail. Các field auto-fill **vẫn editable**, nhưng có icon revert về giá trị shift.

Detail của thay đổi pre-step này thuộc về [hiring_request.md](./hiring_request.md), không build ở tab này. Chỉ ghi để team thấy lý do tồn tại của entity.

---

## 11. Sample data

`extras.shifts` cho mỗi customer mẫu — 3–5 shift, mix:

```ts
const DEFAULT_SHIFTS: CustomerShift[] = [
  {
    id: "SC1001",
    name: "Ca tối kho ECDC",
    status: "active",
    positionId: "pos-1",                // CTV lấy hàng
    locationId: "loc-5",                // Dự án Củ Chi
    weekdays: [1, 2, 3, 4, 5],          // T2 → T6
    startTime: "18:00",
    endTime: "22:00",
    breakMinutes: 15,
    pricingConfigId: 1,
    requireFullAttendance: true,
    roundingMinutes: 15,
    attendanceMode: "precise",
    allowsOvertime: true,
    overtimeCalcMode: "afterScheduledEnd",
    overtimeMinMinutesAfterShift: 30,
    overtimeDailyHourLimit: null,
    createdAt: "2026-03-12",
    updatedAt: "2026-05-04",
    hiringRequestCount: 3,
  },
  {
    id: "SC1002",
    name: "Ca cuối tuần đóng gói",
    status: "active",
    positionId: "pos-2",                // CTV đóng gói
    locationId: "loc-5",
    weekdays: [6, 7],                   // T7 + CN
    startTime: "08:00",
    endTime: "17:00",
    breakMinutes: 60,
    pricingConfigId: 1,
    requireFullAttendance: false,
    roundingMinutes: 30,
    attendanceMode: "simple",
    allowsOvertime: false,
    overtimeCalcMode: null,
    overtimeMinMinutesAfterShift: null,
    overtimeDailyHourLimit: null,
    createdAt: "2026-04-01",
    updatedAt: "2026-04-01",
    hiringRequestCount: 1,
  },
  {
    id: "SC1003",
    name: "Ca giao hàng buổi sáng",
    status: "inactive",
    positionId: "pos-3",                // CTV giao hàng
    locationId: "loc-2",                // Boxme Long Biên
    weekdays: [1, 2, 3, 4, 5, 6],       // T2 → T7
    startTime: "06:00",
    endTime: "12:00",
    breakMinutes: 0,
    pricingConfigId: 2,
    requireFullAttendance: true,
    roundingMinutes: 15,
    attendanceMode: "precise",
    allowsOvertime: true,
    overtimeCalcMode: "dailyHourThreshold",
    overtimeMinMinutesAfterShift: null,
    overtimeDailyHourLimit: 8,
    createdAt: "2026-02-20",
    updatedAt: "2026-04-22",
    hiringRequestCount: 0,
  },
];
```

---

## 12. Build order

1. Thêm types + `DEFAULT_SHIFTS` vào `customer-detail-data.ts`, bổ sung `shifts` vào `CustomerDetailExtras` + `defaultExtras`.
2. Thêm tab `shifts` vào `CustomerDetailTabs.tsx` (sau `pricing`).
3. Build `ShiftsTab.tsx` (list view) — mirror cấu trúc `PositionsTab` (search-param routing, filter bar, table).
4. Build `ShiftEditView.tsx` (detail/edit) — header + horizontal sub-tab + sticky footer.
5. Build 4 sub-tab components: `ShiftGeneralSection`, `ShiftScheduleSection`, `ShiftPricingSection`, `ShiftPolicySection`. Reuse logic từ `ScheduleStep` (`weekdays`, `attendance`, `overtime`) và `PayStep` (pricing select).
6. Verify ở `apps/staffing-saas` dev server: list view + create flow + edit flow ở 1440 và 1024, light + dark mode.
7. (Sau) Mở rộng HR wizard pre-step để link tới `CustomerShift` — track ở [hiring_request.md](./hiring_request.md).

---

## 13. Còn mở (cần chốt trước khi build)

1. Có cần versioning ca làm việc không (ví dụ đổi giờ start/end ⇒ snapshot ca cũ cho HR đã publish)? Nếu có ⇒ thêm `versionId` + history.
2. Có hành động `Nhân bản ca` (duplicate) không? Hữu ích khi tạo nhiều ca tương tự (ngày khác giờ khác).
3. Khi xoá ca đang được dùng (`hiringRequestCount > 0`) — chặn cứng hay cho phép kèm warning?
4. Có nhúng preview bảng `rates` từ pricing config vào sub-tab 3 không, hay chỉ link ra ngoài? (Đề xuất ở §7 row 2 là có — confirm.)
5. Quick-action chọn nhanh weekday (`Chọn cả tuần`, `T2→T6`, `T7+CN`) có cần không, hay chỉ checkbox đơn giản như ScheduleStep?
6. Field `name` có cần unique per customer không, hay cho phép trùng?
