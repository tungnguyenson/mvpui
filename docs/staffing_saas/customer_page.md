# Customer Detail Page — Content & UI Structure

Source: legacy ops screenshots in `resources/ops-screenshots/customers/`. Target: rebuild as a staffing-saas demo page using `@mvp-ui/ui` + design tokens (no raw color/spacing).

Locale: Vietnamese (mirror copy verbatim from legacy where shown). Currency: VND. Date format: `DD/MM/YYYY`. Time range format: `HH:mm → HH:mm`.

---

## 1. Page header (above tabs)

Sticky block on top of every tab.

| Element | Source field | UI treatment |
|---|---|---|
| Brand logo | `customer.logoUrl` | 64×64 rounded-md tile; fallback = monogram on `bg-brand-solid` |
| Brand name | `customer.brandName` (e.g. `GHN Fulfillment`) | Page title, `text-xl font-semibold text-fg`. Not shown as plain text in legacy header — comes from Tổng quan; surface here to anchor breadcrumb. |
| Active flag | `customer.status` | Badge dot + label: `● Active` (success). Pause / pilot variants reuse status colors. |
| Service tags | `customer.serviceTags[]` | Row of `Badge type="pill-color" color="success" size="sm"`. Examples: `SaaS ATS - Quản lý Tuyển dụng ATS/Free`, `On-demand Staffing - Kết nối và quản lý CTV thời vụ Staffing/Enterprise`. |
| Breadcrumb | route | `Home / Quản lý công ty / Chi tiết` (visible in legacy on edit screen) |

---

## 2. Tabs

Order matches legacy:

1. **Tổng quan** — Overview (screenshot: `overview.jpg`)
2. **Gói dịch vụ** — Service Packages — **TBD (no screenshot)**
3. **Ví công ty** — Company Wallet — **TBD (no screenshot)**
4. **Quản lý user** — Users (`users.jpg`)
5. **Cấu hình chi trả & phí** — Pay & Fee Config (`price_config.jpg`, `price_config_detail.jpg`)
6. **Cấu hình đối soát** — Reconciliation Config (`reconcilliation_config.jpg`)

Tab bar: underline-style, active tab `text-fg-brand` + bottom `border-border-brand`, inactive `text-fg-secondary`.

---

## 3. Tab — Tổng quan

Stack of section cards. Each card: bordered, `bg-bg`, header row with title + optional action button on right.

### 3.1 Card — `Thông tin công ty`
Action: `Chỉnh sửa` (`Button color="primary" size="sm"`, top-right).

| Label | Field | Notes |
|---|---|---|
| Tên thương hiệu | `brandName` (e.g. `GHN Fulfillment`) | plain text, semibold |
| URL key | `urlSlug` (e.g. `https://viec.co/viec-lam/giao-hang-nhanh`) | rendered as external link, `text-fg-brand`, leading `↗` icon |

Layout: two-column key/value rows, label `text-fg-tertiary` left ~200px, value `text-fg` right.

### 3.2 Card — `Thông tin xuất hoá đơn`
No action button.

| Label | Field |
|---|---|
| Tên đăng kí kinh doanh | `legalName` |
| Mã số thuế | `taxId` |
| Địa chỉ đăng kí kinh doanh | `legalAddress` |
| Email nhận HĐĐT | `invoiceEmail` |

### 3.3 Card — `Thông tin quản lý`

| Label | Field | Render |
|---|---|---|
| Tình trạng hoạt động | `operationalStatus` | text `Đang hoạt động` |
| Tình trạng xác thực | `verificationStatus` | text `Kích hoạt` (reuse `CUSTOMER_VERIFICATION_LABELS`) |
| Loại công ty | `companyType` | e.g. `Khách hàng` |
| Quy mô | `companySize` | e.g. `Big Corp` |
| Lĩnh vực | `industry` | nullable → `(chưa có)` (muted) |
| Công ty Quan trọng | `isKeyAccount` | boolean → orange checkbox icon when true |
| Account Manager | `accountManager.name` | plain text |
| Hubspot Profile | `hubspotUrl` | nullable → `(chưa có)` muted; otherwise link |

### 3.4 Card — `Thông tin hợp đồng & phụ lục`
Action: `Tải lên` (primary, top-right, upload icon).

Table — six columns:

