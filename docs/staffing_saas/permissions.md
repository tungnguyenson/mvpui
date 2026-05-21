# Phân quyền (Permissions / RBAC) — Plan

> Demo phân quyền cho admin user. Chia 2 phase: **Phase 1** mock UI nhanh (table + form + matrix), **Phase 2** full flow (impersonate, audit, scope, time-bound).

---

## 1. Mục tiêu

- Admin tạo / sửa / xóa role, gán role cho user.
- Visual rõ ràng resource nào role nào làm được gì.
- Preview "role này thấy app ra sao" trước khi gán cho user thật.
- Audit ai đổi quyền gì lúc nào.
- Demo data đủ cover edge case (self-demote, last admin, conflict).

## 2. Roles mặc định (seed)

| Key | Tên hiển thị | Scope mặc định | Mô tả |
|---|---|---|---|
| `super_admin` | Super Admin | Cross-org | Toàn quyền platform, ko gán qua UI |
| `org_admin` | Quản trị tổ chức | Org | Toàn quyền trong 1 org, quản role + user |
| `ops_manager` | Quản lý vận hành | Org / Branch | Duyệt shift, hire request, xem báo cáo |
| `recruiter` | Tuyển dụng | Org / Branch | CRUD candidate, hiring request, ko duyệt |
| `finance` | Tài chính | Org | Bonus, payment batch, reconciliation, billing |
| `viewer` | Chỉ xem | Org / Branch | Read-only mọi resource |

`super_admin` ko hiện trong role table thường (toggle "Hiện system roles").

## 3. Resources × Actions matrix

### Resources (theo route hiện có)

`customers`, `customer_reconciliations`, `shifts`, `hiring_requests`, `candidates`, `workers`, `timesheets`, `bonuses`, `worker_payment_batches`, `worker_verifications`, `worker_violations`, `reconciliations`, `users`, `roles`, `billing`, `audit_log`

### Actions chuẩn

`view` · `create` · `edit` · `delete` · `approve` · `assign` · `export`

Resource ko cần đủ 7 action — matrix render N/A ô ko áp dụng (vd `audit_log` chỉ `view` + `export`).

### Special permissions (đứng ngoài matrix)

- `impersonate.user` — login as user khác
- `roles.manage` — CRUD role definitions
- `system.config` — sửa setting toàn org
- `audit.view_all` — xem audit log cross-user

---

## 4. Phase 1 — Mock UI nhanh

> **Mục tiêu**: dựng đủ surface để demo flow, ko cần backend wiring. Dùng `resources/data/` JSON fixture. **Ước lượng: 1.5–2 ngày.**

### 4.1. Trang `/users` (đã có) — bổ sung column

- Column `Vai trò` — badge role (color theo role key).
- Inline action "Đổi vai trò" → dropdown menu role list.
- Bulk select + bulk assign role (toolbar phía trên).

### 4.2. Trang `/roles` — Role list

```
┌──────────────────────────────────────────────────────────────────┐
│ Vai trò                                          [+ Tạo vai trò] │
├──────────────────────────────────────────────────────────────────┤
│ Search: [____________]   [☐ Hiện system roles]                   │
├──────────────────────────────────────────────────────────────────┤
│ Tên          │ Mô tả ngắn      │ Thành viên │ Cập nhật  │ Action │
│ Org Admin    │ Toàn quyền org  │ 3 người    │ 2 ngày    │ ⋯      │
│ Ops Manager  │ Duyệt shift...  │ 12 người   │ 5 ngày    │ ⋯      │
│ Recruiter    │ CRUD candidate  │ 8 người    │ Hôm nay   │ ⋯      │
└──────────────────────────────────────────────────────────────────┘
```

- Row hover: nút `Sửa` / `Nhân bản` / `Xóa` (xóa disabled nếu còn member).
- Click row → mở Role detail.
- Empty state: illustration + CTA "Tạo vai trò đầu tiên".

### 4.3. Trang `/roles/[id]` — Role detail (3 tabs)

**Tab 1: Quyền (Permissions)** — permission matrix

