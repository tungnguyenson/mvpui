import {
  type Permission,
  type RoleDefinition,
  type RoleKey,
  ROLE_BY_KEY,
} from "./permissions-data";

export interface UserLike {
  id: string;
  roleKeys: RoleKey[];
}

export function effectivePermissions(user: UserLike): Set<Permission> {
  const perms = new Set<Permission>();
  for (const key of user.roleKeys) {
    const role = ROLE_BY_KEY[key];
    if (!role) continue;
    for (const perm of role.permissions) {
      perms.add(perm);
    }
  }
  return perms;
}

export function can(user: UserLike, perm: Permission): boolean {
  return effectivePermissions(user).has(perm);
}

export interface AssignRoleCheck {
  allowed: boolean;
  reason?: "self-escalation" | "missing-permissions" | "system-role" | "no-permission";
  missing?: Permission[];
}

export function canAssignRole(
  assigner: UserLike,
  targetRole: RoleDefinition,
  targetUserId?: string,
): AssignRoleCheck {
  const assignerPerms = effectivePermissions(assigner);

  if (!assignerPerms.has("users:assign_role")) {
    return { allowed: false, reason: "no-permission" };
  }

  if (targetRole.key === "super_admin") {
    return { allowed: false, reason: "system-role" };
  }

  if (
    targetUserId === assigner.id &&
    !assigner.roleKeys.includes(targetRole.key)
  ) {
    return { allowed: false, reason: "self-escalation" };
  }

  if (assignerPerms.has("users:invite_admin")) {
    return { allowed: true };
  }

  const missing = targetRole.permissions.filter((p) => !assignerPerms.has(p));
  if (missing.length === 0) {
    return { allowed: true };
  }

  return { allowed: false, reason: "missing-permissions", missing };
}

export function assignableRoles(
  assigner: UserLike,
  allRoles: RoleDefinition[],
): RoleDefinition[] {
  return allRoles.filter(
    (role) => !role.isSystem || role.key !== "super_admin",
  ).filter((role) => canAssignRole(assigner, role).allowed);
}

export function permissionDiff(
  before: Permission[],
  after: Permission[],
): { added: Permission[]; removed: Permission[] } {
  const beforeSet = new Set(before);
  const afterSet = new Set(after);
  const added = after.filter((p) => !beforeSet.has(p));
  const removed = before.filter((p) => !afterSet.has(p));
  return { added, removed };
}

export function hasIndeterminateState(
  selected: Set<Permission>,
  candidates: Permission[],
): "all" | "none" | "partial" {
  const matches = candidates.filter((p) => selected.has(p)).length;
  if (matches === 0) return "none";
  if (matches === candidates.length) return "all";
  return "partial";
}