| # | Header | Field |
|---|---|---|
| 1 | Tên tài liệu | `document.name` |
| 2 | Loại | `document.type` |
| 3 | Thời gian áp dụng | `document.validFrom → validTo` |
| 4 | Điều khoản gia hạn | `document.renewalTerm` |
| 5 | Ghi chú | `document.note` |
| 6 | Khởi tạo | `document.createdAt` |

Empty state: centered envelope icon + `No Data` label.

### 3.5 Card — `Ghi chú`
Inline editable field. Default `Chưa cập nhật` (muted, bold), trailing pencil icon to enter edit mode.

---

## 4. Tab — Gói dịch vụ (TBD)

No screenshot provided. Placeholder structure pending:
- expected: list of subscribed service packages (e.g. SaaS ATS, On-demand Staffing) each with plan tier, billing cycle, seat count, status.
- request screenshot before building.

---

## 5. Tab — Ví công ty (TBD)

No screenshot provided. Placeholder structure pending:
- expected: wallet balance, top-up history, payout method, transactions table.
- request screenshot before building.

---

## 6. Tab — Quản lý user

Filter bar (above table):

| Input | Type | Placeholder |
|---|---|---|
| Tên | text + search icon | `Please enter` |
| Email | text | `Please enter` |
| Số điện thoại | text | `Please enter` |

Buttons right-aligned: `Reset` (secondary) + `Query` (primary).

Table columns:

| # | Header | Field |
|---|---|---|
| 1 | Tên | `user.fullName` |
| 2 | Email | `user.email` |
| 3 | Số điện thoại | `user.phone` |

Footer: page size selector (`20 / trang`), `1-N of N items` count, prev/next + page-number control.

No row actions in legacy view (read-only listing). Surface a `Thêm user` primary button top-right of the card (consistent with other tabs that have a `Thêm` action).

---

## 7. Tab — Cấu hình chi trả & phí

### 7.1 List view (`price_config.jpg`)

Filter bar (six controls, single row):

| Input | Type | Placeholder |
|---|---|---|
| Mã | text + search icon | `Mã` |
| Tên cấu hình | text + search icon | `Tên cấu hình` |
| Tỉnh thành | select | `Tỉnh thành` |
| Danh mục | select | `Danh mục` |
| Loại việc | select | `Loại việc` |
| Phân loại dịch... | select | `Phân loại dịch...` |
| Trạng thái | select | `Trạng thái` |

Top-right action: `Thêm cấu hình` (primary).

Table columns:

| # | Header | Field | Render |
|---|---|---|---|
| 1 | # | `config.id` | int |
| 2 | Tên cấu hình | `config.name` | e.g. `CTV kho - Hưng Yên` |
| 3 | Thời gian áp dụng | `config.appliedFrom → appliedTo` | `DD/MM/YYYY - DD/MM/YYYY` |
| 4 | Tỉnh thành | `config.province` | e.g. `Hưng Yên` |
| 5 | Loại việc | `config.jobType` | e.g. `CTV Làm việc kho` |
| 6 | Phân loại dịch vụ | `config.serviceClass` | e.g. `Linh hoạt` |
| 7 | Trạng thái | `config.status` | Badge — `Đang hoạt động` (success) / `Ngừng hoạt động` (error) |
| 8 | (action) | — | `Chi tiết` link in `text-fg-brand` |

Pagination footer identical to Users tab.

### 7.2 Detail / edit view (`price_config_detail.jpg`)

Page header: breadcrumb `Home / Quản lý công ty / Chi tiết / Cập nhật cấu hình` → title `Cập nhật cấu hình giá & phí - GHN Fulfillment` (`text-xl font-semibold`).

Form sections (single column, no card chrome between groups — divider on `Cấu hình chi trả & mức phí` block):

**Required field marker:** red asterisk prefix.

**Section A — identifying fields** (stacked, full-width inputs):

| Label | Input | Value example |
|---|---|---|
| *Tên cấu hình | text | `CTV kho - Hưng Yên` |
| *Tỉnh / Thành phố | select (disabled, locked after create) | `Hưng Yên` |
| *Danh mục | select (disabled) | `Kho bãi` |
| *Loại việc | select (disabled) | `CTV Làm việc kho` |

**Section B — `Cấu hình chi trả & mức phí`**

