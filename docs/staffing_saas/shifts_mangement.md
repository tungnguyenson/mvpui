# Lịch làm việc (Shifts Management) — Plan

> Trang `/shifts` redesign sang calendar view, có filter sidebar bên phải. Replace `ShiftsPage.tsx` (table view) hoặc giữ làm view `Bảng` phụ.

---

## 1. Mục tiêu

- Operations nhìn nhanh ca làm việc theo tuần / ngày / khách hàng.
- Lọc nhanh theo nhiều tiêu chí (status, customer, site, fill, pay rate).
- Hover xem nhanh, click mở chi tiết không rời trang.
- Demo data luôn có nội dung dù truy cập bất kỳ thời điểm nào (không bị outdated).

## 2. Layout tổng

```
┌─────────────────────────────────────────────────────────┬───────────┐
│ Header — 2 hàng                                         │           │
│ R1: [<] [tuần XX/MM–XX/MM] [>] [Tuần này]               │  FILTER   │
│     [KH: GHN Sorting ▾]   ← SCOPE, required             │  SIDEBAR  │
│     [+ Tạo ca]                                          │           │
│ R2: Tabs view: Tuần | Ngày | Tháng | Theo KH | Bảng     │  300px    │
├─────────────────────────────────────────────────────────┤  sticky   │
│ Active filter chips: [Site: Vincom ✕] [Status: open ✕]  │  collapse │
│                                       [Xóa tất cả lọc]  │  → 56px   │
├─────────────────────────────────────────────────────────┤  rail     │
│                                                         │  (badge   │
│                  GRID THEO VIEW                         │  số filter│
│                                                         │  active)  │
└─────────────────────────────────────────────────────────┴───────────┘
```

**Customer = scope selector, không phải filter thường.** Với hàng trăm ca/ngày, Week/Day view sẽ unrenderable nếu không scope. Customer selector đặt **trên header**, prominent, mandatory.
- **Week / Day / Month view**: chỉ chọn 1 KH (single-select). Muốn compare nhiều KH → đổi view `Theo KH`.
- **Theo KH view**: multi-select bật, customer trở thành rows.
- **Persist**: URL `?customer=<id>` ưu tiên, localStorage fallback khi URL trống.
- Default lần đầu = first customer trong list.

## 3. View modes

### 3.1. Tuần (default)

- 7 cột Thứ Hai → Chủ Nhật.
- Mỗi cột header: `Thứ Hai\n18/05` + count badge (`5 ca`).
- Body cột: stack `ShiftCard` dọc, scroll trong cột nếu nhiều.
- Empty day: ghost card `+ Thêm ca`.
- Quá 5 ca/cột: hiện 4 + link `+N ca khác` mở list dialog.

### 3.2. Ngày (timeline)

- 1 cột timeline 06:00 → 22:00 (hoặc 24h tùy data).
- Rows = giờ (mỗi row 60min, mark 30min).
- `ShiftCard` đặt absolute theo `startAt`/`endAt`, width = 100%, overlap → side-by-side chia đôi.

### 3.3. Theo Khách hàng (resource view)

- Table-like grid: rows = customer, cols = 7 ngày trong tuần.
- Cell chứa mini `ShiftCard` compact (chỉ giờ + fill).
- Customer row sticky bên trái khi scroll ngang.
- Header customer scope disabled trong view này (customer đã là rows).

### 3.4. Tháng (demo, đánh giá sau)

```
┌────┬────┬────┬────┬────┬────┬────┐
│ T2 │ T3 │ T4 │ T5 │ T6 │ T7 │ CN │
├────┼────┼────┼────┼────┼────┼────┤
│ 18 │ 19 │ 20 │ 21 │ 22 │ 23 │ 24 │
│ 12 │ 15 │ 18 │ 16 │ 20 │  8 │  5 │  ← count
│ ●●●│ ●● │ ●● │ ●● │ ●● │ ●  │ ●  │  ← dot mix theo status
└────┴────┴────┴────┴────┴────┴────┘
```

- Grid 5–6 hàng tuần, mỗi cell ngày = count + 3 dot màu (đỏ=critical, vàng=open/filling, xanh=full).
- Click ô → switch sang Day view của ngày đó.
- **Build trước cho demo**, đánh giá usefulness rồi mới invest real code (drag-drop, drill-down filter, density).

## 4. ShiftCard — anatomy

