import { CandidatesDetailPage } from "../../../components/candidates";

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CandidatesDetailPage id={id} />;
}
