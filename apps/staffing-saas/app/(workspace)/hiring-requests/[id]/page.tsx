import { HiringRequestsDetailPage } from "../../../components/hiring-requests";
import { HIRING_REQUESTS } from "../../../components/hiring-requests/hiring-requests-data";

export function generateStaticParams() {
  return HIRING_REQUESTS.map((r) => ({ id: r.id }));
}

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <HiringRequestsDetailPage id={id} />;
}
