import { WorkerViolationsDetailPage } from "../../../components/worker-violations";
import { VIOLATION_WORKERS } from "../../../components/worker-violations/worker-violations-data";

export function generateStaticParams() {
  return VIOLATION_WORKERS.map((v) => ({ id: v.id }));
}

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WorkerViolationsDetailPage id={id} />;
}
