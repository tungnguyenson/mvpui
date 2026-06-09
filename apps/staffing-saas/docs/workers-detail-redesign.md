# Worker Detail — Redesign Proposal

Synthesis of the **legacy** worker-profile admin (Bootstrap blue-tab "Xử lý hồ sơ" + "Duyệt thông tin Ứng Viên") into a new `/workers/[id]` detail page that fits the current staffing-saas design system (`@mvp-ui/ui`, purple/underline tabs, dark-safe semantic tokens).

> Status: **shipped**. Replaced the flat-section [WorkerDetailPage](../app/components/workers/WorkerDetailPage.tsx) with a 6-tab profile + the [WorkerDetailTabs](../app/components/workers/WorkerDetailTabs.tsx) client island. Entity shape extended in [workers-data.ts](../app/components/workers/workers-data.ts). Canonical detail-page reference now lives in [workers.md](./workers.md).

---

## 1. Legacy system synthesis

Two screens, one entity (CTV / ứng viên):

### View A — "Xử lý hồ sơ" (eKYC verification)
- Header: `Xử lý hồ sơ {name} (#{id})` + actions `Xác Thực Cấp 1`, `Hủy`.
- eKYC checklist: **eKYC Service · eKYC Fraud Check · eKYC Logic Check · eKYC OCR** (pass/fail).
- Section `Hình CCCD/CMND`: ID-card image + OCR form (số CMND/CCCD, họ tên, ngày sinh, giới tính, ngày cấp, ngày hết hạn, nơi cấp, địa chỉ thường trú, quận/huyện, phường/xã, email).
- Section `Ảnh chân dung`: portrait photo.
- Sticky internal-note panels.

### View B — "Chỉnh sửa - Duyệt thông tin Ứng Viên"
Top tabs + sub-tabs:

| Top tab | Content |
|---|---|
| Thông tin ứng viên | sub: **cơ bản** / **địa chỉ sinh sống** / **tài khoản ngân hàng** / **mã số thuế** / **liên hệ khẩn cấp** |
| Địa chỉ | tỉnh/thành · quận/huyện · phường/xã · địa chỉ sinh sống |
| Công việc | segmented **Đang làm / Đang ứng tuyển / Đã làm** → table: thời gian · công ty · vị trí công việc · số giờ làm |
| Lịch sử hủy ca | shift cancellation log |
| Thanh toán | Phương thức nhận tiền: **Tiền mặt** / **Tài khoản ngân hàng** + VietQR; "Đã duyệt \| Đã kiểm tra bởi {staff}" |
| Mã số thuế | MST TNCN + trạng thái; **Cam kết thuế 2026** (Chưa ký) + `Cập nhật CKT` / `Gỡ Cam kết thuế` |
| Bảo hiểm xã hội | Mã số BHXH |
| Change Log | audit trail |

Sub-tab fields:
- **Tài khoản ngân hàng**: loại TK (Chính chủ / Không chính chủ), ngân hàng, số TK, chủ TK.
- **Liên hệ khẩn cấp**: họ tên người liên hệ, SĐT, mối quan hệ.

---

## 2. Organizing principle — route-aware fold-in vs link-out

The current app already splits several legacy tabs into dedicated `worker-*` routes. **Do not rebuild a workflow that owns a route** — surface a summary + link instead. Only *routeless* concerns become built-out tab content.

| Legacy concern | Owns a route? | Decision |
|---|---|---|
| eKYC / xác thực | `/worker-verifications/[id]` | summary card + link out |
| Vi phạm | `/worker-violations/[id]` | summary card + link out |
| Payment batch | `/worker-payment-batches/[batchId]` | summary card + link out |
| BHXH | `/worker-social-insurance` | summary card + link out |
| CCCD / identity (OCR fields) | — | **build into tab** |
| Địa chỉ cư trú | — | **build into tab** |
| Tài khoản ngân hàng | — | **build into tab** |
| MST + Cam kết thuế | — | **build into tab** |
| Liên hệ khẩn cấp | — | **build into tab** |
| Công việc (đang làm / ứng tuyển / đã làm) | — | **build into tab** |
| Lịch sử hủy ca | — | **build into tab** |
| Change Log | — | **build into tab** |

