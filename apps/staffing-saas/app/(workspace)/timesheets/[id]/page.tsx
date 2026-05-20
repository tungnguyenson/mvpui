import { TimesheetsDetailPage } from "../../../components/timesheets";

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TimesheetsDetailPage id={id} />;
}