Table editor with fixed row labels (shift type) and editable numeric columns:

| Row label | Mức chi trả (VNĐ / giờ) | Mức phí (VNĐ / giờ) | GM0 | Tỷ trọng dự kiến | Tỷ trọng thực tế L30 |
|---|---|---|---|---|---|
| *Ca ngày thường | `40.000` | `47.000` | `15%` | N/A | N/A |
| *Tăng ca ngày thường | `40.000` | `47.000` | `15%` | N/A | N/A |
| *Ca đêm - ngày thường | `45.000` | `52.000` | `13%` | N/A | N/A |
| *Tăng ca đêm - ngày thường | `45.000` | `52.000` | `13%` | N/A | N/A |
| *Ca ngày lễ | `45.000` | `52.000` | `13%` | N/A | N/A |
| *Ca đêm ngày lễ | `45.000` | `52.000` | `13%` | N/A | N/A |

Numeric inputs use `vi-VN` grouping (`.` separator). `GM0` is percent. Last two columns read-only (`N/A`).

**Section C — schedule + meta**

| Label | Input | Notes |
|---|---|---|
| *Cấu hình ca đêm | dual time picker | `22:00 → 06:00` |
| *Thời gian áp dụng | dual date picker | `2026-03-01 → 2026-12-31` |
| Cấu hình ca ngắn | select | placeholder `Chọn` |
| Hợp đồng / Phụ lục HĐ | combo / lookup | placeholder `Chọn Hợp đồng / Phụ lục HĐ` |
| Ghi chú yêu cầu về CTV / LĐ | textarea | placeholder `Nhập ghi chú yêu cầu về CTV / LĐ` |
| Mô tả công việc | textarea | placeholder `Nhập mô tả công việc` |
| Ghi chú nội bộ | textarea | placeholder `Nhập ghi chú nội bộ` |
| Áp dụng chính sách Vi phạm huỷ ca | toggle | on by default (orange) |
| *Phân loại dịch vụ | select | `Linh hoạt` |
| *Link báo giá / mô hình phí | text (URL) | `https://ops.viec.co/companies/2/pricing-con…` |
| Ảnh cấu hình bảng giá từ hợp đồng | file upload | `Tải lên` button (upload icon) |

**Footer block:**
- `Trạng thái: Đang hoạt động ✎` — inline editable status with pencil affordance.
- Primary action: `Cập nhật` (disabled state shown in screenshot — enables on dirty form).

---

## 8. Tab — Cấu hình đối soát

Five stacked cards. Each card with right-aligned `Chỉnh sửa` (secondary) action except `Đầu mối liên hệ` (which uses `Thêm` primary).

### 8.1 `Chu kỳ đối soát`

| Label | Field |
|---|---|
| Số lượng chu kỳ / tháng | `cycle.perMonth` |
| Ngày bắt đầu | `cycle.startDay` |
| Ngày kết thúc | `cycle.endDay` |

Default empty: `Chưa cập nhật` (bold, dark).

### 8.2 `Hồ sơ thanh toán & Hóa đơn`

| Label | Field | Notes |
|---|---|---|
| Thời hạn ra sao kê | `statement.dueRule` | |
| Thời hạn ra hóa đơn | `invoice.dueRule` | |
| Thời điểm tính công nợ | `debt.cutoffRule` | |
| Thời hạn thanh toán (ngày) | `payment.termDays` | int |
| Cách thức xuất hóa đơn | `invoice.issuanceMethod` | |
| File mẫu, hướng dẫn | `templateFile` | shown muted (`Chưa cập nhật`) when null |
| Link file mẫu, hướng dẫn | `templateLinkUrl` | bold link or `Chưa cập nhật` |
| Hồ sơ thanh toán gồm | `payment.requiredDocs[]` | checklist / multi-select |

### 8.3 `Đầu mối liên hệ`
Action: `Thêm` (primary, top-right of card).

Table columns:

| # | Header | Field |
|---|---|---|
| 1 | Chức năng | `contact.role` |
| 2 | Họ Tên | `contact.fullName` |
| 3 | Số điện thoại | `contact.phone` |
| 4 | Email | `contact.email` |
| 5 | Địa điểm phụ trách | `contact.coverageArea` |
| 6 | Hành động | edit / delete icon buttons |

