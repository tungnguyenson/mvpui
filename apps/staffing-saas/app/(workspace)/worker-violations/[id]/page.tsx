import { WorkerViolationsDetailPage } from "../../../components/worker-violations";

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WorkerViolationsDetailPage id={id} />;
}