```
┌──────────────────────────────────┐
│ 08:00 – 17:00      [● Thiếu gấp] │  ← time + status pill
│ Ca bán hàng cuối tuần            │  ← name (truncate)
│ GHN Sorting · Vincom Đồng Khởi   │  ← customer · site
│ ▰▰▰▰▱▱  14/18                    │  ← progress + count
└──────────────────────────────────┘
```

States:
- Default
- Hover → border-brand + popover quick view
- Selected (modal đang mở) → ring-brand
- Critical → left border `border-l-4 border-border-error`
- Past (ca đã qua) → opacity-60

## 5. Interaction model

| Action | UX |
|---|---|
| Hover card | Popover xuất hiện ~200ms — full info + action `Xem chi tiết` / `Phân công` |
| Click card | Modal Dialog overlay — full detail (giống `/shifts/[id]` hiện tại) |
| Click empty day | Drawer/Modal `+ Tạo ca` (out of scope MVP, stub) |
| Click `Bảng` toggle | Switch sang `ShiftsPage` table cũ |
| Date nav `<` `>` | Tuần hiện tại ± 7 ngày |
| `Tuần này` | Reset về tuần chứa `today` |
| URL state | `?view=week&date=2026-05-21&filters=...` để share/refresh giữ nguyên |

## 6. Filter list (CHỐT)

### 6.1. Header — scope (mandatory, không tính là filter)

| Field | Component | Default | Behavior |
|---|---|---|---|
| **Khách hàng** | Single-select (Week/Day/Month) hoặc MultiSelect (Theo KH) | URL `?customer=` → localStorage → first customer | Single-only ở Week/Day/Month. Multi-bật khi switch sang `Theo KH` |
| **Tuần** | `DateRangePicker` + `<` `>` + `Tuần này` | Tuần chứa `today` | URL `?date=YYYY-MM-DD` |
| **View** | `Tabs` pill | `Tuần` | Tuần / Ngày / Tháng / Theo KH / Bảng |

### 6.2. Sidebar — refinement

Width: 300px expanded, 56px collapsed (icon rail có **dot badge số filter sidebar đang active**, không tính scope).

Sticky, scroll riêng. Live update debounce 200ms. Không Apply button.

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | Tìm kiếm | `Input` + icon | Tên/code ca/site, debounce 200ms |
| 2 | Khu vực | `MultiSelect` | Cấp tỉnh/thành: `Hà Nội` · `TP. HCM` · `Đà Nẵng` · `Bình Dương` · `Hải Phòng` · `Cần Thơ` ... |
| 3 | Trạng thái | `Checkbox` group | open / filling / critical / full / closed |
| 4 | Tiến độ fill | Chip preset (multi) | `Thiếu gấp <50%` · `Đang lấp 50–99%` · `Đủ 100%` |
| 5 | Khung giờ | Chip preset (multi) | `Sáng 06–12` · `Chiều 12–18` · `Tối 18–22` · `Đêm 22–06` |
| 6 | Footer | `Button` | `Xóa lọc` (clear sidebar only, không clear scope) |

**Note**: Filter theo **Region** (tỉnh/thành) thay vì liệt kê từng site — gọn hơn khi có hàng trăm site. Site cụ thể vẫn hiển thị trên card + popover. Search input vẫn tìm được theo tên site nếu cần precise.

**Data impact**: `ShiftRecord` cần thêm field `region: string` (vd: `"TP. HCM"`, `"Hà Nội"`). Generator/templates parse từ `address` hoặc gán explicit theo site.

### 6.3. Đã loại

- ~~Pay rate range~~ — Ops không filter theo pay rate (đó là worker concern). Pay rate vẫn show trên card/popover.
- ~~Khoảng ngày trong sidebar~~ — duplicate với week nav. Cần xem nhiều tuần → đổi view `Tháng`.
- ~~Required headcount range~~ — ít actionable, dùng Fill % thay.
- ~~Loại ca weekday/weekend~~ — derive được từ ngày tuần, không cần filter riêng.
- ~~Site/Địa điểm~~ — thay bằng **Region** (coarser, ít noise). Site detail vẫn trên card; search input lo precise lookup.
- ~~Lưu preset~~ — Phase 3, không phải MVP.

### 6.4. Active filter chips

Dưới header, render `BadgeWithButton` cho từng filter sidebar đang bật. Click ✕ → remove riêng. `[Xóa tất cả lọc]` button cuối hàng.

