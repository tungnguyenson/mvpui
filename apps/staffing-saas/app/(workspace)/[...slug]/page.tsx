import { EmptyState } from "../../components/EmptyState";
import { labelForPath } from "../../components/nav";

export default async function PendingRoutePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const pathname = `/${slug.join("/")}`;

  return (
    <div className="flex min-h-full flex-col">
      <EmptyState title={labelForPath(pathname)} />
    </div>
  );
}
