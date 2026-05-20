import { HiringRequestsDetailPage } from "../../../components/hiring-requests";

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <HiringRequestsDetailPage id={id} />;
}
