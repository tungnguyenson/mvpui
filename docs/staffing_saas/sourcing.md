# Quản lý Sourcing — Plan

> Nâng cấp trang `apps/staffing-saas/app/components/candidates/` (hiện `/candidates`) từ
> **ATS pipeline theo stage** → **lead-triage queue theo tab + hành động**, thêm lớp
> attribution (Người giới thiệu / PIC) phục vụ tính thù lao.
>
> Nguồn yêu cầu: Confluence PM — "Sourcing & quản lý sourcing"
> https://viecco.atlassian.net/wiki/spaces/PM/pages/399278140
>
> **Status: PLAN (2026-05-29).** UI demo only (không backend). 3 open question đã chốt — xem §10.

---

## 0. Vì sao đổi (concept shift)

| | Hiện tại | Spec mới |
|---|---|---|
| Mô hình | Pipeline ứng tuyển theo 1 job | Pool lead đa nguồn, chưa gắn job |
| Điều hướng | Kanban + table theo `stage` | 6 tab + 8 hành động routing |
| Trọng tâm | Tiến trình ứng viên | Triage lead + ghi nhận người giới thiệu (payout) |
| State | `CandidateStage` (7 giá trị) | `tab` + `action` state machine |

→ **Không phải refactor incremental.** Data model lẫn UI đều làm lại. Stage cũ map sang tab mới (xem §6).

## 1. Mục tiêu

- Tập trung CSDL ứng viên từ **4 nguồn vào** thành 1 pool.
- Triage nhanh: mỗi lead 1 hành động → tự về đúng tab.
- Ghi nhận **người giới thiệu (PIC)** chính xác → cơ sở tính thù lao.
- Lead organic cho phép recruiter **"Nhận lead"** để nhận phụ trách.
- Bảo vệ dữ liệu: SĐT che khi lead thuộc người khác.

## 2. Nguồn dữ liệu vào pool (Sourcing DB)

1. **Sourcing form** — link giới thiệu riêng mỗi CTV `tuyen.viec.co/{username}` (unique).
2. **Đã applied job, chưa có ca** làm.
3. **Tự tải app, đã reg, chưa có job.**
4. **Worker inactive ≥ 30 ngày** liên tục.

Lead organic (nguồn 2/3/4) có `refCode = null` → cần "Nhận lead".

## 3. Layout tổng

```
┌────────────────────────────────────────────────────────────────────┐
│ Header: "Quản lý sourcing"           [Import] [+ Thêm ứng viên]      │
├────────────────────────────────────────────────────────────────────┤
│ Tabs: Sourcing(To-do) | Đã chốt PV | Đã chốt ca |                   │
│       Không đi làm Day-1 | Đã đi làm Day-1 | Lưu trữ                 │
├────────────────────────────────────────────────────────────────────┤
│ Toolbar: [search] [Lọc: PIC ▾] [Lọc: Hành động ▾] [Thời gian: 7d ▾] │
├────────────────────────────────────────────────────────────────────┤
│ TABLE (cột theo §4)                                                  │
└────────────────────────────────────────────────────────────────────┘
```

Vị trí nav: **Tuyển dụng > Quản lý sourcing**.

## 4. Cột bảng

| Cột | Ghi chú |
|---|---|
| Họ & tên | row header |
| SĐT | **che `***1234` khi lead có PIC ≠ user hiện tại**; full khi unclaimed |
| Giới tính, Tỉnh-TP, Quận-huyện | gộp 1 cụm (như wireframe) |
| Cty ưu tiên | ≤3, vd Shopee Express, GHN |
| Ca muốn làm | Sáng / Chiều-Tối / Đêm (multi) |
| Loại việc ưu tiên | Toàn thời gian / Bán thời gian-linh hoạt |
| CCCD trước / sau | yes-no, bấm mới xem ảnh |
| Ngày đầu có thể đi làm | date |
| Phụ trách (PIC) | nếu null → nút **`Nhận lead`**; else tên |
| Hành động | `Chọn ▾` (8 action); `-` khi chưa có PIC |
| Lý do từ chối | hiện khi action = từ chối |
| Ghi chú | free text |

**Quy tắc:** chưa Nhận lead → cột Hành động khoá (`-`). Phải claim mới thao tác.

## 5. Tab + Hành động (state machine)

### 5.1. Tabs

| Tab | Ý nghĩa | Action? |
|---|---|---|
| Sourcing (To-do) | Lead cần xử lý | ✅ có action |
| Đã chốt PV *(TBD)* | Job BPO tuyển cố định, qua phỏng vấn | — |
| Đã chốt ca | Action = Chốt ca | show-only |
| Không đi làm Day-1 | Đã chốt ca nhưng đối soát không có công | ✅ re-convert |
| Đã đi làm Day-1 | Chốt ca + đối soát có công | show-only |
| Lưu trữ | Output các action loại bỏ; để tái sử dụng | — |

### 5.2. 8 hành động → routing

