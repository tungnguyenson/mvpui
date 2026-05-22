import { RoleDetailPage } from "../../../components/roles";
import { ROLES } from "../../../components/roles/permissions-data";

export function generateStaticParams() {
  return ROLES.map((r) => ({ roleKey: r.key }));
}

interface RouteProps {
  params: Promise<{ roleKey: string }>;
}

export default async function Route({ params }: RouteProps) {
  const { roleKey } = await params;
  return <RoleDetailPage roleKey={roleKey} />;
}
