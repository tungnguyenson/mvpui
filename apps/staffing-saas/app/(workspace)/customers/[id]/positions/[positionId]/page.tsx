import { PositionEditPage } from "../../../../../components/customers/detail/PositionEditPage";

export default async function CustomerPositionEditRoute({
  params,
}: {
  params: Promise<{ id: string; positionId: string }>;
}) {
  const { id, positionId } = await params;
  return <PositionEditPage customerId={id} positionId={positionId} />;
}
