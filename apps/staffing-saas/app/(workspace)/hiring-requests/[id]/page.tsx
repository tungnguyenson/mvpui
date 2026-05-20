import { HiringRequestsDetailPage } from "../../../components/HiringRequestsDetailPage";

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <HiringRequestsDetailPage id={id} />;
}
