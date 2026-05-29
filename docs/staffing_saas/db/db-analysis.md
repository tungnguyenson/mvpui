# Staffing SaaS — Đề xuất cấu trúc Database (Phân tích)

> Nguồn: tổng hợp toàn bộ `docs/staffing_saas/*.md` + cấu trúc dữ liệu demo trong
> `apps/staffing-saas/app/components/**/*-data.ts`.
> Schema cụ thể: [`schema.dbml`](./schema.dbml) (target PostgreSQL).
>
> Mục tiêu: từ các spec UI + fixture demo, rút ra mô hình dữ liệu **chuẩn hoá, production-oriented** — không bê nguyên shape của fixture (vốn là dữ liệu hiển thị).

---

## 1. Nguyên tắc nền (đọc trước)

Fixture `*-data.ts` là **dữ liệu demo cho UI**, không phải schema. Khi rút ra DB, đã áp các quy tắc:

| Trong fixture | Trong DB |
|---|---|
| Tiền dạng string đã format (`"₫4.850.000"`, `"40.000"`) | `bigint` VND (không thập phân) |
| Phần trăm dạng string (`"15%"`) | `numeric(6,4)` — phân số `0..1` |
| Ngày/giờ dạng hiển thị (`"18/05, 08:00 - 17:00"`, `"07/2025"`) | `date` / `time` / `timestamptz` |
| Tên customer/worker lặp lại dạng string khắp nơi | FK tới bảng gốc |
| Snapshot nhúng trên record (`WorkerPaymentSnapshot`, ...) | Tách bảng + FK |

**Phân biệt 2 loại denormalize** (để không xoá nhầm):

- **Tình cờ (do tiện cho demo):** tên lặp, snapshot rollup nhúng → **chuẩn hoá đi**.
- **Cố ý (toàn vẹn audit/billing):** `price_snapshot`, `pay_rate_snapshot`, `bonus_snapshot` — **giữ lại**. Đây là yêu cầu nghiệp vụ thật, xem §6.

---

## 2. Mô hình đa tổ chức (Tenancy) — quyết định & giả định

`permissions.md` có `super_admin` (cross-org) + scope `org / branch / team`, ngụ ý nền tảng **multi-org**. Nhưng không fixture nào mang `org_id`.

**Quyết định (giả định, ghi rõ để stakeholder xác nhận):** mô hình **multi-tenant 1 cấp `organization`** = một staffing company. Mọi entity *nội bộ staffing* mang `organization_id`:
`app_user, customer, hiring_request, candidate, worker, timesheet, bonus, payment_batch, reconciliation, role (nullable cho system role)`.

Bảng con của customer (position, location, pricing, shift, document...) **kế thừa org qua parent** — không lặp `organization_id` để tránh sai lệch.

`branch / team` (Phase 2 của permissions) chưa tạo bảng riêng — mang ở `user_role.scope_type + scope_ref` cho tới khi có nhu cầu thật.

---

## 3. Ba phân hệ + góc nhìn

Hệ thống là tool nội bộ cho **Staffing Company** (customer không có portal trong scope demo — `hiring_request_and_job_post.md` §1).

```
Customer & Config (cung cấp cái gì)
        │
        ▼
   Demand (khách cần gì)          Supply (CTV làm gì)
   HiringRequest → JobPost        Worker ← Candidate
        │   → Application              │
        └────────── ShiftAssignment ───┘   (per-day, nối demand↔supply)
                         │
                         ▼
        Timekeeping → Payment Batch → Reconciliation
```

| Phân hệ | Bảng chính |
|---|---|
| 1. Org & RBAC | `organization`, `app_user`, `role`, `permission`, `role_permission`, `user_role`, `audit_log` |
| 2. Customer & config | `customer`, `customer_position`, `customer_location`, `customer_pricing_config(+rate)`, `customer_reconciliation_config(+contact)`, `customer_shift(+weekday)`, `customer_document`, `customer_user` |
| 3. Demand | `hiring_request`, `job_post`, `candidate(+sub)`, `application`, `shift_assignment` |
| 4. Supply | `worker(+tag)`, `worker_verification(+doc/timeline)`, `worker_violation_profile`, `violation_case`, `worker_social_insurance` |
| 5. Timekeeping | `timesheet`, `attendance_record` |
| 6. Bonus | `bonus(+job_scope/applied_worker/changelog)` |
| 7. Payment | `payment_batch(+line_item/adjustment/transaction_type/company_breakdown)` |
| 8. Reconciliation | `reconciliation(+discrepancy/approval)` |
| 9. Billing/Wallet/Package | `service_package`, `customer_wallet`, `wallet_transaction` (**stub, deferred**) |

---

## 4. Spine kiến trúc — chọn thiết kế nào khi docs mâu thuẫn

Các doc xếp tầng và **mâu thuẫn về độ chín**:

