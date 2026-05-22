import { ShiftsDetailPage } from "../../../components/shifts";
import { SHIFTS } from "../../../components/shifts/shifts-data";

export function generateStaticParams() {
  return SHIFTS.map((s) => ({ id: s.id }));
}

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ShiftsDetailPage id={id} />;
}
