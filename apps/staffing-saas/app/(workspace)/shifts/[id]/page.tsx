import { ShiftsDetailPage } from "../../../components/ShiftsDetailPage";

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ShiftsDetailPage id={id} />;
}
