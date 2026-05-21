# Roles (RBAC)

Vai trò. Resource × action permission matrix plus a small set of special meta-permissions. Roles assigned to [users](./users.md); a user can hold multiple roles (union of permissions).

## Routes

| Route | Purpose |
|---|---|
| `/roles` | List page |
| `/roles/[roleKey]` | Detail page (3 tabs). `roleKey` is a string, not numeric ID. |

## Permission model

### Permission shape

```ts
type Permission = `${ResourceKey}:${ActionKey}` | SpecialPermission;

interface RoleDefinition {
  key: RoleKey;
  name: string;                        // Vietnamese display name
  description: string;
  color: BadgeColor;                   // brand | blue | indigo | success | warning | gray | error
  isSystem: boolean;                   // immutable if true
  permissions: Permission[];
}
```

### Resources (16) — grouped

| Group | Resources |
|---|---|
| **Customer** | `customers`, `customer_reconciliations` |
| **Recruitment** | `hiring_requests`, `candidates` |
| **Worker** | `workers`, `worker_verifications`, `worker_violations` |
| **Operations** | `shifts`, `timesheets`, `reconciliations` |
| **Finance** | `bonuses`, `worker_payment_batches`, `billing` |
| **System** | `users`, `roles`, `audit_log` |

### Actions (7)

| Key | Vietnamese |
|---|---|
| `view` | Xem |
| `create` | Tạo |
| `edit` | Sửa |
| `delete` | Xóa |
| `approve` | Duyệt |
| `assign` | Gán |
| `export` | Xuất |

Not all actions exist on every resource. Common patterns:
- `CRUD` = view + create + edit + delete
- `CRUD_EXPORT` = CRUD + export
- `VIEW_EXPORT` = view + export (read-only with download)
- Resource-specific: `hiring_requests` = CRUD + approve + export · `worker_verifications` = view + edit + approve · `audit_log` = view + export only.

### Special permissions

| Key | Purpose | Dangerous |
|---|---|---|
| `users:assign_role` | Assign roles when editing users | |
| `users:invite_admin` | Bypass ceiling rule when inviting new users | ⚠ |
| `roles:manage` | Create / edit / delete custom roles | |
| `system:config` | Edit org-wide settings (branding, integrations, billing) | ⚠ |
| `audit:view_all` | View every user's audit logs (default: own only) | |
| `impersonate:user` | Log in as another user for debugging — fully logged | ⚠ |

## System roles (6, immutable in UI)

| Key | Name | Color | Summary |
|---|---|---|---|
| `super_admin` | Super Admin | error | Cross-org; hidden from standard UI. All resources × all actions + all special perms. Cannot be assigned via normal UI (blocked by `canAssignRole`). |
| `owner` | Quản Trị Viên | brand | Org admin. All CRUD on all resources + all special perms. |
| `operations` | Điều Phối Vận Hành | blue | Full CRUD on customers, hiring_requests, candidates, workers, shifts. Partial on verifications/timesheets (no approve). Read-only on finance + reconciliations. |
| `accounting` | Kế Toán | indigo | Full CRUD on customer_reconciliations, reconciliations, bonuses, worker_payment_batches, billing. View/edit on operational data. Audit log view+export. |
| `support` | Chăm Sóc Khách Hàng | warning | Full CRUD on worker_verifications + worker_violations. Read/export on most operational data. |
| `viewer` | Chỉ Xem | gray | View + export only across all 16 resources. |

## List page

### Features
- Search — by name or description
- Toggle "Show system roles" — filters out `super_admin` and seed roles
- Create button (UI present, action not yet wired)

### Columns
1. Name — badge in role color
2. Description (truncated)
3. Members count — from `countMembersByRole()` ([users-data](../app/components/users/users-data.ts))
4. Permission count
5. Type — System badge with lock icon | Custom badge with sparkles
6. Chevron

Row click → `/roles/{roleKey}`.

## Detail page

### Header
Breadcrumb · role name + color badge + system/custom badge · description. Actions: `Quay lại`, `Hủy thay đổi` (disabled if no dirty changes), `Lưu thay đổi` (disabled if no dirty changes).

For system roles a banner shows "Vai trò hệ thống — chỉ xem trong demo".

### Tabs

#### 1. Permissions
`PermissionMatrix` component.

- Collapsible groups by category. Each group shows `X / Y quyền` badge.
- Each resource row × each action column = a checkbox cell.
- **Multi-level toggle**:
  - Click group header — toggle all in group
  - Click resource row — toggle all actions for resource
  - Click action column header — toggle all resources for action
  - Click cell — toggle single permission
- Tristate (indeterminate / partial state) shown with dash.
- Expand-all / collapse-all button.
- `lockedPermissions: Set<Permission>` (with `lockedReason` callback) supported for granular locks; system roles disable all toggles.

#### 2. Members
- List of users assigned to this role (avatar + name + email + region, link to user detail)
- Remove button per row (custom roles only)
- Collapsible "Add members" section showing users not yet assigned (custom roles only)
- Empty state when no members

#### 3. Special permissions
- Checkbox list of all `SpecialPermission`s with label + description + permission key
- "Dangerous" badge on `users:invite_admin`, `system:config`, `impersonate:user`
- Warning: "Quyền đặc biệt nằm ngoài matrix. Bật cẩn thận."
- Read-only for system roles

### Change management
- Dirty detection tracks `matrixDiff` + `specialDiff` (added / removed sets).
- On save click, a **diff summary** card shows added (success) and removed (error) entries before commit.
- "Hủy thay đổi" resets without save.

## Permission helpers

Lives in `permission-helpers.ts` (imported by users / roles pages):

| Helper | Returns |
|---|---|
| `effectivePermissions(user)` | union of all assigned roles' permissions |
| `can(user, permission)` | boolean |
| `canAssignRole(assigner, targetRole, targetUserId?)` | `{ allowed, reason?, missing? }` |
| `assignableRoles(assigner, allRoles)` | filtered role list assigner can grant |
| `permissionDiff(before, after)` | `{ added, removed }` arrays |

### `canAssignRole` reasons
- `"self-escalation"` — user can't escalate themselves
- `"system-role"` — can't assign `super_admin` via UI
- `"missing-permissions"` — assigner lacks perms of target role; unless they have `users:invite_admin`
- `"no-permission"` — assigner lacks `users:assign_role` at all

## Business rules

### Ceiling rule
Assigner can grant only roles whose permissions ⊆ assigner's effective permissions. `users:invite_admin` bypasses this for new-user invites. Prevents privilege escalation (Operations can't create an Accounting admin).

### System vs custom
- System roles (`isSystem: true`) — immutable, cannot delete / rename / reassign permissions.
- Custom roles — editable matrix + special perms. Backed by clone-from-system-role flow (mentioned but not built).

### Multi-role
Users have `roleKeys: RoleKey[]`. Effective permissions = OR of all roles.

### Scope
All roles are **per-organization** (no per-customer / per-region scoping in current model). Backend can add row-level scoping later.

### Permission key format
- Matrix: `"{resource}:{action}"` (e.g. `"shifts:view"`)
- Special: plain identifier (e.g. `"impersonate:user"`)

## Cross-references

- **Users** — `roleKeys` field. See [users.md](./users.md).
- **All domains** — every CRUD action across the app maps to a resource × action permission. Backend must enforce server-side; the helpers above are intended for both UI gating and API gating.
