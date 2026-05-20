import { RewardRulesDetailPage } from "../../../components/RewardRulesDetailPage";

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <RewardRulesDetailPage id={id} />;
}
