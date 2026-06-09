# Recruitment Form Builder — Implementation Plan

Builder kiểu Google Form cho viec.co: admin tạo form tuyển dụng, người lao động điền form public 1 trang cuộn. Submit = một response (phase sau: tạo Ứng viên).

- **App:** `apps/staffing-saas` (admin builder) + public route `app/f/[slug]` (form công khai).
- **Render public:** generalize trang `worker-app` ReferralPage (1 trang cuộn) → schema-driven.
- **Dữ liệu:** mock + `localStorage` (repo demo, chưa backend).
- **Menu:** thêm item "Form tuyển dụng" trong section "Tuyển dụng" của `_shell/nav.ts`.

> Quyết định: full builder 3 cột · render 1 trang cuộn (reuse ReferralPage CSS) · prototype mock. DnD = `@dnd-kit/*`.

---

## 1. Phạm vi

### Phase 1 (build ngay)
- Builder 3 cột: palette field · canvas (kéo sắp xếp + click-to-add) · panel settings.
- Thư viện field: **smart** (định nghĩa sẵn, UI + validation built-in) + **generic** (text/choice/number/date/file…).
- 4 field core khoá luôn có: Họ tên, SĐT, Giới tính, Xác nhận đủ 18 tuổi (không xoá/không kéo ra).
- Section tùy biến (tiêu đề/mô tả/icon, sắp xếp, kéo field giữa section).
- **Cascade** (bắt buộc): Tỉnh → reset + đổi nguồn option Quận/huyện & Công ty.
- Form-level settings: tên/slug/mô tả, brand `--bp`, bật/tắt hero, progress bar, màn success.
- Preview tab mới · copy URL · xem/tải QR · color picker (customize hiển thị).
- Status: Nháp / Hoạt động / Dừng. Public form chỉ render khi Hoạt động.
- List form (status badge, actions).
- **Conditional `showWhen`** — trong scope nhưng **build CUỐI**, sau khi luồng cơ bản render→save→preview chạy end-to-end.

### Phase 2 (defer — ghi nhận, không build)
Response → tạo Ứng viên (mapping lossy: form gender có "Khác" vs `CandidateRecord` male/female) · bảng responses · export CSV · dedupe theo SĐT · hạn nộp / cap response · status Lưu trữ · nhân bản form · tách draft-vs-live khi publish.

---

## 2. Schema (`form-schema.ts`)

```ts
type FormStatus = "draft" | "active" | "paused";

type FieldKind =
  // smart (domain) — UI + validation built-in
  | "fullname" | "phone" | "gender" | "province" | "district"
  | "company" | "shift" | "jobtype" | "source" | "cccd"
  | "startdate" | "license" | "consent18"
  // generic — cấu hình tự do
  | "short_text" | "paragraph" | "single_choice" | "multi_choice"
  | "dropdown" | "number" | "date" | "yesno" | "rating" | "static_text";

interface FieldOption { id: string; label: string }

interface Field {
  id: string;                 // nanoid; ổn định qua reorder
  kind: FieldKind;
  label: string;              // override nhãn mặc định theo kind
  helpText?: string;
  placeholder?: string;
  required: boolean;
  locked?: boolean;           // 4 core: không xoá/không kéo ra
  options?: FieldOption[];    // generic choice/dropdown
  max?: number;               // cap multi-select (vd districts 3)
  min?: number;
  showWhen?: { fieldId: string; equals: string } | null; // phase cuối
}

interface Section { id: string; title: string; description?: string; icon: string; fields: Field[] }

interface FormSettings { progressBar: boolean; heroEnabled: boolean }
interface SuccessConfig { title: string; message: string }

interface FormConfig {
  id: string;
  slug: string;               // /f/[slug]
  title: string;
  description?: string;
  status: FormStatus;
  brand: string;              // --bp hex
  sections: Section[];
  settings: FormSettings;
  success: SuccessConfig;
  responseCount: number;      // mock
  createdAt: string;
  updatedAt: string;
}
```

**Core fields (locked):** `fullname`, `phone`, `gender`, `consent18`. Khi tạo form mới → seed sẵn 4 field này (consent18 ở section cuối). Builder chặn xoá/di chuyển ra ngoài; chỉ cho đổi label/helpText/required(off với consent18 cấm).

---

## 3. Field registry (`field-registry.ts`)

