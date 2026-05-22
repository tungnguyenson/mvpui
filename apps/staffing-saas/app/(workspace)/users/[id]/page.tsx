import { UsersDetailPage } from "../../../components/users";
import { USERS } from "../../../components/users/users-data";

export function generateStaticParams() {
  return USERS.map((u) => ({ id: u.id }));
}

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <UsersDetailPage id={id} />;
}
