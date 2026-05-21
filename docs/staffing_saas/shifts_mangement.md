# Lịch làm việc (Shifts Management) — Plan

> Trang `/shifts` redesign sang calendar view, có filter sidebar bên phải. Bảng giữ làm view phụ tại `/shifts/list`.

**Status: Phase 1 DONE (2026-05-21).** Calendar Tuần + Filter sidebar + Detail modal + Bảng toggle đã build và verify trên dev. Phase 2 (DayView + Theo KH + URL sync) chưa làm.

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
│ R2: Tabs view: Tuần | Ngày | Theo KH | Bảng             │  300px    │
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
- **Week / Day view**: chỉ chọn 1 KH (single-select). Muốn compare nhiều KH → đổi view `Theo KH`.
- **Theo KH view**: multi-select bật, customer trở thành rows.
- **Persist**: localStorage (Phase 1 done). URL `?customer=<id>` sync (Phase 2).
- Default lần đầu = first customer trong list.

## 3. View modes

### 3.1. Tuần (default) — DONE

- 7 cột Thứ Hai → Chủ Nhật.
- Mỗi cột header: gradient brand 700→900 (dark mode: brand 500→700), text trắng, weekday + ngày + count badge.
- Today: header inverted (`bg-bg` + ring brand), date text brand color.
- Past days: `opacity-65`.
- Body cột: subgrid 4 invisible row (sáng / chiều / tối / đêm) → cards cùng khung giờ align ngang nhau across days.
- Border-r giữa các cột.
- Footer cột: stat card (Thiếu, Đã/Cần, Fill rate%).
- Tổng tuần: count "X ca trong tuần" trên đầu grid.

### 3.2. Ngày — Phase 2

Timeline 06:00 → 22:00 với rows giờ. `ShiftCard` đặt absolute theo `startAt`/`endAt`, overlap → side-by-side.

### 3.3. Theo Khách hàng (resource view) — Phase 2

**Mục đích**: so sánh độ phủ ca giữa nhiều khách hàng cùng tuần. Đảo lại layout Tuần — thay vì 1 customer × 7 ngày, view này hiện **nhiều customer × 7 ngày**.

```
              T2     T3     T4     T5     T6     T7     CN
─────────────────────────────────────────────────────────
GHN Sorting  [card] [card] [card] [card] [card]  ∅     ∅
Ninja Van    [card] [card] [card] [card] [card] [card] [card]
Shopee       [card] [card] [card] [card] [card]  ∅     ∅
Lazada        ∅      ∅     [card] [card] [card] [card]  ∅
...
```

- Rows = customer (sticky bên trái khi scroll ngang).
- Cols = 7 ngày trong tuần.
- Cell = mini ShiftCard compact (chỉ giờ + fill ratio).
- Header customer scope multi-select bật (chọn 2–3 customer để compare).
- Use case: Ops manager nhìn lướt tuần — KH nào đang thiếu coverage ở ngày nào.

## 4. ShiftCard — anatomy (DONE)

```
┌──────────────────────────────────┐
│ 08:00 – 17:00          [Avatar●] │  ← time + operator avatar (xs) + status dot corner
│ Ca bán hàng cuối tuần            │  ← name (truncate)
│ Vincom Đồng Khởi                 │  ← site (truncate)
│ ▰▰▰▰▱▱           14/18           │  ← progress + ratio
└──────────────────────────────────┘
```

V3 layout: avatar top-right combine operator + status (dot bottom-right corner trên avatar).

States:
- Default: `border-border-secondary`
- Hover: `border-border-brand` + shadow-sm
- Selected (modal open): `ring-2 ring-border-brand`
- Critical: left border `border-l-4 border-l-border-error`
- Past (ca đã qua): `opacity-60`
- Cursor pointer trên toàn card
- Hover popover (rich content) — Phase 2 (cần build `HoverCard` trong `packages/ui`)

## 5. Interaction model