Metadata tĩnh per-kind — **không** giữ logic phụ thuộc (xem reducer §4). Dùng cho palette + settings panel.

```ts
interface FieldKindMeta {
  kind: FieldKind;
  group: "smart" | "generic";
  defaultLabel: string;
  icon: LucideIcon;           // palette + section
  lockedCore?: boolean;       // fullname/phone/gender/consent18
  hasOptions?: boolean;       // generic choice/dropdown → settings cho sửa options
  supportsRequiredToggle?: boolean;
  defaultConfig: () => Partial<Field>;  // max, options mặc định…
}
```

Smart field option-source (province/district/company/shift/jobtype/source/license) đến từ `data.ts` (copy từ worker-app), **không** nằm trong registry — district/company option phụ thuộc giá trị province (xem §4).

---

## 4. Form state + dependency (điểm khó nhất)

Renderer giữ `values: Record<fieldId, Value>` qua **reducer trung tâm**, không nhét logic phụ thuộc vào từng renderer.

`useFormFill(config)`:
- `values`, `setValue(fieldId, value)`, `errors`, `derivedOptions(field)`, `visible(field)`.
- **Cascade theo `kind`** (không hardcode id): khi `setValue` cho field `kind:"province"` → reset value mọi field `kind:"district"|"company"` cùng form.
- **Derived options:**
  - `district` → `PROVINCES.find(p => p.id === provinceValue)?.districts`
  - `company` → `ACTIVE_BY_PROVINCE[provinceValue]`
  - province field tìm bằng cách quét sibling `kind:"province"`.
- `company`/`district` ẩn (hoặc empty-state "chọn tỉnh trước") khi chưa có province value.
- Cap multi: tôn trọng `field.max`.

`showWhen` (phase cuối): `visible(field)` = `!showWhen || values[showWhen.fieldId] === showWhen.equals`. Field ẩn → **bỏ qua validation**.

Validation (`validate.ts`): duyệt field visible + required → errors. SĐT regex `^0[35789]\d{8}$`. Tái dùng pattern ReferralPage.

---

## 5. Renderer (`FormRenderer.tsx`)

Generalize ReferralPage → `config.sections.map(...).fields.map(<FieldControl/>)`. **Logic mới** (hardcoded → schema-driven), chỉ reuse CSS + field primitives + cấu trúc visual.

- Copy vào module: `referral-form.css` (đổi scope `.ref-stage` → giữ nguyên, dùng class nội bộ), `ReferralFields.tsx` (Chip/Lab/ErrText/UploadBox/SourceGlyph), `SuccessScreen` (generalize từ field values), `data.ts` (provinces/companies/shifts/jobtypes/sources/license).
- `<FieldControl field value onChange options error />` — switch theo `kind`, render bằng primitives.
- Hero off (`heroEnabled:false`) → bỏ `.hero-pane`; `.form-pane` đứng 1 mình trong `.device` 440px (đã verify, không vỡ).
- Public form light-only: giữ `colorScheme: light`; CSS scoped **miễn** `lint:dark`.
- `--bp` = `config.brand`.

---

## 6. Builder (`FormBuilder.tsx` + sub)

3 cột (desktop), dark-safe semantic tokens (`bg-bg`, `text-fg`, `border-border`…), **không** raw scale.

- `FieldPalette.tsx` — nhóm Smart/Generic; click-to-add (chính) + drag (enhance, dnd-kit).
- `FormCanvas.tsx` — render sections + fields; `@dnd-kit/sortable` reorder field & kéo giữa section; chọn field/section → mở settings.
- `FieldSettingsPanel.tsx` — label/helpText/placeholder/required + options (generic) + max + (phase cuối) showWhen. Core field: disable xoá, ràng buộc.
- `SectionEditor.tsx` — thêm/sửa/xoá/sắp xếp section.
- `FormSettingsBar` — tên/slug/brand/hero/progress/status + nút **Xem thử** (flush localStorage rồi `window.open('/f/'+slug)`) + **Chia sẻ** (SharePanel).

**Preview = persisted state:** "Xem thử" phải `saveForm(config)` (ghi `localStorage[rf_forms]`) **trước** `window.open` — tab mới đọc localStorage, không thấy in-memory draft.

DnD: drag-to-add từ palette là enhancement; click-to-add là đường chính (robust). Canvas reorder dùng sortable.

---

## 7. Share (`SharePanel.tsx`)

