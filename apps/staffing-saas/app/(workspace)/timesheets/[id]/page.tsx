import { TimesheetsDetailPage } from "../../../components/timesheets";
import { TIMESHEETS } from "../../../components/timesheets/timesheets-data";

export function generateStaticParams() {
  return TIMESHEETS.map((t) => ({ id: t.id }));
}

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TimesheetsDetailPage id={id} />;
}