```
                  │ Xem │ Tạo │ Sửa │ Xóa │ Duyệt │ Gán │ Export │
─────────────────────────────────────────────────────────────────
□ Khách hàng       │ ☑  │ ☑  │ ☑  │ ☐  │  —    │ ☑  │  ☑    │
□ Ca làm việc      │ ☑  │ ☑  │ ☑  │ ☐  │  ☑   │ ☑  │  ☑    │
□ Yêu cầu tuyển    │ ☑  │ ☑  │ ☐  │ ☐  │  ☐   │ —  │  ☐    │
□ Ứng viên         │ ☑  │ ☐  │ ☐  │ ☐  │  —    │ —  │  ☐    │
▣ Tài chính        │ ◐  │ ◐  │ ◐  │ ☐  │  —    │ —  │  ◐    │  ← partial
─────────────────────────────────────────────────────────────────
```

- Sticky header row + sticky first column.
- Resource có thể group (Tài chính = `bonuses` + `payment_batches` + `reconciliations`); group checkbox = indeterminate khi partial.
- Toggle "Chọn tất cả hàng" + "Chọn tất cả cột".
- `—` = N/A, ko clickable.
- Footer sticky: `[Hủy]  [Lưu thay đổi]` — disabled khi ko có diff.

**Tab 2: Thành viên (Members)** — table user đang giữ role

- Avatar + tên + email + ngày gán + action remove.
- Button `[+ Thêm thành viên]` mở dialog multi-select user.

**Tab 3: Special permissions**

- Toggle list cho `impersonate.user`, `roles.manage`, `system.config`, `audit.view_all`.
- Mỗi toggle có description + warning icon nếu nguy hiểm.

### 4.4. Dialog "Tạo / Sửa vai trò"

- Step 1 form: name, key (auto slug), description, base role (clone from).
- Step 2 = inline matrix (cùng UI tab 1).
- Save → toast `Tạo vai trò "X" thành công`.

### 4.5. Edge case states cần dựng

- Empty role list (chưa có role tùy chỉnh).
- Last admin warning — modal "Đây là Org Admin cuối cùng" khi xóa member.
- Self-demote prevention — checkbox `users.manage` của chính role mình đang giữ → disabled + tooltip "Ko thể tự gỡ quyền này".
- Permission diff khi Save: modal show `+ shifts.delete`, `- billing.view` trước confirm.
- Access denied component — 403 page với CTA `Yêu cầu quyền truy cập`.

### 4.6. Components cần thêm vào `packages/ui`

- `<PermissionMatrix>` — sticky grid, group support, indeterminate.
- `<RoleBadge variant>` — color-coded role pill (mapping role key → token).
- `<AccessDenied>` — illustration + CTA, reusable mọi page.
- `<PermissionDiff items>` — trước/sau diff list.

### 4.7. Data fixtures

- `resources/data/roles.json` — 6 seed role + permission map.
- `resources/data/role_assignments.json` — user_id × role_id.
- `resources/data/permissions_catalog.json` — danh sách resource × action (i18n labels).

### Phase 1 — Deliverables

- [ ] `/roles` page + dialog
- [ ] `/roles/[id]` page với 3 tab
- [ ] `/users` bổ sung role column + bulk assign
- [ ] `<PermissionMatrix>`, `<RoleBadge>`, `<AccessDenied>`, `<PermissionDiff>` components
- [ ] Demo pages trong `apps/docs`
- [ ] Fixture JSON
- [ ] Skill docs trong `packages/skill/components.md`

---

## 5. Phase 2 — Full flow

> **Mục tiêu**: demo runtime enforcement + audit + scope nâng cao. **Ước lượng: 4–6 ngày sau Phase 1.**

### 5.1. Impersonate / Preview as role

- Header global: `[👤 Đang xem dưới quyền: Recruiter ▾]` banner khi active.
- Dropdown: chọn role để preview → reload với role context giả lập.
- Banner sticky top, màu warning, button `Thoát chế độ xem`.
- Mọi action mutation bị block trong preview mode (`readonly: true` toast).
- Cookie/localStorage `__preview_role` để persist qua reload.

### 5.2. Scope selector (org / branch / team)

