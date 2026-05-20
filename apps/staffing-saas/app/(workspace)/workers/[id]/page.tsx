import { WorkerDetailPage } from "../../../components/WorkerDetailPage";

export default async function WorkerDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WorkerDetailPage id={id} />;
}