| Action | UX | Status |
|---|---|---|
| Hover avatar | Native `title` tooltip "Tên · Trạng thái" | ✅ done |
| Click card | Modal Dialog overlay — full shift detail + link `/shifts/[id]` | ✅ done |
| Click `Bảng` | Navigate `/shifts/list` (cũ) | ✅ done |
| Click `Chuyển về Lịch` (trên /shifts/list) | Navigate `/shifts` | ✅ done |
| Date nav `<` `>` | Tuần hiện tại ± 7 ngày | ✅ done |
| `Tuần này` | Reset về tuần chứa `today` | ✅ done |
| Sidebar collapse | Toggle 300px ↔ 56px icon rail | ✅ done |
| Filter live | Debounce ~realtime trên search/select | ✅ done |
| Hover card → rich popover | Quick view + actions | Phase 2 |
| Click empty day → `+ Tạo ca` | Drawer/Modal create flow | Phase 3 |
| URL state sync | `?view=&date=&customer=&filters=` share/refresh giữ nguyên | Phase 2 |

## 6. Filter list (CHỐT)

### 6.1. Header — scope (mandatory, không tính là filter)

| Field | Component | Default | Behavior |
|---|---|---|---|
| **Khách hàng** | Single-select (Week/Day) hoặc MultiSelect (Theo KH) | localStorage → first customer | Single-only ở Week/Day. Multi-bật ở `Theo KH` |
| **Tuần** | `<` `>` button + date range pill + `Tuần này` | Tuần chứa `today` | URL `?date=YYYY-MM-DD` (Phase 2) |
| **View** | `Tabs` pill | `Tuần` | Tuần / Ngày / Theo KH / Bảng |

### 6.2. Sidebar — refinement

Width: 300px expanded, 56px collapsed (icon rail có **dot badge số filter sidebar đang active**, không tính scope).

Sticky, scroll riêng. Live update debounce 200ms. Không Apply button.

| # | Section | Component | Notes | Status |
|---|---|---|---|---|
| 1 | Tìm kiếm | `Input` + icon | Tên/code ca/site, realtime | ✅ |
| 2 | Khu vực | `MultiSelect` | Tỉnh/thành: `TP. HCM`, `Hà Nội`, `Bình Dương`, `Đà Nẵng`, `Hải Phòng`, `Cần Thơ` | ✅ |
| 3 | Người điều phối | `MultiSelect` + avatar | Operator chịu trách nhiệm vận hành ca | ✅ |
| 4 | Trạng thái | `Checkbox` group | open / filling / critical / full / closed | ✅ |
| 5 | Tiến độ fill | Chip preset (multi) | `Thiếu gấp <50%` · `Đang lấp 50–99%` · `Đủ 100%` | ✅ |
| 6 | Khung giờ | Chip preset (multi) | `Sáng 06–12` · `Chiều 12–18` · `Tối 18–22` · `Đêm 22–06` | ✅ |
| 7 | Footer | `Button` | `Xóa lọc` (clear sidebar only, không clear scope) | ✅ |

**Note**: Filter theo **Region** (tỉnh/thành) thay vì liệt kê từng site — gọn hơn khi có hàng trăm site. Site cụ thể vẫn hiển thị trên card + popover. Search input vẫn tìm được theo tên site nếu cần precise.

**Data impact**: `ShiftRecord` cần thêm field `region: string` (vd: `"TP. HCM"`, `"Hà Nội"`). Generator/templates parse từ `address` hoặc gán explicit theo site.

### 6.3. Đã loại

- ~~Pay rate range~~ — Ops không filter theo pay rate (đó là worker concern). Pay rate vẫn show trên card/popover.
- ~~Khoảng ngày trong sidebar~~ — duplicate với week nav. Cần xem nhiều tuần → đổi view `Tháng`.
- ~~Required headcount range~~ — ít actionable, dùng Fill % thay.
- ~~Loại ca weekday/weekend~~ — derive được từ ngày tuần, không cần filter riêng.
- ~~Site/Địa điểm~~ — thay bằng **Region** (coarser, ít noise). Site detail vẫn trên card; search input lo precise lookup.
- ~~Lưu preset~~ — Phase 3, không phải MVP.

### 6.4. Active filter chips — DONE

Dưới header, render `BadgeWithButton` cho từng filter sidebar đang bật. Click ✕ → remove riêng. `[Xóa tất cả]` button cuối hàng.

Chip **không** hiện scope (customer/week/view) — đó là state riêng trên header.