- Role giờ có thêm field `scope_type`: `org` | `branch` | `team` | `custom`.
- UI tree picker khi assign: chọn nhánh nào role áp dụng.
- Permission check = permission ✓ AND resource thuộc scope.
- Matrix tab "Phạm vi" — radio + tree picker.

### 5.3. Time-bound permissions

- Khi assign role: option `Hết hạn vào [date]`.
- Badge `Tạm thời (còn 5 ngày)` trên member list.
- Cron mock — fixture có 1 assignment expired → row mờ + label `Hết hạn`.

### 5.4. Audit log `/audit`

```
┌──────────────────────────────────────────────────────────────────┐
│ Filter: [Action ▾] [User ▾] [Date range] [Resource ▾]            │
├──────────────────────────────────────────────────────────────────┤
│ Thời gian  │ Ai           │ Hành động           │ Đối tượng     │
│ 10:23 hôm  │ Linh Trần    │ Gán vai trò         │ Recruiter →   │
│  nay       │              │                     │ Minh Vũ       │
│ 09:15      │ Linh Trần    │ Sửa quyền vai trò   │ Ops Manager   │
│            │              │ + shifts.delete     │               │
└──────────────────────────────────────────────────────────────────┘
```

- Row expand → JSON diff trước/sau.
- Export CSV.
- Filter persist qua URL.

### 5.5. Permission request flow

- User bị 403 → `<AccessDenied>` CTA `Yêu cầu quyền`.
- Dialog: chọn permission cần + lý do + send.
- Admin có inbox `/notifications/permission-requests` (badge số pending).
- Approve → tự gán role tương ứng hoặc 1-off permission grant.

### 5.6. Conflict warning + bulk operations

- Xóa permission `shifts.approve` → modal `12 user sẽ mất quyền duyệt ca`.
- Bulk: chọn N user → assign role / remove role / extend expiry.
- Undo toast 5s sau bulk action.

### 5.7. Role templates marketplace

- Trang `/roles/templates` — preset roles cho ngành staffing (Operations Lead, Site Supervisor, Payroll Officer...).
- Click template → preview matrix → `Sử dụng template` clone vào org.

### Phase 2 — Deliverables

- [ ] Impersonate banner + readonly mode
- [ ] Scope tree picker + scope check helper
- [ ] Time-bound assignment UI + expired state
- [ ] `/audit` page + diff viewer
- [ ] Permission request inbox
- [ ] Bulk operations + undo
- [ ] Role templates page

---

## 6. Tech notes

### State

- Server state (mock fetch từ `resources/data/`): role list, assignments, audit.
- Client state: matrix dirty diff, preview role context.
- URL state: filter audit, search role, active tab.

### Permission check helper

```ts
// packages/ui-utils/permissions.ts
type Action = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'assign' | 'export';
type Permission = `${string}.${Action}` | 'impersonate.user' | 'roles.manage' | ...;

function can(user: User, perm: Permission, scope?: ScopeRef): boolean;
function withPermission<P>(perm: Permission): (Component: FC<P>) => FC<P>;
function usePermission(perm: Permission): { allowed: boolean; reason?: string };
```

Phase 1 chỉ stub `can()` đọc từ fixture. Phase 2 wire vào provider + impersonate context.

### Visual conventions

- Role color mapping qua token (`--role-admin`, `--role-manager`, ...).
- Permission "có" = check icon `success-fg`, "ko" = empty box, "partial" = half-fill `warning-fg`.
- Destructive action (xóa role, gỡ admin cuối) = `error-bg` button + confirm modal có gõ tên role.

### A11y

- Matrix checkbox phải có `aria-label` đầy đủ: "Cho phép Sửa Khách hàng".
- Keyboard nav: arrow key di chuyển ô, Space toggle.
- Screen reader announce diff khi save: "Đã thêm 3 quyền, gỡ 1 quyền".

---

## 7. Câu hỏi mở (cần chốt trước Phase 1)

1. Role có hierarchy ko? (Org Admin > Manager > Recruiter inherit) hay flat?
2. Custom role có thể bằng/cao hơn system role? Hay luôn ≤ org_admin?
3. 1 user = 1 role hay multi-role union permission?
4. Permission key naming: `resource.action` snake hay `resource:action` colon?
5. Phase 1 có cần i18n EN ko hay VN only?