This honors the legacy IA without scope-exploding into re-implementing five existing modules.

---

## 3. Proposed new IA

Follows the established `*DetailPage` (RSC) + `*DetailTabs` (`"use client"` island) pattern from [CandidatesDetailPage](../app/components/candidates/CandidatesDetailPage.tsx) + [CandidateDetailTabs](../app/components/candidates/CandidateDetailTabs.tsx).

### Header (kept)
Avatar (status overlay) · name · status badge · `{district}, {city} • Gia nhập {joinedAt}` · bio · tag badges.
Actions: `Quay lại danh sách` · `Xử lý hồ sơ` (→ `/worker-verifications/[id]`) · `Giao ca mới` (primary).

### Metric row (kept — 4 `MetricCard`)
Điểm đánh giá · Ca tuần này · Tổng số ca · Batch gần nhất.

### Tabs (`variant="underline"`, `?tab=<id>` per app convention)

| # | Tab (id) | Built / linked | Content |
|---|---|---|---|
| 1 | **Tổng quan** (`overview`) | built | Contact info · snapshot xác thực / vi phạm / thanh toán · "Liên kết nghiệp vụ" cards → 5 modules. (Consolidates today's flat sections.) |
| 2 | **Hồ sơ & CCCD** (`identity`) | built + link | CCCD fields (số, họ tên, ngày sinh, giới tính, ngày cấp/hết hạn, nơi cấp) · placeholder ảnh CCCD + chân dung · eKYC 4-check as badges · link `/worker-verifications/[id]`. |
| 3 | **Địa chỉ & ngân hàng** (`profile`) | built | Cư trú (tỉnh/huyện/xã/địa chỉ) · TK ngân hàng (loại, ngân hàng, số TK, chủ TK) + `QRCode` VietQR · liên hệ khẩn cấp (tên/SĐT/quan hệ). |
| 4 | **Công việc** (`jobs`) | built | Segmented Đang làm / Đang ứng tuyển / Đã làm → table (thời gian · công ty · vị trí · số giờ) · lịch sử ca gần đây (existing `recentShifts`) · `EmptyState` when empty. |
| 5 | **Thanh toán & thuế** (`finance`) | built + link | Phương thức nhận tiền (tiền mặt / TK) · MST TNCN + Cam kết thuế 2026 · summary + link `/worker-payment-batches`, `/worker-social-insurance`. |
| 6 | **Nhật ký** (`activity`) | built + link | Change log timeline · lịch sử hủy ca · vi phạm summary → link `/worker-violations/[id]`. |

---

## 4. Extended entity shape

Additive, optional sub-interfaces matching the existing `WorkerXxxSnapshot` style. Existing fields unchanged — new fields default-populated for all 5 sample workers with realistic VN data.

```ts
interface WorkerIdentity {
  nationalId: string;                  // "079205009871"
  fullNameOnId: string;
  dob: string;                         // "DD/MM/YYYY"
  gender: "Nam" | "Nữ";
  issuedDate: string;                  // "DD/MM/YYYY"
  expiryDate: string;
  issuedPlace: string;                 // "Cục Cảnh sát QLHC về TTXH"
  permanentAddress: string;
  ekyc: {                              // legacy eKYC checklist
    service: boolean;
    fraudCheck: boolean;
    logicCheck: boolean;
    ocr: boolean;
  };
}

interface WorkerResidence {
  province: string;                    // "Hưng Yên"
  district: string;                    // "Huyện Khoái Châu"
  ward: string;                        // "Thị trấn Khoái Châu"
  street: string;                      // "tổ 1"
}

interface WorkerBankAccount {
  ownerType: "Chính chủ" | "Không chính chủ";
  bankName: string;                    // "NH TMCP Quân Đội (MB Bank)"
  accountNumber: string;
  accountHolder: string;               // uppercased
  verified: boolean;                   // "Đã duyệt | Đã kiểm tra bởi {staff}"
  verifiedBy?: string;
}

interface WorkerTaxInfo {
  taxId: string | "Chưa có MST";
  taxStatus: "Đã kiểm tra" | "Chưa kiểm tra";
  commitment2026: "Đã ký" | "Chưa ký";
}

interface WorkerSocialInsurance {
  code: string | null;                 // null = chưa có
}

interface WorkerEmergencyContact {
  name: string;
  phone: string;
  relationship: string;                // "bạn", "mẹ", ...
}

type WorkerJobKind = "current" | "applying" | "done";
interface WorkerJob {
  id: string;
  kind: WorkerJobKind;
  period: string;                      // "01/06 - nay" | "18/05, 08:00-17:00"
  company: string;
  position: string;
  hours: string;                       // "8h" | "—"
}

interface WorkerCancellation {
  id: string;
  date: string;                        // "DD/MM/YYYY"
  shiftName: string;
  reason: string;
  penalty: string;                     // "₫0" | "₫50.000"
}

interface WorkerChangeLogEntry {
  at: string;                          // "DD/MM/YYYY HH:mm"
  actor: string;
  field: string;                       // "Số tài khoản"
  from: string;
  to: string;
}

type WorkerPaymentMethod = "cash" | "bank";

// added to WorkerRecord (all optional for back-compat):
interface WorkerRecord {
  // ...existing...
  identity?: WorkerIdentity;
  residence?: WorkerResidence;
  bankAccount?: WorkerBankAccount;
  tax?: WorkerTaxInfo;
  socialInsurance?: WorkerSocialInsurance;
  emergencyContact?: WorkerEmergencyContact;
  jobs?: WorkerJob[];
  cancellations?: WorkerCancellation[];
  changeLog?: WorkerChangeLogEntry[];
  paymentMethod?: WorkerPaymentMethod;
}
```

---

## 5. File changes

1. **`workers/workers-data.ts`** — add the sub-interfaces above; populate all 5 workers with realistic VN data (CCCD, MB/VCB/TCB accounts, Hưng Yên/HCM/Đà Nẵng residences, MST states, jobs, cancellations, change log). *This is the bulk of the work and is fabricated sample data.*
2. **`workers/WorkerDetailPage.tsx`** — slim RSC: `PageScaffold` → `AppPageHeader` (header + actions) → `MetricCard` row → `<WorkerDetailTabs record={worker} />`.
3. **`workers/WorkerDetailTabs.tsx`** *(new, `"use client"`)* — `Tabs`/`TabList`/`Tab`/`TabPanel` + the six panel components + local `SectionCard` helper (style copied from `CandidateDetailTabs`).
4. **`workers/index.ts`** — export `WorkerDetailTabs` if referenced externally (else internal only).

### Components used (`@mvp-ui/ui`)
`Tabs`/`TabList`/`Tab`/`TabPanel` · `Badge`/`BadgeWithDot` · `MetricCard` · `AvatarProfilePhoto` · `QRCode` (VietQR) · `EmptyState` · `FeaturedIcon` · `Card`. No hand-rolled markup for anything with a dedicated export. All colors via dark-safe semantic tokens (`bg-bg*`, `text-fg*`, `border-border*`, status `bg-{success,warning,error}-*`) — no raw scales, no Bootstrap blue.

---

## 6. Notes / follow-ups

- eKYC checks + ID/portrait images are **display-only** here; the editable OCR workflow stays in `/worker-verifications`.
- `Giao ca mới`, `Xử lý hồ sơ`, `Cập nhật CKT`, edit affordances are **not wired** (mock app, no API layer).
- Bank `verified` + `verifiedBy` mirror the legacy "Đã duyệt | Đã kiểm tra bởi {staff}" line.
- Tab routing via `?tab=<id>` matches the cross-cutting convention in [README](./README.md); switching the outer tab clears inner sub-state.