| Hành động | → Tab |
|---|---|
| KNM lần 1 | Sourcing (To-do) |
| KNM lần 2 | Sourcing (To-do) |
| KNM lần 3 | Lưu trữ |
| Tắt ngang máy / Thuê bao | Lưu trữ |
| Đã có việc / Không còn nhu cầu | Lưu trữ |
| Chưa có việc hợp / Đủ người | Lưu trữ |
| Chốt ca làm | Đã chốt ca |
| Chốt PV | Đã chốt PV |

> KNM = "Không nghe máy". Day-1 (Không/Đã đi làm) là output của **đối soát ca**, không phải của 8 action — đến từ hệ thống chấm công.

## 6. Attribution (PIC / Người giới thiệu)

- Lead qua URL `{username}` → PIC = chủ URL (auto).
- Lead organic (`refCode = null`) → recruiter bấm **Nhận lead** → PIC = user đó.
- **Dedup:** trùng thì lấy **timestamp ghi nhận đầu tiên**.
- **Reset 30 ngày:** A reg lần đầu mà 30 ngày không đi làm → coi là tự do; ai giới thiệu lại (theo timestamp) thì tính PIC cho người mới. **Không tạo worker ID mới.**
- A đã đi làm rồi inactive ≥30 ngày → ai giới thiệu lại đầu tiên nhận PIC.

## 7. Đổi data model (`candidates-data.ts`)

Thêm / đổi:

```ts
// Thay CandidateStage bằng:
type SourcingTab =
  | "todo" | "interviewed" | "shift-locked"
  | "no-show-day1" | "worked-day1" | "archived";

type SourcingAction =
  | "knm-1" | "knm-2" | "knm-3"
  | "unreachable" | "has-job" | "enough-people"
  | "lock-shift" | "lock-interview";

type ShiftPref = "morning" | "afternoon-evening" | "night";
type JobTypePref = "part-time" | "full-time";

interface CandidateRecord {
  // ... giữ: id, code, fullName, phone, gender, source, score, ...
  refCode: string | null;          // url owner username | null=organic
  pic: string | null;              // người phụ trách; null → cần Nhận lead
  referrer: string | null;         // người giới thiệu (≠ recruiter cũ)
  tab: SourcingTab;
  lastAction: SourcingAction | null;
  rejectReason?: string;

  province: string;                // Tỉnh/TP — 1
  districts: string[];             // Quận/huyện — ≤3
  preferredCompanies: string[];    // ≤3
  shiftPrefs: ShiftPref[];
  jobTypePrefs: JobTypePref[];
  cccdFront: boolean;              // có ảnh mặt trước
  cccdBack: boolean;
  availableFrom: string;           // date, ≤30 ngày
  over18Confirmed: boolean;
}
```

Bỏ/giữ tuỳ: `appliedPosition`, `hiringRequestCode` vẫn giữ (lead applied job). `recruiter` → đổi nghĩa thành `pic`. `documents[]` → CCCD tách 2 boolean (ảnh khác giữ trong drawer chi tiết).

### Map stage cũ → tab/status mới (migration mock)

| stage cũ | tab |
|---|---|
| new | todo |
| contact | todo |
| onboarding | shift-locked |
| hired | worked-day1 |
| rejected | archived |
| ghosted | archived |
| blacklist | archived |

## 8. Filter / Sort

- **Thời gian mặc định = 7 ngày gần nhất.**
- Lọc theo PIC, theo Hành động.
- Sort mặc định: mới ghi nhận nhất trước (newest-first).

## 9. Map shift từ job (lead applied job)

| Khung giờ start | Ca |
|---|---|
| 04:00 – trước 11:00 | Ngày (Sáng) |
| 11:00 – trước 19:00 | Chiều/Tối (gãy) |
| 19:00 – trước 04:00 hôm sau | Đêm |

## 10. Decisions (đã chốt 2026-05-29)

1. **Dedup key** = **SĐT** (khoá chính, realtime). **CCCD** = khoá xác nhận khi có. → logic merge + cảnh báo trùng làm trong P1.
2. **Cột Trạng thái** = **bỏ**. Lọc theo tab đã đủ; không thêm field `status`.
3. **Tab "Đã chốt PV"** = **làm hết** trong demo (kể cả action `Chốt PV`).

> Toàn bộ là **UI demo** — mock data, không backend. Action/Nhận lead cập nhật state client-side.

## 11. Phân pha đề xuất

- **P1:** Data model mới + migrate mock + Tab list + cột + filter + Nhận lead + dropdown 8 action routing (UI, không backend).
- **P2:** Drawer chi tiết cập nhật (CCCD viewer, preferences, lịch sử action), masking SĐT.
- **P3:** Sourcing form công khai `tuyen.viec.co/{username}` (ngoài scope trang admin — tách).
- **Để sau:** gamification, customize URL theo nhóm, dashboard thu nhập người giới thiệu.

## 12. Component reuse (mvp-ui)

Theo `packages/skill/components.md` — không hand-roll:
- Tabs: dùng component Tabs có sẵn (thay 2 nút view hiện tại).
- `Table` / `TableCard` — giữ.
- `Badge` / `BadgeWithDot` — Trạng thái, Ca, Loại việc.
- Dropdown action: dùng menu/select component có sẵn, không `<select>` trần.
- `Button` cho Nhận lead.
- Drawer chi tiết: giữ `CandidateQuickView`.
