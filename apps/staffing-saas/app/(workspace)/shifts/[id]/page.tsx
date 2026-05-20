import { ShiftsDetailPage } from "../../../components/shifts";

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ShiftsDetailPage id={id} />;
}