Chip **không** hiện scope (customer/week/view) — đó là state riêng trên header.

## 7. Demo data strategy — KHÔNG để màn hình trắng

### Vấn đề
`SHIFTS` hardcode date tuyệt đối `24/05/2026 08:00`. 1 tháng sau truy cập → toàn ca quá khứ → calendar trắng.

### Giải pháp: Generator anchored vào `today`

```ts
// shifts-generator.ts
const TEMPLATES: ShiftTemplate[] = [
  { name: "Ca bán hàng cuối tuần", customer: "GHN Sorting", site: "Vincom Đồng Khởi",
    dayOffset: [5, 6], startHour: 8, endHour: 17, required: 18, fillRatio: 0.78,
    status: "open", payRate: 55000, requirements: [...] },
  // ... ~25 templates đa dạng (sáng/chiều/đêm, weekday/weekend, đủ status)
];

// dayOffset: vị trí trong tuần (0=Mon, 6=Sun) hoặc array nếu lặp
// fillRatio: 0.78 → assignedCount = round(required * 0.78)

export function generateShifts(anchorDate = new Date()): ShiftRecord[] {
  const weekStart = startOfWeek(anchorDate, { weekStartsOn: 1 });
  return TEMPLATES.flatMap((t, i) => {
    const days = Array.isArray(t.dayOffset) ? t.dayOffset : [t.dayOffset];
    return days.map((d) => buildShift(t, addDays(weekStart, d), i));
  });
}

// buildShift: deterministic id = hash(template.name + date), absolute dates từ anchor
```

### Yêu cầu data layer

- `getShiftsForRange(from: Date, to: Date)` → generate trên rolling window ±4 tuần quanh `today`, filter theo range.
- `getShiftById(id)` decode id → regenerate đúng shift (hoặc lookup từ generated set).
- Deterministic: cùng tuần + cùng template → cùng id, cùng assignedCount → no flicker re-render.
- Đa dạng: cover đủ 5 status × multiple customers/sites × ngày sáng/chiều/đêm/weekend.

### Files cần thay/đẻ

- `apps/staffing-saas/app/components/shifts/shifts-data.ts` → giữ types + `SHIFT_STATUS_LABELS`.
- `apps/staffing-saas/app/components/shifts/shifts-templates.ts` → mới: pool template.
- `apps/staffing-saas/app/components/shifts/shifts-generator.ts` → mới: generator + helpers.
- `SHIFTS` const → thay bằng `generateShifts()` call (chỉ dùng cho fallback/test).

## 8. Components inventory

### ✅ Có sẵn trong `@mvp-ui/ui`
- `DateRangePicker`, `DatePicker`, `InputDate` — date nav
- `Tabs` (pill, horizontal) — segmented control view toggle
- `Modal` — dialog chi tiết
- `Drawer` — fallback nếu cần
- `MultiSelect` — filter customer/site
- `Checkbox` — filter status
- `Slider` — pay rate range
- `ProgressBar` — fill ratio
- `Badge`, `BadgeWithDot`, `BadgeWithButton` — status pill + removable filter chip
- `Button`, `ButtonUtility` — actions
- `Input` — search
- `Tooltip` — short hover info
- `EmptyState` — no results state
- `Card` — shift card base
- `Breadcrumbs` — page nav
- `LoadingIndicator` — loading

### ⚠️ Thiếu / cần build hoặc verify

| Component | Status | Plan |
|---|---|---|
| `Popover` (rich content, hover-triggered) | **Thiếu** — chỉ có `Tooltip` (text) và `Dropdown` (click) | Build wrapper từ Radix Popover hoặc dùng `Dropdown` với `openOnHover` prop. Kiểm tra `dropdown.tsx` có support chưa. |
| `Skeleton` loader | **Thiếu** export | Build từ `<div className="animate-pulse bg-bg-secondary rounded">`, hoặc dùng `LoadingIndicator` |
| `SegmentedControl` | Dùng `Tabs` variant=`pill` được | OK |
| `CollapsibleSection` (filter group) | Có `accordion.tsx` | Dùng Accordion |
| `FilterSidebar` shell (collapse rail) | **Thiếu** | Build trong `apps/staffing-saas`, không cần đẩy lên `@mvp-ui/ui` |
| `WeekNavigator` (prev/next/today + date) | **Thiếu** composite | Compose từ `Button` + `DateRangePicker` trong app |
| `ShiftCalendarGrid` (week/day/customer) | **Thiếu** | Build trong app, không generic |
| `ShiftCard` | **Thiếu** | Build trong app |
| Time utilities (week math, format) | Chưa có dep | Add `date-fns` hoặc dùng native |

