# Worker Verifications

Quản lý xác thực. KYC for CTV: documents, bank account, risk flags, approval workflow.

## Routes

| Route | Purpose |
|---|---|
| `/worker-verifications` | List page |
| `/worker-verifications/[id]` | Detail page (`id` = workerId) |

## Entity shape

```ts
type VerificationStatus = "verified" | "in-review" | "missing-docs" | "rejected";

interface VerificationRecord {
  id: string;                          // worker slug
  workerName: string;
  workerId: string;                    // "WK-XXXX"
  city: string;
  district: string;
  phone: string;
  phoneStatus: "Đã xác minh" | "Chưa xác minh";
  nationalId: string;                  // CCCD
  taxId: string;                       // MST or "Chưa nộp"
  bankAccount: string;
  bankName: string;
  status: VerificationStatus;
  submittedAt: string;                 // "MM/YYYY"
  lastUpdated: string;                 // "DD/MM/YYYY"
  reviewer: string;
  documents: VerificationDocument[];
  missingDocs: string[];
  riskFlags: string[];
  timeline: VerificationTimelineEntry[];
}

interface VerificationDocument {
  id: string;
  name: string;                        // "CCCD mặt trước"
  uploadedAt: string;
  status: "Đạt" | "Chờ duyệt" | "Cần bổ sung";
  reviewer?: string;
}

interface VerificationTimelineEntry {
  id: string;
  at: string;
  action: string;
  actor: string;
  note?: string;
}
```

### Status labels

| Status | Label | Color |
|---|---|---|
| `verified` | Đã xác thực | success |
| `in-review` | Đang rà soát | warning |
| `missing-docs` | Chờ bổ sung | warning |
| `rejected` | Từ chối | error |

`rejected` status exists in the enum but is **not shown as a list tab**.

### Document status colors
`Đạt`=success · `Chờ duyệt`=warning · `Cần bổ sung`=error.

### Common documents
CCCD mặt trước, CCCD mặt sau, Ảnh chân dung, Mã số thuế cá nhân (tax ID optional).

## List page

### Tabs
Tất cả · Đã xác thực · Đang rà soát · Chờ bổ sung (with counts).

### Search
`workerName` (case-insensitive), `phone`, `nationalId`.

### Columns
CTV (avatar + name + district, city) · SĐT (+ phoneStatus) · CCCD/CMND · MST · Trạng thái · Cập nhật · Chevron.

### Header copy
Title "Quản lý xác thực" · subtitle "Theo dõi hồ sơ xác thực của từng worker, trạng thái tài liệu và các cảnh báo cần xử lý trước khi mở ca làm việc."

## Detail page

### Header
Breadcrumb · avatar (with status overlay) · name + status badge · `Mã CTV {workerId} • {district}, {city} • Nộp hồ sơ {submittedAt}` · `Reviewer phụ trách: {reviewer} • Cập nhật gần nhất {lastUpdated}`.

Actions: `Quay lại danh sách`, `Duyệt xác thực` (primary).

### Metric cards (4)
- Phone — phone
- CCCD/CMND — nationalId
- MST — taxId
- Missing Docs — `missingDocs.length` (error color)

### Section: Verification profile
Phone + phoneStatus · CCCD/CMND + MST · Bank ({bankName} • {bankAccount}, subtitle "Số tài khoản nhận lương dùng cho batch thanh toán.") · Document status ("{approvedCount}/{totalCount} tài liệu đã được duyệt.").

### Section: Checklist thiếu hồ sơ
- Each item in `missingDocs[]` renders as warning alert box.
- Empty: "Hồ sơ đã đủ tài liệu cần thiết, không có hạng mục bổ sung."

### Section: Risk flags
Shown only if `riskFlags.length > 0`. Each item renders as error alert box. Examples: "Chưa hoàn tất hồ sơ thuế", "Có vi phạm vắng mặt liên tiếp", "Đang rà soát lại danh tính".

### Section: Tài liệu đã nộp
Per document: name (bold), `Nộp: {uploadedAt}` + optional `Reviewer: {reviewer}`, status badge.

### Section: Timeline review
Vertical timeline. Per entry: action (bold), `{at} • {actor}`, optional note.

## Modals / drawers

### Review modal (intended; not fully wired)
Triggered by `Duyệt xác thực`. Should support:
- Approve → set status `verified`, update `lastUpdated`, append timeline
- Reject → set status `rejected`, append rejection reason
- Request more info → checkbox list of missing doc types → push to `missingDocs[]`, set status `missing-docs`, append timeline with note

Fields expected: status selector, missing-docs multi-checkbox (if `missing-docs`), reviewer notes textarea.

## Business rules

### Verification lifecycle
```
submitted (initial)
  → in-review  (active review)
  → missing-docs (reviewer flags gaps)
  → verified  (all docs Đạt + no missing items)
  → rejected  (terminal denial)
```

### Document approval flow
`upload → Chờ duyệt → Đạt | Cần bổ sung` (rejected = must resubmit).

### Risk flags
Trigger continued review even if all documents are approved. Generated from upstream (violations, identity-flag system).

### Worker snapshot sync
`WorkerRecord.verification` is a snapshot of `VerificationRecord`. Backend must sync on any change. Worker overall `status` rules:
- `Chờ bổ sung` or `Đang rà soát` → worker `status = pending`
- `Đã xác thực` → may activate
- `Từ chối` → worker should not be active

### Tax ID optionality
`taxId` may be `"Chưa nộp"` — not strictly required for all workers.

### Bank account dependency
Payment batches require a verified bank account on the worker's verification record (see [worker-payment-batches.md](./worker-payment-batches.md)).

### Re-verification
Not modeled (no `expiresAt`). Triggered manually via the timeline (e.g. "Mở rà soát do vi phạm").

### OCR
Not visible in UI. Fields appear manually-entered. Backend may add OCR on upload.

### State machines

**VerificationStatus**

| From | To | Trigger | Side effect |
|---|---|---|---|
| (submit) | `in-review` | worker uploads first docs | timeline entry |
| `in-review` | `missing-docs` | reviewer flags gaps | populate `missingDocs[]` |
| `missing-docs` | `in-review` | worker re-submits | |
| `in-review` | `verified` | all docs `Đạt`, no missing items | sync `worker.verification.status = "Đã xác thực"`; worker eligible for `active` |
| `in-review` / `missing-docs` | `rejected` | reviewer denies | terminal; worker not eligible for `active` |
| `verified` | `in-review` | re-verification triggered (violation, expiry, identity flag) | |

**VerificationDocument.status**

| From | To | Trigger |
|---|---|---|
| (upload) | `Chờ duyệt` | worker uploads file |
| `Chờ duyệt` | `Đạt` | reviewer approves |
| `Chờ duyệt` | `Cần bổ sung` | reviewer flags |
| `Cần bổ sung` | `Chờ duyệt` | worker resubmits |

## Cross-references

- **Workers** — `WorkerRecord.verification` snapshot mirrors this. See [workers.md](./workers.md).
- **Worker Violations** — risk flags often reference violation history. See [worker-violations.md](./worker-violations.md).
- **Worker Payment Batches** — bank account / `bankVerified` flag gates payout. See [worker-payment-batches.md](./worker-payment-batches.md).
- **Hiring Requests / Candidates** — backend should require verified status before a candidate can be assigned (rule not in current code).