Reuse pattern `ShareScreen`: `@mvp-ui/ui` `QRCode` (value = URL `/f/slug`), copy link (`toast`), color picker `--bp`, nút tải QR (port `qr-export` nếu cần). Poster = optional, defer nếu hụt thời gian.

---

## 8. Persistence (`forms-data.ts`)

Mock store, 1 key localStorage `rf_forms` = `FormConfig[]`. Seed 1–2 form demo.
- `listForms() / getForm(id) / getFormBySlug(slug) / saveForm(config) / createForm() / deleteForm(id)`.
- SSR-safe: đọc localStorage client-side sau mount (như ReferralPage). Seed fallback khi trống.

---

## 9. Routes & nav

| Route | Component | Shell |
|---|---|---|
| `(workspace)/recruitment-forms/page.tsx` | `RecruitmentFormsPage` (list) | admin |
| `(workspace)/recruitment-forms/[id]/edit/page.tsx` | `FormBuilder` | admin |
| `app/f/[slug]/page.tsx` | `FormRenderer` (public) | **none** (bare) |

`_shell/nav.ts`: thêm `recruitmentForms: "/recruitment-forms"` vào `APP_ROUTES`; item `{ id:"recruitment-forms", label:"Form tuyển dụng", href, icon: FileText }` trong section "Tuyển dụng" (cạnh Ứng viên).

List page bọc `PageScaffold` + `AppPageHeader` (primaryAction "Tạo form"). Builder page full-bleed (3 cột riêng, có thể bỏ scaffold default padding).

Dep mới (`apps/staffing-saas/package.json`): `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`.

---

## 10. File layout (`app/components/recruitment-forms/`)

```
form-schema.ts          types + FormConfig/Field/Section
field-registry.ts       metadata per kind (palette/settings)
data.ts                 copy: provinces/companies/shifts/jobtypes/sources/license
validate.ts             errors từ config+values
useFormFill.ts          values + reducer (cascade) + derived options + visible
referral-form.css       copy referral.css (scoped)
ReferralFields.tsx      copy primitives (Chip/Lab/ErrText/UploadBox)
FieldControl.tsx        switch kind → control
FormRenderer.tsx        render 1 trang cuộn (public)
SuccessScreen.tsx       generalize success
forms-data.ts           localStorage store + seed
RecruitmentFormsPage.tsx list
FormBuilder.tsx         3 cột
FieldPalette.tsx
FormCanvas.tsx
FieldSettingsPanel.tsx
SectionEditor.tsx
SharePanel.tsx
index.ts
```

---

## 11. Thứ tự build

1. schema + registry + data copy + validate.
2. forms-data (persist + seed).
3. renderer (referral-form.css + ReferralFields + FieldControl + useFormFill cascade + SuccessScreen) → `app/f/[slug]`.
4. list page + nav + dep dnd-kit.
5. builder (palette/canvas/settings/section) + preview flush + status.
6. share panel.
7. **showWhen conditional (cuối).**

Mỗi bước giữ chạy được. Verify dev server + dark-safe lint (`pnpm lint:dark`) trước khi đóng.

---

## Status — đã build (Phase 1)

Hoàn tất `apps/staffing-saas/app/components/recruitment-forms/` + routes `(workspace)/recruitment-forms`, `.../[id]/edit`, `app/f/[slug]`. Nav "Form tuyển dụng" trong section Tuyển dụng. Dep `@dnd-kit/*` đã cài.

Verify: `tsc` clean · `biome` clean · `lint:dark` green (semantic tokens, không raw scale) · `next build` green (mọi route compile, RSC OK) · logic test headless (validation, conditional visibility, progress, cascade-ready) pass. Chưa click-through trên trình duyệt (profile Chrome đang bị phiên user khoá).

Phase 2 vẫn defer (xem §1): response→ứng viên, CSV, dedupe, deadline/cap, archive, draft-vs-live.

## 12. Gotchas (đã chốt)
- Cascade ở reducer trung tâm, **không** ở per-field renderer.
- Preview đọc localStorage → flush trước `window.open`.
- Hero-off: form-pane đứng 1 mình OK (verified), public form light-only.
- Builder chrome dark-safe semantic tokens; CSS scoped public miễn lint:dark.
- "Reuse ReferralPage" = reuse CSS + primitives + visual, **logic renderer là mới**.
- `demo-status.md` pre-flight đã xoá (d14fd10) — không recreate.
