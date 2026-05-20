import { WorkerVerificationsDetailPage } from "../../../components/WorkerVerificationsDetailPage";

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WorkerVerificationsDetailPage id={id} />;
}
