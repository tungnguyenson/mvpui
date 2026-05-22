import { WorkerDetailPage } from "../../../components/workers";
import { WORKERS } from "../../../components/workers/workers-data";

export function generateStaticParams() {
  return WORKERS.map((w) => ({ id: w.id }));
}

export default async function WorkerDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WorkerDetailPage id={id} />;
}