Chip color convention:
- Search: gray
- Khu vực: brand
- Trạng thái: theo status color (warning/success/error/gray)
- Tiến độ fill: gray
- Khung giờ: gray
- Người điều phối: indigo

## 7. Demo data strategy — DONE (không bị outdated)

### Vấn đề
`SHIFTS` hardcode date tuyệt đối `24/05/2026 08:00`. 1 tháng sau truy cập → toàn ca quá khứ → calendar trắng.

### Giải pháp: Generator anchored vào `today`

Template pool ~24 templates (đa dạng status / customer / site / khung giờ / weekday-weekend). Generator anchor vào `new Date()`, build absolute dates từ `dayOffsets` trong template + `startHour/endHour`. Rolling window ±4 tuần quanh today → ~500 ca.

Deterministic id = `${templateId}-YYYYMMDD` → cùng tuần truy cập = cùng shift = no flicker.

### Files đã build

- `shifts-data.ts` — types + `SHIFT_STATUS_LABELS` + `REGION_OPTIONS` + `OPERATORS` const + `SHIFTS = generateShifts(new Date())`.
- `shifts-templates.ts` — pool 24 templates (5 customers × multi sites × 4 time-windows).
- `shifts-generator.ts` — generator + `pickOperator()` deterministic + `instantiate()` + `resolveStatus()`.
- `calendar/lib/date-utils.ts` — minimal date helpers (no `date-fns` dep).

## 8. Components inventory — actual usage

### Dùng từ `@mvp-ui/ui` (Phase 1)
- `Tabs` (pill, sm) — view selector
- `Modal`, `Dialog`, `ModalOverlay`, `ModalHeader`, `ModalBody`, `ModalFooter` — detail modal
- `MultiSelect`, `SelectItem` — filter region + operator
- `Select`, `SelectItem` — customer scope picker
- `Checkbox` — filter status group
- `ProgressBarBase` — fill bar (ShiftCard + footer + modal)
- `Badge`, `BadgeWithButton` — modal status + active filter chips
- `Button`, `ButtonUtility` — actions, sidebar collapse
- `Input` — search
- `Avatar` — operator (xs/sm/md), with src + initials fallback
- `EmptyState` — placeholder empty week / coming-soon views

### Composites build trong app (apps/staffing-saas/app/components/shifts/)
- `ShiftsCalendarPage.tsx` — orchestrator
- `calendar/WeekView.tsx` — grid 7-col + subgrid 4 bucket rows + footer row
- `calendar/ShiftCard.tsx` — V3 card (avatar top-right + status corner)
- `calendar/ShiftDetailModal.tsx` — full detail dialog
- `calendar/WeekNavigator.tsx` — `<` `>` + date pill + `Tuần này`
- `calendar/CustomerScopePicker.tsx` — Select wrapper với icon prefix
- `filter/FilterSidebar.tsx` — expandable 300px / collapsed 56px rail
- `filter/FilterChips.tsx` — active filter chips bar
- `calendar/lib/date-utils.ts` — date helpers (no `date-fns` dep)
- `calendar/lib/cn.ts` — local className joiner
- `calendar/lib/filter-state.ts` — types + apply + extractors

### Defer / Phase 2
- `HoverCard` primitive trong `packages/ui` — rich hover popover (cần Radix `@radix-ui/react-hover-card`). Hiện dùng native `title` tooltip cho avatar.
- `Skeleton` loader — chưa cần, data sync generate xong ngay.

## 9. Files structure — built

```
apps/staffing-saas/app/(workspace)/shifts/
├── page.tsx                     → renders <ShiftsCalendarPage />
├── list/page.tsx                → renders <ShiftsPage /> (view Bảng)
└── [id]/page.tsx                → existing detail page

apps/staffing-saas/app/components/shifts/
├── ShiftsPage.tsx               (kept — Bảng view, có `Chuyển về Lịch` link)
├── ShiftsCalendarPage.tsx       (orchestrator: state + layout shell)
├── ShiftsDetailPage.tsx         (existing detail)
├── shifts-data.ts               (types + labels + OPERATORS + REGION_OPTIONS + SHIFTS generated)
├── shifts-templates.ts          (24 templates)
├── shifts-generator.ts          (anchored generator, ±4 tuần)
├── calendar/
│   ├── WeekView.tsx             ✅ (subgrid + bucket rows + footer)
│   ├── ShiftCard.tsx            ✅ (V3 layout)
│   ├── ShiftDetailModal.tsx     ✅
│   ├── WeekNavigator.tsx        ✅
│   ├── CustomerScopePicker.tsx  ✅
│   └── lib/
│       ├── date-utils.ts        ✅
│       ├── cn.ts                ✅
│       └── filter-state.ts      ✅ (types + apply + extractors)
└── filter/
    ├── FilterSidebar.tsx        ✅
    └── FilterChips.tsx          ✅

apps/staffing-saas/public/
├── header-mock.html             (visual sandbox — column header variants A1–A6, B, C)
└── card-mock.html               (visual sandbox — ShiftCard avatar placement V1–V8)
```

