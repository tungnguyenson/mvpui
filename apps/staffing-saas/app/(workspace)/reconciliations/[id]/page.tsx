import { ReconciliationsDetailPage } from "../../../components/ReconciliationsDetailPage";

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ReconciliationsDetailPage id={id} />;
}