### Quyết định
- Composite/feature components (`FilterSidebar`, `ShiftCalendarGrid`, `ShiftCard`, `WeekNavigator`) build **trong app** `apps/staffing-saas/app/components/shifts/`, không đẩy lên design system (quá đặc thù).
- `Popover` nếu cần generic → build trong `packages/ui`. Trước khi build, verify `dropdown.tsx` xem support hover trigger không.
- `Skeleton` → cân nhắc add vào `packages/ui` vì là primitive thường dùng.

## 9. Files structure (đề xuất)

```
apps/staffing-saas/app/components/shifts/
├── ShiftsPage.tsx               (giữ — view Bảng)
├── ShiftsCalendarPage.tsx       (mới — entry view Lịch, default)
├── shifts-data.ts               (giữ — types + labels)
├── shifts-templates.ts          (mới — template pool)
├── shifts-generator.ts          (mới — generator + utils)
├── calendar/
│   ├── WeekView.tsx
│   ├── DayView.tsx
│   ├── CustomerView.tsx
│   ├── ShiftCard.tsx
│   ├── ShiftQuickView.tsx       (popover content)
│   ├── ShiftDetailModal.tsx
│   └── WeekNavigator.tsx
└── filter/
    ├── FilterSidebar.tsx
    ├── FilterChips.tsx          (active chips bar)
    └── filter-state.ts          (URL <-> filter state)
```

## 10. Phases

### Phase 1 — Calendar + Filter (MVP demo)
1. Generator data + templates (cover đủ status/customer/site, đa khung giờ)
2. Layout shell: header (scope + view tabs) + grid + sidebar (collapse + badge)
3. **WeekView** + ShiftCard + hover popover + click modal
4. Customer scope picker (multi, prominent header)
5. FilterSidebar: search, region, status, fill preset, khung giờ
6. Active filter chips bar
7. Empty / loading / "+N ca khác" states
8. Toggle sang `Bảng` (giữ ShiftsPage cũ)

### Phase 2 — Extra views demo
1. **DayView** (timeline 06–22h)
2. **MonthView** (grid 5–6 tuần, count + dot status) — demo để đánh giá
3. **CustomerView** (resource grid, customer = rows)
4. URL state sync (`?view=&date=&customer=&filters=`)

### Phase 3 — Nâng cao (sau đánh giá)
1. Save filter preset
2. Drag-drop assign worker
3. Quick create ca từ empty cell
4. Multi-day shift bar (span ngang)
5. Quyết định invest sâu cho MonthView nếu Ops thấy useful

## 11. Decisions chốt (2026-05-21)

- ✅ Default view = **Tuần** (Calendar 7 cột), tuần bắt đầu **Thứ Hai**
- ✅ **Tháng** view: build demo, đánh giá usefulness → quyết định invest real sau
- ✅ Sidebar collapse rail 56px hiện **dot badge số filter sidebar đang active** (không tính scope)
- ✅ Collapse trigger: **nút chevron `«`/`»` trên top sidebar**
- ✅ Customer = **scope selector header**, mandatory
- ✅ Customer scope: **single-select** ở Week/Day/Month, **multi-select** chỉ ở Theo KH view
- ✅ Persist scope: **URL `?customer=` + localStorage fallback**
- ✅ Bỏ pay rate filter, bỏ date range sidebar, bỏ headcount range
- ✅ Filter list final theo §6
- ✅ Toggle `Bảng` gộp chung tabs view (Tuần/Ngày/Tháng/Theo KH/**Bảng**)
- ✅ Generator data window: **±4 tuần** quanh `today` (~9 tuần, ~500 ca)

## 13. Hard constraints (nhắc lại từ CLAUDE.md)

- Token-only (no hardcoded color/spacing).
- Tailwind v4 canonical data variant.
- Semantic flipping aliases (`bg-bg`, `text-fg`, ...), không dùng raw `gray-*` etc.
- Dark-safe → `pnpm lint:dark` phải pass.
- Component không vào `@mvp-ui/ui` không cần demo page trong `apps/docs`.
- Nếu add `Popover` / `Skeleton` vào `packages/ui` → bắt buộc demo page + entry trong `packages/skill/components.md` + changeset.
