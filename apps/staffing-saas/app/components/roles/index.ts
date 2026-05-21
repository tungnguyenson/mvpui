export { RolesPage } from "./RolesPage";
export { RoleDetailPage } from "./RoleDetailPage";
export { PermissionMatrix } from "./PermissionMatrix";
export type {
  Permission,
  ResourceKey,
  ResourceMeta,
  ActionKey,
  RoleDefinition,
  RoleKey,
  SpecialPermission,
} from "./permissions-data";
export {
  ACTION_LABELS,
  GROUP_LABELS,
  RESOURCES,
  RESOURCE_BY_KEY,
  ROLES,
  ROLE_BY_KEY,
  SPECIAL_PERMISSIONS,
  getRoleByKey,
} from "./permissions-data";
export {
  can,
  canAssignRole,
  assignableRoles,
  effectivePermissions,
  permissionDiff,
} from "./permission-helpers";
