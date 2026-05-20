import { BonusDetailPage } from "../../../components/bonuses";

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BonusDetailPage id={id} />;
}
