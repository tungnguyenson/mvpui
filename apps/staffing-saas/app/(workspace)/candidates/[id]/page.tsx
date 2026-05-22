import { CandidatesDetailPage } from "../../../components/candidates";
import { CANDIDATES } from "../../../components/candidates/candidates-data";

export function generateStaticParams() {
  return CANDIDATES.map((c) => ({ id: c.id }));
}

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CandidatesDetailPage id={id} />;
}
