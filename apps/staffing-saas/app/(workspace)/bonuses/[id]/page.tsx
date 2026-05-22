import { BonusDetailPage } from "../../../components/bonuses";
import { BONUSES } from "../../../components/bonuses/bonuses-data";

export function generateStaticParams() {
  return BONUSES.map((b) => ({ id: b.id }));
}

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BonusDetailPage id={id} />;
}
