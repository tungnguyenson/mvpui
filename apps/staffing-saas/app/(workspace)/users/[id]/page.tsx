import { UsersDetailPage } from "../../../components/UsersDetailPage";

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <UsersDetailPage id={id} />;
}