- `shifts_mangement.md` = **DONE** (UI shifts calendar).
- `hiring_request.md` = mô hình HR monolithic 4-step **cũ**.
- `hiring_request_and_job_post.md` = **refactor mới nhất**, tách `HiringRequest` ↔ `JobPost`, đẩy config ổn định sang `CustomerShift`.
- `hiring_request_schedule_view.md` = brainstorm view theo ngày (`HiringAssignment`).

**Schema theo spine mới nhất + đã-chốt-nhiều-nhất:**
**`CustomerShift` (config tái sử dụng) → `HiringRequest` (đơn, có ngày + headcount) → `JobPost` (tin marketing, 1:N) → `Application` (CTV apply vào tin) → `ShiftAssignment` (cam kết per-ngày).**

Mô hình 4-step của `hiring_request.md` **bị thay thế** — các field của nó được phân bổ lại (xem `hiring_request_and_job_post.md` §8): schedule/policy/pricing → `customer_shift`; dates/headcount → `hiring_request`; title/displayedPay/visibility/adhocBonus/payCycle/overrides → `job_post`.

---

## 5. Ba điểm cần hợp nhất rõ ràng (không emit bảng trùng)

### 5.1 `ShiftAssignment` ≡ `HiringAssignment`
Cùng một khái niệm, hai dòng doc khác nhau. **Hợp nhất thành `shift_assignment`** — bản ghi cam kết per `(hiring_request, worker, work_date)`, kèm check-in/out + snapshot giá. Lifecycle hợp nhất: `assigned → confirmed → checked_in → completed` + terminal `no_show / late / cancelled` (v1 docs lock `assigned → confirmed → cancelled`, mở rộng được).

### 5.2 `Candidate` vs `Application` — chuỗi sạch
Docs không nhất quán (`Application.workerId` vs `HiringAssignment.candidateId+workerId`). Phân định theo nguyên tắc **người apply chưa phải Worker**:

```
candidate (funnel/CRM, 1 người)
   └──< application (candidate × job_post)
            └──< shift_assignment (per ngày, khi application = accepted)
```

- `candidate.worker_id` **nullable** — chỉ set khi hired (CTV được tạo trong `worker`).
- `application.worker_id` nullable cho tới khi accept/hire.
- `shift_assignment.worker_id` **bắt buộc** (đã có người làm thật).
- `shift_assignment.application_id` nullable (cho phép staffing book trực tiếp, bỏ qua funnel).

### 5.3 `shift_assignment` vs `timesheet/attendance_record`
Cả hai mang check-in/out. Phân vai: **`shift_assignment` = cam kết (demand-side)**, **`attendance_record` = chấm công thực tế (realized)**. Không nhân đôi: `attendance_record.shift_assignment_id` FK trỏ ngược về cam kết (`realized ← committed`). `timesheet` = gom attendance theo 1 ca-ngày của 1 `customer_shift`.

---

## 6. Chiến lược Snapshot (cố ý denormalize)

Giá & chính sách có thể đổi theo thời gian (`customer_pricing_config.applied_from/to`, edit shift...). Để lịch sử billing **không bị viết lại** khi config đổi sau này, đóng băng tại thời điểm commit:

| Cột | Ở bảng | Đóng băng cái gì |
|---|---|---|
| `price_snapshot` (jsonb) | `hiring_request` | giá + policy lúc tạo HR |
| `pay_rate_snapshot` (bigint) | `shift_assignment` | đơn giá CTV lúc gán ngày |
| `bonus_snapshot` (bigint) | `shift_assignment` | thưởng adhoc đã duyệt lúc gán |

Đây là **yêu cầu nghiệp vụ staffing thật** (SLA/giá khác nhau theo từng HR — `hiring_request_schedule_view.md` §1.1), không phải noise demo. Giữ nguyên.

---

## 7. Quan hệ chính (ER tóm tắt)

- `organization 1—N app_user / customer / worker / hiring_request / candidate / bonus / payment_batch / reconciliation`
- `customer 1—N position / location / pricing_config / shift / document / user / reconciliation_contact`; `1—1 reconciliation_config / wallet`
- `customer_pricing_config 1—N pricing_rate` (6 dòng shift-type)
- `customer_shift N—1 position / location / pricing_config`; `1—N weekday`
- `hiring_request N—1 customer / customer_shift`; self-FK `parent_request_id` (HR-supplement)
- `hiring_request 1—N job_post`; `job_post 1—N application`
- `candidate 1—N application`; `candidate N—1 worker` (khi hired)
- `application 1—N shift_assignment`; `shift_assignment N—1 worker / hiring_request`
- `worker 1—1 verification / violation_profile`; `1—N violation_case / social_insurance / tag`
- `timesheet 1—N attendance_record`; `attendance_record N—1 shift_assignment / worker`
- `payment_batch 1—N line_item / adjustment / transaction_type / company_breakdown`; self-FK `carry_over_batch_id`
- `reconciliation 1—N discrepancy / approval`
- RBAC: `app_user N—M role` (qua `user_role`, time-bound + scope); `role N—M permission`

