import { RoleDetailPage } from "../../../components/roles";

interface RouteProps {
  params: Promise<{ roleKey: string }>;
}

export default async function Route({ params }: RouteProps) {
  const { roleKey } = await params;
  return <RoleDetailPage roleKey={roleKey} />;
}