## 10. Phases

### Phase 1 — Calendar + Filter (MVP demo) — ✅ DONE
1. ✅ Generator data + templates (24 templates × ±4 tuần × deterministic ids)
2. ✅ Layout shell: header (scope + view tabs) + grid + sidebar (collapse + active badge)
3. ✅ WeekView + ShiftCard (V3 avatar+status) + click modal
4. ✅ Customer scope picker (single-select, header prominent, localStorage persist)
5. ✅ FilterSidebar: search, region, operator, status, fill preset, khung giờ
6. ✅ Active filter chips bar
7. ✅ Empty state (no shifts week) + coming-soon placeholder cho views khác
8. ✅ Toggle `Bảng` — link `/shifts/list` render `ShiftsPage` cũ
9. ✅ ColumnFooter stats (Thiếu / Đã+Cần / Fill rate)
10. ✅ Operator field + filter + avatar real (pravatar.cc)
11. ✅ Dark mode tested — column header gradient swap stops via `dark:` variant

### Phase 2 — Extra views + URL persist
1. **DayView** (timeline 06–22h)
2. **CustomerView** (resource grid, customer = rows, multi-select bật)
3. URL state sync (`?view=&date=&customer=&filters=`)
4. Rich hover popover (build `HoverCard` primitive trong `packages/ui`)

### Phase 3 — Nâng cao
1. Save filter preset
2. Drag-drop assign worker
3. Quick create ca từ empty cell (`+ Tạo ca`)
4. Multi-day shift bar (span ngang)
5. Bulk select + bulk action

## 11. Decisions chốt (2026-05-21)

- ✅ Default view = **Tuần** (Calendar 7 cột), tuần bắt đầu **Thứ Hai**
- ❌ **Bỏ Tháng view** — không invest (giảm scope)
- ✅ Sidebar collapse rail 56px hiện **dot badge số filter sidebar đang active**
- ✅ Collapse trigger: nút chevron `«`/`»` trên top sidebar
- ✅ Customer = scope selector header, mandatory
- ✅ Customer scope: single-select ở Week/Day, multi-select ở Theo KH
- ✅ Persist scope: **localStorage** (Phase 1). URL sync Phase 2.
- ✅ Bỏ pay rate filter, bỏ date range sidebar, bỏ headcount range
- ✅ Filter list final theo §6 (thêm Operator filter)
- ✅ Toggle `Bảng` = link sang `/shifts/list` (giữ ShiftsPage cũ riêng route)
- ✅ Generator data window: ±4 tuần quanh `today`
- ✅ Column header: gradient brand-700→brand-900 (light) / brand-500→brand-700 (dark), text-white
- ✅ ShiftCard avatar layout = **V3** (avatar top-right + status dot corner)
- ✅ Operator field + filter — avatar dùng pravatar.cc demo
- ✅ Avatar status indicator dùng dot (replace text badge để tránh overflow trong col hẹp)

## 12. Hard constraints (nhắc lại từ CLAUDE.md)

- Token-only (no hardcoded color/spacing).
- Tailwind v4 canonical data variant.
- Semantic flipping aliases (`bg-bg`, `text-fg`, ...), không dùng raw `gray-*` etc.
- Dark-safe → `pnpm lint:dark` phải pass.
- Component không vào `@mvp-ui/ui` không cần demo page trong `apps/docs`.
- Nếu add `Popover` / `Skeleton` vào `packages/ui` → bắt buộc demo page + entry trong `packages/skill/components.md` + changeset.
