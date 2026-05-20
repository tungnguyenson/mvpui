import { RewardRulesDetailPage } from "../../../components/reward-rules";

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <RewardRulesDetailPage id={id} />;
}
