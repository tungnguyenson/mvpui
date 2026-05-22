import { WorkerVerificationsDetailPage } from "../../../components/worker-verifications";
import { VERIFICATIONS } from "../../../components/worker-verifications/worker-verifications-data";

export function generateStaticParams() {
  return VERIFICATIONS.map((v) => ({ id: v.id }));
}

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WorkerVerificationsDetailPage id={id} />;
}
