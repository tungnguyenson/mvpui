# Users

Internal staff accounts (not workers, not customer contacts). Each user can hold multiple [roles](./roles.md); effective permissions = union of all roles.

## Routes

| Route | Purpose |
|---|---|
| `/users` | List page |
| `/users/[id]` | Detail page |
| `/users/[id]/roles` | (intended, not yet built) Update role assignment |

## Entity shape

```ts
type UserStatus = "active" | "invited" | "suspended" | "inactive";

interface UserRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  roleKeys: RoleKey[];                // multi-role
  status: UserStatus;
  region: string;                     // "Toàn quốc", "Miền Nam", ...
  joinedAt: string;                   // "MM/YYYY" or "—"
  lastActiveAt: string;               // "Hôm nay 09:20", "Chưa đăng nhập"
  manager: string;                    // name or "—"
  activity: UserActivity[];
  notes: string;
}

interface UserActivity {
  id: string;
  at: string;                         // "Hôm nay 09:48", "12/05/2026 14:20"
  action: string;
  detail?: string;
}
```

### Status labels

| Status | Label | Color |
|---|---|---|
| `active` | Đang hoạt động | success |
| `invited` | Đã mời | warning |
| `suspended` | Tạm khóa | error |
| `inactive` | Không hoạt động | gray |

## List page

### Header
Title "User" · subtitle "Quản lý internal users vận hành hệ thống staffing. Mỗi user có thể giữ nhiều vai trò; quyền hiệu lực = union mọi vai trò."

Actions: `Quản lý vai trò` (secondary, → `/roles`), `Mời thành viên` (primary, **not yet wired**).

### Filters
- Status — All / Đang hoạt động / Đã mời / Tạm khóa
- Search — name, email, region (case-insensitive)

### Columns
1. User — name + email (link to detail)
2. Vai trò — role badges (up to 2, "+N" overflow)
3. Khu vực
4. Hoạt động gần nhất
5. Trạng thái — status badge
6. Chevron

## Detail page

### Header
Avatar + name + status badge + all role badges · email + phone · notes. Actions: `Quay lại danh sách`, `Cập nhật vai trò` (→ `/users/{id}/roles`, not built).

### Metric cards (4)
- Vai trò chính — primary role name (or "Chưa gán vai trò")
- Khu vực phụ trách — region
- Gia nhập — `joinedAt`
- Hoạt động gần nhất — `lastActiveAt`

### Section: Thông tin tài khoản
Email · phone · region · roles (count + names) + manager.

### Section: Quyền hiệu lực (union các role)
Effective permissions aggregated from all assigned roles, grouped by resource group (see [roles.md](./roles.md) for the full grid). Each resource lists allowed actions in Vietnamese: Xem, Tạo, Sửa, Xóa, Duyệt, Gán, Xuất.

Empty: "User chưa được gán vai trò nào, ko có quyền truy cập module."

### Section: Hoạt động gần đây
Timeline of `UserActivity` entries. Empty: "User chưa có hoạt động được ghi nhận trong hệ thống."

## Modals / drawers

Not implemented yet. Expected:
1. **Invite modal** — email, initial role selection, permission preview
2. **Update role modal** — multi-select roles, effective-permission diff preview, save
3. **Deactivate / suspend confirmation** — explanation of status implications

## Business rules

### Account lifecycle
```
invited     (email invite sent, awaiting first login)
  → active  (logged in)
suspended   (temporarily disabled)
inactive    (permanently deactivated)
```

### Multi-role
Each user can have multiple `roleKeys`. Effective permissions = **union** of all assigned roles' permissions.

Example from seed data: a user holds both `operations` and `support` roles.

### Permission ceiling
When assigning roles, the assigner must hold all permissions of the target role (unless they have the `users:invite_admin` special perm). See [roles.md](./roles.md#permission-helpers) for the full `canAssignRole` rule.

### Regional scope
Users have a `region` field. Currently informational; no permission boundaries per region (future feature).

### Manager hierarchy
`manager` field is free-text. Backend should consider promoting to an ID reference.

### Activity audit
Each user's `activity` array is shown on the detail page. There is no separate audit log module yet; the `audit_log` resource exists in the role permission grid for future use.

### State machine

**UserStatus**

| From | To | Trigger | Side effect |
|---|---|---|---|
| (invite) | `invited` | admin sends invite | invite email; no session yet |
| `invited` | `active` | first successful login | `joinedAt` set; `lastActiveAt` starts ticking |
| `active` | `suspended` | manual suspend | session invalidated; cannot log in |
| `suspended` | `active` | unsuspend | |
| `active` / `suspended` | `inactive` | manual deactivate | terminal; roles cleared or preserved for audit |
| `invited` | `inactive` | invite expires / cancelled | terminal |

`inactive` terminal. `invited` cannot return to itself after a failed login (login fail keeps state `invited`).

## Cross-references

- **Roles** — `roleKeys` resolves via `ROLE_BY_KEY` in `permissions-data.ts`. See [roles.md](./roles.md).
- **Activity log** — currently inline only; future dedicated module gated by `audit_log:view` / `audit_log:export` permissions.
- **All domains** — permissions in this domain gate access to every other domain's CRUD actions (UI helpers `can()`, `effectivePermissions()` already implemented but not yet wired into routing).
