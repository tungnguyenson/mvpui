import { ReconciliationsDetailPage } from "../../../components/reconciliations";
import { RECONCILIATIONS } from "../../../components/reconciliations/reconciliations-data";

export function generateStaticParams() {
  return RECONCILIATIONS.map((r) => ({ id: r.id }));
}

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ReconciliationsDetailPage id={id} />;
}