---

## 8. Đối chiếu coverage (cổng "có sót không")

`permissions.md` §3 liệt kê các resource chuẩn của hệ thống — map 1-1 sang bảng:

| RBAC resource | Bảng |
|---|---|
| `customers` | `customer` (+ con) |
| `customer_reconciliations` | `customer_reconciliation_config` |
| `shifts` | `customer_shift` (+ `timesheet` cho realized) |
| `hiring_requests` | `hiring_request` |
| `candidates` | `candidate` |
| `workers` | `worker` |
| `timesheets` | `timesheet` / `attendance_record` |
| `bonuses` | `bonus` |
| `worker_payment_batches` | `payment_batch` |
| `worker_verifications` | `worker_verification` |
| `worker_violations` | `violation_case` / `worker_violation_profile` |
| `reconciliations` | `reconciliation` |
| `users` | `app_user` |
| `roles` | `role` / `permission` / `user_role` |
| `billing` | `customer_wallet` / `service_package` (**stub**) |
| `audit_log` | `audit_log` |

`billing` + Ví công ty + Gói dịch vụ là **TBD trong docs** (`customer_page.md` §4–5) → tạo **stub mỏng + đánh dấu deferred**, không bỏ im lặng.

---

## 9. Indexing & hiệu năng

- FK đều có index (DBML đã ghi).
- Cột lọc thường gặp: `status` (mọi entity), `customer_id`, `organization_id`, date range (`start_date/end_date`, `work_date`).
- Code người-đọc unique theo org: `(organization_id, code)` cho HR/worker/batch/reconciliation; `(customer_id, code)` cho `customer_shift`.
- `shift_assignment (hiring_request_id, worker_id, work_date)` **unique** — chặn double-book cùng HR cùng ngày (`hiring_request_and_job_post.md` §5).
- Cân nhắc partial index theo `status` active (vd `customer_shift WHERE status='active'`) khi dữ liệu lớn.

---

## 10. Giả định đã chốt trong schema

1. Multi-tenant 1 cấp `organization` (§2).
2. PK surrogate `bigint`; code người-đọc là cột `code` riêng, unique theo org.
3. Spine HR/JobPost split (§4) — thay mô hình HR 4-step cũ.
4. `attendance_record` trỏ về `shift_assignment`, không nhân đôi check-in/out (§5.3).
5. `app_user` (staffing) ≠ `customer_user` (liên hệ phía khách) ≠ `worker` (CTV) ≠ `candidate` (ứng viên funnel) — 4 loại "người" tách biệt.
6. Weekdays của shift = bảng con `customer_shift_weekday` (queryable) thay vì `int[]`.
7. Tiền = `bigint` VND; phần trăm = `numeric(6,4)` phân số.

---

## 11. Câu hỏi mở (kế thừa từ các "Còn mở" trong docs)

1. **Tenancy:** xác nhận multi-org hay single-org? Có cần bảng `branch`/`team` thật không (permissions Phase 2)?
2. **HR-supplement chain depth** (`hiring_request_and_job_post.md` §9.2): cho phép supplement-của-supplement? Đề xuất: flat 1 cấp.
3. **Per-day headcount override** (`hiring_request_schedule_view.md` Q6): hiện flat `headcount` cho cả range. Khi cần override per-ngày → thêm bảng `shift_date { hr_id, date, headcount }`.
4. **Threshold edit in-place vs split HR** (20%) — chốt với ops.
5. **Pricing snapshot**: chốt shape `jsonb` của `price_snapshot` (full rate table hay chỉ rate áp dụng).
6. **payCycle**: enum cố định hay free-text? Hiện để varchar (docs chưa liệt kê đủ option).
7. **Billing/Wallet/Package**: chờ screen "Gói dịch vụ" + "Ví công ty" để chốt field thật.
8. **Customer portal**: ngoài scope demo — nếu sau này có, `customer_user` cần auth/credential riêng.
9. **Conflict detection** (CTV double-book cross-HR cùng giờ): hiện chỉ unique trong 1 HR; cross-HR là Supply-side phase 2.

---

## 12. File liên quan

- Schema DBML: [`schema.dbml`](./schema.dbml) — paste vào [dbdiagram.io](https://dbdiagram.io) để xem ERD.
- Spec nguồn: [`../customer_page.md`](../customer_page.md), [`../customer_shift.md`](../customer_shift.md), [`../hiring_request_and_job_post.md`](../hiring_request_and_job_post.md), [`../hiring_request_schedule_view.md`](../hiring_request_schedule_view.md), [`../payment_page.md`](../payment_page.md), [`../permissions.md`](../permissions.md), [`../shifts_mangement.md`](../shifts_mangement.md), [`../universal_search.md`](../universal_search.md).