Empty state: centered `Không có dữ liệu`.

### 8.4 `Kênh làm việc`

| Label | Field |
|---|---|
| Kênh làm việc | `channel.kind` (e.g. Zalo, Teams) |
| Link tham gia nhóm booking | `channel.bookingGroupUrl` |
| Link tham gia nhóm đối soát | `channel.reconciliationGroupUrl` |

### 8.5 `Ghi chú`

| Label | Field |
|---|---|
| Ghi chú | `notes` — default `Chưa cập nhật` |

---

## 9. Cross-cutting UI conventions

- **Card chrome:** `rounded-xl border border-border-secondary bg-bg shadow-xs`. Header row uses `border-b border-border-secondary px-5 py-4`. Body padding `p-5`.
- **Label column:** `text-sm text-fg-tertiary`, fixed width ~200–240px on ≥`md`. Value `text-sm text-fg`, semibold for highlighted values.
- **Empty/null value:** literal `Chưa cập nhật` rendered semibold-dark, **or** `(chưa có)` muted italic — match legacy: required-but-missing → bold, optional-missing → muted.
- **Status badges:** `Đang hoạt động` → `Badge color="success"`; `Ngừng hoạt động` → `Badge color="error"`. Existing tokens in `customers-data.ts` (`CUSTOMER_STATUS_LABELS`, `CUSTOMER_VERIFICATION_LABELS`) cover these.
- **Required field marker:** red asterisk prefix on label — use `text-fg-error`.
- **Primary action button** (`Thêm`, `Chỉnh sửa`, `Cập nhật`, `Query`, `Tải lên`): orange brand (`Button color="primary"`).
- **Secondary action button** (`Reset`, `Chỉnh sửa` on cards in reconciliation tab): `Button color="secondary"`.
- **Inline edit affordance:** pencil icon right of the value, click → swap to input.
- **Tables:** zebra-free, header row `bg-bg-secondary text-fg-tertiary text-xs uppercase`. Pagination control bottom-right; page-size selector left of pager.
- **Filter bar:** `flex flex-wrap gap-3 items-end` with right-aligned action buttons; each control labelled above input.

---

## 10. Data model deltas vs. existing `customers-data.ts`

Existing `CustomerRecord` covers brand, status, contact, hiring requests, shifts, billing snapshot. Missing entities required by these screenshots:

| Tab | New entity / field |
|---|---|
| Tổng quan | `legalName`, `taxId`, `legalAddress`, `invoiceEmail`, `urlSlug`, `companyType`, `companySize`, `isKeyAccount`, `accountManager`, `hubspotUrl`, `serviceTags[]`, `documents[]` (name/type/validFrom/validTo/renewalTerm/note/createdAt), `notes` |
| Quản lý user | `users[]` (fullName, email, phone) |
| Cấu hình chi trả & phí | `pricingConfigs[]` (id, name, province, jobType, category, serviceClass, status, appliedFrom, appliedTo, rates[] per shiftType, nightShiftWindow, shortShiftConfig, contractRef, ctvNote, jobDescription, internalNote, applyCancelPolicy, quoteLink, contractImageUrl) |
| Cấu hình đối soát | `reconciliation.cycle`, `reconciliation.invoiceProfile`, `reconciliation.contacts[]`, `reconciliation.channel`, `reconciliation.note` |

Extend `customers-data.ts` with these types before building the demo page. Keep existing `CustomerHiringRequest` / `CustomerShift` (used elsewhere) untouched.

---

## 11. Build order (suggested)

1. Extend types + seed data in `customers-data.ts`.
2. Rebuild `CustomerDetailPage.tsx` shell: header block + tab bar driven by Radix `Tabs`.
3. Tab 1 (Tổng quan) — five stacked cards, mostly read-only key/value.
4. Tab 4 (Quản lý user) — filter bar + table + pagination.
5. Tab 5 list view (Cấu hình chi trả & phí) — filter bar + table + status badge.
6. Tab 5 detail view — new route `/customers/[id]/pricing/[configId]`.
7. Tab 6 (Cấu hình đối soát) — five cards + nested contacts table.
8. Tabs 2 & 3 — wait for screenshots.

Verify each tab in `apps/staffing-saas` dev server at 1440 + 1024 breakpoints, then dark mode.
