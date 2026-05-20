import { PositionEditPage } from "../../../../../components/customers/detail/PositionEditPage";

export default async function CustomerPositionCreateRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PositionEditPage customerId={id} />;
}
