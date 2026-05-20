import { WorkerDetailPage } from "../../../components/workers";

export default async function WorkerDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WorkerDetailPage id={id} />;
}
